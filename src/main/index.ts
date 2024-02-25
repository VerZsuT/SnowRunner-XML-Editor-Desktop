import { app } from 'electron'

import { APP_NAME } from '/consts'
import { Checks, Config, DLCs, Edited, ExitParams, Favorites, Mods, ProgramWindow, Sizes, Texts, Windows } from '/mods/main'

import '/mods/epf/main'
import '/mods/updates/main'

/** Статический класс программы */
class App {
  /** Инициализация программы */
  async init() {
    this.handleExceptions()
    this.handleQuit()
    this.disableNavigation()
    this.disableSecurityWarns()

    this.checkMultipleInstances()
    this.setName()
    this.optimize()
    await this.start()
  }

  /** Запуск */
  async start() {
    await app.whenReady()
    await this.openProgram()
  }

  /** Запуск программы */
  async openProgram() {
    await Windows.openWindow(ProgramWindow.loading)

    if (!await Checks.hasAdminPrivileges()) return

    if (!Config.initialPath) {
      await Windows.openWindow(ProgramWindow.setup)
      Checks.checkUpdate()
      return
    }

    await Checks.checkInitialChanges()

    if (!await Checks.hasAllPaths()) {
      await Config.reset()
      return
    }

    await Promise.all([
      Texts.initFromInitial(),
      DLCs.init(),
      Mods.procMods()
    ])
    await Windows.openWindow(ProgramWindow.main)
    Checks.checkUpdate()
  }

  /** Проверка других открытых экземпляров программы */
  checkMultipleInstances() {
    if (!app.requestSingleInstanceLock()) {
      app.quit()
      process.exit(102)
    }
  }

  /** Оптимизация */
  optimize() {
    app.disableHardwareAcceleration()
  }

  /** Изменение стандартного названия */
  setName() {
    app.setAppUserModelId(APP_NAME)
  }

  /** Установка действия при закрытии приложения */
  handleQuit() {
    app.once('before-quit', async event => {
      event.preventDefault()
      if (ExitParams.saveJSONs) {
        await Promise.all([
          Config.save(),
          Edited.save(),
          Sizes.save(),
          Favorites.save(),
          Mods.save()
        ])
      }
      app.quit()
    })
    app.once('window-all-closed', app.exit)
  }

  /** Установка действия при исплючениях */
  handleExceptions() {
    function onError(error: Error) {
      console.log(error.stack || error)
      throw new Error(error.stack || String(error))
    }
    process.once('uncaughtException', onError)
    process.once('unhandledRejection', onError)
  }

  /** Отключение возможности навигации */
  disableNavigation() {
    app.on('web-contents-created', (_, contents) => {
      contents.on('will-navigate', event => {
        event.preventDefault()
      })
    })
  }

  disableSecurityWarns() {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
  }
}

new App().init().catch(error => { throw new Error(error) })
