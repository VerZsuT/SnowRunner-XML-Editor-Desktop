//! Тесты сценариев работы с архивом: на синтетике и на фикстуре `initial.pak`.

use std::fs;
use std::path::{Path, PathBuf};

use sxmle_app::archive::{
	EDITED_MARKER, UnpackList, UnpackListKind, backup_file, find_initial, restore_backup, unpack,
	unpack_and_remember, update_checked, update_from_dir,
};
use sxmle_app::integrity::{self, ArchiveState};
use sxmle_storage::zip::ZipArchive;

/// Путь к фикстуре архива.
fn fixture() -> PathBuf {
	Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../initialpak/initial.pak")
}

/// Создаёт пустой рабочий каталог для теста.
fn work_dir(name: &str) -> PathBuf {
	let dir = Path::new(env!("CARGO_TARGET_TMPDIR")).join(name);
	let _ = fs::remove_dir_all(&dir);
	fs::create_dir_all(&dir).expect("рабочий каталог");

	dir
}

#[test]
fn unpack_list_matches_prefixes_ignoring_case() {
	let list = UnpackListKind::Main.list();

	assert_eq!(list.items().len(), 13);
	assert!(list.matches("[media]\\classes\\trucks\\truck.xml"));
	assert!(list.matches("[MEDIA]\\Classes\\Trucks\\truck.xml"));
	assert!(list.matches("[media]\\_dlc\\dlc_1\\classes\\trucks\\a.xml"));
	assert!(list.matches("edited"));
	assert!(!list.matches("[media]\\classes\\trucks2\\truck.xml"));
	assert!(!list.matches("[media]\\classes\\trailers\\a.xml"));
	assert!(!list.matches("pak.load_list"));
	assert_eq!(UnpackListKind::Optimized.list().items().len(), 44);
	assert_eq!(UnpackListKind::Mods.list().items().len(), 3);
}

#[test]
fn unpack_list_parses_crlf_and_comments() {
	let list =
		UnpackList::parse("; комментарий\r\n[media]\\classes\r\n\r\n  [strings]\\a.str  \r\n");

	assert_eq!(list.items(), ["[media]\\classes", "[strings]\\a.str"]);
	assert!(list.matches("[media]\\classes\\x.xml"));
	assert!(!list.matches("[media]\\class"));
}

#[test]
fn unpack_and_update_fixture() {
	let source = fixture();

	if !source.is_file() {
		eprintln!("фикстура отсутствует, тест пропущен");
		return;
	}

	let root = work_dir("archive-roundtrip");
	let archive_path = root.join("work.pak");
	let dest = root.join("mainTemp");

	fs::copy(&source, &archive_path).expect("копия архива");

	let report = unpack(
		&archive_path,
		&UnpackListKind::Main.list(),
		&dest,
		|_, _| {},
	)
	.expect("распаковка");

	assert!(report.files > 100, "извлечено файлов: {}", report.files);
	assert!(dest.join("[media]/classes/trucks").is_dir());
	assert!(dest.join("[strings]").is_dir());

	let original = ZipArchive::open(&source).expect("исходный архив");
	let original_entries: Vec<String> = original
		.entries()
		.iter()
		.map(|entry| entry.name.clone())
		.collect();
	let original_compressed: Vec<(String, Vec<u8>)> = original
		.entries()
		.iter()
		.map(|entry| {
			(
				entry.name.clone(),
				original
					.read_compressed(entry)
					.expect("сжатые данные исходной записи"),
			)
		})
		.collect();

	let truck = first_file(&dest.join("[media]/classes/trucks")).expect("файл трака");
	let content = fs::read_to_string(&truck).expect("чтение трака");
	fs::write(&truck, format!("{content}<!-- проверка -->\r\n")).expect("правка трака");

	drop(original);

	let result = update_from_dir(&archive_path, &dest).expect("обновление архива");

	assert_eq!(
		result.changed.len(),
		1,
		"пересобрано записей: {:?}",
		result.changed
	);
	assert!(
		result.added.is_empty(),
		"добавлено неожиданно: {:?}",
		result.added
	);

	let updated = ZipArchive::open(&archive_path).expect("обновлённый архив");
	let updated_names: Vec<String> = updated
		.entries()
		.iter()
		.map(|entry| entry.name.clone())
		.collect();

	assert_eq!(updated_names.len(), original_entries.len() + 1);
	assert_eq!(
		updated_names.last().map(String::as_str),
		Some(EDITED_MARKER)
	);
	assert_eq!(
		&updated_names[..original_entries.len()],
		original_entries.as_slice()
	);

	let changed_entry = updated
		.entry(&result.changed[0])
		.expect("изменённая запись");
	assert_eq!(
		changed_entry.uncompressed_size,
		fs::metadata(&truck).expect("метаданные").len()
	);

	for (name, before) in &original_compressed {
		if name == &result.changed[0] {
			continue;
		}

		let entry = updated.entry(name).expect("запись после обновления");
		let after = updated.read_compressed(entry).expect("сжатые данные");

		assert_eq!(before, &after, "запись {name} пересобрана");
	}

	drop(updated);

	// Повторное сохранение не должно падать на уже существующем маркере.
	let again = update_from_dir(&archive_path, &dest).expect("повторное обновление архива");

	assert!(again.changed.is_empty());
	assert!(again.added.is_empty());

	let reopened = ZipArchive::open(&archive_path).expect("архив после повторного обновления");
	let markers = reopened
		.entries()
		.iter()
		.filter(|entry| entry.name == EDITED_MARKER)
		.count();

	assert_eq!(markers, 1);

	let _ = fs::remove_dir_all(&root);
}

#[test]
fn backup_restore_roundtrip() {
	let root = work_dir("archive-backup");
	let source = root.join("initial.pak");
	let backup = root.join("backups/initial.pak");
	let target = root.join("restored.pak");

	fs::write(&source, b"data").expect("исходный файл");

	assert_eq!(backup_file(&source, &backup).expect("бэкап"), 4);
	fs::write(&source, b"broken").expect("порча файла");
	assert_eq!(restore_backup(&backup, &target).expect("восстановление"), 4);
	assert_eq!(fs::read(&target).expect("чтение"), b"data");
	assert!(!target.with_file_name("restored.pak.tmp").exists());

	assert!(backup_file(&root.join("none.pak"), &backup).is_err());
	let _ = fs::remove_dir_all(&root);
}

#[test]
fn find_initial_ищет_архив_в_каталоге_игры() {
	let root = work_dir("archive-find");
	let client = root.join("SnowRunner/en_us/preload/paks/client");

	fs::create_dir_all(&client).expect("каталог игры");
	fs::write(client.join("initial.pak"), b"pak").expect("архив");

	assert_eq!(find_initial(&root), Some(client.join("initial.pak")));
	assert_eq!(find_initial(&client), Some(client.join("initial.pak")));
	assert_eq!(find_initial(&root.join("empty")), None);

	let _ = fs::remove_dir_all(&root);
}

/// Первый файл каталога (рекурсивно).
fn first_file(dir: &Path) -> Option<PathBuf> {
	for entry in fs::read_dir(dir).ok()? {
		let path = entry.ok()?.path();

		if path.is_dir() {
			if let Some(found) = first_file(&path) {
				return Some(found);
			}
		} else if path.is_file() {
			return Some(path);
		}
	}

	None
}

/// Остатки промежуточных каталогов рядом с целью.
fn has_staging(root: &Path) -> bool {
	let Ok(entries) = fs::read_dir(root) else {
		return false;
	};

	entries.flatten().any(|entry| {
		let name = entry.file_name().to_string_lossy().into_owned();

		name.contains(".new-") || name.contains(".old-")
	})
}

/// Записать little-endian u16.
fn put_u16(buffer: &mut Vec<u8>, value: u16) {
	buffer.extend_from_slice(&value.to_le_bytes());
}

/// Записать little-endian u32.
fn put_u32(buffer: &mut Vec<u8>, value: u32) {
	buffer.extend_from_slice(&value.to_le_bytes());
}

/// Собрать минимальный zip-архив с записями stored (метод 0).
fn build_stored_zip(path: &Path, files: &[(&str, &[u8])]) {
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

#[test]
fn unpack_and_remember_replaces_expanded_files() {
	let root = work_dir("archive-fresh");
	let archive = root.join("initial.pak");
	let dest = root.join("mainTemp");
	let store = root.join("jsons/archive.json");
	let list = UnpackListKind::Main.list();

	build_stored_zip(
		&archive,
		&[
			("[media]\\classes\\trucks\\a.xml", b"first"),
			(EDITED_MARKER, b""),
		],
	);
	let first = unpack_and_remember(&archive, &list, &dest, None, &store, |_, _| {})
		.expect("первая распаковка");

	assert_eq!(first.report.files, 2);
	assert!(first.leftover.is_none());
	assert_eq!(
		fs::read(dest.join("[media]/classes/trucks/a.xml")).expect("файл первой версии"),
		b"first"
	);
	assert_eq!(
		integrity::check(Some(&archive), &store).state,
		ArchiveState::Ok
	);
	assert!(!has_staging(&root), "остался промежуточный каталог");

	build_stored_zip(&archive, &[("[media]\\classes\\trucks\\b.xml", b"second")]);
	unpack_and_remember(&archive, &list, &dest, None, &store, |_, _| {})
		.expect("вторая распаковка");

	assert!(
		!dest.join("[media]/classes/trucks/a.xml").exists(),
		"файл прежнего архива остался в mainTemp"
	);
	assert_eq!(
		fs::read(dest.join("[media]/classes/trucks/b.xml")).expect("файл второй версии"),
		b"second"
	);
	assert_eq!(
		integrity::check(Some(&archive), &store).state,
		ArchiveState::Ok
	);
	assert!(!has_staging(&root), "остался промежуточный каталог");

	let _ = fs::remove_dir_all(&root);
}

#[test]
fn unpack_fresh_keeps_previous_copy() {
	let root = work_dir("archive-previous");
	let archive = root.join("initial.pak");
	let dest = root.join("mainTemp");
	let previous = root.join("backups/previous_initial");
	let store = root.join("jsons/archive.json");
	let list = UnpackListKind::Main.list();

	build_stored_zip(&archive, &[("[media]\\classes\\trucks\\a.xml", b"old")]);
	unpack_and_remember(&archive, &list, &dest, None, &store, |_, _| {})
		.expect("первая распаковка");

	build_stored_zip(&archive, &[("[media]\\classes\\trucks\\b.xml", b"new")]);
	unpack_and_remember(&archive, &list, &dest, Some(&previous), &store, |_, _| {})
		.expect("вторая распаковка");

	assert_eq!(
		fs::read(previous.join("[media]/classes/trucks/a.xml")).expect("старая копия"),
		b"old"
	);
	assert_eq!(
		fs::read(dest.join("[media]/classes/trucks/b.xml")).expect("новая распаковка"),
		b"new"
	);
	assert!(
		!dest.join("[media]/classes/trucks/a.xml").exists(),
		"старый файл попал в новый mainTemp"
	);

	let _ = fs::remove_dir_all(&root);
}

#[test]
fn broken_archive_keeps_expanded_files() {
	let root = work_dir("archive-broken");
	let archive = root.join("initial.pak");
	let dest = root.join("mainTemp");
	let store = root.join("jsons/archive.json");
	let list = UnpackListKind::Main.list();

	build_stored_zip(&archive, &[("[media]\\classes\\trucks\\a.xml", b"first")]);
	unpack_and_remember(&archive, &list, &dest, None, &store, |_, _| {}).expect("распаковка");

	let before = fs::read(dest.join("[media]/classes/trucks/a.xml")).expect("прежний файл");
	fs::write(&archive, b"not a zip archive").expect("битый архив");

	assert!(
		unpack_and_remember(&archive, &list, &dest, None, &store, |_, _| {}).is_err(),
		"битый архив должен отвергаться"
	);
	assert_eq!(
		fs::read(dest.join("[media]/classes/trucks/a.xml")).expect("файлы целы"),
		before
	);
	assert!(!has_staging(&root), "остался промежуточный каталог");

	let _ = fs::remove_dir_all(&root);
}

#[test]
fn replacement_blocks_update_and_keeps_archive() {
	let root = work_dir("archive-replaced");
	let archive = root.join("initial.pak");
	let dest = root.join("mainTemp");
	let store = root.join("jsons/archive.json");
	let list = UnpackListKind::Main.list();

	build_stored_zip(&archive, &[("[media]\\classes\\trucks\\a.xml", b"first")]);
	unpack_and_remember(&archive, &list, &dest, None, &store, |_, _| {}).expect("распаковка");

	build_stored_zip(&archive, &[("[media]\\classes\\trucks\\a.xml", b"outside")]);
	let before = fs::read(&archive).expect("архив читается");

	assert!(matches!(
		integrity::require_unchanged(&archive, &store),
		Err(sxmle_app::archive::ArchiveError::Changed(_))
	));
	assert!(
		update_checked(&archive, &dest, &store).is_err(),
		"пересборка изменившегося архива запрещена"
	);
	assert_eq!(fs::read(&archive).expect("архив цел"), before);

	let _ = fs::remove_dir_all(&root);
}

#[test]
fn update_checked_refreshes_fingerprint() {
	let root = work_dir("archive-update");
	let archive = root.join("initial.pak");
	let dest = root.join("mainTemp");
	let store = root.join("jsons/archive.json");
	let list = UnpackListKind::Main.list();

	build_stored_zip(&archive, &[("[media]\\classes\\trucks\\a.xml", b"first")]);
	unpack_and_remember(&archive, &list, &dest, None, &store, |_, _| {}).expect("распаковка");

	let file = dest.join("[media]/classes/trucks/a.xml");
	fs::write(&file, b"edited").expect("правка файла");

	let result = update_checked(&archive, &dest, &store).expect("пересборка");
	assert_eq!(result.changed.len(), 1);
	assert_eq!(
		integrity::check(Some(&archive), &store).state,
		ArchiveState::Ok
	);
	assert!(
		integrity::require_unchanged(&archive, &store).is_ok(),
		"отпечаток пересобранного архива не принят"
	);
	assert!(integrity::check(Some(&archive), &store).marker_present);

	let _ = fs::remove_dir_all(&root);
}

#[test]
fn restore_backup_changes_or_keeps_state() {
	let root = work_dir("archive-restore");
	let archive = root.join("initial.pak");
	let backup = root.join("backups/initial.pak");
	let dest = root.join("mainTemp");
	let store = root.join("jsons/archive.json");
	let list = UnpackListKind::Main.list();

	build_stored_zip(&archive, &[("[media]\\classes\\trucks\\a.xml", b"first")]);
	unpack_and_remember(&archive, &list, &dest, None, &store, |_, _| {}).expect("распаковка");
	backup_file(&archive, &backup).expect("бэкап");

	let modified = fs::metadata(&archive)
		.expect("метаданные")
		.modified()
		.expect("время");
	restore_backup(&backup, &archive).expect("восстановление");
	// Копирование сохраняет содержимое, но не всегда время изменения файла.
	fs::File::options()
		.write(true)
		.open(&archive)
		.expect("архив открыт")
		.set_modified(modified)
		.expect("время восстановлено");
	assert_eq!(
		integrity::check(Some(&archive), &store).state,
		ArchiveState::Ok,
		"та же копия архива не должна требовать перечитывания"
	);

	build_stored_zip(&archive, &[("[media]\\classes\\trucks\\a.xml", b"other")]);
	backup_file(&archive, &backup).expect("новый бэкап");
	restore_backup(&backup, &archive).expect("восстановление другого архива");
	assert_eq!(
		integrity::check(Some(&archive), &store).state,
		ArchiveState::Changed
	);

	let _ = fs::remove_dir_all(&root);
}
