import type { ReactNode } from 'react'
import { memo } from 'react'

import type { PageHeaderProps } from '@ant-design/pro-components'
import { PageHeader } from '@ant-design/pro-components'

type Props = {
  text: string
  extra?: ReactNode | ReactNode[]
} & PageHeaderProps

function Header(props: Props) {
  return (
    <PageHeader
      className='header'
      title={
        <h3 className='header-title'>
          {props.text}
        </h3>
      }
      {...props}
    />
  )
}

export default memo(Header)
