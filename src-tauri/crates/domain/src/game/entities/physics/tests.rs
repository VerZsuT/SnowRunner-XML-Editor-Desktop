//! Тесты модуля `physics`: физическая модель.

use super::*;
use crate::xml::parse;

/// Трак с физической моделью.
const SOURCE: &str = "<Truck>\r\n\
	\t<PhysicsModel>\r\n\
	\t\t<Body Mass=\"1000\" CenterOfMassOffset=\"(0; 1.5; 2)\">\r\n\
	\t\t\t<Body Mass=\"500\" />\r\n\
	\t\t</Body>\r\n\
	\t</PhysicsModel>\r\n\
	</Truck>";

#[test]
fn читает_цепочку_тел() {
	let document = parse(SOURCE).unwrap();
	let truck = document.element("Truck").unwrap();
	let model = truck.child("PhysicsModel").expect("модель");
	let body = PhysicsModel::read(&AttrReader::root(model, None))
		.body
		.expect("тело");

	assert_eq!(body.mass.value, Some(1000));
	assert_eq!(
		body.center_of_mass_offset.value.map(Position::format),
		Some("(0; 1.5; 2)".to_owned())
	);

	let nested = body.body.expect("вложенное тело");

	assert_eq!(nested.mass.value, Some(500));
	assert!(nested.center_of_mass_offset.value.is_none());
	assert_eq!(
		nested.mass.descriptor.label.as_deref(),
		Some("physics.body.mass")
	);
}

#[test]
fn без_тела_модель_пустая() {
	let document = parse("<Truck><PhysicsModel Mass=\"1\" /></Truck>").unwrap();
	let truck = document.element("Truck").unwrap();
	let model = truck.child("PhysicsModel").expect("модель");

	assert!(
		PhysicsModel::read(&AttrReader::root(model, None))
			.body
			.is_none()
	);
}
