//! Точная запись XML-дерева: байт-в-байт как в исходнике.

use super::XmlError;
use super::format::FormatPolicy;
use super::model::{Attribute, Element, Node, XmlDeclaration, XmlDocument};

impl XmlDocument {
	/// Записывает документ без изменения разметки в исходной кодировке.
	pub fn to_bytes(&self) -> Result<Vec<u8>, XmlError> {
		self.encoding.encode(&self.to_xml())
	}

	/// Записывает документ в форматированном виде в исходной кодировке.
	pub fn to_bytes_formatted(&self, policy: &FormatPolicy) -> Result<Vec<u8>, XmlError> {
		self.encoding.encode(&self.to_xml_formatted(policy))
	}

	/// Записывает документ без изменения разметки.
	///
	/// Сохраняются BOM, объявление, порядок и кавычки атрибутов, пробелы внутри
	/// тегов, комментарии, CDATA, инструкции обработки, doctype и хвостовой текст.
	pub fn to_xml(&self) -> String {
		let mut output = String::new();

		if self.bom {
			output.push('\u{FEFF}');
		}

		if let Some(declaration) = &self.declaration {
			write_declaration(&mut output, declaration);
		}

		for node in &self.prolog {
			write_node(&mut output, node);
		}

		write_element(&mut output, &self.root);

		for node in &self.epilog {
			write_node(&mut output, node);
		}

		output.push_str(&self.trailing_text);
		output
	}
}

/// Записывает объявление XML.
fn write_declaration(output: &mut String, declaration: &XmlDeclaration) {
	output.push_str("<?xml");
	write_attributes(output, &declaration.attributes, &declaration.tail_spacing);
	output.push_str("?>");
}

/// Записывает атрибуты и пробелы перед `>`/`/>`.
fn write_attributes(output: &mut String, attributes: &[Attribute], tail_spacing: &str) {
	for attribute in attributes {
		output.push_str(&attribute.leading);
		output.push_str(&attribute.name);
		output.push_str(&attribute.before_eq);
		output.push('=');
		output.push_str(&attribute.after_eq);
		output.push(attribute.quote.as_char());
		output.push_str(&attribute.value);
		output.push(attribute.quote.as_char());
	}

	output.push_str(tail_spacing);
}

/// Записывает элемент.
fn write_element(output: &mut String, element: &Element) {
	output.push('<');
	output.push_str(&element.name);
	write_attributes(output, &element.attributes, &element.tail_spacing);

	if element.self_closing {
		output.push_str("/>");

		return;
	}

	output.push('>');

	for node in &element.children {
		write_node(output, node);
	}

	output.push_str("</");
	output.push_str(&element.name);
	output.push_str(&element.end_spacing);
	output.push('>');
}

/// Записывает узел.
fn write_node(output: &mut String, node: &Node) {
	match node {
		Node::Element(element) => write_element(output, element),
		Node::Text(text) => output.push_str(text),
		Node::Comment(text) => {
			output.push_str("<!--");
			output.push_str(text);
			output.push_str("-->");
		}
		Node::CData(text) => {
			output.push_str("<![CDATA[");
			output.push_str(text);
			output.push_str("]]>");
		}
		Node::ProcessingInstruction { target, body } => {
			output.push_str("<?");
			output.push_str(target);
			output.push_str(body);
			output.push_str("?>");
		}
		Node::DocType(text) => output.push_str(text),
	}
}
