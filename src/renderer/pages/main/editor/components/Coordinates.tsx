import type { ReactNode } from 'react'

import { InputNumber, Typography } from 'antd'
import { fafcMemo, useContext } from 'react-afc'
import type { FastProps } from 'react-afc/types'

import { FileDataContext } from '../helpers/getFileData'

import { xml } from '#services'
import type { IParameterProps } from '#types'

const { Text } = Typography

interface ICoordinates {
  x: string | number
  y: string | number
  z: string | number
}

function Coordinates(props: FastProps<IParameterProps>) {
  const fileData = useContext(FileDataContext)

  function render(): ReactNode {
    const { item, value } = props.curr
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

  function onChangeValue(coordinate: Partial<ICoordinates>): void {
    const { fileDOM } = fileData.val
    const { item, value, onSetValue } = props.curr
    const newCoords = { ...stringToCoords(value), ...coordinate }

    xml.addTag(fileDOM, item)
    onSetValue(coordsToString(newCoords))
  }

  const onChangeX = (value: string | null): void => onChangeValue({ x: value ?? 0 })
  const onChangeY = (value: string | null): void => onChangeValue({ y: value ?? 0 })
  const onChangeZ = (value: string | null): void => onChangeValue({ z: value ?? 0 })

  function coordsToString(coords: ICoordinates): string {
    const { x, y, z } = coords
    return `(${x}; ${y}; ${z})`
  }
  
  function stringToCoords(str: string): ICoordinates {
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
}

export default fafcMemo(Coordinates)
