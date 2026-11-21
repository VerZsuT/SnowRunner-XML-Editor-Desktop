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

	/// Приводит значение к ограничению.
	pub fn apply(self, value: f64) -> f64 {
		let value = if self.fixed { value.round() } else { value };
		let value = match self.min {
			Some(min) => value.max(min),
			None => value,
		};

		match self.max {
			Some(max) => value.min(max),
			None => value,
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn ограничивает_и_округляет() {
		let limit = Limit::new(Some(0.0), Some(1.0), false);

		assert_eq!(limit.apply(-1.0), 0.0);
		assert_eq!(limit.apply(0.25), 0.25);
		assert_eq!(limit.apply(2.0), 1.0);

		let fixed = Limit::new(Some(1.0), Some(30.0), true);

		assert_eq!(fixed.apply(1.4), 1.0);
		assert_eq!(fixed.apply(30.6), 30.0);
	}

	#[test]
	fn строит_заготовки() {
		assert_eq!(Limit::positive().min, Some(0.0));
		assert_eq!(Limit::negative().max, Some(0.0));
		assert!(Limit::integer().fixed);
		assert_eq!(Limit::new(None, None, false).apply(5.5), 5.5);
	}
}
