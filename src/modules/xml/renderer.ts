import type { IFile } from '@modules/files/types'
import { di } from '@utilities/di/container'
import { DIRS_TOKEN, DLC_TOKEN, FS_TOKEN } from '@utilities/di/renderer/tokens'
import { TruckAddon } from './game/addon'
import type { IGameContext } from './game/game-xml'
import { TruckXML } from './game/truck'
import { XMLElement } from './xml-element'
import { XMLTemplatesCache } from './xml-templates'

export * from './game/addon'
export * from './game/attributes'
export * from './game/engines'
export * from './game/game-xml'
export * from './game/gearboxes'
export * from './game/limit'
export * from './game/position'
export * from './game/suspensions'
export * from './game/truck'
export * from './game/wheel'
export * from './game/wheels'
export * from './game/winches'
export * from './game/xml-with-templates'

export * from './xml-element'
export * from './xml-templates'

/** Кэш шаблонов на сессию редактора. */
let templatesCache: XMLTemplatesCache | undefined

/**
 * Получить кэш шаблонов редактора.
 * @returns Кэш шаблонов.
 */
export function getTemplatesCache(): XMLTemplatesCache {
	if (!templatesCache) {
		const dirs = di.resolve(DIRS_TOKEN)

		templatesCache = new XMLTemplatesCache(async name => {
			try {
				return await XMLElement.from(await dirs.templates.file(`${name}.xml`).read())
			} catch {
				return undefined
			}
		})
	}

	return templatesCache
}

/**
 * Создать контекст игры для XML моделей.
 * @returns Контекст игры.
 */
export function createGameContext(): IGameContext {
	return {
		// Поля читаются лениво: разбор XML без обращения к файлам не требует DI.
		get dirs() {
			return di.resolve(DIRS_TOKEN)
		},
		get dlcs() {
			const dlc = di.resolve(DLC_TOKEN) as { get?: () => IGameContext['dlcs'] }

			return typeof dlc.get === 'function' ? dlc.get() : []
		},
		get templates() {
			return getTemplatesCache()
		},
		async readMany(paths) {
			const result = await di.resolve(FS_TOKEN).readMany(paths)

			return result.ok
				? result.value
				: paths.map(() => null)
		},
		async statMany(paths) {
			const result = await di.resolve(FS_TOKEN).statMany(paths)

			return result.ok
				? result.value
				: paths.map(() => null)
		}
	}
}

/**
 * Прочитать XML файл.
 * @param file Файл.
 * @returns Корневой элемент или `undefined`.
 */
export async function readXML(file: IFile): Promise<XMLElement | undefined> {
	return XMLElement.from(await file.read())
}

/** Класс XML модели с фабрикой из разобранного элемента. */
type GameXMLSource<T> = {
	from(source: string | XMLElement, context?: IGameContext): Promise<T | undefined>
}

/**
 * Прочитать XML файл и создать модель.
 * @param Class Класс модели.
 * @param file Файл.
 * @param context Контекст игры.
 * @returns Модель или `undefined`.
 */
export async function readGameXML<T>(Class: GameXMLSource<T>, file: IFile, context = createGameContext()): Promise<T | undefined> {
	const xml = await readXML(file)

	return xml
		? Class.from(xml, context)
		: undefined
}

/**
 * Прочитать XML автомобиля.
 * @param file Файл.
 * @param context Контекст игры.
 * @returns XML автомобиля или `undefined`.
 */
export async function readTruckXML(file: IFile, context = createGameContext()): Promise<TruckXML | undefined> {
	return readGameXML(TruckXML, file, context)
}

/**
 * Прочитать XML аддона.
 * @param source Файл или XML строка.
 * @param context Контекст игры.
 * @returns XML аддона или `undefined`.
 */
export async function readTruckAddon(source: IFile | string, context = createGameContext()): Promise<TruckAddon | undefined> {
	return typeof source === 'string'
		? TruckAddon.from(source, context)
		: readGameXML(TruckAddon, source, context)
}
