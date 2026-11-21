//! Форматированная запись XML по политике [`FormatPolicy`].

use super::entities::{attribute_to_xml, text_to_xml};
use super::model::{Element, Node, XmlDeclaration, XmlDocument};

/// Вид содержимого элемента: от него зависит раскладка.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum ContentKind {
	/// Содержимого нет.
	Empty,
	/// Только значимый текст.
	Text,
	/// Есть разметка (элементы, комментарии, CDATA, PI).
	Mixed,
}

/// Тип перевода строки.
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum LineEnding {
	/// `\r\n` — как в текущем редакторе.
	#[default]
	Crlf,
	/// `\n`.
	Lf,
}

impl LineEnding {
	/// Строковое представление перевода строки.
	pub const fn as_str(self) -> &'static str {
		match self {
			Self::Crlf => "\r\n",
			Self::Lf => "\n",
		}
	}
}

/// Политика форматирования XML.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct FormatPolicy {
	/// Количество пробелов на уровень отступа.
	pub indent: usize,
	/// Тип перевода строки.
	pub line_ending: LineEnding,
	/// Записывать пустые элементы как `<tag />`.
	pub self_closing_empty: bool,
}

impl Default for FormatPolicy {
	fn default() -> Self {
		Self {
			indent: 2,
			line_ending: LineEnding::Crlf,
			self_closing_empty: true,
		}
	}
}

impl XmlDocument {
	/// Записывает документ в форматированном виде.
	///
	/// Отступ задаёт [`FormatPolicy::indent`], элементы разделяются переводом
	/// строки, пустые элементы записываются как `<tag />`. Текст, состоящий
	/// только из пробелов, не выводится. Значения и текст экранируются заново
	/// (сущности декодируются и записываются в канонической форме), поэтому
	/// результат всегда является корректным XML.
	pub fn to_xml_formatted(&self, policy: &FormatPolicy) -> String {
		let mut emitter = Emitter {
			output: String::new(),
			policy,
			first: true,
		};

		if self.bom {
			emitter.output.push('\u{FEFF}');
		}

		if let Some(declaration) = &self.declaration {
			emitter.declaration(declaration);
		}

		for node in &self.prolog {
			emitter.top(node);
		}

		emitter.start_top();
		emitter.element(&self.root, 0);

		for node in &self.epilog {
			emitter.top(node);
		}

		if !self.trailing_text.trim().is_empty() {
			emitter.start_top();
			emitter
				.output
				.push_str(&text_to_xml(self.trailing_text.trim()));
		}

		emitter.output
	}
}

/// Накопитель форматированного текста.
struct Emitter<'a> {
	/// Готовый текст.
	output: String,
	/// Политика форматирования.
	policy: &'a FormatPolicy,
	/// Был ли уже выведен хотя бы один узел верхнего уровня.
	first: bool,
}

impl Emitter<'_> {
	/// Начинает узел верхнего уровня: перевод строки или ничего для первого.
	fn start_top(&mut self) {
		if self.first {
			self.first = false;
		} else {
			self.line(0);
		}
	}

	/// Добавляет перевод строки и отступ уровня.
	fn line(&mut self, level: usize) {
		self.output.push_str(self.policy.line_ending.as_str());

		for _ in 0..level * self.policy.indent {
			self.output.push(' ');
		}
	}

	/// Записывает узел верхнего уровня.
	fn top(&mut self, node: &Node) {
		if let Node::Text(text) = node {
			let trimmed = text.trim();

			if trimmed.is_empty() {
				return;
			}

			self.start_top();
			self.output.push_str(trimmed);

			return;
		}

		self.start_top();
		self.node(node, 0);
	}

	/// Записывает объявление XML.
	fn declaration(&mut self, declaration: &XmlDeclaration) {
		self.start_top();
		self.output.push_str("<?xml");

		for attribute in &declaration.attributes {
			self.attribute(&attribute.name, &attribute.value);
		}

		self.output.push_str("?>");
	}

	/// Записывает пару `имя="значение"` с экранированием.
	fn attribute(&mut self, name: &str, value: &str) {
		self.output.push(' ');
		self.output.push_str(name);
		self.output.push_str("=\"");
		self.output.push_str(&attribute_to_xml(value));
		self.output.push('"');
	}

	/// Записывает узел с отступом уровня.
	fn node(&mut self, node: &Node, level: usize) {
		match node {
			Node::Element(element) => self.element(element, level),
			Node::Text(text) => self.output.push_str(&text_to_xml(text.trim())),
			Node::Comment(text) => {
				self.output.push_str("<!--");
				self.output.push_str(text);
				self.output.push_str("-->");
			}
			Node::CData(text) => {
				self.output.push_str("<![CDATA[");
				self.output.push_str(text);
				self.output.push_str("]]>");
			}
			Node::ProcessingInstruction { target, body } => {
				self.output.push_str("<?");
				self.output.push_str(target);
				self.output.push_str(body);
				self.output.push_str("?>");
			}
			Node::DocType(text) => self.output.push_str(text),
		}
	}

	/// Записывает элемент.
	fn element(&mut self, element: &Element, level: usize) {
		self.output.push('<');
		self.output.push_str(&element.name);

		for attribute in &element.attributes {
			self.attribute(&attribute.name, &attribute.value);
		}

		match content_kind(element) {
			ContentKind::Empty => {
				if self.policy.self_closing_empty {
					self.output.push_str(" />");
				} else {
					self.output.push_str("></");
					self.output.push_str(&element.name);
					self.output.push('>');
				}
			}
			ContentKind::Text => {
				self.output.push('>');

				for child in &element.children {
					if let Node::Text(text) = child {
						self.output.push_str(&text_to_xml(text));
					}
				}

				self.output.push_str("</");
				self.output.push_str(&element.name);
				self.output.push('>');
			}
			ContentKind::Mixed => {
				self.output.push('>');

				for child in &element.children {
					match child {
						Node::Text(text) => {
							let trimmed = text.trim();

							if trimmed.is_empty() {
								continue;
							}

							self.line(level + 1);
							self.output.push_str(&text_to_xml(trimmed));
						}
						other => {
							self.line(level + 1);
							self.node(other, level + 1);
						}
					}
				}

				self.line(level);
				self.output.push_str("</");
				self.output.push_str(&element.name);
				self.output.push('>');
			}
		}
	}
}

/// Определяет вид содержимого элемента.
fn content_kind(element: &Element) -> ContentKind {
	let mut has_text = false;
	let mut has_markup = false;

	for child in &element.children {
		match child {
			Node::Text(text) => has_text |= !text.trim().is_empty(),
			_ => has_markup = true,
		}
	}

	if has_markup {
		ContentKind::Mixed
	} else if has_text {
		ContentKind::Text
	} else {
		ContentKind::Empty
	}
}
