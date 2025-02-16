import { app } from 'electron'
import { APP_NAME } from '/consts'

/** Базовый класс приложения. */
export default abstract class BaseApp {
  /** Готово ли к использованию. */
  readonly isReady: Promise<void>

  constructor() {
    this.isReady = this.init()
      .then(this.afterInit.bind(this))
      .catch(error => { throw new Error(error) })
  }

  /** Инициализировать приложение. */
  protected async init(): Promise<void> {
    this.handleExceptions()
    await this.checkMultipleInstances()
    this.handleQuit()
    this.disableNavigation()
    this.disableSecurityWarns()
    this.setName()
  }

  /** Действие после инициализации. */
  abstract afterInit(): void | Promise<void>

  /** Действие при повторном запуске. */
  abstract onMultipleInstance(): void | Promise<void>

  /** Действие перед закрытием. */
  abstract beforeQuit(): void | Promise<void>

  /** Действие при закрытии всех окон. */
  abstract onAllWindowsClosed(): void | Promise<void>

  /** Действие при ошибке. */
  abstract onError(error: Error): void | Promise<void>

  /** Проверить другие открытые экземпляры программы. */
  private async checkMultipleInstances() {
    if (!app.requestSingleInstanceLock()) {
      await this.onMultipleInstance()
    }
  }

  /** Установить название. */
  private setName() {
    app.setAppUserModelId(APP_NAME)
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
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
  }
}
