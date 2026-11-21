import { Select } from 'antd'
import './item.scss'
import type { ISelectProps, SelectOptions } from '../../types'

/** Параметры выпадающего списка. */
export interface SelectItemProps extends ISelectProps {
	/** Событие изменения значения. */
	onChange(value: string | string[]): void
}

/** Выпадающий список. */
export function SelectItem({ multiple, emptyIsAll, options, value, disabled, onChange }: SelectItemProps) {
	const optionsList = toOptions(options)

	function change(newValue: string | string[]) {
		onChange(emptyIsAll && Array.isArray(newValue) && newValue.length === optionsList.length
			? []
			: newValue)
	}

	return (
		<Select
			className="select"
			size="large"
			mode={multiple ? 'multiple' : undefined}
			options={optionsList}
			value={getValue(value, multiple, emptyIsAll, optionsList)}
			disabled={disabled}
			onChange={change}
		/>
	)
}

function toOptions(options: SelectOptions) {
	return options.map(([value, label]) => ({
		label,
		value: String(value)
	}))
}

function getValue(
	value: ISelectProps['value'],
	multiple: boolean | undefined,
	emptyIsAll: boolean | undefined,
	options: { value: string }[]
) {
	if (multiple) {
		const array = Array.isArray(value) ? value : []

		return array.length === 0 && emptyIsAll
			? options.map(option => option.value)
			: array.map(String)
	}

	return String(value)
}
