import { ContextMenu } from '@renderer/components/context-menu'
import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

/** Демонстрационный таргет для контекстного меню. */
function ContextMenuDemo({ onClose }: { onClose?(): void }) {
	const [target, setTarget] = useState<HTMLDivElement | null>(null)

	return (
		<div>
			<div ref={setTarget} data-testid="target">target</div>
			<ContextMenu
				items={[{ key: 'action', label: 'Action' }]}
				target={target}
				onClose={onClose}
			/>
		</div>
	)
}

describe('ContextMenu', () => {
	it('открывается по contextmenu на таргете и закрывается кликом', () => {
		const onClose = vi.fn()

		render(<ContextMenuDemo onClose={onClose} />)

		expect(screen.queryByText('Action')).not.toBeInTheDocument()

		fireEvent.contextMenu(screen.getByTestId('target'), { clientX: 10, clientY: 20 })

		expect(screen.getByText('Action')).toBeInTheDocument()

		const overlay = document.querySelector('.context')

		expect(overlay).not.toBeNull()

		fireEvent.click(overlay!)

		expect(screen.queryByText('Action')).not.toBeInTheDocument()
		expect(onClose).toHaveBeenCalledTimes(1)
	})

	it('закрывается после клика по пункту меню', () => {
		const onClose = vi.fn()

		render(<ContextMenuDemo onClose={onClose} />)

		fireEvent.contextMenu(screen.getByTestId('target'))
		fireEvent.click(screen.getByText('Action'))

		expect(screen.queryByText('Action')).not.toBeInTheDocument()
		expect(onClose).toHaveBeenCalled()
	})
})
