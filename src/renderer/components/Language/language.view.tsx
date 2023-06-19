import type { RadioChangeEvent } from 'antd'
import { Radio, Select } from 'antd'
import { afcMemo } from 'react-afc'

import LanguageController from './language.controller'
import LanguageModel from './language.model'
import type ILanguageProps from './language.props'

import type { Lang } from '#g/enums'
import $ from '#g/texts/renderer'

/** Выбор языка программы */
export default afcMemo<ILanguageProps>(function LanguageView(props) {
  const model = new LanguageModel(props)
  const ctrlr = new LanguageController(model)

  return () => (
    <div>
      {model.inSetup
        ? <Radio.Group
          defaultValue={model.currentLang}
          value={model.currentLang}
          onChange={onChangeRadio}
          optionType='button'
          buttonStyle='solid'
          options={model.options}
        />
        : <>
          <label htmlFor='lang-select' className='lang-label'>
            {$.LANGUAGE_LABEL}
          </label>
          <Select
            id='lang-select'
            onChange={onChangeSelect}
            value={model.currentLang}
            size='large'
            options={model.options}
          />
        </>
      }
    </div>
  )

  function onChangeRadio(event: RadioChangeEvent): void {
    ctrlr.changeLang(event.target.value)
  }

  function onChangeSelect(value: Lang): void {
    ctrlr.changeLang(value)
  }
})
