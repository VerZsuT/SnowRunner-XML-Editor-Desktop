import type { ChangeEvent, FocusEvent } from 'react'

import { Input as ANTInput, InputNumber } from 'antd'
import { afcMemo, useContext } from 'react-afc'

import { FileDataContext } from '../helpers/getFileData'

import { InputType, NumberType } from '#enums'
import { isNonNullable, isNullable } from '#gl-helpers'
import { xml } from '#services'
import type { IInputParams, IParameterProps } from '#types'

type Status = '' | 'error' | 'warning'

function Input(props: IParameterProps) {
  const min = props.item.min ?? 0
  const max = props.item.max ?? Infinity

  const fileData = useContext(FileDataContext)

  return () => {
    const { item, value } = props
    const status = getStatus()

    return item.type === InputType.number
      ? <InputNumber
        style={{ width: 150 }}
        value={value}
        step={item.step}
        onChange={onChange}
        onBlur={onBlur}
        status={status}
        size='large'
      />
      : <ANTInput
        style={{ width: 150 }}
        value={value}
        onChange={onStringChange}
        onBlur={onBlur}
        status={status}
        size='large'
      />
  }

  function onBlur(e: FocusEvent<HTMLInputElement>): void {
    const { fileDOM } = fileData.val
    const { item, defaultValue, onSetValue } = props
    let newValue = e.target.value

    if (newValue === '')
      newValue = defaultValue

    if (!fileDOM(item.selector).length) {
      const array = item.selector.split('>').map(value => value.trim())
      const name = array.pop()?.split('[')[0]
      const rootSelector = array.join(' > ')

      fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`)
    }
    onSetValue(newValue)
  }

  function onChange(value: string | null): void {
    const { item, onSetValue } = props
    const { fileDOM } = fileData.val
    let newValue = value ?? ''

    if (item.type !== InputType.text && newValue !== '')
      newValue = limit(item, +newValue, min, max).toString()

    xml.addTag(fileDOM, item)
    onSetValue(newValue)
  }

  function onStringChange(e: ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.value)
  }

  function getStatus(): Status {
    const { item, value } = props
    let newVal = +value

    if (isNullable(value) || isNaN(+value))
      newVal = 0

    if (item.areas) {
      let status: Status = ''

      for (const areaName in item.areas) {
        const value: [number, number][] = item.areas[areaName]

        value.forEach(area => {
          if (newVal >= area[0] && newVal <= area[1]) {
            if (areaName === 'red')
              status = 'error'
            else if (areaName === 'green')
              status = ''
            else if (areaName === 'yellow')
              status = 'warning'
          }
        })
      }

      return status
    }

    return ''
  }

  function limit(item: IInputParams, num: number, min?: number, max?: number): number {
    let number = num
    if (item.numberType === NumberType.integer)
      number = Math.round(number)
  
    if (isNonNullable(min) && number < min)
      return min
  
    if (isNonNullable(max) && number > max)
      return max
  
    return number
  }
}

export default afcMemo(Input)
