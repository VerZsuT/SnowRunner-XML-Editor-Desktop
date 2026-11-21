import { useKey } from '@renderer/utilities/use-key'
import { fireEvent, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('useKey', () => {
	it('вызывает обработчик и снимает его при размонтировании', () => {
		const handler = vi.fn()
		const { unmount } = renderHook(() => useKey('KeyA', handler))

		fireEvent.keyPress(document, { code: 'KeyA', key: 'a' })
		expect(handler).toHaveBeenCalledTimes(1)

		unmount()

		fireEvent.keyPress(document, { code: 'KeyA', key: 'a' })
		expect(handler).toHaveBeenCalledTimes(1)
	})

	it('не реагирует на другую клавишу', () => {
		const handler = vi.fn()

		renderHook(() => useKey('KeyA', handler))

		fireEvent.keyPress(document, { code: 'KeyB', key: 'b' })

		expect(handler).not.toHaveBeenCalled()
	})

	it('учитывает ctrl и shift', () => {
		const handler = vi.fn()

		renderHook(() => useKey({ key: 'KeyS', ctrlKey: true, shiftKey: true }, handler))

		fireEvent.keyPress(document, { code: 'KeyS', key: 's' })
		expect(handler).not.toHaveBeenCalled()

		fireEvent.keyPress(document, { code: 'KeyS', key: 's', ctrlKey: true })
		expect(handler).not.toHaveBeenCalled()

		fireEvent.keyPress(document, { code: 'KeyS', key: 's', ctrlKey: true, shiftKey: true })
		expect(handler).toHaveBeenCalledTimes(1)
	})

	it('для Escape слушает keydown и отменяет поведение по умолчанию', () => {
		const handler = vi.fn()

		renderHook(() => useKey({ key: 'Escape', prevent: true }, handler))

		const event = new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape', cancelable: true })

		document.dispatchEvent(event)

		expect(handler).toHaveBeenCalledTimes(1)
		expect(event.defaultPrevented).toBe(true)
	})
})
