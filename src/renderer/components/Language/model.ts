import type LanguageProps from './propsType'

import { Lang } from '#enums'
import { config } from '#services'

class LanguageModel {
  readonly inSetup: boolean

  readonly options = Object.keys(Lang).map(lang => ({
    label: lang,
    value: lang
  }))

  readonly currentLang = config.lang

  constructor(props: LanguageProps) {
    this.inSetup = !!props.isSetup
  }
}

export default LanguageModel
