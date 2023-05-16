import { ViewModel, reactive } from '#r/model-ctrlr'
import { config } from '#r/services'

const { settings } = config

class SettingsModel extends ViewModel {
  @reactive updates = settings.updates
  @reactive DLC = settings.DLC
  @reactive mods = settings.mods
  @reactive advancedMode = settings.advancedMode
}

export default SettingsModel
