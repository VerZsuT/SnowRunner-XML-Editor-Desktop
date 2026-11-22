//! Общие помощники тестов: временные каталоги.

use std::fs;
use std::path::PathBuf;
use std::sync::atomic::{AtomicU64, Ordering};

/// Уникальный пустой каталог теста; повторный запуск очищает его.
pub(crate) fn temp_dir(prefix: &str) -> PathBuf {
	static COUNTER: AtomicU64 = AtomicU64::new(0);
	let id = COUNTER.fetch_add(1, Ordering::Relaxed);
	let dir = std::env::temp_dir().join(format!("sxmle-{prefix}-{}-{id}", std::process::id()));

	let _ = fs::remove_dir_all(&dir);
	fs::create_dir_all(&dir).unwrap();

	dir
}
