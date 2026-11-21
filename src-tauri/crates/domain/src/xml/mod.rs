//! Разбор и сериализация XML.
//!
//! Дерево сохраняет исходную разметку: порядок и кавычки атрибутов, пробелы
//! внутри тегов, комментарии, CDATA, инструкции обработки, doctype, BOM и
//! хвостовой текст. `XmlDocument::to_xml` возвращает документ байт-в-байт,
//! `XmlDocument::to_xml_formatted` — канонический вид по `FormatPolicy`.
//!
//! Файлы игры — XML-фрагменты: в них бывает несколько корневых элементов
//! (например `_templates` и `Truck`). Первый элемент становится
//! `XmlDocument::root`, остальные попадают в `XmlDocument::epilog`.

mod encoding;
mod entities;
mod error;
mod format;
mod model;
mod parse;
mod selector;
mod serialize;

pub use encoding::DocumentEncoding;
pub use entities::{
	attribute_to_xml, decode_entities, decode_entities_with_report, escape_attribute, escape_text,
	text_to_xml,
};
pub use error::XmlError;
pub use format::{FormatPolicy, LineEnding};
pub use model::{Attribute, Element, Node, Quote, XmlDeclaration, XmlDocument};
pub use parse::{parse, parse_bytes};
pub use selector::{
	SelectorError, add_element, move_element, remove_element, resolve, resolve_mut, set_attr,
	set_text,
};
