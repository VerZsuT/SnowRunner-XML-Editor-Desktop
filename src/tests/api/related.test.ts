import type { Truck } from '@/api/bindings'
import { socketNames, wheelNames } from '@/pages/editor/components/related'
import { describe, expect, it } from 'vitest'

/** Поле-строка сокета. */
function socket(value: string | null, defaultValue: string | null = null) {
	return {
		value,
		defaultValue,
		descriptor: {
			name: 'Type',
			selector: '/Truck/TruckData/EngineSocket',
			attrType: 'string' as const,
			label: null,
			desc: null,
			limit: null,
			step: null,
			areas: null,
			options: null
		}
	}
}

/** Трак с наборами колёс. */
function truck(types: Array<string | null>): Truck {
	return {
		fileType: socket('Truck'),
		truckData: {
			compatibleWheels: types.map(type => ({ type: socket(type), scale: socket('1') }))
		},
		gameData: null
	} as unknown as Truck
}

describe('socketNames', () => {
	it('разбирает список файлов сокета', () => {
		expect(socketNames(socket('engines_a, engines_b'))).toEqual(['engines_a', 'engines_b'])
	})

	it('пропускает пустые имена', () => {
		expect(socketNames(socket(' , '))).toEqual([])
		expect(socketNames(socket(null))).toEqual([])
		expect(socketNames(undefined)).toEqual([])
	})

	it('использует значение по умолчанию', () => {
		expect(socketNames(socket(null, 'engines'))).toEqual(['engines'])
	})
})

describe('wheelNames', () => {
	it('собирает уникальные имена наборов', () => {
		expect(wheelNames(truck(['wheels_a', 'wheels_b', 'wheels_a', null]))).toEqual(['wheels_a', 'wheels_b'])
	})

	it('возвращает пустой список без совместимых колёс', () => {
		expect(wheelNames(truck([]))).toEqual([])
	})
})
