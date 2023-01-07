import type { ReactNode } from 'react'

import type { PageHeaderProps } from '@ant-design/pro-components'

type HeaderProps = {
  text: string
  extra?: ReactNode
} & PageHeaderProps

export default HeaderProps
