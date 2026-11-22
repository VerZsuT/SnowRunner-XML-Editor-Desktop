//! Тесты модуля `descriptor`: дескрипторы атрибутов.

use super::*;

#[test]
fn сериализует_в_camel_case() {
	let descriptor = AttrDescriptor::new("Price", AttrKind::Integer)
		.selector("/Truck/GameData")
		.label("gameData.price")
		.limit(Limit::positive());

	let json = serde_json::to_value(&descriptor).unwrap();

	assert_eq!(json["attrType"], "integer");
	assert_eq!(json["selector"], "/Truck/GameData");
	assert_eq!(json["label"], "gameData.price");
	assert_eq!(json["limit"]["min"], 0.0);
	assert_eq!(json["desc"], serde_json::Value::Null);
}

#[test]
fn тип_числовой() {
	assert!(AttrKind::Integer.is_numeric());
	assert!(AttrKind::Float.is_numeric());
	assert!(!AttrKind::String.is_numeric());
	assert!(!AttrKind::Position.is_numeric());
}
