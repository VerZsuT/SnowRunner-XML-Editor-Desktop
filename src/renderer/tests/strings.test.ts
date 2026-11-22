import { formatString, prettyString } from '@utilities/strings'
import { describe, expect, it } from 'vitest'

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
