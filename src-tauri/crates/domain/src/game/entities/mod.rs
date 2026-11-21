//! Сущности игры: траки, двигатели, коробки, подвески, лебёдки, колёса и аддоны.

pub mod addon;
pub mod base;
pub mod engine;
pub mod gearbox;
pub mod physics;
pub mod suspension;
pub mod truck;
pub mod truck_data;
pub mod truck_game_data;
pub mod wheel;
pub mod winch;

pub use addon::{AddonGameData, AddonInstallSocket, AddonTruckData, TruckAddon};
pub use base::{BaseGameData, BaseUiDesc};
pub use engine::Engine;
pub use gearbox::{Gear, Gearbox, GearboxGameData, GearboxParams};
pub use physics::{PhysicsBody, PhysicsModel};
pub use suspension::{Suspension, SuspensionSet};
pub use truck::{Truck, TruckData, TruckGameData};
pub use truck_data::{
	TruckCompatibleWheels, TruckFuelTank, TruckSocket, TruckWheel, TruckWheels, TruckWinch,
};
pub use truck_game_data::{
	TrailerAddonSlots, TruckAddonShift, TruckAddonSocket, TruckAddonSockets, TruckCraneSocket,
	TruckUiDesc, TruckWinchSocket,
};
pub use wheel::{BaseWheelFriction, TireWheelFriction, TruckRim, TruckTire, Wheel, Wheels};
pub use winch::Winch;
