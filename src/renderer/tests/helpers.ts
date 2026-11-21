import { Lang } from '@modules/data/config/enums'
import type { IFile } from '@modules/files/types'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, IMAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { proxy } from 'valtio'

/**
 * Создать фиктивный файл (для тестов, где нужны только `name`/`path`).
 * @param name Имя файла без расширения.
 * @param dir Папка файла.
 * @returns Фиктивный файл.
 */
export function makeFile(name: string, dir = 'C:/game/[media]/classes/trucks'): IFile {
	const path = `${dir}/${name}.xml`

	return {
		name,
		path,
		dirname: dir,
		extname: '.xml',
		basename: () => `${name}.xml`,
		exists: async () => true,
		read: async () => ''
	} as unknown as IFile
}

/**
 * Зарегистрировать фиктивную конфигурацию в DI.
 * @param lang Язык интерфейса.
 * @returns Реактивный объект конфигурации.
 */
export function registerConfig(lang: Lang = Lang.en) {
	const config = proxy({ lang })

	di.register(CONFIG_TOKEN, config as any)

	return config
}

/**
 * Зарегистрировать фиктивные изображения (нужны `Group`).
 * @returns Фиктивные изображения.
 */
export function registerImages() {
	const images = {
		getGroupIconSrc: (icon: string) => `/images/${icon}`
	}

	di.register(IMAGES_TOKEN, images as any)

	return images
}
