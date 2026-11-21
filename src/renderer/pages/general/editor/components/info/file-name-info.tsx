import type { IFile } from '@modules/files/renderer'
import { useConfig } from '@renderer/utilities/use-reactive'
import { di } from '@utilities/di/container'
import { SYSTEM_TOKEN } from '@utilities/di/renderer/tokens'
import { Typography } from 'antd'
import { useActive } from '../utilities'
import './file-name-info.scss'

const { Text } = Typography

/** Параметры информации о файле. */
export interface FileInfoProps {
	/** Файл. */
	file: IFile
}

/** Информация о файле. */
export function FileNameInfo({ file }: FileInfoProps) {
	const { isActive } = useActive()
	const config = useConfig()
	const system = di.resolve(SYSTEM_TOKEN)

	if (!isActive || !config.advancedMode) {
		return null
	}

	return (
		<div className="grid file-name-info">
			<div
				className="content"
				onClick={() => system.openFile(file.path)}
			>
				<Text>{file.basename()}</Text>
			</div>
		</div>
	)
}
