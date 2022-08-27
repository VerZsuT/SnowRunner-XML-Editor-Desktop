import type {ChangeEvent, FocusEvent} from 'react'

import {Input as ANTInput, InputNumber} from 'antd'
import {InputType, NumberType} from 'enums'
import {afcMemo, handleContext} from 'react-afc'
import type {InputParams, ParameterProps} from 'types'

import {FileDataContext} from '../helpers/getFileData'
import {addTag} from '../service'

type Status = '' | 'error' | 'warning'

export const Input = afcMemo((props: ParameterProps) => {
    const getFileData = handleContext(FileDataContext)

    const min = props.item.min ?? 0
    const max = props.item.max ?? Infinity

    function onBlur(e: FocusEvent<HTMLInputElement>) {
        const {fileDOM} = getFileData()
        const {item, defaultValue, onSetValue} = props
        let newValue = e.target.value

        if (newValue === '')
            newValue = defaultValue

        if (!fileDOM(item.selector).length) {
            const array = item.selector.split('>').map(value => value.trim())
            const name = array.pop().split('[')[0]
            const rootSelector = array.join(' > ')

            fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`)
        }
        onSetValue(newValue)
    }

    function onChange(value: string) {
        const { item, onSetValue } = props
        const { fileDOM } = getFileData()
        let newValue = value

        if (item.type !== InputType.text && newValue !== '')
            newValue = limit(item, +newValue, min, max).toString()

        addTag(fileDOM, item)

        onSetValue(newValue)
    }

    function onStringChange(e: ChangeEvent<HTMLInputElement>) {
        onChange(e.target.value)
    }

    function getStatus() {
        const { item, value } = props
        let newVal = +value

        if (value === null || isNaN(+value))
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
})

function limit(item: InputParams, num: number, min?: number, max?: number) {
    let number = num
    if (item.numberType === NumberType.integer)
        number = Math.round(number)

    if (min !== undefined && number < min)
        return min

    if (max !== undefined && number > max)
        return max

    return number
}
