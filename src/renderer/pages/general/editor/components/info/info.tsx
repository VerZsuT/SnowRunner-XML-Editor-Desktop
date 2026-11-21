import type { IAttrDescriptor } from '@modules/xml/game/attributes'
import { Typography } from 'antd'
import { useActive } from '../utilities'
import './info.scss'

const { Text } = Typography

/** Параметры информации. */
export interface InfoProps {
	/** Описание параметра. */
	descriptor?: IAttrDescriptor

	/** Подпись. */
	label?: string

	/** Геттер значения. */
	getter?(): any
}

/** Строка информации. */
export function Info({ getter, descriptor, label }: InfoProps) {
	const { isActive } = useActive()
	const value = String(getter?.() ?? descriptor?.get())
	const labelText = label ?? descriptor?.label

	return (
		<div className="grid info">
			{labelText && (
				<div className="label">
					<Text>{labelText}</Text>
				</div>
			)}
			{isActive && (
				<div className="content">
					<Text>{value}</Text>
				</div>
			)}
		</div>
	)
}
