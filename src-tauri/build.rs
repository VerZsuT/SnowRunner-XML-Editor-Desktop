fn main() {
	// Инкрементальная сборка иначе оставляет в бинаре старый фронтенд.
	println!("cargo:rerun-if-changed=../dist/index.html");
	println!("cargo:rerun-if-changed=../dist/assets");
	tauri_build::build()
}
