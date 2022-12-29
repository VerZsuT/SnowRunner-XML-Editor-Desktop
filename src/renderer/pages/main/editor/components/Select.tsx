import type { ReactNode } from 'react'

import { Select as ANTSelect } from 'antd'
import { fafcMemo } from 'react-afc'
import type { FastProps } from 'react-afc/types'

import type { IParameterProps, ISelectParams } from '#types'

function Select(props: FastProps<IParameterProps>) {
  const item = props.curr.item as unknown as ISelectParams
  const options = item.selectParams.map(option => ({
    label: option.label,
    value: option.value,
    key: option.value
  }))

  function render(): ReactNode {
    const { value, onSetValue } = props.curr

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
}

export default fafcMemo(Select)
