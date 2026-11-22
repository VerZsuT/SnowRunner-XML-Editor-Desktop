import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import type { ReactNode } from 'react'
import './header.scss'

/** Параметры заголовка. */
export interface HeaderProps {
	/** Текст заголовка. */
	text: string

	/** Показать кнопку "Назад". */
	withBack?: boolean

	/** Событие перехода назад. */
	onBack?(): void

	/** Дополнительное содержимое справа. */
	extra?: ReactNode

	/** Дополнительный класс. */
	className?: string
}

/** Заголовок страницы. */
export function Header({ text, withBack, onBack, extra, className }: HeaderProps) {
	return (
		<div className={['page-header', className].filter(Boolean).join(' ')}>
			<div className="page-header-left">
				{withBack && (
					<Button
						aria-label="back"
						className="page-header-back"
						type="text"
						icon={<ArrowLeftOutlined />}
						onClick={onBack}
					/>
				)}
				<h3 className="page-header-title">
					{text}
				</h3>
			</div>
			<div className="page-header-extra">
				{extra}
			</div>
		</div>
	)
}
