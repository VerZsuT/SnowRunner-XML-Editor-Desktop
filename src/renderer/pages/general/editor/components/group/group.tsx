import { CaretRightOutlined } from '@ant-design/icons'
import { ContextMenu } from '@renderer/components/context-menu'
import { di } from '@utilities/di/container'
import { IMAGES_TOKEN } from '@utilities/di/renderer/tokens'
import type { MenuProps } from 'antd'
import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { EDITOR_LOCALIZATION as texts } from '../../localization'
import { emitReset, ResetProvider, useResetListener } from '../../utilities/reset'
import type { ResetBucket } from '../../utilities/reset'
import { Accordion, useAccordion } from '../accordion'
import { ActiveProvider } from '../utilities'

/** Параметры группы параметров. */
export interface GroupProps {
	/** Подпись группы. */
	label: string

	/** Путь к иконке группы. */
	icon?: string

	/** Параметры группы. */
	children?: ReactNode

	/** Вложенные группы. */
	groups?: ReactNode
}

/** Группа параметров. */
export function Group({ label, icon, children, groups }: GroupProps) {
	const accordion = useAccordion()
	const id = useId()
	const [bucket] = useState<ResetBucket>(() => new Set())
	const [target, setTarget] = useState<HTMLDivElement | null>(null)
	const isActive = accordion ? accordion.activeKey === id : true
	const images = di.resolve(IMAGES_TOKEN)

	useResetListener(() => emitReset(bucket))

	const contextItems: MenuProps['items'] = [{
		key: 'reset-group',
		label: `${texts.resetMenuItemLabel} "${label}"`,
		onClick: () => void emitReset(bucket)
	}]

	const content = (
		<ResetProvider bucket={bucket}>
			<ActiveProvider active={isActive}>
				{children}
				{groups
					? <Accordion>{groups}</Accordion>
					: null}
			</ActiveProvider>
		</ResetProvider>
	)

	if (!accordion) {
		return <div className="group">{content}</div>
	}

	function toggle() {
		accordion!.setActiveKey(isActive ? undefined : id)
	}

	return (
		<div className={`ant-collapse-item panel${isActive ? ' panel-active' : ''}`}>
			<div
				className="ant-collapse-header panel-header"
				role="button"
				aria-expanded={isActive}
				onClick={toggle}
			>
				<span className="panel-arrow">
					<CaretRightOutlined rotate={isActive ? 90 : 0} />
				</span>
				<ContextMenu items={contextItems} target={target} />
				<div ref={setTarget} className="group-label">
					{label}
				</div>
				{icon && (
					<img className="panel-icon" alt="" src={images.getGroupIconSrc(icon)} />
				)}
			</div>
			<div
				className="ant-collapse-content panel-content"
				style={{ display: isActive ? undefined : 'none' }}
			>
				<div className="ant-collapse-content-box panel-content-box">
					{content}
				</div>
			</div>
		</div>
	)
}
