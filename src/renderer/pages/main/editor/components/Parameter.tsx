import type { FC, ReactNode } from 'react'

import { Typography } from 'antd'
import { fafcMemo, useContext, useState } from 'react-afc'
import type { FastProps } from 'react-afc/types'

import { FileDataContext } from '../helpers/getFileData'
import handleReset from '../helpers/handleReset'
import importService from '../services/import'
import Coordinates from './Coordinates'
import Input from './Input'
import Select from './Select'

import { RESET_MENU_ITEM_LABEL } from '#globalTexts/renderer'
import useContextMenu from '#helpers/useContextMenu'
import { xml } from '#services'
import type { IInputParams } from '#types'

const { Text } = Typography

type Props = {
  item: IInputParams
}

function Parameter(props: FastProps<Props>) {
  const { item } = props.curr
  
  const fileData = useContext(FileDataContext)
  const defaultValue = getDefaultValue()
  const contextMenu = useContextMenu()
  const contextItems = [{
    key: 'reset-param',
    label: `${RESET_MENU_ITEM_LABEL} ${item.label}`,
    onClick: onReset
  }]
  let Element: FC<any> = Input

  const [paramValue, setParamValue] = useState(getValue())
  handleReset(onReset)
  importService.onImport(() => {
    setParamValue(getValue())
  })
  if (item.inputType === 'select')
    Element = Select
  else if (item.type === 'coordinates')
    Element = Coordinates

  function render(): ReactNode {
    return (
      <div className='grid parameter' onContextMenu={contextMenu.onContext}>
        <contextMenu.Component
          items={contextItems}
          isShow={contextMenu.isShow()}
        />
        <div className='label'>
          <Text>{item.label}</Text>
        </div>
        <div className='content'>
          <Element
            defaultValue={defaultValue}
            onSetValue={onSetValue}
            value={paramValue.val}
            item={item}
          />
        </div>
      </div>
    )
  }

  function onSetValue(newVal: string) {
    const { selector, attribute } = item
    const { fileDOM } = fileData.val
    xml.addTag(fileDOM, item)
    fileData.val.fileDOM(selector).attr(attribute, newVal)
    setParamValue(newVal)
  }

  function onReset(): void {
    contextMenu.hide()
    if (defaultValue === undefined) return
    onSetValue(defaultValue)
  }

  function getDefaultValue(): string | undefined {
    const { defaults } = fileData.val

    if (!defaults[item.selector] || defaults[item.selector][item.attribute] === undefined) {
      return undefined
    }

    return String(defaults[item.selector][item.attribute])
  }

  function getValue(): string | number | undefined {
    const { fileDOM, templates, globalTemplates } = fileData.val
    let value = item.value

    if (fileDOM(item.selector).length &&
      fileDOM(item.selector).attr(item.attribute)) {
      value = fileDOM(item.selector).attr(item.attribute)
    }

    if (value === null || value === undefined) {
      if (templates)
        value = xml.getFromTemplates(fileDOM, templates, globalTemplates, item) ?? item.default
      else
        value = item.default
    }

    return value
  }

  return render
}

export default fafcMemo(Parameter)
