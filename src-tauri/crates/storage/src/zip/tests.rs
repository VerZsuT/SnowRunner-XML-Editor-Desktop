//! Тесты zip-слоя: синтетические архивы и реальная фикстура initial.pak.
//!
//! Каталог initialpak/ в .gitignore, поэтому интеграционные тесты на фикстуре
//! пропускаются, если её нет; синтетические тесты работают всегда.

use std::fs;
use std::path::{Path, PathBuf};
use std::sync::atomic::{AtomicU64, Ordering};

use crc32fast::hash as crc32;

use super::entry::EntryMeta;
use super::reader::MAX_ENTRY_SIZE;
use super::{ArchiveUpdate, ZipArchive, ZipError, read_entries, update};

/// Счётчик уникальных рабочих каталогов.
static COUNTER: AtomicU64 = AtomicU64::new(0);

/// Путь к фикстуре архива.
fn fixture() -> PathBuf {
	Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../initialpak/initial.pak")
}

/// Корень временных каталогов тестов внутри target.
fn work_root() -> PathBuf {
	Path::new(env!("CARGO_MANIFEST_DIR")).join("../../target/zip-tests")
}

/// Временный каталог теста, удаляемый при выходе.
struct TempDir {
	path: PathBuf,
}

impl TempDir {
	/// Создать уникальный каталог для теста.
	fn new(name: &str) -> Self {
		let id = COUNTER.fetch_add(1, Ordering::Relaxed);
		let path = work_root().join(format!("{name}-{}-{id}", std::process::id()));
		let _ = fs::remove_dir_all(&path);
		fs::create_dir_all(&path).expect("не удалось создать временный каталог");
		Self { path }
	}

	/// Путь каталога.
	fn path(&self) -> &Path {
		&self.path
	}
}

impl Drop for TempDir {
	fn drop(&mut self) {
		let _ = fs::remove_dir_all(&self.path);
	}
}

/// Проверить наличие фикстуры; если её нет, тест пропускается.
fn fixture_available() -> bool {
	if fixture().is_file() {
		return true;
	}
	eprintln!("фикстура отсутствует, тест пропущен");
	false
}

/// Скопировать фикстуру в каталог теста.
fn copy_fixture(dir: &Path, name: &str) -> PathBuf {
	let path = dir.join(name);
	fs::copy(fixture(), &path).expect("не удалось скопировать фикстуру");
	path
}

/// Найти запись, которую можно изменить в тесте.
fn editable_entry(archive: &ZipArchive) -> String {
	let preferred = "[media]\\_templates\\environment.xml";
	if archive.entry(preferred).is_some() {
		return preferred.to_owned();
	}
	archive
		.entries()
		.iter()
		.find(|entry| {
			entry.method == 8
				&& entry.name.starts_with("[media]\\classes\\")
				&& entry.name.ends_with(".xml")
		})
		.map(|entry| entry.name.clone())
		.expect("в архиве нет подходящей deflate-записи XML")
}

/// Рекурсивно посчитать файлы в каталоге.
fn count_files(root: &Path) -> usize {
	let mut count = 0;
	for entry in fs::read_dir(root).expect("каталог должен читаться") {
		let entry = entry.expect("элемент каталога должен читаться");
		let metadata = entry.metadata().expect("метаданные должны читаться");
		if metadata.is_dir() {
			count += count_files(&entry.path());
		} else {
			count += 1;
		}
	}
	count
}

/// Открытие фикстуры: число записей, имена, методы, офсеты.
#[test]
fn opens_fixture() {
	if !fixture_available() {
		return;
	}
	let archive = ZipArchive::open(fixture()).expect("фикстура должна открываться");
	let entries = archive.entries();
	assert_eq!(entries.len(), 12_171, "неожиданное число записей");
	assert_eq!(entries[0].name, "pak.load_list", "первая запись другая");
	for entry in entries {
		assert!(
			entry.method == 0 || entry.method == 8,
			"неизвестный метод {} у записи {}",
			entry.method,
			entry.name
		);
	}
	let mut previous = 0u64;
	for entry in entries {
		assert!(
			entry.data_offset > previous,
			"данные записи {} идут не по возрастанию",
			entry.name
		);
		previous = entry.data_offset;
	}
	let last = entries.last().expect("архив не должен быть пустым");
	assert!(
		last.data_offset + last.compressed_size <= archive.central_directory_offset(),
		"последняя запись выходит за central directory"
	);
	assert_eq!(
		last.data_offset + last.compressed_size,
		archive.central_directory_offset(),
		"между данными и central directory есть разрыв"
	);
	// В фикстуре после EOCD идёт нулевое дополнение, поэтому проверяем границу.
	assert!(
		archive.central_directory_offset() + archive.central_directory_size() < archive.file_size(),
		"central directory не сходится с EOCD"
	);
}

/// Чтение записей: манифест и первая deflate-запись.
#[test]
fn reads_entries() {
	if !fixture_available() {
		return;
	}
	let archive = ZipArchive::open(fixture()).expect("фикстура должна открываться");
	let manifest = archive
		.entry("pak.load_list")
		.expect("манифест должен быть в архиве");
	assert_eq!(manifest.uncompressed_size, 2_578_963);
	assert_eq!(manifest.method, 0);
	let data = archive
		.read(manifest)
		.expect("манифест должен распаковываться");
	assert_eq!(data.len() as u64, manifest.uncompressed_size);
	assert_eq!(crc32(&data), manifest.crc32, "CRC манифеста не совпал");

	let deflated = archive
		.entries()
		.iter()
		.find(|entry| entry.method == 8)
		.expect("в архиве должна быть deflate-запись");
	let data = archive
		.read(deflated)
		.expect("deflate-запись должна распаковываться");
	assert_eq!(data.len() as u64, deflated.uncompressed_size);
	assert_eq!(crc32(&data), deflated.crc32, "CRC deflate-записи не совпал");

	let compressed = archive
		.read_compressed(deflated)
		.expect("сжатые данные должны читаться");
	assert_eq!(compressed.len() as u64, deflated.compressed_size);
}

/// Обновление копии архива: правка XML и маркер edited.
#[test]
fn updates_archive() {
	if !fixture_available() {
		return;
	}
	let dir = TempDir::new("update");
	let original_path = copy_fixture(dir.path(), "original.pak");
	let archive_path = copy_fixture(dir.path(), "initial.pak");
	let original = ZipArchive::open(&original_path).expect("исходный архив должен открываться");
	let names: Vec<String> = original
		.entries()
		.iter()
		.map(|entry| entry.name.clone())
		.collect();
	let target_name = editable_entry(&original);
	let changed_index = names
		.iter()
		.position(|name| name == &target_name)
		.expect("изменяемая запись должна быть в архиве");
	let target = original
		.entry(&target_name)
		.expect("изменяемая запись должна быть в архиве")
		.clone();
	let target_method = target.method;
	let original_data = original
		.read(&target)
		.expect("изменяемая запись должна читаться");
	let mut changed_data = original_data.clone();
	changed_data.extend_from_slice(b"\r\n<!-- sxmle zip test -->\r\n");
	let size_before = original.file_size();
	let request = ArchiveUpdate {
		changed: vec![(target_name.clone(), changed_data.clone())],
		appended: vec![("edited".to_owned(), Vec::new())],
	};
	let report = update(&archive_path, &request).expect("архив должен обновляться");
	assert_eq!(report.copied, names.len() - 1);
	assert_eq!(report.recompressed, 1);
	assert_eq!(report.added, 1);
	assert_eq!(report.size_before, size_before);

	let rebuilt = ZipArchive::open(&archive_path).expect("пересобранный архив должен открываться");
	assert_eq!(rebuilt.entries().len(), names.len() + 1);
	for (index, name) in names.iter().enumerate() {
		assert_eq!(
			&rebuilt.entries()[index].name,
			name,
			"порядок записей изменился на позиции {index}"
		);
	}
	let appended = rebuilt
		.entries()
		.last()
		.expect("архив не должен быть пустым");
	assert_eq!(appended.name, "edited");
	assert_eq!(appended.uncompressed_size, 0);
	assert!(
		rebuilt
			.read(appended)
			.expect("маркер должен читаться")
			.is_empty(),
		"маркер edited должен быть пустым"
	);

	for (index, entry) in original.entries().iter().enumerate() {
		if index == changed_index {
			continue;
		}
		let before = original
			.read_compressed(entry)
			.expect("исходные сжатые данные должны читаться");
		let after = rebuilt
			.read_compressed(&rebuilt.entries()[index])
			.expect("новые сжатые данные должны читаться");
		assert_eq!(
			before, after,
			"сжатые данные записи {} изменились",
			entry.name
		);
	}

	let changed_entry = rebuilt
		.entry(&target_name)
		.expect("изменённая запись должна остаться в архиве");
	assert_eq!(
		changed_entry.method, target_method,
		"метод записи не сохранён"
	);
	assert_eq!(
		rebuilt
			.read(changed_entry)
			.expect("изменённая запись должна читаться"),
		changed_data
	);

	for entry in rebuilt.entries() {
		let data = rebuilt
			.read(entry)
			.unwrap_or_else(|error| panic!("запись {} не распаковывается: {error}", entry.name));
		assert_eq!(data.len() as u64, entry.uncompressed_size);
		assert_eq!(
			crc32(&data),
			entry.crc32,
			"CRC записи {} не совпал",
			entry.name
		);
	}

	let expected_size: u64 = rebuilt
		.entries()
		.iter()
		.map(|entry| 30 + entry.name.len() as u64 + entry.compressed_size)
		.sum::<u64>()
		+ rebuilt
			.entries()
			.iter()
			.map(|entry| 46 + entry.name.len() as u64)
			.sum::<u64>()
		+ 22;
	let actual_size = fs::metadata(&archive_path)
		.expect("пересобранный архив должен существовать")
		.len();
	assert_eq!(
		actual_size, expected_size,
		"размер архива не равен сумме частей"
	);
	assert_eq!(report.size_after, expected_size);
	// Закрываем дескрипторы до удаления временного каталога (Windows).
	drop(original);
	drop(rebuilt);
}

/// Распаковка по фильтру имён.
#[test]
fn extracts_selected_entries() {
	if !fixture_available() {
		return;
	}
	let archive = ZipArchive::open(fixture()).expect("фикстура должна открываться");
	let prefix = "[media]\\_templates\\";
	let expected: Vec<EntryMeta> = archive
		.entries()
		.iter()
		.filter(|entry| entry.name.starts_with(prefix))
		.cloned()
		.collect();
	assert!(
		!expected.is_empty(),
		"в архиве нет записей с префиксом {prefix}"
	);
	let dir = TempDir::new("extract");
	let destination = dir.path().join("out");
	let mut progress = Vec::new();
	let report = archive
		.extract_selected(
			|entry| entry.name.starts_with(prefix),
			&destination,
			|done, total| progress.push((done, total)),
		)
		.expect("распаковка должна проходить");
	assert_eq!(report.files, expected.len());
	assert_eq!(
		report.bytes,
		expected
			.iter()
			.map(|entry| entry.uncompressed_size)
			.sum::<u64>()
	);
	assert_eq!(
		progress.last().copied(),
		Some((expected.len(), expected.len())),
		"прогресс не дошёл до конца"
	);
	for entry in &expected {
		let path = entry
			.name
			.split(['\\', '/'])
			.fold(destination.clone(), |path, part| path.join(part));
		let metadata = fs::metadata(&path)
			.unwrap_or_else(|error| panic!("файл {} не создан: {error}", entry.name));
		assert!(metadata.is_file());
		assert_eq!(metadata.len(), entry.uncompressed_size);
		let data = fs::read(&path).expect("файл должен читаться");
		assert_eq!(crc32(&data), entry.crc32);
	}
	assert_eq!(
		count_files(&destination),
		expected.len(),
		"созданы лишние файлы"
	);
}

/// Независимая проверка пересобранного архива валидатором WinRAR.
#[test]
#[ignore = "требует WinRAR.exe из бандла проекта"]
fn rebuilt_archive_passes_winrar_test() {
	if !fixture_available() {
		return;
	}
	let winrar = Path::new(env!("CARGO_MANIFEST_DIR"))
		.join("../../../src/modules/archiver/main/archiver/files/WinRAR.exe");
	if !winrar.is_file() {
		println!("WinRAR.exe не найден: {}; тест пропущен", winrar.display());
		return;
	}
	let dir = TempDir::new("winrar");
	let archive_path = copy_fixture(dir.path(), "initial.pak");
	let source = ZipArchive::open(&archive_path).expect("архив должен открываться");
	let target_name = editable_entry(&source);
	let target = source
		.entry(&target_name)
		.expect("изменяемая запись должна быть в архиве")
		.clone();
	let mut data = source
		.read(&target)
		.expect("изменяемая запись должна читаться");
	data.extend_from_slice(b"\r\n<!-- sxmle winrar test -->\r\n");
	drop(source);
	let request = ArchiveUpdate {
		changed: vec![(target_name, data)],
		appended: vec![("edited".to_owned(), Vec::new())],
	};
	let report = update(&archive_path, &request).expect("архив должен обновляться");
	let output = std::process::Command::new(&winrar)
		.arg("t")
		.arg(&archive_path)
		.output()
		.expect("WinRAR должен запускаться");
	println!(
		"WinRAR t: код {:?}, архив {} байт (было {})",
		output.status.code(),
		report.size_after,
		report.size_before
	);
	println!("stdout: {}", String::from_utf8_lossy(&output.stdout));
	println!("stderr: {}", String::from_utf8_lossy(&output.stderr));
	assert_eq!(
		output.status.code(),
		Some(0),
		"WinRAR не подтвердил целостность архива"
	);
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
	build_zip(path, files, 0, None);
}

/// Собрать zip с заданными флагами и объявленным размером записей.
fn build_zip(path: &Path, files: &[(&str, &[u8])], flags: u16, uncompressed: Option<u32>) {
	let mut data = Vec::new();
	let mut central = Vec::new();
	for (name, content) in files {
		let offset = data.len() as u32;
		let crc = crc32(content);
		let compressed = content.len() as u32;
		let size = uncompressed.unwrap_or(compressed);
		let name_bytes = name.as_bytes();
		let name_length = name_bytes.len() as u16;
		// Локальный заголовок.
		put_u32(&mut data, 0x0403_4b50);
		put_u16(&mut data, 10);
		put_u16(&mut data, flags);
		put_u16(&mut data, 0);
		put_u16(&mut data, 0);
		put_u16(&mut data, 0);
		put_u32(&mut data, crc);
		put_u32(&mut data, compressed);
		put_u32(&mut data, size);
		put_u16(&mut data, name_length);
		put_u16(&mut data, 0);
		data.extend_from_slice(name_bytes);
		data.extend_from_slice(content);
		// Запись central directory.
		put_u32(&mut central, 0x0201_4b50);
		put_u16(&mut central, 0x031E);
		put_u16(&mut central, 10);
		put_u16(&mut central, flags);
		put_u16(&mut central, 0);
		put_u16(&mut central, 0);
		put_u16(&mut central, 0);
		put_u32(&mut central, crc);
		put_u32(&mut central, compressed);
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
	fs::write(path, data).expect("синтетический архив должен записываться");
}

/// Разбор только central directory совпадает с полным открытием архива.
#[test]
fn reads_central_directory_without_local_headers() {
	let dir = TempDir::new("entries");
	let path = dir.path().join("entries.pak");
	build_stored_zip(&path, &[("[media]\\a.txt", b"alpha"), ("b.bin", b"")]);

	let opened = ZipArchive::open(&path).expect("архив должен открываться");
	let entries = read_entries(&path).expect("central directory должна читаться");

	assert_eq!(entries.len(), opened.entries().len());
	assert_eq!(entries[0].name, "[media]\\a.txt");
	assert_eq!(entries[0].crc32, crc32(b"alpha"));
	assert_eq!(entries[0].uncompressed_size, 5);
	for (entry, opened) in entries.iter().zip(opened.entries()) {
		assert_eq!(entry.name, opened.name);
		assert_eq!(entry.method, opened.method);
		assert_eq!(entry.crc32, opened.crc32);
		assert_eq!(entry.compressed_size, opened.compressed_size);
		assert_eq!(entry.uncompressed_size, opened.uncompressed_size);
		assert_eq!(entry.local_header_offset, opened.local_header_offset);
		assert_eq!(entry.data_offset, 0, "локальные заголовки не читаются");
	}
	assert!(read_entries(dir.path().join("missing.pak")).is_err());
	drop(opened);
}

/// Синтетический архив: чтение, обновление, распаковка без фикстуры.
#[test]
fn round_trips_synthetic_archive() {
	let dir = TempDir::new("synthetic");
	let path = dir.path().join("synthetic.pak");
	build_stored_zip(&path, &[("[media]\\a.txt", b"alpha"), ("b.bin", b"")]);

	let archive = ZipArchive::open(&path).expect("синтетический архив должен открываться");
	assert_eq!(archive.entries().len(), 2);
	assert_eq!(archive.entries()[0].name, "[media]\\a.txt");
	assert_eq!(archive.entries()[0].method, 0);
	let alpha = archive
		.entry("[media]\\a.txt")
		.expect("запись должна быть в архиве");
	assert_eq!(
		archive.read(alpha).expect("запись должна читаться"),
		b"alpha".to_vec()
	);

	let request = ArchiveUpdate {
		changed: vec![("b.bin".to_owned(), b"beta".to_vec())],
		appended: vec![("edited".to_owned(), Vec::new())],
	};
	let size_before = fs::metadata(&path)
		.expect("архив должен существовать")
		.len();
	drop(archive);
	let report = update(&path, &request).expect("синтетический архив должен обновляться");
	assert_eq!(report.copied, 1);
	assert_eq!(report.recompressed, 1);
	assert_eq!(report.added, 1);
	assert_eq!(report.size_before, size_before);

	let rebuilt = ZipArchive::open(&path).expect("пересобранный архив должен открываться");
	assert_eq!(rebuilt.entries().len(), 3);
	assert_eq!(rebuilt.entries()[0].name, "[media]\\a.txt");
	let beta = rebuilt.entry("b.bin").expect("запись должна остаться");
	assert_eq!(beta.method, 0, "метод stored не сохранён");
	assert_eq!(
		rebuilt.read(beta).expect("запись должна читаться"),
		b"beta".to_vec()
	);
	let marker = rebuilt
		.entries()
		.last()
		.expect("архив не должен быть пустым");
	assert_eq!(marker.name, "edited");
	assert!(
		rebuilt
			.read(marker)
			.expect("маркер должен читаться")
			.is_empty()
	);

	let destination = dir.path().join("out");
	let extracted = rebuilt
		.extract_selected(|_| true, &destination, |_, _| {})
		.expect("распаковка должна проходить");
	assert_eq!(extracted.files, 3);
	assert_eq!(
		fs::read(destination.join("[media]").join("a.txt")).expect("файл должен читаться"),
		b"alpha".to_vec()
	);
	drop(rebuilt);
}

/// Отказ от шифрованных записей и записей больше предела чтения.
#[test]
fn rejects_encrypted_and_oversized_entries() {
	let dir = TempDir::new("limits");

	let encrypted = dir.path().join("encrypted.pak");
	build_zip(&encrypted, &[("a.txt", b"a")], 1, None);
	assert!(
		matches!(ZipArchive::open(&encrypted), Err(ZipError::Unsupported(_))),
		"шифрованная запись должна отвергаться"
	);

	let oversized = dir.path().join("oversized.pak");
	build_zip(
		&oversized,
		&[("big.bin", b"small")],
		0,
		Some(u32::try_from(MAX_ENTRY_SIZE + 1).unwrap()),
	);
	let archive = ZipArchive::open(&oversized).expect("архив должен открываться");
	let entry = archive
		.entry("big.bin")
		.expect("запись должна быть в архиве");
	assert!(
		matches!(archive.read(entry), Err(ZipError::Unsupported(_))),
		"запись больше предела не должна читаться в память"
	);
	assert!(
		matches!(
			archive.read_compressed(entry),
			Err(ZipError::Unsupported(_))
		),
		"сжатые данные слишком большой записи тоже не читаются"
	);
}

/// Отказ от zip64 и повреждённых архивов до любой записи.
#[test]
fn rejects_zip64_and_broken_archives() {
	let dir = TempDir::new("zip64");
	let zip64 = dir.path().join("zip64.pak");
	let mut data = Vec::new();
	put_u32(&mut data, 0x0605_4b50);
	put_u16(&mut data, 0);
	put_u16(&mut data, 0);
	put_u16(&mut data, u16::MAX);
	put_u16(&mut data, u16::MAX);
	put_u32(&mut data, u32::MAX);
	put_u32(&mut data, u32::MAX);
	put_u16(&mut data, 0);
	fs::write(&zip64, data).expect("заглушка zip64 должна записываться");
	assert!(
		matches!(ZipArchive::open(&zip64), Err(ZipError::Unsupported(_))),
		"zip64 должен отвергаться"
	);

	let broken = dir.path().join("broken.pak");
	fs::write(&broken, b"not a zip archive").expect("файл должен записываться");
	assert!(
		matches!(ZipArchive::open(&broken), Err(ZipError::Malformed(_))),
		"файл без EOCD должен отвергаться"
	);

	// EOCD объявляет central directory, которой нет в файле.
	let truncated = dir.path().join("truncated.pak");
	let mut data = Vec::new();
	put_u32(&mut data, 0x0605_4b50);
	put_u16(&mut data, 0);
	put_u16(&mut data, 0);
	put_u16(&mut data, 1);
	put_u16(&mut data, 1);
	put_u32(&mut data, 46);
	put_u32(&mut data, 0);
	put_u16(&mut data, 0);
	fs::write(&truncated, data).expect("файл должен записываться");
	assert!(
		matches!(ZipArchive::open(&truncated), Err(ZipError::Malformed(_))),
		"central directory за пределами файла должна отвергаться"
	);

	// Изменение несуществующей записи отвергается до записи на диск.
	let archive = dir.path().join("valid.pak");
	build_stored_zip(&archive, &[("a.txt", b"a")]);
	let request = ArchiveUpdate {
		changed: vec![("missing.txt".to_owned(), b"x".to_vec())],
		appended: Vec::new(),
	};
	let before = fs::metadata(&archive)
		.expect("архив должен существовать")
		.len();
	assert!(matches!(
		update(&archive, &request),
		Err(ZipError::EntryNotFound(_))
	));
	assert_eq!(
		fs::metadata(&archive)
			.expect("архив должен существовать")
			.len(),
		before,
		"исходный архив изменился при ошибке"
	);
	assert!(
		!dir.path().join("valid.pak.tmp").exists(),
		"временный файл остался"
	);
}
