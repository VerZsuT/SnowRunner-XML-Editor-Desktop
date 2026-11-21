import { win32 } from 'node:path'
import { describe, expect, it } from 'vitest'
import { basename, dirname, extname, joinPath, normalizePath } from './renderer'

/**
 * Пути, на которых проверяется совпадение с node:path.win32.
 */
const pathCases: string[] = [
	'C:\\a\\b',
	'C:\\',
	'C:',
	'C:foo',
	'\\\\server\\share\\a',
	'\\\\server\\share',
	'\\\\server\\share\\',
	'\\\\server',
	'\\\\',
	'\\',
	'//server/share/a',
	'a\\b\\c',
	'a/b\\c',
	'a\\..\\b',
	'a\\..\\..\\b',
	'.\\a',
	'',
	'.',
	'..',
	'a\\',
	'C:\\a\\b.xml',
	'C:\\a\\b\\',
	'file.name.with.dots.pak',
	'C:\\a\\..',
	'a//b',
	'C:/a\\b/../c',
	'...',
	'.pak',
	'a.',
	'C:\\a\\.hidden',
	'C:..',
	'C:.',
	'C:\\a:b',
	'a:b',
	'foo:bar',
	'COM1:',
	'\\\\?\\C:\\a',
	'\\\\.\\PHYSICALDRIVE0'
]

/**
 * Наборы аргументов, на которых проверяется joinPath.
 */
const joinCases: string[][] = [
	['C:\\root', '[media]\\classes', 'trucks'],
	['C:\\root', '[media]\\classes'],
	['C:\\root', '', 'trucks'],
	['C:\\', 'a', '..', 'b'],
	['C:', 'a'],
	['C:\\a', '..', '..', 'b'],
	['a', 'b', 'c'],
	['a/b', 'c'],
	['a\\', 'b'],
	['', 'a', ''],
	['', ''],
	[],
	['\\\\server\\share', 'a', 'b'],
	['\\\\server', 'share'],
	['//server', 'share'],
	['.', 'a'],
	['C:\\root', '[media]\\classes', 'trucks', '..', 'CargoBags.xml']
]

/**
 * Пары «путь — суффикс» для basename.
 */
const basenameCases: [string, string][] = [
	['C:\\a\\b.xml', '.xml'],
	['file.name.with.dots.pak', '.pak'],
	['file.name.with.dots.pak', '.xml'],
	['a\\b.txt', '.md'],
	['C:\\a\\.pak', '.pak'],
	['C:\\a\\b.pak', '.pak'],
	['a\\', '.pak'],
	['', '.pak'],
	['C:\\a\\b', ''],
	['package.json', 'package.json'],
	['package.json', 'json'],
	['C:\\a\\b.pak', '.pak.pak']
]

describe('renderer paths — совпадение с node:path.win32', () => {
	describe('normalizePath', () => {
		it.each(pathCases)('normalizePath(%j)', value => {
			expect(normalizePath(value)).toBe(win32.normalize(value))
		})
	})

	describe('dirname', () => {
		it.each(pathCases)('dirname(%j)', value => {
			expect(dirname(value)).toBe(win32.dirname(value))
		})
	})

	describe('basename', () => {
		it.each(pathCases)('basename(%j)', value => {
			expect(basename(value)).toBe(win32.basename(value))
		})
	})

	describe('extname', () => {
		it.each(pathCases)('extname(%j)', value => {
			expect(extname(value)).toBe(win32.extname(value))
		})
	})

	describe('basename с суффиксом', () => {
		it.each(basenameCases)('basename(%j, %j)', (value, suffix) => {
			expect(basename(value, suffix)).toBe(win32.basename(value, suffix))
		})
	})

	describe('joinPath', () => {
		it.each(joinCases)('joinPath(%j)', (...parts) => {
			expect(joinPath(...parts)).toBe(win32.join(...parts))
		})
	})
})
