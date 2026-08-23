import { initMain, mainMethod } from '@bridge/renderer'
import type MainApp from './main'

export * from './index'

/**
 * Приложение.
 * _renderer process_
 */
@initMain()
class App {
	/**
	 * Сбросить на "заводскую" версию.
	 * @param noReload Отмена перезагрузки после завершения.
	 *
	 * {@link MainApp.resetToDefaults|Перейти к методу}
	 */
	@mainMethod()
	resetToDefaults!: typeof MainApp.resetToDefaults

	/** Перезагрузить приложение. */
	@mainMethod()
	reload!: typeof MainApp.reload

	/** Закрыть приложение. */
	@mainMethod()
	quit!: typeof MainApp.quit

	/** Переключить devtools. */
	@mainMethod()
	toggleDevTools!: typeof MainApp.toggleDevTools
}

/**
 * Приложение.
 * _renderer process_
 */
export default new App()
