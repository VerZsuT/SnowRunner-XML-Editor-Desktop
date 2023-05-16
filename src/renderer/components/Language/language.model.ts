import type ILanguageProps from './language.props'

import { Lang } from '#g/enums'
import { ViewModel, reactive } from '#r/model-ctrlr'
import { config } from '#r/services'

class LanguageModel extends ViewModel<ILanguageProps> {
  readonly inSetup: boolean

  readonly options = Object.keys(Lang).map(lang => ({
    label: lang,
    value: lang
  }))

  @reactive currentLang = config.lang

  constructor(props: ILanguageProps) {
    super(props)
    this.inSetup = !!props.isSetup
  }
}

export default LanguageModel
