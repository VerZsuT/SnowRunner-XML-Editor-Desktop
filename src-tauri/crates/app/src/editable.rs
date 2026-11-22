//! Соответствие вида документа правилам переноса полей редактора.
//!
//! Список правил живёт в доменном слое (`sxmle_domain::game::editable`):
//! здесь только выбор списка по виду документа. Виды, которые редактор не
//! сохраняет как набор полей (одиночное колесо), правил не имеют.

use sxmle_domain::game::editable::{self, FieldRule};

use crate::documents::DocumentKind;

/// Правила переноса полей для вида документа; None — полей нет.
pub fn rules(kind: DocumentKind) -> Option<&'static [FieldRule]> {
	match kind {
		DocumentKind::Truck => Some(editable::TRUCK),
		DocumentKind::Trailer => Some(editable::TRAILER),
		DocumentKind::Engines => Some(editable::ENGINES),
		DocumentKind::Gearboxes => Some(editable::GEARBOXES),
		DocumentKind::Suspensions => Some(editable::SUSPENSIONS),
		DocumentKind::Winches => Some(editable::WINCHES),
		DocumentKind::Wheels => Some(editable::WHEELS),
		DocumentKind::Addon => Some(editable::ADDON),
		DocumentKind::Wheel => None,
	}
}

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn вид_документа_получает_правила() {
		assert_eq!(rules(DocumentKind::Truck), Some(editable::TRUCK));
		assert_eq!(rules(DocumentKind::Engines), Some(editable::ENGINES));
		assert_eq!(rules(DocumentKind::Addon), Some(editable::ADDON));
		assert_eq!(rules(DocumentKind::Wheel), None);
	}
}
