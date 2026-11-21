import { Header } from '@renderer/components/header'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('Header', () => {
	it('рендерит заголовок и дополнительное содержимое', () => {
		render(<Header text="SnowRunner" extra={<span>extra</span>} />)

		expect(screen.getByText('SnowRunner')).toBeInTheDocument()
		expect(screen.getByText('extra')).toBeInTheDocument()
		expect(screen.queryByRole('button', { name: 'back' })).not.toBeInTheDocument()
	})

	it('показывает кнопку "Назад" и вызывает onBack', () => {
		const onBack = vi.fn()

		render(<Header text="SnowRunner" withBack onBack={onBack} />)

		fireEvent.click(screen.getByRole('button', { name: 'back' }))

		expect(onBack).toHaveBeenCalledTimes(1)
	})
})
