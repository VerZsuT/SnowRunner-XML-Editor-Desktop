import type { Config, PathsDto } from '@/api/bindings'
import type { SettingsClient } from '@/components/settings'
import { SettingsModal } from '@/components/settings'
import { applyConfig, registerConfig } from '@/config'
import { Lang } from '@/utilities/localization'
import { App as AntApp } from 'antd'
import { act, render, screen, waitFor } from '@testing-library/react'
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
		publicInfoUrl: 'https://example.com/version-info.json',
		updateUrl: 'https://example.com/releases'
	}
}

/** Конфигурация для отрисовки. */
function config(): Config {
	return {
		version: '2.0.0',
		lang: 'RU',
		buildType: 'prod',
		initialPath: 'C:/game/initial.pak',
		checkUpdates: true,
		useMods: true,
		openWhatsNew: false,
		advancedMode: false
	}
}

/** Клиент с подставными ответами. */
function client(overrides: Partial<SettingsClient> = {}): SettingsClient {
	return {
		config: vi.fn(async () => config()),
		saveConfig: vi.fn(async (next: Config) => next),
		paths: vi.fn(async () => paths()),
		switchMode: vi.fn(async (portable: boolean) => ({
			mode: portable ? 'portable' as const : 'installed' as const,
			dataRoot: 'C:/data',
			copied: 2
		})),
		restart: vi.fn(async () => {}),
		reload: vi.fn(),
		...overrides
	}
}

describe('SettingsModal', () => {
	beforeEach(() => {
		registerConfig()
	})

	it('показывает набор переключателей 1.4.0', async () => {
		render(
			<AntApp>
				<SettingsModal open onClose={() => {}} client={client()} />
			</AntApp>
		)

		expect(await screen.findByText('Язык программы')).toBeInTheDocument()

		for (const label of ['Обновлять программу', 'Редактировать модификации', 'Продвинутый режим']) {
			expect(screen.getByText(label)).toBeInTheDocument()
		}

		expect(screen.queryByText('Оптимизировать распаковку')).not.toBeInTheDocument()
		expect(screen.getAllByRole('switch')).toHaveLength(4)
	})

	it('сохраняет переключатель обновлений', async () => {
		const fake = client()

		render(
			<AntApp>
				<SettingsModal open onClose={() => {}} client={fake} />
			</AntApp>
		)

		await userEvent.click((await screen.findAllByRole('switch'))[0])

		expect(fake.saveConfig).toHaveBeenCalledWith(expect.objectContaining({ checkUpdates: false }))
	})

	it('не теряет первую правку при быстрых переключениях', async () => {
		let release!: () => void
		const firstSave = new Promise<void>(resolve => {
			release = resolve
		})
		const saves: Config[] = []
		const saveConfig = vi.fn(async (next: Config) => {
			saves.push(next)

			if (saves.length === 1) {
				await firstSave
			}

			return next
		})
		const fake = client({ saveConfig })

		render(
			<AntApp>
				<SettingsModal open onClose={() => {}} client={fake} />
			</AntApp>
		)

		const switches = await screen.findAllByRole('switch')

		await userEvent.click(switches[0])
		await userEvent.click(switches[1])

		release()

		await waitFor(() => expect(saves).toHaveLength(2))
		expect(saves[1]).toEqual(expect.objectContaining({ checkUpdates: false, useMods: false }))
	})

	it('сохраняет язык и перезагружает окно', async () => {
		const fake = client()

		render(
			<AntApp>
				<SettingsModal open onClose={() => {}} client={fake} />
			</AntApp>
		)

		await userEvent.click(await screen.findByRole('combobox'))
		await userEvent.click(await screen.findByTitle('English'))

		expect(fake.saveConfig).toHaveBeenCalledWith(expect.objectContaining({ lang: 'EN' }))
		expect(fake.reload).toHaveBeenCalled()
	})

	it('не перезагружает окно, если язык не сохранён', async () => {
		const fake = client({
			saveConfig: vi.fn(async () => {
				throw new Error('нет доступа к файлу')
			})
		})

		render(
			<AntApp>
				<SettingsModal open onClose={() => {}} client={fake} />
			</AntApp>
		)

		await userEvent.click(await screen.findByRole('combobox'))
		await userEvent.click(await screen.findByTitle('English'))

		await waitFor(() => expect(fake.saveConfig).toHaveBeenCalled())
		expect(fake.reload).not.toHaveBeenCalled()
	})

	it('закрывается кнопкой Ok', async () => {
		const onClose = vi.fn()

		render(
			<AntApp>
				<SettingsModal open onClose={onClose} client={client()} />
			</AntApp>
		)

		await userEvent.click(await screen.findByRole('button', { name: 'Ok' }))

		expect(onClose).toHaveBeenCalledTimes(1)
	})

	it('переключает портативный режим и перезапускает программу', async () => {
		const fake = client()

		render(
			<AntApp>
				<SettingsModal open onClose={() => {}} client={fake} />
			</AntApp>
		)

		await userEvent.click((await screen.findAllByRole('switch'))[3])
		await userEvent.click(await screen.findByRole('button', { name: 'Портативная сборка' }))

		expect(fake.switchMode).toHaveBeenCalledWith(true)

		await userEvent.click(await screen.findByRole('button', { name: 'Перезапустить' }))

		expect(fake.restart).toHaveBeenCalled()
	})

	it('переводит окно вместе со сменой языка', async () => {
		registerConfig({ lang: Lang.ru })

		render(
			<AntApp>
				<SettingsModal open onClose={() => {}} client={client()} />
			</AntApp>
		)

		expect(await screen.findByText('Продвинутый режим')).toBeInTheDocument()

		act(() => {
			applyConfig({ lang: Lang.de })
		})

		expect(screen.getByText('Erweiterter Modus')).toBeInTheDocument()
		expect(screen.queryByText('Продвинутый режим')).not.toBeInTheDocument()
	})
})
