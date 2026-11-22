import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useEffect, useState } from 'react'
import './context-menu.scss'

/** Параметры контекстного меню. */
export interface ContextMenuProps {
	/** Элементы меню. */
	items: MenuProps['items']

	/** Таргет контекстного меню. */
	target: HTMLElement | null

	/** Событие закрытия меню. */
	onClose?(): void
}

/** Позиция меню. */
interface Position {
	x: number
	y: number
}

/** Контекстное меню. */
export function ContextMenu({ items, target, onClose }: ContextMenuProps) {
	const [isShow, setIsShow] = useState(false)
	const [position, setPosition] = useState<Position>({ x: 50, y: 50 })

	useEffect(() => {
		if (!target) {
			return
		}

		function handleContextMenu(event: MouseEvent) {
			event.preventDefault()
			event.stopPropagation()

			setPosition({ x: event.clientX, y: event.clientY })
			setIsShow(true)
		}

		target.addEventListener('contextmenu', handleContextMenu)

		return () => target.removeEventListener('contextmenu', handleContextMenu)
	}, [target])

	function hide(event?: React.MouseEvent) {
		event?.stopPropagation()
		setIsShow(false)
		onClose?.()
	}

	return isShow
		? (
			<div className="context" onClick={hide}>
				<div onClick={event => event.stopPropagation()}>
					<Menu
						className="context-menu"
						selectable={false}
						items={items}
						style={{ top: position.y, left: position.x }}
						onClick={() => hide()}
					/>
				</div>
			</div>
		)
		: null
}
