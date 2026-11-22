//! Стабильные пути узлов документа и мутации дерева.
//!
//! Путь начинается с `/` и состоит из имён элементов с индексами среди
//! одноимённых соседей: `/Truck/TruckData`, `/GearboxVariants/Gearbox[2]/Gear[0]`.
//! Индекс по умолчанию — 0. Формат совпадает с `AttrDescriptor::selector`,
//! поэтому интерфейс передаёт путь из дескриптора обратно в команды.

use std::collections::HashMap;

use super::entities::escape_text;
use super::model::{Element, Node, XmlDocument};

/// Сегмент пути: имя элемента и индекс среди одноимённых соседей.
#[derive(Debug, Clone, PartialEq, Eq)]
struct Segment {
	/// Имя элемента.
	name: String,
	/// Индекс среди одноимённых элементов.
	index: usize,
}

/// Ошибка работы с путём узла.
#[derive(Debug, Clone, PartialEq, Eq, thiserror::Error)]
pub enum SelectorError {
	/// Путь разобран неверно.
	#[error("некорректный путь узла: {0}")]
	Invalid(String),
	/// Узел не найден.
	#[error("узел не найден: {0}")]
	NotFound(String),
	/// Индекс за пределами списка.
	#[error("индекс за пределами списка: {0}")]
	Index(String),
}

/// Разбирает путь на сегменты.
fn parse(selector: &str) -> Result<Vec<Segment>, SelectorError> {
	let rest = selector
		.strip_prefix('/')
		.ok_or_else(|| SelectorError::Invalid(selector.to_owned()))?;

	if rest.is_empty() {
		return Err(SelectorError::Invalid(selector.to_owned()));
	}

	rest.split('/')
		.map(|part| parse_segment(part, selector))
		.collect()
}

/// Разбирает один сегмент пути.
fn parse_segment(part: &str, selector: &str) -> Result<Segment, SelectorError> {
	if part.is_empty() {
		return Err(SelectorError::Invalid(selector.to_owned()));
	}

	let invalid = || SelectorError::Invalid(selector.to_owned());

	match part.split_once('[') {
		Some((name, tail)) => {
			if name.is_empty() {
				return Err(invalid());
			}

			let index = tail
				.strip_suffix(']')
				.ok_or_else(invalid)?
				.parse::<usize>()
				.map_err(|_| invalid())?;

			Ok(Segment {
				name: name.to_owned(),
				index,
			})
		}
		None => Ok(Segment {
			name: part.to_owned(),
			index: 0,
		}),
	}
}

/// Собирает путь из сегментов.
fn join(segments: &[Segment]) -> String {
	let mut path = String::new();

	for segment in segments {
		path.push('/');
		path.push_str(&segment.name);

		if segment.index > 0 {
			path.push('[');
			path.push_str(&segment.index.to_string());
			path.push(']');
		}
	}

	path
}
/// Находит элемент верхнего уровня по сегменту.
fn root<'a>(
	document: &'a XmlDocument,
	segment: &Segment,
	selector: &str,
) -> Result<&'a Element, SelectorError> {
	let mut seen = 0;

	for element in document.elements() {
		if element.name == segment.name {
			if seen == segment.index {
				return Ok(element);
			}

			seen += 1;
		}
	}

	Err(SelectorError::NotFound(selector.to_owned()))
}

/// Находит элемент верхнего уровня по сегменту для изменения.
fn root_mut<'a>(
	document: &'a mut XmlDocument,
	segment: &Segment,
	selector: &str,
) -> Result<&'a mut Element, SelectorError> {
	if document.root.name == segment.name && segment.index == 0 {
		return Ok(&mut document.root);
	}

	let mut seen = usize::from(document.root.name == segment.name);

	for node in &mut document.epilog {
		if let Node::Element(element) = node {
			if element.name == segment.name {
				if seen == segment.index {
					return Ok(element);
				}

				seen += 1;
			}
		}
	}

	Err(SelectorError::NotFound(selector.to_owned()))
}

/// Находит дочерний элемент по сегменту.
fn child<'a>(
	element: &'a Element,
	segment: &Segment,
	selector: &str,
) -> Result<&'a Element, SelectorError> {
	let mut seen = 0;

	for node in &element.children {
		if let Node::Element(candidate) = node {
			if candidate.name == segment.name {
				if seen == segment.index {
					return Ok(candidate);
				}

				seen += 1;
			}
		}
	}

	Err(SelectorError::NotFound(selector.to_owned()))
}

/// Находит дочерний элемент по сегменту для изменения.
fn child_mut<'a>(
	element: &'a mut Element,
	segment: &Segment,
	selector: &str,
) -> Result<&'a mut Element, SelectorError> {
	let mut seen = 0;

	for node in &mut element.children {
		if let Node::Element(candidate) = node {
			if candidate.name == segment.name {
				if seen == segment.index {
					return Ok(candidate);
				}

				seen += 1;
			}
		}
	}

	Err(SelectorError::NotFound(selector.to_owned()))
}

/// Находит элемент по пути.
pub fn resolve<'a>(
	document: &'a XmlDocument,
	selector: &str,
) -> Result<&'a Element, SelectorError> {
	let segments = parse(selector)?;
	let mut iter = segments.iter();
	let first = iter
		.next()
		.ok_or_else(|| SelectorError::Invalid(selector.to_owned()))?;
	let mut element = root(document, first, selector)?;

	for segment in iter {
		element = child(element, segment, selector)?;
	}

	Ok(element)
}

/// Находит элемент по пути для изменения.
pub fn resolve_mut<'a>(
	document: &'a mut XmlDocument,
	selector: &str,
) -> Result<&'a mut Element, SelectorError> {
	let segments = parse(selector)?;
	let mut iter = segments.iter();
	let first = iter
		.next()
		.ok_or_else(|| SelectorError::Invalid(selector.to_owned()))?;
	let mut element = root_mut(document, first, selector)?;

	for segment in iter {
		element = child_mut(element, segment, selector)?;
	}

	Ok(element)
}

/// Устанавливает атрибут по пути элемента; `None` удаляет атрибут.
pub fn set_attr(
	document: &mut XmlDocument,
	selector: &str,
	name: &str,
	value: Option<&str>,
) -> Result<(), SelectorError> {
	let element = resolve_mut(document, selector)?;

	match value {
		Some(value) => element.set_attr_value(name, value),
		None => {
			element.remove_attr_value(name);
		}
	}

	Ok(())
}

/// Заменяет текст элемента, экранируя его для XML.
///
/// Дочерние элементы сохраняются: заменяются только текстовые узлы.
pub fn set_text(
	document: &mut XmlDocument,
	selector: &str,
	text: &str,
) -> Result<(), SelectorError> {
	let element = resolve_mut(document, selector)?;
	let position = element
		.children
		.iter()
		.position(|node| matches!(node, Node::Text(_)));
	let children: Vec<Node> = element
		.children
		.drain(..)
		.filter(|node| !matches!(node, Node::Text(_)))
		.collect();

	element.children = children;
	element.self_closing = false;
	element.children.insert(
		position.unwrap_or(0).min(element.children.len()),
		Node::Text(escape_text(text)),
	);

	Ok(())
}

/// Добавляет дочерний элемент и возвращает путь нового элемента.
///
/// `index` — позиция среди одноимённых соседей; `None` — в конец.
pub fn add_element(
	document: &mut XmlDocument,
	parent: &str,
	name: &str,
	index: Option<usize>,
) -> Result<String, SelectorError> {
	let element = resolve_mut(document, parent)?;
	let positions = matching_positions(element, name);
	let position = match index {
		Some(index) => {
			if index > positions.len() {
				return Err(SelectorError::Index(format!("{parent}/{name}[{index}]")));
			}

			positions
				.get(index)
				.copied()
				.unwrap_or(element.children.len())
		}
		None => element.children.len(),
	};
	let index = index.unwrap_or(positions.len());

	element.self_closing = false;
	element
		.children
		.insert(position, Node::Element(Element::new(name)));

	Ok(format!("{parent}/{name}[{index}]"))
}

/// Удаляет элемент по пути.
pub fn remove_element(document: &mut XmlDocument, selector: &str) -> Result<(), SelectorError> {
	let segments = parse(selector)?;
	let (last, parents) = segments
		.split_last()
		.ok_or_else(|| SelectorError::Invalid(selector.to_owned()))?;
	let parent_selector = join(parents);
	let element = resolve_mut(document, &parent_selector)?;
	let positions = matching_positions(element, &last.name);
	let position = positions
		.get(last.index)
		.copied()
		.ok_or_else(|| SelectorError::NotFound(selector.to_owned()))?;

	element.remove_child(position);

	Ok(())
}

/// Переставляет элемент в списке одноимённых соседей.
///
/// `to` — новый индекс среди одноимённых элементов; возвращается новый путь.
pub fn move_element(
	document: &mut XmlDocument,
	selector: &str,
	to: usize,
) -> Result<String, SelectorError> {
	let segments = parse(selector)?;
	let (last, parents) = segments
		.split_last()
		.ok_or_else(|| SelectorError::Invalid(selector.to_owned()))?;
	let parent_selector = join(parents);
	let element = resolve_mut(document, &parent_selector)?;
	let positions = matching_positions(element, &last.name);
	let position = positions
		.get(last.index)
		.copied()
		.ok_or_else(|| SelectorError::NotFound(selector.to_owned()))?;

	if to >= positions.len() {
		return Err(SelectorError::Index(selector.to_owned()));
	}

	if to == last.index {
		return Ok(selector.to_owned());
	}

	let node = element
		.remove_child(position)
		.ok_or_else(|| SelectorError::NotFound(selector.to_owned()))?;
	let positions = matching_positions(element, &last.name);
	let target = positions.get(to).copied().unwrap_or(element.children.len());

	element.children.insert(target, node);

	Ok(format!("{parent_selector}/{name}[{to}]", name = last.name))
}

/// Обходит элементы документа и передаёт их стабильные пути по порядку.
///
/// Путь строится так же, как в resolve: индекс пишется только для
/// ненулевых одноимённых соседей.
pub fn walk_paths<'a>(document: &'a XmlDocument, visit: &mut impl FnMut(String, &'a Element)) {
	let mut indexes: HashMap<&'a str, usize> = HashMap::new();

	for element in document.elements() {
		let counter = indexes.entry(element.name.as_str()).or_default();
		let index = *counter;

		*counter += 1;

		let path = format!("/{}{}", element.name, index_suffix(index));

		walk_element(element, &path, visit);
	}
}

/// Обходит элемент и его потомков, начиная с готового пути.
pub fn walk_element<'a>(
	element: &'a Element,
	path: &str,
	visit: &mut impl FnMut(String, &'a Element),
) {
	visit(path.to_owned(), element);

	let mut indexes: HashMap<&'a str, usize> = HashMap::new();

	for node in &element.children {
		let Node::Element(child) = node else {
			continue;
		};

		let counter = indexes.entry(child.name.as_str()).or_default();
		let index = *counter;

		*counter += 1;

		let child_path = format!("{path}/{}{}", child.name, index_suffix(index));

		walk_element(child, &child_path, visit);
	}
}

/// Индекс среди одноимённых соседей: нулевой не пишется.
fn index_suffix(index: usize) -> String {
	if index == 0 {
		String::new()
	} else {
		format!("[{index}]")
	}
}

/// Позиции дочерних элементов с указанным именем.
fn matching_positions(element: &Element, name: &str) -> Vec<usize> {
	let mut positions = Vec::new();

	for (position, node) in element.children.iter().enumerate() {
		if let Node::Element(candidate) = node {
			if candidate.name == name {
				positions.push(position);
			}
		}
	}

	positions
}

#[cfg(test)]
mod tests;
