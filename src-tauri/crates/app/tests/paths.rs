//! Тесты выбора каталога данных и переключения режима хранения.

use std::fs;
use std::path::{Path, PathBuf};

use sxmle_app::paths::{
	DataMode, LocationContext, PORTABLE_MARKER, Paths, PathsContext, SwitchError,
	resolve_data_location, switch_data_mode,
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
fn switch_to_portable_copies_json_and_creates_marker() {
	let root = make_dir("switch-portable");
	let exe_dir = root.join("app");
	let roaming = root.join("roaming");
	let installed = roaming.join("SnowRunner XML Editor/jsons");

	fs::create_dir_all(&installed).unwrap();
	fs::write(installed.join("config.json"), "{}").unwrap();
	fs::write(installed.join("favorites.json"), "[]").unwrap();

	let context = PathsContext {
		resource_dir: exe_dir.clone(),
		exe_path: exe_dir.join("SnowRunnerXMLEditor.exe"),
		roaming_dir: roaming.clone(),
		is_dev: false,
	};
	let report = switch_data_mode(&context, true).unwrap();

	assert_eq!(report.mode, DataMode::Portable);
	assert_eq!(report.data_root, exe_dir.join("data"));
	assert_eq!(report.copied, 2);
	assert!(exe_dir.join(PORTABLE_MARKER).is_file());
	assert!(exe_dir.join("data/jsons/config.json").is_file());
	assert!(exe_dir.join("data/jsons/favorites.json").is_file());

	let back = switch_data_mode(&context, false).unwrap();

	assert_eq!(back.mode, DataMode::Installed);
	assert_eq!(back.data_root, roaming.join("SnowRunner XML Editor"));
	assert_eq!(back.copied, 0);
	assert!(!exe_dir.join(PORTABLE_MARKER).exists());
}

#[test]
fn switch_in_dev_is_rejected() {
	let root = make_dir("switch-dev");
	let context = PathsContext {
		resource_dir: root.clone(),
		exe_path: root.join("app.exe"),
		roaming_dir: root.clone(),
		is_dev: true,
	};

	assert!(matches!(
		switch_data_mode(&context, true),
		Err(SwitchError::Dev)
	));
}
