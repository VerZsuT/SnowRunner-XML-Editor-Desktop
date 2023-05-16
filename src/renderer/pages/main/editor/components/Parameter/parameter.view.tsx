import type { FC } from 'react'

import { Typography } from 'antd'
import { afcMemo } from 'react-afc'

import Coordinates from '../Coordinates'
import Input from '../Input'
import Select from '../Select'
import ParameterController from './parameter.controller'
import ParameterModel from './parameter.model'
import type IParameterProps from './parameter.props'

import { InputType } from '#g/enums'
import $ from '#g/texts/renderer'
import { isNullable } from '#g/utils'
import { useContextMenu } from '#r/helpers'

const { Text } = Typography

function Parameter(props: IParameterProps) {
  const model = new ParameterModel(props)
  const ctrlr = new ParameterController(model, onReset)

  const contextMenu = useContextMenu()
  const contextItems = [{
    key: 'reset-param',
    label: `${$.RESET_MENU_ITEM_LABEL} ${model.label}`,
    onClick: onReset
  }]
  let Element: FC<any> = Input

  if (model.inputType === InputType.select) {
    Element = Select
  }
  else if (model.type === InputType.coordinates) {
    Element = Coordinates
  }

  let firstRender = true

  return () => {
    if (!model.render && firstRender) {
      firstRender = false
      return null
    }

    return (
      <div className='grid parameter' onContextMenu={contextMenu.onContext}>
        <contextMenu.Component
          items={contextItems}
          isShow={contextMenu.isShow()}
        />
        <div className='label'>
          <Text>{model.label}</Text>
        </div>
        <div className='content'>
          <Element
            defaultValue={model.defaultValue}
            onSetValue={onSetValue}
            value={model.paramValue}
            item={model.item}
          />
        </div>
      </div>
    )
  }

  function onSetValue(newValue: string) {
    ctrlr.setValue(newValue)
  }

  function onReset(): void {
    contextMenu.hide()
    if (isNullable(model.defaultValue)) return
    ctrlr.setValue(model.defaultValue)
  }
}

export default afcMemo(Parameter)
