import type { MenuProps } from 'antd'
import { applyConfig, registerConfig } from '@/config'
import { Lang } from '@/utilities/localization'
import { MenuBar } from '@/components/menu-bar'
import type { MenuBarClient, MenuBarHandlers } from '@/components/menu-bar'
import { buildMenuItems } from '@/components/menu-bar'
import { App as AntApp } from 'antd'
import { act, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** Путь к архиву игры. */
const ARCHIVE = 'D:/Games/SnowRunner/en_us/preload/paks/client/initial.pak'

/** Пункт меню с обработчиком. */
interface ClickableItem {
	key?: string
	disabled?: boolean
	onClick?(): void
	children?: MenuProps['items']
}

/** Ищет пункт меню по ключу на любом уровне вложенности. */
function findItem(items: MenuProps['items'], key: string): ClickableItem | undefined {
	for (const item of items ?? []) {
		if (!item) {
			continue
		}

		const node = item as ClickableItem

		if (node.key === key) {
			return node
		}

		const nested = node.children && findItem(node.children, key)

		if (nested) {
			return nested
		}
	}
}

/** Обработчики с подставными ответами. */
function handlers(overrides: Partial<MenuBarHandlers> = {}): MenuBarHandlers {
	return {
		openFolder: vi.fn(),
		run: vi.fn(),
		openLink: vi.fn(),
		quit: vi.fn(),
		reset: vi.fn(),
		uninstall: vi.fn(),
		onSettings: vi.fn(),
		onWhatsNew: vi.fn(),
		...overrides
	}
}

/** Клиент с подставными ответами. */
function client(overrides: Partial<MenuBarClient> = {}): MenuBarClient {
	return {
		paths: vi.fn(),
		backup: vi.fn(),
		unpack: vi.fn(),
		update: vi.fn(),
		restore: vi.fn(),
		openPath: vi.fn(),
		openUrl: vi.fn(),
		reset: vi.fn(),
		uninstall: vi.fn(),
		quit: vi.fn(),
		reload: vi.fn(),
		...overrides
	}
}

describe('buildMenuItems', () => {
	it('показывает верхние пункты, как в 1.4.0', () => {
		const items = buildMenuItems({ initialPath: ARCHIVE, busy: false }, handlers())

		expect(items?.map(item => item && 'label' in item ? item.label : null)).toEqual([
			'Файл',
			'Бэкап',
			'Настройки',
			'Помощь'
		])
	})

	it('блокирует работу с игрой без initial.pak', () => {
		const items = buildMenuItems({ initialPath: null, busy: false }, handlers())

		expect(findItem(items, 'openFiles')?.disabled).toBe(true)
		expect(findItem(items, 'updateArchive')?.disabled).toBe(true)
		expect(findItem(items, 'unpackArchive')?.disabled).toBe(true)
		expect(findItem(items, 'backup')?.disabled).toBe(true)
	})

	it('блокирует архив во время операции', () => {
		const items = buildMenuItems({ initialPath: ARCHIVE, busy: true }, handlers())

		expect(findItem(items, 'unpackArchive')?.disabled).toBe(true)
		expect(findItem(items, 'saveBackup')?.disabled).toBe(true)
	})

	it('рассылает действия по пунктам меню', () => {
		const fake = handlers()
		const items = buildMenuItems({ initialPath: ARCHIVE, busy: false }, fake)

		findItem(items, 'openFiles')?.onClick?.()
		findItem(items, 'openBackup')?.onClick?.()
		findItem(items, 'updateArchive')?.onClick?.()
		findItem(items, 'unpackArchive')?.onClick?.()
		findItem(items, 'saveBackup')?.onClick?.()
		findItem(items, 'restoreBackup')?.onClick?.()
		findItem(items, 'openSettings')?.onClick?.()
		findItem(items, 'resetSettings')?.onClick?.()
		findItem(items, 'uninstall')?.onClick?.()
		findItem(items, 'version')?.onClick?.()
		findItem(items, 'exit')?.onClick?.()

		expect(fake.openFolder).toHaveBeenNthCalledWith(1, 'files')
		expect(fake.openFolder).toHaveBeenNthCalledWith(2, 'backup')
		expect(fake.run).toHaveBeenCalledWith('update')
		expect(fake.run).toHaveBeenCalledWith('unpack')
		expect(fake.run).toHaveBeenCalledWith('backup')
		expect(fake.run).toHaveBeenCalledWith('restore')
		expect(fake.reset).toHaveBeenCalledTimes(1)
		expect(fake.uninstall).toHaveBeenCalledTimes(1)
		expect(fake.onSettings).toHaveBeenCalledTimes(1)
		expect(fake.onWhatsNew).toHaveBeenCalledTimes(1)
		expect(fake.quit).toHaveBeenCalledTimes(1)
	})

	it('открывает ссылки в меню помощи', () => {
		const fake = handlers()
		const items = buildMenuItems({ initialPath: ARCHIVE, busy: false }, fake)

		findItem(items, 'github')?.onClick?.()

		expect(fake.openLink).toHaveBeenCalledWith('https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop')
	})
})

describe('MenuBar', () => {
	beforeEach(() => {
		registerConfig({ initialPath: ARCHIVE })
	})

	it('переводит пункты вместе со сменой языка', () => {
		registerConfig({ lang: Lang.en, initialPath: ARCHIVE })
		render(
			<AntApp>
				<MenuBar client={client()} />
			</AntApp>
		)

		expect(screen.getByText('File')).toBeInTheDocument()
		expect(screen.getByText('Backup')).toBeInTheDocument()

		act(() => {
			applyConfig({ lang: Lang.de })
		})

		expect(screen.getByText('Datei')).toBeInTheDocument()
		expect(screen.getByText('Sicherung')).toBeInTheDocument()
	})

	it('рисует верхние пункты меню', () => {
		render(
			<AntApp>
				<MenuBar client={client()} />
			</AntApp>
		)

		for (const label of ['Файл', 'Бэкап', 'Настройки', 'Помощь']) {
			expect(screen.getByText(label)).toBeInTheDocument()
		}
	})
})
