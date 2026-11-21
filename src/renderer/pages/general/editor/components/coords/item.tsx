import { Position } from '@modules/xml/renderer'
import { InputNumber, Typography } from 'antd'
import { useState } from 'react'
import { NumberType } from '../../enums'
import type { ParameterValue, PositionProps } from '../../types'
import './item.scss'

const { Text } = Typography

/** Параметры ввода координат. */
export interface CoordsItemProps extends PositionProps {
	/** Событие изменения значения. */
	onChange(value: ParameterValue): void
}

/** Поля ввода координат. */
export function CoordsItem({ value, numberType, step = numberType === NumberType.integer ? 1 : 0.1, onChange }: CoordsItemProps) {
	const [coords, setCoords] = useState<Position>(() => value || new Position())
	const [previous, setPrevious] = useState(value)

	if (previous !== value) {
		setPrevious(value)
		setCoords(value || new Position())
	}

	function changeCoord(newCoord: Partial<Position>) {
		for (const name in newCoord) {
			if (Number.isNaN(newCoord[name])) {
				return
			}
		}

		const next = coords.toCompared(newCoord)

		setCoords(next)
		onChange(next.toString())
	}

	return (
		<>
			<Text> X: </Text>
			<InputNumber
				className="coordinate"
				step={step}
				value={coords.x}
				onChange={newValue => changeCoord({ x: Number.parseFloat(String(newValue)) })}
			/>

			<Text> Y: </Text>
			<InputNumber
				className="coordinate"
				step={step}
				value={coords.y}
				onChange={newValue => changeCoord({ y: Number.parseFloat(String(newValue)) })}
			/>

			<Text> Z: </Text>
			<InputNumber
				className="coordinate"
				step={step}
				value={coords.z}
				onChange={newValue => changeCoord({ z: Number.parseFloat(String(newValue)) })}
			/>
		</>
	)
}
