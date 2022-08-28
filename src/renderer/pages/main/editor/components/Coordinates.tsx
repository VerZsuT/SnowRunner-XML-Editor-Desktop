import {InputNumber, Typography} from 'antd'
import {afcMemo, handleContext} from 'react-afc'
import type {ParameterProps} from 'types'

import {FileDataContext} from '../helpers/getFileData'
import {addTag} from '../service'

const { Text } = Typography

interface Coordinates {
    x: string | number
    y: string | number
    z: string | number
}

export const Coordinates = afcMemo((props: ParameterProps) => {
    const getFileData = handleContext(FileDataContext)

    function onChangeValue(coordinate: Partial<Coordinates>) {
        const { fileDOM } = getFileData()
        const { item, value, onSetValue } = props
        const newCoords = {...stringToCoords(value), ...coordinate}

        addTag(fileDOM, item)
        onSetValue(coordsToString(newCoords))
    }

    const onChangeX = (value: string) => onChangeValue({ x: value ?? 0 })
    const onChangeY = (value: string) => onChangeValue({ y: value ?? 0 })
    const onChangeZ = (value: string) => onChangeValue({ z: value ?? 0 })

    return () => {
        const { item, value } = props
        const coords = stringToCoords(value)

        return <>
            <Text>   X:  </Text>
            <InputNumber
                step={item.step}
                value={coords.x}
                onChange={onChangeX}
            />
            <Text>   Y:  </Text>
            <InputNumber
                step={item.step}
                value={coords.y}
                onChange={onChangeY}
            />
            <Text>   Z:  </Text>
            <InputNumber
                step={item.step}
                value={coords.z}
                onChange={onChangeZ}
            />
        </>
    }
})

function coordsToString(coords: Coordinates) {
    const { x, y, z } = coords
    return `(${x}; ${y}; ${z})`
}

function stringToCoords(str: string): Coordinates {
    let array: string[]

    if (!str)
        return { x: 0, y: 0, z: 0 }

    const prepared = str.replace('(', '').replace(')', '').replaceAll(' ', '')
    array = prepared.split(';')
    if (array.length === 1)
        array = prepared.split(',')

    const [x, y, z] = array
    return { x: +x, y: +y, z: +z }
}
