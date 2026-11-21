//! Сведения о приложении.

use serde::{Deserialize, Serialize};
use specta::Type;

/// Сведения о приложении и его каталогах.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct AppInfo {
	/// Имя приложения.
	pub name: String,

	/// Версия приложения.
	pub version: String,

	/// Версия Tauri.
	pub tauri_version: String,

	/// Каталог данных приложения.
	pub user_data_dir: String,

	/// Признак портативного режима.
	pub portable: bool,

	/// Признак отладочной сборки.
	pub debug: bool,
}

impl AppInfo {
	/// Создаёт сведения о приложении.
	pub fn new(tauri_version: &str, user_data_dir: String, portable: bool, debug: bool) -> Self {
		Self {
			name: "SnowRunner XML Editor".to_owned(),
			version: env!("CARGO_PKG_VERSION").to_owned(),
			tauri_version: tauri_version.to_owned(),
			user_data_dir,
			portable,
			debug,
		}
	}
}
