import { Accordion } from '@renderer/pages/general/editor/components/accordion'
import { Group } from '@renderer/pages/general/editor/components/group/group'
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { registerConfig, registerImages } from '../helpers'

// oxc в Vitest 5 не опускает стандартные декораторы TS, поэтому модуль XML-парсера
// (нужный только `import.tsx`) подменяется заглушкой: аккордеон его не использует.
vi.mock('@modules/xml/renderer', () => ({
	TruckXML: { from: async () => undefined },
	TruckFileType: { trailer: 'Trailer' }
}))

/** Раскрыта ли группа с указанной подписью. */
function isExpanded(label: string) {
	const header = screen.getByText(label).closest('[role="button"]')

	return header?.getAttribute('aria-expanded') === 'true'
}

describe('Accordion + Group', () => {
	beforeEach(() => {
		registerConfig()
		registerImages()
	})

	it('раскрывает содержимое группы по клику на заголовок', () => {
		render(
			<Accordion>
				<Group key="engine" label="Engine">
					<span>engine content</span>
				</Group>
			</Accordion>
		)

		expect(isExpanded('Engine')).toBe(false)
		expect(screen.getByText('engine content')).not.toBeVisible()

		fireEvent.click(screen.getByText('Engine'))

		expect(isExpanded('Engine')).toBe(true)
		expect(screen.getByText('engine content')).toBeVisible()
	})

	it('рендерит вложенные группы через prop groups', () => {
		render(
			<Accordion>
				<Group
					key="parent"
					label="Parent"
					groups={(
						<Group key="child" label="Child">
							<span>child content</span>
						</Group>
					)}
				>
					<span>parent content</span>
				</Group>
			</Accordion>
		)

		expect(isExpanded('Parent')).toBe(false)
		expect(isExpanded('Child')).toBe(false)

		fireEvent.click(screen.getByText('Parent'))

		expect(isExpanded('Parent')).toBe(true)
		expect(isExpanded('Child')).toBe(false)

		fireEvent.click(screen.getByText('Child'))

		expect(isExpanded('Child')).toBe(true)
		expect(screen.getByText('child content')).toBeVisible()
	})

	it('рендерит произвольных детей рядом с группами', () => {
		render(
			<Accordion>
				<span>plain child</span>
				<Group key="engine" label="Engine">
					<span>engine content</span>
				</Group>
			</Accordion>
		)

		expect(screen.getByText('plain child')).toBeInTheDocument()
		expect(screen.getByText('Engine')).toBeInTheDocument()
	})
})
