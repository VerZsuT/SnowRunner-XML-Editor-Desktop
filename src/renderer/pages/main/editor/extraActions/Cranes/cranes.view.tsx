import { Button, Typography } from 'antd'
import { afcMemo } from 'react-afc'

import $ from '../texts'
import Crane from './Crane'
import CranesController from './cranes.controller'
import CranesModel from './cranes.model'

import type { IExtraActionProps } from '#g/types'

const { Paragraph, Text } = Typography

function CranesComponent(props: IExtraActionProps) {
  const model = new CranesModel(props)
  const ctrlr = new CranesController(props, model)

  return () => <>
    <div className='warn-title'>
      <Paragraph>{$.CRANES_WARN_TITLE}</Paragraph>
    </div>
    <div className='cranes-warn-cont'>
      <Paragraph>{$.CRANES_WARN_MESSAGE}</Paragraph>
    </div>

    <div className='grid cranes-grid'>
      <div className='cranes-buttons'>
        <Text>
          US {$.CRANE}
        </Text><br />
        {!model.hasUS
          ? <Button
            disabled={!(model.hasRU && !model.hasUS)}
            onClick={onAddUS}
            type='primary'
          >
            {$.ADD}
          </Button>
          : <Button
            disabled={!(model.hasRU && model.hasUS)}
            onClick={onRemoveUS}
            type='primary'
            danger
          >
            {$.REMOVE}
          </Button>
        }
      </div>
      <div className='cranes-buttons'>
        <Text>
          RU {$.CRANE}
        </Text><br />
        {!model.hasRU
          ? <Button
            disabled={!(model.hasUS && !model.hasRU)}
            onClick={onAddRU}
            type='primary'
          >
            {$.ADD}
          </Button>
          : <Button
            disabled={!(model.hasRU && model.hasUS)}
            onClick={onRemoveRU}
            type='primary'
            danger
          >
            {$.REMOVE}
          </Button>
        }
      </div>
    </div>
  </>

  function onAddUS(): void {
    ctrlr.addCrane(Crane.US)
  }
  function onAddRU(): void {
    ctrlr.addCrane(Crane.RU)
  }

  function onRemoveUS(): void {
    ctrlr.removeCrane(Crane.US)
  }
  function onRemoveRU(): void {
    ctrlr.removeCrane(Crane.RU)
  }
}

export default afcMemo(CranesComponent)
