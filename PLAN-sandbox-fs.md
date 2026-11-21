# План: `sandbox: true` + единый fs-слой в main

Самодостаточный план для новой сессии. Репозиторий: `sxmle` (SnowRunner XML Editor), Electron 45, React 19, emr-bridge 2.1.

Документ — только план: код не начат. Перед работой прочитать `AGENTS.md` (правила правок и инструментов).

## 1. Цель и критерий готовности

1. `webPreferences`: `contextIsolation: true`, `sandbox: true`, `nodeIntegration: false`, `webviewTag: false`.
2. Preload содержит только `electron` + emr-bridge; `provideFromMain(true)`.
3. В renderer нет Node-API, нет `fast-fs`, нет `window['fast-fs']`.
4. Вся файловая работа — в main за одним сервисом; renderer получает value-объекты и батч-операции.
5. Производительность не хуже текущей: на горячих путях — единицы IPC на страницу/категорию, а не на файл; UI не блокируется на сканах.

## 2. Принятые решения (зафиксированы, не пересматривать)

1. **Типы.** `IFile`/`IDir`/`IFSEntry` — общие async-интерфейсы (пригодны для sandbox-renderer). Sync-API и проверки прав — в `IMainFile`/`IMainDir`/`IMainFSEntry`, которые реализуют main-классы. `exec()` удаляется: нигде не используется.
2. **`IFiles` — generic:** `IFiles<F extends IFile = IFile>`, `IDirs<D extends IDir = IDir>`; main использует `IFiles<IMainFile>` / `IDirs<IMainDir>`.
3. **Кэш шаблонов** `_templates` — на сессию, без инвалидации (шаблоны статичны в пределах запуска).
4. **Батчи:** `readMany`/`writeMany` — чанки по **100** файлов, пул чтения — **16** параллельных операций. Обоснование: 100 XML по 1–200 КБ — это единицы-десятки МБ, память ограничена; 16 потоков насыщают NVMe и не устраивают thrash на HDD/антивирусе Windows.
5. **`watch` возвращает `IWatcher`** (`{ close(); removeAllListeners() }`) вместо `FSWatcher`.

## 3. Текущее состояние (факты, чтобы не переисследовать)

- [`windows/main/index.ts:66`](src/modules/windows/main/index.ts#L66): `contextIsolation: false`, `sandbox: false`.
- [`files/preload.ts`](src/modules/files/preload.ts): `window['fast-fs'] = { cp, fs, fsp, path }` — единственная причина, почему нельзя sandbox.
- [`files/renderer.ts:17`](src/modules/files/renderer.ts#L17) берёт node-модули из `fast-fs` и работает с fs напрямую (511 строк — дубль [`files/main.ts`](src/modules/files/main.ts), 543 строки).
- emr-bridge: опубликованная функция вызывается через `ipcRenderer.sendSync` ([tunnels.js:263](node_modules/emr-bridge/esm/scripts/renderer/tunnels.js#L263)) — per-file IPC недопустим.
- Готовый паттерн моста: `@initMain()`/`@mainMethod()` ([bridge/renderer.ts](src/utilities/bridge/renderer.ts)), `publishInstanceFunction` ([bridge/main/index.ts](src/utilities/bridge/main/index.ts)), публикация в [`publishMain()`](src/utilities/bridge/main/publisher.ts#L20) до создания окон ([main/index.ts:11](src/main/index.ts#L11)).
- `publishMain` → `Program` → окна; `provideFromMain` в preload читает список сущностей синхронно при старте — порядок сохранить.
- Ошибки: main-сторонний `ProgramError` сам показывает нотификацию ([errors/main.ts:16](src/modules/errors/main.ts#L16)); через мост едет только stack-строка ([ipc-result.js:32](node_modules/emr-bridge/esm/scripts/helpers/ipc-result.js#L32)) — класс и `cause` теряются.
- Расхождения дублей (важно для parity): renderer `File.removeSync`/`writeToJSONSync`/`readFromJSONSync` — заглушки с `throw`; renderer удаляет каталог через `execSync('rmdir /s /q')` ([renderer.ts:118](src/modules/files/renderer.ts#L118)), main — `rmSync` с retry; main `File.readFromXML` бросает; `isExt`/`findFiles` реализованы по-разному.
- [`xml-templates.ts:52`](src/modules/xml/xml-templates.ts#L52): файл шаблона читается с диска на каждый include. `XMLTemplates.from(string)` рекурсивно вызывает себя — при батчах (строки) починить на `super.from`.
- [`xml-element.ts:20`](src/modules/xml/xml-element.ts#L20) уже умеет `from(string)` — парсинг остаётся в renderer, из main едут строки.
- Синхронный вызов снаружи класса ровно один: [`initial-select.tsx:49`](src/renderer/pages/general/setup/initial-select.tsx#L49).
- Тесты: [`setup.ts:12`](src/renderer/tests/setup.ts#L12) подкладывает реальный fs как `fast-fs`; [`guard.test.ts`](src/renderer/tests/guard.test.ts) — пример теста-ограничителя; vitest: jsdom, `include: src/**/*.test.{ts,tsx}` ([vitest.config.ts:25](vitest.config.ts#L25)).
- `@bridge/renderer` создаёт `Bridge.as()` на уровне модуля — в jsdom это бросит исключение при импорте. Нужен ленивый доступ (шаг 2).

## 4. Целевая архитектура

```
renderer (sandbox, без node)
  File/Dir  — value-объекты (path + геттеры), методы -> IFs
  IFs       — клиент моста (@initMain + @mainMethod), FsResult
        |  emr-bridge: sendSync (sync-операции) / Promise (async/батчи)
        v
main
  FsService — примитивы node:fs, без ProgramError и без UI
  Files/Dirs — существующие классы, переводятся на FsService
  publisher  — Fs/* + события вотчеров; guard -> FsResult
```

| Файл | Роль |
|---|---|
| [`files/types.ts`](src/modules/files/types.ts) | общий контракт: value-интерфейсы, `IFs`, `FsResult`, `IWatcher` |
| `files/service.ts` — новый | `node:fs`-примитивы, батчи, watcher-registry; без electron, без DI |
| [`files/main.ts`](src/modules/files/main.ts) | классы main-стороны (sync-API остаётся для внутренних нужд) |
| `files/publisher.ts` — новый | `publishFiles()`: `Fs/*`, guard, события `Fs/watch` |
| [`files/renderer.ts`](src/modules/files/renderer.ts) | value-объекты + клиент `Fs` |
| `utilities/paths/renderer.ts` — новый | чистый win32 `join/dirname/basename/extname` (в sandbox нет `node:path`) |
| `files/preload.ts` | удалить |
| [`renderer/preload.ts`](src/renderer/preload.ts) | только `setMaxListeners` + `provideFromMain(true)` |

## 5. Контракт `IFs`

```ts
export type FsErrorCode = 'ENOENT' | 'EACCES' | 'EPERM' | 'EBUSY' | 'EISDIR' | 'ENOTDIR' | 'UNKNOWN'
export type FsFailure = { code: FsErrorCode; path: string; message: string }
export type FsResult<T> = { ok: true; value: T } | { ok: false; error: FsFailure }

export interface IFsEntryInfo { path: string; name: string; kind: 'file' | 'dir' }
export interface IScanArgs { ext?: string; name?: string; recursive?: boolean; kind?: 'files' | 'dirs' | 'all' }
export interface IWatcherEvent { id: string; path: string; event: 'rename' | 'change'; filename: string | null }
export interface IWatcher { close(): void; removeAllListeners(): void }

export interface IFs {
  list(path: string): Promise<FsResult<IFsEntryInfo[]>>
  scan(path: string, args: IScanArgs): Promise<FsResult<IFsEntryInfo[]>> // readdir({withFileTypes}), 1 вызов на дерево
  readFile(path: string, encoding?: BufferEncoding): Promise<FsResult<string>>
  readMany(paths: string[], encoding?: BufferEncoding): Promise<FsResult<Array<string | null>>> // порядок сохраняется
  writeFile(path: string, data: string): Promise<FsResult<void>>
  writeMany(items: Array<{ path: string; data: string }>): Promise<FsResult<void>>
  makeDir(path: string): Promise<FsResult<void>>
  remove(path: string): Promise<FsResult<void>>
  move(from: string, to: string): Promise<FsResult<void>>
  copy(from: string, to: string): Promise<FsResult<void>>
  chmod(path: string, mode: number): Promise<FsResult<void>>
  watch(path: string): FsResult<string>   // sync: создаёт watcher в main
  unwatch(id: string): FsResult<void>
}
```

Правила:

- `FsService` бросает `FsError { code, path }` (не `ProgramError`), нотификаций не показывает.
- `publisher` оборачивает каждый вызов в `guard` -> `FsResult`; исключения наружу не летят. `watch/unwatch` — sync-обёртки с собственным try/catch.
- Renderer `File/Dir` разворачивают результат и бросают `ProgramError` с `ErrorText` (локаль и тост — в renderer, ровно один).
- `readMany`: чанки по 100, пул 16, порядок как во входном массиве, ошибка элемента -> `null` (отсутствующий optional-файл не роняет страницу). Где файл обязателен — вызывающий проверяет `null` и бросает `ProgramError`.
- Ошибки: `code` -> `ErrorText` (`ENOENT`/read -> `readFileError`, write -> `writeFileError`, remove -> `removeError`, mkdir -> `makeDirError`, move/rename -> `moveError`/`renameError`, copy -> `copyFileError`, unknown -> соответствующая операции).

## 6. Типы

```ts
// общие (renderer-safe)
export interface IFSEntry { path; dirname; root: IDir; basename(); asFile(): IFile; asDir(): IDir
  exists(): Promise<boolean>; isDir(): Promise<boolean>; isFile(): Promise<boolean>
  remove(): Promise<void>; move(path: string | IFSEntry): Promise<void>; rename(name: string | IFSEntry): Promise<void> }

export interface IFile extends IFSEntry {
  extname: string; name: string; isExt(ext: string): boolean
  watch(listener: (event: string, filename: string | null) => void): IWatcher
  getSize(): Promise<number>; copyTo(entry: IFSEntry): Promise<void>; copyTo(path: string): Promise<void>
  read(encoding?: BufferEncoding): Promise<string>
  readFromJSON<T extends object = any>(): Promise<T>
  readFromXML(): Promise<XMLElement | undefined>
  write(data: string, encoding?: BufferEncoding): Promise<void>
  writeToJSON<T extends object>(obj: T): Promise<void>
  make(): Promise<void>; clear(): Promise<void>
}

export interface IDir extends IFSEntry {
  name: string; dir(...path: string[]): IDir; file(...path: string[]): IFile; entry(...path: string[]): IFSEntry
  read(): Promise<IFSEntry[]>; make(): Promise<void>; clear(): Promise<void>
  findFiles(args: IFindFilesArgs): Promise<IFile[]>
  findDirs(args: IFindDirsArgs): Promise<IDir[]>
}

// только main
export interface IMainFSEntry extends IFSEntry {
  existsSync(): boolean; isDirSync(): boolean; removeSync(): void
  hasPermissions(): Promise<boolean>; canRead(): Promise<ICheckResult>; canWrite(): Promise<ICheckResult>
  chmod(mode: number): Promise<void>
}
export interface IMainFile extends IFile, IMainFSEntry {
  readSync(encoding?: BufferEncoding): string
  readFromJSONSync<T extends object = any>(): T
  writeToJSONSync<T extends object>(obj: T): void
  makeSync(): void
}
export interface IMainDir extends IDir, IMainFSEntry { makeSync(): void }

export interface IFiles<F extends IFile = IFile> { isFile(other: any): other is F; newFile(...p: string[]): F; initial: F; config: F; sizes: F; mods: F; favorites: F; edited: F; editedFlag: F; exported: F; initialTexts: F; icon: F; backupInitial: F; backupInitialWithDate: F; uninstall: F }
export interface IDirs<D extends IDir = IDir> { isDir(other: any): other is D; newDir(...p: string[]): D; root: D; winrar: D; pages: D; backupFolder: D; backupInitialData: D; mainTemp: D; modsTemp: D; updateTemp: D; strings: D; classes: D; templates: D; dlc: D }

export type IMainFiles = IFiles<IMainFile>
export type IMainDirs = IDirs<IMainDir>
```

- `exec(): Promise<ChildProcess>` удалить: нигде не используется; из `types.ts` уходят импорты `node:child_process`/`node:fs`.
- `canRead/canWrite/hasPermissions/chmod` используются только в main -> `IMainFSEntry`. `getSize`/`copyTo` тоже вызываются только из main, но проходят мост без потерь — оставлены общими в `IFile` для простоты.
- DI-токены: main — `FILES_TOKEN`/`DIRS_TOKEN` типизируются как `IMainFiles`/`IMainDirs`; renderer — по умолчанию `IFiles`/`IDirs`. Новый `FS_TOKEN` — по образцу существующих.
- main-модули, использующие sync/права, переводятся на `IMainFile` (archiver, checks, backup, modifications, epf, sizes/config repositories).

## 7. Ошибки, наблюдатели, пути, кэш шаблонов

**Ошибки.** `FsService` -> `FsError` -> `guard` -> `FsResult` -> renderer `ProgramError(ErrorText, cause, path)`. В main-сервисе никаких `messages` — иначе двойные тосты.

**Наблюдатели.** `IFile.watch(listener)` -> `IFs.watch(path)` (sync, sendSync) -> `id` -> подписка на `Fs/watch` с фильтром по `id`. `IWatcher.close()` -> `unwatch(id)`; `removeAllListeners()` — локальная отписка. Main: `Map<id, FSWatcher>`, очистка по `unwatch` и по `window-all-closed`/`before-quit` (окно в приложении одно; отдельной привязки к `webContents` не делаем — зафиксировано как принятое ограничение).

**Пути.** `utilities/paths/renderer.ts`: `joinPath/dirname/basename/extname` с win32-семантикой (приложение только под Windows). `File/Dir` используют их вместо `node:path`. Тест-корпус сравнивает с `node:path.win32` на наборе путей (drive root, `..`, смешанные слэши, пустые сегменты).

**Кэш шаблонов.** `xml-templates.ts`: `Map<string, XMLTemplates | null>` по имени шаблона, на сессию; `static clearCache()` для тестов. Загрузка ленивая (`readFile`), prefetch — только если замеры покажут. Обязательно починить `XMLTemplates.from(string)`: вызывать `super.from`, а не `this.from`.

## 8. Шаги

### Шаг 0 — базлайн (0,5 д)
Ветка `feat/sandbox-fs-layer`. Замерить 3 прогона: холодный старт до `Page.lists`, открытие редактора трака, открытие addons, экспорт, сохранение. Числа — в описание PR. Временная инструментация `performance.now()` в [`items.ts`](src/renderer/pages/general/lists/utilities/items.ts) и addons под `config.isDev` (после замеров убрать).

### Шаг 1 — `FsService` в main (1–1,5 д)
Вынести из [`files/main.ts`](src/modules/files/main.ts) примитивы в `service.ts`: `list/scan/readFile/readMany/writeFile/writeMany/makeDir/remove/move/copy/chmod/watch/unwatch`. `scan` — один `readdir({ withFileTypes: true })` на каталог, рекурсия без `lstat` на запись. `readMany` — пул 16, чанки 100, порядок сохранять, ошибки по элементу. Сервис без `electron`, без DI, без `ProgramError`.
Тесты `src/modules/files/service.test.ts` на временном каталоге: порядок, частичные ошибки, рекурсия, ext/name, удаление занятого файла (retry), BOM/utf8.
Приёмка: `npm test` зелёный; сервис не импортирует `electron`/`ProgramError`; поведение приложения не изменилось.

### Шаг 2 — публикация и ленивый мост (0,5–1 д)
`files/publisher.ts`: `publishFiles()`, имена `Fs/*`, guard -> `FsResult`, событие `Fs/watch` через `emitEvent`. Добавить в [`publishMain()`](src/utilities/bridge/main/publisher.ts) до окон.
Сделать `@bridge/renderer` ленивым (`getBridge()` вместо `const bridge = Bridge.as()` на уровне модуля) — иначе тесты с мостом не импортируются в jsdom.
Приёмка: временный вызов `Fs/scan` из renderer (dev) возвращает данные; приложение работает с прежним `provideFromMain(false)`.

### Шаг 3 — renderer на value-объектах, удаление fast-fs (1,5–2 д)
`utilities/paths/renderer.ts` + тест-корпус против `node:path`.
Переписать `files/renderer.ts`: `File/Dir` — path + геттеры; `exists/isDir/isFile/read/readFromXML/readFromJSON/write/writeToJSON/remove/move/rename/make/clear/findFiles/findDirs/watch` через `IFs`; `FS_TOKEN` в DI.
Типы — по разделу 6.
Удалить `files/preload.ts` и его импорт из [`renderer/preload.ts`](src/renderer/preload.ts); из тестов убрать `fast-fs`, зарегистрировать node-backed `IFs` (`NodeFs`) в `src/renderer/tests/` — он же фейк-мост для тестов.
Поправить `initial-select.tsx:49` -> `await exists()`; в `Files.editedFlag` заменить импорт main-токенов на renderer.
Приёмка: `npm test`, `npm run check`; приложение работает с `contextIsolation: false`; ни одного `node:`/`fast-fs` в renderer-графе.

### Шаг 4 — батчи горячих путей (1,5–2 д)

| Место | Сейчас | Цель |
|---|---|---|
| [`items.ts:25`](src/renderer/pages/general/lists/utilities/items.ts#L25) `filterByCategory` | read на файл | `scan` + `readMany` -> `TruckXML.from(string)` |
| [`items.ts:45`](src/renderer/pages/general/lists/utilities/items.ts#L45) `getList` | рекурсивный `findFiles` с lstat на запись | один `Fs/scan` |
| [`game-xml.ts:68`](src/modules/xml/game/game-xml.ts#L68) `filesElements` | read на элемент | prefetch пачки -> `from(string)` |
| [`xml-templates.ts:51`](src/modules/xml/xml-templates.ts#L51) | read на каждый include | кэш на сессию + починить `from(string)` |
| [`addons-content.tsx:285`](src/renderer/pages/general/editor/components/extra/addons-content/addons-content.tsx#L285) | вложенные `read()`/`findFiles` | `scan` + `readMany` |
| [`general.tsx`](src/renderer/pages/general/general/general.tsx#L88), `import.tsx`, `export.ts` | findFiles + записи поштучно | `scan`, `writeMany` |
| [`files.ts:43`](src/renderer/pages/general/editor/utilities/files.ts#L43) watch | FSWatcher | шаг 5 |

Пачки — по 100, чтобы не держать в памяти весь набор. Приёмка: dev-счётчик вызовов `Fs/*` — ≤3 на категорию/страницу; замеры не хуже базлайна +10%; задачи UI < 100 мс.

### Шаг 5 — наблюдатели (0,5–1 д)
`IFile.watch(listener): IWatcher`; `useFilesWatch` — подписка и `close()`; main — реестр + `Fs/watch` + очистка (раздел 7). `game-texts` main-watcher не трогать.
Приёмка: внешнее изменение обновляет редактор; после закрытия редактора реестр пуст; события чужого окна не дёргают чужой watcher.

### Шаг 6 — включение изоляции (0,5 д)
[`windows/main/index.ts`](src/modules/windows/main/index.ts#L66):

```ts
webPreferences: {
  preload: join(this.dirname, 'preload.cjs'),
  contextIsolation: true,
  sandbox: true,
  nodeIntegration: false,
  webviewTag: false
}
```

[`renderer/preload.ts`](src/renderer/preload.ts):

```ts
import { ipcRenderer } from 'electron'
import { provideFromMain } from 'emr-bridge/cjs/preload'

ipcRenderer.setMaxListeners(Number.POSITIVE_INFINITY)
provideFromMain(true)
```

Проверить: в собранном `.vite/build/preload.cjs` нет `require('node:...')`/ `fast-fs`; в renderer нет `process`/`require`/`Buffer`; devtools: `process.sandboxed === true`, `window.require === undefined`.
Приёмка: `npm start` — все сценарии шага 0.

### Шаг 7 — верификация и уборка (1 д)
Тесты-ограничители в [`guard.test.ts`](src/renderer/tests/guard.test.ts): запрет `fast-fs` и `node:` в `src/renderer/**`, runtime-импортов `@modules/*/main`; preload импортирует только `electron`.
Удалить мёртвое: `files/preload.ts`, sync-заглушки renderer, `fast-fs` из тестов, `exec()` из интерфейсов.
Прогнать `npm test`, `npm run check`, `npm run lint`, `npm run package`.
E2E-матрица: выбор `initial.pak` (файл/папка, неверный), распаковка, списки main/DLC/mods, открытие редактора, сохранение, экспорт/импорт, addons, popup модов, бэкап, проверка обновлений, удаление мода, внешнее изменение файла, выход с сохранением JSON.
Зафиксировать before/after в PR.

Итого ~6–8 дней; шаг 6 можно делать параллельно после шага 3.

## 9. Риски

| Риск | Мера |
|---|---|
| Parity двух реализаций | до удаления renderer-impl — golden-тест на временном каталоге: старый renderer-класс vs новый main-сервис дают одинаковый результат (scan/findFiles/isExt/remove) |
| Двойные тосты ошибок | сервис без `ProgramError`; `FsResult`; `ProgramError` только в renderer |
| Семантика путей (win32, `..`, `/`) | чистый helper + корпусный тест против `node:path.win32` |
| Утечка watcher'ов / кросс-оконные события | реестр, id в payload, очистка по `unwatch`, `window-all-closed`/`before-quit`; ограничение зафиксировано |
| `XMLTemplates.from(string)` зацикливание | `super.from` + тест на include |
| Locks на Windows при удалении | `rmSync` c `maxRetries/retryDelay`, тест удаления мода |
| Тесты без Electron | ленивый `@bridge/renderer` + `FS_TOKEN` -> `NodeFs` в тестах |
| Память при `readMany` | чанки 100, пул 16 |
| Потеря sync-семантики | `npm run check` как компас; внешних sync-вызовов один |
| `sandbox: true` ломает preload из-за node-импортов | проверка собранного `preload.cjs` на `require('node:` |

## 10. Definition of done

- [x] `contextIsolation: true`, `sandbox: true`; preload — только `electron`/emr-bridge.
- [x] `files/preload.ts` и `fast-fs` удалены; в renderer нет `node:` (guard-тест; тесты из проверки исключены).
- [x] `FsService` + `Fs/*` опубликованы; ошибки через `FsResult`.
- [x] Renderer `File/Dir` — value-объекты; sync-API только в main.
- [~] Батчи на горячих путях (таблица шага 4): `Fs/scan` + `readMany` на списках и в редакторе, эффективность подтверждена тестами на реальном `initial.pak`; счётчик «≤3 вызовов `Fs/*` на страницу» в сборке не инструментировался.
- [x] `watch` -> `IWatcher`, кэш шаблонов на сессию.
- [x] `npm test` (24 файла, 323 теста), `npm run check`, `npm run lint` (0 ошибок), `npm run package` — зелёные.
- [~] E2E-матрица пройдена на packaged-сборке; замеры «не хуже базлайна +10%» не проверяемы: ревизия до ветки не запускалась (см. «Отклонения», п. 5).

## 11. С чего начать в новой сессии

1. `git switch -c feat/sandbox-fs-layer`; `npm ci`; `npm test` — убедиться, что база зелёная.
2. Шаг 0: снять замеры (3 прогона), сохранить в черновик PR.
3. Шаг 1: `src/modules/files/service.ts` + тесты; ничего не подключать к UI до зелёных тестов.
4. Далее по шагам; после каждого — `npm test` и ручной smoke, коммит отдельным шагом.

## 12. Статус реализации (ветка `feat/sandbox-fs-layer`)

### Сделано

- **Шаг 1.** `files/service.ts`: `FsService` + синглтон `fsService`, `FsError { code, path }`, `toResult/toSyncResult/toFailure`, батчи (чанки 100, пул 16), реестр наблюдателей. Тесты `files/service.test.ts` (29).
- **Шаг 2.** `files/publisher.ts`: `Fs/list|scan|stat|readFile|readMany|writeFile|writeMany|makeDir|remove|move|copy|chmod|watch|unwatch`, событие `Fs/watch`, guard -> `FsResult`; публикация в `publishMain()` до создания окон. `@bridge/renderer` стал ленивым (`getBridge()`).
- **Шаг 3.** `files/types.ts` — новый контракт (`IFs`, `FsResult`, `IFile/IDir/IFSEntry`, `IMain*`, generic `IFiles<F>/IDirs<D>`); `files/renderer.ts` — value-объекты + клиент `Fs` через `@initMain()/@mainMethod()`; `utilities/paths/renderer.ts` (чистый win32) + 181 тест против `node:path.win32`; `files/preload.ts` удалён; в тестах `fast-fs` заменён на `NodeFs` (`renderer/tests/node-fs.ts`); `initial-select.tsx` переведён на `await exists()`; `FS_TOKEN` в DI.
- **Шаг 4.** `items.ts` — `scan` + `readMany` -> `TruckXML.from(string)`; `game-xml.ts` — `filesElements/fileElement` читают пачку одним запросом; `addons-content.tsx` — `scan` дерева + `readMany`; `xml-templates.ts` — кэш шаблонов на сессию, `clearCache()`, починен `from(string)` (была бесконечная рекурсия).
- **Шаг 5.** `IFile.watch(listener): IWatcher`, реестр в `FsService`, событие `Fs/watch` с фильтром по `id`, очистка по `unwatch`/`window-all-closed`/`before-quit`; тесты `files/watcher.test.ts` (4).
- **Шаг 6.** `contextIsolation: true`, `sandbox: true`, `nodeIntegration: false`, `webviewTag: false`; preload — только `electron` + `emr-bridge/cjs/preload` + `provideFromMain(true)`.
- **Шаг 7.** Guard-тесты: нет `node:`/`fast-fs` в renderer-графе, preload импортирует только `electron`/`emr-bridge`, в `webPreferences` включены изоляция и sandbox.
- **Шаг 0 (частично).** Замеры на собранном пакете с реальным `initial.pak`: холодный старт с распаковкой -> `Page.lists` 2,7 с, тёплый 3,0 с, клик по авто -> редактор 0,24 с, сохранение -> «Сохранено» 1,6 с. Базлайн до правок не снимался (ветка уже содержала React/DI-рефакторинг), это новые опорные числа.
- **Тесты на реальных данных.** `files/initialpak.test.ts` (6): `scan` находит 2708 XML и совпадает с обходом через `node:fs`; обход со `stat` на каждую запись 67 мс против `scan` 16 мс; `readMany` 0,8 мс против 2,7 мс последовательно (42 авто); `stat` отдаёт реальный размер. Файл пропускается, если `initialpak` нет.
- **Production-баг, найденный E2E.** Минификация переименовывала классы, а `@initMain()` строит публичные имена (`Dlc/arr`) из имени класса, поэтому в собранном приложении рендерер падал (`TypeError: n is not iterable`) и окно оставалось пустым. Исправлено `keepNames: true` в `build-configs/vite.renderer.config.ts` + guard-тест.
- **Моды (E2E на реальных модах mod.io).** 8 модов в 8 папках (ещё 2 папки пустые): окно выбора находит и показывает 8 модов за ~5 с, добавление сохраняется в `mods.json`, после перезапуска `procMods` распаковывает их в `modsTemp` (7 с `classes/trucks`), список «Модификации» показывает 7 модовых машин (`realistic_game` без машин), окно выбора показывает 8 в «Добавлено». Удаление папки мода -> после перезапуска мод исчезает из списка (`deleteFromList`), возврат папки + повторное добавление возвращает 8.
- **WinRAR: код 10 не ошибка.** `findMods` перебирает все `*.pak` мода и на `pc.pak` без `classes` WinRAR завершается с кодом 10 («нет файлов по списку»), из-за чего `ProgramError` показывал пачку тостов. Добавлен `isWinRarFailure` (0/1/10 — не ошибка) + тест.
- **Тесты проверки обновления.** `checks/main/index.test.ts` (10): выключенная проверка не ходит в сеть, `whateverCheck` её обходит, новая/равная/старая версия, редирект, некорректный JSON/ответ/HTTP/сеть/DNS — всё без необработанных отклонений и ровно с одним уведомлением об ошибке (`node:dns`/`node:https` замоканы).
- **Тесты `.epf` и экспорта/импорта.** `epf/main/index.test.ts` (10, фейковые диалоги + настоящие файлы): объединение с дедупликацией по `fileName`, объект вместо массива, пропуск нечитаемого файла, отмена выбора/сохранения, ошибка записи; просмотр файла и ошибки чтения. `editor/utilities/export.test.ts` (14): запись по пути без диалога и через диалог, отмена, прицепы, слияние совместимого файла, отказ от данных другой версии, отсутствие дублей, порядок «слушатели -> запись»; импорт — успех, отмена, неподдерживаемая версия, отсутствие параметров, тип прицепа. Guard-тест теперь пропускает `*.test.*` (в тестах Node разрешён).
- **Без лишнего уведомления при разборе JSON.** `File.readFromJSON*` (main и renderer) оборачивал ошибку `JSON.parse` в `ProgramError`, из-за чего `.epf` с битым JSON и `modio.json` давали тост и вдобавок окно ошибки от вызывающего кода. Обёртка убрана — поведение как до ветки (ошибку показывает вызывающий), проверено тестами.
- **Тесты выбора `initial.pak`.** `renderer/tests/components/initial-select.test.tsx` (6): существующий файл, чужое имя, несуществующий путь, поиск внутри папки игры, пустая папка, отмена диалога — проверяют валидацию без нативных окон.
- **Хук версии.** `prePackage` правил `APP_VERSION` в `modules/app/main/index.ts`, но константа переехала в `modules/app/constants.ts`, из-за чего версия в пакете не обновлялась. Хук переведён на `readonly VERSION = '...'` и файл констант.

### Отклонения от плана

1. В `IFs` добавлен `stat(path)`: без него `exists/isDir/isFile/getSize` стоили бы по нескольку IPC (список методов плана дополнен, существующие не изменены).
2. В `IMainFile.watch` возвращается `IMainWatcher` (а не `node:fs.FSWatcher`), чтобы `types.ts` оставался без node-импортов; `game-texts/main` использует `IMainWatcher.on('error')`.
3. Пакетный экспорт/импорт (`editor-actions.tsx`) не переведён на `writeMany`: он открывает по одному скрытому редактору на файл и пишет в один `exported.json` цепочкой read-modify-write, батч требует переписывания пайплайна. На этих путях чтения/записи одиночные.
4. `npm run package` запускается с WinRAR в `PATH`. На этой машине Inno Setup не установлен, поэтому `postPackage` не создаёт инсталлятор (пропуск по `existsSync`), но приложение и `.rar` собираются, код выхода 0. Собранный `preload.cjs` не содержит `require('node:…')`.
5. Базлайн «до/после» не снимался. Ветка начата уже после React/DI-рефакторинга, а сборка ревизии до ветки падала в main из-за `accessor`-полей (Oxc не опускал их без декораторов, починено в этой ветке), т.е. старый вариант на этой машине не запускался. Вместо базлайна: новые опорные числа на пакете + алгоритмические сравнения на реальных данных (`scan` 16–17 мс против 67–77 мс обхода со `stat`, `readMany` 0,8–1,1 мс против 2,7–3,6 мс последовательно).

### Проверено

- `npm run check` — чисто; `npm run lint` — 0 ошибок (36 предупреждений, все были до ветки); `npm test` — 24 файла, 323 теста.
- `npm run package` — зелёный (код 0): `out/SnowRunnerXMLEditor` + `out/SnowRunnerXMLEditor.rar` (~127 МБ). После последних правок пересобран заново (15:10) и проверен: с `config.json`, указывающим на реальный `initial.pak`, списки авто появились, тостов об ошибках нет, `App/quit` завершил процесс (`procs: 0`).
- Собранное приложение с реальным `initial.pak`: распаковка (2708 XML), списки авто с картинками, редактор ANK MK38, сохранение («Сохранено») с обновлением pak через WinRAR (размер pak изменился, приложение не падало).
- Runtime-факты в packaged-сборке (CDP): `typeof window.require`/`process`/`Buffer` — `undefined`; `window.__provider__` — 52 функции и 8 переменных; прямой вызов `Fs/scan|readMany|stat` из renderer возвращает данные (1039 XML, 5 файлов, размер файла).
- Наблюдатели (packaged, CDP): правка `mainTemp/[media]/classes/trucks/ank_mk38.xml` через `Fs/writeFile` даёт событие `Fs/watch` (`id: fs-watch-1`, `event: change`); редактор перечитывает файл (поле «Название» показало новое значение); после `Escape` (закрытие редактора) повторная правка события не даёт — реестр очищен через `unwatch`.
- Бэкап: при старте с изменённым `initial.pak` приложение само создало `backups/initial.pak` и `initial_2026-11-21_14-33-33.pak`; `InitialBackup/recoverFromIt` восстановил pak из бэкапа и пересобрал `mainTemp` (6,2 с, 42 авто на месте).
- Выход с сохранением JSON: `App/quit` -> процесс завершился, `config/edited/favorites/mods/sizes.json` перезаписаны (`beforeQuit`).
- `mods/get-all-mods` на пустой папке модов отдаёт `[]` без ошибок.
- Моды в packaged-сборке: 8 модов из 8 папок распознаны, список «Модификации» показывает 7 модовых машин, «Добавлено» в окне выбора — 8; после фикса кода 10 WinRAR при сканировании пакетов нет ни одного тоста об ошибке (было по одному на каждый `pc.pak` без `classes`).
- `npm start` (dev): окно открывается, рисуется «Первоначальная настройка» — preload в sandbox, `contextIsolation` и мост `emr-bridge` работают.
- Побочный баг сборки, существовавший до ветки: Oxc не опускает поля `accessor` без декораторов, из-за чего main-процесс падал с `SyntaxError` (`json-arrays/base.ts`, `paths/main/index.ts`, `loading/main/index.ts`). Исправлено расширением `build-configs/decorators-plugin.ts`.

### Осталось (нужен ручной прогон)

- Проверка обновлений снята: в packaged-сборке вызов `Checks/checkUpdate(true)` через мост занял 217 мс, вернул `undefined` (публичная 1.4.0 равна текущей), события `Messages/error` не было — dns/https/разбор/сравнение версий работают вне sandbox-ограничений. Ветка «версия новее» остаётся на юнит-тестах.
- Экспорт/импорт через нативные диалоги вручную не прогонялись; логика за ними (слияние, версии, запись) покрыта `export.test.ts` (14), сам `Dialog.showSaveDialogSync/showOpenDialogSync` — нет. Валидация выбора `initial.pak` покрыта `initial-select.test.tsx`, сам нативный диалог — нет.
- Замеры «до/после»: базлайн на старой реализации снять нельзя — ревизия до ветки не собиралась/не запускалась (Oxc + `accessor`, починено здесь), поэтому в «Сделано» новые опорные числа, а сравнение — алгоритмическое (тесты на реальном `initial.pak`).
