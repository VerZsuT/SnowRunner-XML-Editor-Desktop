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
mod tests {
	use super::*;
	use std::sync::atomic::{AtomicU64, Ordering};

	/// Уникальный каталог теста.
	fn work_dir() -> PathBuf {
		static COUNTER: AtomicU64 = AtomicU64::new(0);
		let id = COUNTER.fetch_add(1, Ordering::Relaxed);
		let dir = std::env::temp_dir().join(format!("sxmle-fs-{}-{id}", std::process::id()));

		let _ = fs::remove_dir_all(&dir);
		fs::create_dir_all(&dir).unwrap();

		dir
	}

	#[test]
	fn пишет_файл_и_убирает_временный() {
		let dir = work_dir();
		let path = dir.join("config.json");

		write_atomic(&path, b"{\"a\":1}").unwrap();

		assert_eq!(fs::read_to_string(&path).unwrap(), "{\"a\":1}");
		assert!(!path.with_extension("json.tmp").exists());
	}

	#[test]
	fn перезаписывает_файл() {
		let dir = work_dir();
		let path = dir.join("config.json");

		fs::write(&path, "old").unwrap();
		write_atomic(&path, b"new").unwrap();

		assert_eq!(fs::read_to_string(&path).unwrap(), "new");
	}
}
