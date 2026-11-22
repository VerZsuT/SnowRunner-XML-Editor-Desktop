//! Тесты модуля `updates`: версии, адреса и формат файлов обновления.

use super::*;

#[test]
fn сравнивает_версии() {
	assert_eq!(compare_versions("1.10.0", "1.9.0"), Ordering::Greater);
	assert_eq!(compare_versions("1.4.0", "1.4.0"), Ordering::Equal);
	assert_eq!(compare_versions("1.4.0", "1.4.1"), Ordering::Less);
	assert_eq!(compare_versions("v1.4.0", "1.4.0"), Ordering::Equal);
	assert_eq!(compare_versions("1.4.0-beta", "1.4.0"), Ordering::Less);
	assert_eq!(compare_versions("1.4.0", "1.4.0-beta"), Ordering::Greater);
	assert_eq!(
		compare_versions("1.4.0-beta.2", "1.4.0-beta.1"),
		Ordering::Greater
	);
	assert_eq!(
		compare_versions("1.4.0-beta.10", "1.4.0-beta.2"),
		Ordering::Greater
	);
}

#[test]
fn проверяет_формат_версии() {
	assert!(is_valid_version("1.4.0"));
	assert!(is_valid_version("1.4.0-beta.1"));
	assert!(is_valid_version("1.4.0-rc_1"));

	assert!(!is_valid_version("1.4"));
	assert!(!is_valid_version("1.4.0.1"));
	assert!(!is_valid_version("1.4.0/../x"));
	assert!(!is_valid_version("v1.4.0"));
	assert!(!is_valid_version("1.4.0 beta"));
}

#[test]
fn строит_адрес_обновления() {
	assert_eq!(
		download_url("https://example.com/releases", "1.5.0", false).unwrap(),
		"https://example.com/releases/v1.5.0/SnowRunnerXMLEditor.exe"
	);
	assert_eq!(
		download_url("https://example.com/releases/", "1.5.0", true).unwrap(),
		"https://example.com/releases/v1.5.0/SnowRunnerXMLEditor.zip"
	);
	assert!(download_url("https://example.com", "../1.5.0", false).is_err());
	assert!(download_url("http://example.com", "1.5.0", false).is_err());
}

#[test]
#[ignore = "нужен доступ к сайту проекта"]
fn читает_версию_с_сайта() {
	let url = format!("{}/version-info.json", crate::paths::PAGES_URL);
	let version = fetch_latest_version(&url).unwrap();

	assert!(is_valid_version(&version));
}

#[test]
fn выбирает_имя_файла() {
	assert_eq!(file_name(false), "SnowRunnerXMLEditor.exe");
	assert_eq!(file_name(true), "SnowRunnerXMLEditor.zip");
}
