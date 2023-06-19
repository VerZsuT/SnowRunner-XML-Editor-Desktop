import type { CSSProperties } from 'react'

import { Select as ANTSelect } from 'antd'
import { afcMemo } from 'react-afc'

import SelectModel from './select.model'

import type { IParameterProps } from '#g/types'

export default afcMemo<IParameterProps>(function Select(props) {
  const model = new SelectModel(props)

  const style = {
    minWidth: 150,
    textAlign: 'left'
  } satisfies CSSProperties

  return () => <>
    <ANTSelect
      style={style}
      options={model.options}
      size='large'
      value={model.value}
      onChange={props.onSetValue}
    />
  </>
})
