import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import './accordion.scss'

/** Значение контекста аккордеона. */
interface AccordionContextValue {
	/** Открытая группа. */
	activeKey?: string

	/** Открыть группу. */
	setActiveKey(key?: string): void
}

/** Контекст аккордеона. */
const AccordionContext = createContext<AccordionContextValue | null>(null)

/** Получить контекст аккордеона. */
export function useAccordion() {
	return useContext(AccordionContext)
}

/** Параметры аккордеона. */
export interface AccordionProps {
	/** Группы параметров. */
	children?: ReactNode
}

/** Аккордеон групп параметров. */
export function Accordion({ children }: AccordionProps) {
	const [activeKey, setActiveKey] = useState<string>()

	return (
		<AccordionContext.Provider value={{ activeKey, setActiveKey }}>
			<div className="ant-collapse accordion">
				{children}
			</div>
		</AccordionContext.Provider>
	)
}
