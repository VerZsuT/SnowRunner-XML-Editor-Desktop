// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'

vi.mock('electron', () => ({ app: {}, BrowserWindow: class {} }))
vi.mock('emr-bridge/main', () => ({
	emitEvent: () => {},
	on: () => () => {},
	publishFunction: () => {},
	publishVariable: () => {}
}))

import { Config } from '@modules/data/config/main'
import { Edited } from '@modules/data/edited/main'
import { Favorites } from '@modules/data/favorites/main'
import { Mods } from '@modules/data/modifications/main'
import { Dlc } from '@modules/dlcs/main'
import { Loading } from '@modules/loading/main'

describe('pubName публикуемых сущностей', () => {
	it('совпадает с именами моста', () => {
		expect({
			config: Config.pubName,
			edited: Edited.pubName,
			favorites: Favorites.pubName,
			mods: Mods.pubName,
			dlc: Dlc.pubName,
			loading: Loading.pubName
		}).toEqual({
			config: 'Config',
			edited: 'Edited',
			favorites: 'Favorites',
			mods: 'Mods',
			dlc: 'Dlc',
			loading: 'Loading'
		})
	})
})
