import type {FC} from 'react'

import {Typography} from 'antd'
import {globalTexts} from 'globalTexts/renderer'
import {createContextMenu} from 'helpers/createContextMenu'
import {afcMemo, createState, handleContext} from 'react-afc'
import {getFromTemplates} from 'scripts/dom'
import type {InputParams} from 'types'

import {FileDataContext} from '../helpers/getFileData'
import {handleReset} from '../helpers/handleReset'
import {onImport} from '../import'
import {addTag} from '../service'
import {Coordinates} from './Coordinates'
import {Input} from './Input'
import {Select} from './Select'

const { Text } = Typography
const { RESET_MENU_ITEM_LABEL } = globalTexts

interface Props {
    item: InputParams
}

export const Parameter = afcMemo((props: Props) => {
    const { item } = props
    const getFileData = handleContext(FileDataContext)
    const [state, setState] = createState({
        value: getValue()
    })
    const defaultValue = getDefaultValue()

    const {
        ContextMenu,
        onContextMenu,
        hideContextMenu,
        contextIsShow
    } = createContextMenu()
    handleReset(onReset)
    const contextItems = [{
        key: 'reset-param',
        label: `${RESET_MENU_ITEM_LABEL} ${item.label}`,
        onClick: onReset
    }]

    onImport(() => {
        setState({ value: getValue() })
    })

    function onSetValue(value: string) {
        const { selector, attribute } = item
        const { fileDOM } = getFileData()
        addTag(fileDOM, item)
        getFileData().fileDOM(selector).attr(attribute, value)
        setState({ value })
    }

    function onReset() {
        hideContextMenu()
        onSetValue(defaultValue)
    }

    function getDefaultValue() {
        const { defaults } = getFileData()

        if (!defaults[item.selector] || defaults[item.selector][item.attribute] === undefined)
            return undefined

        return String(defaults[item.selector][item.attribute])
    }

    function getValue() {
        const { fileDOM, templates, globalTemplates } = getFileData()
        let value = item.value

        if (fileDOM(item.selector).length &&
            fileDOM(item.selector).attr(item.attribute))
            value = fileDOM(item.selector).attr(item.attribute)

        if (value === null || value === undefined) {
            if (templates)
                value = (getFromTemplates(fileDOM, templates, globalTemplates, item) ?? item.default) as string
            else
                value = item.default
        }

        return value
    }

    let Element: FC<any> = Input

    if (props.item.inputType === 'select')
        Element = Select
    else if (props.item.type === 'coordinates')
        Element = Coordinates

    return () => {
        const { value } = state

        return (
            <div className='grid parameter' onContextMenu={onContextMenu}>
                <ContextMenu
                    items={contextItems}
                    isShow={contextIsShow()}
                />
                <div className='label'>
                    <Text>{item.label}</Text>
                </div>
                <div className='content'>
                    <Element
                        defaultValue={defaultValue}
                        onSetValue={onSetValue}
                        value={value}
                        item={item}
                    />
                </div>
            </div>
        )
    }
})
