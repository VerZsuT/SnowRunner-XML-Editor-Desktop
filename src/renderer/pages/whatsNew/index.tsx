import { Divider, List } from 'antd'
import { pafc } from 'react-afc'

import { data070, data071, data072 } from './data'
import $ from './texts'

import { ProgramWindow } from '#enums'
import useWindowReady from '#helpers/useWindowReady'
import { helpers } from '#services'

import '#r/templateScript'
import './styles'

const WhatsNew = pafc(() => {
  useWindowReady(ProgramWindow.WhatsNew)

  return () => <>
    <Divider className='title'>
      {$.WHATS_NEW_TITLE} {' v0.7.2'}
    </Divider>
    <List
      className='content'
      size='small'
      dataSource={data072}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />

    <Divider className='title'>
      {$.WHATS_NEW_TITLE} {' v0.7.1'}
    </Divider>
    <List
      className='content'
      size='small'
      dataSource={data071}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />

    <Divider className='title'>
      {$.WHATS_NEW_TITLE} {' v0.7.0'}
    </Divider>
    <List
      className='content'
      size='small'
      dataSource={data070}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
  </>
})

helpers.renderComponent(<WhatsNew/>)
