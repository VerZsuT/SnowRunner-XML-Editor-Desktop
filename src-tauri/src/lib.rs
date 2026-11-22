//! Точка входа Rust-ядра: сборка Tauri-приложения и генерация TS-типов.

mod commands;
mod defaults;
mod error;
mod state;
mod watcher;

use sxmle_app::actions::{Crane, Trailer};
use sxmle_app::config::Config;
use sxmle_app::documents::{DocumentInfo, DocumentKind, MutationResult, SaveResult};
use sxmle_app::game::{AddonFile, VehicleFile};
use sxmle_app::lists::EditedFile;
use sxmle_app::mods::{ModCandidate, ModEntry};

use crate::commands::paths::SwitchModeDto;
use sxmle_app::texts::GameTexts;
use sxmle_domain::game::descriptor::{AttrDescriptor, AttrKind};
use sxmle_domain::game::entities::{
	AddonGameData, AddonInstallSocket, AddonTruckData, BaseGameData, BaseUiDesc, BaseWheelFriction,
	Engine, Gear, Gearbox, GearboxGameData, GearboxParams, PhysicsBody, PhysicsModel, Suspension,
	SuspensionSet, TireWheelFriction, TrailerAddonSlots, Truck, TruckAddon, TruckAddonShift,
	TruckAddonSocket, TruckAddonSockets, TruckCompatibleWheels, TruckCraneSocket, TruckData,
	TruckFuelTank, TruckGameData, TruckRim, TruckSocket, TruckTire, TruckUiDesc, TruckWheel,
	TruckWheels, TruckWinch, TruckWinchSocket, Wheel, Wheels, Winch,
};
use sxmle_domain::game::field::Field;
use sxmle_domain::game::limit::Limit;
use sxmle_domain::game::position::Position;
use tauri::Manager;
use tauri_specta::{ErrorHandlingMode, collect_events};

pub use error::{CommandError, ErrorCode};

/// Собирает описание команд и событий для Tauri и для генерации TS-типов.
pub fn specta_builder() -> tauri_specta::Builder<tauri::Wry> {
	tauri_specta::Builder::<tauri::Wry>::new()
		.commands(commands::collect())
		.events(collect_events![
			commands::update::UpdateProgress,
			watcher::DocumentsChanged
		])
		.typ::<Truck>()
		.typ::<TruckData>()
		.typ::<TruckGameData>()
		.typ::<TruckUiDesc>()
		.typ::<PhysicsModel>()
		.typ::<PhysicsBody>()
		.typ::<TruckWinch>()
		.typ::<TruckWheels>()
		.typ::<TruckWheel>()
		.typ::<TruckFuelTank>()
		.typ::<TruckSocket>()
		.typ::<TruckCompatibleWheels>()
		.typ::<TruckWinchSocket>()
		.typ::<TruckCraneSocket>()
		.typ::<TrailerAddonSlots>()
		.typ::<TruckAddonSockets>()
		.typ::<TruckAddonSocket>()
		.typ::<TruckAddonShift>()
		.typ::<TruckAddon>()
		.typ::<AddonTruckData>()
		.typ::<AddonGameData>()
		.typ::<AddonInstallSocket>()
		.typ::<Engine>()
		.typ::<Gear>()
		.typ::<Gearbox>()
		.typ::<GearboxGameData>()
		.typ::<GearboxParams>()
		.typ::<Suspension>()
		.typ::<SuspensionSet>()
		.typ::<Winch>()
		.typ::<Wheels>()
		.typ::<Wheel>()
		.typ::<TruckTire>()
		.typ::<TruckRim>()
		.typ::<BaseWheelFriction>()
		.typ::<TireWheelFriction>()
		.typ::<BaseGameData>()
		.typ::<BaseUiDesc>()
		.typ::<AttrDescriptor>()
		.typ::<AttrKind>()
		.typ::<Field<String>>()
		.typ::<Field<i32>>()
		.typ::<Field<f64>>()
		.typ::<Field<bool>>()
		.typ::<Field<Vec<String>>>()
		.typ::<Field<Position>>()
		.typ::<Limit>()
		.typ::<Position>()
		.typ::<Config>()
		.typ::<EditedFile>()
		.typ::<GameTexts>()
		.typ::<ModEntry>()
		.typ::<ModCandidate>()
		.typ::<SwitchModeDto>()
		.typ::<VehicleFile>()
		.typ::<AddonFile>()
		.typ::<Crane>()
		.typ::<Trailer>()
		.typ::<DocumentKind>()
		.typ::<DocumentInfo>()
		.typ::<MutationResult>()
		.typ::<SaveResult>()
		.typ::<crate::defaults::DefaultValue>()
		// DTO только читаются webview: единый вид вместо пар `*_Serialize`/`*_Deserialize`.
		.disable_serde_phases()
		.error_handling(ErrorHandlingMode::Result)
}

/// Запускает приложение с готовым контекстом.
///
/// Ассеты фронтенда встраивает `main.rs` (`generate_context!`): так библиотека
/// не зависит от содержимого `dist` и не пересобирается после `vite build`.
pub fn run(context: tauri::Context<tauri::Wry>) {
	let builder = specta_builder();
	let invoke_handler = builder.invoke_handler();

	tauri::Builder::default()
		.plugin(tauri_plugin_dialog::init())
		.invoke_handler(invoke_handler)
		.setup(move |app| {
			builder.mount_events(app);

			let paths = state::resolve_paths(app.handle())?;
			app.manage(state::AppState::new(paths));
			app.manage(watcher::WatcherState::default());

			if let Some(window) = app.get_webview_window("general") {
				// Версия в заголовке окна — как в 1.4.0.
				window.set_title(&format!(
					"SnowRunner XML Editor v{}",
					app.package_info().version
				))?;
				window.show()?;
			}

			Ok(())
		})
		.run(context)
		.expect("не удалось запустить приложение");
}
