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
mod tests;
