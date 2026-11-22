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
│ экраны: списки, редактор, старт              │
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
| `sxmle-app` | Сценарии: пути, целостность архива, распаковка, игра, документы, моды, тексты, EPF, обновления, сброс | `crates/app/src/*` |
| `sxmle` | Tauri-команды, состояние, ошибки, генерация TS-типов, окно | `src-tauri/src` |
| Webview | Отображение и ввод; локальное UI-состояние | `src` |

## Структура репозитория

```text
src/                       интерфейс (webview)
  api/                     обёртки команд и generated bindings.ts
  components/              общие компоненты
  pages/                   lists, editor, welcome
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
5. Редактор открывает связанные документы по сокетам (двигатель, коробка, подвеска, лебёдка, колёса)
   и аддоны по запросу.

### Правка и сохранение

1. UI вызывает мутацию с текущим `revision`.
2. Rust меняет XML-дерево в памяти, увеличивает `revision`, ставит `dirty`.
3. Для документов основной игры обе команды сохранения сначала проверяют отпечаток
   `initial.pak` (`integrity::require_unchanged`); при `changed`/`unknown` возвращается
   `archiveChanged`, файлы и `dirty` не меняются.
4. `save_document` пишет **форматированный** XML своего документа, `save_all_documents` —
   всех `dirty`-документов, в файл в `mainTemp` (или `modsTemp`) атомарной заменой.
5. Затем команда сразу пересобирает исходный `.pak` через `update_checked` (проверка
   отпечатка ещё раз) или `update_from_dir` для мода. Ручная команда `update_archive`
   остаётся для верхнего меню.
6. Сброс к значениям по умолчанию идёт в память: `reset_document_defaults` применяет
   выгрузку 1.4.0 (`defaults.json.gz`) и ставит `dirty`, запись на диск — только по кнопке
   сохранения.

### Пересборка архива

1. `update_checked` сверяет отпечаток архива; изменившийся архив не пересобирается.
2. `update_from_dir` обходит каталог данных и сравнивает файлы с записями архива по CRC32 и размеру.
3. Изменённые записи пересобираются с сохранением метода сжатия, неизменённые копируются как есть.
4. Новые записи добавляются в конец; маркер `edited` пишется, если его ещё нет в архиве.
5. Временный файл синхронизируется и заменяет исходный архив, затем пишется новый отпечаток.

### Целостность архива

`crates/app/src/integrity.rs` владеет отпечатком `jsons/archive.json`: путь, размер,
mtime и CRC32 канонического представления записей central directory. Проверка читает
только central directory через `zip::read_entries`, поэтому не зависит от размера архива.
`check` никогда не падает и возвращает `ok`/`changed`/`unknown`; `require_unchanged`
превращает расхождение в `ArchiveError::Changed`, отсутствие отпечатка — в `Unknown`.

Чистая распаковка (`unpack_fresh`) идёт в `mainTemp.new-<pid>`, затем подменяет каталог
через общий `archive::replace_dir`; прежний каталог уходит в `previous_initial` или
удаляется. После успеха `Documents::clear` сбрасывает реестр и кэш шаблонов, событие
`archive-status-changed` сообщает webview новое состояние.

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
| Отпечаток архива | Rust | `jsons/archive.json` |
| Состояние целостности архива | Rust → React | `ArchiveStatusDto`, событие `archive-status-changed`, `ArchiveGuardProvider` |
| Открытый экран, фильтры, черновики полей | React | локальное состояние компонентов |
| Язык интерфейса | Rust + модуль локализации | `config.json`, `T`, `LOCALES` |
| Наблюдаемые файлы документов | Rust | `WatcherState` (`notify`) |

zustand хранит только UI-состояние. Игровые данные и документы в нём не дублируются.

## Конкурентность

* `AppState` хранит `Mutex` для конфигурации, документов, избранного и модов.
* Документ имеет `revision`; мутация с устаревшей версией получает `Conflict`.
* `DocumentSession` в UI выстраивает операции в очередь, поэтому версия всегда актуальна.
* Watcher (`notify`) следит за файлами открытых документов в фоновом потоке и присылает
  событие `documents-changed`; webview перечитывает модели. Собственное сохранение
  подавляет реакцию до конца пересборки архива (до 60 с) и ещё 1,5 с после неё; импорт `.epf`
  использует тот же путь, сброс — паузу 2 с.
* Долгие операции с архивом выполняются в `spawn_blocking` и сериализуются общим замком
  (распаковка, обновление, бэкап, восстановление, сохранение, синхронизация модов); прогресс
  и отмена не реализованы. `archive_status` тоже выполняется под этим замком, чтобы не
  читать архив во время пересборки.
* `ArchiveGuardProvider` держит состояние `ok`/`changed`/`unknown`: в режиме чтения меню
  блокирует «Обновить/Распаковать архив», а редактор по клику сохранения снова показывает окно.
  UI лишь объясняет причину — Rust отказывает в записи в любом случае.

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
| Новая настройка | `crates/app/src/config.rs`, `src/config.ts`, `src/components/settings/settings.tsx` |
| Новый язык | `src/utilities/localization/locales`, тип `Locale` |
| Изменение формата архива | `crates/storage/src/zip`, `crates/app/src/archive.rs` |
| Обновление программы | `crates/app/src/updates.rs`, `site/version-info.json` |

Подробности: [backend.md](backend.md), [frontend.md](frontend.md), [ipc-contract.md](ipc-contract.md),
[data-and-archive.md](data-and-archive.md).
