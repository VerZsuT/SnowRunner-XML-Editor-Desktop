import { InputNumber, Typography } from 'antd'
import { afcMemo } from 'react-afc'

import CoordinatesController from './coordinates.controller'
import CoordinatesModel from './coordinates.model'

import type { IParameterProps } from '#g/types'

const { Text } = Typography

function Coordinates(props: IParameterProps) {
  const model = new CoordinatesModel(props)
  const ctrlr = new CoordinatesController(props, model)

  return () => {
    const { item, coords } = model

    return <>
      <Text> X: </Text>
      <InputNumber
        step={item.step}
        value={String(coords.x)}
        onChange={onChangeX}
      />
      <Text> Y: </Text>
      <InputNumber
        step={item.step}
        value={String(coords.y)}
        onChange={onChangeY}
      />
      <Text> Z: </Text>
      <InputNumber
        step={item.step}
        value={String(coords.z)}
        onChange={onChangeZ}
      />
    </>
  }

  function onChangeX(value: string | null): void {
    ctrlr.changeCoordinate({ x: value ?? 0 })
  }

  function onChangeY(value: string | null): void {
    ctrlr.changeCoordinate({ y: value ?? 0 })
  }

  function onChangeZ(value: string | null): void {
    ctrlr.changeCoordinate({ z: value ?? 0 })
  }
}

export default afcMemo(Coordinates)
