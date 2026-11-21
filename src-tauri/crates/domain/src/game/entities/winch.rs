//! Лебёдка (элемент Winch) из файлов classes/winches.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::{AttrReader, variant_readers};
use crate::game::descriptor::{InputArea, InputAreas};
use crate::game::entities::BaseGameData;
use crate::game::field::Field;
use crate::game::limit::Limit;
use crate::game::templates::Templates;
use crate::xml::XmlDocument;

/// Лебёдка.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Winch {
	/// Имя лебёдки.
	pub name: Field<String>,
	/// Длина троса.
	pub length: Field<f64>,
	/// Сила лебёдки.
	pub strength_mult: Field<f64>,
	/// Нужно ли зажигание двигателя.
	pub is_engine_ignition_required: Field<bool>,
	/// Информация о взаимодействии с окружающим миром.
	pub game_data: Option<BaseGameData>,
}

impl Winch {
	/// Читает все лебёдки документа.
	pub fn list(document: &XmlDocument, templates: Option<&Templates>) -> Vec<Self> {
		variant_readers(document, "Winch", "WinchVariants", templates)
			.iter()
			.map(Self::read)
			.collect()
	}

	/// Читает элемент Winch.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			name: reader.string("Name", None).label("winch.name"),
			length: reader
				.float("Length", Some(14.0))
				.label("winch.length")
				.desc("winch.lengthDesc")
				.limit(Limit::new(Some(0.0), Some(100.0), false))
				.areas(InputAreas {
					yellow: Some(vec![InputArea::new(30.0, 50.0)]),
					red: Some(vec![InputArea::new(51.0, 100.0)]),
					..InputAreas::default()
				}),
			strength_mult: reader
				.float("StrengthMult", Some(1.0))
				.label("winch.strengthMult")
				.limit(Limit::new(Some(0.0), Some(10.0), false))
				.areas(InputAreas {
					yellow: Some(vec![InputArea::new(2.0, 5.0)]),
					red: Some(vec![InputArea::new(5.1, 10.0)]),
					..InputAreas::default()
				}),
			is_engine_ignition_required: reader
				.boolean("IsEngineIgnitionRequired", Some(true))
				.label("winch.isEngineIgnitionRequired")
				.desc("winch.isEngineIgnitionRequiredDesc"),
			game_data: reader
				.child("GameData")
				.map(|reader| BaseGameData::read(&reader)),
		}
	}
}
