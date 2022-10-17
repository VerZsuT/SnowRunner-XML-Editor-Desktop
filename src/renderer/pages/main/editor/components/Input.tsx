import type { ChangeEvent, FocusEvent, ReactNode } from 'react'

import { Input as ANTInput, InputNumber } from 'antd'
import { afcMemo, handleContext } from 'react-afc'

import { FileDataContext } from '../helpers/getFileData'

import { InputType, NumberType } from '#enums'
import { xml } from '#services'
import type { IInputParams, IParameterProps } from '#types'

type Status = '' | 'error' | 'warning'

export const Input = afcMemo((props: IParameterProps) => {
  const min = props.item.min ?? 0
  const max = props.item.max ?? Infinity

  const getFileData = handleContext(FileDataContext)

  function render(): ReactNode {
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
    const { fileDOM } = getFileData()
    const { item, defaultValue, onSetValue } = props
    let newValue = e.target.value

    if (newValue === '') {
      newValue = defaultValue
    }

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
    const { fileDOM } = getFileData()
    let newValue = value ?? ''

    if (item.type !== InputType.text && newValue !== '') {
      newValue = limit(item, +newValue, min, max).toString()
    }

    xml.addTag(fileDOM, item)
    onSetValue(newValue)
  }

  function onStringChange(e: ChangeEvent<HTMLInputElement>): void {
    onChange(e.target.value)
  }

  function getStatus(): Status {
    const { item, value } = props
    let newVal = +value

    if (value === null || isNaN(+value)) {
      newVal = 0
    }

    if (item.areas) {
      let status: Status = ''

      for (const areaName in item.areas) {
        const value: [number, number][] = item.areas[areaName]

        value.forEach(area => {
          if (newVal >= area[0] && newVal <= area[1]) {
            if (areaName === 'red') {
              status = 'error'
            }
            else if (areaName === 'green') {
              status = ''
            }
            else if (areaName === 'yellow') {
              status = 'warning'
            }
          }
        })
      }

      return status
    }

    return ''
  }

  function limit(item: IInputParams, num: number, min?: number, max?: number): number {
    let number = num
    if (item.numberType === NumberType.integer) {
      number = Math.round(number)
    }
  
    if (min !== undefined && number < min) {
      return min
    }
  
    if (max !== undefined && number > max) {
      return max
    }
  
    return number
  }

  return render
})
