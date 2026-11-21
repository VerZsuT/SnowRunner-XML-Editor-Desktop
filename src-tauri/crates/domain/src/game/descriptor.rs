//! Дескрипторы атрибутов: метаданные поля для интерфейса.
//!
//! Дескриптор — единственный источник правды о поле: имя XML-атрибута, путь
//! элемента в документе, тип, ограничение, шаг, цветовые зоны, варианты выбора
//! и ключи локализации.

use serde::Serialize;
use specta::Type;

use super::limit::Limit;

/// Тип значения атрибута.
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum AttrKind {
	/// Строка.
	#[default]
	String,
	/// Целое число.
	Integer,
	/// Число с плавающей точкой.
	Float,
	/// Логическое значение.
	Boolean,
	/// Список строк через запятую.
	StringArray,
	/// Позиция `(x; y; z)`.
	Position,
}

impl AttrKind {
	/// Числовой ли тип: для него применяется [`Limit`].
	pub const fn is_numeric(self) -> bool {
		matches!(self, Self::Integer | Self::Float)
	}
}

/// Цветовая зона числового поля.
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct InputArea {
	/// Начало зоны.
	pub start: f64,
	/// Конец зоны; `None` — зона без верхней границы.
	pub end: Option<f64>,
}

impl InputArea {
	/// Создаёт зону `[start; end]`.
	pub const fn new(start: f64, end: f64) -> Self {
		Self {
			start,
			end: Some(end),
		}
	}

	/// Создаёт зону без верхней границы: `[start; +∞)`.
	pub const fn open(start: f64) -> Self {
		Self { start, end: None }
	}
}

/// Цветовые зоны поля ввода.
#[derive(Debug, Clone, Default, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct InputAreas {
	/// Красная зона.
	pub red: Option<Vec<InputArea>>,
	/// Жёлтая зона.
	pub yellow: Option<Vec<InputArea>>,
	/// Зелёная зона.
	pub green: Option<Vec<InputArea>>,
}

/// Дескриптор атрибута.
#[derive(Debug, Clone, Default, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct AttrDescriptor {
	/// Имя XML-атрибута.
	pub name: String,
	/// Стабильный путь элемента в документе (например `/Truck/TruckData`).
	pub selector: String,
	/// Тип значения.
	pub attr_type: AttrKind,
	/// Ключ локализации заголовка.
	pub label: Option<String>,
	/// Ключ локализации описания.
	pub desc: Option<String>,
	/// Ограничение числового значения.
	pub limit: Option<Limit>,
	/// Шаг изменения.
	pub step: Option<f64>,
	/// Цветовые зоны.
	pub areas: Option<InputAreas>,
	/// Допустимые значения enum-поля.
	pub options: Option<Vec<String>>,
}

impl AttrDescriptor {
	/// Создаёт дескриптор без дополнительных параметров.
	pub fn new(name: impl Into<String>, attr_type: AttrKind) -> Self {
		Self {
			name: name.into(),
			attr_type,
			..Self::default()
		}
	}

	/// Указывает путь элемента.
	pub fn selector(mut self, selector: impl Into<String>) -> Self {
		self.selector = selector.into();

		self
	}

	/// Указывает ключ заголовка.
	pub fn label(mut self, label: impl Into<String>) -> Self {
		self.label = Some(label.into());

		self
	}

	/// Указывает ключ описания.
	pub fn desc(mut self, desc: impl Into<String>) -> Self {
		self.desc = Some(desc.into());

		self
	}

	/// Указывает ограничение.
	pub fn limit(mut self, limit: Limit) -> Self {
		self.limit = Some(limit);

		self
	}

	/// Указывает шаг изменения.
	pub fn step(mut self, step: f64) -> Self {
		self.step = Some(step);

		self
	}

	/// Указывает допустимые значения.
	pub fn options<I, S>(mut self, options: I) -> Self
	where
		I: IntoIterator<Item = S>,
		S: Into<String>,
	{
		self.options = Some(options.into_iter().map(Into::into).collect());

		self
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn сериализует_в_camel_case() {
		let descriptor = AttrDescriptor::new("Price", AttrKind::Integer)
			.selector("/Truck/GameData")
			.label("gameData.price")
			.limit(Limit::positive());

		let json = serde_json::to_value(&descriptor).unwrap();

		assert_eq!(json["attrType"], "integer");
		assert_eq!(json["selector"], "/Truck/GameData");
		assert_eq!(json["label"], "gameData.price");
		assert_eq!(json["limit"]["min"], 0.0);
		assert_eq!(json["desc"], serde_json::Value::Null);
	}

	#[test]
	fn тип_числовой() {
		assert!(AttrKind::Integer.is_numeric());
		assert!(AttrKind::Float.is_numeric());
		assert!(!AttrKind::String.is_numeric());
		assert!(!AttrKind::Position.is_numeric());
	}
}
