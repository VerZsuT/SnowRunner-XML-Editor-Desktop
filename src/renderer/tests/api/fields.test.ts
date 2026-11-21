import type { DocumentClient } from '@renderer/api/documents'
import { DocumentSession } from '@renderer/api/documents'
import { fieldValue, formatPosition, formatValue, resetField, writeField } from '@renderer/api/fields'
import type { AttrDescriptor, Field } from '@renderer/api/bindings'
import { describe, expect, it, vi } from 'vitest'

/** Дескриптор поля. */
function descriptor(name = 'Field'): AttrDescriptor {
	return {
		name,
		selector: '/Truck/TruckData',
		attrType: 'string',
		label: null,
		desc: null,
		limit: null,
		step: null,
		areas: null,
		options: null
	}
}

/** Поле с значением и значением по умолчанию. */
function field<T>(value: T | null, defaultValue: T | null = null): Field<T> {
	return { value, defaultValue, descriptor: descriptor() }
}

/** Клиент с одним методом setAttr. */
function client(): DocumentClient {
	const setAttr = vi.fn(async () => ({ docId: 'doc-1', revision: 1, selector: '/Truck/TruckData', value: null, dirty: true }))

	return { setAttr } as unknown as DocumentClient
}

describe('formatValue', () => {
	it('пишет числа как String(number)', () => {
		expect(formatValue(1)).toBe('1')
		expect(formatValue(1.5)).toBe('1.5')
		expect(formatValue(-0.25)).toBe('-0.25')
	})

	it('пишет логические значения и списки', () => {
		expect(formatValue(true)).toBe('true')
		expect(formatValue(false)).toBe('false')
		expect(formatValue(['RU', 'US'])).toBe('RU,US')
	})

	it('пишет позицию в формате игры', () => {
		expect(formatValue({ x: 1.5, y: 2, z: -3 })).toBe('(1.5; 2; -3)')
		expect(formatPosition({ x: null, y: null, z: null })).toBe('(0; 0; 0)')
	})

	it('удаляет атрибут при null', () => {
		expect(formatValue(null)).toBeNull()
		expect(formatValue(undefined)).toBeNull()
	})
})

describe('поля документа', () => {
	it('берёт значение по умолчанию, если значения нет', () => {
		expect(fieldValue(field<number>(null, 5))).toBe(5)
		expect(fieldValue(field<number>(7, 5))).toBe(7)
	})

	it('пишет значение поля в документ', async () => {
		const documentClient = client()
		const session = new DocumentSession({ docId: 'doc-1', kind: 'truck', name: 'truck', path: 'truck.xml', archiveName: 'truck.xml', revision: 0, dirty: false }, documentClient)

		await writeField(session, field<number>(null, 5), 210)

		expect(documentClient.setAttr).toHaveBeenCalledWith('doc-1', 0, descriptor(), '210')
	})

	it('сбрасывает поле к значению по умолчанию', async () => {
		const documentClient = client()
		const session = new DocumentSession({ docId: 'doc-1', kind: 'truck', name: 'truck', path: 'truck.xml', archiveName: 'truck.xml', revision: 0, dirty: false }, documentClient)

		await resetField(session, field<number>(210, 5))

		expect(documentClient.setAttr).toHaveBeenCalledWith('doc-1', 0, descriptor(), '5')
	})

	it('сбрасывает поле без значения по умолчанию в null', async () => {
		const documentClient = client()
		const session = new DocumentSession({ docId: 'doc-1', kind: 'truck', name: 'truck', path: 'truck.xml', archiveName: 'truck.xml', revision: 0, dirty: false }, documentClient)

		await resetField(session, field<string>('value', null))

		expect(documentClient.setAttr).toHaveBeenCalledWith('doc-1', 0, descriptor(), null)
	})
})
