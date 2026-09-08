import type { IFile } from '@modules/files/types'
import type { TruckXML } from '@modules/xml/renderer'
import type { Category } from '@renderer/pages/general/enums'

/** Работа с картинками. [renderer] */
export interface IImages {
	/**
	 * Получить путь к картинке для данного файла автомобиля/прицепа.
	 * @param category Категория файла.
	 * @param file Файл.
	 * @param xml XML файла.
	 * @returns Путь к картинке для данного файла автомобиля/прицепа.
	 */
	getSrc(category: Category, file: IFile, xml: TruckXML): Promise<string>

	/**
	 * Получить путь к картинке по умолчанию.
	 * @param category Категория.
	 * @returns Путь к картинке по умолчанию.
	 */
	getDefault(category: Category): string

	/**
	 * Получить путь к иконке группы.
	 * @param name Название группы.
	 * @returns Путь к иконке группы.
	 */
	getGroupIconSrc(name: string): string

	/**
	 * Получить путь в папке `images`.
	 * @param pathInImagesFolder Название подпапки картинок в папке `images`.
	 * @returns Путь в папке `images`.
	 */
	getImagePath(pathInImagesFolder: string): string
}
