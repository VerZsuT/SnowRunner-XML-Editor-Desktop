
import { PageHeader } from '@ant-design/pro-components'
import { afcMemo } from 'react-afc'

import HeaderModel from './model'
import type HeaderProps from './propsType'

function Header(props: HeaderProps) {
  const m = new HeaderModel(props)

  return () => (
    <PageHeader
      className='header'
      title={
        <h3 className='header-title'>
          {m.title}
        </h3>
      }
      {...props}
    />
  )
}

export default afcMemo(Header)
