import { PageHeader } from '@ant-design/pro-components'
import { afcMemo } from 'react-afc'

import HeaderModel from './header.model'
import type HeaderProps from './header.props'

function HeaderView(props: HeaderProps) {
  const model = new HeaderModel(props)

  return () => (
    <PageHeader
      className='header'
      title={
        <h3 className='header-title'>
          {model.text}
        </h3>
      }
      {...props}
    />
  )
}

export default afcMemo(HeaderView)
