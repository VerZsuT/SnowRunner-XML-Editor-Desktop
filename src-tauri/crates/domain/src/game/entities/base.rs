//! Общие блоки сущностей: `GameData` и `UiDesc`.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::AttrReader;
use crate::game::field::Field;
use crate::game::limit::Limit;

/// Информация о взаимодействии сущности с окружающим миром (`<GameData>`).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct BaseGameData {
	/// Цена.
	pub price: Field<i32>,
	/// Разблокируется разведкой.
	pub unlock_by_exploration: Field<bool>,
	/// Уровень разблокировки.
	pub unlock_by_rank: Field<i32>,
	/// Блок UI.
	pub ui_desc: Option<BaseUiDesc>,
}

impl BaseGameData {
	/// Читает блок `GameData`.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			price: reader
				.integer("Price", Some(0))
				.label("gameData.price")
				.desc("gameData.priceDesc")
				.step(100.0)
				.limit(Limit::positive().rounded()),
			unlock_by_exploration: reader
				.boolean("UnlockByExploration", Some(false))
				.label("gameData.unlockByExploration")
				.desc("gameData.unlockByExplorationDesc"),
			unlock_by_rank: reader
				.integer("UnlockByRank", Some(1))
				.label("gameData.unlockByRank")
				.desc("gameData.unlockByRankDesc")
				.limit(Limit::new(Some(1.0), Some(30.0), true)),
			ui_desc: reader
				.child("UiDesc")
				.map(|reader| BaseUiDesc::read(&reader)),
		}
	}
}

/// Блок UI (`<UiDesc>`).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct BaseUiDesc {
	/// Описание.
	pub ui_desc: Field<String>,
	/// Название.
	pub ui_name: Field<String>,
}

impl BaseUiDesc {
	/// Читает блок `UiDesc`.
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
		}
	}
}
