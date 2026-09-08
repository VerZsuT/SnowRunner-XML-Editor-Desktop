import { di } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN, ENV_TOKEN } from '@utilities/di/main/tokens'
import { app } from 'electron'

/** Базовый класс программы. */
export abstract class BaseProgram {
	/** Инициализировать приложение. */
	async init() {
		this.handleExceptions()
		this.checkMultipleInstances()
		this.handleQuit()
		this.disableNavigation()
		this.disableSecurityWarns()
		this.setName()

		await this.afterInit()
	}

	/** Действие после инициализации. */
	protected abstract afterInit(): Promise<void>

	/** Действие при повторном запуске. */
	protected abstract onMultipleInstance(): void

	/** Действие перед закрытием. */
	protected abstract beforeQuit(): void | Promise<void>

	/** Действие при закрытии всех окон. */
	protected abstract onAllWindowsClosed(): void | Promise<void>

	/** Действие при ошибке. */
	protected abstract onError(error: Error): void | Promise<void>

	/** Проверить другие открытые экземпляры программы. */
	private checkMultipleInstances() {
		if (!app.requestSingleInstanceLock()) {
			this.onMultipleInstance()
		}
	}

	/** Установить название. */
	private setName() {
		const { NAME } = di.resolve(APP_CONSTANTS_TOKEN)
		app.setAppUserModelId(NAME)
	}


	/** Отследить закрытие приложения. */
	private handleQuit() {
		app.on('before-quit', event => {
			event.preventDefault()

			const result = this.beforeQuit()

			if (!result) {
				return
			}

			void result.then(() => app.exit())
		})
		app.on('window-all-closed', () => this.onAllWindowsClosed())
	}

	/** Обработать исключения. */
	private handleExceptions() {
		process.on('uncaughtException', error => this.onError(error))
		process.on('unhandledRejection', error => this.onError(error as any))
	}

	/** Отключить возможность навигации. */
	private disableNavigation() {
		app.on('web-contents-created', (_, contents) => {
			contents.on('will-navigate', event => {
				event.preventDefault()
			})
		})
	}

	/** Отключить предупреждения Electron. */
	private disableSecurityWarns() {
		const env = di.resolve(ENV_TOKEN)

		env.showSecurityWarnings = false
	}
}
