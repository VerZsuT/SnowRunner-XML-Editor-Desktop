//! Обмен параметрами траков через файлы `.epf`.
//!
//! Формат версии 3.0 повторяет прежний: JSON с `info`, `data` и `actionsData`.
//! Экспорт пишет атрибуты дерева `Truck` по стабильным путям, импорт применяет
//! их к открытому документу и доставляет недостающие краны и прицепы.
//!
//! Правки живут в памяти Rust, поэтому обмен идёт с деревом документа, а не с
//! файлом игры: пользователю не нужно сохранять документ перед экспортом.

use std::collections::BTreeMap;
use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use serde_json::Value;
use specta::Type;
use sxmle_domain::xml::{Element, XmlDocument, resolve_mut, walk_element};
use thiserror::Error;

use crate::actions::{self, ActionError, Crane, Trailer};
use crate::documents::{DocumentInfo, DocumentKind};

/// Версия формата `.epf`.
pub const VERSION: &str = "3.0";

/// Имя файла, для которого доступен кран «Банан бандита».
const BANDIT_TRUCK: &str = "zikz_605r";

/// Сведения о файле внутри `.epf`.
#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EpfInfo {
	/// Имя файла без расширения.
	pub name: String,

	/// Файл является прицепом.
	pub is_trailer: bool,

	/// DLC источника.
	#[serde(default, skip_serializing_if = "Option::is_none")]
	pub dlc: Option<String>,

	/// Мод источника: в файле ключ `mod`.
	#[serde(default, rename = "mod", skip_serializing_if = "Option::is_none")]
	pub mod_name: Option<String>,
}

/// Атрибуты одного узла: имя атрибута и значение.
type AttributeData = BTreeMap<String, Value>;

/// Атрибуты файла: путь узла и его атрибуты.
type SelectorData = BTreeMap<String, AttributeData>;

/// Содержимое файла `.epf`.
#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct EpfFile {
	/// Версия формата.
	pub version: String,

	/// Информация о содержащихся файлах.
	#[serde(default)]
	pub info: Vec<EpfInfo>,

	/// Атрибуты по файлу и пути узла.
	#[serde(default)]
	pub data: BTreeMap<String, SelectorData>,

	/// Данные доп. действий по файлу и идентификатору действия.
	#[serde(default, rename = "actionsData")]
	pub actions_data: BTreeMap<String, BTreeMap<String, Value>>,
}

/// Отчёт об экспорте параметров.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct EpfExportReport {
	/// Путь файла `.epf`.
	pub path: String,

	/// Сколько узлов записано.
	pub selectors: u32,

	/// Сколько атрибутов записано.
	pub attributes: u32,

	/// Сколько блоков доп. действий записано.
	pub actions: u32,
}

/// Отчёт об импорте параметров.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct EpfImportReport {
	/// Путь файла `.epf`.
	pub path: String,

	/// Сколько атрибутов применено.
	pub attributes: u32,

	/// Сколько действий применено.
	pub actions: u32,

	/// Сколько значений пропущено: узла нет или значение не скалярное.
	pub skipped: u32,

	/// Версия документа после импорта.
	pub revision: u32,

	/// Есть несохранённые правки.
	pub dirty: bool,
}

/// Ошибка обмена параметрами.
#[derive(Debug, Error)]
pub enum EpfError {
	/// Файл не прочитан.
	#[error("не удалось прочитать файл {}: {source}", path.display())]
	Read {
		/// Путь файла.
		path: PathBuf,
		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},

	/// Файл не записан.
	#[error("не удалось записать файл {}: {source}", path.display())]
	Write {
		/// Путь файла.
		path: PathBuf,
		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},

	/// Содержимое файла не является корректным JSON нужной формы.
	#[error("ошибка формата .epf: {0}")]
	Json(#[from] serde_json::Error),

	/// Версия файла не поддерживается.
	#[error("версия файла .epf {0} не поддерживается")]
	Version(String),

	/// В файле нет параметров для этого документа.
	#[error("в файле .epf нет параметров для {0}")]
	Missing(String),

	/// Документ не является файлом трака или прицепа.
	#[error("документ не является файлом трака или прицепа")]
	NotVehicle,

	/// Действие с аддонами не применимо.
	#[error(transparent)]
	Action(#[from] ActionError),
}

/// Ключ файла в `data` и `actionsData`: имя и источник.
pub fn file_key(info: &DocumentInfo) -> String {
	let source = info
		.dlc
		.as_deref()
		.or(info.mod_name.as_deref())
		.unwrap_or("default");

	format!("{}_{source}", info.name)
}

/// Экспортирует параметры документа в файл `.epf`, дополняя совместимый файл.
pub fn export(
	document: &XmlDocument,
	info: &DocumentInfo,
	path: &Path,
) -> Result<EpfExportReport, EpfError> {
	let truck = document.element("Truck").ok_or(EpfError::NotVehicle)?;
	let mut file = read_optional(path)?;

	if file.version != VERSION {
		file = EpfFile {
			version: VERSION.to_owned(),
			..EpfFile::default()
		};
	}

	let entry = entry(info);

	if !file.info.contains(&entry) {
		file.info.push(entry);
	}

	let key = file_key(info);
	let mut selectors = 0u32;
	let mut attributes = 0u32;
	let mut collected = SelectorData::new();

	walk_element(
		truck,
		"/Truck",
		&mut |selector: String, element: &Element| {
			// Сокеты и сдвиги переносятся действиями: общие атрибуты затёрли бы
			// структуру аддонов, для которой важен порядок и сдвиги пар.
			if element.name == "Socket" || element.name == "AddonsShift" {
				return;
			}

			if element.attributes.is_empty() {
				return;
			}

			let mut values = AttributeData::new();

			for attribute in &element.attributes {
				let value = element.attr_value(&attribute.name).unwrap_or_default();

				values.insert(attribute.name.clone(), Value::String(value));
			}

			selectors += 1;
			attributes += values.len() as u32;
			collected.insert(selector, values);
		},
	);

	let data = file.data.entry(key.clone()).or_default();

	for (selector, values) in collected {
		data.insert(selector, values);
	}

	let actions_data = collect_actions(document, info);
	let actions = actions_data.len() as u32;

	if actions_data.is_empty() {
		file.actions_data.remove(&key);
	} else {
		file.actions_data.insert(key, actions_data);
	}

	write_file(path, &file)?;

	Ok(EpfExportReport {
		path: path.to_string_lossy().into_owned(),
		selectors,
		attributes,
		actions,
	})
}

/// Импортирует параметры из файла `.epf` в документ.
///
/// Неизвестные узлы пропускаются: файл мог быть создан для другой ревизии
/// игры. Действия только добавляют недостающие краны и прицепы.
pub fn import(
	document: &mut XmlDocument,
	info: &DocumentInfo,
	path: &Path,
) -> Result<EpfImportReport, EpfError> {
	let file = read_file(path)?;

	if file.version != VERSION {
		return Err(EpfError::Version(file.version));
	}

	let entry = entry(info);

	if !file.info.contains(&entry) {
		return Err(EpfError::Missing(file_key(info)));
	}

	let key = file_key(info);
	let mut attributes = 0u32;
	let mut skipped = 0u32;

	if let Some(selectors) = file.data.get(&key) {
		for (selector, values) in selectors {
			let Ok(element) = resolve_mut(document, selector) else {
				skipped += values.len() as u32;

				continue;
			};

			for (name, value) in values {
				let Some(value) = scalar(value) else {
					skipped += 1;

					continue;
				};

				element.set_attr_value(name, value);
				attributes += 1;
			}
		}
	}

	let actions = apply_actions(document, info, file.actions_data.get(&key));

	Ok(EpfImportReport {
		path: path.to_string_lossy().into_owned(),
		attributes,
		actions,
		skipped,
		revision: 0,
		dirty: false,
	})
}

/// Сведения о документе внутри `.epf`.
fn entry(info: &DocumentInfo) -> EpfInfo {
	EpfInfo {
		name: info.name.clone(),
		is_trailer: info.kind == DocumentKind::Trailer,
		dlc: info.dlc.clone(),
		mod_name: info.mod_name.clone(),
	}
}

/// Доп. действия документа: прицепы, краны и «Банан бандита».
fn collect_actions(document: &XmlDocument, info: &DocumentInfo) -> BTreeMap<String, Value> {
	let mut actions_data = BTreeMap::new();

	if info.kind != DocumentKind::Truck {
		return actions_data;
	}

	let scout = actions::has_trailer(document, Trailer::Scout);
	let truck = actions::has_trailer(document, Trailer::Truck);

	if scout || truck {
		actions_data.insert(
			"trailers".to_owned(),
			serde_json::json!({ "hasScoutTrailer": scout, "hasTruckTrailer": truck }),
		);
	}

	let ru = actions::has_crane(document, Crane::Ru);
	let us = actions::has_crane(document, Crane::Us);

	if ru || us {
		actions_data.insert(
			"cranes".to_owned(),
			serde_json::json!({ "hasRUCrane": ru, "hasUSCrane": us }),
		);
	}

	if info.name == BANDIT_TRUCK {
		actions_data.insert(
			"bandit-crane".to_owned(),
			serde_json::json!({ "hasCrane": actions::has_bandit_crane(document) }),
		);
	}

	actions_data
}

/// Применяет доп. действия: только добавление недостающего.
fn apply_actions(
	document: &mut XmlDocument,
	info: &DocumentInfo,
	data: Option<&BTreeMap<String, Value>>,
) -> u32 {
	let Some(data) = data else {
		return 0;
	};

	if info.kind != DocumentKind::Truck {
		return 0;
	}

	let mut applied = 0;

	if let Some(trailers) = data.get("trailers") {
		if flag(trailers, "hasScoutTrailer")
			&& actions::set_trailer(document, Trailer::Scout, true).unwrap_or(false)
		{
			applied += 1;
		}

		if flag(trailers, "hasTruckTrailer")
			&& actions::set_trailer(document, Trailer::Truck, true).unwrap_or(false)
		{
			applied += 1;
		}
	}

	if let Some(cranes) = data.get("cranes") {
		if flag(cranes, "hasRUCrane")
			&& actions::set_crane(document, Crane::Ru, true).unwrap_or(false)
		{
			applied += 1;
		}

		if flag(cranes, "hasUSCrane")
			&& actions::set_crane(document, Crane::Us, true).unwrap_or(false)
		{
			applied += 1;
		}
	}

	if info.name == BANDIT_TRUCK {
		if let Some(bandit) = data.get("bandit-crane") {
			if flag(bandit, "hasCrane")
				&& actions::set_bandit_crane(document, true).unwrap_or(false)
			{
				applied += 1;
			}
		}
	}

	applied
}

/// Логическое поле действия.
fn flag(value: &Value, name: &str) -> bool {
	value.get(name).and_then(Value::as_bool).unwrap_or(false)
}

/// Скалярное значение атрибута: строка, число или логическое.
fn scalar(value: &Value) -> Option<String> {
	match value {
		Value::String(value) => Some(value.clone()),
		Value::Number(value) => Some(value.to_string()),
		Value::Bool(value) => Some(value.to_string()),
		_ => None,
	}
}

/// Читает файл `.epf`; отсутствующий файл даёт пустой совместимый файл.
fn read_optional(path: &Path) -> Result<EpfFile, EpfError> {
	match fs::read(path) {
		Ok(bytes) => Ok(serde_json::from_slice(&bytes)?),
		Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(EpfFile {
			version: VERSION.to_owned(),
			..EpfFile::default()
		}),
		Err(source) => Err(EpfError::Read {
			path: path.to_path_buf(),
			source,
		}),
	}
}

/// Читает существующий файл `.epf`.
fn read_file(path: &Path) -> Result<EpfFile, EpfError> {
	let bytes = fs::read(path).map_err(|source| EpfError::Read {
		path: path.to_path_buf(),
		source,
	})?;

	Ok(serde_json::from_slice(&bytes)?)
}

/// Пишет файл `.epf` атомарно.
fn write_file(path: &Path, file: &EpfFile) -> Result<(), EpfError> {
	let bytes = serde_json::to_vec_pretty(file)?;

	sxmle_storage::fs::write_atomic(path, &bytes).map_err(|source| EpfError::Write {
		path: path.to_path_buf(),
		source,
	})
}

#[cfg(test)]
mod tests;
