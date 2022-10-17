import type { ReactNode } from 'react'
import { memo } from 'react'

import type { PageHeaderProps } from 'antd'
import { PageHeader } from 'antd'

type Props = {
  text: string
  extra?: ReactNode | ReactNode[]
} & PageHeaderProps

export const Header = memo((props: Props) => (
  <PageHeader
    className='header'
    title={
      <h3 className='header-title'>
        {props.text}
      </h3>
    }
    {...props}
  />
))
