import { Spin } from '@renderer/components/spin'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('Spin', () => {
	it('рендерит спиннер без центрирования', () => {
		const { container } = render(<Spin />)

		expect(container.querySelector('.spin')).toBeInTheDocument()
		expect(container.querySelector('.ant-spin')).toBeInTheDocument()
		expect(container.querySelector('.spin-container')).not.toBeInTheDocument()
	})

	it('центрирует спиннер при center', () => {
		const { container } = render(<Spin center />)

		expect(container.querySelector('.spin-container')).toBeInTheDocument()
		expect(container.querySelector('.ant-spin')).toBeInTheDocument()
	})
})
