//! Блоки TruckGameData: UI-описание, сокеты, аддоны.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::AttrReader;
use crate::game::field::Field;
use crate::game::limit::Limit;
use crate::game::position::Position;

/// Имя элемента UI-описания для региона по умолчанию.
pub const DEFAULT_REGION: &str = "region:default";

/// Блок UI трака (UiDesc).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckUiDesc {
	/// Описание.
	pub ui_desc: Field<String>,
	/// Название.
	pub ui_name: Field<String>,
	/// Иконка трака для гаража.
	pub ui_icon_328x458: Field<String>,
	/// UI-описание для региона по умолчанию.
	pub default_region: Option<Box<TruckUiDesc>>,
}

impl TruckUiDesc {
	/// Читает блок UiDesc.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			ui_desc: reader
				.string("UiDesc", None)
				.label("uiDesc.uiDesc")
				.desc("uiDesc.uiDescDesc"),
			ui_name: reader
				.string("UiName", None)
				.label("uiDesc.uiName")
				.desc("uiDesc.uiNameDesc"),
			ui_icon_328x458: reader
				.string("UiIcon328x458", None)
				.label("uiDesc.uiIcon328x458"),
			default_region: reader
				.child(DEFAULT_REGION)
				.map(|reader| Box::new(Self::read(&reader))),
		}
	}
}

/// Место крепления лебёдки (WinchSocket).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckWinchSocket {
	/// Положение места крепления.
	pub pos: Field<Position>,
}

impl TruckWinchSocket {
	/// Читает элемент WinchSocket.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			pos: reader.position("Pos", None),
		}
	}
}

/// Место, за которое цепляется кран (CraneSocket).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckCraneSocket {
	/// Положение сокета крана.
	pub pos: Field<Position>,
}

impl TruckCraneSocket {
	/// Читает элемент CraneSocket.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			pos: reader.position("Pos", None),
		}
	}
}

/// Количество слотов для груза (AddonSlots).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TrailerAddonSlots {
	/// Количество слотов.
	pub quantity: Field<i32>,
}

impl TrailerAddonSlots {
	/// Читает элемент AddonSlots.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			quantity: reader
				.integer("Quantity", Some(0))
				.label("addonSlots.quantity")
				.desc("addonSlots.quantityDesc")
				.limit(Limit::positive().rounded()),
		}
	}
}
/// Секция взаимного расположения аддонов (AddonSockets).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckAddonSockets {
	/// Имя XML-файла аддона по умолчанию.
	pub default_addon: Field<String>,
	/// Места крепления аддона на траке.
	pub sockets: Vec<TruckAddonSocket>,
}

impl TruckAddonSockets {
	/// Читает элемент AddonSockets.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			default_addon: reader
				.string("DefaultAddon", None)
				.label("addonSockets.defaultAddon"),
			sockets: reader
				.children("Socket")
				.iter()
				.map(TruckAddonSocket::read)
				.collect(),
		}
	}
}

/// Место крепления аддона на траке (Socket).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckAddonSocket {
	/// Имена типов описываемых аддонов.
	pub names: Field<Vec<String>>,
	/// Положение точки крепления в координатах fbx трака.
	pub offset: Field<Position>,
	/// Имена типов, блокируемых при установке аддона из этого сокета.
	pub names_block: Field<Vec<String>>,
	/// Сдвиги точки установки аддона.
	pub addon_shifts: Vec<TruckAddonShift>,
}

impl TruckAddonSocket {
	/// Читает элемент Socket.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			names: reader
				.string_array("Names", None)
				.label("addonSocket.names"),
			offset: reader.position("Offset", None),
			names_block: reader
				.string_array("NamesBlock", None)
				.label("addonSocket.namesBlock"),
			addon_shifts: reader
				.children("AddonsShift")
				.iter()
				.map(TruckAddonShift::read)
				.collect(),
		}
	}
}

/// Сдвиг точки установки аддона (AddonsShift).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckAddonShift {
	/// Имена типов аддонов, при установке которых сдвинется описываемый аддон.
	pub types: Field<Vec<String>>,
	/// Смещение кости аддона.
	pub offset: Field<Position>,
	/// Запрет установки трейлера при паре аддонов со сдвигом.
	pub trailer_names_block: Field<Vec<String>>,
}

impl TruckAddonShift {
	/// Читает элемент AddonsShift.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			types: reader.string_array("Types", None),
			offset: reader.position("Offset", None),
			trailer_names_block: reader.string_array("TrailerNamesBlock", None),
		}
	}
}
