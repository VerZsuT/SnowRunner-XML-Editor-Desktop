//! Тесты модуля `fs`: файловые примитивы.

use super::*;

/// Уникальный каталог теста.
fn work_dir() -> PathBuf {
	crate::test_support::temp_dir("fs")
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
