//! Тесты модуля `selector`: стабильные пути узлов и мутации.

use super::*;
use crate::xml::parse;

/// Документ с двумя корневыми элементами.
fn document() -> XmlDocument {
	parse(
		"<_templates><_template Name=\"Normal\" /></_templates>\r\n\
		<Truck><TruckData FuelCapacity=\"200\" DiffLockType=\"Always\" />\
		<GameData Price=\"1000\"><UiDesc UiName=\"NAME\" /></GameData></Truck>\r\n",
	)
	.unwrap()
}

#[test]
fn находит_элементы_по_пути() {
	let document = document();

	assert_eq!(
		resolve(&document, "/Truck/TruckData")
			.unwrap()
			.attr_value("FuelCapacity")
			.as_deref(),
		Some("200")
	);
	assert_eq!(
		resolve(&document, "/_templates/_template")
			.unwrap()
			.attr_value("Name")
			.as_deref(),
		Some("Normal")
	);
	assert!(matches!(
		resolve(&document, "/Truck/Missing"),
		Err(SelectorError::NotFound(_))
	));
	assert_eq!(
		resolve(&document, "/Truck/GameData/UiDesc")
			.unwrap()
			.attr_value("UiName")
			.as_deref(),
		Some("NAME")
	);
}

#[test]
fn отклоняет_некорректный_путь() {
	let mut document = document();

	assert!(matches!(
		resolve(&document, "Truck"),
		Err(SelectorError::Invalid(_))
	));
	assert!(matches!(
		resolve(&document, "/"),
		Err(SelectorError::Invalid(_))
	));
	assert!(matches!(
		set_attr(&mut document, "/Truck[0", "A", Some("1")),
		Err(SelectorError::Invalid(_))
	));
	assert!(matches!(
		resolve(&document, "/Truck/TruckData[1]"),
		Err(SelectorError::NotFound(_))
	));
}

#[test]
fn меняет_и_удаляет_атрибуты() {
	let mut document = document();

	set_attr(
		&mut document,
		"/Truck/TruckData",
		"FuelCapacity",
		Some("350"),
	)
	.unwrap();
	set_attr(&mut document, "/Truck/TruckData", "DiffLockType", None).unwrap();
	set_attr(&mut document, "/Truck/TruckData", "Label", Some("A & B")).unwrap();

	let element = resolve(&document, "/Truck/TruckData").unwrap();

	assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("350"));
	assert_eq!(element.attr("DiffLockType"), None);
	assert_eq!(element.attr_value("Label").as_deref(), Some("A & B"));
	assert!(document.to_xml().contains("Label=\"A &amp; B\""));
}

#[test]
fn заменяет_текст_и_экранирует_его() {
	let mut document = document();

	set_text(&mut document, "/Truck/GameData/UiDesc", "A & <B>").unwrap();

	assert_eq!(
		resolve(&document, "/Truck/GameData/UiDesc")
			.unwrap()
			.text_value(),
		"A & <B>"
	);
	assert!(document.to_xml().contains("A &amp; &lt;B&gt;"));
}

#[test]
fn добавляет_и_удаляет_элементы() {
	let mut document = document();

	let first = add_element(&mut document, "/Truck/GameData", "WinchSocket", None).unwrap();

	assert_eq!(first, "/Truck/GameData/WinchSocket[0]");

	let second = add_element(&mut document, "/Truck/GameData", "WinchSocket", Some(0)).unwrap();

	assert_eq!(second, "/Truck/GameData/WinchSocket[0]");
	set_attr(&mut document, &second, "Pos", Some("(1; 2; 3)")).unwrap();
	set_attr(
		&mut document,
		"/Truck/GameData/WinchSocket[1]",
		"Pos",
		Some("(4; 5; 6)"),
	)
	.unwrap();

	assert_eq!(
		resolve(&document, "/Truck/GameData/WinchSocket[0]")
			.unwrap()
			.attr_value("Pos")
			.as_deref(),
		Some("(1; 2; 3)")
	);
	assert_eq!(
		resolve(&document, "/Truck/GameData/WinchSocket[1]")
			.unwrap()
			.attr_value("Pos")
			.as_deref(),
		Some("(4; 5; 6)")
	);

	remove_element(&mut document, "/Truck/GameData/WinchSocket[0]").unwrap();

	assert!(resolve(&document, "/Truck/GameData/WinchSocket[1]").is_err());
	assert_eq!(
		resolve(&document, "/Truck/GameData/WinchSocket[0]")
			.unwrap()
			.attr_value("Pos")
			.as_deref(),
		Some("(4; 5; 6)")
	);
	assert!(matches!(
		add_element(&mut document, "/Truck/GameData", "WinchSocket", Some(5)),
		Err(SelectorError::Index(_))
	));
}

#[test]
fn переставляет_элементы() {
	let mut document =
		parse("<Gearbox><Gear AngVel=\"1\" /><Gear AngVel=\"2\" /><Gear AngVel=\"3\" /></Gearbox>")
			.unwrap();

	let new_selector = move_element(&mut document, "/Gearbox/Gear[0]", 2).unwrap();

	assert_eq!(new_selector, "/Gearbox/Gear[2]");

	let values: Vec<String> = document
		.root
		.children_named("Gear")
		.map(|gear| gear.attr_value("AngVel").unwrap_or_default())
		.collect();

	assert_eq!(values, ["2", "3", "1"]);
	assert!(matches!(
		move_element(&mut document, "/Gearbox/Gear[0]", 5),
		Err(SelectorError::Index(_))
	));
}

#[test]
fn обходит_элементы_по_путям() {
	let document = document();
	let mut paths = Vec::new();

	walk_paths(&document, &mut |path, element| {
		paths.push((path, element.name.clone()));
	});

	assert_eq!(
		paths,
		[
			("/_templates".to_owned(), "_templates".to_owned()),
			("/_templates/_template".to_owned(), "_template".to_owned()),
			("/Truck".to_owned(), "Truck".to_owned()),
			("/Truck/TruckData".to_owned(), "TruckData".to_owned()),
			("/Truck/GameData".to_owned(), "GameData".to_owned()),
			("/Truck/GameData/UiDesc".to_owned(), "UiDesc".to_owned()),
		]
	);
}

#[test]
fn обход_пишет_индексы_одноимённых_соседей() {
	let document = parse(
		"<Gearbox><Gear AngVel=\"1\" /><Gear AngVel=\"2\" /><Other /><Gear AngVel=\"3\" /></Gearbox>",
	)
	.unwrap();
	let mut paths = Vec::new();

	walk_paths(&document, &mut |path, _| paths.push(path));

	assert_eq!(
		paths,
		[
			"/Gearbox".to_owned(),
			"/Gearbox/Gear".to_owned(),
			"/Gearbox/Gear[1]".to_owned(),
			"/Gearbox/Other".to_owned(),
			"/Gearbox/Gear[2]".to_owned(),
		]
	);
}
