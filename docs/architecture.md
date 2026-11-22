# Архитектура

## Назначение

Приложение редактирует XML-файлы SnowRunner: распаковывает нужные файлы из `initial.pak`,
показывает параметры в таблице, сохраняет правки и собирает архив обратно.
Поддерживаются траки, прицепы, двигатели, коробки передач, подвески, лебёдки, колёса и аддоны,
а также моды, DLC и игровые переводы.

## Общая схема

```text
┌──────────────────────────────────────────────┐
│ Webview: React 19 + antd 6 + zustand         │
│ экраны: списки, редактор, настройка          │
└──────────────────────┬───────────────────────┘
                       │ invoke / events (Tauri IPC)
┌──────────────────────▼───────────────────────┐
│ sxmle (Tauri)                                │
│ команды, AppState, specta, окно, события     │
├──────────────────────────────────────────────┤
│ sxmle-app — сценарии использования           │
│ пути, игра, документы, архив, моды, обновл.  │
├───────────────────────┬──────────────────────┤
│ sxmle-domain          │ sxmle-storage        │
│ XML, модель игры      │ zip, атомарная ФС    │
└───────────────────────┴──────────────────────┘
```

Зависимости направлены внутрь: `sxmle` → `sxmle-app` → `sxmle-domain` / `sxmle-storage`.
`domain` и `storage` не знают друг о друге и не зависят от Tauri.

## Слои

| Слой | Ответственность | Ключевые файлы |
|---|---|---|
| `sxmle-domain` | Lossless XML, селекторы, форматирование, кодировки; сущности игры, поля и дескрипторы | `crates/domain/src/xml`, `crates/domain/src/game` |
| `sxmle-storage` | Чтение/обновление zip без сторонних архиваторов; атомарная запись файлов | `crates/storage/src/zip`, `crates/storage/src/fs.rs` |
| `sxmle-app` | Сценарии: пути, распаковка, игра, документы, моды, тексты, EPF, обновления | `crates/app/src/*` |
| `sxmle` | Tauri-команды, состояние, ошибки, генерация TS-типов, окно | `src-tauri/src` |
| Webview | Отображение и ввод; локальное UI-состояние | `src` |

## Структура репозитория

```text
src/                       интерфейс (webview)
  api/                     обёртки команд и generated bindings.ts
  components/              общие компоненты
  pages/                   lists, editor, setup
  tests/                   Vitest (node + jsdom)
  utilities/               локализация, строки
  app.tsx, entry.tsx       корень и монтирование
  index.html               точка входа Vite
src-tauri/
  crates/domain/           XML и модель игры
  crates/storage/          zip и ФС
  crates/app/              use-cases
  src/commands/            Tauri-команды
  src/state.rs             AppState
  src/watcher.rs           наблюдение за файлами документов
  src/error.rs             CommandError / ErrorCode
  src/bin/typegen.rs       генератор bindings.ts
site/                      статический сайт GitHub Pages
docs/                      эта документация
initialpak/                локальная фикстура (не в git)
```

## Потоки выполнения

### Запуск

1. `main.rs` собирает Tauri-`Context` с встроенным `dist` и вызывает `sxmle::run`.
2. `setup` строит `Paths`, читает `config.json`, создаёт `AppState` и показывает окно `general`.
3. `entry.tsx` читает конфигурацию, применяет язык, затем динамически импортирует `app.tsx`.
   Динамический импорт важен: тексты фиксируются при загрузке модуля локализации.

### Списки и открытие документа

1. `list_trucks` / `list_trailers` обходят основную игру, DLC и моды.
2. `game_texts` читает `strings_<язык>.str` игры и модов.
3. `open_document` находит файл, разбирает XML, подхватывает `_templates`, регистрирует документ.
4. `watch_documents` ставит файлы открытых документов под `notify`; при внешнем изменении
   событие `documents-changed` заставляет webview перечитать модели.
4. Редактор открывает связанные документы по сокетам (двигатель, коробка, подвеска, лебёдка, колёса)
   и аддоны по запросу.

### Правка и сохранение

1. UI вызывает мутацию с текущим `revision`.
2. Rust меняет XML-дерево в памяти, увеличивает `revision`, ставит `dirty`.
3. `save_document` / `save_all_documents` пишут **форматированный** XML в файл в `mainTemp`
   (или `modsTemp`) атомарной заменой.
4. Затем команда сразу пересобирает исходный `.pak`: `initial.pak` для основной игры
   или `.pak` мода. Ручная команда `update_archive` остаётся для меню и экрана настройки.
5. Сброс к значениям по умолчанию идёт в память: `reset_document_defaults` применяет
   выгрузку 1.4.0 (`defaults.json.gz`) и ставит `dirty`, запись на диск — только по кнопке
   сохранения.

### Пересборка архива

1. `update_from_dir` обходит каталог данных и сравнивает файлы с записями архива по CRC32 и размеру.
2. Изменённые записи пересобираются с сохранением метода сжатия, неизменённые копируются как есть.
3. Новые записи добавляются в конец, туда же пишется маркер `edited`.
4. Временный файл синхронизируется и заменяет исходный архив.

### Обновление программы

`check_update` читает `version-info.json` с сайта, `download_update` качает
`SnowRunnerXMLEditor.exe` или `.zip` из GitHub Releases, `run_installer` запускает установщик
или открывает каталог с портативным архивом и закрывает приложение.

## Владение состоянием

| Состояние | Владелец | Где живёт |
|---|---|---|
| Файлы игры, XML-деревья, документы | Rust | `AppState` → `Documents` |
| Конфигурация | Rust + снимок в UI | `jsons/config.json`, zustand |
| Избранное и изменённые | Rust | `jsons/favorites.json`, `edited.json` |
| Моды | Rust | `jsons/mods.json` |
| Открытый экран, фильтры, черновики полей | React | локальное состояние компонентов |
| Язык интерфейса | Rust + модуль локализации | `config.json`, `T` |

zustand хранит только UI-состояние. Игровые данные и документы в нём не дублируются.

## Конкурентность

* `AppState` хранит `Mutex` для конфигурации, документов, избранного и модов.
* Документ имеет `revision`; мутация с устаревшей версией получает `Conflict`.
* `DocumentSession` в UI выстраивает операции в очередь, поэтому версия всегда актуальна.
* Фонового watcher нет: внешние изменения файлов не отслеживаются.
* Долгие операции с архивом выполняются в `spawn_blocking`, но прогресс и отмена не реализованы.

## Сборка и типы

```text
Rust DTO/команды ──specta──► src/api/bindings.ts ──► React
Vite (src) ──► dist ──generate_context!──► exe
```

* `npm run typegen` перегенерирует `bindings.ts`; файл не редактируется руками.
* `main.rs` встраивает `dist`; библиотека `sxmle` от `dist` не зависит.
* `cargo check`/`cargo test` требуют собранного `dist`: макрос `generate_context!` встраивает фронтенд.
* В release включена инкрементальная сборка; LTO выключен.

## Точки расширения

| Задача | Куда смотреть |
|---|---|
| Новая команда | `src-tauri/src/commands/*`, `commands/mod.rs`, `specta_builder()`, затем `npm run typegen` |
| Новое поле/сущность | `crates/domain/src/game/entities`, `attributes.rs`, редактор и словарь подписей |
| Новый экран | `src/pages`, `app.tsx`, API-обёртка |
| Новая настройка | `crates/app/src/config.rs`, `src/config.ts`, `setup.tsx` |
| Новый язык | `src/utilities/localization/locales`, тип `Locale` |
| Изменение формата архива | `crates/storage/src/zip`, `crates/app/src/archive.rs` |
| Обновление программы | `crates/app/src/updates.rs`, `site/version-info.json` |

Подробности: [backend.md](backend.md), [frontend.md](frontend.md), [ipc-contract.md](ipc-contract.md),
[data-and-archive.md](data-and-archive.md).
