import type { ChangeEvent } from 'react'

import { Input, Typography } from 'antd'
import { afcMemo } from 'react-afc'

const { Text } = Typography

type ContentFieldProps = {
  text: string
  value: string
  onChange(value: string): void
}

function ContentField(props: ContentFieldProps) {
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
