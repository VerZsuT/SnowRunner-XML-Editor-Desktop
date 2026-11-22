//! Шаблоны `_templates`: значения атрибутов по умолчанию.
//!
//! Модель игры читает атрибут элемента, а если его нет — ищет значение
//! в шаблоне `_templates` (с учётом `_template` у элемента и его предков)
//! и в подключённых файлах шаблонов (`Include="trucks"` → `_templates/trucks.xml`).

use crate::xml::{Element, Node, XmlDocument, parse_bytes};

/// Имя тега шаблонов.
pub const TEMPLATES_TAG: &str = "_templates";

/// Атрибут ссылки на шаблон.
pub const TEMPLATE_ATTR: &str = "_template";

/// Атрибут подключения файла шаблонов.
pub const INCLUDE_ATTR: &str = "Include";

/// Предел вложенности `_template`/`Include`: защита от циклов.
const MAX_DEPTH: usize = 16;

/// Найденный элемент шаблона вместе с его родителем.
#[derive(Debug, Clone, Copy)]
struct Found<'a> {
	/// Элемент шаблона.
	element: &'a Element,
	/// Родитель элемента в дереве шаблонов.
	parent: Option<&'a Element>,
}

/// Шаблоны одного документа вместе с подключёнными файлами.
#[derive(Debug, Clone)]
pub struct Templates {
	/// Элемент `_templates` этого документа (копия поддерева).
	element: Element,
	/// Подключённые шаблоны.
	include: Option<Box<Templates>>,
}

impl Templates {
	/// Разбирает шаблоны документа и подключённые по `Include` файлы.
	///
	/// `load` получает имя файла без расширения и возвращает его содержимое.
	pub fn from_document(
		document: &XmlDocument,
		load: &mut dyn FnMut(&str) -> Option<Vec<u8>>,
	) -> Option<Self> {
		let element = document.element(TEMPLATES_TAG)?;
		let mut loaded = Vec::new();

		Self::read_element(element, load, &mut loaded, 0)
	}

	/// Разбирает шаблоны элемента `_templates`.
	fn read_element(
		element: &Element,
		load: &mut dyn FnMut(&str) -> Option<Vec<u8>>,
		loaded: &mut Vec<String>,
		depth: usize,
	) -> Option<Self> {
		if depth > MAX_DEPTH {
			return None;
		}

		let include = element
			.attr(INCLUDE_ATTR)
			.map(str::trim)
			.filter(|name| !name.is_empty() && !loaded.iter().any(|loaded| loaded == name))
			.and_then(|name| {
				loaded.push(name.to_owned());
				let source = load(name)?;
				let document = parse_bytes(&source).ok()?;
				let inner = document.element(TEMPLATES_TAG)?;

				Self::read_element(inner, load, loaded, depth + 1).map(Box::new)
			});

		Some(Self {
			element: element.clone(),
			include,
		})
	}

	/// Значение атрибута из шаблона для элемента.
	///
	/// `ancestors` — предки элемента от корня к родителю.
	pub fn get_value(
		&self,
		ancestors: &[&Element],
		element: &Element,
		attr: &str,
	) -> Option<String> {
		let mut chain: Vec<&Element> = ancestors.to_vec();

		chain.push(element);

		for index in (0..chain.len()).rev() {
			let target = chain[index];
			let Some(name) = target
				.attr(TEMPLATE_ATTR)
				.map(str::trim)
				.filter(|name| !name.is_empty())
			else {
				continue;
			};
			let mut path = vec![target.name.as_str(), name];

			if index + 1 < chain.len() {
				path.push(element.name.as_str());
			}

			if let Some(found) = self.select_path(&path)
				&& let Some(value) = self.read_template(element, &found, attr, 0)
			{
				return Some(value);
			}

			return self
				.include
				.as_ref()
				.and_then(|include| include.get_value(ancestors, element, attr));
		}

		None
	}

	/// Значение атрибута по найденному шаблону.
	fn read_template(
		&self,
		element: &Element,
		found: &Found<'_>,
		attr: &str,
		depth: usize,
	) -> Option<String> {
		if depth > MAX_DEPTH {
			return None;
		}

		if found
			.parent
			.is_some_and(|parent| parent.name == element.name)
		{
			if let Some(value) = found.element.attr_value(attr) {
				return Some(value);
			}

			return self.extra(element, found.element, attr, depth);
		}

		if let Some(child) = find_descendant(found.element, &element.name)
			&& let Some(value) = child.attr_value(attr)
			&& !value.is_empty()
		{
			return Some(value);
		}

		self.extra(element, found.element, attr, depth)
	}

	/// Переходит к шаблону, на который ссылается найденный шаблон.
	fn extra(
		&self,
		element: &Element,
		template: &Element,
		attr: &str,
		depth: usize,
	) -> Option<String> {
		let name = template
			.attr(TEMPLATE_ATTR)
			.map(str::trim)
			.filter(|name| !name.is_empty())?;
		if let Some(found) = self.select_path(&[template.name.as_str(), name]) {
			return self.read_template(element, &found, attr, depth + 1);
		}

		self.include
			.as_ref()?
			.extra(element, template, attr, depth + 1)
	}

	/// Ищет в шаблонах потомка по цепочке имён тегов.
	fn select_path(&self, path: &[&str]) -> Option<Found<'_>> {
		let (first, rest) = path.split_first()?;
		let (element, parent) = find_descendant_with_parent(&self.element, first)?;

		if rest.is_empty() {
			return Some(Found {
				element,
				parent: Some(parent),
			});
		}

		select_chain(element, rest)
	}
}

/// Ищет потомка по цепочке имён тегов.
fn select_chain<'a>(root: &'a Element, path: &[&str]) -> Option<Found<'a>> {
	let (first, rest) = path.split_first()?;
	let (element, parent) = find_descendant_with_parent(root, first)?;

	if rest.is_empty() {
		return Some(Found {
			element,
			parent: Some(parent),
		});
	}

	select_chain(element, rest)
}

/// Ищет первого потомка с указанным именем вместе с родителем.
fn find_descendant_with_parent<'a>(
	root: &'a Element,
	name: &str,
) -> Option<(&'a Element, &'a Element)> {
	for node in &root.children {
		let Node::Element(child) = node else {
			continue;
		};

		if child.name == name {
			return Some((child, root));
		}

		if let Some(found) = find_descendant_with_parent(child, name) {
			return Some(found);
		}
	}

	None
}

/// Ищет первого потомка с указанным именем.
fn find_descendant<'a>(root: &'a Element, name: &str) -> Option<&'a Element> {
	find_descendant_with_parent(root, name).map(|(element, _)| element)
}

#[cfg(test)]
mod tests;
