//! Тесты модуля `limit`: лимиты числовых полей.

use super::*;

#[test]
fn строит_заготовки() {
	assert_eq!(Limit::positive().min, Some(0.0));
	assert_eq!(Limit::negative().max, Some(0.0));
	assert!(Limit::integer().fixed);
	assert_eq!(Limit::new(None, None, false), Limit::default());
}
