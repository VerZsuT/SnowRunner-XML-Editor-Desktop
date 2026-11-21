//! Тест на XML фикстуры игры: точная запись и идемпотентность форматирования.
//!
//! Каталог `initialpak/` не хранится в репозитории, поэтому при его отсутствии
//! тест пропускается с сообщением и не выполняет проверок.

use std::collections::BTreeSet;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::Instant;

use sxmle_domain::xml::{
	Element, FormatPolicy, Node, Quote, XmlDocument, decode_entities_with_report, parse_bytes,
};

/// Каталоги фикстуры, если она распакована.
fn fixture_dirs() -> Option<Vec<PathBuf>> {
	let base = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../initialpak/[media]");
	let dirs = [base.join("classes"), base.join("_templates")];

	dirs.iter().all(|dir| dir.is_dir()).then(|| dirs.to_vec())
}

/// Рекурсивно собирает XML-файлы каталога.
fn collect_xml(dir: &Path, files: &mut Vec<PathBuf>) {
	let Ok(entries) = fs::read_dir(dir) else {
		return;
	};

	for entry in entries.flatten() {
		let path = entry.path();

		if path.is_dir() {
			collect_xml(&path, files);
		} else if path.extension().is_some_and(|extension| extension == "xml") {
			files.push(path);
		}
	}
}

/// Описывает первое расхождение двух наборов байтов.
fn difference(expected: &[u8], actual: &[u8]) -> String {
	let index = expected
		.iter()
		.zip(actual.iter())
		.position(|(left, right)| left != right)
		.unwrap_or(expected.len().min(actual.len()));
	let start = index.saturating_sub(40);
	let expected_end = (index + 40).min(expected.len());
	let actual_end = (index + 40).min(actual.len());

	format!(
		"позиция {index}: ожидалось {:?}, получено {:?}",
		String::from_utf8_lossy(&expected[start..expected_end]),
		String::from_utf8_lossy(&actual[start..actual_end])
	)
}

/// Сводная статистика по разметке фикстуры.
#[derive(Default)]
struct Stats {
	/// Файлов с BOM.
	files_with_bom: usize,
	/// Объявлений XML.
	declarations: usize,
	/// Файлов с несколькими корневыми элементами.
	multiple_roots: usize,
	/// Атрибутов в одинарных кавычках.
	single_quoted_attributes: usize,
	/// Комментариев.
	comments: usize,
	/// Секций CDATA.
	cdata: usize,
	/// Инструкций обработки.
	instructions: usize,
	/// Объявлений doctype.
	doctypes: usize,
}

impl Stats {
	/// Учитывает документ целиком.
	fn add(&mut self, document: &XmlDocument) {
		self.files_with_bom += usize::from(document.bom);
		self.declarations += usize::from(document.declaration.is_some());
		self.multiple_roots += usize::from(
			document
				.epilog
				.iter()
				.any(|node| matches!(node, Node::Element(_))),
		);

		for node in &document.prolog {
			self.node(node);
		}

		self.element(&document.root);

		for node in &document.epilog {
			self.node(node);
		}
	}

	/// Учитывает элемент.
	fn element(&mut self, element: &Element) {
		self.single_quoted_attributes += element
			.attributes
			.iter()
			.filter(|attribute| attribute.quote == Quote::Single)
			.count();

		for node in &element.children {
			self.node(node);
		}
	}

	/// Учитывает узел.
	fn node(&mut self, node: &Node) {
		match node {
			Node::Element(element) => self.element(element),
			Node::Comment(_) => self.comments += 1,
			Node::CData(_) => self.cdata += 1,
			Node::ProcessingInstruction { .. } => self.instructions += 1,
			Node::DocType(_) => self.doctypes += 1,
			Node::Text(_) => {}
		}
	}
}

#[test]
fn фикстура_точная_запись_и_идемпотентность() {
	let Some(dirs) = fixture_dirs() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};
	let mut files = Vec::new();

	for dir in &dirs {
		collect_xml(dir, &mut files);
	}

	files.sort();
	assert!(!files.is_empty(), "каталоги фикстуры пусты");

	let policy = FormatPolicy::default();
	let started = Instant::now();
	let mut lossless = 0_usize;
	let mut idempotent = 0_usize;
	let mut lossless_failed = 0_usize;
	let mut idempotent_failed = 0_usize;
	let mut lossless_errors = Vec::new();
	let mut parse_errors = Vec::new();
	let mut idempotent_errors = Vec::new();
	let mut unknown = BTreeSet::new();
	let mut stats = Stats::default();

	for path in &files {
		let name = path.display().to_string();
		let source = match fs::read(path) {
			Ok(source) => source,
			Err(error) => {
				parse_errors.push(format!("{name}: чтение не удалось: {error}"));

				continue;
			}
		};
		let document = match parse_bytes(&source) {
			Ok(document) => document,
			Err(error) => {
				parse_errors.push(format!("{name}: {error}"));

				continue;
			}
		};
		stats.add(&document);

		let restored = document.to_xml();

		if restored.as_bytes() == source.as_slice() {
			lossless += 1;
		} else {
			lossless_failed += 1;

			if lossless_errors.len() < 5 {
				lossless_errors.push(format!(
					"{name}: {}",
					difference(&source, restored.as_bytes())
				));
			}
		}

		let formatted = document.to_xml_formatted(&policy);
		let (_, entities) = decode_entities_with_report(&formatted);

		unknown.extend(entities);

		let reparsed = match parse_bytes(formatted.as_bytes()) {
			Ok(document) => document,
			Err(error) => {
				parse_errors.push(format!(
					"{name}: форматированный результат не разбирается: {error}"
				));

				continue;
			}
		};
		let repeated = reparsed.to_xml_formatted(&policy);

		if repeated == formatted {
			idempotent += 1;
		} else {
			idempotent_failed += 1;

			if idempotent_errors.len() < 5 {
				idempotent_errors.push(format!(
					"{name}: {}",
					difference(formatted.as_bytes(), repeated.as_bytes())
				));
			}
		}
	}

	let elapsed = started.elapsed();

	eprintln!(
		"фикстура XML: файлов {}, lossless {lossless}, идемпотентных {idempotent}, \
		 ошибок разбора {}, BOM {}, объявлений {}, многокорневых {}, комментариев {}, \
		 CDATA {}, PI {}, doctype {}, атрибутов в одинарных кавычках {}, \
		 неизвестные сущности: {unknown:?}, время {elapsed:?}",
		files.len(),
		parse_errors.len(),
		stats.files_with_bom,
		stats.declarations,
		stats.multiple_roots,
		stats.comments,
		stats.cdata,
		stats.instructions,
		stats.doctypes,
		stats.single_quoted_attributes
	);

	assert!(
		parse_errors.is_empty(),
		"ошибки разбора/записи ({} шт.), первые 5:\n{}",
		parse_errors.len(),
		parse_errors
			.iter()
			.take(5)
			.cloned()
			.collect::<Vec<_>>()
			.join("\n")
	);
	assert_eq!(
		lossless_failed,
		0,
		"нарушений точной записи: {lossless_failed} из {}, первые 5:\n{}",
		files.len(),
		lossless_errors.join("\n")
	);
	assert_eq!(
		idempotent_failed,
		0,
		"нарушений идемпотентности: {idempotent_failed} из {}, первые 5:\n{}",
		files.len(),
		idempotent_errors.join("\n")
	);
}
