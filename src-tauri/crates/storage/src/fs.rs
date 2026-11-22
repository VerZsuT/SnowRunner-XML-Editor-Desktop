//! Файловые примитивы: атомарная запись.

use std::fs;
use std::io::{self, Write};
use std::path::{Path, PathBuf};

/// Записывает файл атомарно: временный файл рядом, fsync, переименование.
///
/// При ошибке временный файл удаляется, целевой остаётся прежним.
pub fn write_atomic(path: &Path, bytes: &[u8]) -> io::Result<()> {
	let temporary = temporary_path(path);
	let result = write_file(&temporary, bytes).and_then(|()| fs::rename(&temporary, path));

	if result.is_err() {
		let _ = fs::remove_file(&temporary);
	}

	result
}

/// Временный файл рядом с целевым.
fn temporary_path(path: &Path) -> PathBuf {
	let mut temporary = path.as_os_str().to_owned();

	temporary.push(".tmp");

	PathBuf::from(temporary)
}

/// Записывает файл и сбрасывает его на диск.
fn write_file(path: &Path, bytes: &[u8]) -> io::Result<()> {
	let mut file = fs::File::create(path)?;

	file.write_all(bytes)?;
	file.sync_all()
}

#[cfg(test)]
mod tests;
