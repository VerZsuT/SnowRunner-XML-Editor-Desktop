import type { ReactNode } from 'react'

import { Divider, List } from 'antd'
import { afcMemo } from 'react-afc'

import { data070, data071, data072 } from './data'
import { WHATS_NEW_TITLE } from './texts'

import { ProgramWindow } from '#enums'
import { windowReady } from '#helpers/windowReady'
import { helpers } from '#services'

import './styles'

const WhatsNew = afcMemo(() => {
  windowReady(ProgramWindow.WhatsNew)

  function render(): ReactNode {
    return <>
      <Divider className='title'>
        {WHATS_NEW_TITLE} {' v0.7.2'}
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
        {WHATS_NEW_TITLE} {' v0.7.1'}
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
        {WHATS_NEW_TITLE} {' v0.7.0'}
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
  }

  return render
})

helpers.renderComponent(<WhatsNew/>)
