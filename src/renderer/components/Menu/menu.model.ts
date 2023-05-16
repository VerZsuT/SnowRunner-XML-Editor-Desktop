import { BuildType } from '#g/enums'
import { ViewModel } from '#r/model-ctrlr'
import { config } from '#r/services'

class MenuModel extends ViewModel {
  readonly MOD_IO_LINK = 'https://snowrunner.mod.io/guides/snowrunner-xml-editor'
  readonly GITHUB_LINK = 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop'
  readonly YOUTUBE_LINK = 'https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2'

  readonly hasInitial = !config.initial
  readonly isDev = config.buildType === BuildType.dev
}

export default MenuModel