//! Тесты модуля `texts`: игровые строки.

use super::*;
use std::path::PathBuf;

/// Уникальный каталог теста.
fn work_dir() -> PathBuf {
	crate::test_support::temp_dir("texts")
}

/// Пишет файл строк в UTF-16LE.
fn write_str(path: &std::path::Path, text: &str) {
	let mut bytes = Vec::new();

	for unit in text.encode_utf16() {
		bytes.extend_from_slice(&unit.to_le_bytes());
	}

	fs::create_dir_all(path.parent().unwrap()).unwrap();
	fs::write(path, bytes).unwrap();
}

#[test]
fn разбирает_ключи_и_значения() {
	let strings = parse("ui_name_1 \"Разведчик\"\r\nui_name_2 \"\"\r\n\r\nмусор\r\n");

	assert_eq!(
		strings.get("ui_name_1").map(String::as_str),
		Some("Разведчик")
	);
	assert_eq!(strings.get("ui_name_2").map(String::as_str), Some(""));
	assert!(!strings.contains_key("мусор"));
}

#[test]
fn убирает_bom_и_экранирование() {
	let strings = parse("\u{feff}ui_name_1 \"A \\B\"");

	assert_eq!(strings.get("ui_name_1").map(String::as_str), Some("A B"));
}

#[test]
fn читает_строки_игры_и_модов() {
	let dir = work_dir();

	write_str(
		&dir.join("strings/strings_russian.str"),
		"ui_name_1 \"Игра\"",
	);
	write_str(
		&dir.join("mods/my_mod/texts/strings_russian.str"),
		"ui_name_1 \"Мод\"",
	);

	let texts = GameTexts::load(&dir.join("strings"), &dir.join("mods"), "RU");

	assert_eq!(texts.get("ui_name_1", None), Some("Игра"));
	assert_eq!(texts.get("ui_name_1", Some("my_mod")), Some("Мод"));
	assert_eq!(texts.get("ui_name_1", Some("unknown")), Some("Игра"));
	assert_eq!(texts.get("missing", None), None);
	assert_eq!(texts.mods.len(), 1);
}

#[test]
fn отсутствующий_каталог_даёт_пустые_переводы() {
	let texts = GameTexts::load(Path::new("нет/строк"), Path::new("нет/модов"), "EN");

	assert!(texts.main.is_empty());
	assert!(texts.mods.is_empty());
}

#[test]
fn выбирает_файл_по_языку() {
	assert_eq!(strings_name("RU"), "russian");
	assert_eq!(strings_name("DE"), "german");
	assert_eq!(strings_name("CH"), "chinese_simplified");
	assert_eq!(strings_name("EN"), "english");
	assert_eq!(strings_name("XX"), "english");
}
