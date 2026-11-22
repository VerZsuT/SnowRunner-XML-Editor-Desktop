//! Физическая модель трака: масса тела и смещение центра масс.
//!
//! `<PhysicsModel>` (и однотипные `<FuelMass>`, `<WaterMass>`) содержат
//! цепочку тел `<Body>`: масса, смещение центра масс и вложенное тело.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::AttrReader;
use crate::game::field::Field;
use crate::game::limit::Limit;
use crate::game::position::Position;

/// Физическая модель.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct PhysicsModel {
	/// Физическое тело.
	pub body: Option<PhysicsBody>,
}

impl PhysicsModel {
	/// Читает физическую модель элемента.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			body: reader
				.child("Body")
				.map(|reader| PhysicsBody::read(&reader)),
		}
	}
}

/// Физическое тело: масса, смещение центра масс и вложенное тело.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct PhysicsBody {
	/// Масса тела.
	pub mass: Field<i32>,

	/// Смещение центра масс.
	pub center_of_mass_offset: Field<Position>,

	/// Вложенное тело.
	pub body: Option<Box<PhysicsBody>>,
}

impl PhysicsBody {
	/// Читает тело вместе с вложенными телами.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			mass: reader
				.integer("Mass", Some(0))
				.label("physics.body.mass")
				.step(100.0)
				.limit(Limit::new(Some(0.0), Some(1_000_000.0), true)),
			center_of_mass_offset: reader
				.position("CenterOfMassOffset", None)
				.label("physics.body.centerOfMassOffset"),
			body: reader
				.child("Body")
				.map(|reader| Box::new(Self::read(&reader))),
		}
	}
}

#[cfg(test)]
mod tests;
