//! Сценарии работы с архивами игры: распаковка, обновление, проверка, бэкап.

use std::collections::HashMap;
use std::fs;
use std::io::{self, Read};
use std::path::{Path, PathBuf};
use std::time::{Duration, Instant};

use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_storage::zip::{self, ArchiveUpdate, EntryMeta, UpdateReport, ZipArchive, ZipError};
use thiserror::Error;

/// Маркер отредактированного архива.
pub const EDITED_MARKER: &str = "edited";

/// Списки файлов для распаковки.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum UnpackListKind {
	/// Основные файлы игры.
	Main,

	/// Основные файлы игры (оптимизированный список).
	Optimized,

	/// Файлы модификаций.
	Mods,
}

impl UnpackListKind {
	/// Текст списка, встроенный в бинарник.
	pub fn text(self) -> &'static str {
		match self {
			Self::Main => include_str!("../lists/unpack-list.lst"),
			Self::Optimized => include_str!("../lists/unpack-list-optimized.lst"),
			Self::Mods => include_str!("../lists/unpack-mod-list.lst"),
		}
	}

	/// Разобранный список.
	pub fn list(self) -> UnpackList {
		UnpackList::parse(self.text())
	}
}

/// Список файлов и каталогов для распаковки.
#[derive(Debug, Clone, Default)]
pub struct UnpackList {
	items: Vec<String>,
}

impl UnpackList {
	/// Разбирает список: по строке на путь, пустые строки и комментарии пропускаются.
	pub fn parse(text: &str) -> Self {
		let items = text
			.lines()
			.map(|line| line.trim())
			.filter(|line| !line.is_empty() && !line.starts_with(';'))
			.map(|line| line.replace('/', "\\"))
			.collect();

		Self { items }
	}

	/// Элементы списка.
	pub fn items(&self) -> &[String] {
		&self.items
	}

	/// Проверяет, попадает ли имя записи архива в список (без учёта регистра).
	pub fn matches(&self, name: &str) -> bool {
		let name = name.to_lowercase();

		self.items.iter().any(|item| {
			let item = item.to_lowercase();

			name == item || (name.starts_with(&item) && name[item.len()..].starts_with('\\'))
		})
	}
}

/// Ищет `initial.pak` в каталоге игры или его типовых подкаталогах.
///
/// Пользователь может выбрать корень установки (Epic/Steam), папку игры или `client`:
/// подходит первый существующий вариант из типового хвоста пути.
pub fn find_initial(dir: &Path) -> Option<PathBuf> {
	const TAIL: [&str; 8] = [
		"steamapps",
		"common",
		"SnowRunner",
		"en_us",
		"preload",
		"paks",
		"client",
		"initial.pak",
	];

	(0..TAIL.len())
		.map(|start| {
			TAIL[start..]
				.iter()
				.fold(dir.to_path_buf(), |path, part| path.join(part))
		})
		.find(|path| path.is_file())
}

/// Ошибка работы с архивом.
#[derive(Debug, Error)]
pub enum ArchiveError {
	/// Ошибка zip-слоя.
	#[error("{0}")]
	Zip(#[from] ZipError),

	/// Ошибка файловой системы.
	#[error("ошибка файловой системы: {0}")]
	Io(#[from] io::Error),

	/// Каталога с распакованными файлами нет.
	#[error("каталог не найден: {0}")]
	DirNotFound(PathBuf),

	/// В каталоге нет файлов.
	#[error("в каталоге нет файлов: {0}")]
	EmptyDir(PathBuf),

	/// Архив не найден.
	#[error("архив не найден: {0}")]
	ArchiveNotFound(PathBuf),
}

/// Отчёт о распаковке.
#[derive(Debug, Clone, Copy)]
pub struct UnpackReport {
	/// Сколько файлов извлечено.
	pub files: usize,

	/// Сколько байт записано.
	pub bytes: u64,

	/// Длительность операции.
	pub duration: Duration,
}

/// Отчёт об обновлении архива.
#[derive(Debug, Clone)]
pub struct UpdateResult {
	/// Отчёт zip-слоя.
	pub report: UpdateReport,

	/// Имена пересобранных записей.
	pub changed: Vec<String>,

	/// Имена добавленных записей.
	pub added: Vec<String>,
}

/// Отчёт о проверке архива.
#[derive(Debug, Clone, Copy)]
pub struct VerifyReport {
	/// Сколько записей проверено.
	pub entries: usize,

	/// Сколько байт распаковано.
	pub bytes: u64,

	/// Длительность проверки.
	pub duration: Duration,
}

/// Распаковывает из архива записи по списку.
pub fn unpack(
	archive_path: &Path,
	list: &UnpackList,
	dest: &Path,
	mut on_progress: impl FnMut(usize, usize),
) -> Result<UnpackReport, ArchiveError> {
	if !archive_path.is_file() {
		return Err(ArchiveError::ArchiveNotFound(archive_path.to_path_buf()));
	}

	let started = Instant::now();
	let archive = ZipArchive::open(archive_path)?;

	fs::create_dir_all(dest)?;

	let extracted =
		archive.extract_selected(|entry| list.matches(&entry.name), dest, &mut on_progress)?;

	Ok(UnpackReport {
		files: extracted.files,
		bytes: extracted.bytes,
		duration: started.elapsed(),
	})
}

/// Обновляет архив файлами из каталога и добавляет маркер `edited`.
///
/// Файлы, содержимое которых совпадает с записью архива (CRC32 и размер), не пересобираются.
pub fn update_from_dir(archive_path: &Path, dir: &Path) -> Result<UpdateResult, ArchiveError> {
	if !archive_path.is_file() {
		return Err(ArchiveError::ArchiveNotFound(archive_path.to_path_buf()));
	}

	if !dir.is_dir() {
		return Err(ArchiveError::DirNotFound(dir.to_path_buf()));
	}

	let files = collect_files(dir)?;

	if files.is_empty() {
		return Err(ArchiveError::EmptyDir(dir.to_path_buf()));
	}

	let mut changed: Vec<(String, Vec<u8>)> = Vec::new();
	let mut appended: Vec<(String, Vec<u8>)> = Vec::new();
	let mut has_marker = false;

	{
		let archive = ZipArchive::open(archive_path)?;
		let mut index: HashMap<String, &EntryMeta> = HashMap::new();

		for entry in archive.entries() {
			if entry.name.eq_ignore_ascii_case(EDITED_MARKER) {
				has_marker = true;
			}

			if !entry.is_directory() {
				index.entry(entry.name.to_lowercase()).or_insert(entry);
			}
		}

		for (name, path) in &files {
			match index.get(&name.to_lowercase()) {
				Some(entry) => {
					let (crc32, size) = file_crc32(path)?;

					if crc32 != entry.crc32 || size != entry.uncompressed_size {
						changed.push((entry.name.clone(), fs::read(path)?));
					}
				}
				None => appended.push((name.clone(), fs::read(path)?)),
			}
		}
	}

	let changed_names = changed.iter().map(|(name, _)| name.clone()).collect();
	let added_names = appended.iter().map(|(name, _)| name.clone()).collect();

	if !has_marker {
		appended.push((EDITED_MARKER.to_owned(), Vec::new()));
	}

	let report = zip::update(archive_path, &ArchiveUpdate { changed, appended })?;

	Ok(UpdateResult {
		report,
		changed: changed_names,
		added: added_names,
	})
}

/// Проверяет целостность всех записей архива (inflate + CRC32).
pub fn verify(
	archive_path: &Path,
	mut on_progress: impl FnMut(usize, usize),
) -> Result<VerifyReport, ArchiveError> {
	if !archive_path.is_file() {
		return Err(ArchiveError::ArchiveNotFound(archive_path.to_path_buf()));
	}

	let started = Instant::now();
	let archive = ZipArchive::open(archive_path)?;
	let entries: Vec<&EntryMeta> = archive
		.entries()
		.iter()
		.filter(|entry| !entry.is_directory())
		.collect();
	let total = entries.len();
	let mut bytes = 0;

	for (index, entry) in entries.iter().enumerate() {
		bytes += archive.read(entry)?.len() as u64;
		on_progress(index + 1, total);
	}

	Ok(VerifyReport {
		entries: total,
		bytes,
		duration: started.elapsed(),
	})
}

/// Копирует файл в бэкап, создавая каталоги.
pub fn backup_file(source: &Path, target: &Path) -> Result<u64, ArchiveError> {
	if !source.is_file() {
		return Err(ArchiveError::ArchiveNotFound(source.to_path_buf()));
	}

	if let Some(parent) = target.parent() {
		fs::create_dir_all(parent)?;
	}

	Ok(fs::copy(source, target)?)
}

/// Восстанавливает файл из бэкапа.
pub fn restore_backup(backup: &Path, target: &Path) -> Result<u64, ArchiveError> {
	if !backup.is_file() {
		return Err(ArchiveError::ArchiveNotFound(backup.to_path_buf()));
	}

	if let Some(parent) = target.parent() {
		fs::create_dir_all(parent)?;
	}

	Ok(fs::copy(backup, target)?)
}

/// Собирает файлы каталога рекурсивно: пары «имя записи в архиве» и «путь на диске».
fn collect_files(dir: &Path) -> io::Result<Vec<(String, PathBuf)>> {
	let mut files = Vec::new();
	collect_into(dir, dir, &mut files)?;
	files.sort_by(|left, right| left.0.cmp(&right.0));

	Ok(files)
}

/// Рекурсивный обход каталога.
fn collect_into(root: &Path, dir: &Path, files: &mut Vec<(String, PathBuf)>) -> io::Result<()> {
	for entry in fs::read_dir(dir)? {
		let entry = entry?;
		let path = entry.path();
		let metadata = entry.metadata()?;

		if metadata.is_dir() {
			collect_into(root, &path, files)?;
			continue;
		}

		if !metadata.is_file() {
			continue;
		}

		let relative = path.strip_prefix(root).map_err(io::Error::other)?;
		let name = relative
			.components()
			.map(|component| component.as_os_str().to_string_lossy().into_owned())
			.collect::<Vec<_>>()
			.join("\\");

		files.push((name, path));
	}

	Ok(())
}

/// Считает CRC32 и размер файла потоково.
fn file_crc32(path: &Path) -> io::Result<(u32, u64)> {
	let mut file = fs::File::open(path)?;
	let mut hasher = crc32fast::Hasher::new();
	let mut buffer = vec![0_u8; 64 * 1024];
	let mut size = 0_u64;

	loop {
		let read = file.read(&mut buffer)?;

		if read == 0 {
			break;
		}

		hasher.update(&buffer[..read]);
		size += read as u64;
	}

	Ok((hasher.finalize(), size))
}
