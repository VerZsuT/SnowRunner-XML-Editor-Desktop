# Команды

Все команды выполняются из корня репозитория, если не указано иное.
Оболочка по умолчанию — PowerShell; для cmd даны отдельные примеры.

## Требования

| Компонент | Версия / примечание |
|---|---|
| Node.js | 24.x (как в CI); поддерживается актуальный LTS |
| Rust | stable, `rust-version = 1.85` |
| Tauri CLI | ставится как devDependency, отдельно не нужен |
| Windows | 10/11 x64, WebView2 |
| MSVC | Build Tools для Rust/Tauri |

Проверка окружения:

```powershell
node --version
npm --version
rustc --version
cargo --version
npx tauri --version
```

## Установка

```powershell
npm ci
```

`npm ci` воспроизводит `package-lock.json`; `npm i` допустим для локальной разработки,
но меняет lock-файл.

## Разработка

```powershell
npm run tauri:dev
```

Запускает Vite на `http://127.0.0.1:1420` и окно Tauri. Это основной режим разработки.

```powershell
npm run dev
```

Только Vite-сервер. Отдельным приложением не является: UI вызывает Tauri-команды,
которых в обычном браузере нет. Используйте для проверки вёрстки или вместе с `tauri:dev`.

## Сборка

```powershell
npm run build
```

Последовательно: `typegen` → `tsc --noEmit` → `vite build` в `dist/`.

```powershell
npm run tauri:build
```

Собирает release-бинарник и установщик NSIS. Результаты:

* `src-tauri/target/release/SnowRunnerXMLEditor.exe`;
* `src-tauri/target/release/bundle/nsis/SnowRunnerXMLEditor_<версия>_x64-setup.exe`.

Портативный архив вручную:

```powershell
New-Item -ItemType Directory -Force portable | Out-Null
Copy-Item src-tauri/target/release/SnowRunnerXMLEditor.exe portable/
New-Item -ItemType File -Force portable/portable.txt | Out-Null
Compress-Archive -Path portable/* -DestinationPath SnowRunnerXMLEditor.zip
```

## Типы для интерфейса

```powershell
npm run typegen
```

Запускает `cargo run --features typegen --bin typegen` и перезаписывает
`src/renderer/api/bindings.ts`. Проверка расхождения, как в CI:

```powershell
npm run typegen
git diff --exit-code src/renderer/api/bindings.ts
```

## Проверки

```powershell
npm run check      # tsc --noEmit
npm run lint       # oxlint src
npm run lint:fix   # oxlint src --fix
npm test           # vitest run
```

Точечные тесты:

```powershell
npx vitest run src/renderer/tests/pages/editor.test.tsx
npx vitest run --project node
npx vitest run --project jsdom
npm run test:coverage
```

## Rust

`cargo check`/`cargo test` требуют собранного `dist`: `generate_context!` встраивает фронтенд.

```powershell
npm run build
cargo check --manifest-path src-tauri/Cargo.toml -p sxmle --all-targets
cargo test --manifest-path src-tauri/Cargo.toml --workspace --all-targets
cargo test --manifest-path src-tauri/Cargo.toml -p sxmle-domain
cargo test --manifest-path src-tauri/Cargo.toml -p sxmle-storage
cargo test --manifest-path src-tauri/Cargo.toml -p sxmle-app
cargo test --manifest-path src-tauri/Cargo.toml -p sxmle-domain --test xml_core
cargo clippy --manifest-path src-tauri/Cargo.toml --workspace --all-targets -- -D warnings
cargo fmt --manifest-path src-tauri/Cargo.toml --check
cargo fmt --manifest-path src-tauri/Cargo.toml
```

`--manifest-path` нужен при запуске из корня; из каталога `src-tauri` его можно опустить.

## Полный прогон, как в CI

```powershell
npm ci
npm run check
npm run lint
npm test

npx vite build
cargo run --manifest-path src-tauri/Cargo.toml --features typegen --bin typegen
git diff --exit-code src/renderer/api/bindings.ts

cargo test --manifest-path src-tauri/Cargo.toml --workspace --all-targets
cargo clippy --manifest-path src-tauri/Cargo.toml --workspace --all-targets -- -D warnings
cargo fmt --manifest-path src-tauri/Cargo.toml --check
```

## Релиз и сайт

Сборка артефактов с именами, которые ждёт автообновление:

```powershell
npm run tauri:build

New-Item -ItemType Directory -Force release | Out-Null
Copy-Item (Get-Item src-tauri/target/release/bundle/nsis/*.exe).FullName release/SnowRunnerXMLEditor.exe

New-Item -ItemType Directory -Force portable | Out-Null
Copy-Item src-tauri/target/release/SnowRunnerXMLEditor.exe portable/
New-Item -ItemType File -Force portable/portable.txt | Out-Null
Compress-Archive -Path portable/* -DestinationPath release/SnowRunnerXMLEditor.zip
```

Проверка и публикация через GitHub CLI (после `gh auth login`):

```powershell
gh auth status
gh release view v2.0.0
gh release upload v2.0.0 release/SnowRunnerXMLEditor.exe release/SnowRunnerXMLEditor.zip --clobber
```

Обновить источник GitHub Pages после переименования `docs/` → `site/`
(ветку подставьте свою; для `main` — `main`):

```powershell
gh api --method PUT repos/VerZsuT/SnowRunner-XML-Editor-Desktop/pages `
  -f 'source[branch]=dev' -f 'source[path]=/site'
```

Порядок релиза: сначала файлы в GitHub Releases, затем `site/version-info.json` на новую версию.
Иначе автообновление получит 404.

## Диагностика

```powershell
# данные приложения
Get-ChildItem "$env:APPDATA\SnowRunner XML Editor" -Force

# процессы
Get-Process SnowRunnerXMLEditor -ErrorAction SilentlyContinue

# остановить зависший экземпляр
Stop-Process -Name SnowRunnerXMLEditor -Force

# хеш артефакта
Get-FileHash release/SnowRunnerXMLEditor.exe -Algorithm SHA256

# запустить собранный exe
Start-Process src-tauri/target/release/SnowRunnerXMLEditor.exe
```

cmd-эквиваленты:

```cmd
where node
where cargo
rmdir /s /q dist
tasklist | findstr SnowRunner
taskkill /IM SnowRunnerXMLEditor.exe /F
```

## Чего нет

* `npm run start`, `npm run make`, `npm run package` — команды Electron 1.x, удалены.
* Отдельной команды `npm run server` нет: фронтенд обслуживает Vite/Tauri.
* `.env.example` содержит переменные старой архитектуры; текущий код их не читает.
