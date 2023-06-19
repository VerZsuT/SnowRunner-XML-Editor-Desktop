import type SettingsModel from './settings.model'

import { ProgramWindow } from '#g/enums'
import { handleIPC, handleLocale, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import Bridge from '#r/scripts/bridge'
import { Config } from '#r/services'

export default class SettingsController extends ViewController<{}, SettingsModel> {
  constructor(model: SettingsModel) {
    super({}, model)

    windowReady(ProgramWindow.Settings)
    handleLocale()
    handleIPC()
  }

  saveSettings = (): void => {
    Config.settings = {
      ...Config.settings,
      updates: this.model.updates,
      DLC: this.model.DLC,
      mods: this.model.mods,
      advancedMode: this.model.advancedMode
    }
    Bridge.relaunchApp()
  }

  toggleUpdates = (): void => {
    this.model.updates = !this.model.updates
  }

  toggleDLC = (): void => {
    this.model.DLC = !this.model.DLC
  }

  toggleMods = (): void => {
    this.model.mods = !this.model.mods
  }

  toggleAdvanced = (): void => {
    this.model.advancedMode = !this.model.advancedMode
  }
}
