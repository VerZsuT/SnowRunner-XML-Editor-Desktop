import { initMain, mainMethod } from '@bridge/renderer'
import type { App as MainApp } from './main'

export * from './constants'

/**
 * Приложение.
 * _renderer process_
 */
@initMain()
export class App {
	/**
	 * Сбросить на "заводскую" версию.
	 * @param noReload Отмена перезагрузки после завершения.
	 *
	 * {@link MainApp['resetToDefaults']|Перейти к методу}
	 */
	@mainMethod()
	resetToDefaults!: MainApp['resetToDefaults']

	/** Перезагрузить приложение. */
	@mainMethod()
	reload!: MainApp['reload']

	/** Закрыть приложение. */
	@mainMethod()
	quit!: MainApp['quit']

	/** Переключить devtools. */
	@mainMethod()
	toggleDevTools!: MainApp['toggleDevTools']
}
