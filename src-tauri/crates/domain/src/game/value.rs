//! Преобразования значений атрибутов: разбор и запись строк XML.
//!
//! Повторяют `AttrValue` и `stringToNumber`/`stringToArray` из текущей модели:
//! числа разбираются как `Number.parseInt`/`Number.parseFloat` (по префиксу),
//! логическое значение — строго строка `true`.

/// Разбирает целое по префиксу строки, как `Number.parseInt`.
pub fn parse_integer(value: &str) -> Option<i64> {
	let text = value.trim_start();
	let bytes = text.as_bytes();
	let mut index = 0;

	if matches!(bytes.first(), Some(&b'+' | &b'-')) {
		index = 1;
	}

	let digits = index;

	while bytes.get(index).is_some_and(u8::is_ascii_digit) {
		index += 1;
	}

	if index == digits {
		return None;
	}

	text[..index].parse::<i64>().ok()
}

/// Разбирает число с плавающей точкой по префиксу строки, как `Number.parseFloat`.
pub fn parse_float(value: &str) -> Option<f64> {
	let text = value.trim_start();
	let bytes = text.as_bytes();
	let mut index = 0;

	if matches!(bytes.first(), Some(&b'+' | &b'-')) {
		index = 1;
	}

	let mut digits = 0;

	while bytes.get(index).is_some_and(u8::is_ascii_digit) {
		index += 1;
		digits += 1;
	}

	if bytes.get(index) == Some(&b'.') {
		index += 1;

		while bytes.get(index).is_some_and(u8::is_ascii_digit) {
			index += 1;
			digits += 1;
		}
	}

	if digits == 0 {
		return None;
	}

	if matches!(bytes.get(index), Some(&b'e' | &b'E')) {
		let exponent = index;

		index += 1;

		if matches!(bytes.get(index), Some(&b'+' | &b'-')) {
			index += 1;
		}

		let exponent_digits = index;

		while bytes.get(index).is_some_and(u8::is_ascii_digit) {
			index += 1;
		}

		if index == exponent_digits {
			index = exponent;
		}
	}

	text[..index].parse::<f64>().ok()
}

/// Разбирает логическое значение так же, как модель: только строгое `true`.
pub fn parse_boolean(value: &str) -> bool {
	value == "true"
}

/// Записывает логическое значение в XML.
pub const fn format_boolean(value: bool) -> &'static str {
	if value { "true" } else { "false" }
}

/// Разбирает список строк через запятую (`First, Second`).
///
/// Пустые значения отбрасываются, пустой хвост после последней запятой — тоже.
pub fn parse_list(value: &str) -> Vec<String> {
	let mut items: Vec<String> = value
		.split(',')
		.map(|item| item.trim().to_owned())
		.collect();

	if items.last().is_some_and(String::is_empty) {
		items.pop();
	}

	items.retain(|item| !item.is_empty());

	items
}

/// Записывает список строк в XML через запятую.
pub fn format_list(values: &[String]) -> String {
	values.join(",")
}

/// Записывает число в XML так же, как `String(number)` в текущей модели.
pub fn format_number(value: f64) -> String {
	if value.fract() == 0.0 && value.abs() < 1e21 {
		format!("{value:.0}")
	} else {
		format!("{value}")
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn разбирает_целые() {
		assert_eq!(parse_integer("42"), Some(42));
		assert_eq!(parse_integer(" -7"), Some(-7));
		assert_eq!(parse_integer("+3px"), Some(3));
		assert_eq!(parse_integer("3.9"), Some(3));
		assert_eq!(parse_integer("abc"), None);
		assert_eq!(parse_integer(""), None);
	}

	#[test]
	fn разбирает_числа() {
		assert_eq!(parse_float("1.5"), Some(1.5));
		assert_eq!(parse_float("-0.25e-2"), Some(-0.0025));
		assert_eq!(parse_float(".5"), Some(0.5));
		assert_eq!(parse_float("2"), Some(2.0));
		assert_eq!(parse_float("2e"), Some(2.0));
		assert_eq!(parse_float("x"), None);
	}

	#[test]
	fn разбирает_списки() {
		assert_eq!(parse_list("A, B ,C"), vec!["A", "B", "C"]);
		assert_eq!(parse_list("A,B,"), vec!["A", "B"]);
		assert!(parse_list("").is_empty());
		assert_eq!(format_list(&["A".to_owned(), "B".to_owned()]), "A,B");
	}

	#[test]
	fn разбирает_логические() {
		assert!(parse_boolean("true"));
		assert!(!parse_boolean("True"));
		assert!(!parse_boolean("1"));
		assert_eq!(format_boolean(true), "true");
		assert_eq!(format_boolean(false), "false");
	}

	#[test]
	fn записывает_числа() {
		assert_eq!(format_number(1.0), "1");
		assert_eq!(format_number(1.5), "1.5");
		assert_eq!(format_number(-0.25), "-0.25");
	}
}
