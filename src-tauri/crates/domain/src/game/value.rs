//! Разбор значений атрибутов из строк XML.
//!
//! Повторяет `AttrValue` из текущей модели: числа разбираются как
//! `Number.parseInt`/`Number.parseFloat` (по префиксу), логическое значение —
//! строго строка `true`. Запись значений идёт из интерфейса: в XML попадает
//! строка, которую пользователь видит в поле.

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

#[cfg(test)]
mod tests;
