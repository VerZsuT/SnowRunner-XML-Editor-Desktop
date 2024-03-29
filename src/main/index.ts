import { app } from 'electron'

import { APP_NAME } from '/consts'
import { Checks, Config, DLCs, Edited, Favorites, Mods, ProgramWindow, QuitParams, Sizes, Texts, Windows } from '/mods/main'

import '/mods/epf/main'
import '/mods/updates/main'

/** Статический класс программы */
class App {
  /** Инициализация программы */
  async init() {
    this.handleExceptions()
    this.checkMultipleInstances()
    this.handleQuit()
    this.disableNavigation()
    this.disableSecurityWarns()

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
      if (QuitParams.saveJSONs) {
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

  /** Установка действия при исключениях */
  handleExceptions() {
    function onError(error: Error) {
      console.error(error.stack || error)
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

  /** Отключение предупреждений Electron */
  disableSecurityWarns() {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
  }
}

new App().init()
  .catch(error => { throw new Error(error) })
