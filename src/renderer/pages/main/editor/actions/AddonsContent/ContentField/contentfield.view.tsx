import type { ChangeEvent } from 'react'

import { Input, Typography } from 'antd'
import { afcMemo } from 'react-afc'

import type IContentFieldProps from './contentfield.props'

const { Text } = Typography

function ContentField(props: IContentFieldProps) {
  function onChangeValue(e: ChangeEvent<HTMLInputElement>): void {
    props.onChange(e.target.value)
  }

  return () => (
    <div className='grid ac-content'>
      <Text>
        {props.text}
      </Text>
      <Input
        type='number'
        onChange={onChangeValue}
        value={props.value}
      />
    </div>
  )
}

export default afcMemo(ContentField)
