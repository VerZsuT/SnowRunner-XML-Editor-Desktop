import type { ReactNode } from 'react'

import { Select as ANTSelect } from 'antd'
import { afcMemo } from 'react-afc'

import type { IParameterProps, ISelectParams } from '#types'

export const Select = afcMemo((props: IParameterProps) => {
  const item = props.item as unknown as ISelectParams
  const options = item.selectParams.map(option => ({
    label: option.label,
    value: option.value,
    key: option.value
  }))

  function render(): ReactNode {
    const { value, onSetValue } = props

    return <>
      <ANTSelect
        style={{
          width: 150,
          textAlign: 'left'
        }}
        options={options}
        size='large'
        value={value}
        onChange={onSetValue}
      />
    </>
  }

  return render
})
