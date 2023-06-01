import type { ChangeEvent, FocusEvent } from 'react'

import { Input as ANTInput, InputNumber } from 'antd'
import { afcMemo } from 'react-afc'

import InputController from './input.controller'
import InputModel from './input.model'

import { InputType } from '#g/enums'
import type { IParameterProps } from '#g/types'

function Input(props: IParameterProps) {
  const model = new InputModel(props)
  const ctrlr = new InputController(props, model)

  const style = { minWidth: 150 }

  return () => {
    return model.type === InputType.number
      ? <InputNumber
        style={style}
        value={model.value}
        step={model.step}
        onChange={onChange}
        onBlur={onBlur}
        status={model.status}
        size='large'
      />
      : <ANTInput
        style={style}
        value={model.value}
        onChange={onStringChange}
        onBlur={onBlur}
        status={model.status}
        size='large'
      />
  }

  function onBlur(e: FocusEvent<HTMLInputElement>): void {
    ctrlr.setValue(e.target.value)
  }

  function onChange(value: string | null): void {
    ctrlr.changeValue(value)
  }

  function onStringChange(e: ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.value)
  }
}

export default afcMemo(Input)
