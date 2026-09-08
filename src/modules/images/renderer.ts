import type { Mods } from '@modules/data/modifications/renderer'
import type { IDirs, IFile, IFiles } from '@modules/files/renderer'
import type { TruckXML } from '@modules/xml/renderer'
import type { Category } from '@renderer/pages/general/enums'
import { di, inject } from '@utilities/di/container'
import { APP_TOKEN, DIRS_TOKEN, FILES_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import type { IImages } from './types'

/** Работа с картинками. [renderer] */
export class Images implements IImages {
	/** Модификации игры. */
	@inject(MODS_TOKEN)
	private readonly mods!: Mods

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: IDirs

	async getSrc(category: Category, file: IFile, xml: TruckXML): Promise<string> {
		const images = this.dirs.newDir(this.getImagePath(category))
		const image = images.file(`${file.name}.webp`)
		const defaultImage = images.file('default.webp')
		const modID = this.mods.getModID(file)

		if (modID) {
			const modImage = await this.getModImage(category, file, xml)

			return modImage
				? modImage.path
				: defaultImage.path
		}

		return await this.imageExists(image)
			? image.path
			: defaultImage.path
	}

	getDefault(category: Category): string {
		return this.dirs.newDir(this.getImagePath(category)).file('default.webp').path
	}

	getGroupIconSrc(name: string): string {
		return this.getImagePath(`icons/${name}.webp`)
	}

	getImagePath(pathInImagesFolder: string) {
		const app = di.resolve(APP_TOKEN)
		const base = app.isDev
			? '/src'
			: '..'

		return `${base}/images/${pathInImagesFolder}`
	}

	/**
	 * Получить модовую картинку.
	 * @param category Категория.
	 * @param file Файл.
	 * @param xml XML файла.
	 * @returns Модовая картинка.
	 */
	private async getModImage(category: Category, file: IFile, xml: TruckXML): Promise<IFile | undefined> {
		const modName = this.mods.getModID(file)

		if (!modName || !xml.GameData?.UiDesc) {
			return
		}

		const images = this.dirs.newDir(this.getImagePath(category))
		const defaultImage = images.file('default.webp')

		const imgName = xml.GameData?.UiDesc?.UiIcon328x458
		const imgFile = this.files.newFile(`${'../'.repeat(5)}build/modsTemp/${modName}/ui/textures/${imgName}.png`)

		return await this.imageExists(imgFile)
			? imgFile
			: defaultImage
	}

	/**
	 * Существует ли картинка.
	 * @param file Файл картинки.
	 * @returns Существует ли картинка.
	 */
	private imageExists(file: IFile): Promise<boolean> {
		const image = new Image()

		return new Promise(resolve => {
			image.onload = () => resolve(true)
			image.onerror = () => resolve(false)
			image.src = file.path
		})
	}
}
