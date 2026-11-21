//! Точка входа Rust-ядра: сборка Tauri-приложения и генерация TS-типов.

mod commands;
mod error;
mod state;

use sxmle_app::config::Config;
use sxmle_app::documents::{DocumentInfo, DocumentKind, MutationResult, SaveResult};
use sxmle_app::game::VehicleFile;
use sxmle_domain::game::descriptor::{AttrDescriptor, AttrKind};
use sxmle_domain::game::entities::{
	AddonGameData, AddonInstallSocket, AddonTruckData, BaseGameData, BaseUiDesc, BaseWheelFriction,
	Engine, Gear, Gearbox, GearboxGameData, GearboxParams, Suspension, SuspensionSet,
	TireWheelFriction, TrailerAddonSlots, Truck, TruckAddon, TruckAddonShift, TruckAddonSocket,
	TruckAddonSockets, TruckCompatibleWheels, TruckCraneSocket, TruckData, TruckFuelTank,
	TruckGameData, TruckRim, TruckSocket, TruckTire, TruckUiDesc, TruckWheel, TruckWheels,
	TruckWinch, TruckWinchSocket, Wheel, Wheels, Winch,
};
use sxmle_domain::game::field::Field;
use sxmle_domain::game::limit::Limit;
use sxmle_domain::game::position::Position;
use tauri::Manager;
use tauri_specta::ErrorHandlingMode;

pub use error::{CommandError, ErrorCode};

/// Собирает описание команд и событий для Tauri и для генерации TS-типов.
pub fn specta_builder() -> tauri_specta::Builder<tauri::Wry> {
	tauri_specta::Builder::<tauri::Wry>::new()
		.commands(commands::collect())
		.typ::<Truck>()
		.typ::<TruckData>()
		.typ::<TruckGameData>()
		.typ::<TruckUiDesc>()
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
		.typ::<VehicleFile>()
		.typ::<DocumentKind>()
		.typ::<DocumentInfo>()
		.typ::<MutationResult>()
		.typ::<SaveResult>()
		// DTO только читаются webview: единый вид вместо пар `*_Serialize`/`*_Deserialize`.
		.disable_serde_phases()
		.error_handling(ErrorHandlingMode::Result)
}

/// Запускает приложение.
pub fn run() {
	let builder = specta_builder();
	let invoke_handler = builder.invoke_handler();

	tauri::Builder::default()
		.plugin(tauri_plugin_dialog::init())
		.invoke_handler(invoke_handler)
		.setup(move |app| {
			builder.mount_events(app);

			let paths = state::resolve_paths(app.handle())?;
			app.manage(state::AppState::new(paths));

			if let Some(window) = app.get_webview_window("general") {
				window.show()?;
			}

			Ok(())
		})
		.run(tauri::generate_context!())
		.expect("не удалось запустить приложение");
}
