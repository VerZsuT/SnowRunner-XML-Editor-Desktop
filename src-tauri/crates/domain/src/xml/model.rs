//! Модель XML-документа с сохранением исходной разметки.

use super::encoding::DocumentEncoding;
use super::entities::{decode_entities, escape_attribute};

/// Кавычка, которой было заключено значение атрибута в исходнике.
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum Quote {
	/// Двойная кавычка `"`.
	#[default]
	Double,
	/// Одинарная кавычка `'`.
	Single,
}

impl Quote {
	/// Символ кавычки.
	pub const fn as_char(self) -> char {
		match self {
			Self::Double => '"',
			Self::Single => '\'',
		}
	}

	/// Байт кавычки.
	pub const fn as_byte(self) -> u8 {
		match self {
			Self::Double => b'"',
			Self::Single => b'\'',
		}
	}
}

/// Атрибут элемента.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Attribute {
	/// Имя атрибута.
	pub name: String,
	/// Сырое значение: сущности не декодированы.
	pub value: String,
	/// Кавычка исходника (нужна для точной записи).
	pub quote: Quote,
	/// Пробелы перед атрибутом в исходнике (нужны для точной записи).
	pub leading: String,
	/// Пробелы между именем и `=` в исходнике (нужны для точной записи).
	pub before_eq: String,
	/// Пробелы между `=` и кавычкой в исходнике (нужны для точной записи).
	pub after_eq: String,
}

impl Attribute {
	/// Создаёт атрибут в каноническом виде: `name="value"`.
	pub fn new(name: impl Into<String>, value: impl Into<String>) -> Self {
		Self {
			name: name.into(),
			value: value.into(),
			quote: Quote::Double,
			leading: " ".to_owned(),
			before_eq: String::new(),
			after_eq: String::new(),
		}
	}
}

/// Узел дерева.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Node {
	/// Элемент.
	Element(Element),
	/// Текстовый узел: сырой текст, сущности не декодированы.
	Text(String),
	/// Комментарий: содержимое между `<!--` и `-->`.
	Comment(String),
	/// Секция CDATA: содержимое между `<![CDATA[` и `]]>`.
	CData(String),
	/// Инструкция обработки: цель и тело (всё после цели, включая пробелы).
	ProcessingInstruction {
		/// Цель инструкции.
		target: String,
		/// Тело инструкции: остаток исходника после цели.
		body: String,
	},
	/// Объявление doctype целиком, вместе с `<!DOCTYPE` и закрывающим `>`.
	DocType(String),
}

/// XML-элемент.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Element {
	/// Имя элемента.
	pub name: String,
	/// Атрибуты в порядке исходника.
	pub attributes: Vec<Attribute>,
	/// Дочерние узлы в порядке исходника.
	pub children: Vec<Node>,
	/// Признак самозакрывающегося тега: `<a/>`.
	pub self_closing: bool,
	/// Пробелы между атрибутами и `>`/`/>` в исходнике.
	pub tail_spacing: String,
	/// Пробелы между именем и `>` в закрывающем теге в исходнике.
	pub end_spacing: String,
}

impl Element {
	/// Создаёт пустой элемент `<name></name>` без атрибутов.
	pub fn new(name: impl Into<String>) -> Self {
		Self {
			name: name.into(),
			attributes: Vec::new(),
			children: Vec::new(),
			self_closing: false,
			tail_spacing: String::new(),
			end_spacing: String::new(),
		}
	}

	/// Значение атрибута по имени (сырое, с сущностями).
	pub fn attr(&self, name: &str) -> Option<&str> {
		self.attributes
			.iter()
			.find(|attribute| attribute.name == name)
			.map(|attribute| attribute.value.as_str())
	}

	/// Логическое значение атрибута: сущности декодированы.
	///
	/// Значение `A &amp; B` в файле вернётся как `A & B`.
	pub fn attr_value(&self, name: &str) -> Option<String> {
		self.attr(name).map(decode_entities)
	}

	/// Устанавливает атрибут по логическому значению, экранируя его для XML.
	pub fn set_attr_value(&mut self, name: &str, value: impl AsRef<str>) {
		self.set_attr(name, escape_attribute(value.as_ref()));
	}

	/// Удаляет атрибут по имени и возвращает его логическое значение.
	pub fn remove_attr_value(&mut self, name: &str) -> Option<String> {
		self.remove_attr(name).map(|value| decode_entities(&value))
	}

	/// Устанавливает атрибут: существующий заменяется, новый добавляется в конец.
	///
	/// Значение хранится как есть (сырым): если в нём есть `&`, `<` или `"`,
	/// их нужно экранировать так, как они должны выглядеть в XML.
	pub fn set_attr(&mut self, name: &str, value: impl Into<String>) {
		let value = value.into();

		if let Some(attribute) = self
			.attributes
			.iter_mut()
			.find(|attribute| attribute.name == name)
		{
			attribute.value = value;
		} else {
			self.attributes.push(Attribute::new(name, value));
		}
	}

	/// Удаляет атрибут и возвращает его значение.
	pub fn remove_attr(&mut self, name: &str) -> Option<String> {
		let index = self
			.attributes
			.iter()
			.position(|attribute| attribute.name == name)?;

		Some(self.attributes.remove(index).value)
	}

	/// Первый дочерний элемент с указанным именем.
	pub fn child(&self, name: &str) -> Option<&Element> {
		self.children.iter().find_map(|node| match node {
			Node::Element(element) if element.name == name => Some(element),
			_ => None,
		})
	}

	/// Первый дочерний элемент с указанным именем для изменения.
	pub fn child_mut(&mut self, name: &str) -> Option<&mut Element> {
		self.children.iter_mut().find_map(|node| match node {
			Node::Element(element) if element.name == name => Some(element),
			_ => None,
		})
	}

	/// Итератор по дочерним элементам с указанным именем.
	pub fn children_named<'a>(&'a self, name: &'a str) -> impl Iterator<Item = &'a Element> + 'a {
		self.children.iter().filter_map(move |node| match node {
			Node::Element(element) if element.name == name => Some(element),
			_ => None,
		})
	}

	/// Добавляет дочерний элемент в конец.
	pub fn append_child(&mut self, child: Element) {
		self.self_closing = false;
		self.children.push(Node::Element(child));
	}

	/// Удаляет дочерний узел по индексу.
	pub fn remove_child(&mut self, index: usize) -> Option<Node> {
		if index >= self.children.len() {
			return None;
		}

		Some(self.children.remove(index))
	}

	/// Склеивает прямой текст элемента без декодирования сущностей.
	pub fn text(&self) -> String {
		let mut text = String::new();

		for child in &self.children {
			if let Node::Text(value) = child {
				text.push_str(value);
			}
		}

		text
	}

	/// Логический текст элемента: сущности декодированы.
	pub fn text_value(&self) -> String {
		decode_entities(&self.text())
	}
}

/// Объявление XML (`<?xml ... ?>`).
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct XmlDeclaration {
	/// Атрибуты объявления в порядке исходника.
	pub attributes: Vec<Attribute>,
	/// Пробелы между последним атрибутом и `?>`.
	pub tail_spacing: String,
}

impl XmlDeclaration {
	/// Создаёт объявление `<?xml version="1.0"?>`.
	pub fn new() -> Self {
		Self::default()
	}
}

impl Default for XmlDeclaration {
	fn default() -> Self {
		Self {
			attributes: vec![Attribute::new("version", "1.0")],
			tail_spacing: String::new(),
		}
	}
}

/// XML-документ или XML-фрагмент.
///
/// Файлы игры содержат несколько корневых элементов (например `_templates`
/// и `Truck`). Первый элемент хранится в [`XmlDocument::root`], остальные —
/// в [`XmlDocument::epilog`].
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct XmlDocument {
	/// Кодировка исходного файла: в ней же документ записывается обратно.
	pub encoding: DocumentEncoding,
	/// Признак BOM (U+FEFF) в начале файла.
	pub bom: bool,
	/// Объявление XML, если оно есть.
	pub declaration: Option<XmlDeclaration>,
	/// Узлы до первого корневого элемента.
	pub prolog: Vec<Node>,
	/// Первый корневой элемент.
	pub root: Element,
	/// Узлы после первого корневого элемента.
	pub epilog: Vec<Node>,
	/// Текст в самом конце документа (обычно `"\r\n"`).
	pub trailing_text: String,
}

impl XmlDocument {
	/// Создаёт документ из одного корневого элемента.
	pub fn new(root: Element) -> Self {
		Self {
			encoding: DocumentEncoding::Utf8,
			bom: false,
			declaration: None,
			prolog: Vec::new(),
			root,
			epilog: Vec::new(),
			trailing_text: String::new(),
		}
	}

	/// Итератор по элементам верхнего уровня в порядке документа.
	///
	/// Учитывает `root` и элементы из `epilog`: файлы игры — фрагменты, где
	/// после `_templates` идёт основной элемент (например `Truck`).
	pub fn elements(&self) -> impl Iterator<Item = &Element> {
		std::iter::once(&self.root).chain(self.epilog.iter().filter_map(|node| match node {
			Node::Element(element) => Some(element),
			_ => None,
		}))
	}

	/// Первый элемент верхнего уровня с указанным именем.
	pub fn element(&self, name: &str) -> Option<&Element> {
		self.elements().find(|element| element.name == name)
	}

	/// Первый элемент верхнего уровня с указанным именем для изменения.
	pub fn element_mut(&mut self, name: &str) -> Option<&mut Element> {
		if self.root.name == name {
			return Some(&mut self.root);
		}

		self.epilog.iter_mut().find_map(|node| match node {
			Node::Element(element) if element.name == name => Some(element),
			_ => None,
		})
	}
}
