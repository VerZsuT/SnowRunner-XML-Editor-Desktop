import type { Config } from '@/api/bindings'
import { registerConfig } from '@/config'
import type { WelcomeClient } from '@/pages/welcome/client'
import { WelcomePage } from '@/pages/welcome'
import { open } from '@tauri-apps/plugin-dialog'
import { App as AntApp } from 'antd'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tauri-apps/plugin-dialog', () => ({
	open: vi.fn()
}))

/** Путь к архиву игры. */
const ARCHIVE = 'D:/Games/SnowRunner/en_us/preload/paks/client/initial.pak'

/** Конфигурация с пустым путём к архиву. */
function config(overrides: Partial<Config> = {}): Config {
	return {
		version: '2.0.0',
		lang: 'RU',
		buildType: 'prod',
		initialPath: null,
		checkUpdates: true,
		useMods: true,
		openWhatsNew: false,
		advancedMode: false,
		optimizeUnpack: true,
		...overrides
	}
}

/** Клиент с подставными ответами. */
function client(overrides: Partial<WelcomeClient> = {}): WelcomeClient {
	return {
		config: vi.fn(async () => config()),
		saveConfig: vi.fn(async (next: Config) => next),
		findInitial: vi.fn(async () => ARCHIVE),
		backup: vi.fn(async () => 'C:/data/backups/initial.pak'),
		unpack: vi.fn(async () => 120),
		reload: vi.fn(),
		...overrides
	}
}

/** Отрисовка экрана в контексте antd. */
function draw(fake: WelcomeClient) {
	render(
		<AntApp>
			<WelcomePage client={fake} />
		</AntApp>
	)
}

/** Переход ко второму шагу. */
async function toGameData() {
	await userEvent.click(await screen.findByRole('button', { name: 'Дальше' }))
}

describe('WelcomePage', () => {
	beforeEach(() => {
		registerConfig()
		vi.mocked(open).mockReset()
	})

	it('показывает шаги настройки и сохраняет выбранный язык', async () => {
		const fake = client()

		draw(fake)

		expect(await screen.findByText('Язык программы')).toBeInTheDocument()
		expect(screen.getByText('Игровые данные')).toBeInTheDocument()

		await userEvent.click(screen.getByText('EN'))

		expect(fake.saveConfig).toHaveBeenCalledWith(expect.objectContaining({ lang: 'EN' }))
	})

	it('переходит к выбору игровых данных', async () => {
		draw(client())
		await toGameData()

		expect(screen.getByRole('button', { name: /Папка с игрой/ })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /initial\.pak/ })).toBeInTheDocument()
	})

	it('сохраняет архив, делает бэкап и распаковывает', async () => {
		const fake = client()

		vi.mocked(open).mockResolvedValue(ARCHIVE)
		draw(fake)
		await toGameData()
		await userEvent.click(screen.getByRole('button', { name: /initial\.pak/ }))

		await waitFor(() => expect(fake.saveConfig).toHaveBeenCalledWith(
			expect.objectContaining({ initialPath: ARCHIVE, openWhatsNew: false })
		))
		expect(fake.backup).toHaveBeenCalledWith(ARCHIVE)
		expect(fake.unpack).toHaveBeenCalledWith(ARCHIVE)
		await waitFor(() => expect(fake.reload).toHaveBeenCalled(), { timeout: 3000 })
	})

	it('ищет архив в выбранной папке игры', async () => {
		const fake = client()

		vi.mocked(open).mockResolvedValue('D:/Games/SnowRunner')
		draw(fake)
		await toGameData()
		await userEvent.click(screen.getByRole('button', { name: /Папка с игрой/ }))

		await waitFor(() => expect(fake.findInitial).toHaveBeenCalledWith('D:/Games/SnowRunner'))
		expect(fake.unpack).toHaveBeenCalledWith(ARCHIVE)
	})

	it('сообщает, если в папке нет архива', async () => {
		const fake = client({ findInitial: vi.fn(async () => null) })

		vi.mocked(open).mockResolvedValue('D:/Games/Empty')
		draw(fake)
		await toGameData()
		await userEvent.click(screen.getByRole('button', { name: /Папка с игрой/ }))

		expect(await screen.findByText(/нет initial\.pak/)).toBeInTheDocument()
		expect(fake.unpack).not.toHaveBeenCalled()
	})

	it('начинает с игровых данных, если путь уже указан', async () => {
		registerConfig({ initialPath: ARCHIVE })
		draw(client())

		expect(await screen.findByRole('button', { name: /Папка с игрой/ })).toBeInTheDocument()
	})
})
