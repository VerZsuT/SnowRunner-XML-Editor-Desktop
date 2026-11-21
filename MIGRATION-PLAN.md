# План миграции: Electron + WinRAR → Tauri v2 + Rust

**Статус:** черновик, согласование
**Дата:** 2026-11-21
**Область:** весь проект `SnowRunner-XML-Editor-Desktop` (десктоп-редактор XML SnowRunner)
**Цель:** уйти от Electron и от бандла WinRAR; main-процесс и работа с XML — на Rust; UI — тонкий клиент, который получает JSON и отправляет команды.

Документ самодостаточен: в нём есть исходное состояние, факты по формату `initial.pak`, целевая архитектура, контракт DTO/команд, этапы с критериями приёмки, риски и открытые вопросы.

---

## 1. Исходное состояние (на момент написания)

### 1.1. Стек

| Компонент | Значение |
|---|---|
| Electron | 45.4.1, Electron Forge 8 + `@electron-forge/plugin-vite` |
| Сборка | Vite 8.3, три конфига: main / preload / renderer (`src/build-configs/vite.*.config.ts`) |
| UI | React 19.3, antd 6.7, zustand 5 (UI-состояние), valtio 2 (межпроцессные поля) |
| Мост | `emr-bridge` 2.1.0 — собственный IPC-слой поверх `ipcRenderer`/`ipcMain` |
| Тесты | Vitest 5.1, jsdom, 38 тестовых файлов |
| Язык | TypeScript 6.0 |
| Платформа | Windows x64; установщик Inno Setup, портативный режим по маркеру `portable.txt` |

### 1.2. Структура кода

- `src/main` — точка входа main-процесса, жизненный цикл (`base-program.ts`, `program.ts`).
- `src/**/main/**` — 52 TS-файла (без тестов): файлы, архивы, DLC, моды, тексты игры, конфиг, обновления, диалоги, окна, DI и публикация моста.
- `src/modules/*/renderer` + `src/renderer` — UI: 76 TSX-файлов, страницы setup / lists / editor / update.
- `src/modules/xml` — доменная модель XML: `core` (cheerio + xml-formatter), `game` (40+ классов: Truck, Engine, Gearbox, Suspension, Wheels, Addon…), шаблоны `_templates`, дескрипторы атрибутов (`game/attributes.ts`, 587 строк).
- `src/utilities/bridge` — декораторы моста: `@mainMethod`, `@mainObjectField`, `@mainArrayAccessor`.
- `src/modules/archiver/main/archiver/files` — бандл WinRAR.exe, Rar.exe, UnRAR.exe, `unpack-list.lst`, `unpack-list-optimized.lst`, `unpack-mod-list.lst`.

### 1.3. Как это работает сейчас

1. Main распаковывает `initial.pak` через WinRAR в `data/mainTemp` (списки `@unpack-list*.lst`), кэширует размер архива.
2. Renderer читает XML-файлы через мост, строит модель (`TruckXML` и вложенные классы), **сам сериализует XML** по сохранению: `file.write(xml.baseXML)` (например, [truck.tsx](src/renderer/pages/general/editor/components/tables/truck/truck.tsx#L39)).
3. Main собирает изменённые файлы обратно в архив WinRAR-командой `f` (+ маркер `edited`), предварительно делая бэкап `initial.pak`.
4. Диалоги — синхронные (`showOpenDialogSync` / `showSaveDialogSync`), вызываются синхронно и из main, и из UI.
5. Обновление — собственный HTTPS-загрузчик + запуск скачанного `.exe` (Inno) или показ `.rar`.

### 1.4. Почему текущий мост не переносится

`emr-bridge` использует синхронный IPC Electron:

- `ipcRenderer.sendSync('GET_PUBLIC_INFO')` при старте preload и при каждом чтении свойства/вызове функции (`tunnels.js`);
- `ipcMain.on(...)` + `event.returnValue` на стороне main (`publish.js`);
- двусторонняя реактивность полей (valtio) поверх событий.

В Tauri синхронного IPC нет: только асинхронные `invoke` и события. Значит мост переписывается, а не портируется.

Поверхность моста: ~50 методов, 6 переменных, 4 object-поля и 1 array-поле.

---

## 2. Целевая архитектура

### 2.1. Принципы

1. **Rust — единственный владелец состояния и файлов.** Webview не читает и не пишет файлы, не разбирает XML, не знает про zip.
2. **JSON-контракт = форма предметной модели**, а не сырой XML. UI получает готовые значения, метаданные и enum-опции.
3. **Мутации — команды с адресацией**, а не пересылка всего документа: `set_attr(doc_id, path, name, value)`.
4. **Типы не пишутся руками:** `specta`/`ts-rs` генерируют TS-типы из Rust-структур, CI проверяет расхождение.
5. **События — только для состояния, которое меняется само** (прогресс, внешние изменения файлов, завершение фоновых задач).
6. **Один писатель:** документ имеет `revision`; параллельные записи запрещены, autosave сериализуется очередью.

### 2.2. Слои Rust-ядра

```text
crates/
  domain/      # XML-дерево, форматирование, шаблоны, модель Truck/Engine/... , дескрипторы
  storage/     # zip (read/update/add/verify), файловые примитивы, watcher, пути, бэкапы
  app/         # use-cases: открыть initial.pak, распаковать, открыть трак, сохранить, обновить
  tauri/       # команды, события, state, capabilities
```

Зависимости: `quick-xml` (парсер; сериализатор — свой, чтобы контролировать форматирование), `flate2` (deflate), `rayon` (параллельное сжатие), `serde`/`serde_json`, `specta` + `tauri-specta`, `notify` (watch), `reqwest` (обновления), `zip`-crate **не используется** (см. §4).

### 2.3. Контракт DTO

Форма DTO повторяет текущую модель, чтобы UI-правки были механическими:

```ts
// Генерируется из Rust (specta); пример формы
interface TruckDto {
  docId: string
  revision: number
  fileName: string
  fileType: 'truck' | 'trailer' | 'addon'
  dlc?: string
  mod?: string

  name: Field<string>
  country: Field<string>
  engine: EngineDto | null
  gearbox: GearboxDto | null
  wheels: WheelsDto | null
  addonSockets: SocketDto[]
  // ...
}

interface Field<T> {
  value: T
  defaultValue: T
  descriptor: AttrDescriptor
}

interface AttrDescriptor {
  name: string            // имя XML-атрибута
  selector: string        // стабильный путь к элементу внутри документа
  attrType: 'string' | 'integer' | 'float' | 'boolean' | 'stringArray' | 'position'
  label?: string          // ключ/строка локализации
  desc?: string
  limit?: { minValue?: number; maxValue?: number }
  step?: number
  areas?: { /* цветовые зоны числового поля */ }
  options?: string[]      // для enum-полей
}
```

Правила:

- `selector` — не cheerio-селектор из текущего кода, а стабильный путь (например, `/Truck/Engine` + индекс), вычисляемый в Rust; UI его не парсит, а передаёт обратно.
- Значения enum сериализуются строками, как в XML; списки строк (`First, Second`) — массивами, конвертация в Rust.
- Позиция (`Position`) — `{x, y, z}`, а не строка.
- `value` — значение из элемента; если атрибута нет, но он объявлен в шаблоне `_templates`, `value` берётся из шаблона (как в текущей модели). `defaultValue` — объявленный в модели дефолт: его показывает UI, когда значения нет, и использует при сбросе.
- `label`/`desc` — ключи локализации (например, `gameData.price`), перевод остаётся в UI: модель не тащит за собой 50 файлов переводов.
- **Дескрипторы**: в DTO (один источник правды). Экспорт — `Builder::disable_serde_phases()`: DTO только читаются webview, пары `*_Serialize`/`*_Deserialize` не нужны.
- Крупные документы не пересылаются на каждое нажатие: команда мутации возвращает только затронутый `Field<T>` (и, при необходимости, пересчитанные зависимые поля).

### 2.4. Команды (черновой список)

```text
app:      app_info, app_quit, app_restart, open_devtools
setup:    pick_initial_pak, check_data_access, unpack_initial, backup_status
files:    list_trucks, list_addons, read_file_summary, watch_file
docs:     open_document(kind, path), close_document(doc_id), get_document(doc_id)
docs:     set_attr(doc_id, path, name, value) -> Field, reset_attr(...), set_position(...)
docs:     save_document(doc_id) -> SaveResult, save_all
import:   export_epf, import_epf, join_epf, reset_document
archive:  update_archive(archive_path, changes), verify_archive(path), backup_initial
update:   check_updates, download_update(url, path, progress_event), run_installer(path)
system:   open_url(url), open_path(path), show_in_folder(path)
dlg:      choose_file(filters), choose_save_path(default_name), message_box(kind, buttons)
```

Диалоги — асинхронные команды (Tauri `plugin-dialog`), UI переводится на `await` в 3 местах (`initial-select.tsx`, `import.tsx`, `export.ts`) и в main-сценариях (epf, modifications).

### 2.5. События

- `progress://stage` — стадии загрузки/распаковки (сейчас `loading` через мост).
- `file://changed` — внешнее изменение файла (сейчас `fs.watch`).
- `archive://changed` — архив изменён извне (сейчас сравнение размера).
- `doc://changed` — документ изменён другой командой (если появятся фоновые операции).

---

## 3. Факты по `initial.pak` (проверено)

Разобран [initialpak/initial.pak](initialpak/initial.pak) — 29 925 376 байт:

| Свойство | Значение |
|---|---|
| Формат | ZIP, локальные заголовки с offset 0, central directory в конце (28 523 207) |
| Записей | 12 171 |
| Методы сжатия | 0 (stored) — 9 643; 8 (deflate) — 2 528 |
| zip64 | нет |
| Data descriptor (флаг 8) | нет |
| Extra-поля / комментарии записей | нет |
| Комментарий архива | нет |
| Имена | с обратными слэшами: `[media]\classes\...` |
| Порядок | не алфавитный, фиксированный; первая запись — `pak.load_list` |
| Промежутки между записями | отсутствуют |
| `pak.load_list` | 2 578 963 байта, stored, бинарный манифест загрузки (стадии `RES3_INIT load`, `DEFAULT load`, `DESC_BLOCK load`, имена файлов). **Не таблица офсетов** |

Вывод: пересборка архива со сдвигом офсетов безопасна, если сохранить порядок записей и скопировать `pak.load_list` без изменений.

### 3.1. Проверка (PoC, выполнена)

Пересборка без WinRAR:

```text
вход:  29 925 376 байт, 12 171 запись
операция: копирование сжатых данных неизменённых записей,
          пересжатие одного XML ([media]\_templates\environment.xml),
          добавление маркера "edited" в конец
выход: 29 923 465 байт, 12 172 записи
порядок записей: сохранён
побайтово идентичных записей: 12 170 из 12 171 (одна пересжата)
inflate + CRC: 12 172 / 12 172 ok
WinRAR.exe t: exit 0
время: ~132 мс на 30 МБ (копирование + одна пересборка)
```

Артефакт проверки после PoC удалён; сценарий воспроизводится на `initialpak/initial.pak` (см. §4.2 и этап 1).

### 3.2. Что не проверено

- Принимает ли игра пересобранный архив (нужен тест на копии `initial.pak` в реальной игре).
- Поведение при размере архива > 4 ГБ (zip64) и при числе записей > 65 535.
- Нужен ли игре конкретный порядок записей помимо «первая — pak.load_list»; PoC сохраняет порядок полностью, поэтому риск низкий.

---

## 4. Замена WinRAR: zip-слой на Rust

### 4.1. Требования

1. Читать архив потоково (не грузить 1+ ГБ в память).
2. Распаковывать по спискам `unpack-list.lst` / `unpack-list-optimized.lst` / `unpack-mod-list.lst` (файлы остаются ресурсами, это данные, а не WinRAR-специфика).
3. Обновлять архив: изменённые файлы заменять, новые добавлять в конец, маркер `edited` — в конец, порядок существующих записей сохранять.
4. Неизменённые записи копировать сжатым потоком как есть (без пересжатия).
5. Сохранять метаданные записей: метод, время/дату DOS, версии, атрибуты, «сырые» имена с backslash.
6. Атомарная замена: временный файл рядом → `fsync` → rename поверх; снятие read-only до операции.
7. Бэкап и проверка «архив изменён извне» — как сейчас (по размеру).

### 4.2. Алгоритм обновления

```text
update(archive, changed_files):
  tmp = archive + ".tmp"
  entries = read_central_directory(archive)        # порядок как в CD
  for e in entries:                                # строго исходный порядок
      if e.name in changed_files:
          data = changed_files[e.name].read()
          packed = deflate(data, method=e.method)  # сохранить метод записи
          write_local_header(tmp, e.meta, crc32(data), len(data), len(packed))
          write(tmp, packed)
      else:
          write_local_header(tmp, e.meta, e.crc, e.usize, e.csize)
          stream_copy(archive[e.data_offset .. e.data_offset+e.csize], tmp)
  for new_file in appended_files:                  # новые + "edited"
      write_local_header(...); write(compressed data)
  write_central_directory(tmp, same order)
  write_eocd(tmp)
  fsync(tmp); replace(archive, tmp)
```

### 4.3. Ограничения и решения

| Риск | Решение |
|---|---|
| zip64 (>4 ГБ, >65 535 записей) | поддержать zip64 сразу либо падать с явной ошибкой до записи; реальный `initial.pak` проверить на размер |
| Сжатие изменённых файлов отличается от WinRAR | игра читает deflate, размер не важен; метод записи сохраняется |
| Игра валидирует архив | тест на копии в игре; при провале — вернуть WinRAR как временный fallback за флагом |
| Долгая пересборка большого архива | потоковое копирование, `rayon` для пересжатия изменённых, отмена по прогрессу; прирост скорости относительно WinRAR ожидается |
| Кириллица/обратные слэши в именах | писать имена как сырые байты UTF-8, без нормализации |
| Антивирус/лочение временного файла | `maxRetries` при rename (как сейчас в `fs.rm`), понятная ошибка |

### 4.4. Что удаляется

- `src/modules/archiver/main/archiver/files/*` (WinRAR.exe, Rar.exe, UnRAR.exe, dll, SFX) — минус ~10 МБ и лицензионная проблема с бандлом WinRAR.
- `execFile`-обёртка и таймаут 10 минут.
- Коды завершения WinRAR (0/1/10).

---

## 5. Этапы

Оценки — при полной занятости одного разработчика; этапы 0 и 1 можно вести параллельно.

### Этап 0. Каркас Tauri (2–3 дня)

- Tauri 2.12.x + Vite 8 + React 19 + antd 6, одно окно, dev/build.
- `specta` + `tauri-specta`, генерация TS, CI-проверка.
- Команды-заглушки: `app_info`, `choose_file`, `open_document` (фикстура), прогресс-событие.
- Один экран редактора на DTO-фикстуре.

**Приёмка:** `cargo tauri dev` открывает окно, antd-компоненты работают, `invoke` возвращает типизированный DTO, `npm run build` собирает бандл, размер установки без Node — единицы МБ.

### Этап 1. Zip-слой (≈1 неделя)

- Reader: central directory, локальные заголовки, потоковая распаковка по префиксам/спискам.
- Writer: update/add по алгоритму §4.2, атомарная замена, zip64-guard.
- Команды: `unpack_initial`, `update_archive`, `verify_archive`.
- Интеграция в текущий TS-main через временный шим (или сразу в Rust-скелет), чтобы прогнать существующие сценарии.
- Тест: PoC-сценарий на `initialpak/initial.pak`, WinRAR `t` как независимый валидатор (пока он ещё в проекте), затем проверка в игре.

**Приёмка:** распаковка даёт тот же набор файлов, что WinRAR; обновление одного XML + маркер проходит `WinRAR t`; игра запускается с пересобранным архивом; побайтовое сравнение неизменённых записей 100%.

### Этап 2. XML core (≈2 недели)

- Парсер (`quick-xml`) → собственное дерево с сохранением неизвестных узлов, атрибутов и порядка.
- Сериализатор с зафиксированной политикой: отступ 2 пробела, `\r\n`, самозакрытие пустых тегов, обработка сущностей (сейчас `&amp;` → `&` — см. §7, вопрос 1).
- Шаблоны `_templates` (Include), извлечение значений по умолчанию.
- Портируемые тесты из `core.test.ts`, `xml-templates.test.ts` + прогон на 2 708 XML из фикстуры (идемпотентность: parse → serialize → parse → serialize).

**Приёмка:** идемпотентность на всех файлах фикстуры; сохранение не теряет узлы/атрибуты; формат совпадает с текущим (diff по файлам, которые редактор не трогал, — пустой).

### Этап 3. Доменная модель и дескрипторы (3–4 недели)

- 40+ классов: Truck, Trailer, Addon, Engine, Gearbox, Suspension, Wheels, Winch, позиции, лимиты.
- Резолв ссылок: DLC (обратный порядок) → мод → `classes`, бэкап-данные; батч-чтение.
- `attributes.rs`: typed-поля, дефолты, лимиты, enum-конверсии, массивы строк, позиции.
- DTO + `specta`-экспорт; сохранение текущих имён полей.
- Портируемые тесты `game-xml.test.ts`, `xml-templates.test.ts`.

**Приёмка:** DTO для всех траков фикстуры строится без ошибок; значения совпадают с текущей моделью на выборке (сравнение «старый TS-парсер vs новый Rust» на 100+ файлах); дескрипторы содержат label/limit/options.

### Этап 4. Перенос UI на команды (2–3 недели)

Порядок: setup → lists → editor (truck, engines/gearboxes/suspensions/wheels/winches, addons) → import/export/reset → update/what's new.

- Замена `mainMethod`/`mainObjectField`/`@inject`-моста на команды и события.
- Параметры: `Parameter`/`Input` получают `Field<T>` вместо замыканий `get/set` ([parameter.tsx](src/renderer/pages/general/editor/components/parameter.tsx)).
- Сохранение: UI больше не сериализует XML; `save_document(docId)` в Rust.
- Удаление `preload.ts`, `emr-bridge`, `valtio`-полей моста; zustand остаётся для UI-состояния.

**Приёмка:** все пользовательские сценарии проходят вручную по чек-листу (открытие initial.pak, правка трака, сохранение в архив, импорт/экспорт epf, reset, обновление игры, бэкап/восстановление); e2e-дымовой тест хотя бы на один сценарий.

### Этап 5. Сборка, обновления, поставка (≈1 неделя)

- Бандлер: NSIS или WiX (или сохранить Inno Setup, упаковывая каталог приложения).
- Портативный режим: маркер `portable.txt` рядом с exe → данные в `<exe_dir>/data` (сохранить текущее поведение).
- Обновления: свой поток скачивания с прогрессом (`reqwest`) + запуск установщика; штатный updater Tauri не подходит (требует подписанных NSIS/MSI, а формат поставки — Inno/`.rar`).
- DevTools: debug-сборка, `FORCE_DEVTOOLS` через feature `devtools`.
- CI: `cargo test`, `cargo clippy`, `npm run check`, `vitest`, сборка Windows, артефакты.

**Приёмка:** установщик и portable-сборка работают на чистой Windows 10/11 с WebView2; обновление с прошлой версии проходит; размер установки и потребление памяти замерены и записаны.

### Этап 6. Вывод Electron (1–2 дня)

- Удаление `electron`, `@electron-forge/*`, forge-конфига, preload, старых vite-конфигов main/preload.
- Обновление README, CI, `.gitignore`, скриптов `package.json`.
- Тег версии.

**Итого:** ~2 месяца full-time; критический путь — этап 3.

---

## 6. Тестирование

| Уровень | Что |
|---|---|
| Rust unit | zip-заголовки, CRC, порядок; XML parse/serialize; дескрипторы; лимиты |
| Golden-тесты | 2 708 XML фикстуры: идемпотентность сериализации; сравнение DTO со старой TS-моделью |
| Интеграция | распаковка/обновление архива на копии `initial.pak` + `WinRAR t` как валидатор (до удаления WinRAR) |
| UI | существующие 38 тестов Vitest адаптируются под DTO; моки моста заменяются моками `invoke` |
| Ручной чек-лист | открытие игры, правка, сохранение, бэкап, восстановление, импорт/экспорт, обновление |
| Игра | запуск с пересобранным `initial.pak`, загрузка траков/аддонов, отсутствие ошибок в логе |

---

## 7. Решения по открытым вопросам

Приняты 2026-11-22, обязательны для этапов 3–5.

| № | Вопрос | Решение |
|---|---|---|
| 1 | Сущности в XML | Пишем **только валидный XML**: при чтении значения декодируются, при записи экранируются (`&amp;`, `&lt;`, `&gt;`, `&quot;`). Байтовое представление сущностей не сохраняем — сохраняем смысл. Кодировка и BOM сохраняются: документ помнит `DocumentEncoding` (UTF-8, UTF-8+BOM, UTF-16LE/BE, любая из `encoding_rs`) и пишется обратно в ней же, с прежним BOM и неизменным объявлением `<?xml ... encoding="..."?>`. |
| 2 | Форматирование | **Нормализуем**: отступ 2 пробела, `\r\n`, `<tag />` для пустых, канонический вид атрибутов. Форматированная запись — единственный путь сохранения в игру. `to_xml()` остаётся для проверки «документ не трогали — байты не изменились». |
| 3 | Дескрипторы | В DTO: `Field<T> { value, defaultValue, descriptor }` + `AttrDescriptor { name, selector, attrType, label?, desc?, limit?, step?, areas?, options? }`. Один источник правды — Rust. |
| 4 | Гранулярность мутаций | Полный набор: `set_attr`, `set_text`, `add_element`, `remove_element`, `move_element` (сокеты, аддоны, массивы). Адресация — стабильным путём узла, вычисленным в Rust. |
| 5 | Автосейв | «Грязные документы»: правки живут в памяти Rust, архив пересобирается одной упаковкой по команде пользователя «Сохранить». Время изменения XML-файлов значения не имеет — важно, что архив в итоге актуален. |
| 6 | Поддержка версий игры | Один формат `initial.pak`. При неизвестной структуре zip — ошибка с предложением скачать последнюю версию с WinRAR (1.4.0); угадывать формат не пытаемся. |
| 7 | Целевые ОС | Windows 10/11 x64 + WebView2. Кроссплатформенные ветки не закладываем. |

---

## 8. Риски

| Риск | Вероятность | Влияние | Мера |
|---|---|---|---|
| Модель/дескрипторы в Rust расходятся с текущим поведением | высокая | высокое | golden-тесты на 100+ файлах, сравнение со старой TS-моделью до удаления Electron |
| Игра не принимает пересобранный архив | низкая | высокое | ранний тест (этап 1) на копии `initial.pak` с бэкапом |
| zip64 / >4 ГБ | средняя | высокое | поддержка zip64 или явная ошибка; проверить реальный размер |
| Долгая пересборка большого архива | средняя | среднее | потоковое копирование, параллельное сжатие, прогресс и отмена |
| UI-регрессии из-за async-диалогов и DTO | высокая | среднее | поэкранный перенос, чек-лист, скриншот-тесты ключевых экранов |
| Потеря данных при сохранении | низкая | критическое | атомарная замена, бэкап, тесты на сбой питания (симуляция), запрет записи без валидации архива |
| Отсутствие WebView2 на машине пользователя | низкая | среднее | проверка при старте + понятное сообщение/установщик WebView2 |
| Оценки сроков | средняя | низкое | этапы 0–1 как spike, пересмотр оценок после них |

---

## 9. Definition of Done

- В репозитории нет `electron`, `@electron-forge/*`, `emr-bridge`, preload, WinRAR-бинарников.
- Main-логика и XML — в Rust; webview не имеет доступа к файловой системе и не парсит XML.
- Установщик и portable-сборка проходят на чистой Windows; обновление работает.
- Все сценарии из ручного чек-листа проходят на реальной игре.
- Размер установки и потребление памяти замерены и заметно ниже текущих.
- CI зелёный: `cargo test`, `cargo clippy`, `npm run check`, `npm test`, сборка.

---

## 10. Карта текущего кода для переноса

| Сейчас | Куда |
|---|---|
| `src/main/index.ts`, `base-program.ts`, `program.ts` | `app`: жизненный цикл, single-instance, before-quit (сохранение JSON), restart |
| `src/modules/files/*` | `storage::fs`: примитивы, батчи, watcher |
| `src/modules/archiver/*` | `storage::zip` + `app::archive` (без WinRAR) |
| `src/modules/paths/*` | `storage::paths`: exe/userData/portable/resource, миграция данных |
| `src/modules/xml/*` | `domain::xml` + `domain::model` |
| `src/modules/dialogs/*` | `tauri-plugin-dialog` + команды |
| `src/modules/updates/*` | `app::update` + `reqwest` |
| `src/modules/*/main` (dlcs, game-texts, mods, epf, checks, backup) | `app` use-cases |
| `src/utilities/bridge/*` | `tauri::commands` + `specta`-типы, `src/renderer/api` |
| `src/renderer/**` | остаётся, перевод на DTO/команды |
| `src/build-configs/forge.js`, `vite.main/preload` | удаляются; `tauri.conf.json` + `src-tauri` |

---

## 11. Приложение: проверенные факты о среде

- Копия архива для тестов: `initialpak/initial.pak` (29.9 МБ, 12 171 запись) + распакованные `[media]/classes` (2 708 XML, 4.2 МБ).
- WinRAR для независимой проверки: `src/modules/archiver/main/archiver/files/WinRAR.exe` (пока не удалён).
- Списки распаковки: `unpack-list.lst`, `unpack-list-optimized.lst`, `unpack-mod-list.lst`.
- Маркер отредактированного архива: файл `edited` в корне архива (добавляется при сохранении).
- Бэкап: `data/backups/initial.pak` и `initial_<дата>_<время>.pak`; `data/backups/previous_initial` — копия распакованных данных.
- Данные приложения: `%APPDATA%\SnowRunner XML Editor` (установленная; имя задаётся `app.setName`), `<exe_dir>/data` (portable, при наличии `portable.txt`), `userData` в dev.
- Проверка внешних изменений архива: сравнение размера с сохранённым в `sizes.json`.
---

## 12. Состояние реализации

**Обновлено:** 2026-11-22. Раздел ведётся по факту; остальные разделы — проект плана.

### Готово

**Этап 0 — каркас Tauri.** `src-tauri` — Cargo-workspace (root-пакет `sxmle` + `crates/domain`, `crates/storage`, `crates/app`), edition 2024, Rust 1.100.
Версии: `tauri` 2.12.7, `tauri-build` 2.7.6, `tauri-plugin-dialog` 2.8.4, `tauri-specta` 2.0.0-rc.29, `specta` 2.0.0-rc.28, `@tauri-apps/cli` 2.12.6.
Фронтенд: `vite.config.ts` (root `src/renderer`, порт 1420), `src/renderer/index.html` + `entry.tsx`, типы — `src/renderer/api/bindings.ts` (генерируются `cargo run --bin typegen`), обёртка `call()` в `src/renderer/api/invoke.ts`.
Ошибки команд — `CommandError { code, message, path }` (`ErrorHandlingMode::Result`). Проверено: окно открывается, `app_info`/`paths` отдают типизированные DTO в antd, диалог выбора файла работает.

**Этап 1 — zip-слой (библиотека).** `sxmle_storage::zip`: чтение EOCD/CD, потоковая распаковка по `unpack-list*.lst` (встроены в бинарник), обновление по алгоритму §4.2 с сохранением порядка и метаданных, атомарная замена, `ZipError`, zip64-guard.
`sxmle_app::archive`: `unpack`, `update_from_dir` (сравнение по CRC32+размеру, маркер `edited`), `verify`, `backup_file`/`restore_backup`, `UnpackList`.
Проверка на `initialpak/initial.pak`: распаковка списка → правка XML → обновление → все неизменённые записи побайтово идентичны сжатыми, порядок сохранён, `verify` 12 172/12 172, `WinRAR t` = 0. Уточнение к §3: после EOCD в фикстуре **2 034 нулевых байта**, ридер это допускает, писатель — отбрасывает.

**Этап 2 — XML-ядро.** `sxmle_domain::xml`: lossless-дерево (порядок атрибутов, кавычки, пробелы внутри тегов, комментарии, CDATA, PI, doctype, BOM, несколько корней), `to_xml()` — байт-в-байт, `to_xml_formatted(policy)` — политика `FormatPolicy` (2 пробела, CRLF, `<tag />`).
Проверка: 2 713 XML фикстуры — lossless 2 713/2 713, идемпотентность форматирования 2 713/2 713.

**Этап 2 — решения §7.1–7.2 (валидный XML и кодировки).** Глобальное декодирование сущностей удалено из писателя: текст и значения атрибутов теперь декодируются и экранируются заново (`text_to_xml`, `attribute_to_xml`), одиночный `&` становится `&amp;`, неизвестные именованные сущности остаются ссылками. Появился `DocumentEncoding`: кодировка определяется по BOM и объявлению XML (UTF-8, UTF-8+BOM, UTF-16LE/BE, любая из `encoding_rs` 0.8.35), согласованность проверяется (`XmlError::EncodingMismatch`), `to_bytes`/`to_bytes_formatted` пишут обратно в исходной кодировке с прежним BOM. Логические значения — `Element::attr_value`, `set_attr_value`, `text_value`. Тесты: cp1251 и UTF-16+BOM туда-обратно, несовпадение объявления и BOM, непредставимый символ.

**Этап 3 — начало (доменная модель).** `sxmle_domain::game`:
`value` (разбор как в модели: `parseInt`/`parseFloat` по префиксу, списки через запятую, `true` строго), `limit`, `position`, `descriptor` (`AttrDescriptor`, `AttrKind`, `InputArea(s)`), `field` (`Field<T> { value, defaultValue, descriptor }`), `templates` (порт `xml-templates.ts`: `Include`, `_template`, поиск по цепочке тегов), `attributes` (`AttrReader` с типизированным чтением, значениями из шаблонов и стабильным `selector`), `entities` (`BaseGameData`, `BaseUiDesc`, `Truck`, `TruckData`, `TruckGameData`, `Engine`).
Проверка: 42 трака и 52 двигателя фикстуры строятся и сериализуются в JSON; значения сверены с эталоном (`ank_mk38`: BackSteerSpeed 0.025, FuelCapacity 200, TruckType OFFROAD; `e_ru_truck_modern`: Torque 170000, FuelConsumption 6.0, Price 3000); шаблонные значения подставляются (`BrakesDelay` 0.5, `MaxDeltaAngVel` 0.01 — в элементе их нет).
DTO экспортируются в `bindings.ts`: `Truck`, `Engine`, `Field<T>`, `AttrDescriptor`, `Limit`, `Position`, `InputArea(s)`. `Builder::disable_serde_phases()` убирает пары `*_Serialize`/`*_Deserialize` (DTO только читаются webview). `f64` в TS — `number | null` (JSON не представляет NaN/∞).

**Этап 3 — файлы игры и команды.** `sxmle_app::game`: `GameDirs::from_paths` (обычные и бэкап-данные), `GameFiles` с приоритетом DLC (обратный порядок) → мод → `classes`, кэшем DLC из `_dlc`, чтением и разбором XML, шаблонами из `_templates/<name>.xml`, списком траков и открытием траков/двигателей. Команды: `list_trucks`, `open_truck`, `open_engines`; ошибки `GameError` мапятся в `CommandError`.

**Этап 3 — остальные сущности.** Добавлены `Gearbox`/`Gear`/`GearboxGameData`/`GearboxParams`, `SuspensionSet`/`Suspension`, `Winch`, `Wheels`/`TruckTire`/`TruckRim`/`BaseWheelFriction`/`TireWheelFriction`/`Wheel`, `TruckAddon`/`AddonTruckData`/`AddonGameData`/`AddonInstallSocket`. `TruckData` дополнен `Winch`, `Wheels`, `ExtraWheels`, сокетами (`TruckSocket`: Type/Default), `FuelTank`, `CompatibleWheels`; `TruckGameData` — `WinchSocket`, `CraneSocket`, `AddonSlots`, `AddonSockets` (со сдвигами `AddonsShift`) и `TruckUiDesc` (с `region\:default`). Списки читаются общим `variant_readers` (элемент на верхнем уровне или внутри `<X>Variants`): счётчики фикстуры — 13 коробок, 80 наборов подвесок, 14 лебёдок, 28 наборов колёс, 17 одиночных колёс, 42 аддона. Команды: `open_gearboxes`, `open_suspensions`, `open_winches`, `open_wheels`, `open_wheel`, `open_addon`. Ключи локализации — `<модуль>.<имяПоля>` (например `gearbox.idleFuelConsumption`), словарь переводов появится на этапе 4.

**Этап 3 — пути узлов и мутации.** `sxmle_domain::xml::selector`: разбор стабильного пути (`/Truck/TruckData`, `/GearboxVariants/Gearbox[2]/Gear[0]`) в сегменты, `resolve`/`resolve_mut` (с учётом нескольких корней), мутации `set_attr` (значение `None` удаляет атрибут), `set_text`, `add_element(parent, name, index)`, `remove_element`, `move_element(selector, to)`; ошибки `SelectorError::{Invalid, NotFound, Index}`. Значения экранируются при записи (`A & B` → `A &amp; B`); добавление и перемещение возвращают новый путь. Формат пути совпадает с `AttrDescriptor::selector`, поэтому интерфейс возвращает его в команды без разбора.

**Этап 3 — завершение: реестр документов и сохранение.** `sxmle_app::documents`: `DocumentKind` (truck/engines/gearboxes/suspensions/winches/wheels/wheel/addon), реестр `Documents` с `docId` (`doc-N`), `revision` и признаком `dirty`. Открытие идемпотентно по пути (повторное не теряет правки в памяти); `close` без `force` для изменённого документа возвращает `DocumentError::Dirty`; `list`/`dirty` отдают `DocumentInfo` (`path`, `archiveName`, `revision`, `dirty`). Мутации `set_attr` (значение `None` удаляет атрибут), `set_text`, `add_element`, `remove_element`, `move_element` принимают ожидаемую версию, отклоняют устаревшую (`StaleRevision`) и возвращают `MutationResult { revision, selector, value }` — новый путь для добавления и перемещения. `save`/`save_all` пишут документ в форматированном виде (`FormatPolicy::default()`: 2 пробела, CRLF, самозакрытие) в исходной кодировке и атомарно (временный файл → `fsync` → переименование); `reset` перечитывает файл с диска, снимает флаг и увеличивает версию. Шаблоны `_templates/<name>.xml` читаются через `TemplateCache` в реестре: файл читается один раз, отсутствие файла тоже кэшируется, смена каталога сбрасывает кэш. `GameDirs` получил `root`, `GameFiles::archive_name` даёт имя записи архива (`[media]\classes\...`, для мода — относительно каталога мода). Команды: `open_document`, `document_info`, `list_documents`, `dirty_documents`, `close_document`, `document_truck`/`document_engines`/`document_gearboxes`/`document_suspensions`/`document_winches`/`document_wheels`/`document_wheel`/`document_addon`, `set_attr`, `set_text`, `add_element`, `remove_element`, `move_element`, `save_document`, `save_all_documents`, `reset_document`; в `ErrorCode` добавлен `Conflict` (устаревшая версия, несохранённые правки). Команды синхронные: XML-файлы игры — единицы МБ, увод разбора в `spawn_blocking` понадобится только при заметных задержках.

**Этап 4 — редактор на командах.** Интерфейс редактора переписан на команды документов: прежняя модель с разбором XML в webview и записью файлов через мост для редактора больше не используется.
- `src/renderer/api/documents.ts` — `DocumentClient` (тонкая обёртка над `bindings.ts` для тестов) и `DocumentSession`: открытие, `set_attr`/`set_text`/`add_element`/`remove_element`/`move_element`, `save`/`reset`/`close`, очередь правок (версия всегда актуальная), подписка на изменения для индикатора «есть несохранённые изменения».
- `src/renderer/api/fields.ts` — преобразование значений `Field<T>` в строки атрибутов тем же форматом, что в Rust (`String(number)`, `true`/`false`, список через запятую, `(x; y; z)`), и запись/сброс поля по `AttrDescriptor`.
- `src/renderer/pages/editor` — новый экран: открытие трака (`open_document`), связанные документы из сокетов (двигатели, коробки, подвески, лебёдки, наборы колёс из `CompatibleWheels`) через `open_document`/`document_*`, поля по `Field<T>` + `AttrDescriptor` (число, строка, логическое, перечисление, массив, позиция), сохранение `save_all_documents`, сброс `reset_document`, закрытие всех открытых документов с force при выходе. Подписи полей берутся по ключу `модуль.поле` из существующих словарей моделей игры (`texts.ts`), тексты экрана — новый `localization.ts` (ru/en).
- `src/renderer/config.ts` — временная конфигурация (ru, обычный режим) для существующих словарей; `bootstrap.tsx` удалён, `entry.tsx` монтирует `App`; экран настроек переносится отдельно.
**Этап 4 — списки траков и прицепов.** `sxmle_app::game`: `VehicleFile` (`name`, `path`, `archiveName`, `truckType`, `dlc`, `modName`), `GameFiles::vehicle_files` обходит основную игру, DLC (обратный порядок) и моды, пропускает нечитаемые файлы и файлы без `<Truck>`, делит траки и прицепы по `Type`, кэширует прочитанные файлы шаблонов на один проход. `DocumentKind::Trailer` открывает `trucks/trailers`. Команды `list_trucks` и `list_trailers` отдают DTO; `truck_names` удалён.
- `src/renderer/api/vehicles.ts` — загрузка списка по категории; `src/renderer/pages/lists` — категории «автомобили/прицепы», фильтры источника (основная игра/DLC/моды), класса и имени, теги DLC и мода, пустое состояние с распаковкой, которая сохраняет путь к архиву в конфигурации; переход в редактор передаёт вид документа (`truck`/`trailer`).
- `EditorPage` получил `kind`; `app.tsx` — только навигация «список → редактор», распаковка `initial.pak` перенесена в пустое состояние списка.

**Этап 4 — настройка и конфигурация.** `sxmle_app::config`: `Config` (`version`, `lang`, `buildType`, `initialPath`, `checkUpdates`, `useMods`, `openWhatsNew`, `advancedMode`, `optimizeUnpack`) в `jsons/config.json`; отсутствующие поля получают значения по умолчанию, битый файл тоже, неизвестный язык заменяется. `AppState` хранит конфигурацию и пишет её атомарно тем же `sxmle_storage::fs::write_atomic`, что и документы. Команды `config`, `save_config`, `restore_backup`. Renderer: `entry.tsx` читает конфигурацию до монтирования, `config.ts` преобразует DTO в `IConfig`; `pages/setup` — пути и режим хранения, выбор `initial.pak`, распаковка с предварительным бэкапом, бэкап/проверка/восстановление архива, переключатели модов и расширенного режима; вход в настройку — из шапки списков.

**Этап 4 — ограничения.** Не перенесены `PhysicsModel`, аддоны/краны/прицепы, импорт-экспорт .epf, смена режима хранения (portable), избранное и изменённые файлы, переводы игры (`GAME_TEXTS_TOKEN`), переключение языка и выбор активного мода; переводы новых строк — ru/en, немецкий и китайский берутся из английского.

**Тесты и CI.** `cargo test --workspace --all-targets` — 111 тестов (storage 9 + 1 `#[ignore]` WinRAR, domain 69, app 33; из них интеграционные `documents` на фикстуре: правка, сохранение, повторное открытие и сброс трака `ank_mk38`); `cargo clippy --workspace --all-targets -- -D warnings` и `cargo fmt --check` — чисто; `npm test` — 418 тестов (сессия документов, преобразование полей, словарь подписей, дымовые тесты страниц редактора, списков и настройки, фильтры списков); `npm run check`, `npm run lint` и `npm run build` — без ошибок. В CI job `rust` проверяет расхождение `bindings.ts` с Rust, тесты, clippy, fmt.

### Дальше

1. Этап 4 — остальные данные списков: избранное и изменённые файлы, перевод игры для подписей (команда вместо `GAME_TEXTS_TOKEN`), переключение языка интерфейса, выбор активного мода, перенос данных при смене режима хранения.
2. Этап 4 — оставшиеся части редактора: `PhysicsModel` (центр масс), аддоны и краны (деревья аддонов, добавление и удаление элементов через `add_element`/`remove_element`/`move_element`), импорт-экспорт .epf, отображение переводов игры (`GAME_TEXTS_TOKEN` → команда).
3. Этап 4 — удаление моста: `preload.ts`, `emr-bridge`, valtio-поля, старые экраны `pages/general` и модули `@modules/xml/game/*` после переноса данных.
