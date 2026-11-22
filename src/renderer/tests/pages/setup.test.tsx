import type { Config, ModEntry, PathsDto } from '@renderer/api/bindings'
import { registerConfig } from '@renderer/config'
import type { SetupClient } from '@renderer/pages/setup/client'
import { SetupPage } from '@renderer/pages/setup'
import { App as AntApp } from 'antd'
import { render, screen, within } from '@testing-library/react'
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

/** Запись мода. */
function mod(): ModEntry {
	return {
		fileName: 'my_mod.pak',
		name: 'my_mod',
		path: 'D:/mods/my_mod.pak',
		size: 1
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
		update: vi.fn(async () => 2),
		verify: vi.fn(async () => 120),
		restore: vi.fn(),
		mods: vi.fn(async () => []),
		addMod: vi.fn(async () => []),
		removeMod: vi.fn(async () => []),
		syncMods: vi.fn(async () => []),
		switchMode: vi.fn(async (portable: boolean) => ({
			mode: portable ? 'portable' as const : 'installed' as const,
			dataRoot: 'C:/data',
			copied: 2
		})),
		restart: vi.fn(async () => {}),
		reload: vi.fn()
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

	it('сохраняет переключатель проверки обновлений', async () => {
		const fake = client()

		render(
			<AntApp>
				<SetupPage client={fake} onBack={() => {}} />
			</AntApp>
		)

		const switches = await screen.findAllByRole('switch')

		await userEvent.click(switches[3])

		expect(fake.saveConfig).toHaveBeenCalledWith(expect.objectContaining({ checkUpdates: false }))
	})

	it('показывает моды и убирает их из списка', async () => {
		const fake = client()

		fake.mods = vi.fn(async () => [mod()])
		fake.removeMod = vi.fn(async () => [])

		render(
			<AntApp>
				<SetupPage client={fake} onBack={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('my_mod')).toBeInTheDocument()

		await userEvent.click(screen.getByTitle('Убрать мод из списка'))

		expect(fake.removeMod).toHaveBeenCalledWith('my_mod')
	})

	it('сохраняет язык интерфейса и перезагружает экран', async () => {
		const fake = client()

		render(
			<AntApp>
				<SetupPage client={fake} onBack={() => {}} />
			</AntApp>
		)

		await userEvent.click(await screen.findByRole('combobox'))

		await userEvent.click(await screen.findByTitle('English'))

		expect(fake.saveConfig).toHaveBeenCalledWith(expect.objectContaining({ lang: 'EN' }))
		expect(fake.reload).toHaveBeenCalled()
	})

	it('переключает режим хранения данных и перезапускает программу', async () => {
		const fake = client()

		render(
			<AntApp>
				<SetupPage client={fake} onBack={() => {}} />
			</AntApp>
		)

		const switches = await screen.findAllByRole('switch')

		await userEvent.click(switches[2])

		const dialog = await screen.findByRole('dialog')

		await userEvent.click(within(dialog).getByRole('button', { name: /Портативн/ }))

		expect(fake.switchMode).toHaveBeenCalledWith(true)

		await userEvent.click(await screen.findByRole('button', { name: 'Перезапустить' }))

		expect(fake.restart).toHaveBeenCalled()
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
