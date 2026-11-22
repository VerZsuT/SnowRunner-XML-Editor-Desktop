//! Тесты модуля `templates`: шаблоны _templates.

use super::*;
use crate::xml::parse;

/// Основной документ с локальными шаблонами.
const SOURCE: &str = "<_templates Include=\"trucks\">\r\n\
	\t<Wheel>\r\n\
	\t\t<FrontWheel SteeringAngle=\"40\" />\r\n\
	\t</Wheel>\r\n\
	</_templates>\r\n\
	<Truck>\r\n\
	\t<TruckData>\r\n\
	\t\t<Wheels>\r\n\
	\t\t\t<Wheel _template=\"FrontWheel\" Pos=\"(1; 2; 3)\" />\r\n\
	\t\t</Wheels>\r\n\
	\t</TruckData>\r\n\
	</Truck>\r\n";

/// Подключённый файл шаблонов.
const TRUCKS: &str = "<_templates>\r\n\
	\t<Wheels>\r\n\
	\t\t<Default SteeringAngle=\"30\" />\r\n\
	\t</Wheels>\r\n\
	</_templates>\r\n";

/// Шаблоны с загрузчиком из памяти.
fn templates(source: &str) -> (XmlDocument, Templates) {
	let document = parse(source).unwrap();
	let mut load = |name: &str| match name {
		"trucks" => Some(TRUCKS.as_bytes().to_vec()),
		_ => None,
	};

	let templates = Templates::from_document(&document, &mut load).unwrap();

	(document, templates)
}

#[test]
fn читает_значение_локального_шаблона() {
	let (document, templates) = templates(SOURCE);
	let truck = document.element("Truck").unwrap();
	let data = truck.child("TruckData").unwrap();
	let wheels = data.child("Wheels").unwrap();
	let wheel = wheels.child("Wheel").unwrap();

	assert_eq!(
		templates.get_value(&[truck, data, wheels], wheel, "SteeringAngle"),
		Some("40".to_owned())
	);
	assert_eq!(wheel.attr("Pos"), Some("(1; 2; 3)"));
}

#[test]
fn без_шаблона_значения_нет() {
	let document = parse("<Truck><TruckData /></Truck>").unwrap();
	let mut load = |_: &str| None;
	let templates = Templates::from_document(&document, &mut load);

	assert!(templates.is_none());
}

#[test]
fn читает_значение_подключённого_файла() {
	let source = "<_templates />\r\n<Truck>\r\n\
		\t<TruckData>\r\n\
		\t\t<Wheels _template=\"Default\" />\r\n\
		\t</TruckData>\r\n\
		</Truck>\r\n";
	let mut document = parse(source).unwrap();
	let mut load = |name: &str| match name {
		"trucks" => Some(TRUCKS.as_bytes().to_vec()),
		_ => None,
	};

	// Подключение задаётся на `_templates`, поэтому добавим его вручную.
	document
		.element_mut("_templates")
		.unwrap()
		.set_attr("Include", "trucks");

	let templates = Templates::from_document(&document, &mut load).unwrap();
	let truck = document.element("Truck").unwrap();
	let data = truck.child("TruckData").unwrap();
	let wheels = data.child("Wheels").unwrap();

	assert_eq!(
		templates.get_value(&[truck, data], wheels, "SteeringAngle"),
		Some("30".to_owned())
	);
}
