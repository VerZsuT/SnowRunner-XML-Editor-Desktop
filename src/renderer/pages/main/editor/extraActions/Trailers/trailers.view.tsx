import { Button, Typography } from 'antd'
import { afcMemo } from 'react-afc'

import $ from '../texts'
import Trailer from './Trailer'
import TrailersController from './trailers.controller'
import TrailersModel from './trailers.model'

import type { IExtraActionProps } from '#g/types'

const { Text } = Typography

function TrailersComponent(props: IExtraActionProps) {
  const model = new TrailersModel(props)
  const ctrlr = new TrailersController(props, model)

  return () => (
    <div className='grid trailers-grid'>
      <div className='trailers-buttons'>
        <Text>{$.SCOUT_TRAILERS}</Text><br />
        {!model.hasScout
          ? <Button
            disabled={!(model.hasTruck && !model.hasScout)}
            onClick={onAddScout}
            type='primary'
          >
            {$.ADD}
          </Button>
          : <Button
            disabled={!(model.hasScout && model.hasTruck)}
            onClick={onRemoveScout}
            type='primary'
            danger
          >
            {$.REMOVE}
          </Button>
        }
      </div>
      <div className='trailers-buttons'>
        <Text>{$.TRUCK_TRAILERS}</Text><br />
        {!model.hasTruck
          ? <Button
            disabled={!(model.hasScout && !model.hasTruck)}
            onClick={onAddTruck}
            type='primary'
          >
            {$.ADD}
          </Button>
          : <Button
            disabled={!(model.hasScout && model.hasTruck)}
            onClick={onRemoveTruck}
            type='primary'
            danger
          >
            {$.REMOVE}
          </Button>
        }
      </div>
    </div>
  )

  function onAddScout(): void {
    ctrlr.addTrailer(Trailer.scout)
  }
  function onAddTruck(): void {
    ctrlr.addTrailer(Trailer.truck)
  }

  function onRemoveScout(): void {
    ctrlr.removeTrailer(Trailer.scout)
  }
  function onRemoveTruck(): void {
    ctrlr.removeTrailer(Trailer.truck)
  }
}

export default afcMemo(TrailersComponent)
