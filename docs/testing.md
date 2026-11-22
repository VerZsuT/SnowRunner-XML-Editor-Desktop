# Тесты

## Уровни

| Уровень | Где | Что проверяет |
|---|---|---|
| Rust unit | `#[cfg(test)] mod tests` рядом с модулем | значения, дескрипторы, лимиты, шаблоны, селекторы, zip-заголовки, пути |
| Rust integration | `crates/*/tests` | XML на фикстурах, документы, архивы, EPF, игра |
| Vitest node | `src/tests/api`, `localization`, `strings` | чистые преобразования, словари, строки |
| Vitest jsdom | `src/tests/components`, `tests/pages` | компоненты и экраны с Testing Library |
| Ручной чек-лист | ниже | то, что нельзя проверить в CI: реальная игра и Windows |

E2E, визуальных и нагрузочных тестов нет.

## Запуск

```powershell
npm test                 # все Vitest-проекты
npm run test:watch       # watch
npm run test:coverage    # coverage
npx vitest run --project node
npx vitest run --project jsdom

cargo test --manifest-path src-tauri/Cargo.toml --workspace --all-targets
cargo test --manifest-path src-tauri/Cargo.toml -p sxmle-storage
cargo test --manifest-path src-tauri/Cargo.toml -p sxmle-domain
cargo test --manifest-path src-tauri/Cargo.toml -p sxmle-app
```

Перед `cargo test` нужен `dist`: `npm run build` (иначе `generate_context!` не соберётся).

## Rust-тесты

* Имена тестов — русские, описывают сценарий.
* Модульные тесты лежат в `tests.rs` рядом с модулем.
* Интеграционные тесты — в `crates/<crate>/tests/`.
* `cargo clippy --workspace --all-targets -- -D warnings` и `cargo fmt --check` обязательны.

### Фикстура `initialpak/`

Каталог `initialpak/` не хранится в git (см. `.gitignore`). В нём лежат:

* `initial.pak` — копия архива игры;
* `[media]/classes` — распакованные XML;
* `[media]/_templates`, `[media]/_dlc`, `[strings]`.

Интеграционные тесты `game`, `documents`, `game_fixture` проверяют наличие каталога
и **пропускаются**, если его нет. В CI фикстуры нет, поэтому эти тесты не выполняются;
локально они дают основную проверку реальных файлов.

Тесты, которым нужна запись, копируют фикстуру во временный каталог
(`CARGO_TARGET_TMPDIR`) и не портят оригинал.

### Что покрыто

* lossless-разбор и форматирование XML, кодировки, сущности, несколько корней;
* селекторы и мутации;
* шаблоны `_templates`;
* модели Truck/Engine/Gearbox/Suspension/Winch/Wheels/Addon на фикстуре;
* реестр документов: открытие, версии, сохранение, сброс, EPF, действия;
* zip: чтение, обновление, порядок, CRC, атомарность;
* пути, режимы данных, миграция json (функция есть, в приложении не вызывается);
* обновления: версии, URL, имена файлов.

## Vitest

Два проекта в [vitest.config.ts](../vitest.config.ts):

| Проект | Environment | Include |
|---|---|---|
| `node` | node | `tests/api/**/*.test.ts`, `localization.test.ts`, `strings.test.ts` |
| `jsdom` | jsdom | остальные `*.test.{ts,tsx}` |

Особенности:

* `tests/setup.ts` добавляет `matchMedia`, `ResizeObserver`, `IntersectionObserver`, `scrollTo`;
* `@ant-design/icons` заменяется на ESM-вход: CJS-вход ломает именованные экспорты;
* `deps.optimizer` предсобирает antd/react — иначе тысячи модулей;
* пул `threads`, `maxWorkers: 100%`.

Экраны принимают клиентов и загрузчики пропсами (`client`, `load`, `lists`, `texts`).
В тестах подменяйте их, а не `vi.mock` всего модуля.

## CI

`.github/workflows/ci.yml`:

| Job | Шаги |
|---|---|
| `verify` | Node 24, `npm ci`, `check`, `lint`, `test` |
| `rust` | `npm ci`, `npx vite build`, `typegen` + `git diff --exit-code bindings.ts`, `cargo test`, `clippy`, `fmt --check` |
| `package` | по тегу или `workflow_dispatch`: `npm run tauri:build`, установщик и портативный zip в артефакты |

`package` не публикует релиз автоматически: файлы нужно приложить к GitHub Release.

## Ручной чек-лист

Минимум перед релизом:

1. Чистая Windows 11: установка NSIS, запуск, окно, список траков.
2. Windows 10 без WebView2 (или с удалённым): установщик ставит компонент при наличии сети.
3. Портативный zip: `portable.txt` рядом с exe, данные в `data`.
4. Выбор `initial.pak`, распаковка, список траков и прицепов, фильтры, избранное.
5. Открытие трака, правка нескольких полей, сохранение, «Обновить архив», `verify`.
6. Запуск игры с пересобранным архивом: трак загружается, параметры применились.
7. Бэкап, изменение, восстановление бэкапа.
8. DLC-трак и мод: открытие, правка, сохранение, обновление архива/мода.
9. Игровые переводы названий; переключение языка с перезагрузкой.
10. Экспорт/импорт `.epf`, краны, прицепы, «Банан бандита» (Zikz 605R).
11. Переключение портативного режима, перезапуск, сохранность json.
12. Проверка обновления: `version-info.json`, загрузка, установка, портативный zip.
13. Закрытие с несохранёнными правками: предупреждение; закрытие приложения — правки теряются.

## Что тестировать при изменении

| Изменение | Обязательные тесты |
|---|---|
| XML/селектор | `cargo test -p sxmle-domain`, фикстуры `xml_core`, `xml_fixture` |
| Модель/поле | unit-тест сущности + `game_fixture` при наличии фикстуры |
| Команда | Rust-тест сценария + проверка `bindings.ts` через `typegen` |
| Документы/сохранение | `crates/app/tests/documents.rs` (копия фикстуры) |
| Zip | `cargo test -p sxmle-storage` |
| Экран/компонент | Vitest jsdom с подменённым клиентом |
| Локализация | `localization.test.ts`; структура `Locale` проверяется `tsc` |
| Конфигурация | `config/tests.rs`, `pages/setup.test.tsx` |

## Пробелы

* Нет E2E с настоящим окном Tauri.
* Нет проверки запуска игры в CI.
* Нет тестов на повреждённый архив/сбой питания, кроме unit-сценариев.
* Нет порога покрытия.
* Фикстурные тесты в CI пропускаются.
