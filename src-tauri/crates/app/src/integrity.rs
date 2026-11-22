//! Отпечаток архива игры: путь, размер, время изменения и CRC центрального каталога.
//!
//! Отпечаток пишется в `jsons/archive.json` после распаковки и пересборки архива
//! и позволяет отличить нормальную работу от внешней замены `initial.pak`
//! (обновление игры, ручная подмена, восстановление бэкапа). Модуль не знает
//! о Tauri и командах: это чистый прикладной сценарий.

use std::fs;
use std::io;
use std::path::{Path, PathBuf};
use std::time::UNIX_EPOCH;

use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_storage::zip::{self, EntryMeta};

use crate::archive::{ArchiveError, EDITED_MARKER};

/// Отпечаток архива.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ArchiveFingerprint {
	/// Канонический путь к архиву.
	pub path: String,

	/// Размер файла архива в байтах.
	pub size: u64,

	/// Время изменения в миллисекундах UNIX; `0`, если время недоступно.
	pub modified_ms: u64,

	/// CRC32 канонического представления записей central directory.
	pub central_crc: u32,
}

/// Состояние архива относительно сохранённого отпечатка.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum ArchiveState {
	/// Архив совпадает с отпечатком.
	Ok,

	/// Архив изменился: запись в него запрещена.
	Changed,

	/// Отпечатка нет или архив не читается: запись запрещена до распаковки.
	Unknown,
}

/// Результат проверки архива.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Status {
	/// Состояние архива.
	pub state: ArchiveState,

	/// В архиве есть маркер `edited`.
	pub marker_present: bool,
}

/// Хранилище отпечатка.
#[derive(Debug, Clone)]
pub struct Store {
	/// Путь к json-файлу отпечатка.
	path: PathBuf,
}

impl Store {
	/// Хранилище по пути к json-файлу.
	pub fn new(path: impl Into<PathBuf>) -> Self {
		Self { path: path.into() }
	}

	/// Читает отпечаток; отсутствующий или битый файл даёт `None`.
	pub fn load(&self) -> Option<ArchiveFingerprint> {
		fs::read(&self.path)
			.ok()
			.and_then(|bytes| serde_json::from_slice(&bytes).ok())
	}

	/// Записывает отпечаток атомарной заменой.
	pub fn save(&self, fingerprint: &ArchiveFingerprint) -> Result<(), ArchiveError> {
		let bytes = serde_json::to_vec_pretty(fingerprint)
			.map_err(|error| fingerprint_error(&self.path, io::Error::other(error)))?;

		if let Some(parent) = self.path.parent() {
			fs::create_dir_all(parent).map_err(|source| fingerprint_error(&self.path, source))?;
		}

		sxmle_storage::fs::write_atomic(&self.path, &bytes)
			.map_err(|source| fingerprint_error(&self.path, source))
	}

	/// Удаляет отпечаток; отсутствующий файл не считается ошибкой.
	pub fn clear(&self) -> Result<(), ArchiveError> {
		match fs::remove_file(&self.path) {
			Ok(()) => Ok(()),
			Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(()),
			Err(source) => Err(fingerprint_error(&self.path, source)),
		}
	}
}

/// Считает отпечаток архива.
pub fn compute(archive: &Path) -> Result<ArchiveFingerprint, ArchiveError> {
	scan(archive).map(|(fingerprint, _)| fingerprint)
}

/// Проверяет архив относительно отпечатка; никогда не падает.
pub fn check(archive: Option<&Path>, store: &Path) -> Status {
	let Some(archive) = archive else {
		return Status {
			state: ArchiveState::Unknown,
			marker_present: false,
		};
	};

	let Ok((current, entries)) = scan(archive) else {
		return Status {
			state: ArchiveState::Unknown,
			marker_present: false,
		};
	};
	let marker_present = has_marker(&entries);
	let state = match Store::new(store).load() {
		Some(known) if same(&known, &current) => ArchiveState::Ok,
		Some(_) => ArchiveState::Changed,
		None => ArchiveState::Unknown,
	};

	Status {
		state,
		marker_present,
	}
}

/// Требует, чтобы архив не изменился с момента последней распаковки.
pub fn require_unchanged(archive: &Path, store: &Path) -> Result<(), ArchiveError> {
	let Some(known) = Store::new(store).load() else {
		return Err(ArchiveError::Unknown(archive.to_path_buf()));
	};

	if !archive.is_file() {
		return Err(ArchiveError::ArchiveNotFound(archive.to_path_buf()));
	}

	let current = compute(archive).map_err(|_| ArchiveError::Unknown(archive.to_path_buf()))?;

	if same(&known, &current) {
		Ok(())
	} else {
		Err(ArchiveError::Changed(archive.to_path_buf()))
	}
}

/// Считает отпечаток и записывает его.
pub fn remember(archive: &Path, store: &Path) -> Result<ArchiveFingerprint, ArchiveError> {
	let fingerprint = compute(archive)?;

	Store::new(store).save(&fingerprint)?;

	Ok(fingerprint)
}

/// Читает метаданные и записи central directory архива.
fn scan(archive: &Path) -> Result<(ArchiveFingerprint, Vec<EntryMeta>), ArchiveError> {
	let canonical = fs::canonicalize(archive)?;
	let metadata = fs::metadata(&canonical)?;
	let entries = zip::read_entries(&canonical)?;
	let fingerprint = ArchiveFingerprint {
		path: canonical.to_string_lossy().into_owned(),
		size: metadata.len(),
		modified_ms: modified_ms(&metadata),
		central_crc: entries_crc(&entries),
	};

	Ok((fingerprint, entries))
}

/// CRC32 канонического представления записей central directory.
///
/// Порядок записей учитывается; `data_offset` не входит, потому что выводится
/// из локального заголовка и без него не читается.
fn entries_crc(entries: &[EntryMeta]) -> u32 {
	let mut hasher = crc32fast::Hasher::new();

	for entry in entries {
		let name = entry.name.as_bytes();

		hasher.update(&(name.len() as u32).to_le_bytes());
		hasher.update(name);
		hasher.update(&entry.method.to_le_bytes());
		hasher.update(&entry.crc32.to_le_bytes());
		hasher.update(&entry.compressed_size.to_le_bytes());
		hasher.update(&entry.uncompressed_size.to_le_bytes());
		hasher.update(&entry.flags.to_le_bytes());
		hasher.update(&entry.dos_time.to_le_bytes());
		hasher.update(&entry.dos_date.to_le_bytes());
		hasher.update(&entry.version_made_by.to_le_bytes());
		hasher.update(&entry.version_needed.to_le_bytes());
		hasher.update(&entry.internal_attrs.to_le_bytes());
		hasher.update(&entry.external_attrs.to_le_bytes());
		hasher.update(&entry.local_header_offset.to_le_bytes());
	}

	hasher.finalize()
}

/// Совпадают ли отпечатки: путь сравнивается без учёта регистра на Windows.
fn same(known: &ArchiveFingerprint, current: &ArchiveFingerprint) -> bool {
	known.size == current.size
		&& known.modified_ms == current.modified_ms
		&& known.central_crc == current.central_crc
		&& same_path(&known.path, &current.path)
}

/// Сравнение путей: на Windows регистр не важен, на остальных платформах важен.
fn same_path(left: &str, right: &str) -> bool {
	if cfg!(windows) {
		left.eq_ignore_ascii_case(right)
	} else {
		left == right
	}
}

/// Время изменения файла в миллисекундах UNIX.
fn modified_ms(metadata: &fs::Metadata) -> u64 {
	metadata
		.modified()
		.ok()
		.and_then(|time| time.duration_since(UNIX_EPOCH).ok())
		.map(|duration| {
			duration
				.as_secs()
				.saturating_mul(1_000)
				.saturating_add(u64::from(duration.subsec_millis()))
		})
		.unwrap_or(0)
}

/// Есть ли в архиве маркер `edited` без учёта регистра.
fn has_marker(entries: &[EntryMeta]) -> bool {
	entries
		.iter()
		.any(|entry| entry.name.eq_ignore_ascii_case(EDITED_MARKER))
}

/// Ошибка записи или удаления отпечатка.
fn fingerprint_error(path: &Path, source: io::Error) -> ArchiveError {
	ArchiveError::Fingerprint {
		path: path.to_path_buf(),
		source,
	}
}

#[cfg(test)]
mod tests;
