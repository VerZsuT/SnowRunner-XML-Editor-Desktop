import { compareVersions, formatString, prettyString, processNameForFilesystem } from '@utilities/strings'
import { describe, expect, it } from 'vitest'

describe('compareVersions', () => {
	it('сравнивает числовые части, а не строки', () => {
		expect(compareVersions('1.10.0', '1.9.0')).toBe(1)
		expect(compareVersions('1.4.0', '1.4.0')).toBe(0)
		expect(compareVersions('1.4.0', '1.4.1')).toBe(-1)
	})

	it('учитывает prerelease', () => {
		expect(compareVersions('1.4.0-beta', '1.4.0')).toBe(-1)
		expect(compareVersions('1.4.0', '1.4.0-beta')).toBe(1)
		expect(compareVersions('1.4.0-beta.2', '1.4.0-beta.1')).toBe(1)
	})
})

describe('processNameForFilesystem', () => {
	it('не допускает выхода из папки и пустых имён', () => {
		expect(processNameForFilesystem('..\\..\\evil')).toBe('evil')
		expect(processNameForFilesystem('   ')).toBe('mod')
		expect(processNameForFilesystem('a/b\\c')).toBe('abc')
	})

	it('экранирует зарезервированные имена Windows', () => {
		expect(processNameForFilesystem('CON')).toBe('_con')
		expect(processNameForFilesystem('nul')).toBe('_nul')
	})
})

describe('formatString', () => {
	it('не падает на пустых и нестроковых аргументах', () => {
		expect(formatString(undefined as unknown as string)).toBe('')
		expect(formatString('a {} b', undefined as unknown as string)).toBe('a  b')
		expect(formatString('a {lst}', 'x', 'y')).toBe('a y')
	})
})

describe('prettyString', () => {
	it('не падает на пустой строке', () => {
		expect(prettyString('')).toBe('')
		expect(prettyString('some_name')).toBe('Some name')
	})
})
