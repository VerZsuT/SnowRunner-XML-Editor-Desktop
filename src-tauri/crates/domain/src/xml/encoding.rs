//! Кодировка XML-документа: определение при чтении и запись обратно.

use encoding_rs::Encoding;

use super::XmlError;

/// Кодировка, в которой документ был прочитан.
///
/// Документ пишется обратно в исходной кодировке: UTF-8 с BOM остаётся с BOM,
/// windows-1251 — windows-1251, объявление `<?xml ... encoding="..."?>` не меняется.
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum DocumentEncoding {
	/// UTF-8.
	#[default]
	Utf8,
	/// UTF-16 с порядком байтов little-endian.
	Utf16Le,
	/// UTF-16 с порядком байтов big-endian.
	Utf16Be,
	/// Любая другая кодировка из `encoding_rs` (например windows-1251).
	Other(&'static Encoding),
}

impl DocumentEncoding {
	/// Имя кодировки для сообщений и сравнения с объявлением XML.
	pub fn label(self) -> &'static str {
		match self {
			Self::Utf8 => "utf-8",
			Self::Utf16Le => "utf-16le",
			Self::Utf16Be => "utf-16be",
			Self::Other(encoding) => encoding.name(),
		}
	}

	/// Декодирует байты файла в текст.
	///
	/// BOM, если он есть, декодируется в U+FEFF: его убирает разбор.
	pub fn decode(self, input: &[u8]) -> Result<String, XmlError> {
		match self {
			Self::Utf8 => std::str::from_utf8(input)
				.map(str::to_owned)
				.map_err(|error| XmlError::InvalidUtf8 {
					position: error.valid_up_to(),
				}),
			Self::Utf16Le | Self::Utf16Be => decode_utf16(self, input),
			Self::Other(encoding) => {
				let (text, had_errors) = encoding.decode_without_bom_handling(input);

				if had_errors {
					Err(XmlError::InvalidEncoding {
						encoding: encoding.name().to_owned(),
					})
				} else {
					Ok(text.into_owned())
				}
			}
		}
	}

	/// Кодирует текст документа в байты файла.
	///
	/// BOM пишется как символ U+FEFF в начале текста (см. `XmlDocument::bom`).
	pub fn encode(self, text: &str) -> Result<Vec<u8>, XmlError> {
		match self {
			Self::Utf8 => Ok(text.as_bytes().to_vec()),
			Self::Utf16Le | Self::Utf16Be => {
				let mut output = Vec::with_capacity(text.len() * 2);

				for unit in text.encode_utf16() {
					let bytes = match self {
						Self::Utf16Be => unit.to_be_bytes(),
						_ => unit.to_le_bytes(),
					};

					output.extend_from_slice(&bytes);
				}

				Ok(output)
			}
			Self::Other(encoding) => {
				let (bytes, _, had_errors) = encoding.encode(text);

				if had_errors {
					let character = text
						.chars()
						.find(|character| {
							let mut buffer = [0_u8; 4];
							let (_, _, had_errors) =
								encoding.encode(character.encode_utf8(&mut buffer));

							had_errors
						})
						.unwrap_or('�');

					Err(XmlError::Unencodable {
						character,
						encoding: encoding.name().to_owned(),
					})
				} else {
					Ok(bytes.into_owned())
				}
			}
		}
	}
}

/// Результат определения кодировки файла.
#[derive(Debug, Clone, Copy)]
pub struct Sniffed<'a> {
	/// Определённая кодировка.
	pub encoding: DocumentEncoding,
	/// Байты файла без изменений (BOM остаётся в начале).
	pub body: &'a [u8],
	/// Длина BOM в байтах: `0`, `2` или `3`.
	pub bom_len: usize,
}

/// Определяет кодировку по BOM и объявлению XML.
pub fn sniff(input: &[u8]) -> Result<Sniffed<'_>, XmlError> {
	for (prefix, encoding, bom_len) in [
		(b"\xEF\xBB\xBF".as_slice(), DocumentEncoding::Utf8, 3),
		(b"\xFF\xFE".as_slice(), DocumentEncoding::Utf16Le, 2),
		(b"\xFE\xFF".as_slice(), DocumentEncoding::Utf16Be, 2),
	] {
		if input.starts_with(prefix) {
			return Ok(Sniffed {
				encoding,
				body: input,
				bom_len,
			});
		}
	}

	let Some(declared) = declared_label(input) else {
		return Ok(Sniffed {
			encoding: DocumentEncoding::Utf8,
			body: input,
			bom_len: 0,
		});
	};

	Ok(Sniffed {
		encoding: from_label(&declared)?,
		body: input,
		bom_len: 0,
	})
}

/// Проверяет, что объявление XML не противоречит кодировке файла.
pub fn check_declared(declared: &str, actual: DocumentEncoding) -> Result<(), XmlError> {
	let normalized = declared.trim().to_ascii_lowercase();
	let matches = match actual {
		DocumentEncoding::Utf8 => matches!(
			normalized.as_str(),
			"utf-8" | "utf8" | "us-ascii" | "ascii" | "ascii-us"
		),
		DocumentEncoding::Utf16Le => matches!(
			normalized.as_str(),
			"utf-16" | "utf16" | "utf-16le" | "utf16le" | "ucs-2" | "ucs2"
		),
		DocumentEncoding::Utf16Be => matches!(
			normalized.as_str(),
			"utf-16" | "utf16" | "utf-16be" | "utf16be"
		),
		DocumentEncoding::Other(encoding) => Encoding::for_label(normalized.as_bytes())
			.is_some_and(|candidate| candidate == encoding),
	};

	if matches {
		Ok(())
	} else {
		Err(XmlError::EncodingMismatch {
			declared: declared.trim().to_owned(),
			actual: actual.label().to_owned(),
		})
	}
}

/// Кодировка по метке из объявления XML.
fn from_label(label: &str) -> Result<DocumentEncoding, XmlError> {
	let normalized = label.trim().to_ascii_lowercase();

	match normalized.as_str() {
		"utf-8" | "utf8" | "us-ascii" | "ascii" | "ascii-us" => return Ok(DocumentEncoding::Utf8),
		"utf-16le" | "utf16le" => return Ok(DocumentEncoding::Utf16Le),
		"utf-16be" | "utf16be" => return Ok(DocumentEncoding::Utf16Be),
		// Без BOM такой файл неоднозначен: порядок байтов неизвестен.
		"utf-16" | "utf16" | "ucs-2" | "ucs2" => {}
		_ => {
			return Encoding::for_label(normalized.as_bytes())
				.map(DocumentEncoding::Other)
				.ok_or_else(|| XmlError::UnsupportedEncoding(label.trim().to_owned()));
		}
	}

	Err(XmlError::UnsupportedEncoding(label.trim().to_owned()))
}

/// Метка кодировки из объявления XML в начале файла.
fn declared_label(input: &[u8]) -> Option<String> {
	let head = &input[..input.len().min(1024)];
	let text: String = head.iter().map(|byte| char::from(*byte)).collect();
	let start = text.find("<?xml")?;
	let end = start + text[start..].find("?>")?;
	let declaration = &text[start..end];
	let index = declaration.find("encoding")? + "encoding".len();
	let rest = declaration[index..].trim_start();
	let rest = rest.strip_prefix('=')?.trim_start();
	let quote = rest.chars().next()?;

	if quote != '"' && quote != '\'' {
		return None;
	}

	let rest = &rest[quote.len_utf8()..];
	let end = rest.find(quote)?;

	Some(rest[..end].to_owned())
}

/// Декодирует байты UTF-16 в текст.
fn decode_utf16(encoding: DocumentEncoding, input: &[u8]) -> Result<String, XmlError> {
	if input.len() % 2 != 0 {
		return Err(XmlError::InvalidEncoding {
			encoding: encoding.label().to_owned(),
		});
	}

	let mut units = Vec::with_capacity(input.len() / 2);

	for pair in input.chunks_exact(2) {
		let pair = [pair[0], pair[1]];

		units.push(match encoding {
			DocumentEncoding::Utf16Be => u16::from_be_bytes(pair),
			_ => u16::from_le_bytes(pair),
		});
	}

	char::decode_utf16(units)
		.collect::<Result<String, _>>()
		.map_err(|_| XmlError::InvalidEncoding {
			encoding: encoding.label().to_owned(),
		})
}
