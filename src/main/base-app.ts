import { app } from 'electron'
import { APP_NAME } from '/consts'

export default abstract class BaseApp {
  readonly isReady: Promise<void>

  constructor() {
    this.isReady = this.init()
      .then(this.afterInit.bind(this))
      .catch(error => { throw new Error(error) })
  }

  protected async init(): Promise<void> {
    this.handleExceptions()
    await this.checkMultipleInstances()
    this.handleQuit()
    this.disableNavigation()
    this.disableSecurityWarns()
    this.setName()
    this.optimize()
  }

  /** Действие после инициализации. */
  abstract afterInit(): void | Promise<void>

  /** Действие при повторном запуске. */
  abstract onMultipleInstance(): void | Promise<void>

  /** Действие перед закрытием. */
  abstract beforeQuit(event: Electron.Event): void | Promise<void>

  /** Действие при закрытии всех окон. */
  abstract onAllWindowsClosed(): void | Promise<void>

  /** Действие при ошибке. */
  abstract onError(error: Error): void | Promise<void>

  /** Проверка других открытых экземпляров программы */
  private async checkMultipleInstances() {
    if (!app.requestSingleInstanceLock()) {
      await this.onMultipleInstance()
    }
  }

  /** Оптимизация */
  private optimize() {
    app.disableHardwareAcceleration()
  }

  /** Изменение стандартного названия */
  private setName() {
    app.setAppUserModelId(APP_NAME)
  }
  

  /** Установка действия при закрытии приложения */
  private handleQuit() {
    app.on('before-quit', event => {
      event.preventDefault()

      const result = this.beforeQuit(event)

      if (!result) {
        return
      }

      void result.then(() => app.exit())
    })
    app.on('window-all-closed', () => this.onAllWindowsClosed())
  }

  /** Установка действия при исключениях */
  private handleExceptions() {
    process.on('uncaughtException', error => this.onError(error))
    process.on('unhandledRejection', error => this.onError(error as any))
  }

  /** Отключение возможности навигации */
  private disableNavigation() {
    app.on('web-contents-created', (_, contents) => {
      contents.on('will-navigate', event => {
        event.preventDefault()
      })
    })
  }

  /** Отключение предупреждений Electron */
  private disableSecurityWarns() {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
  }
}
