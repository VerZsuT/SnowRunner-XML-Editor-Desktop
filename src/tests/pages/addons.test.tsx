import type * as AddonsApi from '@/api/addons'
import type { AddonFile } from '@/api/bindings'
import { registerConfig } from '@/config'
import { AddonsContent } from '@/pages/editor/components/addons'
import { App as AntApp } from 'antd'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({ loadAddons: vi.fn() }))

vi.mock('@/api/addons', async importOriginal => {
	const actual = await importOriginal<typeof AddonsApi>()

	return { ...actual, loadAddons: mocks.loadAddons }
})

/** Аддон с минимальными полями. */
function addon(name: string, installed: boolean): AddonFile {
	return {
		name,
		path: `D:\\data\\${name}.xml`,
		archiveName: `[media]\\classes\\trucks\\addons\\${name}.xml`,
		uiName: null,
		installType: installed ? 'FrameAddon' : null,
		tuning: false,
		installed,
		dlc: null,
		modName: null
	}
}

describe('AddonsContent', () => {
	beforeEach(() => {
		registerConfig()
		mocks.loadAddons.mockReset()
	})

	it('загружает аддоны трака и открывает установленный', async () => {
		const installed = addon('b', true)
		const onOpen = vi.fn(async () => {})

		mocks.loadAddons.mockResolvedValue([addon('a', false), installed])

		render(
			<AntApp>
				<AddonsContent
					truckName="ank_mk38"
					modName="my_mod"
					docs={[]}
					gameTexts={null}
					onOpen={onOpen}
					onRefresh={vi.fn()}
				/>
			</AntApp>
		)

		fireEvent.click(screen.getByRole('button', { name: 'Загрузить аддоны' }))

		await waitFor(() => expect(mocks.loadAddons).toHaveBeenCalledWith('ank_mk38', 'my_mod'))
		await waitFor(() => expect(onOpen).toHaveBeenCalledWith(installed))
	})
})
