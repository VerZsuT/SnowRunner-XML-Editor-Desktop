//! Тесты модуля `mods`: список модов и распаковка.

use super::*;

/// Уникальный каталог теста.
fn work_dir() -> PathBuf {
	crate::test_support::temp_dir("mods")
}

/// Запись мода.
fn entry(name: &str, path: &str) -> ModEntry {
	ModEntry {
		file_name: format!("{name}.pak"),
		name: name.to_owned(),
		path: path.to_owned(),
		size: 1.0,
	}
}

#[test]
fn готовит_имя_каталога() {
	assert_eq!(sanitize_name("My Mod.pak"), "my-mod.pak");
	assert_eq!(sanitize_name("A<>B  C"), "ab--c");
	assert_eq!(sanitize_name("..a..b.."), "a.b");
	assert_eq!(sanitize_name("   "), "mod");
	assert_eq!(sanitize_name("CON"), "_con");
	assert_eq!(sanitize_name("My:Mod*?"), "mymod");
}

#[test]
fn хранит_и_удаляет_моды() {
	let dir = work_dir();
	let path = dir.join("jsons/mods.json");
	let mut mods = Mods::load(&path);

	mods.store(entry("my_mod", "D:/mods/my_mod.pak")).unwrap();
	mods.store(entry("other", "D:/mods/other.pak")).unwrap();

	let reopened = Mods::load(&path);

	assert_eq!(reopened.entries().len(), 2);
	assert_eq!(reopened.entries()[0].name, "my_mod");

	assert!(mods.remove("my_mod").unwrap());
	assert!(!mods.remove("my_mod").unwrap());
	assert_eq!(Mods::load(&path).entries().len(), 1);
}

#[test]
fn убирает_пропавшие_файлы() {
	let dir = work_dir();
	let pak = dir.join("mod.pak");

	fs::write(&pak, b"pak").unwrap();

	let mut mods = Mods::load(dir.join("mods.json"));

	mods.store(entry("mod", &pak.to_string_lossy())).unwrap();
	mods.store(entry("missing", "D:/mods/missing.pak")).unwrap();
	mods.retain_existing().unwrap();

	assert_eq!(mods.entries().len(), 1);
	assert_eq!(mods.entries()[0].name, "mod");
}

#[test]
fn битый_список_даёт_пустой() {
	let dir = work_dir();

	fs::write(dir.join("mods.json"), "{").unwrap();

	assert!(Mods::load(dir.join("mods.json")).entries().is_empty());
}
