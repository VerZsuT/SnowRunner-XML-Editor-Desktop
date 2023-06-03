import { app } from 'electron'
import { existsSync, renameSync, rmSync } from 'fs'
import { join } from 'path'

import { APP_NAME } from '#g/consts'
import { ProgramWindow } from '#g/enums'
import $ from '#g/texts/main'
import { hasItems } from '#g/utils'
import { Archive, Checks, Config, ExitParams, Hash, Helpers, Paths, Texts, Windows } from '#m/modules'
import { WindowsManager } from '#m/windows'

import '#m/modules/RendererPublic'

class _App {
  static start(): void {
    app.whenReady().then(() => this.openProgram())
  }

  static async openProgram(): Promise<void> {
    await WindowsManager.open(ProgramWindow.Loading)
    const loading = Windows.loading

    await loading?.showAndWait()
    loading?.setText($.LOADING)

    if (!Checks.hasAdminPrivileges()) return

    if (!Config.initial) {
      await WindowsManager.open(ProgramWindow.Setup)
      Checks.checkUpdate()
      return
    }

    await Checks.checkInitialChanges()

    if (Checks.hasAllPaths()) {
      await Promise.all([
        Texts.getFromGame(),
        this.initDLC(),
        this.initMods()
      ])
      await WindowsManager.open(ProgramWindow.Main)
      Checks.checkUpdate()
    }
    else {
      Config.reset()
    }
  }

  static checkMultipleInstances(): void {
    if (!app.requestSingleInstanceLock()) {
      app.quit()
      process.exit(102)
    }
  }

  static optimize(): void {
    app.disableHardwareAcceleration()
  }

  static setName(): void {
    app.setAppUserModelId(APP_NAME)
  }

  static handleQuit(): void {
    app.on('before-quit', () => {
      ExitParams.quit = true
      if (ExitParams.saveConfig) {
        Config.save()
      }

      if (existsSync(Paths.updateRoot)) {
        rmSync(Paths.root, { recursive: true })
        renameSync(Paths.updateRoot, Paths.root)
      }
    })
  }

  static handleAllClosed(): void {
    app.once('window-all-closed', () => app.exit())
  }

  /** Находит и инициализирует игровые DLC */
  static async initDLC(): Promise<void> {
    if (!Config.settings.DLC) return

    Config.dlc = Helpers.findInDir(Paths.dlc, true)
  }

  /** Инициализирует модификации, указанные в `config.json` */
  static async initMods(): Promise<void> {
    if (!Config.settings.mods) return
    if (!hasItems(Config.mods)) return

    let counter = Config.mods.length

    function deleteFromList(name: string) {
      const modName = name.replace('.pak', '')
      delete Config.mods.items[modName]
      --Config.mods.length
      --counter
    }

    for (const modName in Config.mods.items) {
      const mod = Config.mods.items[modName]

      if (!existsSync(mod.path)) {
        deleteFromList(Config.mods.items[modName].name)
        continue
      }
      else if (!Checks.hasPermissions(mod.path)) {
        deleteFromList(Config.mods.items[modName].name)
        continue
      }

      if (Hash.getSize(mod.path) === Config.sizes.mods[modName] && existsSync(Paths.modsTemp[modName])) {
        --counter
      }
      else {
        await Archive.unpackMod(mod.path)

        if (!existsSync(join(Paths.modsTemp, modName, 'classes'))) {
          deleteFromList(Config.mods.items[modName].name)
        }
        else {
          --counter
        }

        if (counter === 0) {
          Texts.getFromMods()
          return
        }
      }
    }

    if (counter <= 0) {
      Texts.getFromMods()
    }
  }

  static {
    this.checkMultipleInstances()
    this.setName()
    this.optimize()

    this.handleQuit()
    this.handleAllClosed()
    this.start()
  }
}
