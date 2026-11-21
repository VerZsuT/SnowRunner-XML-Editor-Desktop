//! Поле значения: значение, значение по умолчанию и дескриптор.

use serde::Serialize;
use specta::Type;

use super::descriptor::{AttrDescriptor, InputAreas};
use super::limit::Limit;

/// Поле атрибута для интерфейса.
///
/// `value` — значение из документа; если атрибута нет, но он объявлен
/// в шаблоне `_templates`, `value` берётся из шаблона (как в текущей модели).
/// `default_value` — объявленное в модели значение по умолчанию; интерфейс
/// показывает его, когда `value` пусто, и использует при сбросе.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Field<T> {
	/// Значение из документа.
	pub value: Option<T>,
	/// Значение по умолчанию: из шаблона или объявленное в модели.
	pub default_value: Option<T>,
	/// Дескриптор атрибута.
	pub descriptor: AttrDescriptor,
}

impl<T> Field<T> {
	/// Создаёт поле.
	pub const fn new(
		value: Option<T>,
		default_value: Option<T>,
		descriptor: AttrDescriptor,
	) -> Self {
		Self {
			value,
			default_value,
			descriptor,
		}
	}

	/// Поле без значения по умолчанию.
	pub fn empty(descriptor: AttrDescriptor) -> Self {
		Self::new(None, None, descriptor)
	}

	/// Поле с значением из документа.
	pub fn value(value: T, descriptor: AttrDescriptor) -> Self {
		Self::new(Some(value), None, descriptor)
	}

	/// Отображаемое значение: значение из документа или значение по умолчанию.
	pub fn resolved(&self) -> Option<&T> {
		self.value.as_ref().or(self.default_value.as_ref())
	}

	/// Указывает ключ локализации заголовка.
	pub fn label(mut self, label: impl Into<String>) -> Self {
		self.descriptor.label = Some(label.into());

		self
	}

	/// Указывает ключ локализации описания.
	pub fn desc(mut self, desc: impl Into<String>) -> Self {
		self.descriptor.desc = Some(desc.into());

		self
	}

	/// Указывает ограничение значения.
	pub fn limit(mut self, limit: Limit) -> Self {
		self.descriptor.limit = Some(limit);

		self
	}

	/// Указывает шаг изменения.
	pub fn step(mut self, step: f64) -> Self {
		self.descriptor.step = Some(step);

		self
	}

	/// Указывает цветовые зоны.
	pub fn areas(mut self, areas: InputAreas) -> Self {
		self.descriptor.areas = Some(areas);

		self
	}

	/// Указывает допустимые значения enum-поля.
	pub fn options<I, S>(mut self, options: I) -> Self
	where
		I: IntoIterator<Item = S>,
		S: Into<String>,
	{
		self.descriptor.options = Some(options.into_iter().map(Into::into).collect());

		self
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::game::descriptor::AttrKind;

	#[test]
	fn сериализует_поле() {
		let descriptor = AttrDescriptor::new("Price", AttrKind::Integer);
		let field = Field::new(Some(100_i64), Some(0_i64), descriptor);
		let json = serde_json::to_value(&field).unwrap();

		assert_eq!(json["value"], 100);
		assert_eq!(json["defaultValue"], 0);
		assert_eq!(json["descriptor"]["name"], "Price");
	}

	#[test]
	fn пустое_поле_отдаёт_значение_по_умолчанию() {
		let descriptor = AttrDescriptor::new("Price", AttrKind::Integer);
		let field: Field<i64> = Field::new(None, Some(7), descriptor);

		assert_eq!(field.resolved(), Some(&7));
	}
}
