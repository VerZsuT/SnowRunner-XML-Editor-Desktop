import { app } from 'electron'
import { existsSync, renameSync, rmSync } from 'fs'
import { join } from 'path'

import archive from '#classes/archive'
import checks from '#classes/checks'
import config from '#classes/config'
import exitParams from '#classes/exitParams'
import hash from '#classes/hash'
import helpers from '#classes/helpers'
import paths from '#classes/paths'
import texts from '#classes/texts'
import windows from '#classes/windows'
import { APP_ID } from '#consts'
import { BuildType, ProgramWindow } from '#enums'
import { LOADING } from '#globalTexts/main'
import { windowsManager } from '#windows'

import '#classes/public'

class SnowRunnerXMLEditor {
  constructor() {
    this.checkMultipleInstances()
    this.setName()
    this.optimize()

    this.handleQuit()
    this.handleAllClosed()
    this.start()
  }

  private start(): void {
    if (config.buildType === BuildType.dev) {
      this.installDevtools()
    }
    else {
      app.whenReady().then(() => this.openProgram())
    }
  }

  private async openProgram(): Promise<void> {
    await windowsManager.open(ProgramWindow.Loading)
    const loading = windows.loading

    await loading?.showAndWait()
    loading?.setText(LOADING)

    if (!checks.hasAdminPrivileges()) return

    if (!config.initial) {
      await windowsManager.open(ProgramWindow.Setup)
      checks.checkUpdate()
      return
    }

    await checks.checkInitialChanges()

    if (checks.hasAllPaths()) {
      await Promise.all([
        texts.getFromGame(),
        this.initDLC(),
        this.initMods()
      ])
      await windowsManager.open(ProgramWindow.Main)
      checks.checkUpdate()
    }
    else {
      config.reset()
    }
  }

  private installDevtools(): void {
    app.whenReady()
      .then(() => import('electron-devtools-installer'))
      .then(({ default: installExtension, REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS }) => {
        installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS], {
          loadExtensionOptions: { allowFileAccess: true }
        }).then(() => this.openProgram())
      })
      .catch(e => console.error('Failed install extension:', e))
  }

  private checkMultipleInstances(): void {
    if (!app.requestSingleInstanceLock()) {
      app.quit()
      process.exit(102)
    }
  }

  private optimize(): void {
    app.disableHardwareAcceleration()
  }

  private setName(): void {
    app.setAppUserModelId(APP_ID)
  }

  private handleQuit(): void {
    app.on('before-quit', () => {
      exitParams.quit = true
      if (exitParams.saveConfig) {
        config.save()
      }

      if (existsSync(paths.updateRoot)) {
        rmSync(paths.root, { recursive: true })
        renameSync(paths.updateRoot, paths.root)
      }
    })
  }

  private handleAllClosed(): void {
    app.once('window-all-closed', () => app.exit())
  }

  /** Находит и инициализирует игровые DLC */
  private async initDLC(): Promise<void> {
    if (!config.settings.DLC) return

    config.dlc = helpers.findInDir(paths.dlc, true)
  }

  /** Инициализирует модификации, указанные в `config.json` */
  private async initMods(): Promise<void> {
    if (!config.settings.mods) return
    if (config.mods.length === 0) return

    let counter = config.mods.length

    function deleteFromList(name: string) {
      const modName = name.replace('.pak', '')
      delete config.mods.items[modName]
      --config.mods.length
      --counter
    }

    for (const modName in config.mods.items) {
      const mod = config.mods.items[modName]

      if (!existsSync(mod.path)) {
        deleteFromList(config.mods.items[modName].name)
        continue
      }
      else if (!checks.hasPermissions(mod.path)) {
        deleteFromList(config.mods.items[modName].name)
        continue
      }

      if (hash.getSize(mod.path) === config.sizes.mods[modName] && existsSync(paths.modsTemp[modName])) {
        --counter
      }
      else {
        await archive.unpackMod(mod.path)

        if (!existsSync(join(paths.modsTemp, modName, 'classes'))) {
          deleteFromList(config.mods.items[modName].name)
        }
        else {
          --counter
        }

        if (counter === 0) {
          texts.getFromMods()
          return
        }
      }
    }

    if (counter <= 0) {
      texts.getFromMods()
    }
  }
}

new SnowRunnerXMLEditor()
