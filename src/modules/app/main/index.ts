import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, EDITED_TOKEN, FAVORITES_TOKEN, FILES_TOKEN, MODS_TOKEN, SIZES_TOKEN } from '@utilities/di/main/tokens'
import { app, BrowserWindow } from 'electron'

export * from '../constants'

/**
 * Приложение.
 * _main process_
 */
export class App {
	/**
	 * Сбросить на "заводскую" версию.
	 * @param noReload Отмена перезагрузки после завершения.
	 */
	async resetToDefaults(noReload = false) {
		const config = di.resolve(CONFIG_TOKEN)
		const edited = di.resolve(EDITED_TOKEN)
		const favorites = di.resolve(FAVORITES_TOKEN)
		const mods = di.resolve(MODS_TOKEN)
		const sizes = di.resolve(SIZES_TOKEN)

		await Promise.all([
			this.clearTemp(),
			config.reset(noReload),
			sizes.reset(),
			edited.reset(),
			favorites.reset(),
			mods.reset()
		])

		this.reload()
	}

	/** Очистить папку для временных файлов программы. */
	async clearTemp() {
		const files = di.resolve(FILES_TOKEN)
		const dirs = di.resolve(DIRS_TOKEN)

		await files.backupInitial.remove()
		await dirs.mainTemp.clear()
		await dirs.modsTemp.clear()
		await dirs.updateTemp.clear()
	}

	/** Переключить DevTools. */
	toggleDevTools() {
		BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools()
	}

	/** Перезагрузить приложение. */
	reload() {
		app.relaunch()
		this.quit()
	}

	/** Закрыть приложение. */
	quit() {
		app.quit()
	}
}
