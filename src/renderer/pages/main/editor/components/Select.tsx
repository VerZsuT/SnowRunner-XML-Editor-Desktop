import {Select as ANTSelect} from 'antd'
import {afcMemo} from 'react-afc'
import type {ParameterProps, SelectParams} from 'types'

export const Select = afcMemo((props: ParameterProps) => {
    const item = props.item as unknown as SelectParams

    const options = item.selectParams.map(option => ({
        label: option.label,
        value: option.value,
        key: option.value
    }))

    return () => <>
        <ANTSelect
            style={{
                width: 150,
                textAlign: 'left'
            }}
            options={options}
            size='large'
            value={props.value}
            onChange={props.onSetValue}
        />
    </>
})
