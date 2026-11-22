//! Тесты модуля `reset`: сброс к первоначальному состоянию.

use std::fs;
use std::path::PathBuf;

use super::*;
use crate::paths::DataMode;

/// Пути программы во временном каталоге.
fn paths(root: PathBuf) -> Paths {
	Paths {
		root: root.clone(),
		data_root: root,
		mode: DataMode::Installed,
	}
}

/// Создаёт каталог с файлом-заглушкой.
fn with_file(dir: &Path, name: &str) {
	fs::create_dir_all(dir.parent().unwrap()).unwrap();
	fs::write(dir.join(name), "data").unwrap();
}

#[test]
fn удаляет_данные_и_пишет_стандартную_конфигурацию() {
	let dir = crate::test_support::temp_dir("reset");
	let paths = paths(dir.clone());

	for directory in [
		paths.main_temp(),
		paths.mods_temp(),
		paths.update_temp(),
		paths.backup_folder(),
	] {
		fs::create_dir_all(&directory).unwrap();
		with_file(&directory, "file.xml");
	}

	fs::write(
		paths.backup_initial_with_suffix("2026-01-01_00-00-00"),
		"pak",
	)
	.unwrap();

	for file in [
		paths.json("favorites"),
		paths.json("edited"),
		paths.edited_documents(),
		paths.json("mods"),
	] {
		fs::create_dir_all(file.parent().unwrap()).unwrap();
		fs::write(&file, "[]").unwrap();
	}

	let config = reset(&paths, "2.0.0", false).unwrap();

	assert_eq!(config.version, "2.0.0");
	assert_eq!(config.initial_path, None);
	assert!(config.open_whats_new);
	assert!(!paths.main_temp().exists());
	assert!(!paths.update_temp().exists());
	assert!(!paths.backup_folder().exists());
	assert!(
		!paths
			.backup_initial_with_suffix("2026-01-01_00-00-00")
			.exists(),
		"датированный бэкап остался"
	);
	assert!(!paths.json("favorites").exists());
	assert!(!paths.edited_documents().exists(), "журнал полей остался");

	let saved = ConfigStore::new(paths.json("config")).load(Config::default());

	assert_eq!(saved, config);
}

#[test]
fn сброс_без_данных_проходит_успешно() {
	let dir = crate::test_support::temp_dir("reset-empty");
	let paths = paths(dir);

	let config = reset(&paths, "2.0.0", false).unwrap();

	assert_eq!(config.initial_path, None);
	assert!(paths.json("config").is_file());
}
