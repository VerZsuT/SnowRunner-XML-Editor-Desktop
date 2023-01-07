import { Button, Typography } from 'antd'
import { afcMemo, useState } from 'react-afc'

import $ from '../texts'
import BanditCraneAction from './action'

import type { IActionProps } from '#types'

const { Paragraph } = Typography

function BanditCraneComponent(props: IActionProps) {
  const [hasCrane, setHasCrane] = useState(BanditCraneAction.hasCrane(props.dom))

  return () => <>
    <div className='warn-title'>
      <Paragraph>{$.CRANES_WARN_TITLE}</Paragraph>
    </div>
    <Paragraph>{$.BANDIT_WARN_MESSAGE}</Paragraph>
    <div className='bc-buttons'>
      {hasCrane.val
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
    BanditCraneAction.addCrane(props.dom)
    setHasCrane(true)
  }

  function onRemove(): void {
    BanditCraneAction.removeCrane(props.dom)
    setHasCrane(false)
  }
}

export default afcMemo(BanditCraneComponent)
