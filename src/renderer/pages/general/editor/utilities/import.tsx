import { di } from '@utilities/di/container'
import { DIALOGS_TOKEN, DLC_TOKEN, FILES_TOKEN, MESSAGES_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import type { IExportedData } from '@modules/epf/types'
import type { IFile } from '@modules/files/types'
import { readTruckXML, TruckFileType } from '@modules/xml/renderer'
import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { exportUtils } from './export'

/** Слушатель импорта. */
export type ImportListener = (data: IExportedData) => void | Promise<void>

class ImportUtils {
	private readonly listeners = new Set<ImportListener>()

	/**
	 * Добавить слушателя импорта.
	 * @param listener Слушатель.
	 * @returns Функция отписки.
	 */
	onImport(listener: ImportListener) {
		this.listeners.add(listener)

		return () => {
			this.listeners.delete(listener)
		}
	}

	readonly getName = exportUtils.getName

	async importFile(source: IFile, toImport?: IFile) {
		const dialogs = di.resolve(DIALOGS_TOKEN)
		const chosenPath = toImport?.path ?? dialogs.getEPF()

		if (!chosenPath) {
			return
		}

		const xml = await readTruckXML(source)

		if (!xml) {
			return
		}

		const files = di.resolve(FILES_TOKEN)
		const messages = di.resolve(MESSAGES_TOKEN)

		const chosenFile = files.newFile(chosenPath)
		const data = await chosenFile.readFromJSON<IExportedData>()

		if (data.version !== exportUtils.EXPORT_VERSION) {
			messages.error('Unsupported file version')

			return
		}

		const dlcs = di.resolve(DLC_TOKEN)
		const mods = di.resolve(MODS_TOKEN)

		if (!data.info.some(item => (
			item.name === source.name
			&& item.isTrailer === (xml.Type === TruckFileType.trailer)
			&& item.dlc === dlcs.getDLC(source)
			&& item.mod === mods.getModID(source)
		))) {
			messages.error('The necessary parameters not found')

			return
		}

		return Promise.all([...this.listeners].map(async listener => await listener(data)))
	}
}

export const importUtils = new ImportUtils()

/** Контекст файла. */
export const FileContext = createContext<IFile | null>(null)

/** Получить текущий файл. */
export function useFile(): IFile {
	const file = useContext(FileContext)

	if (!file) {
		throw new Error('FileContext is not provided')
	}

	return file
}

/** Провайдер файла. */
export function FileProvider({ file, children }: { file: IFile, children: ReactNode }) {
	return <FileContext.Provider value={file}>{children}</FileContext.Provider>
}
