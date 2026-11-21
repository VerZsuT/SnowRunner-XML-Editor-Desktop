import { di } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN, ENV_TOKEN } from '@utilities/di/main/tokens'
import { app } from 'electron'

/** Базовый класс программы. */
export abstract class BaseProgram {
	/** Инициализировать приложение. */
	async init() {
		this.handleExceptions()
		this.handleQuit()
		this.disableNavigation()
		this.disableSecurityWarns()
		this.setName()

		if (!this.checkMultipleInstances()) {
			return
		}

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

	/**
	 * Проверить другие открытые экземпляры программы.
	 * @returns Можно ли продолжать запуск.
	 */
	private checkMultipleInstances() {
		if (app.requestSingleInstanceLock()) {
			return true
		}

		this.onMultipleInstance()

		return false
	}

	/** Установить название. */
	private setName() {
		const { NAME } = di.resolve(APP_CONSTANTS_TOKEN)
		app.setName(NAME)
		app.setAppUserModelId(NAME)
	}


	/** Отследить закрытие приложения. */
	private handleQuit() {
		let isQuitting = false

		app.on('before-quit', event => {
			// Предотвращаем закрытие один раз, чтобы успеть сохранить данные.
			if (isQuitting) {
				return
			}

			isQuitting = true
			event.preventDefault()

			void Promise.resolve()
				.then(() => this.beforeQuit())
				.catch(error => this.onError(this.toError(error)))
				.finally(() => app.exit())
		})
		app.on('window-all-closed', () => this.onAllWindowsClosed())
	}

	/** Обработать исключения. */
	private handleExceptions() {
		process.on('uncaughtException', error => this.onError(this.toError(error)))
		process.on('unhandledRejection', error => this.onError(this.toError(error)))
	}

	/** Отключить возможность навигации. */
	private disableNavigation() {
		app.on('web-contents-created', (_, contents) => {
			contents.on('will-navigate', event => {
				event.preventDefault()
			})
			contents.on('will-redirect', event => {
				event.preventDefault()
			})
			contents.on('will-attach-webview', event => {
				event.preventDefault()
			})
			contents.setWindowOpenHandler(() => ({ action: 'deny' }))
		})
	}

	/**
	 * Привести неизвестное значение к ошибке.
	 * @param error Значение.
	 * @returns Ошибка.
	 */
	private toError(error: unknown): Error {
		if (error instanceof Error) {
			return error
		}

		return new Error(typeof error === 'string'
			? error
			: `Unknown error: ${String(error)}`
		)
	}

	/** Отключить предупреждения Electron. */
	private disableSecurityWarns() {
		const env = di.resolve(ENV_TOKEN)

		env.showSecurityWarnings = false
	}
}
