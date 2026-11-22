import { applyConfig, registerConfig } from '@/config'
import { Lang } from '@/utilities/localization'
import { WhatsNew } from '@/components/whats-new'
import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('WhatsNew', () => {
	beforeEach(() => {
		registerConfig({ lang: Lang.ru, version: '2.0.0' })
	})

	it('переводит сведения о версии вместе со сменой языка', () => {
		render(<WhatsNew open onOpenChange={vi.fn()} />)

		expect(screen.getByText('Изменения в версии 2.0.0')).toBeInTheDocument()

		act(() => {
			applyConfig({ lang: Lang.de })
		})

		expect(screen.getByText('Was ist neu in der Version 2.0.0')).toBeInTheDocument()
		expect(screen.getByText(/^Das Programm läuft jetzt auf Tauri/)).toBeInTheDocument()
	})
})
