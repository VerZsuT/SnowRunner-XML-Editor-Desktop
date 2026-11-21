// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { decodeEntities } from './entities'
import { serializeDocument, serializeXMLElement } from './serialize'
import { parseXML, XMLElement } from './xml-element'

/** Пример XML. */
const SOURCE = '<Truck Type="trailer"><TruckData Fuel="40" /><Name>A &amp; B</Name></Truck>'

describe('parseXML', () => {
	it('разбирает строку', () => {
		const root = parseXML(SOURCE)

		expect(root).toBeInstanceOf(XMLElement)
		expect(root!.select('Truck')).toBeDefined()
		expect(root!.select('Truck > Name')!.innerXML).toBe('A &amp; B')
	})

	it('возвращает undefined для пустой строки', () => {
		expect(parseXML('')).toBeUndefined()
	})
})

describe('decodeEntities', () => {
	it('декодирует сущности в тексте и атрибутах', () => {
		expect(decodeEntities('<a x="1 &amp; 2">a &lt; b</a>')).toBe('<a x="1 & 2">a < b</a>')
	})

	it('не трогает обычный XML', () => {
		expect(decodeEntities('<a x="1">text</a>')).toBe('<a x="1">text</a>')
	})
})

describe('сериализация', () => {
	it('serializeXMLElement идемпотентен', () => {
		const root = parseXML(SOURCE)!
		const name = root.select('Name')!
		const first = serializeXMLElement(name)
		const second = serializeXMLElement(parseXML(first)!.select('Name')!)

		expect(second).toBe(first)
	})

	it('serializeDocument идемпотентен', () => {
		const first = serializeDocument(parseXML(SOURCE)!)
		const second = serializeDocument(parseXML(first)!)

		expect(second).toBe(first)
	})
})
