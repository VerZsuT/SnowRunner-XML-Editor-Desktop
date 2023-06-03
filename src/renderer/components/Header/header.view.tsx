import { PageHeader } from '@ant-design/pro-components'
import { afcMemo } from 'react-afc'

import HeaderModel from './header.model'
import type HeaderProps from './header.props'

export default afcMemo<HeaderProps>(function HeaderView(props) {
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
})
