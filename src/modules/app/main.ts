import { providePublic, publicMethod } from '@bridge/main'
import Config from '@modules/data/config/main'
import Edited from '@modules/data/edited/main'
import Favorites from '@modules/data/favorites/main'
import Modifications from '@modules/data/modifications/main'
import Sizes from '@modules/data/sizes/main'
import { Dirs, Files } from '@modules/files/main'
import { BrowserWindow, app } from 'electron'

export * from './index'

/**
 * Приложение.
 * _main process_
 */
@providePublic()
class App {
	/**
	 * Сбросить на "заводскую" версию.
	 * @param noReload Отмена перезагрузки после завершения.
	 */
	@publicMethod()
	async resetToDefaults(noReload = false) {
		await Promise.all([
			this.clearTemp(),
			Config.reset(noReload),
			Sizes.reset(),
			Edited.reset(),
			Favorites.reset(),
			Modifications.reset()
		])

		this.reload()
	}

	/** Очистить папку для временных файлов программы. */
	async clearTemp() {
		await Files.backupInitial.remove()
		await Dirs.mainTemp.clear()
		await Dirs.modsTemp.clear()
		await Dirs.updateTemp.clear()
	}

	/** Переключить DevTools. */
	@publicMethod()
	toggleDevTools() {
		BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools()
	}

	/** Перезагрузить приложение. */
	@publicMethod()
	reload() {
		app.relaunch()
		this.quit()
	}

	/** Закрыть приложение. */
	@publicMethod()
	quit() {
		app.quit()
	}
}

/**
 * Приложение.
 * _main process_
 */
export default new App()
