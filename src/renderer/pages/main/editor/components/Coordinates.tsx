import type { ReactNode } from 'react'

import { InputNumber, Typography } from 'antd'
import { afcMemo, handleContext } from 'react-afc'

import { FileDataContext } from '../helpers/getFileData'

import { xml } from '#services'
import type { IParameterProps } from '#types'

const { Text } = Typography

type Coordinates = {
  x: string | number
  y: string | number
  z: string | number
}

export const Coordinates = afcMemo((props: IParameterProps) => {
  const getFileData = handleContext(FileDataContext)

  function render(): ReactNode {
    const { item, value } = props
    const coords = stringToCoords(value)

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

  function onChangeValue(coordinate: Partial<Coordinates>): void {
    const { fileDOM } = getFileData()
    const { item, value, onSetValue } = props
    const newCoords = { ...stringToCoords(value), ...coordinate }

    xml.addTag(fileDOM, item)
    onSetValue(coordsToString(newCoords))
  }

  const onChangeX = (value: string | null): void => onChangeValue({ x: value ?? 0 })
  const onChangeY = (value: string | null): void => onChangeValue({ y: value ?? 0 })
  const onChangeZ = (value: string | null): void => onChangeValue({ z: value ?? 0 })

  function coordsToString(coords: Coordinates): string {
    const { x, y, z } = coords
    return `(${x}; ${y}; ${z})`
  }
  
  function stringToCoords(str: string): Coordinates {
    let array: string[]
  
    if (!str) return { x: 0, y: 0, z: 0 }
  
    const prepared = str.replace('(', '').replace(')', '').replaceAll(' ', '')
    array = prepared.split(';')
    if (array.length === 1) {
      array = prepared.split(',')
    }
  
    const [x, y, z] = array
    return { x: +x, y: +y, z: +z }
  }

  return render
})
