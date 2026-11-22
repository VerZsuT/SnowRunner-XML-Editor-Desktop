//! Тесты модуля `position`: позиции.

use super::*;

#[test]
fn разбирает_строку() {
	assert_eq!(
		Position::parse("(1.5; 2; -3)"),
		Position::new(1.5, 2.0, -3.0)
	);
	assert_eq!(Position::parse("1,2,3"), Position::new(1.0, 2.0, 3.0));
	assert_eq!(
		Position::parse("(0; 0.597)"),
		Position::new(0.0, 0.597, 0.0)
	);
	assert_eq!(Position::parse(""), Position::new(0.0, 0.0, 0.0));
}

#[test]
fn записывает_строку() {
	assert_eq!(Position::new(0.0, 0.0, 0.0).format(), "(0; 0; 0)");
	assert_eq!(Position::new(1.5, 2.0, -3.0).format(), "(1.5; 2; -3)");
	assert_eq!(Position::x(1.25).format(), "(1.25; 0; 0)");
}

#[test]
fn разбор_и_запись_идемпотентны() {
	let source = "(-1.131; 1.419; 0)";
	let position = Position::parse(source);

	assert_eq!(position.format(), source);
	assert_eq!(Position::parse(&position.format()), position);
}
