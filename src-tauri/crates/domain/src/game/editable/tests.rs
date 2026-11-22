//! Тесты правил переноса полей редактора.

use super::*;
use crate::xml::parse;

/// Разбирает XML-фрагмент документа.
fn document(source: &str) -> XmlDocument {
	parse(source).expect("документ разобран")
}

/// Пары «атрибут-значение» выбранного правила.
fn collected(document: &XmlDocument, rules: &[FieldRule], attribute: &str) -> Vec<String> {
	collect(document, rules)
		.into_iter()
		.filter(|field| field.attribute == attribute)
		.filter_map(|field| field.value)
		.collect()
}

#[test]
fn собирает_поля_двигателя() {
	let doc = document(
		"<EngineVariants>\
			<Engine Name=\"a\" Torque=\"100000\" Price=\"1200\" UnlockByRank=\"2\"/>\
			<Engine Name=\"b\" Torque=\"90000\" BrakesDelay=\"0.2\"/>\
		</EngineVariants>",
	);
	let values = collect(&doc, ENGINES);

	assert_eq!(
		values,
		[
			FieldValue {
				selector: "/EngineVariants/Engine".to_owned(),
				attribute: "Torque".to_owned(),
				value: Some("100000".to_owned()),
			},
			FieldValue {
				selector: "/EngineVariants/Engine".to_owned(),
				attribute: "Price".to_owned(),
				value: Some("1200".to_owned()),
			},
			FieldValue {
				selector: "/EngineVariants/Engine".to_owned(),
				attribute: "UnlockByRank".to_owned(),
				value: Some("2".to_owned()),
			},
			FieldValue {
				selector: "/EngineVariants/Engine[1]".to_owned(),
				attribute: "Torque".to_owned(),
				value: Some("90000".to_owned()),
			},
			FieldValue {
				selector: "/EngineVariants/Engine[1]".to_owned(),
				attribute: "BrakesDelay".to_owned(),
				value: Some("0.2".to_owned()),
			},
		]
	);
}

#[test]
fn собирает_поля_трака_прицепа_и_аддона() {
	let truck = document(
		"<Truck>\
			<GameData Country=\"RU\" Price=\"10\" Type=\"Truck\">\
				<UiDesc UiName=\"truck_ui\" UiDesc=\"truck_desc\"/>\
			</GameData>\
			<TruckData FuelCapacity=\"200\" Responsiveness=\"1.5\">\
				<Winch Length=\"10000\" StrengthMult=\"1.5\"/>\
				<Wheels><Wheel Torque=\"default\" SteeringAngle=\"20\"/></Wheels>\
				<ExtraWheels><Wheel Torque=\"none\"/></ExtraWheels>\
				<CompatibleWheels><CompatibleWheels Scale=\"1.2\"/></CompatibleWheels>\
				<FuelTank DamageCapacity=\"50\"/>\
			</TruckData>\
			<PhysicsModel><Body Mass=\"1000\" CenterOfMassOffset=\"(0; 1; 0)\"/></PhysicsModel>\
		</Truck>",
	);

	assert_eq!(collected(&truck, TRUCK, "FuelCapacity"), ["200".to_owned()]);
	assert_eq!(
		collected(&truck, TRUCK, "Responsiveness"),
		["1.5".to_owned()]
	);
	assert_eq!(collected(&truck, TRUCK, "Length"), ["10000".to_owned()]);
	assert_eq!(
		collected(&truck, TRUCK, "Torque"),
		["default".to_owned(), "none".to_owned()]
	);
	assert_eq!(
		collected(&truck, TRUCK, "CenterOfMassOffset"),
		["(0; 1; 0)".to_owned()]
	);
	assert!(collected(&truck, TRUCK, "Mass").is_empty());
	assert_eq!(collected(&truck, TRUCK, "Country"), ["RU".to_owned()]);
	assert_eq!(collected(&truck, TRUCK, "UiName"), ["truck_ui".to_owned()]);

	let trailer = document(
		"<Truck>\
			<GameData Price=\"5\"><AddonSlots Quantity=\"3\"/></GameData>\
			<TruckData WaterCapacity=\"100\"><Wheels><Wheel SuspensionHeight=\"0.5\" SuspensionStrength=\"2\"/></Wheels></TruckData>\
			<PhysicsModel><Body Mass=\"1000\" CenterOfMassOffset=\"(0; 0; 0)\"/></PhysicsModel>\
			<FuelMass><Body Mass=\"200\"/></FuelMass>\
		</Truck>",
	);

	assert_eq!(
		collected(&trailer, TRAILER, "Mass"),
		["1000".to_owned(), "200".to_owned()]
	);
	assert_eq!(
		collected(&trailer, TRAILER, "WaterCapacity"),
		["100".to_owned()]
	);
	assert_eq!(collected(&trailer, TRAILER, "Quantity"), ["3".to_owned()]);
	assert!(collected(&trailer, TRAILER, "FuelCapacity").is_empty());

	let addon =
		document("<TruckAddon><TruckData FuelCapacity=\"100\" WaterCapacity=\"50\"/></TruckAddon>");

	assert_eq!(collected(&addon, ADDON, "FuelCapacity"), ["100".to_owned()]);
	assert_eq!(collected(&addon, ADDON, "WaterCapacity"), ["50".to_owned()]);
}

#[test]
fn собирает_поля_коробок_подвесок_и_лебёдок() {
	let gearboxes = document(
		"<Gearboxes>\
			<Gearbox AWDConsumptionModifier=\"1.2\" IdleFuelModifier=\"0.1\">\
				<Params IsHighGearExists=\"true\"/>\
				<Gear AngVel=\"1\" FuelModifier=\"1.1\"/>\
			</Gearbox>\
		</Gearboxes>",
	);
	let gearbox_values = collect(&gearboxes, GEARBOXES);

	assert!(gearbox_values.iter().any(|field| {
		field.selector == "/Gearboxes/Gearbox/Params" && field.attribute == "IsHighGearExists"
	}));
	assert!(gearbox_values.iter().any(|field| {
		field.selector == "/Gearboxes/Gearbox/Gear" && field.attribute == "FuelModifier"
	}));

	let suspensions =
		document("<Suspensions><Suspension Height=\"1\" Damping=\"2\"/></Suspensions>");
	let suspension_values = collect(&suspensions, SUSPENSIONS);

	assert_eq!(suspension_values.len(), 2);

	let winches =
		document("<Winches><Winch Length=\"1\" IsEngineIgnitionRequired=\"true\"/></Winches>");
	let winch_values = collect(&winches, WINCHES);

	assert_eq!(winch_values.len(), 2);
}

#[test]
fn собирает_поля_колёс_без_цен_дисков() {
	let doc = document(
		"<TruckWheels>\
			<TruckTires>\
				<TruckTire Name=\"tire\">\
					<GameData Price=\"100\" UnlockByRank=\"3\"/>\
				</TruckTire>\
			</TruckTires>\
			<TruckRims>\
				<TruckRim Name=\"rim\"><GameData Price=\"500\"/></TruckRim>\
			</TruckRims>\
			<TruckWheel BodyFriction=\"1\" BodyFrictionAsphalt=\"1.2\" SubstanceFriction=\"0.5\" IsIgnoreIce=\"true\" Mass=\"10\"/>\
		</TruckWheels>",
	);
	let values = collect(&doc, WHEELS);

	assert_eq!(
		collected(&doc, WHEELS, "Price"),
		["100".to_owned()],
		"цена диска редактором не показывается"
	);
	assert_eq!(collected(&doc, WHEELS, "BodyFriction"), ["1".to_owned()]);
	assert!(
		values
			.iter()
			.all(|field| !field.selector.contains("/TruckRim/")),
		"поля дисков не попадают в перенос"
	);
}

#[test]
fn служебные_атрибуты_и_шаблоны_не_попадают() {
	let doc = document(
		"<_templates>\
			<Truck>\
				<TruckData FuelCapacity=\"999\" Type=\"template\"/>\
			</Truck>\
		</_templates>\
		<Truck Name=\"a\">\
			<TruckData FuelCapacity=\"100\" Type=\"truck\"/>\
			<GameData><AddonSockets><Socket Names=\"a\" NamesBlock=\"b\" Offset=\"(0; 0; 0)\"/></AddonSockets></GameData>\
		</Truck>",
	);
	let values = collect(&doc, TRUCK);

	assert_eq!(
		values,
		[FieldValue {
			selector: "/Truck/TruckData".to_owned(),
			attribute: "FuelCapacity".to_owned(),
			value: Some("100".to_owned()),
		}]
	);
	assert!(
		values
			.iter()
			.all(|field| !matches!(field.attribute.as_str(), "Name" | "Type" | "Names")),
		"служебные атрибуты не попадают"
	);
}

#[test]
fn точный_путь_не_задевает_вложенные_элементы() {
	let doc = document(
		"<Truck>\
			<PhysicsModel>\
				<Body CenterOfMassOffset=\"(0; 1; 0)\">\
					<Body CenterOfMassOffset=\"(0; 2; 0)\"/>\
				</Body>\
			</PhysicsModel>\
		</Truck>",
	);
	let values = collect(&doc, TRUCK);

	assert_eq!(values.len(), 1);
	assert_eq!(values[0].selector, "/Truck/PhysicsModel/Body");
	assert_eq!(values[0].value.as_deref(), Some("(0; 1; 0)"));
}

#[test]
fn применяет_и_удаляет_значения() {
	let mut doc = document(
		"<Truck>\
			<TruckData FuelCapacity=\"100\" Responsiveness=\"1\" SteerSpeed=\"2\"/>\
		</Truck>",
	);
	let values = [
		FieldValue {
			selector: "/Truck/TruckData".to_owned(),
			attribute: "FuelCapacity".to_owned(),
			value: Some("150".to_owned()),
		},
		FieldValue {
			selector: "/Truck/TruckData".to_owned(),
			attribute: "Responsiveness".to_owned(),
			value: None,
		},
		FieldValue {
			selector: "/Truck/TruckData".to_owned(),
			attribute: "SteerSpeed".to_owned(),
			value: Some("2".to_owned()),
		},
		FieldValue {
			selector: "/Truck/TruckData/Nope".to_owned(),
			attribute: "Torque".to_owned(),
			value: Some("5".to_owned()),
		},
	];

	assert_eq!(apply(&mut doc, &values), (2, 1));

	let truck_data = doc
		.element("Truck")
		.and_then(|truck| truck.child("TruckData"))
		.expect("блок TruckData");

	assert_eq!(
		truck_data.attr_value("FuelCapacity").as_deref(),
		Some("150")
	);
	assert_eq!(truck_data.attr_value("Responsiveness"), None);
	assert_eq!(truck_data.attr_value("SteerSpeed").as_deref(), Some("2"));

	assert_eq!(apply(&mut doc, &values[..3]), (0, 0));
}

#[test]
fn находит_подпись_поля() {
	assert_eq!(
		label(ENGINES, "/EngineVariants/Engine", "Torque"),
		Some("engine.torque")
	);
	assert_eq!(
		label(TRUCK, "/Truck/PhysicsModel/Body", "CenterOfMassOffset"),
		Some("physics.body.centerOfMassOffset")
	);
	assert_eq!(
		label(TRUCK, "/Truck/PhysicsModel/Body/Body", "CenterOfMassOffset"),
		None
	);
	assert_eq!(label(ENGINES, "/EngineVariants/Engine", "Name"), None);
	assert_eq!(
		label(TRUCK, "/Truck/TruckData/Wheels/Wheel[1]", "Torque"),
		Some("truckWheel.torque")
	);
}

#[test]
fn путь_правила_сопоставляется_по_границе() {
	assert!(FieldPath::Prefix("/Truck/TruckData").matches("/Truck/TruckData"));
	assert!(FieldPath::Prefix("/Truck/TruckData").matches("/Truck/TruckData/Winch"));
	assert!(FieldPath::Prefix("/Truck/TruckData").matches("/Truck/TruckData[1]"));
	assert!(!FieldPath::Prefix("/Truck/TruckData").matches("/Truck/TruckDataExtra"));
	assert!(FieldPath::Exact("/a/b").matches("/a/b"));
	assert!(!FieldPath::Exact("/a/b").matches("/a/b/c"));
	assert!(!FieldPath::Exact("/a/b").matches("/a/b[1]"));
}
