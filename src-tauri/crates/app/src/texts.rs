//! Игровые переводы: строки `[strings]` и переводы модов.
//!
//! Файлы `strings_<язык>.str` игры и `texts/strings_<язык>.str` модов —
//! UTF-16LE, по строке на ключ: `ключ "значение"`. Отсутствующие файлы
//! пропускаются: интерфейс остаётся с ключами вместо перевода.

use std::collections::HashMap;
use std::fs;
use std::path::Path;

use serde::{Deserialize, Serialize};
use specta::Type;

/// Имя файла строк игры для языка интерфейса.
pub fn strings_name(lang: &str) -> &'static str {
	match lang {
		"RU" => "russian",
		"DE" => "german",
		"CH" => "chinese_simplified",
		_ => "english",
	}
}

/// Игровые переводы.
#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct GameTexts {
	/// Строки самой игры.
	pub main: HashMap<String, String>,

	/// Строки модов по имени мода.
	pub mods: HashMap<String, HashMap<String, String>>,
}

impl GameTexts {
	/// Читает строки игры и модов; отсутствующие файлы пропускаются.
	pub fn load(strings: &Path, mods: &Path, lang: &str) -> Self {
		let name = format!("strings_{}.str", strings_name(lang));
		let mut texts = Self {
			main: read_str(&strings.join(&name)).unwrap_or_default(),
			mods: HashMap::new(),
		};

		let Ok(entries) = fs::read_dir(mods) else {
			return texts;
		};

		for entry in entries.flatten() {
			let dir = entry.path();

			if !dir.is_dir() {
				continue;
			}

			let Some(strings) = read_str(&dir.join("texts").join(&name)) else {
				continue;
			};

			texts
				.mods
				.insert(entry.file_name().to_string_lossy().into_owned(), strings);
		}

		texts
	}

	/// Перевод ключа: сначала строки мода, затем строки игры.
	pub fn get(&self, key: &str, mod_name: Option<&str>) -> Option<&str> {
		let from_mod = mod_name
			.and_then(|name| self.mods.get(name))
			.and_then(|strings| strings.get(key))
			.map(String::as_str);

		from_mod.or_else(|| self.main.get(key).map(String::as_str))
	}
}

/// Читает и разбирает файл строк UTF-16LE.
fn read_str(path: &Path) -> Option<HashMap<String, String>> {
	let bytes = fs::read(path).ok()?;

	Some(parse(&decode_utf16(&bytes)))
}

/// Декодирует UTF-16LE; непарный последний байт отбрасывается.
fn decode_utf16(bytes: &[u8]) -> String {
	let units: Vec<u16> = bytes
		.chunks_exact(2)
		.map(|pair| u16::from_le_bytes([pair[0], pair[1]]))
		.collect();

	String::from_utf16_lossy(&units)
}

/// Разбирает строки вида `ключ "значение"`.
///
/// Обратная косая черта в значении не сохраняется: файлы игры экранируют
/// кавычки, а интерфейсу нужен готовый текст.
pub fn parse(source: &str) -> HashMap<String, String> {
	let mut strings = HashMap::new();

	for line in source.lines() {
		let Some((key, rest)) = line.split_once('"') else {
			continue;
		};
		let Some((value, _)) = rest.split_once('"') else {
			continue;
		};

		let key = key.trim().trim_start_matches('\u{feff}');

		if key.is_empty() {
			continue;
		}

		strings.insert(key.to_owned(), value.replace('\\', ""));
	}

	strings
}

#[cfg(test)]
mod tests {
	use super::*;
	use std::path::PathBuf;
	use std::sync::atomic::{AtomicU64, Ordering};

	/// Уникальный каталог теста.
	fn work_dir() -> PathBuf {
		static COUNTER: AtomicU64 = AtomicU64::new(0);
		let id = COUNTER.fetch_add(1, Ordering::Relaxed);
		let dir = std::env::temp_dir().join(format!("sxmle-texts-{}-{id}", std::process::id()));

		let _ = fs::remove_dir_all(&dir);
		fs::create_dir_all(&dir).unwrap();

		dir
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
}
