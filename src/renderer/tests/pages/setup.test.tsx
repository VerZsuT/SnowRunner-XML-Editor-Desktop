import type { Config, PathsDto } from '@renderer/api/bindings'
import { registerConfig } from '@renderer/config'
import type { SetupClient } from '@renderer/pages/setup/client'
import { SetupPage } from '@renderer/pages/setup'
import { App as AntApp } from 'antd'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** Пути программы для отрисовки. */
function paths(): PathsDto {
	return {
		root: 'C:/app',
		dataRoot: 'C:/data',
		mode: 'installed',
		classes: 'C:/data/mainTemp/[media]/classes',
		mainTemp: 'C:/data/mainTemp',
		backupFolder: 'C:/data/backups',
		backupInitial: 'C:/data/backups/initial.pak',
		backupInitialData: 'C:/data/backups/previous_initial',
		modsTemp: 'C:/data/modsTemp',
		templates: 'C:/data/mainTemp/[media]/_templates',
		dlc: 'C:/data/mainTemp/[media]/_dlc',
		strings: 'C:/data/mainTemp/[strings]',
		jsons: 'C:/data/jsons',
		config: 'C:/data/jsons/config.json',
		edited: 'C:/data/jsons/edited.json',
		favorites: 'C:/data/jsons/favorites.json',
		mods: 'C:/data/jsons/mods.json',
		sizes: 'C:/data/jsons/sizes.json',
		texts: 'C:/data/jsons/game-texts.json',
		exported: 'C:/data/jsons/exported.json',
		publicInfoUrl: 'https://example.com/version-info.json',
		downloadPageUrl: 'https://example.com/download.html',
		updateUrl: 'https://example.com/releases'
	}
}

/** Конфигурация с выбранным архивом. */
function config(): Config {
	return {
		version: '1.4.0',
		lang: 'RU',
		buildType: 'dev',
		initialPath: 'C:/game/initial.pak',
		checkUpdates: true,
		useMods: true,
		openWhatsNew: false,
		advancedMode: false,
		optimizeUnpack: true
	}
}

/** Клиент с подставными ответами. */
function client(): SetupClient {
	return {
		paths: vi.fn(async () => paths()),
		config: vi.fn(async () => config()),
		saveConfig: vi.fn(async (next: Config) => next),
		unpack: vi.fn(async () => 12),
		backup: vi.fn(async () => 'C:/data/backups/initial.pak'),
		verify: vi.fn(async () => 120),
		restore: vi.fn()
	}
}

describe('SetupPage', () => {
	beforeEach(() => {
		registerConfig()
	})

	it('показывает пути и выбранный архив', async () => {
		render(
			<AntApp>
				<SetupPage client={client()} onBack={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('C:/data')).toBeInTheDocument()
		expect(screen.getByDisplayValue('C:/game/initial.pak')).toBeInTheDocument()
	})

	it('сохраняет переключатель модов', async () => {
		const fake = client()

		render(
			<AntApp>
				<SetupPage client={fake} onBack={() => {}} />
			</AntApp>
		)

		const [mods] = await screen.findAllByRole('switch')

		await userEvent.click(mods)

		expect(fake.saveConfig).toHaveBeenCalledWith(expect.objectContaining({ useMods: false }))
	})

	it('делает бэкап выбранного архива', async () => {
		const fake = client()

		render(
			<AntApp>
				<SetupPage client={fake} onBack={() => {}} />
			</AntApp>
		)

		await userEvent.click(await screen.findByRole('button', { name: 'Бэкап' }))

		expect(fake.backup).toHaveBeenCalledWith('C:/game/initial.pak')
	})
})
