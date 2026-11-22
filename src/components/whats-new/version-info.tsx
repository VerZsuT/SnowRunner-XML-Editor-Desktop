import { Typography } from 'antd'
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
		<ul className="version-info">
			{changes.map((item, index) => (
				<li key={`${index}-${item}`}>
					<Text>{item}.</Text>
				</li>
			))}
		</ul>
	)
}
