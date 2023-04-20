import type LanguageModel from './language.model'

import type { Lang } from '#g/enums'
import { handleLocale } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import { config } from '#r/services'

class LanguageController extends ViewController<{}, LanguageModel> {
  constructor(model: LanguageModel) {
    super({}, model)
    handleLocale()
  }

  changeLang = (newLang: Lang) => {
    config.lang = newLang
    this.model.currentLang = newLang
  }
}

export default LanguageController
