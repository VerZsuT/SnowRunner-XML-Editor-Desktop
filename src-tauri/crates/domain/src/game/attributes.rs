//! Чтение атрибутов элемента: значения, значения по умолчанию, дескрипторы.

use crate::xml::{Element, Node, XmlDocument};

use super::descriptor::{AttrDescriptor, AttrKind};
use super::field::Field;
use super::position::Position;
use super::templates::Templates;
use super::value::{parse_boolean, parse_float, parse_integer, parse_list};

/// Чтение атрибутов элемента с учётом шаблонов `_templates`.
///
/// Путь элемента (`selector`) — стабильный адрес узла в документе: интерфейс
/// передаёт его обратно в команды мутации.
pub struct AttrReader<'a> {
	/// Элемент документа.
	pub element: &'a Element,
	/// Путь элемента в документе, например `/Truck/TruckData`.
	pub selector: String,
	/// Предки элемента от корня к родителю.
	pub ancestors: Vec<&'a Element>,
	/// Шаблоны документа.
	pub templates: Option<&'a Templates>,
}

impl<'a> AttrReader<'a> {
	/// Создаёт читатель для элемента.
	pub fn new(
		element: &'a Element,
		selector: impl Into<String>,
		ancestors: Vec<&'a Element>,
		templates: Option<&'a Templates>,
	) -> Self {
		Self {
			element,
			selector: selector.into(),
			ancestors,
			templates,
		}
	}

	/// Создаёт читатель для корневого элемента документа.
	pub fn root(element: &'a Element, templates: Option<&'a Templates>) -> Self {
		Self::new(element, format!("/{}", element.name), Vec::new(), templates)
	}

	/// Читатель дочернего элемента.
	pub fn child(&self, name: &str) -> Option<Self> {
		let element = self.element.child(name)?;

		Some(self.nested(element, name))
	}

	/// Читатели всех дочерних элементов с указанным именем.
	pub fn children(&self, name: &str) -> Vec<Self> {
		let mut result = Vec::new();
		let mut index = 0;

		for node in &self.element.children {
			let Node::Element(element) = node else {
				continue;
			};

			if element.name == name {
				result.push(self.nested(element, &format!("{name}[{index}]")));
				index += 1;
			}
		}

		result
	}

	/// Предки для дочернего элемента: предки текущего плюс сам элемент.
	pub fn child_ancestors(&self) -> Vec<&'a Element> {
		let mut ancestors = self.ancestors.clone();

		ancestors.push(self.element);

		ancestors
	}

	/// Сырое (декодированное) значение атрибута: из элемента или из шаблона.
	///
	/// Пустое значение равнозначно отсутствию — как в текущей модели.
	pub fn raw(&self, name: &str) -> Option<String> {
		if let Some(value) = self.element.attr_value(name) {
			return (!value.is_empty()).then_some(value);
		}

		self.templates?
			.get_value(&self.ancestors, self.element, name)
			.filter(|value| !value.is_empty())
	}

	/// Строковый атрибут.
	pub fn string(&self, name: &str, default: Option<&str>) -> Field<String> {
		Field::new(
			self.raw(name),
			default.map(str::to_owned),
			self.descriptor(name, AttrKind::String),
		)
	}

	/// Целочисленный атрибут.
	pub fn integer(&self, name: &str, default: Option<i32>) -> Field<i32> {
		let value = self
			.raw(name)
			.and_then(|raw| parse_integer(&raw))
			.and_then(|value| i32::try_from(value).ok());

		Field::new(value, default, self.descriptor(name, AttrKind::Integer))
	}

	/// Атрибут с плавающей точкой.
	pub fn float(&self, name: &str, default: Option<f64>) -> Field<f64> {
		let value = self.raw(name).and_then(|raw| parse_float(&raw));

		Field::new(value, default, self.descriptor(name, AttrKind::Float))
	}

	/// Логический атрибут.
	pub fn boolean(&self, name: &str, default: Option<bool>) -> Field<bool> {
		let value = self.raw(name).map(|raw| parse_boolean(&raw));

		Field::new(value, default, self.descriptor(name, AttrKind::Boolean))
	}

	/// Атрибут со списком строк через запятую.
	pub fn string_array(&self, name: &str, default: Option<Vec<String>>) -> Field<Vec<String>> {
		let value = self.raw(name).map(|raw| parse_list(&raw));
		let value = value.filter(|items| !items.is_empty());

		Field::new(value, default, self.descriptor(name, AttrKind::StringArray))
	}

	/// Атрибут с позицией.
	pub fn position(&self, name: &str, default: Option<Position>) -> Field<Position> {
		let value = self.raw(name).map(|raw| Position::parse(&raw));

		Field::new(value, default, self.descriptor(name, AttrKind::Position))
	}

	/// Дескриптор атрибута элемента.
	pub fn descriptor(&self, name: &str, attr_type: AttrKind) -> AttrDescriptor {
		AttrDescriptor::new(name, attr_type).selector(self.selector.clone())
	}

	/// Читатель вложенного элемента с именем в пути.
	fn nested(&self, element: &'a Element, name: &str) -> Self {
		Self::new(
			element,
			format!("{}/{name}", self.selector),
			self.child_ancestors(),
			self.templates,
		)
	}
}

/// Читатели однотипных элементов файла: элемент на верхнем уровне или внутри
/// контейнера `<container>` (например, `Engine` внутри `EngineVariants`).
///
/// Селекторы стабильны: `/Engine` для верхнего уровня и
/// `/EngineVariants/Engine[0]` для элементов контейнера.
pub fn variant_readers<'a>(
	document: &'a XmlDocument,
	tag: &'a str,
	container: &str,
	templates: Option<&'a Templates>,
) -> Vec<AttrReader<'a>> {
	let mut result = Vec::new();

	for element in document.elements() {
		if element.name == tag {
			result.push(AttrReader::root(element, templates));
		} else if element.name == container {
			for (index, child) in element.children_named(tag).enumerate() {
				let selector = format!("/{container}/{tag}[{index}]");

				result.push(AttrReader::new(child, selector, vec![element], templates));
			}
		}
	}

	result
}
