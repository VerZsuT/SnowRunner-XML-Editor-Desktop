import { RightOutlined } from '@ant-design/icons'
import { ContextMenu } from '@/components/context-menu'
import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { GroupIcon } from '../icons'
import { groupIcon } from '../icons'
import { texts } from '../texts'
import { AccordionLevelProvider, useAccordionLevel } from './accordion'
import './group.scss'

/** Глубина вложенности групп. */
const DepthContext = createContext(0)

/** Регистрация сброса поля во всех группах-предках. */
type RegisterReset = (reset: () => void) => () => void

const ResetContext = createContext<RegisterReset | null>(null)

/** Регистрирует сброс поля в текущей и родительских группах. */
export function useGroupReset() {
	return useContext(ResetContext)
}

/** Параметры группы параметров. */
export interface GroupProps {
	/** Подпись группы. */
	label: string

	/** Содержимое группы. */
	children?: ReactNode

	/** Вложенная группа: выглядит частью общей рамки. */
	nested?: boolean

	/** Ключ верхнеуровневой группы в аккордеоне. */
	groupKey?: string

	/** Иконка группы. */
	icon?: GroupIcon
}

/**
 * Сворачиваемая группа параметров.
 *
 * Каждый уровень вложенности работает как аккордеон 1.4.0: открыт один элемент.
 */
export function Group({ label, children, nested = false, groupKey, icon }: GroupProps) {
	const depth = useContext(DepthContext)
	const parentLevel = useAccordionLevel()
	const registerParent = useContext(ResetContext)
	const generatedKey = useId()
	const isTop = depth === 0 && !nested && groupKey !== undefined && parentLevel !== null
	const isNested = nested || depth > 0
	const key = isTop ? groupKey : generatedKey
	const [localOpened, setLocalOpened] = useState(true)
	const [activeChild, setActiveChild] = useState<string | null>(null)
	const [target, setTarget] = useState<HTMLButtonElement | null>(null)
	const opened = parentLevel ? parentLevel.active === key : localOpened
	const [rendered, setRendered] = useState(opened)
	const [visible, setVisible] = useState(opened)
	const resets = useRef(new Set<() => void>())
	const iconSrc = icon ? groupIcon(icon) : ''

	useEffect(() => {
		if (opened) {
			// Тело должно попасть в DOM и отрисоваться закрытым до запуска перехода.
			// oxlint-disable-next-line react/set-state-in-effect
			setRendered(true)

			let inner = 0
			const outer = requestAnimationFrame(() => {
				inner = requestAnimationFrame(() => setVisible(true))
			})

			return () => {
				cancelAnimationFrame(outer)
				cancelAnimationFrame(inner)
			}
		}

		setVisible(false)

		// Содержимое остаётся в DOM, пока не закончится анимация высоты.
		const timer = setTimeout(() => setRendered(false), 240)

		return () => clearTimeout(timer)
	}, [opened])

	const register = useCallback<RegisterReset>(reset => {
		resets.current.add(reset)

		const unregisterParent = registerParent?.(reset)

		return () => {
			resets.current.delete(reset)
			unregisterParent?.()
		}
	}, [registerParent])

	const toggleChild = useCallback((childKey: string) => {
		setActiveChild(current => current === childKey ? null : childKey)
	}, [])

	function toggle() {
		if (parentLevel) {
			parentLevel.toggle(key)
		} else {
			setLocalOpened(value => !value)
		}
	}

	function resetGroup() {
		for (const reset of resets.current) {
			reset()
		}
	}

	return (
		<div className={[
			isNested ? 'editor-group editor-group-nested' : 'editor-group',
			opened ? 'is-open' : ''
		].filter(Boolean).join(' ')}>
			<ContextMenu
				target={target}
				items={[{
					key: 'reset-group',
					label: `${texts.reset} "${label}"`,
					onClick: resetGroup
				}]}
			/>
			<button
				ref={setTarget}
				type="button"
				className="editor-group-header"
				aria-label={label}
				aria-expanded={opened}
				onClick={toggle}
			>
				<RightOutlined className="editor-group-arrow" />
				<span className="editor-group-label">{label}</span>
				{iconSrc && <img className="editor-group-icon" src={iconSrc} alt="" draggable={false} />}
			</button>
			{rendered && (
				<AccordionLevelProvider active={activeChild} toggle={toggleChild}>
					<div
						className={`editor-group-body${visible ? ' is-visible' : ''}`}
						inert={!visible}
					>
						<ResetContext.Provider value={register}>
							<DepthContext.Provider value={depth + 1}>
								{/* Внутренняя обёртка без padding: только она сжимается до нуля. */}
								<div className="editor-group-body-inner">
									<div className="editor-group-content">{children}</div>
								</div>
							</DepthContext.Provider>
						</ResetContext.Provider>
					</div>
				</AccordionLevelProvider>
			)}
		</div>
	)
}
