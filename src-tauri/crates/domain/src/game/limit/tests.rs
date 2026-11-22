//! Тесты модуля `limit`: лимиты числовых полей.

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
