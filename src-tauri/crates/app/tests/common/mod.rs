//! Общие помощники интеграционных тестов.
//!
//! Модуль подключается каждым тестовым крейтом через `mod common;`: без фикстуры
//! `initial.pak` тестам нужен минимальный синтетический zip с управляемыми
//! записями и CRC.

/// Записать little-endian u16.
fn put_u16(buffer: &mut Vec<u8>, value: u16) {
	buffer.extend_from_slice(&value.to_le_bytes());
}

/// Записать little-endian u32.
fn put_u32(buffer: &mut Vec<u8>, value: u32) {
	buffer.extend_from_slice(&value.to_le_bytes());
}

/// Собрать минимальный zip-архив с записями stored (метод 0).
pub fn build_stored_zip(path: &std::path::Path, files: &[(&str, &[u8])]) {
	use std::fs;

	let mut data = Vec::new();
	let mut central = Vec::new();

	for (name, content) in files {
		let offset = data.len() as u32;
		let crc = crc32fast::hash(content);
		let size = content.len() as u32;
		let name_bytes = name.as_bytes();
		let name_length = name_bytes.len() as u16;

		put_u32(&mut data, 0x0403_4b50);
		put_u16(&mut data, 10);
		put_u16(&mut data, 0);
		put_u16(&mut data, 0);
		put_u16(&mut data, 0);
		put_u16(&mut data, 0);
		put_u32(&mut data, crc);
		put_u32(&mut data, size);
		put_u32(&mut data, size);
		put_u16(&mut data, name_length);
		put_u16(&mut data, 0);
		data.extend_from_slice(name_bytes);
		data.extend_from_slice(content);

		put_u32(&mut central, 0x0201_4b50);
		put_u16(&mut central, 0x031e);
		put_u16(&mut central, 10);
		put_u16(&mut central, 0);
		put_u16(&mut central, 0);
		put_u16(&mut central, 0);
		put_u16(&mut central, 0);
		put_u32(&mut central, crc);
		put_u32(&mut central, size);
		put_u32(&mut central, size);
		put_u16(&mut central, name_length);
		put_u16(&mut central, 0);
		put_u16(&mut central, 0);
		put_u16(&mut central, 0);
		put_u16(&mut central, 0);
		put_u32(&mut central, 0);
		put_u32(&mut central, offset);
		central.extend_from_slice(name_bytes);
	}

	let cd_offset = data.len() as u32;
	let cd_size = central.len() as u32;

	data.extend_from_slice(&central);
	put_u32(&mut data, 0x0605_4b50);
	put_u16(&mut data, 0);
	put_u16(&mut data, 0);
	put_u16(&mut data, files.len() as u16);
	put_u16(&mut data, files.len() as u16);
	put_u32(&mut data, cd_size);
	put_u32(&mut data, cd_offset);
	put_u16(&mut data, 0);
	fs::write(path, data).expect("синтетический архив");
}
