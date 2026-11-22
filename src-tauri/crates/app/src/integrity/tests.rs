//! Тесты отпечатка архива.

use std::fs;
use std::path::{Path, PathBuf};

use sxmle_storage::zip::EntryMeta;

use super::{
	ArchiveFingerprint, ArchiveState, Store, check, compute, entries_crc, has_marker,
	require_unchanged, same_path,
};
use crate::archive::{ArchiveError, EDITED_MARKER};
use crate::test_support::temp_dir;

/// Запись архива с заданным именем и содержимым.
fn entry(name: &str) -> EntryMeta {
	EntryMeta {
		name: name.to_owned(),
		method: 0,
		crc32: crc32fast::hash(name.as_bytes()),
		compressed_size: name.len() as u64,
		uncompressed_size: name.len() as u64,
		flags: 0,
		dos_time: 0,
		dos_date: 0,
		version_made_by: 0x031e,
		version_needed: 10,
		internal_attrs: 0,
		external_attrs: 0,
		data_offset: 0,
		local_header_offset: 0,
	}
}

/// Путь к файлу отпечатка в каталоге теста.
fn store_path(dir: &Path) -> PathBuf {
	dir.join("jsons/archive.json")
}

/// Канонический CRC: порядок и поля записей, но не data_offset.
#[test]
fn canonical_crc_detects_changes() {
	let first = vec![entry("[media]\\a.xml"), entry("[media]\\b.xml")];
	let same = first.clone();
	let reversed = vec![entry("[media]\\b.xml"), entry("[media]\\a.xml")];
	let mut changed = first.clone();
	changed[0].crc32 ^= 1;
	let mut offset = first.clone();
	offset[0].data_offset = 4096;

	assert_eq!(entries_crc(&first), entries_crc(&same));
	assert_ne!(entries_crc(&first), entries_crc(&reversed));
	assert_ne!(entries_crc(&first), entries_crc(&changed));
	assert_eq!(entries_crc(&first), entries_crc(&offset));
}

/// Пути сравниваются без учёта регистра только на Windows.
#[test]
fn path_case_depends_on_platform() {
	assert_eq!(
		same_path(r"\\?\D:\Games\initial.pak", r"\\?\d:\games\INITIAL.PAK"),
		cfg!(windows)
	);
}

/// Маркер `edited` ищется без учёта регистра.
#[test]
fn marker_is_case_insensitive() {
	assert!(has_marker(&[entry("EDITED")]));
	assert!(has_marker(&[entry(EDITED_MARKER)]));
	assert!(!has_marker(&[entry("edited.txt")]));
}

/// Хранилище: запись, чтение, битый файл и очистка.
#[test]
fn store_roundtrip_and_broken_json() {
	let dir = temp_dir("integrity-store");
	let path = store_path(&dir);
	let store = Store::new(&path);
	let fingerprint = ArchiveFingerprint {
		path: r"\\?\D:\Games\initial.pak".to_owned(),
		size: 100,
		modified_ms: 1_760_000_000_000,
		central_crc: 0xdead_beef,
	};

	assert_eq!(store.load(), None);
	store.save(&fingerprint).expect("отпечаток записан");
	assert_eq!(store.load(), Some(fingerprint.clone()));
	assert!(!path.with_extension("json.tmp").exists());

	fs::write(&path, b"{ broken").expect("битый файл записан");
	assert_eq!(store.load(), None);

	store.save(&fingerprint).expect("отпечаток перезаписан");
	assert_eq!(store.load(), Some(fingerprint));

	store.clear().expect("отпечаток удалён");
	assert_eq!(store.load(), None);
	store.clear().expect("повторная очистка не падает");

	let _ = fs::remove_dir_all(&dir);
}

/// `check`: ok, changed, unknown и отсутствие архива.
#[test]
fn check_reports_state() {
	let dir = temp_dir("integrity-check");
	let archive = dir.join("initial.pak");
	let store = store_path(&dir);

	build_zip(&archive, &[("a.txt", b"alpha")]);

	// Без отпечатка состояние unknown, даже если архив читается.
	assert_eq!(check(Some(&archive), &store).state, ArchiveState::Unknown);

	let fingerprint = compute(&archive).expect("отпечаток");
	Store::new(&store)
		.save(&fingerprint)
		.expect("отпечаток записан");

	let status = check(Some(&archive), &store);
	assert_eq!(status.state, ArchiveState::Ok);
	assert!(!status.marker_present);

	build_zip(&archive, &[("a.txt", b"beta")]);
	assert_eq!(check(Some(&archive), &store).state, ArchiveState::Changed);

	let missing = dir.join("missing.pak");
	assert_eq!(check(Some(&missing), &store).state, ArchiveState::Unknown);
	assert_eq!(
		check(None, &store).state,
		ArchiveState::Unknown,
		"без пути архив не проверяется"
	);

	let _ = fs::remove_dir_all(&dir);
}

/// `require_unchanged`: отпечаток, изменение, пропажа архива.
#[test]
fn require_unchanged_guards_writes() {
	let dir = temp_dir("integrity-require");
	let archive = dir.join("initial.pak");
	let store = store_path(&dir);

	build_zip(&archive, &[(EDITED_MARKER, b"")]);
	assert!(matches!(
		require_unchanged(&archive, &store),
		Err(ArchiveError::Unknown(_))
	));

	let fingerprint = compute(&archive).expect("отпечаток");
	Store::new(&store)
		.save(&fingerprint)
		.expect("отпечаток записан");
	assert!(require_unchanged(&archive, &store).is_ok());
	assert!(check(Some(&archive), &store).marker_present);

	build_zip(&archive, &[(EDITED_MARKER, b""), ("b.txt", b"beta")]);
	assert!(matches!(
		require_unchanged(&archive, &store),
		Err(ArchiveError::Changed(_))
	));

	fs::remove_file(&archive).expect("архив удалён");
	assert!(matches!(
		require_unchanged(&archive, &store),
		Err(ArchiveError::ArchiveNotFound(_))
	));

	let _ = fs::remove_dir_all(&dir);
}

/// Собрать минимальный zip-архив с записями stored (метод 0).
fn build_zip(path: &Path, files: &[(&str, &[u8])]) {
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
	fs::write(path, data).expect("архив записан");
}

/// Записать little-endian u16.
fn put_u16(buffer: &mut Vec<u8>, value: u16) {
	buffer.extend_from_slice(&value.to_le_bytes());
}

/// Записать little-endian u32.
fn put_u32(buffer: &mut Vec<u8>, value: u32) {
	buffer.extend_from_slice(&value.to_le_bytes());
}
