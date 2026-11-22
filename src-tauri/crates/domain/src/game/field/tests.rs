//! Тесты модуля `field`: поля со значением и дескриптором.

use super::*;
use crate::game::descriptor::AttrKind;

#[test]
fn сериализует_поле() {
	let descriptor = AttrDescriptor::new("Price", AttrKind::Integer);
	let field = Field::new(Some(100_i64), Some(0_i64), descriptor);
	let json = serde_json::to_value(&field).unwrap();

	assert_eq!(json["value"], 100);
	assert_eq!(json["defaultValue"], 0);
	assert_eq!(json["descriptor"]["name"], "Price");
}

#[test]
fn пустое_поле_отдаёт_значение_по_умолчанию() {
	let descriptor = AttrDescriptor::new("Price", AttrKind::Integer);
	let field: Field<i64> = Field::new(None, Some(7), descriptor);

	assert_eq!(field.resolved(), Some(&7));
}
