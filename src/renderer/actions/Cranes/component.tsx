import { Button, Typography } from 'antd'
import { afcMemo, useState } from 'react-afc'

import $ from '../texts'
import CranesAction from './action'
import Crane from './Crane'

import type { IActionProps } from '#types'

const { Paragraph, Text } = Typography

function CranesComponent(props: IActionProps) {
  const [hasRU, setHasRU] = useState(CranesAction.hasCranes(props.dom)[0])
  const [hasUS, setHasUS] = useState(CranesAction.hasCranes(props.dom)[1])

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
        </Text><br/>
        {!hasUS.val
          ? <Button
            disabled={!(hasRU.val && !hasUS.val)}
            onClick={addUS}
            type='primary'
          >
            {$.ADD}
          </Button>
          : <Button
            disabled={!(hasRU.val && hasUS.val)}
            onClick={removeUS}
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
        </Text><br/>
        {!hasRU.val
          ? <Button
            disabled={!(hasUS.val && !hasRU.val)}
            onClick={addRU}
            type='primary'
          >
            {$.ADD}
          </Button>
          : <Button
            disabled={!(hasRU.val && hasUS.val)}
            onClick={removeRU}
            type='primary'
            danger
          >
            {$.REMOVE}
          </Button>
        }
      </div>
    </div>
  </>

  function addUS(): void {
    CranesAction.addCrane(Crane.US, Crane.RU, props.dom, value => setHasUS(value))
  }
  function addRU(): void {
    CranesAction.addCrane(Crane.RU, Crane.US, props.dom, value => setHasRU(value))
  }

  function removeUS(): void {
    CranesAction.removeCrane(Crane.US, props.dom, value => setHasUS(value))
  }
  function removeRU(): void {
    CranesAction.removeCrane(Crane.RU, props.dom, value => setHasRU(value))
  }
}

export default afcMemo(CranesComponent)
