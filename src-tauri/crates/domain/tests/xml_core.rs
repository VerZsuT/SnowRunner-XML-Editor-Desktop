//! Тесты XML-ядра: разбор, точная и форматированная запись.

use sxmle_domain::xml::{
	DocumentEncoding, Element, FormatPolicy, LineEnding, Node, Quote, XmlDocument, XmlError,
	decode_entities, decode_entities_with_report, parse, parse_bytes,
};

/// Политика по умолчанию: 2 пробела, CRLF, самозакрытие пустых тегов.
fn policy() -> FormatPolicy {
	FormatPolicy::default()
}

/// Строка из ``core.test.ts``.
const SOURCE: &str =
	"<Truck Type=\"trailer\"><TruckData Fuel=\"40\" /><Name>A &amp; B</Name></Truck>";

#[test]
fn отклоняет_слишком_глубокую_вложенность() {
	let source = format!("{}{}", "<a>".repeat(1000), "</a>".repeat(1000));

	assert!(matches!(parse(&source), Err(XmlError::Syntax { .. })));
}

#[test]
fn разбирает_пустой_элемент() {
	let document = parse("<a />").unwrap();

	assert!(document.root.self_closing);
	assert!(document.root.attributes.is_empty());
	assert!(document.root.children.is_empty());
	assert_eq!(document.to_xml(), "<a />");
	assert_eq!(document.to_xml_formatted(&policy()), "<a />");
}

#[test]
fn разбирает_пару_пустых_тегов() {
	let document = parse("<a></a>").unwrap();

	assert!(!document.root.self_closing);
	assert_eq!(document.to_xml(), "<a></a>");
	assert_eq!(document.to_xml_formatted(&policy()), "<a />");

	let spaced = FormatPolicy {
		self_closing_empty: false,
		..policy()
	};

	assert_eq!(document.to_xml_formatted(&spaced), "<a></a>");
}

#[test]
fn сохраняет_порядок_и_кавычки_атрибутов() {
	let source = "<a b=\"1\" c='x &amp; y' d=\"q&quot;\"/>";
	let document = parse(source).unwrap();

	assert_eq!(document.root.attr("b"), Some("1"));
	assert_eq!(document.root.attr("c"), Some("x &amp; y"));
	assert_eq!(document.root.attributes[1].quote, Quote::Single);
	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<a b=\"1\" c=\"x &amp; y\" d=\"q&quot;\" />"
	);
}

#[test]
fn сохраняет_пробелы_внутри_тега() {
	let source = "<Motor   a=\"1\"\t\tb = \"2\"   />";
	let document = parse(source).unwrap();

	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<Motor a=\"1\" b=\"2\" />"
	);
}

#[test]
fn сохраняет_многострочные_атрибуты() {
	let source = "<a\n\tx=\"1\"\n\ty=\"2\"\n></a>";
	let document = parse(source).unwrap();

	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<a x=\"1\" y=\"2\" />"
	);
}

#[test]
fn сохраняет_комментарии() {
	let source = "<a><!-- comment --></a>";
	let document = parse(source).unwrap();

	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<a>\r\n  <!-- comment -->\r\n</a>"
	);
}

#[test]
fn сохраняет_cdata() {
	let source = "<a><![CDATA[x < y & z]]></a>";
	let document = parse(source).unwrap();

	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<a>\r\n  <![CDATA[x < y & z]]>\r\n</a>"
	);
}

#[test]
fn сохраняет_инструкции_обработки() {
	let source = "<?xml-stylesheet href=\"s.css\"?><a><?target   body ?><b/></a>";
	let document = parse(source).unwrap();

	assert_eq!(
		document.prolog.first(),
		Some(&Node::ProcessingInstruction {
			target: "xml-stylesheet".to_owned(),
			body: " href=\"s.css\"".to_owned()
		})
	);
	assert_eq!(
		document.root.children.first(),
		Some(&Node::ProcessingInstruction {
			target: "target".to_owned(),
			body: "   body ".to_owned()
		})
	);
	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<?xml-stylesheet href=\"s.css\"?>\r\n<a>\r\n  <?target   body ?>\r\n  <b />\r\n</a>"
	);
}

#[test]
fn сохраняет_doctype() {
	let source = "<!DOCTYPE note SYSTEM \"Note.dtd\">\r\n<note/>";
	let document = parse(source).unwrap();

	assert_eq!(
		document.prolog.first(),
		Some(&Node::DocType(
			"<!DOCTYPE note SYSTEM \"Note.dtd\">".to_owned()
		))
	);
	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<!DOCTYPE note SYSTEM \"Note.dtd\">\r\n<note />"
	);
}

#[test]
fn сохраняет_bom() {
	let source: &[u8] = b"\xEF\xBB\xBF<a/>";
	let document = parse_bytes(source).unwrap();

	assert!(document.bom);
	assert_eq!(document.to_xml().as_bytes(), source);
	assert!(document.to_xml_formatted(&policy()).starts_with('\u{FEFF}'));

	let from_string = parse("\u{FEFF}<a/>").unwrap();

	assert!(from_string.bom);
	assert_eq!(from_string.to_xml(), "\u{FEFF}<a/>");
}

#[test]
fn обрабатывает_переводы_строк() {
	let source = "<a>\r\n  <b/>\n</a>";
	let document = parse(source).unwrap();

	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<a>\r\n  <b />\r\n</a>"
	);

	let lf = FormatPolicy {
		line_ending: LineEnding::Lf,
		..policy()
	};

	assert_eq!(document.to_xml_formatted(&lf), "<a>\n  <b />\n</a>");
}

#[test]
fn сохраняет_несколько_корневых_элементов() {
	let source = "<_templates Include=\"trucks\">\r\n\t<_templates _template=\"TruckData\" />\r\n</_templates>\r\n<Truck><TruckData Fuel=\"40\" /></Truck>\r\n";
	let document = parse(source).unwrap();

	assert_eq!(document.root.name, "_templates");
	assert_eq!(document.trailing_text, "\r\n");
	assert!(matches!(
		document.epilog.as_slice(),
		[Node::Text(text), Node::Element(element)] if text == "\r\n" && element.name == "Truck"
	));
	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<_templates Include=\"trucks\">\r\n  <_templates _template=\"TruckData\" />\r\n</_templates>\r\n<Truck>\r\n  <TruckData Fuel=\"40\" />\r\n</Truck>"
	);
}

#[test]
fn сохраняет_значимый_текст() {
	let document = parse("<Name>A &amp; B</Name>").unwrap();

	assert_eq!(document.root.text(), "A &amp; B");
	assert_eq!(document.root.text_value(), "A & B");
	assert_eq!(document.to_xml(), "<Name>A &amp; B</Name>");
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<Name>A &amp; B</Name>"
	);
}

#[test]
fn форматирует_смешанное_содержимое() {
	let document = parse("<a> text <b/> tail </a>").unwrap();
	let formatted = "<a>\r\n  text\r\n  <b />\r\n  tail\r\n</a>";

	assert_eq!(document.to_xml_formatted(&policy()), formatted);
	assert_eq!(
		parse(formatted).unwrap().to_xml_formatted(&policy()),
		formatted
	);
}

#[test]
fn сохраняет_объявление_xml() {
	let source = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<a/>";
	let document = parse(source).unwrap();
	let declaration = document.declaration.as_ref().unwrap();

	assert_eq!(
		declaration
			.attributes
			.iter()
			.map(|attribute| attribute.name.as_str())
			.collect::<Vec<_>>(),
		["version", "encoding", "standalone"]
	);
	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\r\n<a />"
	);
}

#[test]
fn сохраняет_кавычки_объявления() {
	let source = "<?xml version = '1.0' ?>\n<a/>";
	let document = parse(source).unwrap();

	assert_eq!(document.to_xml(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<?xml version=\"1.0\"?>\r\n<a />"
	);
}

#[test]
fn отклоняет_неизвестную_кодировку() {
	let error = parse_bytes(br#"<?xml version="1.0" encoding="x-unknown"?><a/>"#).unwrap_err();

	match error {
		XmlError::UnsupportedEncoding(value) => assert_eq!(value, "x-unknown"),
		other => panic!("ожидалась UnsupportedEncoding, получено {other:?}"),
	}
}

#[test]
fn отклоняет_противоречие_кодировки() {
	// Файл с UTF-8 BOM не может объявлять windows-1251.
	let mut source = b"\xEF\xBB\xBF".to_vec();

	source.extend_from_slice(br#"<?xml version="1.0" encoding="windows-1251"?><a/>"#);

	match parse_bytes(&source).unwrap_err() {
		XmlError::EncodingMismatch { declared, actual } => {
			assert_eq!(declared, "windows-1251");
			assert_eq!(actual, "utf-8");
		}
		other => panic!("ожидалась EncodingMismatch, получено {other:?}"),
	}
}

#[test]
fn сообщает_о_непредставимом_символе() {
	let mut element = Element::new("Name");

	element
		.children
		.push(Node::Text("Привет \u{1F600}".to_owned()));

	let mut document = XmlDocument::new(element);

	document.encoding = DocumentEncoding::Other(encoding_rs::WINDOWS_1251);

	match document.to_bytes_formatted(&policy()).unwrap_err() {
		XmlError::Unencodable {
			character,
			encoding,
		} => {
			assert_eq!(character, '\u{1F600}');
			assert_eq!(encoding, "windows-1251");
		}
		other => panic!("ожидалась Unencodable, получено {other:?}"),
	}
}

#[test]
fn сохраняет_кодировку_файла() {
	let text = "<?xml version=\"1.0\" encoding=\"windows-1251\"?>\r\n<Name>Привет</Name>";
	let (bytes, _, had_errors) = encoding_rs::WINDOWS_1251.encode(text);

	assert!(!had_errors);
	assert!(bytes.iter().any(|byte| *byte >= 0x80));

	let document = parse_bytes(&bytes).unwrap();

	assert_eq!(
		document.encoding,
		DocumentEncoding::Other(encoding_rs::WINDOWS_1251)
	);
	assert_eq!(document.root.text_value(), "Привет");
	assert_eq!(document.to_bytes().unwrap(), bytes.as_ref());
	assert_eq!(
		document.to_bytes_formatted(&policy()).unwrap(),
		bytes.as_ref()
	);
}

#[test]
fn сохраняет_utf16_с_bom() {
	let text = "<?xml version=\"1.0\" encoding=\"utf-16\"?>\r\n<a x=\"1\" />";
	let mut source = vec![0xFF, 0xFE];

	for unit in text.encode_utf16() {
		source.extend_from_slice(&unit.to_le_bytes());
	}

	let document = parse_bytes(&source).unwrap();

	assert_eq!(document.encoding, DocumentEncoding::Utf16Le);
	assert!(document.bom);
	assert_eq!(document.root.attr("x"), Some("1"));
	assert_eq!(document.to_bytes().unwrap(), source);
	assert_eq!(
		document.to_xml_formatted(&policy()),
		format!("\u{FEFF}{text}")
	);
}

#[test]
fn пишет_валидный_xml() {
	let document = parse("<Name>A &amp; B &lt; C</Name>").unwrap();

	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<Name>A &amp; B &lt; C</Name>"
	);

	let mut element = Element::new("a");

	element.set_attr_value("x", "1 & 2 < 3 \"q\"");
	let document = XmlDocument::new(element);

	assert_eq!(
		document.root.attr("x"),
		Some("1 &amp; 2 &lt; 3 &quot;q&quot;")
	);
	assert_eq!(document.root.attr_value("x").unwrap(), "1 & 2 < 3 \"q\"");
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<a x=\"1 &amp; 2 &lt; 3 &quot;q&quot;\" />"
	);
}

#[test]
fn сообщает_об_ошибках_разбора() {
	assert!(matches!(parse(""), Err(XmlError::Syntax { .. })));
	assert!(matches!(parse("   "), Err(XmlError::Syntax { .. })));
	assert!(matches!(parse("<a>"), Err(XmlError::UnexpectedEof)));
	assert!(matches!(parse("<a><b></a>"), Err(XmlError::Syntax { .. })));
	assert!(matches!(parse("<a/></b>"), Err(XmlError::Syntax { .. })));
	assert!(matches!(parse("<a/>garbage"), Err(XmlError::Syntax { .. })));
	assert!(matches!(parse("<a x=/>"), Err(XmlError::Syntax { .. })));
	assert!(matches!(
		parse("<a><b/></a> <broken"),
		Err(XmlError::UnexpectedEof)
	));

	match parse_bytes(b"<a>\xFF</a>").unwrap_err() {
		XmlError::InvalidUtf8 { position } => assert_eq!(position, 3),
		other => panic!("ожидалась InvalidUtf8, получено {other:?}"),
	}
}

#[test]
fn изменяет_атрибуты_и_детей() {
	let mut element = Element::new("Truck");

	element.set_attr("Type", "trailer");
	assert_eq!(element.attr("Type"), Some("trailer"));

	element.set_attr("Type", "truck");
	assert_eq!(element.attributes.len(), 1);
	assert_eq!(element.attr("Type"), Some("truck"));
	assert_eq!(element.remove_attr("Type"), Some("truck".to_owned()));
	assert_eq!(element.attr("Type"), None);

	let mut engine = Element::new("Engine");

	engine.set_attr("Torque", "10");
	element.append_child(engine);
	assert_eq!(element.child("Engine").unwrap().attr("Torque"), Some("10"));

	element
		.child_mut("Engine")
		.unwrap()
		.set_attr("Torque", "20");
	assert_eq!(element.child("Engine").unwrap().attr("Torque"), Some("20"));

	element.append_child(Element::new("Engine"));
	assert_eq!(element.children_named("Engine").count(), 2);
	assert!(matches!(
		element.remove_child(0),
		Some(Node::Element(removed)) if removed.name == "Engine"
	));
	assert_eq!(element.remove_child(99), None);
}

#[test]
fn находит_элементы_верхнего_уровня() {
	let mut document =
		parse("<_templates Include=\"trucks\" />\r\n<Truck Type=\"truck\" />\r\n").unwrap();

	assert_eq!(
		document
			.elements()
			.map(|element| element.name.as_str())
			.collect::<Vec<_>>(),
		["_templates", "Truck"]
	);
	assert!(document.element("Truck").is_some());
	assert!(document.element("Missing").is_none());

	document
		.element_mut("Truck")
		.unwrap()
		.set_attr("Type", "trailer");
	assert_eq!(
		document.element("Truck").unwrap().attr("Type"),
		Some("trailer")
	);
	assert_eq!(
		document.to_xml(),
		"<_templates Include=\"trucks\" />\r\n<Truck Type=\"trailer\" />\r\n"
	);
}

#[test]
fn точная_запись_учитывает_изменения() {
	let mut document = parse("<a x=\"1\"/>").unwrap();

	document.root.set_attr("y", "2");
	assert_eq!(document.to_xml(), "<a x=\"1\" y=\"2\"/>");

	document.root.remove_attr("x");
	assert_eq!(document.to_xml(), "<a y=\"2\"/>");

	document.root.append_child(Element::new("b"));
	assert_eq!(document.to_xml(), "<a y=\"2\"><b></b></a>");
	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<a y=\"2\">\r\n  <b />\r\n</a>"
	);
}

#[test]
fn экранирует_значения_атрибутов() {
	let mut element = Element::new("a");

	element.set_attr("x", "1 &amp; 2");
	let document = XmlDocument::new(element);

	assert_eq!(
		document.to_xml_formatted(&policy()),
		"<a x=\"1 &amp; 2\" />"
	);
}

#[test]
fn декодирует_сущности() {
	let cases = [
		("&amp;", "&"),
		("&amp;amp;", "&amp;"),
		("&lt;", "<"),
		("&gt;", ">"),
		("&quot;", "\""),
		("&apos;", "'"),
		("&nbsp;", "\u{00A0}"),
		("&#106;", "j"),
		("&#106;&#106;", "jj"),
		("&#x6a;", "j"),
		("&#xfeff;", "\u{FEFF}"),
		("&unknown;", "&unknown;"),
		("&AMP;", "&AMP;"),
		("a & b", "a & b"),
		("&#x;", "&#x;"),
		("&#0;", "&#0;"),
		("&amp;lt;", "&lt;"),
		("&quot;&amp;&apos;", "\"&'"),
	];

	for (input, expected) in cases {
		assert_eq!(decode_entities(input), expected, "вход: {input}");
	}
}

#[test]
fn собирает_неизвестные_сущности() {
	let (decoded, unknown) = decode_entities_with_report("&unknown; &amp; &another; &unknown;");

	assert_eq!(decoded, "&unknown; & &another; &unknown;");
	assert_eq!(unknown, ["&unknown;".to_owned(), "&another;".to_owned()]);
}

#[test]
fn перенос_разбирает_строку() {
	let document = parse(SOURCE).unwrap();

	assert_eq!(document.root.name, "Truck");
	assert_eq!(document.root.attr("Type"), Some("trailer"));
	assert_eq!(
		document.root.child("TruckData").unwrap().attr("Fuel"),
		Some("40")
	);
	assert_eq!(document.root.child("Name").unwrap().text(), "A &amp; B");
}

#[test]
fn перенос_декодирует_сущности() {
	assert_eq!(
		decode_entities("<a x=\"1 &amp; 2\">a &lt; b</a>"),
		"<a x=\"1 & 2\">a < b</a>"
	);
	assert_eq!(
		decode_entities("<a x=\"1\">text</a>"),
		"<a x=\"1\">text</a>"
	);
}

#[test]
fn перенос_пустая_строка_даёт_ошибку() {
	assert!(parse("").is_err());
}

#[test]
fn перенос_сериализация_документа_идемпотентна() {
	let first = parse(SOURCE).unwrap().to_xml_formatted(&policy());
	let second = parse(&first).unwrap().to_xml_formatted(&policy());

	assert_eq!(second, first);
}

#[test]
fn перенос_сериализация_элемента_идемпотентна() {
	let document = parse(SOURCE).unwrap();
	let name = document.root.child("Name").unwrap().clone();
	let standalone = XmlDocument::new(name);
	let first = standalone.to_xml_formatted(&policy());
	let second = parse(&first).unwrap().to_xml_formatted(&policy());

	assert_eq!(second, first);
}

#[test]
fn объявление_не_в_начале_сохраняется_как_инструкция() {
	let source = "<!--c--><?xml version=\"1.0\"?><a/>";
	let document = parse(source).unwrap();

	assert!(document.declaration.is_none());
	assert_eq!(
		document.prolog.last(),
		Some(&Node::ProcessingInstruction {
			target: "xml".to_owned(),
			body: " version=\"1.0\"".to_owned()
		})
	);
	assert_eq!(document.to_xml(), source);
}

#[test]
fn объявление_без_атрибутов() {
	let document = parse("<?xml?><a/>").unwrap();

	assert!(document.declaration.as_ref().unwrap().attributes.is_empty());
	assert_eq!(document.to_xml(), "<?xml?><a/>");
	assert_eq!(document.to_xml_formatted(&policy()), "<?xml?>\r\n<a />");
}

#[test]
fn форматирование_идемпотентно_на_смешанных_случаях() {
	let cases = [
		"<a b=\"1\"><b/><c>text</c></a>",
		"<a><!--x--><b><![CDATA[y]]></b></a>",
		"<a><b> </b><c>\r\n</c></a>",
		"<?xml version=\"1.0\"?><a><b/></a>",
		"<a/><b/>",
		"<a>\r\n  <b x=\"1\">text</b>\r\n</a>",
	];

	for source in cases {
		let document = parse(source).unwrap();
		let first = document.to_xml_formatted(&policy());
		let second = parse(&first)
			.unwrap_or_else(|error| panic!("не разобрался результат для {source:?}: {error}"))
			.to_xml_formatted(&policy());

		assert_eq!(second, first, "вход: {source:?}");
	}
}
