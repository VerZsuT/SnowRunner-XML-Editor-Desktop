import { isNullable } from '@utilities/checks/renderer'
import { Input, InputNumber } from 'antd'
import { useState } from 'react'
import { InputType } from '../../enums'
import type { IInputProps } from '../../types'
import './item.scss'

/** Статус поля ввода. */
type Status = '' | 'error' | 'warning'

/** Параметры поля ввода. */
export interface InputItemProps extends IInputProps {
	/** Событие изменения значения. */
	onChange(value: number | string): void
}

/** Поле ввода. */
export function InputItem(props: InputItemProps) {
	const {
		type,
		numberType,
		areas,
		step = numberType === 'float' ? 0.1 : 1,
		min,
		max
	} = props
	const [value, setValue] = useState<number | string>(props.value)
	const [previous, setPrevious] = useState(props.value)

	if (previous !== props.value) {
		setPrevious(props.value)
		setValue(props.value)
	}

	const status: Status = getStatus(value, areas)

	function changeValue(newValue: number | string | null) {
		setValue(newValue === null ? '' : newValue)
	}

	function applyValue() {
		if (value === '') {
			return
		}

		props.onChange(value)
	}

	return (
		<div>
			{type === InputType.number
				? (
					<InputNumber
						className="input"
						size="large"
						status={status}
						value={value === '' ? null : value}
						step={step}
						min={min}
						max={max}
						onChange={changeValue}
						onBlur={applyValue}
					/>
				)
				: (
					<Input
						className="input"
						size="large"
						status={status}
						value={value}
						min={min}
						max={max}
						onChange={event => changeValue(event.target.value || '')}
						onBlur={applyValue}
					/>
				)}
		</div>
	)
}

/**
 * Получить статус поля ввода.
 * @param value Значение.
 * @param areas Цветовые зоны.
 */
function getStatus(value: number | string, areas?: IInputProps['areas']): Status {
	let newValue = Number(value)
	let status: Status = ''

	if (isNullable(value) || Number.isNaN(newValue)) {
		newValue = 0
	}

	if (!areas) {
		return status
	}

	for (const areaName in areas) {
		if (!Array.isArray(areas[areaName][0])) {
			areas[areaName] = [areas[areaName]]
		}

		const areaVal = areas[areaName] as [number, number][]

		for (const area of areaVal) {
			if (newValue >= area[0] && newValue <= area[1]) {
				switch (areaName) {
					case 'red':
						status = 'error'

						break
					case 'yellow':
						status = 'warning'

						break
					default:
						status = ''

						break
				}
			}
		}
	}

	return status
}
