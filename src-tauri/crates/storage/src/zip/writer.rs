//! Пересборка zip-архива: сохранение порядка и сжатых данных, атомарная замена.

use std::collections::HashMap;
use std::fs::{self, File};
use std::io::{BufWriter, Write};
use std::path::{Path, PathBuf};
use std::time::{Duration, Instant};

use super::ZipError;
use super::deflate;
use super::entry::{self, EntryMeta};
use super::reader::{BUFFER_SIZE, ZipArchive};

/// Число попыток атомарной замены архива.
const REPLACE_ATTEMPTS: u32 = 10;

/// Пауза между попытками замены.
const REPLACE_DELAY: Duration = Duration::from_millis(150);

/// Версия «made by» для новых записей, если у существующих её нет.
const DEFAULT_VERSION_MADE_BY: u16 = 0x031E;

/// Размер фиксированной части локального заголовка.
const LOCAL_HEADER_SIZE: u64 = 30;

/// Размер фиксированной части записи central directory.
const CENTRAL_HEADER_SIZE: u64 = 46;

/// Размер EOCD без комментария.
const EOCD_SIZE: u64 = 22;

/// Изменения архива.
#[derive(Debug, Clone, Default)]
pub struct ArchiveUpdate {
	/// Записи на замену: имя как в архиве и новые данные.
	pub changed: Vec<(String, Vec<u8>)>,
	/// Новые записи, которые добавляются в конец архива в этом порядке.
	pub appended: Vec<(String, Vec<u8>)>,
}

/// Итог обновления архива.
#[derive(Debug, Clone)]
pub struct UpdateReport {
	/// Сколько записей скопировано сжатым потоком без изменений.
	pub copied: usize,
	/// Сколько записей пересжато.
	pub recompressed: usize,
	/// Сколько записей добавлено.
	pub added: usize,
	/// Размер архива до обновления.
	pub size_before: u64,
	/// Размер архива после обновления.
	pub size_after: u64,
	/// Сколько длилась пересборка вместе с заменой файла.
	pub duration: Duration,
}

/// Результат пересборки до замены исходного файла.
struct Rebuilt {
	/// Сколько записей скопировано без изменений.
	copied: usize,
	/// Сколько записей пересжато.
	recompressed: usize,
	/// Сколько записей добавлено.
	added: usize,
	/// Размер архива до обновления.
	size_before: u64,
	/// Размер пересобранного архива.
	size_after: u64,
}

/// Пересобрать архив по алгоритму плана (раздел 4.2).
///
/// Порядок записей сохраняется, неизменённые записи копируются сжатым потоком,
/// изменённые пересжимаются тем же методом, новые дописываются в конец в
/// заданном порядке. Затем пишется central directory в том же порядке и EOCD.
///
/// Замена атомарная: сначала пишется файл с суффиксом .tmp рядом с исходным,
/// он синхронизируется на диск и затем заменяет исходный с повторами на
/// Windows. Перед вызовом закройте другие дескрипторы этого архива: Windows не
/// позволяет заменить открытый файл.
pub fn update(path: &Path, update: &ArchiveUpdate) -> Result<UpdateReport, ZipError> {
	let started = Instant::now();
	let temporary = temporary_path(path);
	let rebuilt = match rebuild(path, update, &temporary) {
		Ok(rebuilt) => rebuilt,
		Err(error) => {
			let _ = fs::remove_file(&temporary);
			return Err(error);
		}
	};
	if let Err(error) = replace_file(&temporary, path) {
		let _ = fs::remove_file(&temporary);
		return Err(error);
	}
	Ok(UpdateReport {
		copied: rebuilt.copied,
		recompressed: rebuilt.recompressed,
		added: rebuilt.added,
		size_before: rebuilt.size_before,
		size_after: rebuilt.size_after,
		duration: started.elapsed(),
	})
}

/// Пересобрать архив во временный файл.
fn rebuild(path: &Path, update: &ArchiveUpdate, temporary: &Path) -> Result<Rebuilt, ZipError> {
	let archive = ZipArchive::open(path)?;
	let size_before = archive.file_size();
	if archive
		.entries()
		.iter()
		.any(|entry| entry.flags & entry::DATA_DESCRIPTOR_FLAG != 0)
	{
		return Err(ZipError::Unsupported(
			"записи с data descriptor не поддерживаются".to_owned(),
		));
	}
	let changed = changed_index(&archive, &update.changed)?;
	check_appended(&archive, &update.appended)?;
	let version_made_by = archive
		.entries()
		.iter()
		.find(|entry| entry.version_made_by != 0)
		.map_or(DEFAULT_VERSION_MADE_BY, |entry| entry.version_made_by);
	let (dos_time, dos_date) = entry::current_dos_datetime();
	let file = File::create(temporary)?;
	let mut writer = BufWriter::with_capacity(BUFFER_SIZE, file);
	let mut records = Vec::with_capacity(archive.entries().len() + update.appended.len());
	let mut local_offset = 0u64;
	let mut copied = 0usize;
	let mut recompressed = 0usize;
	let mut added = 0usize;
	for source in archive.entries() {
		let mut record = source.clone();
		record.local_header_offset = local_offset;
		record.data_offset = local_offset + LOCAL_HEADER_SIZE + record.name.len() as u64;
		match changed.get(source.name.as_str()) {
			Some(data) => {
				let payload = pack(source.method, data)?;
				record.crc32 = entry::checksum(data);
				record.uncompressed_size = data.len() as u64;
				record.compressed_size = payload.len() as u64;
				write_local_header(&mut writer, &record)?;
				writer.write_all(&payload)?;
				local_offset = record.data_offset + record.compressed_size;
				recompressed += 1;
			}
			None => {
				write_local_header(&mut writer, &record)?;
				let bytes = archive.copy_compressed(source, &mut writer)?;
				local_offset = record.data_offset + bytes;
				copied += 1;
			}
		}
		records.push(record);
	}
	for (name, data) in &update.appended {
		let method = if data.is_empty() {
			entry::METHOD_STORED
		} else {
			entry::METHOD_DEFLATE
		};
		let payload = pack(method, data)?;
		let mut record = EntryMeta {
			name: name.clone(),
			method,
			crc32: entry::checksum(data),
			compressed_size: payload.len() as u64,
			uncompressed_size: data.len() as u64,
			flags: 0,
			dos_time,
			dos_date,
			version_made_by,
			version_needed: if method == entry::METHOD_DEFLATE {
				20
			} else {
				10
			},
			internal_attrs: 0,
			external_attrs: 0,
			data_offset: 0,
			local_header_offset: local_offset,
		};
		record.data_offset =
			record.local_header_offset + LOCAL_HEADER_SIZE + record.name.len() as u64;
		write_local_header(&mut writer, &record)?;
		writer.write_all(&payload)?;
		local_offset = record.data_offset + record.compressed_size;
		added += 1;
		records.push(record);
	}
	let cd_offset = local_offset;
	let mut cd_size = 0u64;
	for record in &records {
		write_central_header(&mut writer, record)?;
		cd_size += CENTRAL_HEADER_SIZE + record.name.len() as u64;
	}
	write_end_of_central_directory(&mut writer, records.len(), cd_size, cd_offset)?;
	let size_after = cd_offset + cd_size + EOCD_SIZE;
	writer.flush()?;
	writer.get_ref().sync_all()?;
	Ok(Rebuilt {
		copied,
		recompressed,
		added,
		size_before,
		size_after,
	})
}

/// Собрать индекс изменённых записей, проверив их наличие и уникальность.
fn changed_index<'a>(
	archive: &ZipArchive,
	changed: &'a [(String, Vec<u8>)],
) -> Result<HashMap<&'a str, &'a [u8]>, ZipError> {
	let mut index = HashMap::with_capacity(changed.len());
	for (name, data) in changed {
		if archive.entry(name).is_none() {
			return Err(ZipError::EntryNotFound(name.clone()));
		}
		check_size(name, data.len() as u64)?;
		if index.insert(name.as_str(), data.as_slice()).is_some() {
			return Err(ZipError::InvalidName(format!(
				"запись {name} указана в изменениях дважды"
			)));
		}
	}
	Ok(index)
}

/// Проверить новые записи: имена и размеры.
fn check_appended(archive: &ZipArchive, appended: &[(String, Vec<u8>)]) -> Result<(), ZipError> {
	let mut names = HashMap::with_capacity(appended.len());
	for (name, data) in appended {
		check_name(name)?;
		check_size(name, data.len() as u64)?;
		if archive.entry(name).is_some() {
			return Err(ZipError::InvalidName(format!(
				"запись {name} уже есть в архиве"
			)));
		}
		if names.insert(name.as_str(), ()).is_some() {
			return Err(ZipError::InvalidName(format!(
				"запись {name} добавлена дважды"
			)));
		}
	}
	Ok(())
}

/// Проверить, что имя записи безопасно как относительный путь архива.
fn check_name(name: &str) -> Result<(), ZipError> {
	if name.is_empty()
		|| name.starts_with('\\')
		|| name.starts_with('/')
		|| name.contains('\0')
		|| name.contains(':')
		|| name.split(['\\', '/']).any(|component| component == "..")
	{
		return Err(ZipError::InvalidName(name.to_owned()));
	}
	Ok(())
}

/// Проверить, что размер укладывается в 32-битные поля формата.
fn check_size(name: &str, size: u64) -> Result<(), ZipError> {
	if size > u64::from(u32::MAX) {
		return Err(ZipError::Unsupported(format!(
			"zip64 не поддерживается: данные записи {name} больше 4 ГиБ"
		)));
	}
	Ok(())
}

/// Сжать данные методом записи.
fn pack(method: u16, data: &[u8]) -> Result<Vec<u8>, ZipError> {
	match method {
		entry::METHOD_STORED => Ok(data.to_vec()),
		entry::METHOD_DEFLATE => deflate::compress(data),
		other => Err(ZipError::Unsupported(format!(
			"метод сжатия {other} не поддерживается"
		))),
	}
}

/// Записать локальный заголовок записи.
fn write_local_header<W: Write>(writer: &mut W, record: &EntryMeta) -> Result<(), ZipError> {
	let name = record.name.as_bytes();
	let name_length = name_length(name)?;
	let compressed = u32_field(record.compressed_size, "сжатый размер записи")?;
	let uncompressed = u32_field(record.uncompressed_size, "распакованный размер записи")?;
	let mut header = Vec::with_capacity((LOCAL_HEADER_SIZE as usize) + name.len());
	header.extend_from_slice(&entry::LOCAL_FILE_HEADER_SIGNATURE.to_le_bytes());
	header.extend_from_slice(&record.version_needed.to_le_bytes());
	header.extend_from_slice(&record.flags.to_le_bytes());
	header.extend_from_slice(&record.method.to_le_bytes());
	header.extend_from_slice(&record.dos_time.to_le_bytes());
	header.extend_from_slice(&record.dos_date.to_le_bytes());
	header.extend_from_slice(&record.crc32.to_le_bytes());
	header.extend_from_slice(&compressed.to_le_bytes());
	header.extend_from_slice(&uncompressed.to_le_bytes());
	header.extend_from_slice(&name_length.to_le_bytes());
	header.extend_from_slice(&0u16.to_le_bytes());
	header.extend_from_slice(name);
	writer.write_all(&header)?;
	Ok(())
}

/// Записать запись central directory.
fn write_central_header<W: Write>(writer: &mut W, record: &EntryMeta) -> Result<(), ZipError> {
	let name = record.name.as_bytes();
	let name_length = name_length(name)?;
	let compressed = u32_field(record.compressed_size, "сжатый размер записи")?;
	let uncompressed = u32_field(record.uncompressed_size, "распакованный размер записи")?;
	let local_offset = u32_field(record.local_header_offset, "офсет локального заголовка")?;
	let mut header = Vec::with_capacity((CENTRAL_HEADER_SIZE as usize) + name.len());
	header.extend_from_slice(&entry::CENTRAL_DIRECTORY_SIGNATURE.to_le_bytes());
	header.extend_from_slice(&record.version_made_by.to_le_bytes());
	header.extend_from_slice(&record.version_needed.to_le_bytes());
	header.extend_from_slice(&record.flags.to_le_bytes());
	header.extend_from_slice(&record.method.to_le_bytes());
	header.extend_from_slice(&record.dos_time.to_le_bytes());
	header.extend_from_slice(&record.dos_date.to_le_bytes());
	header.extend_from_slice(&record.crc32.to_le_bytes());
	header.extend_from_slice(&compressed.to_le_bytes());
	header.extend_from_slice(&uncompressed.to_le_bytes());
	header.extend_from_slice(&name_length.to_le_bytes());
	header.extend_from_slice(&0u16.to_le_bytes());
	header.extend_from_slice(&0u16.to_le_bytes());
	header.extend_from_slice(&0u16.to_le_bytes());
	header.extend_from_slice(&record.internal_attrs.to_le_bytes());
	header.extend_from_slice(&record.external_attrs.to_le_bytes());
	header.extend_from_slice(&local_offset.to_le_bytes());
	header.extend_from_slice(name);
	writer.write_all(&header)?;
	Ok(())
}

/// Записать EOCD без комментария архива.
fn write_end_of_central_directory<W: Write>(
	writer: &mut W,
	entries: usize,
	cd_size: u64,
	cd_offset: u64,
) -> Result<(), ZipError> {
	let entries = u16::try_from(entries).map_err(|_| {
		ZipError::Unsupported("zip64 не поддерживается: в архиве больше 65535 записей".to_owned())
	})?;
	let size = u32_field(cd_size, "размер central directory")?;
	let offset = u32_field(cd_offset, "офсет central directory")?;
	let mut record = Vec::with_capacity(EOCD_SIZE as usize);
	record.extend_from_slice(&entry::END_OF_CENTRAL_DIRECTORY_SIGNATURE.to_le_bytes());
	record.extend_from_slice(&0u16.to_le_bytes());
	record.extend_from_slice(&0u16.to_le_bytes());
	record.extend_from_slice(&entries.to_le_bytes());
	record.extend_from_slice(&entries.to_le_bytes());
	record.extend_from_slice(&size.to_le_bytes());
	record.extend_from_slice(&offset.to_le_bytes());
	record.extend_from_slice(&0u16.to_le_bytes());
	writer.write_all(&record)?;
	Ok(())
}

/// Проверить длину имени для 16-битного поля формата.
fn name_length(name: &[u8]) -> Result<u16, ZipError> {
	u16::try_from(name.len()).map_err(|_| {
		ZipError::Unsupported(format!("слишком длинное имя записи: {} байт", name.len()))
	})
}

/// Проверить значение для 32-битного поля формата.
fn u32_field(value: u64, what: &str) -> Result<u32, ZipError> {
	u32::try_from(value)
		.map_err(|_| ZipError::Unsupported(format!("zip64 не поддерживается: {what} больше 4 ГиБ")))
}

/// Путь временного файла рядом с архивом.
fn temporary_path(path: &Path) -> PathBuf {
	let mut name = path.as_os_str().to_os_string();
	name.push(".tmp");
	PathBuf::from(name)
}

/// Заменить целевой файл временным с повторами на Windows.
fn replace_file(temporary: &Path, target: &Path) -> Result<(), ZipError> {
	let _ = clear_readonly(target);
	let mut last_error = None;
	for attempt in 0..REPLACE_ATTEMPTS {
		match fs::rename(temporary, target) {
			Ok(()) => return Ok(()),
			Err(error) => {
				if error.kind() == std::io::ErrorKind::PermissionDenied {
					let _ = clear_readonly(target);
				}
				last_error = Some(error);
				if attempt + 1 < REPLACE_ATTEMPTS {
					std::thread::sleep(REPLACE_DELAY);
				}
			}
		}
	}
	match last_error {
		Some(error) => Err(ZipError::Io(error)),
		None => Err(ZipError::Io(std::io::Error::other(
			"не удалось заменить архив временным файлом".to_owned(),
		))),
	}
}

/// Снять признак read-only с файла, если он выставлен (Windows).
#[cfg(windows)]
fn clear_readonly(path: &Path) -> std::io::Result<()> {
	let metadata = fs::metadata(path)?;
	let mut permissions = metadata.permissions();
	if permissions.readonly() {
		// На Windows это единственный безопасный способ снять атрибут read-only;
		// на Unix такая ветка не компилируется (см. вариант ниже).
		#[allow(clippy::permissions_set_readonly_false)]
		permissions.set_readonly(false);
		fs::set_permissions(path, permissions)?;
	}
	Ok(())
}

/// На Unix-подобных системах отдельного атрибута read-only нет.
#[cfg(not(windows))]
fn clear_readonly(_path: &Path) -> std::io::Result<()> {
	Ok(())
}
