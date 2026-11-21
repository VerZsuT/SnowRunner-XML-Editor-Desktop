import { FileFilled, FolderFilled } from '@ant-design/icons'
import type { IDir, IFile } from '@modules/files/types'
import { di } from '@utilities/di/container'
import { DIALOGS_TOKEN, DIRS_TOKEN, FILES_TOKEN, MESSAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { Button } from 'antd'
import { SETUP_LOCALIZATION as texts } from './localization'
import './initial-select.scss'

/** Параметры выбора initial.pak. */
export interface InitialSelectProps {
	/** Выбранный файл. */
	value?: IFile

	/** Событие выбора. */
	onChange?(file?: IFile): void
}

/** Выбор папки игры или файла initial.pak. */
export function InitialSelect({ onChange }: InitialSelectProps) {
	const files = di.resolve(FILES_TOKEN)
	const dialogs = di.resolve(DIALOGS_TOKEN)
	const messages = di.resolve(MESSAGES_TOKEN)

	async function onFolderClick() {
		const selected = await getFromFolder()

		if (selected) {
			onChange?.(selected)
		}
	}

	async function onFileClick() {
		const selected = await getInitialPak()

		if (selected) {
			onChange?.(selected)
		}
	}

	async function getInitialPak(): Promise<IFile | undefined> {
		const selectedPath = dialogs.getInitial()

		if (!selectedPath) {
			return
		}

		const selectedFile = files.newFile(selectedPath)

		if (selectedFile.basename() !== 'initial.pak' || !await selectedFile.exists()) {
			messages.error(texts.invalidInitialError)

			return
		}

		return selectedFile
	}

	async function getFromFolder(): Promise<IFile | undefined> {
		const selectedPath = dialogs.getDir()

		if (!selectedPath) {
			messages.error(texts.invalidFolderError)

			return
		}

		const dirs = di.resolve(DIRS_TOKEN)
		const found = await findInitial(dirs.newDir(selectedPath))

		if (!found) {
			messages.error(texts.invalidFolderError)

			return
		}

		return found
	}

	async function findInitial(dir: IDir): Promise<IFile | undefined> {
		const parts = ['steamapps', 'common', 'SnowRunner', 'en_us', 'preload', 'paks', 'client', 'initial.pak']
		const len = parts.length

		for (let i = 0; i < len; i++) {
			const file = dir.file(...parts)

			if (await file.exists()) {
				return file
			}

			parts.shift()
		}
	}

	return (
		<div className="game-folder">
			<Button
				className="folder-button"
				type="primary"
				size="large"
				icon={<FolderFilled />}
				onClick={() => void onFolderClick()}
			>
				{texts.gameFolderLabel}
			</Button>
			<Button
				type="primary"
				size="large"
				icon={<FileFilled />}
				onClick={() => void onFileClick()}
			>
				initial.pak
			</Button>
		</div>
	)
}
