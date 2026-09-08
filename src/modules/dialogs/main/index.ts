import { loadLocalization } from '@localization/main'
import type { IFile, IFiles } from '@modules/files/main'
import { hasItems } from '@utilities/checks/main'
import { inject } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/main/tokens'
import type { MessageBoxReturnValue } from 'electron'
import { dialog, nativeImage } from 'electron'
import { DialogSourceType, DialogType } from '../enums'
import { DIALOGS_LOCALIZATION } from '../localization'
import type { IDialogAlertParams, IDialogParams, IMainDialogs, IOpenDialogParams } from '../types'

/** Вывод системных диалогов. [main] */
export class Dialogs implements IMainDialogs {
	/** Локализация. */
	private readonly texts = loadLocalization(DIALOGS_LOCALIZATION)

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	/** Описания расширений файлов программы (для диалогов). */
	private readonly extNames = {
		epf: 'Editor params file',
		ecf: 'Editor configuration file',
		pak: 'Package file',
		xml: 'XML file'
	}

	error(message: string): Promise<MessageBoxReturnValue> {
		return this.alert({
			type: 'warning',
			title: this.texts.error,
			message
		})
	}

	alert(params: IDialogAlertParams): Promise<MessageBoxReturnValue> {
		const {
			buttons = [this.texts.ok],
			noLink = false,
			type = 'info',
			title, message
		} = params
		const dialogParams = {
			icon: nativeImage.createFromPath(this.files.icon.path),
			title, message, buttons, noLink, type
		}

		return dialog.showMessageBox(dialogParams)
	}

	getEPF(): string | undefined {
		return this.openDialog<string>({
			extention: 'epf'
		})
	}

	saveEPF(defaultName: string): string | undefined {
		return this.openDialog<string>({
			type: DialogType.save,
			defaultPath: defaultName,
			extention: 'epf'
		})
	}

	getInitial(): string | undefined {
		return this.openDialog<string>({
			extention: 'pak'
		})
	}

	getDir(): string | undefined {
		return this.openDialog<string>({
			source: DialogSourceType.dir
		})
	}

	getDirs(): string[] | undefined {
		return this.openDialog<string[]>({
			properties: ['multiSelections', 'openDirectory']
		})
	}

	getPaks(): string[] | undefined {
		return this.openDialog<string[]>({
			properties: ['multiSelections', 'openFile'],
			extention: '.pak'
		})
	}

	getMultiEPF(): IFile[] | undefined {
		const paths = this.openDialog<string[]>({
			properties: ['openFile', 'multiSelections'],
			extention: 'epf'
		})

		if (paths && hasItems(paths)) {
			return paths.map(path => this.files.newFile(path))
		}
	}

	getXML(): string | undefined {
		return this.openDialog<string>({
			extention: 'xml'
		})
	}

	openDialog<T extends string | string[]>(params: IOpenDialogParams): T | undefined {
		const {
			type = DialogType.open,
			source = DialogSourceType.file,
			properties = (
				source === DialogSourceType.file
					? ['openFile']
					: ['openDirectory']
				),
			defaultPath, extention
		} = params
		const dialogParams: IDialogParams = { properties }

		if (extention) {
			dialogParams.filters = [{
				name: this.extNames[extention],
				extensions: [extention]
			}]
		}

		if (type === DialogType.open) {
			const result = dialog.showOpenDialogSync(dialogParams)

			if (Array.isArray(result)) {
				return (properties.includes('multiSelections')
					? result
					: result[0]
				) as T
			}
		} else {
			const result = dialog.showSaveDialogSync({
				defaultPath,
				filters: dialogParams.filters
			})

			if (result) {
				return result as T
			}
		}
	}
}
