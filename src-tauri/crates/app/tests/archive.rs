//! Тесты сценариев работы с архивом: на синтетике и на фикстуре `initial.pak`.

use std::fs;
use std::path::{Path, PathBuf};

use sxmle_app::archive::{
	EDITED_MARKER, UnpackList, UnpackListKind, backup_file, find_initial, unpack, update_from_dir,
	verify,
};
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

	let verified = verify(&archive_path, |_, _| {}).expect("проверка архива");
	assert_eq!(
		verified.entries,
		reopened
			.entries()
			.iter()
			.filter(|entry| !entry.is_directory())
			.count()
	);
	assert!(verified.bytes > 0);

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
	assert_eq!(backup_file(&backup, &target).expect("восстановление"), 4);
	assert_eq!(fs::read(&target).expect("чтение"), b"data");

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
