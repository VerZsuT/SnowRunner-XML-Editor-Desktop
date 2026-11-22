//! Тесты модуля `value`: разбор и форматирование значений.

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
