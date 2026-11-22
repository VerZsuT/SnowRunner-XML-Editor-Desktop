import type { AttrDescriptor, Field, Position } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'

/** Значения одного документа: selector → имя атрибута → значение. */
export type DocumentDefaults = Record<string, Record<string, string>>

/** Значения по умолчанию: docId → значения документа. */
export type DefaultsStore = Record<string, DocumentDefaults>

const DefaultsContext = createContext<DefaultsStore>({})

/** Передаёт полям значения по умолчанию открытых документов. */
export function DefaultsProvider({ values, children }: { values: DefaultsStore, children?: ReactNode }) {
	return <DefaultsContext.Provider value={values}>{children}</DefaultsContext.Provider>
}

/** Значение по умолчанию поля: из файла defaults, иначе объявленное в модели. */
export function useFieldDefault(session: DocumentSession, field: Field<unknown>): unknown {
	const store = useContext(DefaultsContext)
	const raw = store[session.docId]?.[field.descriptor.selector]?.[field.descriptor.name]

	return parseDefault(field.descriptor, raw) ?? field.defaultValue
}

/** Преобразует строку из defaults в значение нужного типа. */
function parseDefault(descriptor: AttrDescriptor, raw: string | undefined): unknown {
	if (raw === undefined) {
		return undefined
	}

	if (
		raw.trim() === ''
		&& descriptor.attrType !== 'string'
		&& descriptor.attrType !== 'stringArray'
	) {
		return undefined
	}

	switch (descriptor.attrType) {
		case 'integer':
		case 'float': {
			const value = Number(raw)

			return Number.isFinite(value) ? value : undefined
		}
		case 'boolean':
			return raw === 'true'
		case 'position':
			return parsePosition(raw)
		case 'stringArray':
			return raw === '' ? [] : raw.split(',').map(item => item.trim()).filter(Boolean)
		default:
			return raw
	}
}

/** Позиция из формата `(x; y; z)`. */
function parsePosition(raw: string): Position | undefined {
	const match = raw.match(/^\(\s*([^;]+);\s*([^;]+);\s*([^)]+)\)$/)

	if (!match) {
		return undefined
	}

	const x = Number(match[1])
	const y = Number(match[2])
	const z = Number(match[3])

	return [x, y, z].every(Number.isFinite) ? { x, y, z } : undefined
}
