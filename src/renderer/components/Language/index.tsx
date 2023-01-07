import type { RadioChangeEvent } from 'antd'
import { Radio, Select } from 'antd'
import { afcMemo } from 'react-afc'

import LanguageController from './controller'
import LanguageModel from './model'
import type LanguageProps from './propsType'

import type { Lang } from '#enums'
import $ from '#gl-texts/renderer'

/** Выбор языка программы */
function Language(props: LanguageProps) {
  const m = new LanguageModel(props)
  const c = new LanguageController()

  return () => (
    <div>
      {m.inSetup
        ? <Radio.Group
          defaultValue={m.currentLang}
          onChange={onChangeRadio}
          optionType='button'
          buttonStyle='solid'
          options={m.options}
        />
        : <>
          <label htmlFor='lang-select' className='lang-label'>
            {$.LANGUAGE_LABEL}
          </label>
          <Select
            id='lang-select'
            onChange={onChangeSelect}
            value={m.currentLang}
            size='large'
            options={m.options}
          />
        </>
      }
    </div>
  )

  function onChangeRadio(event: RadioChangeEvent): void {
    c.changeLang(event.target.value)
  }

  function onChangeSelect(value: Lang): void {
    c.changeLang(value)
  }
}

export default afcMemo(Language)
