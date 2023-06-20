import { memo } from 'react'

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
    <VersionInfo version='0.7.4a' changes={model.desc074a} />
    <VersionInfo version='0.7.4' changes={model.desc074} />
    <VersionInfo version='0.7.3c' changes={model.desc073c} />
  </>
})

const VersionInfo = memo(function VersionInfo(props: { version: string, changes: string[] }) {
  return <>
    <Divider className='title'>
      {$.WHATS_NEW_TITLE} {` v${props.version}`}
    </Divider>
    <List
      className='content'
      size='small'
      dataSource={props.changes}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
  </>
})
