//! Потоковое сжатие и распаковка raw deflate (без zlib- и gzip-обёрток).

use std::io::{Read, Write};

use flate2::Compression;
use flate2::read::DeflateDecoder;
use flate2::write::DeflateEncoder;

use super::ZipError;

/// Предел предварительного резервирования памяти под распакованные данные.
const MAX_RESERVED: u64 = 64 * 1024 * 1024;

/// Оценить ёмкость буфера для данных известного размера.
pub(super) fn reserve(size: u64) -> usize {
	usize::try_from(size)
		.unwrap_or(0)
		.min(MAX_RESERVED as usize)
}

/// Распаковать raw deflate из потока.
///
/// Чтение ограничено expected_size + 1 байтом, чтобы повреждённый архив не мог
/// раздуть память: расхождение размера обнаружит вызывающий код.
pub(super) fn decompress(reader: impl Read, expected_size: u64) -> Result<Vec<u8>, ZipError> {
	let mut data = Vec::with_capacity(reserve(expected_size));
	let mut decoder = DeflateDecoder::new(reader).take(expected_size.saturating_add(1));
	decoder.read_to_end(&mut data)?;
	Ok(data)
}

/// Сжать данные в raw deflate.
pub(super) fn compress(data: &[u8]) -> Result<Vec<u8>, ZipError> {
	let mut encoder = DeflateEncoder::new(
		Vec::with_capacity(data.len() / 2 + 64),
		Compression::default(),
	);
	encoder.write_all(data)?;
	Ok(encoder.finish()?)
}
