//! Тесты выбора каталога данных и миграции json-файлов.

use std::fs;
use std::path::{Path, PathBuf};

use sxmle_app::paths::{
	DataMode, LocationContext, PORTABLE_MARKER, Paths, PathsContext, migrate_legacy_data,
	resolve_data_location,
};

/// Каталог установки.
fn installed_root() -> PathBuf {
	PathBuf::from("C:/Program Files/SnowRunnerXMLEditor")
}

/// Каталог данных пользователя.
fn roaming() -> PathBuf {
	PathBuf::from("C:/Users/user/AppData/Roaming")
}

/// Путь к пользовательскому каталогу данных.
fn user_data() -> PathBuf {
	roaming().join("SnowRunner XML Editor")
}

#[test]
fn dev_uses_user_data() {
	let location = resolve_data_location(
		&LocationContext {
			is_dev: true,
			exe_path: installed_root().join("SnowRunnerXMLEditor.exe"),
			roaming_dir: roaming(),
		},
		|_| false,
	);

	assert_eq!(location.mode, DataMode::Dev);
	assert_eq!(location.data_root, user_data());
}

#[test]
fn installed_uses_user_data() {
	let location = resolve_data_location(
		&LocationContext {
			is_dev: false,
			exe_path: installed_root().join("SnowRunnerXMLEditor.exe"),
			roaming_dir: roaming(),
		},
		|_| false,
	);

	assert_eq!(location.mode, DataMode::Installed);
	assert_eq!(location.data_root, user_data());
	assert!(!location.data_root.starts_with(installed_root()));
}

#[test]
fn portable_uses_data_near_exe() {
	let exe_dir = PathBuf::from("D:/Games/SnowRunnerXMLEditor");
	let marker = exe_dir.join(PORTABLE_MARKER);

	let location = resolve_data_location(
		&LocationContext {
			is_dev: false,
			exe_path: exe_dir.join("SnowRunnerXMLEditor.exe"),
			roaming_dir: roaming(),
		},
		|path| path == marker,
	);

	assert_eq!(location.mode, DataMode::Portable);
	assert_eq!(location.data_root, exe_dir.join("data"));
}

#[test]
fn paths_compose_from_context() {
	let paths = Paths::resolve(
		&PathsContext {
			resource_dir: installed_root().join("resources"),
			exe_path: installed_root().join("SnowRunnerXMLEditor.exe"),
			roaming_dir: roaming(),
			is_dev: false,
		},
		|_| false,
	);

	assert_eq!(paths.mode, DataMode::Installed);
	assert_eq!(paths.json("config"), user_data().join("jsons/config.json"));
	assert_eq!(
		paths.backup_initial(),
		user_data().join("backups/initial.pak")
	);
	assert_eq!(
		paths.backup_initial_with_suffix("2026-11-21_23-00-00"),
		user_data().join("backups/initial_2026-11-21_23-00-00.pak")
	);
	assert_eq!(
		paths.classes(),
		user_data().join("mainTemp/[media]/classes")
	);
	assert!(paths.public_info_url().ends_with("/version-info.json"));
}

/// Создаёт пустой каталог для теста.
fn make_dir(name: &str) -> PathBuf {
	let dir = Path::new(env!("CARGO_TARGET_TMPDIR")).join(name);
	let _ = fs::remove_dir_all(&dir);
	fs::create_dir_all(&dir).expect("каталог теста");

	dir
}

#[test]
fn migrate_copies_json_only() {
	let root = make_dir("migrate-copies");
	let legacy = root.join("jsons");
	let data = root.join("userData/jsons");

	fs::create_dir_all(&legacy).unwrap();
	fs::write(legacy.join("config.json"), "{\"version\":\"1.0.0\"}").unwrap();
	fs::write(legacy.join("edited.json"), "[]").unwrap();
	fs::write(legacy.join("readme.txt"), "ignored").unwrap();

	let copied = migrate_legacy_data(&legacy, &data).unwrap();

	assert_eq!(
		copied,
		vec!["config.json".to_owned(), "edited.json".to_owned()]
	);
	assert!(data.join("config.json").is_file());
	assert!(legacy.join("config.json").is_file());
	assert!(!data.join("readme.txt").exists());
}

#[test]
fn migrate_keeps_existing_data() {
	let root = make_dir("migrate-existing");
	let legacy = root.join("jsons");
	let data = root.join("userData/jsons");

	fs::create_dir_all(&legacy).unwrap();
	fs::create_dir_all(&data).unwrap();
	fs::write(legacy.join("config.json"), "old").unwrap();
	fs::write(data.join("config.json"), "new").unwrap();

	assert!(migrate_legacy_data(&legacy, &data).unwrap().is_empty());
	assert_eq!(fs::read_to_string(data.join("config.json")).unwrap(), "new");
}

#[test]
fn migrate_without_legacy_dir_does_nothing() {
	let root = make_dir("migrate-none");
	let copied = migrate_legacy_data(&root.join("jsons"), &root.join("data")).unwrap();

	assert!(copied.is_empty());
	assert!(!root.join("data").exists());
}
