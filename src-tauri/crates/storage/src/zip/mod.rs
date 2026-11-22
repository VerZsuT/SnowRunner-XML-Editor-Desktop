//! Чтение и обновление zip-архива игры без сторонних архиваторов.
//!
//! Слой потоковый: файл архива открывается один раз, данные читаются блоками
//! через [std::io::BufReader] и [std::io::Seek], сжатые байты неизменённых
//! записей копируются как есть. Порядок записей central directory сохраняется,
//! имена пишутся сырыми байтами UTF-8 без нормализации (обратные слэши остаются
//! обратными слэшами, регистр не меняется).
//!
//! Поддерживается zip без zip64 и без data descriptor: такие архивы отвергаются
//! ошибкой [ZipError::Unsupported] до любой записи на диск.
//!
//! Замена архива атомарная: пересборка идёт во временный файл рядом с исходным,
//! файл синхронизируется на диск и затем заменяет исходный с повторами на
//! Windows (включая снятие read-only с целевого файла).

mod deflate;
mod entry;
mod reader;
mod writer;

#[cfg(test)]
mod tests;

pub use entry::EntryMeta;
pub use reader::{ExtractReport, ZipArchive, read_entries};
pub use writer::{ArchiveUpdate, UpdateReport, update};

use thiserror::Error;

/// Ошибка zip-слоя.
#[derive(Debug, Error)]
pub enum ZipError {
	/// Ошибка файловой системы.
	#[error("ошибка файловой системы: {0}")]
	Io(#[from] std::io::Error),

	/// Неверная сигнатура структуры архива.
	#[error("неверная сигнатура {context} по смещению {offset}: 0x{found:08X}")]
	InvalidSignature {
		/// Ожидаемая структура.
		context: &'static str,
		/// Офсет структуры в файле.
		offset: u64,
		/// Фактически прочитанная сигнатура.
		found: u32,
	},

	/// Структура архива повреждена или не соответствует формату.
	#[error("архив повреждён: {0}")]
	Malformed(String),

	/// Возможность формата не поддерживается.
	#[error("архив не поддерживается: {0}")]
	Unsupported(String),

	/// Запись отсутствует в архиве.
	#[error("запись {0} не найдена в архиве")]
	EntryNotFound(String),

	/// Контрольная сумма данных не совпала.
	#[error("CRC32 записи {name} не совпал: ожидалось 0x{expected:08X}, получено 0x{actual:08X}")]
	CrcMismatch {
		/// Имя записи.
		name: String,
		/// CRC32 из central directory.
		expected: u32,
		/// CRC32 распакованных данных.
		actual: u32,
	},

	/// Размер данных не совпал с метаданными.
	#[error("размер данных записи {name} не совпал: ожидалось {expected} байт, получено {actual}")]
	SizeMismatch {
		/// Имя записи.
		name: String,
		/// Ожидаемый размер.
		expected: u64,
		/// Фактический размер.
		actual: u64,
	},

	/// Недопустимое имя записи.
	#[error("недопустимое имя записи: {0}")]
	InvalidName(String),
}
