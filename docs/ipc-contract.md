# Контракт IPC

Webview общается с Rust только через команды Tauri и события. Контракт генерируется
из Rust в [bindings.ts](../src/api/bindings.ts); этот файл не редактируется руками.

## Как устроен вызов

```text
React → commands.setAttr(...) → invoke("set_attr", {...})
      → #[tauri::command] в src-tauri/src/commands
      → app-сценарий → domain/storage
      → CommandResult<T> → call() → T или CommandFailure
```

* Имена Rust-команд — `snake_case`; в TS — `camelCase`.
* Аргументы Rust `snake_case` (`doc_id`, `mod_name`) в TS — `camelCase` (`docId`, `modName`).
* `Option<T>` в TS — `T | null`.
* Все DTO сериализуются в `camelCase`.

## Формат результата

В `specta_builder()` включён `ErrorHandlingMode::Result`. Команда, возвращающая
`AppResult<T>`, приходит в TS как:

```ts
type CommandResult<T> =
  | { status: 'ok', data: T }
  | { status: 'error', error: CommandError }
```

`call()` из [invoke.ts](../src/api/invoke.ts) разворачивает результат:

```ts
const info = await call(commands.openDocument('truck', 'ank_mk38', null))
```

Команды без `Result` (списки и словари, которые не могут отказать) возвращают значение напрямую:
`list_favorites`, `list_edited`, `list_mods`, `find_mods`, `game_texts`, `list_documents`,
`dirty_documents`. Для них `call()` не нужен.

## Ошибки

`CommandError { code, message, path? }`; в TS — `CommandFailure` с полями `code`, `message`, `path`.

| `ErrorCode` | Когда | Реакция UI |
|---|---|---|
| `io` | файл не прочитан/не записан | показать сообщение и путь |
| `zip` | повреждённый или неподдерживаемый архив | предложить другой архив/бэкап |
| `archive` | сценарий архива: нет каталога, пустой каталог | проверить распаковку |
| `xml` | разбор/запись XML, кодировка | показать файл, не сохранять |
| `invalidArgument` | плохой путь, имя мода, версия `.epf` | исправить ввод |
| `notFound` | нет документа, файла, элемента, сокета | обновить список |
| `conflict` | устаревшая `revision`, изменённый документ | перечитать/подтвердить закрытие |
| `update` | сеть, HTTP, версия, загрузка | повторить позже |
| `internal` | прочее | лог и сообщение |

Ошибки с путём содержат `path`; `Display` добавляет путь в текст.
Маппинг доменных ошибок — в [error.rs](../src-tauri/src/error.rs).

## Команды

### Приложение и пути

| Команда | Аргументы | Результат |
|---|---|---|
| `restart_app` | — | перезапуск |
| `quit_app` | — | закрытие программы (меню «Файл → Выход») |
| `reset_to_defaults` | — | сброс к первоначальному состоянию и перезапуск (меню «Настройки → Сбросить») |
| `uninstall_app` | — | запуск `uninstall.exe` рядом с программой и закрытие (меню «Настройки → Удалить программу») |
| `paths` | — | `PathsDto` |
| `game_data_ready` | — | `bool`: распакованы ли файлы игры |
| `switch_data_mode` | `portable` | `SwitchModeDto`, нужен перезапуск |

### Конфигурация

| Команда | Аргументы | Результат |
|---|---|---|
| `config` | — | `Config` |
| `save_config` | `config` | `Config` после проверки |

`save_config` сохраняет версию и тип сборки от текущего состояния, проверяет язык.

### Архив

| Команда | Аргументы | Результат |
|---|---|---|
| `find_initial` | `folder` | путь к `initial.pak` или `null` |
| `unpack_initial` | `archivePath`, `list` | `UnpackResultDto` |
| `update_archive` | `archivePath`, `modName` | `UpdateResultDto` |
| `backup_archive` | `archivePath`, `suffix` | путь бэкапа |
| `restore_backup` | `archivePath` | число байт |

`list` — `main`, `optimized`, `mods`. `modName` направляет обновление в `modsTemp/<mod>`.
`find_initial` перебирает типовой хвост пути `steamapps/common/SnowRunner/en_us/preload/paks/client`,
поэтому подходит корень установки, папка игры или `client`.

### Избранное и изменённые

| Команда | Аргументы | Результат |
|---|---|---|
| `list_favorites` | — | `string[]` |
| `toggle_favorite` | `name` | новое состояние |
| `list_edited` | — | `EditedFile[]` |
| `unmark_edited` | `name` | снята ли метка |

### Моды

| Команда | Аргументы | Результат |
|---|---|---|
| `list_mods` | — | `ModEntry[]` |
| `find_mods` | — | `ModCandidate[]` |
| `add_mod` | `path` | `ModEntry[]` |
| `remove_mod` | `name` | `ModEntry[]` |
| `sync_mods` | — | `ModEntry[]` |

### Игра

| Команда | Аргументы | Результат |
|---|---|---|
| `list_trucks` / `list_trailers` | — | `VehicleFile[]` |
| `list_addons` | `truck`, `modName` | `AddonFile[]` |
| `game_texts` | `lang` | `GameTexts` |

`truck` — имя файла без `.xml`; `modName` задаёт мод, из которого открыт трак.
Для чтения и редактирования используйте `open_document`/`document_*`.

### Документы

| Команда | Аргументы | Результат |
|---|---|---|
| `open_document` | `kind`, `name`, `modName` | `DocumentInfo` |
| `open_addon_document` | `path` | `DocumentInfo` |
| `document_info` | `docId` | `DocumentInfo` |
| `list_documents` | — | `DocumentInfo[]` |
| `dirty_documents` | — | `DocumentInfo[]` |
| `close_document` | `docId`, `force` | `boolean` |
| `document_truck` | `docId` | `Truck` |
| `document_engines` | `docId` | `Engine[]` |
| `document_gearboxes` | `docId` | `Gearbox[]` |
| `document_suspensions` | `docId` | `SuspensionSet[]` |
| `document_winches` | `docId` | `Winch[]` |
| `document_wheels` | `docId` | `Wheels` |
| `document_wheel` | `docId` | `Wheel` |
| `document_addon` | `docId` | `TruckAddon` |
| `set_attr` | `docId`, `revision`, `selector`, `name`, `value` | `MutationResult` |
| `set_text` | `docId`, `revision`, `selector`, `text` | `MutationResult` |
| `add_element` | `docId`, `revision`, `parent`, `name`, `index` | `MutationResult` |
| `remove_element` | `docId`, `revision`, `selector` | `MutationResult` |
| `move_element` | `docId`, `revision`, `selector`, `to` | `MutationResult` |
| `set_crane` | `docId`, `revision`, `crane`, `enabled` | `MutationResult` |
| `set_trailer` | `docId`, `revision`, `trailer`, `enabled` | `MutationResult` |
| `set_bandit_crane` | `docId`, `revision`, `enabled` | `MutationResult` |
| `save_document` | `docId` | `SaveResult` |
| `save_all_documents` | `force?` | `SaveResult[]` |
| `reset_document` | `docId` | `DocumentInfo` (перечитать с диска) |
| `document_defaults` | `docId` | `DefaultValue[]` |
| `reset_document_defaults` | `docId` | `MutationResult` |
| `export_epf` | `docId`, `path` | `EpfExportReport` |
| `import_epf` | `docId`, `path` | `EpfImportReport` |
| `watch_documents` | `paths` | — |

`DocumentKind`: `truck`, `trailer`, `engines`, `gearboxes`, `suspensions`, `winches`,
`wheels`, `wheel`, `addon`. `Crane`: `ru`, `us`. `Trailer`: `scout`, `truck`.

`value = null` в `set_attr` удаляет атрибут. `index = null` в `add_element` добавляет в конец.
`force = null` в `close_document` трактуется как `false`.
`save_document` после записи пересобирает архив своего документа, `save_all_documents` —
архивы всех открытых документов (по `modName`): `initial.pak` или `.pak` мода.
`force = true` у `save_all_documents` пересобирает архивы и без изменений.

`document_defaults` отдаёт значения из встроенной выгрузки 1.4.0 для файла документа;
`reset_document_defaults` применяет их ко всем найденным путям за одну мутацию и ставит
`dirty`. `reset_document` по-прежнему отбрасывает правки, перечитывая файл с диска.

### Система и обновления

| Команда | Аргументы | Результат |
|---|---|---|
| `open_url` | `url` (только http/https) | — |
| `open_path` | `path` | — |
| `check_update` | `force` | версия или `null` |
| `download_update` | `version`, `portable` | путь к файлу |
| `run_installer` | `path`, `portable` | закрывает приложение |

## События

| Событие | Payload | Когда |
|---|---|---|
| `update-progress` | `{ percent, downloaded, total }` | загрузка обновления |
| `documents-changed` | `{ paths: string[] }` | файл открытого документа изменён извне |

`percent` — 0–99 (100 не отправляется), `total` — `null`, если сервер не сообщил размер.
Подписка: `events.updateProgress.listen(...)` в [updates.ts](../src/api/updates.ts).
`watch_documents` заменяет набор наблюдаемых файлов (пустой список выключает watcher);
событие `documents-changed` приходит после 150 мс тишины, чтобы не дублировать записи
одного сохранения. Подписка — `events.documentsChanged.listen(...)` в
[documents.ts](../src/api/documents.ts).
События объявляются в `specta_builder().events(collect_events![...])`.

## Генерация типов

```powershell
npm run typegen
```

Команда запускает `cargo run --features typegen --bin typegen` и пишет
`src/api/bindings.ts`. CI выполняет её и падает, если файл изменился:

```powershell
git diff --exit-code src/api/bindings.ts
```

Новые DTO нужно добавить в `specta_builder().typ::<T>()`, иначе тип не попадёт в bindings.

## Как добавить команду

1. Реализуйте сценарий в `sxmle-app` (или `domain`/`storage`) и верните `Result`.
2. Добавьте `#[tauri::command]` и `#[specta::specta]` в `src-tauri/src/commands/<группа>.rs`.
3. Зарегистрируйте функцию в `commands/mod.rs` (`collect_commands!`).
4. Добавьте DTO в `specta_builder().typ::<T>()`, если это новый тип.
5. Выполните `npm run typegen`.
6. Добавьте обёртку в `src/api/*`; для fallible-команды — через `call()`.
7. Напишите Rust-тест и, если есть UI, Vitest-тест.
8. Обновите этот документ; при изменении сценариев — [data-and-archive.md](data-and-archive.md).

Не переименовывайте существующие команды без необходимости: это ломает совместимость
со старыми сборками и тестами.
