//! Тесты модуля `game`: файлы игры, DLC и моды.

use super::*;

/// Каталоги-заглушки.
fn dirs() -> GameDirs {
	GameDirs {
		root: PathBuf::from("game"),
		classes: PathBuf::from("game/classes"),
		templates: PathBuf::from("game/_templates"),
		dlc: PathBuf::from("game/_dlc"),
		mods: PathBuf::from("game/mods"),
	}
}

#[test]
fn кандидаты_идут_по_приоритету() {
	let files = GameFiles {
		dirs: dirs(),
		dlcs: vec!["dlc_1".to_owned(), "dlc_2".to_owned()],
		mod_name: Some("my_mod".to_owned()),
	};
	let candidates = files.candidates("trucks", "ank_mk38");

	assert_eq!(
		candidates,
		[
			PathBuf::from("game/_dlc/dlc_2/classes/trucks/ank_mk38.xml"),
			PathBuf::from("game/_dlc/dlc_1/classes/trucks/ank_mk38.xml"),
			PathBuf::from("game/mods/my_mod/classes/trucks/ank_mk38.xml"),
			PathBuf::from("game/classes/trucks/ank_mk38.xml"),
		]
	);
}

#[test]
fn источник_определяется_по_каталогу() {
	let files = GameFiles {
		dirs: dirs(),
		dlcs: vec!["dlc_1".to_owned()],
		mod_name: Some("my_mod".to_owned()),
	};

	assert_eq!(
		files.source_of(Path::new("game/_dlc/dlc_1/classes/trucks/t.xml")),
		(Some("dlc_1".to_owned()), None)
	);
	assert_eq!(
		files.source_of(Path::new("game/classes/trucks/t.xml")),
		(None, None)
	);
}

#[test]
fn отклоняет_путь_вместо_имени_файла() {
	let files = GameFiles {
		dirs: dirs(),
		dlcs: Vec::new(),
		mod_name: None,
	};

	assert!(files.candidates("trucks", "../outside").is_empty());
	assert!(files.candidates("trucks", "dir/truck").is_empty());
	assert!(files.candidates("trucks", r"dir\truck").is_empty());
	assert!(files.candidates("trucks", "C:truck").is_empty());
	assert!(files.candidates("trucks", "").is_empty());
	assert!(files.candidates("trucks", "..").is_empty());

	let files = GameFiles {
		mod_name: Some("../outside".to_owned()),
		..files
	};

	assert!(files.candidates("trucks", "truck").is_empty());
}

#[test]
fn без_мода_кандидаты_короче() {
	let files = GameFiles {
		dirs: dirs(),
		dlcs: Vec::new(),
		mod_name: None,
	};

	assert_eq!(
		files.candidates("engines", "e_us_truck_old"),
		[PathBuf::from("game/classes/engines/e_us_truck_old.xml")]
	);
}
