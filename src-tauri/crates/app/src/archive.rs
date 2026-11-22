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

use crate::integrity;

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

	/// Архив изменился с момента распаковки.
	#[error("архив изменился с момента распаковки: {0}")]
	Changed(PathBuf),

	/// Отпечатка архива нет: запись запрещена до распаковки.
	#[error("нет отпечатка архива: {0}")]
	Unknown(PathBuf),

	/// Отпечаток не записан или не удалён.
	#[error("ошибка отпечатка {path}: {source}")]
	Fingerprint {
		/// Путь к файлу отпечатка.
		path: PathBuf,

		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},
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

/// Результат чистой распаковки.
#[derive(Debug, Clone)]
pub struct FreshUnpack {
	/// Отчёт о распаковке.
	pub report: UnpackReport,

	/// Каталог, который не удалось удалить после подмены.
	pub leftover: Option<PathBuf>,
}

/// Распаковывает архив в пустой каталог, не смешивая файлы старой и новой версии.
///
/// Прежний каталог при `previous = Some` уходит в `previous`, иначе удаляется
/// после успешной подмены. Распаковка идёт в промежуточный каталог, поэтому
/// битый архив не уничтожает рабочие файлы. Ошибка удаления старого каталога
/// не блокирует операцию: путь возвращается в [FreshUnpack::leftover].
pub fn unpack_fresh(
	archive_path: &Path,
	list: &UnpackList,
	dest: &Path,
	previous: Option<&Path>,
	on_progress: impl FnMut(usize, usize),
) -> Result<FreshUnpack, ArchiveError> {
	remove_leftovers(dest);

	let staging = sibling(dest, "new");
	let trash = previous
		.map(Path::to_path_buf)
		.unwrap_or_else(|| sibling(dest, "old"));

	let report = match unpack(archive_path, list, &staging, on_progress) {
		Ok(report) => report,
		Err(error) => {
			let _ = fs::remove_dir_all(&staging);

			return Err(error);
		}
	};

	let leftover = replace_dir(dest, &staging, &trash, previous.is_some())?;

	Ok(FreshUnpack { report, leftover })
}

/// Распаковывает архив и запоминает его отпечаток.
pub fn unpack_and_remember(
	archive_path: &Path,
	list: &UnpackList,
	dest: &Path,
	previous: Option<&Path>,
	store: &Path,
	on_progress: impl FnMut(usize, usize),
) -> Result<FreshUnpack, ArchiveError> {
	let result = unpack_fresh(archive_path, list, dest, previous, on_progress)?;

	integrity::remember(archive_path, store)?;

	Ok(result)
}

/// Обновляет основной архив, если он не изменился с момента распаковки,
/// и запоминает отпечаток пересобранного файла.
pub fn update_checked(
	archive_path: &Path,
	dir: &Path,
	store: &Path,
) -> Result<UpdateResult, ArchiveError> {
	integrity::require_unchanged(archive_path, store)?;

	let result = update_from_dir(archive_path, dir)?;

	integrity::remember(archive_path, store)?;

	Ok(result)
}

/// Подменяет каталог `dir` готовым каталогом `staging`.
///
/// Прежний каталог переименовывается в `trash` до подмены: при сбое второго
/// переименования он возвращается на место. С `keep_trash` прежний каталог
/// остаётся, иначе удаляется после успеха; ошибка удаления возвращается как
/// путь остатка и не блокирует операцию. `staging` при любой ошибке удаляется.
pub fn replace_dir(
	dir: &Path,
	staging: &Path,
	trash: &Path,
	keep_trash: bool,
) -> Result<Option<PathBuf>, ArchiveError> {
	let result = swap_dir(dir, staging, trash, keep_trash);

	if result.is_err() {
		let _ = fs::remove_dir_all(staging);
	}

	result
}

/// Переименования подмены каталога; очистку `staging` делает [replace_dir].
fn swap_dir(
	dir: &Path,
	staging: &Path,
	trash: &Path,
	keep_trash: bool,
) -> Result<Option<PathBuf>, ArchiveError> {
	let had_dir = dir.exists();

	if had_dir {
		if keep_trash {
			if let Some(parent) = trash.parent() {
				fs::create_dir_all(parent)?;
			}

			remove_dir_all_if_exists(trash)?;
		}

		fs::rename(dir, trash)?;
	}

	if let Err(source) = fs::rename(staging, dir) {
		if had_dir {
			let _ = fs::rename(trash, dir);
		}

		return Err(ArchiveError::Io(source));
	}

	if keep_trash {
		return Ok(None);
	}

	match fs::remove_dir_all(trash) {
		Ok(()) => Ok(None),
		Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(None),
		Err(_) => Ok(Some(trash.to_path_buf())),
	}
}

/// Убирает остатки прошлых распаковок рядом с целевым каталогом.
fn remove_leftovers(dest: &Path) {
	let Some(parent) = dest.parent() else {
		return;
	};
	let Some(name) = dest.file_name().and_then(|name| name.to_str()) else {
		return;
	};
	let Ok(entries) = fs::read_dir(parent) else {
		return;
	};

	for entry in entries.flatten() {
		let Some(file_name) = entry.file_name().to_str().map(str::to_owned) else {
			continue;
		};

		if file_name.starts_with(&format!("{name}.new-"))
			|| file_name.starts_with(&format!("{name}.old-"))
		{
			let _ = fs::remove_dir_all(entry.path());
		}
	}
}

/// Путь промежуточного каталога рядом с целевым: `<dest>.<kind>-<pid>`.
fn sibling(dest: &Path, kind: &str) -> PathBuf {
	let mut name = dest.as_os_str().to_os_string();

	name.push(format!(".{kind}-{}", std::process::id()));

	PathBuf::from(name)
}

/// Удаляет каталог, если он существует.
fn remove_dir_all_if_exists(path: &Path) -> io::Result<()> {
	match fs::remove_dir_all(path) {
		Ok(()) => Ok(()),
		Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(()),
		Err(source) => Err(source),
	}
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

/// Копирует файл в бэкап атомарной заменой, создавая каталоги.
pub fn backup_file(source: &Path, target: &Path) -> Result<u64, ArchiveError> {
	if !source.is_file() {
		return Err(ArchiveError::ArchiveNotFound(source.to_path_buf()));
	}

	copy_atomic(source, target).map_err(ArchiveError::Io)
}

/// Восстанавливает файл из бэкапа атомарной заменой.
pub fn restore_backup(backup: &Path, target: &Path) -> Result<u64, ArchiveError> {
	if !backup.is_file() {
		return Err(ArchiveError::ArchiveNotFound(backup.to_path_buf()));
	}

	copy_atomic(backup, target).map_err(ArchiveError::Io)
}

/// Копирует файл во временный рядом с целевым и переименовывает:
/// обрыв копирования не портит уже существующий файл.
fn copy_atomic(source: &Path, target: &Path) -> io::Result<u64> {
	if let Some(parent) = target.parent() {
		fs::create_dir_all(parent)?;
	}

	let mut temporary = target.as_os_str().to_os_string();

	temporary.push(".tmp");

	let temporary = PathBuf::from(temporary);
	let result = fs::copy(source, &temporary).and_then(|bytes| {
		fs::rename(&temporary, target)?;

		Ok(bytes)
	});

	if result.is_err() {
		let _ = fs::remove_file(&temporary);
	}

	result
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
