import { loadLocalization } from '@localization/main'
import { App, Checks, Config, Dlc, Edited, Favorites, Loading, Modifications, Page, ProgramWindow, QuitParams, Sizes, Texts, Windows } from '@modules/main'
import { app } from 'electron'
import BaseProgram from './base-program'
import localization from './localization'

import '@modules/epf/main'
import '@modules/updates/main'

const texts = loadLocalization(localization)

/** Программа. */
class Program extends BaseProgram {
  async afterInit() {
    await app.whenReady()
    await this.run()
  }

  /** Запуск программы. */
  async run(): Promise<void> {
    Loading.init(undefined, 6, true)
    await Windows.openWindow(ProgramWindow.general)
    await Loading.runRequiredStage(texts.checkAdminPrivileges, Checks.hasAdminPrivileges.bind(Checks))

    if (!await Loading.runStage(texts.checkInitial, () => !!Config.initialPath)) {
      Windows.generalWindow!.route(Page.setup)

      return Loading.hideLoading()
    }

    await Loading.runStage(texts.unpack, Checks.checkInitialChanges.bind(Checks))

    if (!await Loading.runStage(texts.checkFiles, Checks.hasAllPaths.bind(Checks))) {
      return App.resetToDefaults()
    }

    await Loading.runRequiredStage(texts.loadGameTexts, Texts.initFromInitial.bind(Texts))
    await Loading.runRequiredStage(texts.loadDlc, Dlc.init.bind(Dlc))
    await Loading.runRequiredStage(texts.loadMods, Modifications.procMods.bind(Modifications))
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
      Modifications.save()
    ])
  }

  onAllWindowsClosed() {
    app.quit()
  }

  onError(error: Error) {
    console.error(error.stack || error)
  }
}

new Program()
