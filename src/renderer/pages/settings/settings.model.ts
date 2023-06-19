import { ViewModel, reactive } from '#r/model-ctrlr'
import { Config } from '#r/services'

export default class SettingsModel extends ViewModel {
  private readonly settings = Config.settings

  @reactive updates = this.settings.updates
  @reactive DLC = this.settings.DLC
  @reactive mods = this.settings.mods
  @reactive advancedMode = this.settings.advancedMode
}
