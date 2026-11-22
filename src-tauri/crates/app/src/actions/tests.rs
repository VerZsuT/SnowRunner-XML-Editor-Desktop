//! Тесты модуля `actions`: краны, прицепы и «Банан бандита».

use super::*;
use sxmle_domain::xml::{parse, resolve};

/// Трак с сокетами кранов, прицепов и аддонов.
const TRUCK: &str = "<Truck><GameData>\
<AddonSockets>\
<Socket Names=\"MinicraneRU\" Offset=\"(0; 0; 0)\" NamesBlock=\"Trailer\">\
<AddonsShift Offset=\"(-1; 0; 0)\" Types=\"MinicraneRU\"/>\
</Socket>\
<Socket Names=\"FrameAddon\" NamesBlock=\"MinicraneRU\"/>\
<Socket Names=\"Trailer\" NamesBlock=\"FrameAddon\"/>\
<Socket Names=\"ScautTrailer\" NamesBlock=\"Trailer\"/>\
</AddonSockets>\
<AddonSockets><Socket Names=\"BigCraneRU\" NamesBlock=\"MinicraneRU\"/></AddonSockets>\
</GameData></Truck>";

/// Документ трака.
fn truck() -> XmlDocument {
	parse(TRUCK).unwrap()
}

/// Имена атрибута у сокета по индексу.
fn socket_names(document: &XmlDocument, index: usize, attribute: &str) -> Vec<String> {
	let selector = format!("/Truck/GameData/AddonSockets[0]/Socket[{index}]");
	let element = resolve(document, &selector).unwrap();

	names(element, attribute)
}

#[test]
fn добавляет_и_убирает_кран() {
	let mut document = truck();

	assert!(set_crane(&mut document, Crane::Us, true).unwrap());
	assert_eq!(
		socket_names(&document, 0, "Names"),
		["MinicraneRU", "MinicraneUS"]
	);
	assert_eq!(
		socket_names(&document, 1, "NamesBlock"),
		["MinicraneRU", "MinicraneUS"]
	);

	let socket = resolve(&document, "/Truck/GameData/AddonSockets[0]/Socket[0]").unwrap();
	let shifts: Vec<&Element> = socket
		.children
		.iter()
		.filter_map(|node| match node {
			Node::Element(element) if element.name == "AddonsShift" => Some(element),
			_ => None,
		})
		.collect();

	assert_eq!(shifts.len(), 2);
	assert_eq!(
		shifts[0].attr_value("Types").as_deref(),
		Some("MinicraneRU")
	);
	assert_eq!(
		shifts[1].attr_value("Types").as_deref(),
		Some("MinicraneUS")
	);
	assert_eq!(
		shifts[1].attr_value("Offset").as_deref(),
		Some("(-1; 0; 0)")
	);

	assert!(!set_crane(&mut document, Crane::Us, true).unwrap());
	assert!(set_crane(&mut document, Crane::Us, false).unwrap());
	assert_eq!(socket_names(&document, 0, "Names"), ["MinicraneRU"]);
	assert_eq!(socket_names(&document, 1, "NamesBlock"), ["MinicraneRU"]);

	let socket = resolve(&document, "/Truck/GameData/AddonSockets[0]/Socket[0]").unwrap();
	let shifts = socket
		.children
		.iter()
		.filter(|node| matches!(node, Node::Element(element) if element.name == "AddonsShift"))
		.count();

	assert_eq!(shifts, 1);
}

#[test]
fn не_добавляет_кран_без_сокета() {
	let mut document = parse(
		"<Truck><GameData><AddonSockets><Socket Names=\"FrameAddon\"/></AddonSockets></GameData></Truck>",
	)
	.unwrap();

	assert!(matches!(
		set_crane(&mut document, Crane::Ru, true),
		Err(ActionError::SocketNotFound("MinicraneUS"))
	));
}

/// Трак с обычным прицепом, но без прицепа скаута.
const TRAILER_TRUCK: &str = "<Truck><GameData><AddonSockets>\
<Socket Names=\"Trailer\" NamesBlock=\"FrameAddon\"/>\
<Socket Names=\"FrameAddon\" NamesBlock=\"Trailer\">\
<AddonsShift Offset=\"(0; 0; 0)\" Types=\"Trailer\"/>\
</Socket>\
</AddonSockets></GameData></Truck>";

#[test]
fn добавляет_и_убирает_прицеп() {
	let mut document = parse(TRAILER_TRUCK).unwrap();

	assert!(set_trailer(&mut document, Trailer::Scout, true).unwrap());
	assert_eq!(
		socket_names(&document, 0, "Names"),
		["Trailer", "ScautTrailer"]
	);
	assert_eq!(
		socket_names(&document, 1, "NamesBlock"),
		["Trailer", "ScautTrailer"]
	);

	let socket = resolve(&document, "/Truck/GameData/AddonSockets[0]/Socket[1]").unwrap();
	let shifts: Vec<&Element> = socket
		.children
		.iter()
		.filter_map(|node| match node {
			Node::Element(element) if element.name == "AddonsShift" => Some(element),
			_ => None,
		})
		.collect();

	assert_eq!(shifts.len(), 2);
	assert_eq!(shifts[0].attr_value("Types").as_deref(), Some("Trailer"));
	assert_eq!(
		shifts[1].attr_value("Types").as_deref(),
		Some("ScautTrailer")
	);

	assert!(set_trailer(&mut document, Trailer::Scout, false).unwrap());
	assert_eq!(socket_names(&document, 0, "Names"), ["Trailer"]);
	assert_eq!(socket_names(&document, 1, "NamesBlock"), ["Trailer"]);
}

/// Трак с аддонами «банана бандита».
const BANDIT: &str = "<Truck><GameData><AddonSockets>\
<Socket Names=\"ziks605rTrunk\" NamesBlock=\"A\"/>\
<Socket Names=\"ZikzFrameAddon\" NamesBlock=\"B\"/>\
</AddonSockets></GameData></Truck>";

#[test]
fn добавляет_и_убирает_банан_бандита() {
	let mut document = parse(BANDIT).unwrap();

	assert!(set_bandit_crane(&mut document, true).unwrap());
	assert!(!set_bandit_crane(&mut document, true).unwrap());

	let game_data = resolve(&document, "/Truck/GameData").unwrap();
	let all = sockets(game_data);

	assert_eq!(all.len(), 3);
	assert!(
		all.iter()
			.any(|socket| contains_name(socket, "Names", BANDIT_CRANE))
	);
	assert_eq!(names(all[0], "NamesBlock"), [BANDIT_CRANE, "A"]);
	assert!(
		all[1]
			.children
			.iter()
			.filter_map(|node| match node {
				Node::Element(element) if element.name == "AddonsShift" => Some(element),
				_ => None,
			})
			.any(|shift| contains_name(shift, "Types", BANDIT_CRANE))
	);

	assert!(set_bandit_crane(&mut document, false).unwrap());

	let game_data = resolve(&document, "/Truck/GameData").unwrap();
	let all = sockets(game_data);

	assert_eq!(all.len(), 2);
	assert!(
		!all.iter()
			.any(|socket| contains_name(socket, "Names", BANDIT_CRANE))
	);
	assert_eq!(names(all[0], "NamesBlock"), ["A"]);
}
