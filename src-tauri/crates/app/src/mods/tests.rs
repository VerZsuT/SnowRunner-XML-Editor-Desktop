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
	assert_eq!(sanitize_name("CON.pak"), "_con.pak");
	assert_eq!(sanitize_name("LPT1.dir"), "_lpt1.dir");
	assert_eq!(sanitize_name("My:Mod*?"), "mymod");
}

#[test]
fn отклоняет_имя_мода_с_путём() {
	let dir = work_dir();
	let mut mods = Mods::load(dir.join("mods.json"));
	let mut entry = entry("mod", "D:/mods/mod.pak");

	assert!(sanitize_name("mod") == entry.name);

	entry.name = "../escape".to_owned();
	assert!(matches!(mods.store(entry), Err(ModsError::InvalidName(_))));

	let target = dir.join("modsTemp");
	let pak = dir.join("mod.pak");

	fs::write(&pak, b"pak").unwrap();
	assert!(matches!(
		unpack(&pak, &target, "../escape"),
		Err(ModsError::InvalidName(_))
	));
	assert!(!dir.join("escape").exists());

	let _ = fs::remove_dir_all(&dir);
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
fn находит_pak_в_каталоге_и_подкаталогах() {
	let dir = work_dir();

	fs::create_dir_all(dir.join("nested")).unwrap();
	fs::write(dir.join("a.pak"), b"pak").unwrap();
	fs::write(dir.join("nested/b.PAK"), b"pak").unwrap();
	fs::write(dir.join("note.txt"), b"text").unwrap();

	let found = find_candidates_in(&dir);

	assert_eq!(
		found
			.iter()
			.map(|item| item.name.as_str())
			.collect::<Vec<_>>(),
		["a", "b"]
	);
	assert!(
		found
			.iter()
			.all(|item| item.path.to_ascii_lowercase().ends_with(".pak"))
	);

	let _ = fs::remove_dir_all(&dir);
}

/// Собрать `.pak` мода: пустой архив плюс записи добавлением.
fn write_mod_pak(path: &Path, files: &[(&str, &[u8])]) {
	let mut data = Vec::new();

	data.extend_from_slice(&0x0605_4b50_u32.to_le_bytes());
	data.extend_from_slice(&[0, 0, 0, 0, 0, 0, 0, 0]);
	data.extend_from_slice(&0_u32.to_le_bytes());
	data.extend_from_slice(&0_u32.to_le_bytes());
	data.extend_from_slice(&[0, 0]);
	fs::write(path, data).unwrap();

	let appended = files
		.iter()
		.map(|(name, content)| ((*name).to_owned(), content.to_vec()))
		.collect();

	sxmle_storage::zip::update(
		path,
		&sxmle_storage::zip::ArchiveUpdate {
			changed: Vec::new(),
			appended,
		},
	)
	.unwrap();
}

#[test]
fn битый_pak_не_удаляет_распакованный_мод() {
	let dir = work_dir();
	let target = dir.join("modsTemp");
	let unpacked = target.join("mod");

	fs::create_dir_all(unpacked.join("classes")).unwrap();
	fs::write(unpacked.join("classes/keep.xml"), b"keep").unwrap();

	let broken = dir.join("broken.pak");

	fs::write(&broken, b"not a zip archive").unwrap();

	assert!(matches!(
		unpack(&broken, &target, "mod"),
		Err(ModsError::Archive(_))
	));
	assert_eq!(
		fs::read(unpacked.join("classes/keep.xml")).unwrap(),
		b"keep"
	);
	assert!(!target.join(".mod.unpack").exists(), "остался staging");
	assert!(!target.join(".mod.old").exists(), "остался прежний каталог");

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn распаковка_заменяет_мод_целиком() {
	let dir = work_dir();
	let target = dir.join("modsTemp");
	let unpacked = target.join("mod");

	fs::create_dir_all(&unpacked).unwrap();
	fs::write(unpacked.join("stale.txt"), b"stale").unwrap();

	let pak = dir.join("mod.pak");

	write_mod_pak(
		&pak,
		&[
			("classes\\truck.xml", b"<Truck />"),
			("texts\\t.xml", b"<Texts />"),
		],
	);

	let size = unpack(&pak, &target, "mod").unwrap();

	assert_eq!(size, fs::metadata(&pak).unwrap().len() as f64);
	assert_eq!(
		fs::read(unpacked.join("classes/truck.xml")).unwrap(),
		b"<Truck />"
	);
	assert!(!unpacked.join("stale.txt").exists(), "старый файл остался");
	assert!(!target.join(".mod.unpack").exists(), "остался staging");
	assert!(!target.join(".mod.old").exists(), "остался прежний каталог");

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn битый_список_даёт_пустой() {
	let dir = work_dir();

	fs::write(dir.join("mods.json"), "{").unwrap();

	assert!(Mods::load(dir.join("mods.json")).entries().is_empty());
}
