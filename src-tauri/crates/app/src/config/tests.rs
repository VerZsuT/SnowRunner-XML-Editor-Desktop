//! Тесты модуля `config`: конфигурация программы.

use super::*;

/// Уникальный каталог теста.
fn work_dir() -> PathBuf {
	crate::test_support::temp_dir("config")
}

#[test]
fn сохраняет_и_читает_конфигурацию() {
	let dir = work_dir();
	let store = ConfigStore::new(dir.join("jsons/config.json"));
	let mut config = Config::new("1.4.0", false);

	config.initial_path = Some("C:/game/initial.pak".to_owned());
	config.lang = "RU".to_owned();
	config.use_mods = false;
	store.save(&config).unwrap();

	assert_eq!(store.load(Config::default()), config);
}

#[test]
fn отсутствующий_файл_даёт_значение_по_умолчанию() {
	let dir = work_dir();
	let store = ConfigStore::new(dir.join("missing.json"));
	let default = Config::new("1.4.0", true);

	assert_eq!(store.load(default.clone()), default);
}

#[test]
fn битый_файл_даёт_значение_по_умолчанию() {
	let dir = work_dir();
	let path = dir.join("config.json");

	fs::write(&path, "{").unwrap();

	assert_eq!(
		ConfigStore::new(path).load(Config::new("1.4.0", false)),
		Config::new("1.4.0", false)
	);
}

#[test]
fn локаль_системы_превращается_в_язык() {
	assert_eq!(lang_from_locale("ru-RU"), Some("RU"));
	assert_eq!(lang_from_locale("en_US"), Some("EN"));
	assert_eq!(lang_from_locale("de-AT"), Some("DE"));
	assert_eq!(lang_from_locale("zh-Hans-CN"), Some("CH"));
	assert_eq!(lang_from_locale("fr-FR"), None);
	assert_eq!(lang_from_locale(""), None);
}

#[test]
fn при_отсутствии_конфигурации_язык_берётся_из_системы() {
	let dir = work_dir();
	let config = ConfigStore::new(dir.join("missing.json")).load(Config::new("2.0.0", false));

	assert!(LANGUAGES.contains(&config.lang.as_str()));
}

#[test]
fn неизвестный_язык_заменяется() {
	let dir = work_dir();
	let path = dir.join("config.json");

	fs::write(&path, r#"{"lang":"XX","useMods":false}"#).unwrap();

	let config = ConfigStore::new(path).load(Config::default());

	assert_eq!(config.lang, "EN");
	assert!(!config.use_mods);
}

#[test]
fn отсутствующие_поля_получают_значения_по_умолчанию() {
	let dir = work_dir();
	let path = dir.join("config.json");

	fs::write(&path, r#"{"initialPath":"C:/game/initial.pak"}"#).unwrap();

	let config = ConfigStore::new(path).load(Config::default());

	assert_eq!(config.initial_path.as_deref(), Some("C:/game/initial.pak"));
	assert!(config.use_mods);
}
