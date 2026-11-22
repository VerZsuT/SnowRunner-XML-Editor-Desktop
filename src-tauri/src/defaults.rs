//! Стандартные значения параметров из выгрузки 1.4.0.
//!
//! Большой `defaults.ts` заменён сжатым JSON-ассетом: он распаковывается один
//! раз при первом сбросе, поэтому не раздувает бандл интерфейса и не грузится
//! при обычном открытии редактора.

use std::collections::HashMap;
use std::io::Read;
use std::sync::OnceLock;

use flate2::read::GzDecoder;
use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_app::documents::DocumentInfo;

/// Значения одного файла: selector → имя атрибута → значение.
type FileDefaults = HashMap<String, HashMap<String, String>>;

/// Все файлы: имя файла с источником → значения.
type DefaultStore = HashMap<String, FileDefaults>;

static STORE: OnceLock<DefaultStore> = OnceLock::new();

/// Значение по умолчанию для поля документа.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct DefaultValue {
	/// Стабильный путь элемента.
	pub selector: String,
	/// Имя XML-атрибута.
	pub name: String,
	/// Значение атрибута.
	pub value: String,
}

/// Значения по умолчанию открытого документа.
pub fn values(info: &DocumentInfo) -> Vec<DefaultValue> {
	let Some(file) = STORE.get_or_init(load).get(&file_key(info)) else {
		return Vec::new();
	};

	file.iter()
		.flat_map(|(selector, attributes)| {
			attributes.iter().map(|(name, value)| DefaultValue {
				selector: selector.clone(),
				name: name.clone(),
				value: value.clone(),
			})
		})
		.collect()
}

/// Значения по умолчанию открытого документа по путям текущей модели.
pub fn attributes(info: &DocumentInfo) -> FileDefaults {
	STORE
		.get_or_init(load)
		.get(&file_key(info))
		.cloned()
		.unwrap_or_default()
}

/// Ключ файла в выгрузке: `<имя>_<dlc|mod|default>`.
fn file_key(info: &DocumentInfo) -> String {
	let source = info
		.dlc
		.as_deref()
		.filter(|value| !value.is_empty())
		.or_else(|| info.mod_name.as_deref().filter(|value| !value.is_empty()))
		.unwrap_or("default");

	format!("{}_{source}", info.name)
}

/// Читает и нормализует сжатый ассет.
fn load() -> DefaultStore {
	let bytes = include_bytes!("../assets/defaults.json.gz");
	let mut decoder = GzDecoder::new(&bytes[..]);
	let mut json = String::new();

	if decoder.read_to_string(&mut json).is_err() {
		return DefaultStore::new();
	}

	let raw: DefaultStore = serde_json::from_str(&json).unwrap_or_default();

	raw.into_iter()
		.map(|(file, selectors)| {
			let selectors = selectors
				.into_iter()
				.map(|(selector, values)| (selector_path(&selector), values))
				.collect();

			(file, selectors)
		})
		.collect()
}

/// Преобразует селектор 1.4.0 в путь текущей модели.
///
/// `Truck > TruckData > Wheel:nth-of-type(2)` → `/Truck/TruckData/Wheel[1]`.
fn selector_path(selector: &str) -> String {
	let mut path = String::new();

	for part in selector.split(" > ") {
		let (name, index) = parse_part(part);

		path.push('/');
		path.push_str(name);

		if index > 1 {
			path.push('[');
			path.push_str(&(index - 1).to_string());
			path.push(']');
		}
	}

	path
}

/// Имя элемента и номер `nth-of-type` (по умолчанию первый).
fn parse_part(part: &str) -> (&str, usize) {
	const MARKER: &str = ":nth-of-type(";

	let Some(start) = part.find(MARKER) else {
		return (part, 1);
	};

	let tail = &part[start + MARKER.len()..];
	let Some(end) = tail.find(')') else {
		return (part, 1);
	};

	match tail[..end].parse::<usize>() {
		Ok(index) if index > 0 => (&part[..start], index),
		_ => (part, 1),
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn converts_selectors() {
		assert_eq!(selector_path("Truck > TruckData"), "/Truck/TruckData");
		assert_eq!(
			selector_path("Truck > TruckData > Wheel:nth-of-type(3)"),
			"/Truck/TruckData/Wheel[2]"
		);
	}

	#[test]
	fn reads_known_defaults() {
		let info = DocumentInfo {
			doc_id: "0".to_owned(),
			kind: sxmle_app::documents::DocumentKind::Winches,
			name: "winches_medium_trucks".to_owned(),
			path: String::new(),
			archive_name: String::new(),
			dlc: None,
			mod_name: None,
			revision: 0,
			dirty: false,
		};
		let values = values(&info);

		assert!(values.iter().any(|value| {
			value.selector == "/WinchVariants/Winch"
				&& value.name == "Length"
				&& value.value == "14"
		}));
	}
}
