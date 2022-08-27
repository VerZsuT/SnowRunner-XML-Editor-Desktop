import {memo} from 'react'

import type {RadioChangeEvent} from 'antd'
import {Radio, Select} from 'antd'
import {Lang} from 'enums'
import {globalTexts} from 'globalTexts/renderer'
import {config} from 'scripts/config'
import {main} from 'scripts/main'

const { relaunchApp } = main
const { LANGUAGE_LABEL } = globalTexts

interface Props {
    isSetup?: boolean;
}

const langOptions = Object.keys(Lang).map(lang => ({
    label: lang,
    value: lang
}))


function onChangeRadio(event: RadioChangeEvent) {
    config.lang = event.target.value
    relaunchApp()
}

function changeLang(value: Lang) {
    config.lang = value
    relaunchApp()
}

/** Выбор язка программы */
export const Language = memo((props: Props) => (
    <div>
        {props.isSetup 
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
                    onChange={changeLang}
                    value={config.lang}
                    size='large'
                    options={langOptions}
                />
            </>
        }
    </div>
))
