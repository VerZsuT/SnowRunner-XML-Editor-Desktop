//! Ограничения числовых значений.

use serde::Serialize;
use specta::Type;

/// Ограничение числового значения.
///
/// `None` в `min`/`max` означает отсутствие границы (в текущей модели —
/// `-Infinity`/`Infinity`), `fixed` — округление до целого.
#[derive(Debug, Clone, Copy, Default, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Limit {
	/// Минимальное значение.
	pub min: Option<f64>,
	/// Максимальное значение.
	pub max: Option<f64>,
	/// Округлять значение до целого.
	#[serde(default)]
	pub fixed: bool,
}

impl Limit {
	/// Создаёт ограничение.
	pub const fn new(min: Option<f64>, max: Option<f64>, fixed: bool) -> Self {
		Self { min, max, fixed }
	}

	/// Только положительные значения, включая 0.
	pub const fn positive() -> Self {
		Self::new(Some(0.0), None, false)
	}

	/// Только отрицательные значения, включая 0.
	pub const fn negative() -> Self {
		Self::new(None, Some(0.0), false)
	}

	/// Только целочисленные значения.
	pub const fn integer() -> Self {
		Self::new(None, None, true)
	}

	/// Минимальное значение.
	pub const fn with_min(mut self, min: f64) -> Self {
		self.min = Some(min);

		self
	}

	/// Максимальное значение.
	pub const fn with_max(mut self, max: f64) -> Self {
		self.max = Some(max);

		self
	}

	/// Включает округление до целого.
	pub const fn rounded(mut self) -> Self {
		self.fixed = true;

		self
	}
}

#[cfg(test)]
mod tests;
