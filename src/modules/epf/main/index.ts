import { loadLocalization } from '@localization/main'
import type { IAppConstants } from '@modules/app/types'
import type { IMainDialogs } from '@modules/dialogs/types'
import type { IFiles } from '@modules/files/main'
import { inject } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN, DIALOGS_TOKEN, FILES_TOKEN } from '@utilities/di/main/tokens'
import { EPF_LOCALIZATION } from '../localization'
import type { IMainEpf } from '../types'

/** Работа с файлами .epf. [main] */
export class Epf implements IMainEpf {
	/** Локализация. */
	private readonly texts = loadLocalization(EPF_LOCALIZATION)

	/** Константы приложения. */
	@inject(APP_CONSTANTS_TOKEN)
	private readonly appConstants!: IAppConstants

	/** Диалоги. */
	@inject(DIALOGS_TOKEN)
	private readonly dialogs!: IMainDialogs

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	/** Название объединённого файла по умолчанию. */
	private readonly DEFAULT_FILE_NAME = 'joined'

	async join() {
		const files = this.dialogs.getMultiEPF()

		if (!files || files.length <= 1) {
			return
		}

		const result: any[] = []
		const names: string[] = []

		for (const file of files) {
			const fileObject = await file.readFromJSON()

			if (Array.isArray(fileObject)) {
				for (const object of fileObject) {
					if (!names.includes(object.fileName)) {
						result.push(object)
						names.push(object.fileName)
					}
				}
			} else if (!names.includes(fileObject.fileName)) {
				result.push(fileObject)
				names.push(fileObject.fileName)
			}
		}

		const pathToSave = this.dialogs.saveEPF(this.DEFAULT_FILE_NAME)

		if (pathToSave) {
			await this.files.newFile(pathToSave).writeToJSON(result)
			void this.dialogs.alert({
				title: this.appConstants.NAME,
				message: `${this.texts.successJoin}\n- ${files.map(value => value.basename()).join('\n- ')}`
			})
		}
	}

	async see() {
		const path = this.dialogs.getEPF()

		if (!path) {
			return
		}

		const fileObject = await this.files.newFile(path).readFromJSON()
		const result: string[] = []

		if (Array.isArray(fileObject)) {
			for (const item of fileObject) {
				result.push(item.fileName)
			}
		} else {
			result.push(fileObject.fileName)
		}

		void this.dialogs.alert({
			title: this.appConstants.NAME,
			message: `${this.texts.seeExportedMessage}\n\n${result.join('\n')}`
		})
	}
}
