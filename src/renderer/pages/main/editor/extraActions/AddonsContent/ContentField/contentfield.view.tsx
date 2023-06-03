import type { ChangeEvent } from 'react'

import { Input, Typography } from 'antd'
import { afcMemo } from 'react-afc'

import type IContentFieldProps from './contentfield.props'

export default afcMemo<IContentFieldProps>(function ContentField(props) {
  const Text = Typography.Text

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
})
