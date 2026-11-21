import { loadLocalization } from '@localization/main'
import type { IAppConstants } from '@modules/app/types'
import type { IMainDialogs } from '@modules/dialogs/types'
import type { IMainFiles as IFiles } from '@modules/files/main'
import { inject } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN, DIALOGS_TOKEN, FILES_TOKEN } from '@utilities/di/main/tokens'
import { EPF_LOCALIZATION } from '../localization'
import type { IMainEpf } from '../types'

/** Работа с файлами .epf. [main] */
export class Epf implements IMainEpf {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'Epf'
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
		const names = new Set<string>()

		for (const file of files) {
			let fileObject: any

			try {
				fileObject = await file.readFromJSON()
			} catch (error: any) {
				void this.dialogs.error(`${this.texts.readError}\n${file.path}\n${error?.message}`)

				continue
			}

			const objects = Array.isArray(fileObject)
				? fileObject
				: [fileObject]

			for (const object of objects) {
				const fileName = object?.fileName

				if (typeof fileName === 'string' && !names.has(fileName)) {
					result.push(object)
					names.add(fileName)
				}
			}
		}

		const pathToSave = this.dialogs.saveEPF(this.DEFAULT_FILE_NAME)

		if (pathToSave) {
			try {
				await this.files.newFile(pathToSave).writeToJSON(result)
			} catch (error: any) {
				void this.dialogs.error(`${this.texts.writeError}\n${pathToSave}\n${error?.message}`)

				return
			}

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

		let fileObject: any

		try {
			fileObject = await this.files.newFile(path).readFromJSON()
		} catch (error: any) {
			void this.dialogs.error(`${this.texts.readError}\n${path}\n${error?.message}`)

			return
		}

		const items = Array.isArray(fileObject)
			? fileObject
			: [fileObject]
		const result = items
			.map(item => item?.fileName)
			.filter((name): name is string => typeof name === 'string')

		void this.dialogs.alert({
			title: this.appConstants.NAME,
			message: `${this.texts.seeExportedMessage}\n\n${result.join('\n')}`
		})
	}
}
