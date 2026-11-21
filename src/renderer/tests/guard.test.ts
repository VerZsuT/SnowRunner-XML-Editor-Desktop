import { readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

/** Папка с исходниками (Vitest запускается из корня проекта). */
const SRC_DIR = join(process.cwd(), 'src')

/** Пакеты Vue-стека, которых не должно остаться после миграции. */
const FORBIDDEN_PACKAGES = ['vue', 'ant-design-vue', 'pinia', 'vue-tsc']

/** Расширения файлов, в которых ищем импорты. */
const CODE_EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs'])

/** Спецификаторы импортов: `from`, `import()`, `require()` и `import '...'`. */
const IMPORT_SPECIFIER = /(?:from\s*|import\s*\(\s*|require\s*\(\s*|import\s+)['"]([^'"]+)['"]/g

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

/** Найти в файле импорты Vue-пакетов. */
function findVueImports(file: string) {
	const violations: string[] = []

	readFileSync(file, 'utf8').split('\n').forEach((line, index) => {
		for (const match of line.matchAll(IMPORT_SPECIFIER)) {
			const specifier = match[1]
			const pkg = FORBIDDEN_PACKAGES.find(item => (
				specifier === item || specifier.startsWith(`${item}/`)
			))

			if (pkg) {
				violations.push(`${toRelative(file)}:${index + 1}: импорт "${specifier}"`)
			}
		}
	})

	return violations
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
