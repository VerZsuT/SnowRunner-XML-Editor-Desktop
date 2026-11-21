import { FileTextOutlined } from '@ant-design/icons'
import type { IFile } from '@modules/files/renderer'
import { useEditorStore } from '@renderer/pages/general/store/editor'
import { di } from '@utilities/di/container'
import { SYSTEM_TOKEN } from '@utilities/di/renderer/tokens'
import { Typography } from 'antd'
import type { ItemType } from 'antd/es/menu/interface'
import { hasItems } from '@utilities/checks/renderer'
import { FILES_MENU_LOCALIZATION as texts } from './localization'

const { Text } = Typography

/**
 * Получить пункты меню открытых файлов редактора.
 * @returns Пункты меню.
 */
export function useFilesMenuItems(): ItemType[] {
	const allFiles = useEditorStore(state => state.allFiles)
	const system = di.resolve(SYSTEM_TOKEN)

	const items: ItemType[] = []

	if (allFiles.main) {
		items.push(filesGroup(texts.main, [allFiles.main]))
	}

	if (hasItems(allFiles.engines)) {
		items.push(filesGroup(texts.engines, allFiles.engines))
	}

	if (hasItems(allFiles.gearboxes)) {
		items.push(filesGroup(texts.gearboxes, allFiles.gearboxes))
	}

	if (hasItems(allFiles.suspensions)) {
		items.push(filesGroup(texts.suspensions, allFiles.suspensions))
	}

	if (hasItems(allFiles.wheels)) {
		items.push(filesGroup(texts.wheels, allFiles.wheels))
	}

	if (hasItems(allFiles.winches)) {
		items.push(filesGroup(texts.winches, allFiles.winches))
	}

	return [{
		key: 'files_menu',
		label: <Text>{texts.title}</Text>,
		children: items
	}]

	function filesGroup(title: string, files: IFile[]): ItemType {
		return {
			key: `files_${title}`,
			label: <Text>{title}</Text>,
			children: files.map(file => ({
				key: file.path,
				label: (
					<>
						<Text>{file.name}</Text>
						<FileTextOutlined className="menu-item-icon" />
					</>
				),
				onClick: () => void system.openFile(file.path)
			}))
		}
	}
}
