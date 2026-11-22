//! Команды Tauri: единственный вход webview в Rust-ядро.

use tauri::Wry;
use tauri_specta::{Commands, collect_commands};

pub mod app;
pub mod archive;
pub mod config;
pub mod documents;
pub mod epf;
pub mod game;
pub mod library;
pub mod mods;
pub mod paths;
pub mod system;
pub mod texts;
pub mod update;

/// Все команды приложения.
pub fn collect() -> Commands<Wry> {
	collect_commands![
		app::app_info,
		app::open_devtools,
		app::restart_app,
		app::quit_app,
		app::reset_to_defaults,
		app::uninstall_app,
		paths::paths,
		paths::switch_data_mode,
		paths::game_data_ready,
		config::config,
		config::save_config,
		archive::find_initial,
		archive::unpack_initial,
		archive::update_archive,
		archive::verify_archive,
		archive::backup_archive,
		archive::restore_backup,
		library::list_favorites,
		library::toggle_favorite,
		library::list_edited,
		library::unmark_edited,
		mods::list_mods,
		mods::find_mods,
		mods::add_mod,
		mods::remove_mod,
		mods::sync_mods,
		game::list_trucks,
		game::list_trailers,
		game::list_addons,
		game::open_truck,
		game::open_engines,
		game::open_gearboxes,
		game::open_suspensions,
		game::open_winches,
		game::open_wheels,
		game::open_wheel,
		game::open_addon,
		texts::game_texts,
		documents::open_document,
		documents::open_addon_document,
		documents::document_info,
		documents::list_documents,
		documents::dirty_documents,
		documents::close_document,
		documents::document_truck,
		documents::document_engines,
		documents::document_gearboxes,
		documents::document_suspensions,
		documents::document_winches,
		documents::document_wheels,
		documents::document_wheel,
		documents::document_addon,
		documents::set_attr,
		documents::set_text,
		documents::add_element,
		documents::remove_element,
		documents::move_element,
		documents::set_crane,
		documents::set_trailer,
		documents::set_bandit_crane,
		documents::save_document,
		documents::save_all_documents,
		documents::reset_document,
		documents::document_defaults,
		documents::reset_document_defaults,
		epf::export_epf,
		epf::import_epf,
		system::open_url,
		system::open_path,
		system::show_in_folder,
		crate::watcher::watch_documents,
		update::check_update,
		update::download_update,
		update::run_installer
	]
}
