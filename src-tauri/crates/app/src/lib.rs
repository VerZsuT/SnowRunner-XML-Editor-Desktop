//! Прикладной слой: сценарии использования (открыть архив, документ, сохранить).

pub mod actions;
pub mod archive;
pub mod config;
pub mod documents;
pub mod epf;
pub mod game;
pub mod info;
pub mod lists;
pub mod mods;
pub mod paths;
pub mod system;
pub mod texts;
pub mod updates;

#[cfg(test)]
mod test_support;
