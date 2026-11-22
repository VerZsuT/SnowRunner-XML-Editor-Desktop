//! Проверка обновлений программы и загрузка установщика.

use std::cmp::Ordering;
use std::fs::{self, File};
use std::io::{self, Read, Write};
use std::path::{Path, PathBuf};
use std::time::Duration;

use serde::Deserialize;
use thiserror::Error;

/// Таймаут запроса сведений об обновлениях.
const INFO_TIMEOUT: Duration = Duration::from_secs(10);

/// Таймаут установки соединения при загрузке файла.
const CONNECT_TIMEOUT: Duration = Duration::from_secs(30);

/// Общий таймаут загрузки файла.
const DOWNLOAD_TIMEOUT: Duration = Duration::from_secs(10 * 60);

/// Максимальный размер ответа со сведениями об обновлениях.
const MAX_INFO_BYTES: u64 = 64 * 1024;

/// Размер блока чтения при загрузке.
const CHUNK_SIZE: usize = 64 * 1024;

/// Сведения об обновлениях, опубликованные на сайте проекта.
#[derive(Debug, Deserialize)]
struct PublicInfo {
	#[serde(rename = "latestVersion")]
	latest_version: String,
}

/// Ошибка проверки обновлений или загрузки установщика.
#[derive(Debug, Error)]
pub enum UpdateError {
	/// Адрес обновления не является HTTPS.
	#[error("некорректный адрес обновления: {0}")]
	InvalidUrl(String),

	/// Версия программы не соответствует формату.
	#[error("некорректная версия программы: {0}")]
	InvalidVersion(String),

	/// Сетевой запрос завершился ошибкой.
	#[error("ошибка сети: {0}")]
	Request(#[from] reqwest::Error),

	/// Сервер вернул ошибочный статус.
	#[error("сервер обновлений вернул HTTP {0}")]
	Http(u16),

	/// Ответ со сведениями об обновлениях слишком большой.
	#[error("ответ со сведениями об обновлении слишком большой")]
	TooLarge,

	/// В ответе нет номера версии.
	#[error("в ответе нет версии программы")]
	MissingVersion,

	/// Сведения об обновлении не разобраны.
	#[error("ошибка разбора сведений об обновлении: {0}")]
	Json(#[from] serde_json::Error),

	/// Файл не прочитан или не записан.
	#[error("ошибка файловой системы {path}: {source}")]
	Io {
		/// Путь, к которому относится ошибка.
		path: PathBuf,

		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},
}

/// Сравнивает версии вида `major.minor.patch[-prerelease]`.
///
/// Правила совпадают с прежней реализацией интерфейса: числовые части
/// сравниваются как числа, версия без суффикса новее версии с суффиксом,
/// сегменты суффикса — по одному (`beta.2` новее `beta.1`).
pub fn compare_versions(left: &str, right: &str) -> Ordering {
	let left = Version::parse(left);
	let right = Version::parse(right);
	let length = left.numbers.len().max(right.numbers.len());

	for index in 0..length {
		let order = left.number(index).cmp(&right.number(index));

		if order != Ordering::Equal {
			return order;
		}
	}

	match (left.parts.is_empty(), right.parts.is_empty()) {
		(true, true) => return Ordering::Equal,
		(true, false) => return Ordering::Greater,
		(false, true) => return Ordering::Less,
		(false, false) => {}
	}

	for index in 0..left.parts.len().max(right.parts.len()) {
		let order = match (left.parts.get(index), right.parts.get(index)) {
			(Some(left), Some(right)) => left.compare(right),
			(Some(_), None) => Ordering::Greater,
			(None, Some(_)) => Ordering::Less,
			(None, None) => Ordering::Equal,
		};

		if order != Ordering::Equal {
			return order;
		}
	}

	Ordering::Equal
}

/// Проверяет, что загруженная версия безопасна для подстановки в адрес.
pub fn is_valid_version(version: &str) -> bool {
	let (core, suffix) = version.split_once('-').unwrap_or((version, ""));
	let mut numbers = core.split('.');

	for _ in 0..3 {
		match numbers.next() {
			Some(part) if !part.is_empty() && part.bytes().all(|byte| byte.is_ascii_digit()) => {}
			_ => return false,
		}
	}

	if numbers.next().is_some() {
		return false;
	}

	suffix
		.bytes()
		.all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'-' | b'_' | b'.'))
}

/// Читает последнюю версию программы с сайта проекта.
pub fn fetch_latest_version(url: &str) -> Result<String, UpdateError> {
	check_url(url)?;

	let response = reqwest::blocking::Client::builder()
		.timeout(INFO_TIMEOUT)
		.user_agent(user_agent())
		.build()?
		.get(url)
		.send()?;
	let status = response.status();

	if !status.is_success() {
		return Err(UpdateError::Http(status.as_u16()));
	}

	let mut body = Vec::new();

	response
		.take(MAX_INFO_BYTES + 1)
		.read_to_end(&mut body)
		.map_err(|source| UpdateError::Io {
			path: PathBuf::from(url),
			source,
		})?;

	if body.len() as u64 > MAX_INFO_BYTES {
		return Err(UpdateError::TooLarge);
	}

	let text = String::from_utf8(body).map_err(|_| UpdateError::MissingVersion)?;
	let info: PublicInfo = serde_json::from_str(&text)?;
	let version = info.latest_version.trim();

	if version.is_empty() {
		return Err(UpdateError::MissingVersion);
	}

	Ok(version.to_owned())
}

/// Загружает файл по HTTPS, сообщая о прогрессе.
pub fn download(
	url: &str,
	target: &Path,
	mut on_progress: impl FnMut(u64, Option<u64>),
) -> Result<u64, UpdateError> {
	check_url(url)?;

	let mut response = reqwest::blocking::Client::builder()
		.connect_timeout(CONNECT_TIMEOUT)
		.timeout(DOWNLOAD_TIMEOUT)
		.user_agent(user_agent())
		.build()?
		.get(url)
		.send()?;
	let status = response.status();

	if !status.is_success() {
		return Err(UpdateError::Http(status.as_u16()));
	}

	let total = response.content_length();

	if let Some(parent) = target.parent() {
		fs::create_dir_all(parent).map_err(|source| UpdateError::Io {
			path: parent.to_path_buf(),
			source,
		})?;
	}

	let mut file = File::create(target).map_err(|source| UpdateError::Io {
		path: target.to_path_buf(),
		source,
	})?;
	let result = copy_stream(&mut response, &mut file, target, total, &mut on_progress);

	match result {
		Ok(downloaded) => {
			file.sync_all().map_err(|source| UpdateError::Io {
				path: target.to_path_buf(),
				source,
			})?;

			Ok(downloaded)
		}
		Err(error) => {
			drop(file);
			let _ = fs::remove_file(target);

			Err(error)
		}
	}
}

/// Имя файла обновления: установщик или портативный архив.
pub fn file_name(portable: bool) -> &'static str {
	if portable {
		"SnowRunnerXMLEditor.zip"
	} else {
		"SnowRunnerXMLEditor.exe"
	}
}

/// Адрес файла обновления версии.
pub fn download_url(base: &str, version: &str, portable: bool) -> Result<String, UpdateError> {
	check_url(base)?;

	if !is_valid_version(version) {
		return Err(UpdateError::InvalidVersion(version.to_owned()));
	}

	Ok(format!(
		"{}/v{version}/{}",
		base.trim_end_matches('/'),
		file_name(portable)
	))
}

/// Загружает установщик или портативный архив в каталог обновлений.
pub fn download_update(
	base: &str,
	version: &str,
	dir: &Path,
	portable: bool,
	on_progress: impl FnMut(u64, Option<u64>),
) -> Result<PathBuf, UpdateError> {
	let url = download_url(base, version, portable)?;
	let target = dir.join(file_name(portable));

	download(&url, &target, on_progress)?;

	Ok(target)
}

/// Пользовательский агент запросов обновления.
fn user_agent() -> String {
	format!("SnowRunner-XML-Editor/{}", env!("CARGO_PKG_VERSION"))
}

/// Проверяет, что загружать можно только по HTTPS.
fn check_url(url: &str) -> Result<(), UpdateError> {
	match url.strip_prefix("https://") {
		Some(rest) if !rest.is_empty() => Ok(()),
		_ => Err(UpdateError::InvalidUrl(url.to_owned())),
	}
}

/// Переписывает поток ответа в файл.
fn copy_stream(
	source: &mut impl Read,
	target: &mut impl Write,
	path: &Path,
	total: Option<u64>,
	on_progress: &mut impl FnMut(u64, Option<u64>),
) -> Result<u64, UpdateError> {
	let mut buffer = vec![0u8; CHUNK_SIZE];
	let mut downloaded = 0u64;
	let io_error = |source| UpdateError::Io {
		path: path.to_path_buf(),
		source,
	};

	on_progress(downloaded, total);

	loop {
		let read = source.read(&mut buffer).map_err(io_error)?;

		if read == 0 {
			break;
		}

		target.write_all(&buffer[..read]).map_err(io_error)?;

		downloaded += read as u64;
		on_progress(downloaded, total);
	}

	Ok(downloaded)
}

/// Разобранная версия программы.
struct Version {
	numbers: Vec<i64>,
	parts: Vec<Part>,
}

impl Version {
	/// Разбирает версию; ведущая `v` и пробелы игнорируются.
	fn parse(version: &str) -> Self {
		let version = version.trim();
		let version = version
			.strip_prefix('v')
			.or_else(|| version.strip_prefix('V'))
			.unwrap_or(version);
		let (core, suffix) = version.split_once('-').unwrap_or((version, ""));

		Self {
			numbers: core.split('.').map(leading_number).collect(),
			parts: if suffix.is_empty() {
				Vec::new()
			} else {
				suffix.split('.').map(Part::parse).collect()
			},
		}
	}

	/// Числовая часть по индексу; недостающие части равны нулю.
	fn number(&self, index: usize) -> i64 {
		self.numbers.get(index).copied().unwrap_or(0)
	}
}

/// Сегмент суффикса версии.
enum Part {
	/// Числовой сегмент.
	Number(i64),

	/// Текстовый сегмент.
	Text(String),
}

impl Part {
	/// Разбирает сегмент как `Number.parseInt` в интерфейсе.
	fn parse(part: &str) -> Self {
		if !part.is_empty() && part.bytes().all(|byte| byte.is_ascii_digit()) {
			Self::Number(leading_number(part))
		} else {
			Self::Text(part.to_owned())
		}
	}

	/// Сравнивает сегменты: числа как числа, иначе как строки.
	fn compare(&self, other: &Self) -> Ordering {
		match (self, other) {
			(Self::Number(left), Self::Number(right)) => left.cmp(right),
			(Self::Number(left), Self::Text(right)) => left.to_string().cmp(right),
			(Self::Text(left), Self::Number(right)) => left.cmp(&right.to_string()),
			(Self::Text(left), Self::Text(right)) => left.cmp(right),
		}
	}
}

/// Число в начале строки; отсутствие цифр даёт ноль, как `parseInt` в JS.
fn leading_number(part: &str) -> i64 {
	let mut result = 0i64;
	let mut negative = false;
	let mut started = false;

	for symbol in part.trim().chars() {
		if !started && (symbol == '-' || symbol == '+') {
			negative = symbol == '-';
			started = true;

			continue;
		}

		match symbol.to_digit(10) {
			Some(digit) => {
				result = result.saturating_mul(10).saturating_add(i64::from(digit));
				started = true;
			}
			None => break,
		}
	}

	if negative { -result } else { result }
}

#[cfg(test)]
mod tests {
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
}
