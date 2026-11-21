import { load } from 'cheerio'

/** Регулярное выражение сущности XML/HTML. */
const ENTITY = /&(?:#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g

/** Кэш декодированных сущностей. */
const decodedEntities = new Map<string, string>()

/**
 * Декодировать одну сущность средствами cheerio.
 * @param entity Сущность вида `&amp;`.
 * @returns Декодированное значение.
 */
function decodeEntity(entity: string): string {
	const cached = decodedEntities.get(entity)

	if (cached !== undefined) {
		return cached
	}

	const $ = load(`<span>${entity}</span>`)
	const decoded = $('span').text()

	decodedEntities.set(entity, decoded)

	return decoded
}

/**
 * Декодировать сущности XML, сохраняя разметку байт-в-байт.
 * @param xml XML строка.
 * @returns XML с декодированными сущностями.
 */
export function decodeEntities(xml: string): string {
	return xml.replace(ENTITY, decodeEntity)
}
