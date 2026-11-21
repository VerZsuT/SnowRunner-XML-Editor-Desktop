import type { XMLElement } from './xml-element'

export { decodeEntities } from './entities'

/**
 * Сериализовать элемент.
 * @param element Элемент.
 * @returns Строковое представление элемента.
 */
export function serializeXMLElement(element: XMLElement): string {
	return element.xml
}

/**
 * Сериализовать документ целиком.
 * @param root Корневой элемент.
 * @returns Строковое представление документа.
 */
export function serializeDocument(root: XMLElement): string {
	return root.baseXML
}
