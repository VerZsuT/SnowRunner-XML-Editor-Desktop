import { CaretRightOutlined } from '@ant-design/icons'
import type { ReactNode } from 'react'
import { useState } from 'react'
import './group.scss'

/** Параметры группы параметров. */
export interface GroupProps {
	/** Подпись группы. */
	label: string

	/** Содержимое группы. */
	children?: ReactNode

	/** Вложенная группа: по умолчанию свёрнута. */
	nested?: boolean
}

/** Сворачиваемая группа параметров. */
export function Group({ label, children, nested = false }: GroupProps) {
	const [opened, setOpened] = useState(!nested)

	return (
		<div className={nested ? 'editor-group editor-group-nested' : 'editor-group'}>
			<button
				type="button"
				className="editor-group-header"
				aria-expanded={opened}
				onClick={() => setOpened(value => !value)}
			>
				<CaretRightOutlined className="editor-group-arrow" rotate={opened ? 90 : 0} />
				<span className="editor-group-label">{label}</span>
			</button>
			{opened && <div className="editor-group-content">{children}</div>}
		</div>
	)
}
