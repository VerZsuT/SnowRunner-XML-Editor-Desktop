//! Чтение zip-архива: EOCD, central directory, локальные заголовки, распаковка.

use std::fs::{self, File};
use std::io::{BufReader, Read, Seek, SeekFrom, Write};
use std::path::{Path, PathBuf};
use std::sync::{Mutex, MutexGuard};

use super::ZipError;
use super::deflate;
use super::entry::{self, EntryMeta};

/// Размер буферов ввода-вывода.
pub(crate) const BUFFER_SIZE: usize = 64 * 1024;

/// Размер фиксированной части EOCD.
const EOCD_SIZE: u64 = 22;

/// Размер фиксированной части записи central directory.
const CENTRAL_HEADER_SIZE: u64 = 46;

/// Размер фиксированной части локального заголовка.
const LOCAL_HEADER_SIZE: u64 = 30;

/// Максимальная длина комментария архива.
const MAX_COMMENT_LENGTH: u64 = u16::MAX as u64;

/// Предел начальной ёмкости списка записей.
const MAX_ENTRIES_RESERVE: u64 = 1_048_576;

/// Предел размера одной записи при чтении в память: защита от OOM на
/// повреждённом или специально собранном архиве.
pub(crate) const MAX_ENTRY_SIZE: u64 = 512 * 1024 * 1024;

/// Итог извлечения записей из архива.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ExtractReport {
	/// Сколько файлов записано на диск.
	pub files: usize,
	/// Сколько байт распаковано и записано.
	pub bytes: u64,
}

/// Данные EOCD, нужные для разбора архива.
struct EndOfCentralDirectory {
	/// Офсет EOCD в файле.
	offset: u64,
	/// Офсет central directory.
	cd_offset: u64,
	/// Размер central directory.
	cd_size: u64,
	/// Число записей в архиве.
	entries: u64,
}

/// Открытый zip-архив.
///
/// Файл открывается один раз; все операции позиционируются через
/// [std::io::Seek], поэтому архив не загружается в память целиком.
pub struct ZipArchive {
	/// Поток чтения архива, общий для всех операций.
	reader: Mutex<BufReader<File>>,
	/// Записи в порядке central directory.
	entries: Vec<EntryMeta>,
	/// Размер файла архива.
	file_size: u64,
	/// Офсет central directory.
	cd_offset: u64,
	/// Размер central directory.
	cd_size: u64,
}

impl ZipArchive {
	/// Открыть архив и прочитать central directory.
	///
	/// Файл открывается один раз; записи разбираются потоково, а локальные
	/// заголовки проверяются сразу, поэтому повреждённый архив не откроется.
	pub fn open(path: impl AsRef<Path>) -> Result<Self, ZipError> {
		let file = File::open(path)?;
		let file_size = file.metadata()?.len();
		let mut reader = BufReader::with_capacity(BUFFER_SIZE, file);
		let end = read_end_of_central_directory(&mut reader, file_size)?;
		let mut entries = read_central_directory(&mut reader, &end)?;
		for entry in &mut entries {
			entry.data_offset = read_local_header(&mut reader, entry, end.cd_offset)?;
		}
		Ok(Self {
			reader: Mutex::new(reader),
			entries,
			file_size,
			cd_offset: end.cd_offset,
			cd_size: end.cd_size,
		})
	}

	/// Записи в порядке central directory.
	pub fn entries(&self) -> &[EntryMeta] {
		&self.entries
	}

	/// Найти запись по имени (точное совпадение, без нормализации).
	pub fn entry(&self, name: &str) -> Option<&EntryMeta> {
		self.entries.iter().find(|entry| entry.name == name)
	}

	/// Размер файла архива.
	pub fn file_size(&self) -> u64 {
		self.file_size
	}

	/// Офсет central directory в файле архива.
	pub fn central_directory_offset(&self) -> u64 {
		self.cd_offset
	}

	/// Размер central directory в байтах.
	pub fn central_directory_size(&self) -> u64 {
		self.cd_size
	}

	/// Прочитать и распаковать запись, проверив CRC32 и размер.
	pub fn read(&self, entry: &EntryMeta) -> Result<Vec<u8>, ZipError> {
		check_entry_size(entry)?;

		let data = match entry.method {
			entry::METHOD_STORED => {
				let mut guard = self.lock();
				guard.seek(SeekFrom::Start(entry.data_offset))?;
				let mut limited = (&mut *guard).take(entry.compressed_size);
				let mut data = Vec::with_capacity(deflate::reserve(entry.uncompressed_size));
				limited.read_to_end(&mut data)?;
				data
			}
			entry::METHOD_DEFLATE => {
				let mut guard = self.lock();
				guard.seek(SeekFrom::Start(entry.data_offset))?;
				let limited = (&mut *guard).take(entry.compressed_size);
				deflate::decompress(limited, entry.uncompressed_size)?
			}
			other => {
				return Err(ZipError::Unsupported(format!(
					"метод сжатия {other} не поддерживается"
				)));
			}
		};
		let size = data.len() as u64;
		if size != entry.uncompressed_size {
			return Err(ZipError::SizeMismatch {
				name: entry.name.clone(),
				expected: entry.uncompressed_size,
				actual: size,
			});
		}
		let actual = entry::checksum(&data);
		if actual != entry.crc32 {
			return Err(ZipError::CrcMismatch {
				name: entry.name.clone(),
				expected: entry.crc32,
				actual,
			});
		}
		Ok(data)
	}

	/// Прочитать сырые сжатые байты записи без распаковки.
	pub fn read_compressed(&self, entry: &EntryMeta) -> Result<Vec<u8>, ZipError> {
		check_entry_size(entry)?;

		let mut guard = self.lock();
		guard.seek(SeekFrom::Start(entry.data_offset))?;
		let mut limited = (&mut *guard).take(entry.compressed_size);
		let mut data = Vec::with_capacity(deflate::reserve(entry.compressed_size));
		limited.read_to_end(&mut data)?;
		if data.len() as u64 != entry.compressed_size {
			return Err(ZipError::SizeMismatch {
				name: entry.name.clone(),
				expected: entry.compressed_size,
				actual: data.len() as u64,
			});
		}
		Ok(data)
	}

	/// Извлечь записи, подходящие под фильтр, в каталог dest.
	///
	/// Имена трактуются как относительные пути с разделителями обратный слэш
	/// или прямой слэш; имена каталогов создаются, записи-каталоги тоже.
	/// Прогресс вызывается как (обработано, всего) после каждой записи.
	pub fn extract_selected(
		&self,
		filter: impl Fn(&EntryMeta) -> bool,
		dest: &Path,
		mut on_progress: impl FnMut(usize, usize),
	) -> Result<ExtractReport, ZipError> {
		let selected: Vec<&EntryMeta> = self.entries.iter().filter(|entry| filter(entry)).collect();
		let total = selected.len();
		fs::create_dir_all(dest)?;
		let mut files = 0usize;
		let mut bytes = 0u64;
		for (index, entry) in selected.iter().enumerate() {
			let path = extraction_path(dest, &entry.name)?;
			if entry.is_directory() {
				fs::create_dir_all(&path)?;
			} else {
				if let Some(parent) = path.parent() {
					fs::create_dir_all(parent)?;
				}
				let data = self.read(entry)?;
				bytes += data.len() as u64;
				files += 1;
				fs::write(&path, &data)?;
			}
			on_progress(index + 1, total);
		}
		Ok(ExtractReport { files, bytes })
	}

	/// Скопировать сжатые байты записи в поток без загрузки в память.
	pub(crate) fn copy_compressed<W: Write>(
		&self,
		entry: &EntryMeta,
		out: &mut W,
	) -> Result<u64, ZipError> {
		let mut guard = self.lock();
		guard.seek(SeekFrom::Start(entry.data_offset))?;
		let mut limited = (&mut *guard).take(entry.compressed_size);
		let copied = std::io::copy(&mut limited, out)?;
		if copied != entry.compressed_size {
			return Err(ZipError::SizeMismatch {
				name: entry.name.clone(),
				expected: entry.compressed_size,
				actual: copied,
			});
		}
		Ok(copied)
	}

	/// Захватить поток чтения архива.
	fn lock(&self) -> MutexGuard<'_, BufReader<File>> {
		match self.reader.lock() {
			Ok(guard) => guard,
			Err(poisoned) => poisoned.into_inner(),
		}
	}
}

/// Разбирает только central directory, без проверки локальных заголовков.
///
/// Дешёвая альтернатива [ZipArchive::open] для отпечатков и поиска маркера:
/// локальные заголовки не читаются, поэтому `data_offset` у всех записей
/// остаётся нулевым. Порядок записей — как в central directory.
pub fn read_entries(path: impl AsRef<Path>) -> Result<Vec<EntryMeta>, ZipError> {
	let file = File::open(path)?;
	let file_size = file.metadata()?.len();
	let mut reader = BufReader::with_capacity(BUFFER_SIZE, file);
	let end = read_end_of_central_directory(&mut reader, file_size)?;

	read_central_directory(&mut reader, &end)
}

/// Найти EOCD с конца файла, допуская комментарий архива.
fn read_end_of_central_directory(
	reader: &mut BufReader<File>,
	file_size: u64,
) -> Result<EndOfCentralDirectory, ZipError> {
	if file_size < EOCD_SIZE {
		return Err(ZipError::Malformed(
			"файл короче EOCD: это не zip-архив".to_owned(),
		));
	}
	let window = (EOCD_SIZE + MAX_COMMENT_LENGTH).min(file_size);
	let window_offset = file_size - window;
	reader.seek(SeekFrom::Start(window_offset))?;
	let mut tail = vec![0u8; usize::try_from(window).unwrap_or(0)];
	reader.read_exact(&mut tail)?;
	let position = find_eocd(&tail, window_offset)?;
	let offset = window_offset + position as u64;
	let entries_disk = u64::from(le_u16(&tail, position + 8));
	let entries = u64::from(le_u16(&tail, position + 10));
	let cd_size = u64::from(le_u32(&tail, position + 12));
	let cd_offset = u64::from(le_u32(&tail, position + 16));
	let zip64 = entries_disk == u64::from(u16::MAX)
		|| entries == u64::from(u16::MAX)
		|| cd_size == u64::from(u32::MAX)
		|| cd_offset == u64::from(u32::MAX)
		|| has_zip64_locator(&tail, position);
	if zip64 {
		return Err(ZipError::Unsupported(
			"zip64 не поддерживается: архив содержит EOCD64 или его признаки".to_owned(),
		));
	}
	Ok(EndOfCentralDirectory {
		offset,
		cd_offset,
		cd_size,
		entries,
	})
}

/// Найти позицию EOCD в хвосте файла.
///
/// После EOCD допускается комментарий архива и хвостовое дополнение (в фикстуре
/// initial.pak за EOCD идут нулевые байты), поэтому запись ищется с конца файла
/// по signature и проверяется на самосогласованность: central directory должна
/// целиком помещаться перед EOCD.
fn find_eocd(tail: &[u8], tail_offset: u64) -> Result<usize, ZipError> {
	let size = EOCD_SIZE as usize;
	if tail.len() < size {
		return Err(ZipError::Malformed("хвост файла короче EOCD".to_owned()));
	}
	let signature = entry::END_OF_CENTRAL_DIRECTORY_SIGNATURE.to_le_bytes();
	for position in (0..=tail.len() - size).rev() {
		if tail[position..position + 4] != signature {
			continue;
		}
		let comment = usize::from(le_u16(tail, position + 20));
		if position + size + comment > tail.len() {
			continue;
		}
		let entries_disk = u64::from(le_u16(tail, position + 8));
		let entries = u64::from(le_u16(tail, position + 10));
		let cd_size = u64::from(le_u32(tail, position + 12));
		let cd_offset = u64::from(le_u32(tail, position + 16));
		let zip64 = entries_disk == u64::from(u16::MAX)
			|| entries == u64::from(u16::MAX)
			|| cd_size == u64::from(u32::MAX)
			|| cd_offset == u64::from(u32::MAX);
		if !zip64 {
			let absolute = tail_offset + position as u64;
			let fits = cd_offset
				.checked_add(cd_size)
				.is_some_and(|end| end <= absolute);
			if !fits || entries != entries_disk {
				continue;
			}
		}
		return Ok(position);
	}
	Err(ZipError::Malformed(
		"EOCD не найден: файл не является zip-архивом или повреждён".to_owned(),
	))
}

/// Есть ли перед EOCD локатор zip64.
fn has_zip64_locator(tail: &[u8], position: usize) -> bool {
	position >= 20
		&& tail[position - 20..position - 16] == entry::ZIP64_LOCATOR_SIGNATURE.to_le_bytes()
}

/// Прочитать central directory и разобрать все записи.
fn read_central_directory(
	reader: &mut BufReader<File>,
	end: &EndOfCentralDirectory,
) -> Result<Vec<EntryMeta>, ZipError> {
	let cd_end = end
		.cd_offset
		.checked_add(end.cd_size)
		.ok_or_else(|| ZipError::Malformed("размер central directory переполнен".to_owned()))?;
	if cd_end > end.offset {
		return Err(ZipError::Malformed(
			"central directory выходит за EOCD".to_owned(),
		));
	}
	reader.seek(SeekFrom::Start(end.cd_offset))?;
	let reserve = usize::try_from(end.entries)
		.unwrap_or(0)
		.min(MAX_ENTRIES_RESERVE as usize);
	let mut entries = Vec::with_capacity(reserve);
	let mut position = end.cd_offset;
	let mut header = [0u8; CENTRAL_HEADER_SIZE as usize];
	for _ in 0..end.entries {
		if position + CENTRAL_HEADER_SIZE > cd_end {
			return Err(ZipError::Malformed(
				"central directory обрывается".to_owned(),
			));
		}
		reader.read_exact(&mut header)?;
		let signature = le_u32(&header, 0);
		if signature != entry::CENTRAL_DIRECTORY_SIGNATURE {
			return Err(ZipError::InvalidSignature {
				context: "central directory",
				offset: position,
				found: signature,
			});
		}
		let name_length = u64::from(le_u16(&header, 28));
		let extra_length = u64::from(le_u16(&header, 30));
		let comment_length = u64::from(le_u16(&header, 32));
		let record_length = CENTRAL_HEADER_SIZE + name_length + extra_length + comment_length;
		if position + record_length > cd_end {
			return Err(ZipError::Malformed(
				"запись central directory выходит за её границы".to_owned(),
			));
		}
		let mut raw_name = vec![0u8; usize::try_from(name_length).unwrap_or(0)];
		reader.read_exact(&mut raw_name)?;
		if extra_length + comment_length > 0 {
			reader.seek(SeekFrom::Current((extra_length + comment_length) as i64))?;
		}
		let name = String::from_utf8(raw_name).map_err(|error| {
			ZipError::InvalidName(format!("имя записи не является корректным UTF-8: {error}"))
		})?;
		let compressed_size = u64::from(le_u32(&header, 20));
		let uncompressed_size = u64::from(le_u32(&header, 24));
		let local_header_offset = u64::from(le_u32(&header, 42));
		if compressed_size == u64::from(u32::MAX)
			|| uncompressed_size == u64::from(u32::MAX)
			|| local_header_offset == u64::from(u32::MAX)
		{
			return Err(ZipError::Unsupported(format!(
				"zip64 не поддерживается: запись {name} требует zip64"
			)));
		}
		if le_u16(&header, 8) & entry::ENCRYPTED_FLAG != 0 {
			return Err(ZipError::Unsupported(format!(
				"шифрование не поддерживается: запись {name}"
			)));
		}

		entries.push(EntryMeta {
			name,
			method: le_u16(&header, 10),
			crc32: le_u32(&header, 16),
			compressed_size,
			uncompressed_size,
			flags: le_u16(&header, 8),
			dos_time: le_u16(&header, 12),
			dos_date: le_u16(&header, 14),
			version_made_by: le_u16(&header, 4),
			version_needed: le_u16(&header, 6),
			internal_attrs: le_u16(&header, 36),
			external_attrs: le_u32(&header, 38),
			data_offset: 0,
			local_header_offset,
		});
		position += record_length;
	}
	Ok(entries)
}

/// Проверить локальный заголовок записи и вычислить офсет её данных.
fn read_local_header(
	reader: &mut BufReader<File>,
	entry: &EntryMeta,
	limit: u64,
) -> Result<u64, ZipError> {
	let offset = entry.local_header_offset;
	if offset + LOCAL_HEADER_SIZE > limit {
		return Err(ZipError::Malformed(format!(
			"локальный заголовок записи {} выходит за central directory",
			entry.name
		)));
	}
	reader.seek(SeekFrom::Start(offset))?;
	let mut header = [0u8; LOCAL_HEADER_SIZE as usize];
	reader.read_exact(&mut header)?;
	let signature = le_u32(&header, 0);
	if signature != entry::LOCAL_FILE_HEADER_SIGNATURE {
		return Err(ZipError::InvalidSignature {
			context: "локальный заголовок",
			offset,
			found: signature,
		});
	}
	let name_length = u64::from(le_u16(&header, 26));
	let extra_length = u64::from(le_u16(&header, 28));
	let mut raw_name = vec![0u8; usize::try_from(name_length).unwrap_or(0)];
	reader.read_exact(&mut raw_name)?;
	if raw_name != entry.name.as_bytes() {
		return Err(ZipError::Malformed(format!(
			"имя в локальном заголовке записи {} не совпадает с central directory",
			entry.name
		)));
	}
	let data_offset = offset + LOCAL_HEADER_SIZE + name_length + extra_length;
	if data_offset + entry.compressed_size > limit {
		return Err(ZipError::Malformed(format!(
			"данные записи {} выходят за central directory",
			entry.name
		)));
	}
	Ok(data_offset)
}

/// Проверяет, что запись не требует слишком много памяти.
fn check_entry_size(entry: &EntryMeta) -> Result<(), ZipError> {
	if entry.uncompressed_size > MAX_ENTRY_SIZE || entry.compressed_size > MAX_ENTRY_SIZE {
		return Err(ZipError::Unsupported(format!(
			"запись {} больше {} МиБ",
			entry.name,
			MAX_ENTRY_SIZE / (1024 * 1024)
		)));
	}

	Ok(())
}

/// Построить путь распаковки для имени записи.
fn extraction_path(dest: &Path, name: &str) -> Result<PathBuf, ZipError> {
	if name.is_empty() {
		return Err(ZipError::InvalidName("пустое имя записи".to_owned()));
	}
	let mut path = dest.to_path_buf();
	let mut components = 0usize;
	for component in name.split(['\\', '/']) {
		if component.is_empty() || component == "." {
			continue;
		}
		if component == ".." || component.contains(':') {
			return Err(ZipError::InvalidName(name.to_owned()));
		}
		path.push(component);
		components += 1;
	}
	if components == 0 {
		return Err(ZipError::InvalidName(name.to_owned()));
	}
	Ok(path)
}

/// Прочитать little-endian u16 по смещению.
fn le_u16(bytes: &[u8], offset: usize) -> u16 {
	u16::from_le_bytes([bytes[offset], bytes[offset + 1]])
}

/// Прочитать little-endian u32 по смещению.
fn le_u32(bytes: &[u8], offset: usize) -> u32 {
	u32::from_le_bytes([
		bytes[offset],
		bytes[offset + 1],
		bytes[offset + 2],
		bytes[offset + 3],
	])
}
