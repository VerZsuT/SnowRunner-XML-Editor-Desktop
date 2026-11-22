# Документация разработчика

SnowRunner XML Editor Desktop — десктопный редактор XML-файлов игры SnowRunner.
Версия 2.x работает на **Tauri v2 + Rust**, интерфейс — **React 19 + antd 6**.
Эти документы описывают текущее состояние кода, а не историю миграции.

## Кому и как читать

| Роль | Порядок |
|---|---|
| Новый разработчик | [commands.md](commands.md) → [architecture.md](architecture.md) → [backend.md](backend.md) → [frontend.md](frontend.md) |
| Разработчик задачи | [architecture.md](architecture.md) → тематический файл ([backend.md](backend.md), [frontend.md](frontend.md), [data-and-archive.md](data-and-archive.md)) → [testing.md](testing.md) |
| ИИ-агент | [architecture.md](architecture.md) → [ipc-contract.md](ipc-contract.md) → [limits.md](limits.md) → исходники затронутого модуля |
| Релиз / эксплуатация | [commands.md](commands.md) → [roadmap.md](roadmap.md) → [changelog.md](changelog.md) |

## Карта документов

| Файл | О чём |
|---|---|
| [architecture.md](architecture.md) | Слои, зависимости, потоки данных, границы ответственности |
| [backend.md](backend.md) | Rust-ядро: XML, доменная модель, zip, сценарии, реестр документов |
| [frontend.md](frontend.md) | React-интерфейс, состояние, API-клиенты, локализация |
| [ipc-contract.md](ipc-contract.md) | Команды Tauri, события, DTO, ошибки, генерация типов |
| [data-and-archive.md](data-and-archive.md) | Каталоги данных, `initial.pak`, сохранение, моды, обновления, `.epf` |
| [limits.md](limits.md) | Известные ограничения и принятые компромиссы |
| [commands.md](commands.md) | npm, Cargo, PowerShell/cmd и проверки CI |
| [testing.md](testing.md) | Тесты, фикстуры, CI и ручной чек-лист |
| [development.md](development.md) | Правила кода, типовые рецепты изменений, ревью |
| [roadmap.md](roadmap.md) | Планы и направления развития |
| [changelog.md](changelog.md) | Логическая история версий начиная с перехода на React |
| [glossary.md](glossary.md) | Термины предметной области и проекта |

## Источники правды

При расхождении документа с кодом прав код; документ нужно поправить в том же изменении.

| Что | Где |
|---|---|
| Версия | [package.json](../package.json), [Cargo.toml](../src-tauri/Cargo.toml), [tauri.conf.json](../src-tauri/tauri.conf.json) — меняются вместе |
| Контракт команд | `src-tauri/src/commands/` и сгенерированный [bindings.ts](../src/api/bindings.ts) |
| DTO и типы | Rust-структуры + `specta_builder()` в [lib.rs](../src-tauri/src/lib.rs) |
| Каталоги и режимы данных | [paths.rs](../src-tauri/crates/app/src/paths.rs) |
| Конфигурация | [config.rs](../src-tauri/crates/app/src/config.rs) и [config.ts](../src/config.ts) |
| Доменная модель игры | `src-tauri/crates/domain/src/game/` |
| Сайт и автообновление | [site/README.md](../site/README.md), [site/version-info.json](../site/version-info.json) |
| План миграции 1.x → 2.x | [MIGRATION-PLAN.md](../MIGRATION-PLAN.md) — исторический документ, не текущая спецификация |

## Ключевые инварианты

1. **Rust владеет данными.** Webview не читает файлы, не разбирает XML и не знает про zip.
2. **Только команды.** Любое действие интерфейса — вызов команды Tauri; обходного доступа к ФС нет.
3. **Типы не пишут руками.** `bindings.ts` генерируется из Rust; CI проверяет расхождение.
4. **Один писатель документа.** У документа есть `docId` и `revision`; устаревшая мутация отклоняется.
5. **Правки в памяти.** На диск документ попадает только по явной команде сохранения.
6. **Атомарная запись.** Файлы и архивы заменяются через временный файл и переименование.
7. **Один формат игры.** Неизвестная структура архива даёт явную ошибку, а не догадку.

## Границы

* [site/](../site/) — статический сайт для GitHub Pages (страница загрузки и `version-info.json`).
  Источник GitHub Pages должен указывать на ветку и каталог `/site`,
  иначе страница загрузки и проверка обновлений будут отдавать 404.
* [docs/](.) — только документация разработчика. После переключения GitHub Pages на `site/` не публикуется как сайт.

## Устаревшие следы

В репозитории остались файлы эпохи 1.x и Electron: `MIGRATION-PLAN.md`, `.env.example`, `AGENTS.md`.
Упоминания `emr-bridge`, `valtio`, `electron`, WinRAR и переменных `DEV_*` относятся к старой архитектуре;
текущий код их не использует. Не переносите эти решения в новые задачи.

## Как поддерживать документы

* Пишите факты и инварианты, а не пересказ файлов.
* Ссылайтесь на исходники относительными ссылками.
* Меняете поведение — обновите соответствующий документ, [limits.md](limits.md) и, если нужно, [changelog.md](changelog.md).
* Не дублируйте таблицу команд в нескольких файлах: `bindings.ts` — источник истины.
