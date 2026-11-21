import { basename, extname, join, relative } from 'node:path'
import { readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

/** Папка с исходниками (Vitest запускается из корня проекта). */
const SRC_DIR = join(process.cwd(), 'src')

/** Пакеты Vue-стека, которых не должно остаться после миграции. */
const FORBIDDEN_PACKAGES = ['vue', 'ant-design-vue', 'pinia', 'vue-tsc']

/** Расширения файлов, в которых ищем импорты. */
const CODE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'])

/** Спецификаторы импортов: `from`, `import()`, `require()` и `import '...'`. */
const IMPORT_SPECIFIER = /(from\s*|import\s*\(\s*|require\s*\(\s*|import\s+)['"]([^'"]+)['"]/g

/** Импорт из файла. */
interface ImportInfo {
	/** Спецификатор. */
	specifier: string

	/** Номер строки. */
	line: number

	/** Импорт только типа. */
	isTypeOnly: boolean

	/** Динамический импорт. */
	isDynamic: boolean
}

/** Рекурсивно собрать файлы. */
function walk(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
		const path = join(dir, entry.name)

		return entry.isDirectory()
			? walk(path)
			: [path]
	})
}

/** Привести путь к виду `renderer/tests/...`. */
function toRelative(path: string) {
	return relative(SRC_DIR, path).replaceAll('\\', '/')
}

/**
 * Тестовый файл: в тестах Node разрешён.
 * @param path Путь к файлу.
 * @returns Является ли файл тестом.
 */
function isTestFile(path: string) {
	return /\.test\.[tj]sx?$/.test(path)
}

/** Найти импорты в файле. */
function findImports(file: string): ImportInfo[] {
	const result: ImportInfo[] = []

	readFileSync(file, 'utf8').split('\n').forEach((line, index) => {
		for (const match of line.matchAll(IMPORT_SPECIFIER)) {
			result.push({
				specifier: match[2],
				line: index + 1,
				isTypeOnly: /\bimport\s+type\b/.test(line),
				isDynamic: match[1].includes('(')
			})
		}
	})

	return result
}

/** Найти в файле импорты Vue-пакетов. */
function findVueImports(file: string) {
	return findImports(file)
		.filter(({ specifier }) => FORBIDDEN_PACKAGES.some(item => (
			specifier === item || specifier.startsWith(`${item}/`)
		)))
		.map(({ specifier, line }) => `${toRelative(file)}:${line}: импорт "${specifier}"`)
}

/** Проверить, что файл не тянет Node и fast-fs. */
function findNodeImports(file: string) {
	return findImports(file)
		.filter(({ specifier }) => specifier.startsWith('node:') || specifier === 'fast-fs')
		.map(({ specifier, line }) => `${toRelative(file)}:${line}: импорт "${specifier}"`)
}

describe('миграционный guard: следы Vue', () => {
	it('в src не осталось .vue-файлов и импортов Vue-пакетов', () => {
		const files = walk(SRC_DIR)

		expect(files.length, `Не удалось прочитать исходники: ${SRC_DIR}`).toBeGreaterThan(0)

		const vueFiles = files
			.filter(file => file.endsWith('.vue'))
			.map(file => `${toRelative(file)}: файл .vue не удалён после переноса`)
		const vueImports = files
			.filter(file => CODE_EXTENSIONS.has(extname(file)))
			.flatMap(findVueImports)
		const violations = [...vueFiles, ...vueImports]

		expect(
			violations,
			`Миграция Vue -> React не завершена, найдены следы Vue:\n${violations.join('\n')}`
		).toEqual([])
	})
})

describe('sandbox guard: renderer без Node и fast-fs', () => {
	it('в renderer-исходниках нет импортов node: и fast-fs', () => {
		const files = [
			...walk(join(SRC_DIR, 'renderer')).filter(file => !toRelative(file).startsWith('renderer/tests/') && !isTestFile(file)),
			...walk(join(SRC_DIR, 'modules')).filter(file => basename(file) === 'renderer.ts')
		]
		const violations = files
			.filter(file => CODE_EXTENSIONS.has(extname(file)))
			.flatMap(findNodeImports)

		expect(
			violations,
			`Renderer не должен работать с Node напрямую:\n${violations.join('\n')}`
		).toEqual([])
	})

	it('в renderer нет runtime-импортов main-модулей', () => {
		const files = walk(join(SRC_DIR, 'renderer'))
			.filter(file => !toRelative(file).startsWith('renderer/tests/'))
			.filter(file => CODE_EXTENSIONS.has(extname(file)))
		const violations = files
			.flatMap(file => findImports(file).map(importInfo => ({ file, ...importInfo })))
			.filter(({ specifier }) => /^@modules\/.+\/main(\/|$)/.test(specifier))
			.filter(({ isTypeOnly }) => !isTypeOnly)
			.map(({ file, specifier, line }) => `${toRelative(file)}:${line}: импорт "${specifier}"`)

		expect(
			violations,
			`Renderer не должен импортировать main-модули в runtime:\n${violations.join('\n')}`
		).toEqual([])
	})

	it('preload импортирует только electron и emr-bridge', () => {
		const file = join(SRC_DIR, 'renderer/preload.ts')
		const violations = findImports(file)
			.filter(({ specifier }) => !(specifier === 'electron' || specifier.startsWith('emr-bridge/')))
			.map(({ specifier, line }) => `${toRelative(file)}:${line}: импорт "${specifier}"`)

		expect(
			violations,
			`Preload запускается в sandbox и может импортировать только electron и emr-bridge:\n${violations.join('\n')}`
		).toEqual([])
	})

	it('каждый @initMain класс объявляет явное pubName', () => {
		const files = walk(SRC_DIR).filter(file => CODE_EXTENSIONS.has(extname(file)))
		const violations = files
			.filter(file => readFileSync(file, 'utf8').includes('@initMain()'))
			.filter(file => !/static readonly pubName = '[^']+'/.test(readFileSync(file, 'utf8')))
			.map(file => `${toRelative(file)}: нет static readonly pubName`)

		expect(violations, `Имя сущности моста не должно зависеть от минификации:\n${violations.join('\n')}`).toEqual([])
	})

	it('мост не использует имя класса из контекста декоратора', () => {
		const source = readFileSync(join(SRC_DIR, 'utilities/bridge/renderer.ts'), 'utf8')

		expect(source).toContain('getClassName(target)')
		expect(source).not.toContain('context.name ??')
	})

	it('XML ядро не зависит от DI, DOM и node:fs', () => {
		const files = walk(join(SRC_DIR, 'modules/xml/core')).filter(file => CODE_EXTENSIONS.has(extname(file)))
		const violations: string[] = []

		for (const file of files) {
			const source = readFileSync(file, 'utf8')

			for (const { specifier, line } of findImports(file)) {
				if (specifier.startsWith('node:') || specifier.startsWith('@utilities/di') || specifier.startsWith('@modules/files') || specifier === 'electron') {
					violations.push(`${toRelative(file)}:${line}: импорт "${specifier}"`)
				}
			}

			if (/\bdocument\./.test(source)) {
				violations.push(`${toRelative(file)}: использование document`)
			}
		}

		expect(violations, `XML ядро должно быть чистым:\n${violations.join('\n')}`).toEqual([])
	})

	it('окно создаётся с включённой изоляцией и sandbox', () => {
		const source = readFileSync(join(SRC_DIR, 'modules/windows/main/index.ts'), 'utf8')

		expect(source).toContain('contextIsolation: true')
		expect(source).toContain('sandbox: true')
		expect(source).toContain('nodeIntegration: false')
		expect(source).toContain('webviewTag: false')
	})
})
