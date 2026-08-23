/**
 * Получить публичное название.
 * @param className Название класса.
 * @param name Название свойства.
 * @returns Публичное название.
 */
export function getPublicName(className: string, name: string): string {
	return `${className}/${name}`
}
