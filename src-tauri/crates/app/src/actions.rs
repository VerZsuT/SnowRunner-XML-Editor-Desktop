//! Действия с аддонами трака: краны, прицепы и «банан бандита».
//!
//! Действия повторяют правила прежнего интерфейса: добавляют или убирают имена
//! из сокетов, блокировок и сдвигов. Webview отправляет только намерение,
//! поэтому разбор XML остаётся в Rust.

use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_domain::xml::{Element, Node, XmlDocument};
use thiserror::Error;

/// Кран, который устанавливается в сокет трака.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum Crane {
	/// Кран RU.
	Ru,
	/// Кран US.
	Us,
}

impl Crane {
	/// Имя типа аддона в XML.
	pub const fn name(self) -> &'static str {
		match self {
			Self::Ru => "MinicraneRU",
			Self::Us => "MinicraneUS",
		}
	}

	/// Противоположный кран.
	pub const fn other(self) -> Self {
		match self {
			Self::Ru => Self::Us,
			Self::Us => Self::Ru,
		}
	}
}

/// Прицеп, который цепляется к траку.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum Trailer {
	/// Прицеп для скаута.
	Scout,
	/// Обычный прицеп.
	Truck,
}

impl Trailer {
	/// Имя типа аддона в XML.
	pub const fn name(self) -> &'static str {
		match self {
			Self::Scout => "ScautTrailer",
			Self::Truck => "Trailer",
		}
	}

	/// Противоположный прицеп.
	pub const fn other(self) -> Self {
		match self {
			Self::Scout => Self::Truck,
			Self::Truck => Self::Scout,
		}
	}
}

/// Ошибка действия с аддонами.
#[derive(Debug, Error)]
pub enum ActionError {
	/// В документе нет элемента Truck.
	#[error("в документе нет элемента Truck")]
	TruckNotFound,

	/// В документе нет элемента GameData.
	#[error("в документе нет элемента GameData")]
	GameDataNotFound,

	/// Сокет, к которому добавляется аддон, не найден.
	#[error("не найден сокет аддона: {0}")]
	SocketNotFound(&'static str),
}

const BANDIT_CRANE: &str = "CraneKrs58Bandit";
const BANDIT_TRUNK: &str = "ziks605rTrunk";
const BANDIT_FRAME: &str = "ZikzFrameAddon";
const BANDIT_NAMES_BLOCK: &str = "ZikzLogLift, ZikzBigCrane, FrameAddonKungZikz, FrameAddonSeismicVibratorZikz, FrameAddonTankZikz, FrameAddonLogShortZikz";

/// Добавляет или убирает кран.
///
/// При добавлении кран получает сокет противоположного крана, а блокировки и
/// сдвиги этого сокета дублируются с новым именем.
pub fn set_crane(
	document: &mut XmlDocument,
	crane: Crane,
	enabled: bool,
) -> Result<bool, ActionError> {
	let game_data = game_data_mut(document)?;
	let mut sockets = sockets_mut(game_data);
	let present = sockets
		.iter()
		.any(|socket| contains_name(socket, "Names", crane.name()));

	if present == enabled {
		return Ok(false);
	}

	if enabled {
		let other = crane.other().name();
		let index = sockets
			.iter()
			.position(|socket| contains_name(socket, "Names", other))
			.ok_or(ActionError::SocketNotFound(other))?;

		append_name(sockets[index], "Names", crane.name());

		for socket in &mut sockets {
			if contains_name(socket, "NamesBlock", other) {
				append_name(socket, "NamesBlock", crane.name());
			}

			duplicate_shifts(socket, other, crane.name());
		}
	} else {
		let index = sockets
			.iter()
			.position(|socket| contains_name(socket, "Names", crane.name()))
			.expect("кран присутствует");

		remove_name(sockets[index], "Names", crane.name());

		for socket in &mut sockets {
			remove_name(socket, "NamesBlock", crane.name());
			remove_shifts(socket, crane.name());
		}
	}

	Ok(true)
}

/// Добавляет или убирает прицеп.
pub fn set_trailer(
	document: &mut XmlDocument,
	trailer: Trailer,
	enabled: bool,
) -> Result<bool, ActionError> {
	let game_data = game_data_mut(document)?;
	let mut sockets = sockets_mut(game_data);
	let present = sockets
		.iter()
		.any(|socket| contains_name(socket, "Names", trailer.name()));

	if present == enabled {
		return Ok(false);
	}

	if enabled {
		let other = trailer.other().name();
		let index = sockets
			.iter()
			.position(|socket| contains_name(socket, "Names", other))
			.ok_or(ActionError::SocketNotFound(other))?;

		append_name(sockets[index], "Names", trailer.name());

		for socket in &mut sockets {
			if contains_name(socket, "NamesBlock", other) {
				append_name(socket, "NamesBlock", trailer.name());
				duplicate_shifts(socket, other, trailer.name());
			}
		}
	} else {
		let index = sockets
			.iter()
			.position(|socket| contains_name(socket, "Names", trailer.name()))
			.expect("прицеп присутствует");

		remove_name(sockets[index], "Names", trailer.name());

		for socket in &mut sockets {
			if remove_name(socket, "NamesBlock", trailer.name()) {
				remove_shifts(socket, trailer.name());
			}
		}
	}

	Ok(true)
}

/// Добавляет или убирает кран «Банан бандита» для трака Zikz 605R.
pub fn set_bandit_crane(document: &mut XmlDocument, enabled: bool) -> Result<bool, ActionError> {
	let game_data = game_data_mut(document)?;
	let present = sockets(game_data)
		.iter()
		.any(|socket| contains_name(socket, "Names", BANDIT_CRANE));

	if present == enabled {
		return Ok(false);
	}

	if enabled {
		{
			let mut sockets = sockets_mut(game_data);

			if let Some(index) = sockets
				.iter()
				.position(|socket| contains_name(socket, "Names", BANDIT_TRUNK))
			{
				let mut values = names(sockets[index], "NamesBlock");
				values.insert(0, BANDIT_CRANE.to_owned());
				write_names(sockets[index], "NamesBlock", &values);
			}

			if let Some(index) = sockets
				.iter()
				.position(|socket| contains_name(socket, "Names", BANDIT_FRAME))
			{
				sockets[index].append_child(addon_shift(BANDIT_CRANE, Some("(-0.5; 0; 0)")));
			}
		}

		let mut block = Element::new("AddonSockets");
		let mut socket = Element::new("Socket");
		socket.set_attr_value("Names", BANDIT_CRANE);
		socket.set_attr_value("Offset", "(-1.25; 0; 0)");
		socket.set_attr_value("NamesBlock", BANDIT_NAMES_BLOCK);
		socket.set_attr_value("ParentFrame", "BoneAddonAttachment_cdt");
		socket.self_closing = true;
		block.append_child(socket);
		game_data.append_child(block);
	} else {
		for node in &mut game_data.children {
			let Node::Element(block) = node else {
				continue;
			};

			if block.name != "AddonSockets" {
				continue;
			}

			let position = block.children.iter().position(|node| match node {
				Node::Element(socket) => {
					socket.name == "Socket" && contains_name(socket, "Names", BANDIT_CRANE)
				}
				_ => false,
			});

			if let Some(position) = position {
				block.remove_child(position);

				break;
			}
		}

		let mut sockets = sockets_mut(game_data);

		for socket in &mut sockets {
			remove_name(socket, "NamesBlock", BANDIT_CRANE);
			remove_shifts(socket, BANDIT_CRANE);
		}
	}

	Ok(true)
}

/// Установлен ли кран.
pub fn has_crane(document: &XmlDocument, crane: Crane) -> bool {
	has_socket_name(document, crane.name())
}

/// Установлен ли прицеп.
pub fn has_trailer(document: &XmlDocument, trailer: Trailer) -> bool {
	has_socket_name(document, trailer.name())
}

/// Установлен ли кран «Банан бандита».
pub fn has_bandit_crane(document: &XmlDocument) -> bool {
	has_socket_name(document, BANDIT_CRANE)
}

/// Имя типа аддона в сокетах трака.
fn has_socket_name(document: &XmlDocument, name: &str) -> bool {
	document
		.element("Truck")
		.and_then(|truck| truck.child("GameData"))
		.is_some_and(|game_data| {
			sockets(game_data)
				.iter()
				.any(|socket| contains_name(socket, "Names", name))
		})
}

/// Элемент GameData трака.
fn game_data_mut(document: &mut XmlDocument) -> Result<&mut Element, ActionError> {
	let truck = document
		.element_mut("Truck")
		.ok_or(ActionError::TruckNotFound)?;

	truck
		.child_mut("GameData")
		.ok_or(ActionError::GameDataNotFound)
}

/// Сокеты всех секций AddonSockets.
fn sockets(game_data: &Element) -> Vec<&Element> {
	let mut result = Vec::new();

	for node in &game_data.children {
		let Node::Element(block) = node else {
			continue;
		};

		if block.name != "AddonSockets" {
			continue;
		}

		for child in &block.children {
			if let Node::Element(socket) = child {
				if socket.name == "Socket" {
					result.push(socket);
				}
			}
		}
	}

	result
}

/// Сокеты всех секций AddonSockets для изменения.
fn sockets_mut(game_data: &mut Element) -> Vec<&mut Element> {
	let mut result = Vec::new();

	for node in &mut game_data.children {
		let Node::Element(block) = node else {
			continue;
		};

		if block.name != "AddonSockets" {
			continue;
		}

		for child in &mut block.children {
			if let Node::Element(socket) = child {
				if socket.name == "Socket" {
					result.push(socket);
				}
			}
		}
	}

	result
}

/// Имена из атрибута-списка.
fn names(element: &Element, attribute: &str) -> Vec<String> {
	element
		.attr_value(attribute)
		.map(|value| {
			value
				.split(',')
				.map(str::trim)
				.filter(|value| !value.is_empty())
				.map(str::to_owned)
				.collect()
		})
		.unwrap_or_default()
}

/// Признак имени в атрибуте-списке.
fn contains_name(element: &Element, attribute: &str, name: &str) -> bool {
	names(element, attribute).iter().any(|value| value == name)
}

/// Записывает имена в атрибут-список.
fn write_names(element: &mut Element, attribute: &str, values: &[String]) {
	element.set_attr_value(attribute, values.join(", "));
}

/// Добавляет имя в атрибут-список.
fn append_name(element: &mut Element, attribute: &str, name: &str) {
	let mut values = names(element, attribute);
	values.push(name.to_owned());
	write_names(element, attribute, &values);
}

/// Убирает имя из атрибута-списка.
fn remove_name(element: &mut Element, attribute: &str, name: &str) -> bool {
	let mut values = names(element, attribute);
	let before = values.len();
	values.retain(|value| value != name);

	if values.len() == before {
		return false;
	}

	write_names(element, attribute, &values);

	true
}

/// Дублирует сдвиги с типом from, заменяя его на to.
fn duplicate_shifts(socket: &mut Element, from: &str, to: &str) {
	let positions: Vec<usize> = socket
		.children
		.iter()
		.enumerate()
		.filter_map(|(position, node)| match node {
			Node::Element(shift)
				if shift.name == "AddonsShift" && contains_name(shift, "Types", from) =>
			{
				Some(position)
			}
			_ => None,
		})
		.collect();

	for position in positions.into_iter().rev() {
		let Some(Node::Element(shift)) = socket.children.get(position) else {
			continue;
		};

		let mut copy = shift.clone();

		for attribute in &mut copy.attributes {
			attribute.value = replace_token(&attribute.value, from, to);
		}

		socket.self_closing = false;
		socket.children.insert(position + 1, Node::Element(copy));
	}
}

/// Убирает сдвиги с указанным типом.
fn remove_shifts(socket: &mut Element, name: &str) {
	let positions: Vec<usize> = socket
		.children
		.iter()
		.enumerate()
		.filter_map(|(position, node)| match node {
			Node::Element(shift)
				if shift.name == "AddonsShift" && contains_name(shift, "Types", name) =>
			{
				Some(position)
			}
			_ => None,
		})
		.collect();

	for position in positions.into_iter().rev() {
		socket.children.remove(position);
	}
}

/// Заменяет имя в списке через запятую.
fn replace_token(value: &str, from: &str, to: &str) -> String {
	value
		.split(',')
		.map(|item| {
			if item.trim() == from {
				item.replace(from, to)
			} else {
				item.to_owned()
			}
		})
		.collect::<Vec<_>>()
		.join(", ")
}

/// Новый сдвиг аддона.
fn addon_shift(types: &str, offset: Option<&str>) -> Element {
	let mut shift = Element::new("AddonsShift");

	if let Some(offset) = offset {
		shift.set_attr_value("Offset", offset);
	}

	shift.set_attr_value("Types", types);
	shift.self_closing = true;

	shift
}

#[cfg(test)]
mod tests;
