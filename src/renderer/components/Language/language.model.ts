import type ILanguageProps from './language.props'

import { Lang } from '#g/enums'
import { ViewModel, reactive } from '#r/model-ctrlr'
import { Config } from '#r/services'

export default class LanguageModel extends ViewModel<ILanguageProps> {
  readonly inSetup: boolean

  readonly options = Object.keys(Lang).map(lang => ({
    label: lang,
    value: lang
  }))

  @reactive currentLang = Config.lang

  constructor(props: ILanguageProps) {
    super(props)
    this.inSetup = !!props.isSetup
  }
}
