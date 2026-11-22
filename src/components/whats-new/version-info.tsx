import { List, Typography } from 'antd'
import './version-info.scss'

const { Text } = Typography

/** Параметры информации о версии. */
export interface VersionInfoProps {
	/** Изменения в данной версии. */
	changes: string[]
}

/** Список изменений версии. */
export function VersionInfo({ changes }: VersionInfoProps) {
	return (
		<List
			className="version-info"
			size="small"
			dataSource={changes}
			renderItem={item => (
				<List.Item>
					<Text>{item}.</Text>
				</List.Item>
			)}
		/>
	)
}
