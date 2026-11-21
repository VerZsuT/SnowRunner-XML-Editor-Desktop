import { ErrorBoundary } from '@renderer/components/error-boundary'
import { render, screen } from '@testing-library/react'
import { Component, type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { registerConfig } from '../helpers'

/** Компонент, падающий при рендере. */
class Broken extends Component {
	render(): ReactNode {
		throw new Error('render failure')
	}
}

beforeEach(() => {
	vi.spyOn(console, 'error').mockImplementation(() => {})
	registerConfig()
})

describe('ErrorBoundary', () => {
	it('показывает текст ошибки и кнопку перезапуска', () => {
		render(
			<ErrorBoundary>
				<Broken />
			</ErrorBoundary>
		)

		expect(screen.getByText('Something went wrong')).toBeInTheDocument()
		expect(screen.getByText('render failure')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Restart window' })).toBeInTheDocument()
	})

	it('рендерит дочерние элементы без ошибок', () => {
		render(
			<ErrorBoundary>
				<div>content</div>
			</ErrorBoundary>
		)

		expect(screen.getByText('content')).toBeInTheDocument()
	})
})
