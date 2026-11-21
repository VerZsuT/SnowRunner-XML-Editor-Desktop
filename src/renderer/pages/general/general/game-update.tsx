import type { IFile } from '@modules/files/renderer'
import { useEditorStore } from '@renderer/pages/general/store/editor'
import { di } from '@utilities/di/container'
import { DIRS_TOKEN, EDITED_TOKEN, FILES_TOKEN } from '@utilities/di/renderer/tokens'
import { Modal, Typography } from 'antd'
import { useState } from 'react'
import { editorUtils } from '../lists/utilities/editor'
import { GENERAL_LOCALIZATION as texts } from './localization'
import './game-update.scss'

const { Text } = Typography

/** Параметры окна восстановления изменений. */
export interface GameUpdateProps {
	/** Открыто ли окно. */
	open: boolean

	/** Изменить состояние окна. */
	onOpenChange(open: boolean): void
}

/** Окно восстановления изменённых данных после обновления игры. */
export function GameUpdate({ open, onOpenChange }: GameUpdateProps) {
	const [loading, setLoading] = useState(false)
	const [action, setAction] = useState<string | null>(null)
	const [current, setCurrent] = useState(0)
	const [allCount, setAllCount] = useState(0)

	async function onOk() {
		const filesToExport: IFile[] = []
		const edited = di.resolve(EDITED_TOKEN)
		const dirs = di.resolve(DIRS_TOKEN)
		const files = di.resolve(FILES_TOKEN)

		setLoading(true)

		for (const { name, dlc, mod, isTrailer } of edited.get()) {
			if (mod) {
				continue
			}

			const dlcFolder = dlc
				? `_dlc/${dlc}`
				: ''
			const truckFolder = isTrailer
				? 'trucks/trailers'
				: 'trucks'
			const file = dirs.backupInitialData.file('[media]', dlcFolder, 'classes', truckFolder, `${name}.xml`)

			if (!await file.exists()) {
				continue
			}

			filesToExport.push(file)
		}

		useEditorStore.getState().setShowMessages(false)
		setAction(texts.export)
		setAllCount(filesToExport.length)

		void editorUtils.export(
			filesToExport.map(file => ({ source: file, toExport: files.exported })),
			() => setCurrent(value => value + 1)
		).then(() => {
			const nonMods = edited.filter(item => !item.mod)

			setCurrent(0)
			setAllCount(nonMods.length)
			setAction(texts.import)

			return editorUtils.import(
				nonMods.map(item => ({ file: edited.convert(item), toImport: files.exported })),
				() => setCurrent(value => value + 1)
			)
		}).then(() => {
			useEditorStore.getState().setShowMessages(true)
			setLoading(false)
			onOpenChange(false)

			void dirs.backupInitialData.remove()
		})
	}

	return (
		<Modal
			open={open}
			title={texts.recovery}
			confirmLoading={loading}
			onOk={() => void onOk()}
			onCancel={() => onOpenChange(false)}
		>
			<p>
				<Text>{texts.restoreInitialChanges}</Text>
			</p>
			{action && (
				<Text>
					{action}
					:{' '}
					{current}
					{' / '}
					{allCount}
				</Text>
			)}
		</Modal>
	)
}
