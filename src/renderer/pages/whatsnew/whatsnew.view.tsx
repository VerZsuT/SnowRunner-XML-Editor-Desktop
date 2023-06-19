import { Divider, List } from 'antd'
import { afc } from 'react-afc'

import $ from './texts'
import WhatsNewController from './whatsnew.controller'
import WhatsNewModel from './whatsnew.model'

import '#r/templateScript'
import './whatsnew.styles'

export default afc(function WhatsNew() {
  const model = new WhatsNewModel()
  new WhatsNewController()

  return () => <>
    <Divider className='title'>
      {$.WHATS_NEW_TITLE} {' v0.7.4'}
    </Divider>
    <List
      className='content'
      size='small'
      dataSource={model.desc074}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />

    <Divider className='title'>
      {$.WHATS_NEW_TITLE} {' v0.7.3c'}
    </Divider>
    <List
      className='content'
      size='small'
      dataSource={model.desc073c}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
  </>
})
