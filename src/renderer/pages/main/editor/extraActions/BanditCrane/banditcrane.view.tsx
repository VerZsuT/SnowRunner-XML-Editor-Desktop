import { Button, Typography } from 'antd'
import { afcMemo } from 'react-afc'

import $ from '../texts'
import BanditCraneController from './banditcrane.controller'
import BanditCraneModel from './banditcrane.model'

import type { IExtraActionProps } from '#g/types'

export default afcMemo<IExtraActionProps>(function BanditCraneComponent(props) {
  const Paragraph = Typography.Paragraph

  const model = new BanditCraneModel(props)
  const ctrlr = new BanditCraneController(props, model)

  return () => <>
    <div className='warn-title'>
      <Paragraph>{$.CRANES_WARN_TITLE}</Paragraph>
    </div>
    <Paragraph>{$.BANDIT_WARN_MESSAGE}</Paragraph>
    <div className='bc-buttons'>
      {model.hasCrane
        ? <Button
          type='primary'
          onClick={onRemove}
          danger
        >
          {$.REMOVE}
        </Button>
        : <Button
          onClick={onAdd}
          type='primary'
        >
          {$.ADD}
        </Button>
      }
    </div>
  </>

  function onAdd(): void {
    ctrlr.addCrane()
  }

  function onRemove(): void {
    ctrlr.removeCrane()
  }
})
