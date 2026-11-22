# Разработка

## Первый запуск

```powershell
npm ci
npm run tauri:dev
```

Нужны Node 24.x, Rust stable и WebView2. Полный список команд — [commands.md](commands.md).

## Правила архитектуры

1. **Rust — владелец данных.** Webview не читает файлы, не разбирает XML и не работает с zip.
2. **Сценарии в `sxmle-app`.** Команда Tauri должна быть тонкой: разобрать аргументы,
   вызвать сценарий, вернуть DTO.
3. **DTO не пишутся руками.** `bindings.ts` генерируется; новые типы добавляются в `specta_builder()`.
4. **Один писатель документа.** Любая мутация принимает `revision`; не обходите `DocumentSession`.
5. **Атомарная запись.** Новые файлы/архивы пишите через `write_atomic`/zip-слой, не `fs::write`.
6. **Состояние — по месту.** zustand только для UI; игровые данные — в Rust.
7. **Минимальные правки.** Не переписывайте файл целиком без необходимости.

## Стиль кода

### TypeScript / React

* табы, LF, одинарные кавычки, без точек с запятой;
* strict TypeScript, path-aliases `@renderer`, `@utilities`, `@localization`;
* функциональные компоненты и хуки; побочные эффекты — в `useEffect`;
* типы импортируются через `import type`;
* SCSS рядом с компонентом;
* `npm run lint` и `npm run check` перед коммитом.

### Rust

* `cargo fmt` (табы, ширина 100), `cargo clippy -- -D warnings`;
* комментарии и тесты — на русском;
* ошибки — `thiserror`, без `unwrap` в рабочем коде;
* публичные функции и структуры документируются `///`;
* доменные ошибки маппятся в `CommandError` в `src-tauri/src/error.rs`.

## Типовые изменения

### Новая команда

1. Сценарий в `sxmle-app` (или `domain`/`storage`) с `Result`.
2. `#[tauri::command]` + `#[specta::specta]` в `src-tauri/src/commands/<группа>.rs`.
3. Регистрация в `commands/mod.rs`.
4. Новый DTO — в `specta_builder().typ::<T>()`.
5. `npm run typegen`.
6. Обёртка в `src/renderer/api/*` (fallible — через `call()`).
7. Rust-тест + Vitest при наличии UI.
8. Обновить [ipc-contract.md](ipc-contract.md).

### Новое поле редактора

1. Прочитать атрибут в сущности через `AttrReader` (`integer`, `float`, `string`, `boolean`,
   `string_array`, `position`).
2. Задать `label`/`desc` ключом `модуль.поле`, при необходимости `limit`, `step`, `options`, `areas`.
3. Добавить поле в группу `TruckTable` или связанного документа.
4. Добавить подпись в `FIELD_TEXTS` и, если нужно, `OPTION_TEXTS`.
5. Проверить `npm run typegen` и тест модели.

### Новая настройка

1. Поле в `Config` + дефолт + `serde(default)` ([config.rs](../src-tauri/crates/app/src/config.rs)).
2. Учесть в `save_config`/`sanitize_lang`, если есть инварианты.
3. Поле в `IConfig` и `fromConfigDto` ([config.ts](../src/renderer/config.ts)).
4. Переключатель на экране настройки.
5. Тест конфигурации и, если есть UI, тест экрана.

### Новая строка локализации

1. Добавить ключ в `ru.ts` (эталон).
2. Добавить его в `en.ts`, `de.ts`, `ch.ts` — иначе `tsc` покажет расхождение структуры.
3. Использовать через `T.<раздел>`.
4. Прогнать `npm run check` и `npx vitest run src/renderer/tests/localization.test.ts`.

### Изменение архива/zip

1. Правило — в `sxmle-storage::zip`; сценарий — в `sxmle-app::archive`.
2. Не ломать порядок записей и метаданные.
3. Добавить тест на копию `initial.pak` или синтетический zip.
4. Обновить [data-and-archive.md](data-and-archive.md) и [limits.md](limits.md).

### Новая версия

Синхронно:

* `package.json` и `package-lock.json`;
* `src-tauri/Cargo.toml` (`[package]` и `[workspace.package]`);
* `src-tauri/tauri.conf.json`;
* `site/download.html` и `site/version-info.json` — только после публикации файлов;
* [changelog.md](changelog.md).

## Работа с git

* Переименование/перемещение — `git mv`.
* Не коммитьте `dist`, `node_modules`, `src-tauri/target`, `initialpak`.
* Один коммит — одна логическая причина; сообщения по-русски, в повелительном наклонении.
* Перед push: `npm run check`, `npm run lint`, `npm test`, Rust-проверки.

## Ревью

Проверьте:

- [ ] нет обхода команд Tauri и прямого доступа к ФС из webview;
- [ ] мутации учитывают `revision`, ошибки не глотаются;
- [ ] нет `unwrap`/`expect` в пользовательских путях;
- [ ] запись атомарная, пути проверены;
- [ ] `bindings.ts` перегенерирован и совпадает с Rust;
- [ ] тесты добавлены/обновлены;
- [ ] документация и [limits.md](limits.md) актуальны.

## Документация

* Документы — в `docs/`, по одной теме на файл.
* Ссылки на код — относительные.
* Не копируйте сюда `bindings.ts` и не дублируйте таблицу команд.
* Исторические файлы (`MIGRATION-PLAN.md`, `.env.example`, `AGENTS.md`) не являются спецификацией.
