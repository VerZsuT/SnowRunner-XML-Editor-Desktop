//! Ошибки разбора XML.

use thiserror::Error;

/// Ошибка разбора или записи XML.
#[derive(Debug, Error)]
pub enum XmlError {
	/// Входные данные закончились внутри незакрытой разметки.
	#[error("неожиданный конец файла XML: разметка не закрыта")]
	UnexpectedEof,

	/// Синтаксическая ошибка разметки.
	#[error("ошибка разбора XML: {message} (позиция {position})")]
	Syntax {
		/// Описание ошибки.
		message: String,
		/// Байтовый отступ от начала документа.
		position: usize,
	},

	/// Объявление XML требует кодировку, отличную от UTF-8/ASCII.
	#[error("неподдерживаемая кодировка XML: {0}")]
	UnsupportedEncoding(String),

	/// Входные данные не являются корректным UTF-8.
	#[error("входные данные не являются корректным UTF-8 (позиция {position})")]
	InvalidUtf8 {
		/// Байтовый отступ от начала документа.
		position: usize,
	},

	/// Входные данные не декодируются в заявленной кодировке.
	#[error("входные данные не декодируются в кодировке {encoding}")]
	InvalidEncoding {
		/// Имя кодировки.
		encoding: String,
	},

	/// Объявление XML противоречит фактической кодировке файла.
	#[error("объявление XML требует кодировку {declared}, а файл прочитан как {actual}")]
	EncodingMismatch {
		/// Кодировка из объявления XML.
		declared: String,
		/// Кодировка, определённая по BOM или содержимому.
		actual: String,
	},

	/// Строку нельзя записать в исходной кодировке файла.
	#[error("символ {character:?} нельзя записать в кодировке {encoding}")]
	Unencodable {
		/// Символ, отсутствующий в кодировке.
		character: char,
		/// Имя кодировки.
		encoding: String,
	},

	/// Ошибка слоя quick-xml (ввод-вывод, кодирование, экранирование).
	#[error("ошибка quick-xml: {0}")]
	QuickXml(#[from] quick_xml::Error),
}

impl XmlError {
	/// Создаёт синтаксическую ошибку с позицией.
	pub(crate) fn syntax(message: impl Into<String>, position: usize) -> Self {
		Self::Syntax {
			message: message.into(),
			position,
		}
	}
}
