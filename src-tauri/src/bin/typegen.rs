//! Генерирует TypeScript-биндинги команд и типов для webview.

fn main() {
	let path = std::path::Path::new(env!("CARGO_MANIFEST_DIR")).join("../src/api/bindings.ts");

	sxmle::specta_builder()
		.export(specta_typescript::Typescript::default(), &path)
		.expect("не удалось сгенерировать TypeScript-биндинги");
}
