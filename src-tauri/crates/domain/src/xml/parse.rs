//! Разбор XML в собственное дерево с сохранением разметки.

use quick_xml::Reader;
use quick_xml::errors::Error as QuickError;
use quick_xml::events::{BytesStart, Event};

use super::XmlError;
use super::encoding;
use super::encoding::DocumentEncoding;
use super::model::{Attribute, Element, Node, Quote, XmlDeclaration, XmlDocument};

/// Предел вложенности элементов: защищает рекурсивную запись и обход дерева
/// от переполнения стека на повреждённом или вредоносном файле.
const MAX_DEPTH: usize = 512;

/// Разбирает XML-строку.
pub fn parse(input: &str) -> Result<XmlDocument, XmlError> {
	parse_impl(input, false)
}

/// Разбирает XML из байтов файла, определяя кодировку по BOM и объявлению.
///
/// Документ запоминает кодировку и BOM: `to_bytes` пишет его обратно в них же.
pub fn parse_bytes(input: &[u8]) -> Result<XmlDocument, XmlError> {
	let sniffed = encoding::sniff(input)?;
	let text = sniffed.encoding.decode(sniffed.body)?;
	let mut document = parse_impl(&text, sniffed.bom_len > 0)?;

	document.encoding = sniffed.encoding;

	if let Some(declaration) = &document.declaration
		&& let Some(attribute) = declaration
			.attributes
			.iter()
			.find(|attribute| attribute.name == "encoding")
	{
		encoding::check_declared(&attribute.value, sniffed.encoding)?;
	}

	Ok(document)
}

/// Общая реализация разбора.
fn parse_impl(input: &str, bom: bool) -> Result<XmlDocument, XmlError> {
	let (text, bom) = match input.strip_prefix('\u{FEFF}') {
		Some(text) => (text, true),
		None => (input, bom),
	};
	let offset = if bom { 3 } else { 0 };
	let mut reader = Reader::from_str(text);

	{
		let config = reader.config_mut();
		// Закрывающие теги проверяем сами: так сохраняется исходное `</a >`.
		config.check_end_names = false;
		config.trim_markup_names_in_closing_tags = false;
		// Одиночный `&` не должен ломать чтение: дерево хранит сырой текст.
		config.allow_dangling_amp = true;
	}

	let mut top: Vec<Node> = Vec::new();
	let mut stack: Vec<Element> = Vec::new();
	let mut declaration: Option<XmlDeclaration> = None;
	let mut any_node = false;

	loop {
		let event = reader
			.read_event()
			.map_err(|error| map_reader_error(error, reader.error_position(), offset))?;

		match event {
			Event::Start(start) => {
				if stack.len() >= MAX_DEPTH {
					return Err(XmlError::syntax(
						"слишком глубокая вложенность элементов",
						offset + reader.buffer_position() as usize,
					));
				}

				any_node = true;
				let element = element_from_start(&start, false, reader.buffer_position(), offset)?;

				stack.push(element);
			}
			Event::Empty(start) => {
				any_node = true;
				let element = element_from_start(&start, true, reader.buffer_position(), offset)?;

				attach(&mut top, &mut stack, Node::Element(element));
			}
			Event::End(end) => {
				let raw: &str = &end;
				let name = raw.trim_end_matches(is_xml_space);
				let end_spacing = raw[name.len()..].to_owned();
				let position = offset + reader.buffer_position() as usize;
				let mut element = stack.pop().ok_or_else(|| {
					XmlError::syntax("закрывающий тег без открывающего", position)
				})?;

				if element.name != name {
					return Err(XmlError::syntax(
						format!("ожидался `</{}>`, найден `</{}>`", element.name, name),
						position,
					));
				}

				element.end_spacing = end_spacing;
				attach(&mut top, &mut stack, Node::Element(element));
			}
			Event::Text(text) => {
				let raw: &str = &text;

				if stack.is_empty() && !raw.trim().is_empty() {
					return Err(XmlError::syntax(
						"текст вне корневого элемента",
						offset + reader.buffer_position() as usize,
					));
				}

				any_node = true;
				push_text(&mut top, &mut stack, raw);
			}
			Event::GeneralRef(reference) => {
				let raw: &str = &reference;
				let text = format!("&{raw};");

				if stack.is_empty() {
					return Err(XmlError::syntax(
						"ссылка на сущность вне корневого элемента",
						offset + reader.buffer_position() as usize,
					));
				}

				any_node = true;
				push_text(&mut top, &mut stack, &text);
			}
			Event::Comment(comment) => {
				any_node = true;
				let raw: &str = &comment;

				attach(&mut top, &mut stack, Node::Comment(raw.to_owned()));
			}
			Event::CData(data) => {
				any_node = true;
				let raw: &str = &data;

				attach(&mut top, &mut stack, Node::CData(raw.to_owned()));
			}
			Event::PI(instruction) => {
				any_node = true;

				attach(
					&mut top,
					&mut stack,
					Node::ProcessingInstruction {
						target: instruction.target().to_owned(),
						body: instruction.content().to_owned(),
					},
				);
			}
			Event::Decl(declaration_event) => {
				let raw: &str = &declaration_event;

				if !any_node && stack.is_empty() && top.is_empty() && declaration.is_none() {
					let content = raw.strip_prefix("xml").unwrap_or(raw);
					let position = offset + reader.buffer_position() as usize;
					let (attributes, tail_spacing) = parse_attributes(content, position)?;

					declaration = Some(XmlDeclaration {
						attributes,
						tail_spacing,
					});
				} else {
					// Объявление не в начале документа: сохраняем как инструкцию.
					let body = raw.strip_prefix("xml").unwrap_or(raw);

					attach(
						&mut top,
						&mut stack,
						Node::ProcessingInstruction {
							target: "xml".to_owned(),
							body: body.to_owned(),
						},
					);
				}

				any_node = true;
			}
			Event::DocType(doctype) => {
				any_node = true;
				let raw: &str = &doctype;

				attach(
					&mut top,
					&mut stack,
					Node::DocType(format!("<!DOCTYPE {raw}>")),
				);
			}
			Event::Eof => break,
		}
	}

	if !stack.is_empty() {
		return Err(XmlError::UnexpectedEof);
	}

	finish(top, declaration, bom, text)
}

/// Собирает документ из узлов верхнего уровня.
fn finish(
	mut top: Vec<Node>,
	declaration: Option<XmlDeclaration>,
	bom: bool,
	text: &str,
) -> Result<XmlDocument, XmlError> {
	let root_index = top
		.iter()
		.position(|node| matches!(node, Node::Element(_)))
		.ok_or_else(|| XmlError::syntax("корневой элемент не найден", text.len()))?;
	let rest = top.split_off(root_index);
	let mut rest_iter = rest.into_iter();
	let root = match rest_iter.next() {
		Some(Node::Element(element)) => element,
		_ => return Err(XmlError::syntax("корневой элемент не найден", text.len())),
	};
	let mut epilog: Vec<Node> = rest_iter.collect();
	let prolog = top;
	let trailing_text = if matches!(epilog.last(), Some(Node::Text(_))) {
		match epilog.pop() {
			Some(Node::Text(value)) => value,
			_ => String::new(),
		}
	} else {
		String::new()
	};

	Ok(XmlDocument {
		encoding: DocumentEncoding::Utf8,
		bom,
		declaration,
		prolog,
		root,
		epilog,
		trailing_text,
	})
}

/// Создаёт элемент по событию открывающего или пустого тега.
fn element_from_start(
	start: &BytesStart<'_>,
	self_closing: bool,
	position: u64,
	offset: usize,
) -> Result<Element, XmlError> {
	let name = start.name().0.to_owned();

	if name.is_empty() {
		return Err(XmlError::syntax(
			"пустое имя тега",
			offset + position as usize,
		));
	}

	let (attributes, tail_spacing) =
		parse_attributes(start.attributes_raw(), offset + position as usize)?;
	let mut element = Element::new(name);

	element.attributes = attributes;
	element.tail_spacing = tail_spacing;
	element.self_closing = self_closing;

	Ok(element)
}

/// Присоединяет узел к текущему открытому элементу или к верхнему уровню.
fn attach(top: &mut Vec<Node>, stack: &mut [Element], node: Node) {
	if let Some(parent) = stack.last_mut() {
		parent.children.push(node);
	} else {
		top.push(node);
	}
}

/// Добавляет текст, склеивая соседние текстовые узлы.
fn push_text(top: &mut Vec<Node>, stack: &mut [Element], text: &str) {
	if text.is_empty() {
		return;
	}

	if let Some(parent) = stack.last_mut() {
		append_text(&mut parent.children, text);
	} else {
		append_text(top, text);
	}
}

/// Добавляет текст в конец списка узлов.
fn append_text(nodes: &mut Vec<Node>, text: &str) {
	if let Some(Node::Text(existing)) = nodes.last_mut() {
		existing.push_str(text);
	} else {
		nodes.push(Node::Text(text.to_owned()));
	}
}

/// Разбирает сырую часть тега после имени: атрибуты и пробелы перед `>`.
fn parse_attributes(raw: &str, position: usize) -> Result<(Vec<Attribute>, String), XmlError> {
	let bytes = raw.as_bytes();
	let mut attributes = Vec::new();
	let mut index = 0;

	loop {
		let whitespace_start = index;

		while index < bytes.len() && is_xml_space_byte(bytes[index]) {
			index += 1;
		}

		let leading = &raw[whitespace_start..index];

		if index == bytes.len() {
			return Ok((attributes, leading.to_owned()));
		}

		if leading.is_empty() {
			return Err(XmlError::syntax(
				"атрибут должен отделяться от предыдущего пробелом",
				position + index,
			));
		}

		let name_start = index;

		while index < bytes.len() && !is_xml_space_byte(bytes[index]) && bytes[index] != b'=' {
			index += 1;
		}

		if index == name_start {
			return Err(XmlError::syntax("ожидается имя атрибута", position + index));
		}

		let name = &raw[name_start..index];

		if name
			.bytes()
			.any(|byte| matches!(byte, b'"' | b'\'' | b'<' | b'>' | b'&' | b'/'))
		{
			return Err(XmlError::syntax(
				format!("некорректное имя атрибута `{name}`"),
				position + name_start,
			));
		}

		let before_eq_start = index;

		while index < bytes.len() && is_xml_space_byte(bytes[index]) {
			index += 1;
		}

		let before_eq = &raw[before_eq_start..index];

		if index == bytes.len() || bytes[index] != b'=' {
			return Err(XmlError::syntax(
				format!("у атрибута `{name}` отсутствует `=`"),
				position + index,
			));
		}

		index += 1;
		let after_eq_start = index;

		while index < bytes.len() && is_xml_space_byte(bytes[index]) {
			index += 1;
		}

		let after_eq = &raw[after_eq_start..index];

		if index == bytes.len() {
			return Err(XmlError::syntax(
				format!("у атрибута `{name}` отсутствует значение"),
				position + index,
			));
		}

		let quote = match bytes[index] {
			b'"' => Quote::Double,
			b'\'' => Quote::Single,
			_ => {
				return Err(XmlError::syntax(
					format!("значение атрибута `{name}` должно быть в кавычках"),
					position + index,
				));
			}
		};

		index += 1;
		let value_start = index;

		while index < bytes.len() && bytes[index] != quote.as_byte() {
			index += 1;
		}

		if index == bytes.len() {
			return Err(XmlError::syntax(
				format!("значение атрибута `{name}` не закрыто кавычкой"),
				position + value_start,
			));
		}

		attributes.push(Attribute {
			name: name.to_owned(),
			value: raw[value_start..index].to_owned(),
			quote,
			leading: leading.to_owned(),
			before_eq: before_eq.to_owned(),
			after_eq: after_eq.to_owned(),
		});
		index += 1;
	}
}

/// Переводит ошибку quick-xml в ошибку ядра.
fn map_reader_error(error: QuickError, position: u64, offset: usize) -> XmlError {
	let position = offset + position as usize;

	match error {
		QuickError::Syntax(_) => XmlError::UnexpectedEof,
		QuickError::IllFormed(inner) => XmlError::Syntax {
			message: format!("нарушена корректность XML: {inner}"),
			position,
		},
		other => XmlError::QuickXml(other),
	}
}

/// Проверяет, является ли байт пробельным символом XML.
const fn is_xml_space_byte(byte: u8) -> bool {
	matches!(byte, b' ' | b'\t' | b'\r' | b'\n')
}

/// Проверяет, является ли символ пробельным символом XML.
const fn is_xml_space(value: char) -> bool {
	matches!(value, ' ' | '\t' | '\r' | '\n')
}
