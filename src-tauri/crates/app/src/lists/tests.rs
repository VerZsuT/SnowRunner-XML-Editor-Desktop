//! Тесты модуля `lists`: избранное и изменённые файлы.

use super::*;

/// Уникальный каталог теста.
fn work_dir() -> PathBuf {
	crate::test_support::temp_dir("library")
}

/// Хранилище во временном каталоге.
fn library(dir: &Path) -> Library {
	Library::load(dir.join("favorites.json"), dir.join("edited.json"))
}

#[test]
fn переключает_избранное_и_сохраняет_файл() {
	let dir = work_dir();
	let mut items = library(&dir);

	assert!(items.toggle_favorite("ank_mk38").unwrap());
	assert!(items.is_favorite("ank_mk38"));
	assert_eq!(items.favorites(), ["ank_mk38"]);

	let reopened = library(&dir);

	assert!(reopened.is_favorite("ank_mk38"));

	assert!(!items.toggle_favorite("ank_mk38").unwrap());
	assert!(!items.is_favorite("ank_mk38"));
	assert!(library(&dir).favorites().is_empty());
}

#[test]
fn помечает_изменённый_файл_один_раз() {
	let dir = work_dir();
	let mut items = library(&dir);
	let file = EditedFile {
		name: "ank_mk38".to_owned(),
		is_trailer: false,
		dlc: Some("dlc_1".to_owned()),
		mod_name: None,
	};

	assert!(items.mark_edited(file.clone()).unwrap());
	assert!(!items.mark_edited(file).unwrap());
	assert_eq!(items.edited().len(), 1);
	assert_eq!(library(&dir).edited().len(), 1);
}

#[test]
fn сохраняет_поля_в_прежнем_формате() {
	let dir = work_dir();
	let path = dir.join("edited.json");

	fs::write(&path, r#"[{"name":"t","isTrailer":true,"mod":"my_mod"}]"#).unwrap();

	let items = library(&dir);

	assert_eq!(
		items.edited(),
		[EditedFile {
			name: "t".to_owned(),
			is_trailer: true,
			dlc: None,
			mod_name: Some("my_mod".to_owned()),
		}]
	);

	fs::write(&path, r#"[{"name":"t2"}]"#).unwrap();

	let reopened = library(&dir);

	assert_eq!(reopened.edited().len(), 1);
	assert!(!reopened.edited()[0].is_trailer);
}

#[test]
fn битый_файл_даёт_пустой_список() {
	let dir = work_dir();

	fs::write(dir.join("favorites.json"), "{").unwrap();

	assert!(library(&dir).favorites().is_empty());
}

#[test]
fn снимает_пометку_изменённого_файла() {
	let dir = work_dir();
	let mut items = library(&dir);

	items
		.mark_edited(EditedFile {
			name: "t".to_owned(),
			is_trailer: false,
			dlc: None,
			mod_name: None,
		})
		.unwrap();

	assert!(items.unmark_edited("t").unwrap());
	assert!(!items.unmark_edited("t").unwrap());
	assert!(library(&dir).edited().is_empty());
}
