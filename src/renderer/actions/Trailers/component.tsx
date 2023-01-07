import { Button, Typography } from 'antd'
import { afcMemo, useState } from 'react-afc'

import $ from '../texts'
import TrailersAction from './action'
import Trailer from './Trailer'

import type { IActionProps } from '#types'

const { Text } = Typography

function TrailersComponent(props: IActionProps) {
  const [hasScout, setHasScout] = useState(TrailersAction.hasTrailers(props.dom)[0])
  const [hasTruck, setHasTruck] = useState(TrailersAction.hasTrailers(props.dom)[1])

  return () => (
    <div className='grid trailers-grid'>
      <div className='trailers-buttons'>
        <Text>{$.SCOUT_TRAILERS}</Text><br/>
        {!hasScout.val
          ? <Button
            disabled={!(hasTruck.val && !hasScout.val)}
            onClick={addScout}
            type='primary'
          >
            {$.ADD}
          </Button>
          : <Button
            disabled={!(hasScout.val && hasTruck.val)}
            onClick={removeScout}
            type='primary'
            danger
          >
            {$.REMOVE}
          </Button>
        }
      </div>
      <div className='trailers-buttons'>
        <Text>{$.TRUCK_TRAILERS}</Text><br/>
        {!hasTruck.val
          ? <Button
            disabled={!(hasScout.val && !hasTruck.val)}
            onClick={addTruck}
            type='primary'
          >
            {$.ADD}
          </Button>
          : <Button
            disabled={!(hasScout.val && hasTruck.val)}
            onClick={removeTruck}
            type='primary'
            danger
          >
            {$.REMOVE}
          </Button>
        }
      </div>
    </div>
  )

  function addScout(): void {
    TrailersAction.addTrailer(Trailer.scout, Trailer.truck, props.dom, value => setHasScout(value))
  }
  function addTruck(): void {
    TrailersAction.addTrailer(Trailer.truck, Trailer.scout, props.dom, value => setHasTruck(value))
  }

  function removeScout(): void {
    TrailersAction.removeTrailer(Trailer.scout, props.dom, value => setHasScout(value))
  }
  function removeTruck(): void {
    TrailersAction.removeTrailer(Trailer.truck, props.dom, value => setHasTruck(value))
  }
}

export default afcMemo(TrailersComponent)
