import type { IDirs, IFile } from '@modules/files/renderer'
import { lastItem } from '@utilities/checks/renderer'
import { di, inject } from '@utilities/di/container'
import { DIRS_TOKEN, DLC_TOKEN, FS_TOKEN } from '@utilities/di/renderer/tokens'
import type { AttrValue } from '../xml-element'
import { XMLElement } from '../xml-element'
import type { Limit } from './limit'

/** Информация о файле. */
export type FileInfo = {
	/** Название DLC, к которому относится файл. */
	dlc?: string

	/** Название мода, к которому относится файл. */
	mod?: string

	/** Относится ли файл к бэкапу перед распаковкой. */
	isBackup?: boolean
}

/** XML элемент из файлов игры. */
export class GameXML extends XMLElement {
	@inject(DIRS_TOKEN)
	protected readonly dirs!: IDirs

	constructor(element: XMLElement, selector = '', baseElement = element) {
		super(element.toCheerio(), selector, baseElement.toCheerio())
	}

	/**
	 * Получить геттер файлов.
	 * @param folder Название папки в `classes`.
	 * @param namesGetter Геттер имени файлов.
	 */
	protected files(folder: string, namesGetter: () => string | undefined) {
		return async (info: FileInfo): Promise<IFile[]> => {
			const names = namesGetter()?.split(',') ?? []

			if (lastItem(names) === '') {
				names.pop()
			}

			return (await Promise.all(names.map(async name => this.file(folder, () => name)(info)))
				).filter(Boolean) as IFile[]
		}
	}

	/**
	 * Получить геттер файла.
	 * @param folder Название папки в `classes`.
	 * @param nameGetter Геттер имени файла.
	 */
	protected file(folder: string, nameGetter: () => string | undefined) {
		return async (info: FileInfo): Promise<IFile | undefined> => {
			const name = nameGetter()?.trim()

			if (name) {
				return this.getFile(folder, name, info)
			}
		}
	}

	/**
	 * Получить геттер элементов из файлов.
	 * @param Class Класс, который будет создаваться из файлов.
	 * @param filesGetter Геттер файлов.
	 */
	protected filesElements<T extends GameXML>(
		Class: { from: typeof GameXML['from'] },
		filesGetter: ReturnType<typeof this.files>
	) {
		return async (info: FileInfo, files?: IFile[]): Promise<T[]> => {
			const resolved = files ?? await filesGetter(info)

			return this.elementsFromFiles<T>(resolved, async data => await Class.from(data) as T | undefined)
		}
	}

	/**
	 * Получить геттер элемента из файла.
	 * @param Class Класс, который будет создаваться из файла.
	 * @param fileGetter Геттер файла.
	 */
	protected fileElement<T extends GameXML>(
		Class: { from: typeof GameXML['from'] },
		fileGetter: ReturnType<typeof this.file>
	) {
		return async (info: FileInfo, file?: IFile): Promise<T | undefined> => {
			const resolved = file ?? await fileGetter(info)

			if (resolved) {
				const [element] = await this.elementsFromFiles<T>([resolved], async data => await Class.from(data) as T | undefined)

				return element
			}
		}
	}

	/**
	 * Прочитать пачку файлов одним запросом и создать из них элементы.
	 * @param files Файлы.
	 * @param create Создатель элемента из содержимого файла.
	 * @returns Элементы.
	 */
	private async elementsFromFiles<T>(
		files: IFile[],
		create: (data: string) => Promise<T | undefined>
	): Promise<T[]> {
		if (!files.length) {
			return []
		}

		const contents = await di.resolve(FS_TOKEN).readMany(files.map(file => file.path))

		if (!contents.ok) {
			return []
		}

		const result: T[] = []

		for (const data of contents.value) {
			if (data === null) {
				continue
			}

			const element = await create(data)

			if (element) {
				result.push(element)
			}
		}

		return result
	}

	/**
	 * Запрос к атрибуту.
	 *
	 * Если `value=null`, то удаляет атрибут.
	 * Если `value=undefined`, то возвращает значение атрибута.
	 * @param attrName Имя атрибута.
	 * @param value Устанавливаемое значение.
	 * @param limit Лимит числового значения.
	 */
	procAttr(attrName: string, value?: string | number | boolean | null, limit?: Limit): AttrValue | undefined {
		switch (value) {
			case undefined:
				return this.getAttr(attrName)
			case null:
				this.removeAttr(attrName)

				break
			default:
				if (limit) {
					value = limit.lim(Number.parseFloat(String(value)))
				}

				this.setAttr(attrName, value)
		}
	}

	/**
	 * Получить файл.
	 * @param folder Папка в `classes`.
	 * @param name Имя файла.
	 * @param info Информация о файле.
	 */
	private async getFile(folder: string, name: string, info: FileInfo): Promise<IFile | undefined> {
		const { isBackup, mod } = info

		const classesDir = isBackup
			? this.dirs.backupInitialData.dir('[media]\\classes')
			: this.dirs.classes
		const dlcDir = isBackup
			? this.dirs.backupInitialData.dir('[media]\\_dlc')
			: this.dirs.dlc
		const dlcs = di.resolve(DLC_TOKEN).get()

		// Порядок как раньше: DLC (в обратном порядке), затем мод, затем classes.
		const maybe: IFile[] = [
			...[...dlcs].reverse().map(dlc => dlcDir.file(dlc.name, `classes/${folder}/${name}.xml`)),
			...mod ? [this.dirs.modsTemp.file(mod, `classes/${folder}/${name}.xml`)] : [],
			classesDir.file(`${folder}/${name}.xml`)
		]
		const stats = await di.resolve(FS_TOKEN).statMany(maybe.map(file => file.path))

		if (!stats.ok) {
			return
		}

		for (let index = 0; index < maybe.length; index += 1) {
			if (stats.value[index]) {
				return maybe[index]
			}
		}
	}
}
