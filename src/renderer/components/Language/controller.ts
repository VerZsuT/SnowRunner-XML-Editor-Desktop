import type { Lang } from '#enums'
import bridge from '#r-scripts/bridge'
import { config } from '#services'

class LanguageController {
  changeLang(newLang: Lang) {
    config.lang = newLang
    bridge.relaunchApp()
  }
}

export default LanguageController
