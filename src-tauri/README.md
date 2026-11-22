# Rust-ядро (Tauri v2)

Ядро приложения на Tauri v2: работа с XML, файлами и архивами игры живёт здесь, webview — тонкий клиент.

## Состав workspace

| Крейт | Назначение |
|---|---|
| `crates/domain` (`sxmle-domain`) | XML-дерево, форматирование, доменная модель игры, DTO |
| `crates/storage` (`sxmle-storage`) | zip-архив игры без WinRAR, файловые примитивы, пути |
| `crates/app` (`sxmle-app`) | сценарии использования: открыть архив, документ, сохранить |
| корневой пакет `sxmle` | команды Tauri, состояние, события, сборка приложения |

## Первый запуск

```bash
npm install          # зависимости webview и Tauri CLI
npm run build        # собирает dist/ (нужен для cargo check/build: assets встраиваются в exe)
npm run tauri:dev    # окно с dev-сервером Vite
```

`cargo check`/`cargo test` без каталога `dist` падают: `tauri::generate_context!` встраивает фронтенд.

## Команды

```bash
cargo check -p sxmle --all-targets        # проверка Rust
cargo test --workspace --all-targets      # все тесты (Rust)
cargo test -p sxmle-storage               # тесты zip-слоя
cargo test -p sxmle-domain                # тесты XML-ядра
cargo clippy --workspace --all-targets -- -D warnings # линт
cargo run --features typegen --bin typegen # генерация src/api/bindings.ts
npm run tauri:dev                         # окно приложения (Vite dev-сервер + Rust)
npm run tauri:build                       # установщик NSIS и exe
```

## Правила

- webview не читает файлы и не разбирает XML: только команды и события;
- ошибки команд — `CommandError { code, message, path }`, UI разворачивает их через `call()` из `src/api/invoke.ts`;
- типы для TS генерируются из Rust (`tauri-specta`), `src/api/bindings.ts` руками не правится;
- комментарии и документация — на русском, форматирование — `cargo fmt` (табы, `rustfmt.toml`).
