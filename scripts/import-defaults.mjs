// Готовит сжатый файл значений по умолчанию из defaults.ts версии 1.4.0.
// Запуск: node scripts/import-defaults.mjs [path/to/defaults.ts]
// Без аргумента источник берётся из git-тега v1.4.0.

import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const sourcePath = process.argv[2]
const source = sourcePath
	? readFileSync(sourcePath, 'utf8')
	: execFileSync('git', ['show', 'v1.4.0:src/modules/data/defaults/renderer.ts'], {
		encoding: 'utf8',
		maxBuffer: 16 * 1024 * 1024
	})
const marker = 'export default '
const start = source.indexOf(marker)

if (start < 0) {
	throw new Error('defaults.ts: не найден export default')
}

const body = source
	.slice(start + marker.length)
	.trim()
	.replace(/satisfies\s+IDefaults\s*;?\s*$/, '')
	.replace(/;\s*$/, '')
const raw = Function(`\"use strict\"; return (${body})`)()
const normalized = {}

for (const [file, selectors] of Object.entries(raw)) {
	normalized[file] = {}

	for (const [selector, attributes] of Object.entries(selectors)) {
		const values = {}

		for (const [name, value] of Object.entries(attributes)) {
			values[name] = String(value)
		}

		normalized[file][selector] = values
	}
}

const output = path.resolve('src-tauri/assets/defaults.json.gz')
const json = JSON.stringify(normalized)
mkdirSync(path.dirname(output), { recursive: true })
writeFileSync(output, gzipSync(json, { level: 9 }))
console.log(`${output}: ${Object.keys(normalized).length} files, ${json.length} bytes JSON`)
