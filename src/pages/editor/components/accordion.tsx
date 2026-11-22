import { createContext, useCallback, useContext, useState } from 'react'
import type { ReactNode } from 'react'

/** Состояние одного уровня аккордеона. */
export interface AccordionLevel {
	/** Открытый элемент уровня. */
	active: string | null

	/** Открывает элемент или закрывает уже открытый. */
	toggle(key: string): void
}

const AccordionLevelContext = createContext<AccordionLevel | null>(null)

/** Передаёт дочерним группам их уровень аккордеона. */
export function AccordionLevelProvider({
	active,
	toggle,
	children
}: AccordionLevel & { children?: ReactNode }) {
	return (
		<AccordionLevelContext.Provider value={{ active, toggle }}>
			{children}
		</AccordionLevelContext.Provider>
	)
}

/** Создаёт независимый уровень аккордеона для группы файлов. */
export function AccordionScope({ children }: { children?: ReactNode }) {
	const [active, setActive] = useState<string | null>(null)
	const toggle = useCallback((key: string) => {
		setActive(current => current === key ? null : key)
	}, [])

	return (
		<AccordionLevelProvider active={active} toggle={toggle}>
			{children}
		</AccordionLevelProvider>
	)
}

/** Таблица редактора: верхнеуровневые группы открываются по одной. */
export function EditorTable({ children }: { children?: ReactNode }) {
	const [active, setActive] = useState<string | null>(null)
	const toggle = useCallback((key: string) => {
		setActive(current => current === key ? null : key)
	}, [])

	return (
		<AccordionLevelProvider active={active} toggle={toggle}>
			<div className="editor-table">{children}</div>
		</AccordionLevelProvider>
	)
}

/** Уровень аккордеона, в который входит группа. */
export function useAccordionLevel() {
	return useContext(AccordionLevelContext)
}
