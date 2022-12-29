import type { ReactNode } from 'react'

import type { RadioChangeEvent } from 'antd'
import { Radio, Select } from 'antd'
import { Bridge } from 'emr-bridge/renderer'
import { fafcMemo } from 'react-afc'
import type { FastProps } from 'react-afc/types'

import { Lang } from '#enums'
import { LANGUAGE_LABEL } from '#globalTexts/renderer'
import { config } from '#services'
import type { MPC } from '#types'

const bridge = Bridge.as<MPC>()

type Props = {
  isSetup?: boolean
}

/** Выбор языка программы */
function Language(props: FastProps<Props>) {
  const langOptions = Object.keys(Lang).map(lang => ({
    label: lang,
    value: lang
  }))

  function render(): ReactNode {
    return (
      <div>
        {props.curr.isSetup
          ? <Radio.Group
            defaultValue={config.lang}
            onChange={onChangeRadio}
            optionType='button'
            buttonStyle='solid'
            options={langOptions}
          />
          : <>
            <label htmlFor='lang-select' className='lang-label'>
              {LANGUAGE_LABEL}
            </label>
            <Select
              id='lang-select'
              onChange={onChangeLang}
              value={config.lang}
              size='large'
              options={langOptions}
            />
          </>
        }
      </div>
    )
  }

  function onChangeRadio(event: RadioChangeEvent): void {
    config.lang = event.target.value
    bridge.relaunchApp()
  }

  function onChangeLang(value: Lang): void {
    config.lang = value
    bridge.relaunchApp()
  }

  return render
}

export default fafcMemo(Language)
