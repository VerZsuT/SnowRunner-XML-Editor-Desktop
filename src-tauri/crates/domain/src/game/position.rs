//! Позиция: набор координат `(x; y; z)`.

use serde::Serialize;
use specta::Type;

use super::value::parse_float;

/// Позиция (`Pos`, `Offset`, `Origin`).
#[derive(Debug, Clone, Copy, Default, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Position {
	/// Координата X.
	pub x: f64,
	/// Координата Y.
	pub y: f64,
	/// Координата Z.
	pub z: f64,
}

impl Position {
	/// Создаёт позицию.
	pub const fn new(x: f64, y: f64, z: f64) -> Self {
		Self { x, y, z }
	}

	/// Позиция по координате X.
	pub const fn x(value: f64) -> Self {
		Self::new(value, 0.0, 0.0)
	}

	/// Позиция по координате Y.
	pub const fn y(value: f64) -> Self {
		Self::new(0.0, value, 0.0)
	}

	/// Позиция по координате Z.
	pub const fn z(value: f64) -> Self {
		Self::new(0.0, 0.0, value)
	}

	/// Разбирает позицию из строки вида `(1.5; 2; -3)`.
	pub fn parse(value: &str) -> Self {
		let cleaned = value.replace(['(', ')'], "");
		let mut parts = cleaned
			.split([',', ';'])
			.map(|part| parse_float(part).unwrap_or(0.0));

		Self {
			x: parts.next().unwrap_or(0.0),
			y: parts.next().unwrap_or(0.0),
			z: parts.next().unwrap_or(0.0),
		}
	}

	/// Записывает позицию в строку вида `(1.5; 2; -3)`.
	pub fn format(self) -> String {
		format!("({}; {}; {})", self.x, self.y, self.z)
	}
}

#[cfg(test)]
mod tests;
