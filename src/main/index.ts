import { app } from 'electron'
import BaseApp from './base-app'
import { Checks, Config, Dlc, Edited, Favorites, Loading, Mods, Page, ProgramWindow, QuitParams, Sizes, Texts, Windows } from '/mods/main'

import texts from './texts'
import '/mods/epf/main'
import '/mods/updates/main'

/** Приложение. */
class App extends BaseApp {
  async afterInit() {
    await app.whenReady()
    await this.openProgram()
  }

  /** Запуск программы */
  async openProgram(): Promise<void> {
    Loading.init(undefined, 6, true)
    await Windows.openWindow(ProgramWindow.general)
    await Loading.requiredStage(texts.checkAdminPrivileges, Checks.hasAdminPrivileges.bind(Checks))

    if (!await Loading.stage(texts.checkInitial, () => !!Config.initialPath)) {
      Windows.generalWindow!.route(Page.setup)
      
      return Loading.hideLoading()
    }
    
    await Loading.stage(texts.unpack, Checks.checkInitialChanges.bind(Checks))

    if (!await Loading.stage(texts.checkFiles, Checks.hasAllPaths.bind(Checks))) {
      return Config.reset()
    }

    await Loading.requiredStage(texts.loadGameTexts, Texts.initFromInitial.bind(Texts))
    await Loading.requiredStage(texts.loadDlc, Dlc.init.bind(Dlc))
    await Loading.requiredStage(texts.loadMods, Mods.procMods.bind(Mods))
    Windows.generalWindow!.route(Page.lists)
  }

  onMultipleInstance() {
    app.exit()
    process.exit(102)
  }

  async beforeQuit() {
    if (!QuitParams.saveJSONs) {
      return
    }
    
    await Promise.all([
      Config.save(),
      Edited.save(),
      Sizes.save(),
      Favorites.save(),
      Mods.save()
    ])
  }

  onAllWindowsClosed() {
    app.quit()
  }

  onError(error: Error) {
    console.error(error.stack || error)
  }
}

new App()
