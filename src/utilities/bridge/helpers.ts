import type { IPubNamed } from './types'

export type * from './types'

/**
 * Получить публичное название.
 * @param className Название класса.
 * @param name Название свойства.
 * @returns Публичное название.
 */
export function getPublicName(className: string, name: string): string {
	return `${className}/${name}`
}

/**
 * Получить публичное название класса.
 * @param target Класс с публичным именем.
 * @returns Публичное имя класса.
 */
export function getClassName(target: IPubNamed): string {
	if (!target.pubName) {
		throw new Error('[bridge] Published class must declare static pubName')
	}

	return target.pubName
}
