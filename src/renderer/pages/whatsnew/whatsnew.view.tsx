import { Divider, List } from 'antd'
import { afc } from 'react-afc'

import $ from './texts'
import WhatsNewController from './whatsnew.controller'
import WhatsNewModel from './whatsnew.model'

import '#r/templateScript'
import './whatsnew.styles'

function WhatsNew() {
  const model = new WhatsNewModel()
  new WhatsNewController()

  return () => <>
    <Divider className='title'>
      {$.WHATS_NEW_TITLE} {' v0.7.2'}
    </Divider>
    <List
      className='content'
      size='small'
      dataSource={model.desc072}
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
      dataSource={model.desc071}
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
      dataSource={model.desc070}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
  </>
}

export default afc(WhatsNew)
