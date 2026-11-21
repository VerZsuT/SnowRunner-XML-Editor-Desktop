import { BuildType } from '@modules/data/config/enums'
import type { IResettable } from '@src/types'
import { di } from '@utilities/di/container'
import { CONFIG_MANAGER_TOKEN, CONFIG_TOKEN, DIRS_TOKEN, EDITED_TOKEN, FAVORITES_TOKEN, MODS_TOKEN, SIZES_TOKEN } from '@utilities/di/main/tokens'
import { app, BrowserWindow } from 'electron'
import type { IMainApp } from '../types'

/** Приложение. [main] */
export class App implements IMainApp {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'App'
	get isDev(): boolean {
		const config = di.resolve(CONFIG_TOKEN)
		return config.buildType === BuildType.dev
	}

	async reset() {
		const config: IResettable = di.resolve(CONFIG_MANAGER_TOKEN)
		const edited: IResettable = di.resolve(EDITED_TOKEN)
		const favorites: IResettable = di.resolve(FAVORITES_TOKEN)
		const mods: IResettable = di.resolve(MODS_TOKEN)
		const sizes: IResettable = di.resolve(SIZES_TOKEN)

		const results = await Promise.allSettled([
			this.clearTemp(),
			config.reset(),
			sizes.reset(),
			edited.reset(),
			favorites.reset(),
			mods.reset()
		])

		for (const result of results) {
			if (result.status === 'rejected') {
				console.error(result.reason)
			}
		}

		this.reload()
	}

	async clearTemp() {
		const dirs = di.resolve(DIRS_TOKEN)

		await dirs.mainTemp.clear()
		await dirs.modsTemp.clear()
		await dirs.updateTemp.clear()
	}

	toggleDevTools() {
		BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools()
	}

	reload() {
		app.relaunch()
		this.quit()
	}

	quit() {
		app.quit()
	}
}
