import type { CSSProperties } from 'react'

import { Select as ANTSelect } from 'antd'
import { afcMemo } from 'react-afc'

import SelectModel from './select.model'

import type { IParameterProps } from '#g/types'

function Select(props: IParameterProps) {
  const model = new SelectModel(props)

  const style = {
    width: 150,
    textAlign: 'left'
  } satisfies CSSProperties

  return () => <>
    <ANTSelect
      style={style}
      options={model.options}
      size='large'
      value={props.value}
      onChange={props.onSetValue}
    />
  </>
}

export default afcMemo(Select)
