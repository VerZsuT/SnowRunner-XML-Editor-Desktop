//! Декодирование XML-сущностей.
//!
//! Повторяет `decodeEntities` из текущего TypeScript-сериализатора: числовые
//! сущности (`&#106;`, `&#xfeff;`) и именованные из небольшого набора. Проход
//! один: `&amp;lt;` превращается в `&lt;`, а не в `<`.

/// Именованные сущности, которые поддерживает декодер.
const NAMED: &[(&str, char)] = &[
	("amp", '&'),
	("lt", '<'),
	("gt", '>'),
	("quot", '"'),
	("apos", '\''),
	("nbsp", '\u{00A0}'),
];

/// Декодирует сущности в тексте.
pub fn decode_entities(text: &str) -> String {
	decode_entities_with_report(text).0
}

/// Декодирует сущности и возвращает список неизвестных именованных сущностей.
///
/// Неизвестные сущности остаются в тексте как есть; каждая записывается один раз.
pub fn decode_entities_with_report(text: &str) -> (String, Vec<String>) {
	let bytes = text.as_bytes();
	let mut output = String::with_capacity(text.len());
	let mut unknown: Vec<String> = Vec::new();
	let mut index = 0;

	while index < bytes.len() {
		if bytes[index] != b'&' {
			let start = index;

			index += 1;

			while index < bytes.len() && bytes[index] != b'&' {
				index += 1;
			}

			output.push_str(&text[start..index]);

			continue;
		}

		let Some(end) = match_entity(bytes, index) else {
			output.push('&');
			index += 1;

			continue;
		};
		let raw = &text[index..end];

		match decode_entity(raw) {
			Some(value) => output.push(value),
			None => {
				output.push_str(raw);

				if raw.as_bytes().get(1) != Some(&b'#') && !unknown.iter().any(|item| item == raw) {
					unknown.push(raw.to_owned());
				}
			}
		}

		index = end;
	}

	(output, unknown)
}

/// Декодирует одну сущность целиком (вместе с `&` и `;`).
fn decode_entity(raw: &str) -> Option<char> {
	let body = raw.strip_prefix('&')?.strip_suffix(';')?;

	if let Some(hex) = body.strip_prefix("#x") {
		return u32::from_str_radix(hex, 16).ok().and_then(xml_char);
	}

	if let Some(decimal) = body.strip_prefix('#') {
		return decimal.parse::<u32>().ok().and_then(xml_char);
	}

	NAMED
		.iter()
		.find(|entry| entry.0 == body)
		.map(|entry| entry.1)
}

/// Проверяет, что код является допустимым символом XML.
fn xml_char(code: u32) -> Option<char> {
	match code {
		0x9 | 0xA | 0xD | 0x20..=0xD7FF | 0xE000..=0xFFFD | 0x10000..=0x10FFFF => {
			char::from_u32(code)
		}
		_ => None,
	}
}

/// Находит конец синтаксически корректной сущности, начиная с `&`.
fn match_entity(bytes: &[u8], start: usize) -> Option<usize> {
	if bytes.get(start) != Some(&b'&') {
		return None;
	}

	let mut index = start + 1;

	if bytes.get(index) == Some(&b'#') {
		index += 1;

		if bytes.get(index) == Some(&b'x') {
			index += 1;

			let digits = index;

			while bytes.get(index).is_some_and(u8::is_ascii_hexdigit) {
				index += 1;
			}

			if index == digits {
				return None;
			}
		} else {
			let digits = index;

			while bytes.get(index).is_some_and(u8::is_ascii_digit) {
				index += 1;
			}

			if index == digits {
				return None;
			}
		}
	} else {
		if !bytes.get(index).is_some_and(u8::is_ascii_alphabetic) {
			return None;
		}

		index += 1;

		while bytes.get(index).is_some_and(u8::is_ascii_alphanumeric) {
			index += 1;
		}
	}

	if bytes.get(index) == Some(&b';') {
		Some(index + 1)
	} else {
		None
	}
}

/// Экранирует логический текст для записи в XML.
pub fn escape_text(raw: &str) -> String {
	rewrite(raw, false, false)
}

/// Экранирует логическое значение атрибута для записи в XML.
pub fn escape_attribute(raw: &str) -> String {
	rewrite(raw, true, false)
}

/// Готовит сырой текст из файла к записи: декодирует сущности и экранирует заново.
///
/// Результат — всегда корректный XML: одиночный `&` становится `&amp;`,
/// известные сущности записываются в канонической форме, неизвестные именованные
/// остаются ссылками (их может объявить doctype).
pub fn text_to_xml(raw: &str) -> String {
	rewrite(raw, false, true)
}

/// Готовит сырое значение атрибута из файла к записи.
pub fn attribute_to_xml(raw: &str) -> String {
	rewrite(raw, true, true)
}

/// Переписывает строку: при `decode` сущности декодируются перед экранированием.
fn rewrite(raw: &str, attribute: bool, decode: bool) -> String {
	let bytes = raw.as_bytes();
	let mut output = String::with_capacity(raw.len());
	let mut index = 0;

	while index < bytes.len() {
		if decode && bytes[index] == b'&' {
			if let Some(end) = match_entity(bytes, index) {
				let reference = &raw[index..end];

				match decode_entity(reference) {
					Some(value) => escape_char(&mut output, value, attribute),
					None if reference.as_bytes().get(1) == Some(&b'#') => {
						output.push_str("&amp;");
						output.push_str(&reference[1..]);
					}
					// Неизвестная именованная сущность остаётся ссылкой.
					None => output.push_str(reference),
				}

				index = end;
				continue;
			}
		}

		let Some(value) = raw[index..].chars().next() else {
			break;
		};

		escape_char(&mut output, value, attribute);
		index += value.len_utf8();
	}

	output
}

/// Записывает один символ в экранированном виде.
fn escape_char(output: &mut String, value: char, attribute: bool) {
	match value {
		'&' => output.push_str("&amp;"),
		'<' => output.push_str("&lt;"),
		'>' => output.push_str("&gt;"),
		'"' if attribute => output.push_str("&quot;"),
		'\r' => output.push_str("&#13;"),
		'\n' if attribute => output.push_str("&#10;"),
		'\t' if attribute => output.push_str("&#9;"),
		_ => output.push(value),
	}
}
