import type { IDir, IFile } from '@modules/files/types'

/** Архиватор (системный). */
export interface ISystemArchiver {
	/**
	 * Обновить файлы в архиве.
	 * @param dir Папка с файлами.
	 * @param archive Обновляемый архив.
	 */
	update(dir: IDir, archive: IFile): Promise<void>

	/**
	 * Распаковать файлы из архива в папку.
	 * @param archive Распаковываемый архив.
	 * @param dir Папка, в которую будет происходить распаковка.
	 */
	unpack(archive: IFile, dir: IDir): Promise<void>

	/**
	 * Добавить файл в архив.
	 * @param file Добавляемый файл.
	 * @param archive Архив, в который будет добавляться файл.
	*/
	add(file: IFile, archive: IFile): Promise<void>
}
