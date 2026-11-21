import type { IStringConvertAttrDescriptor } from '@modules/xml/game/attributes'
import type { ParameterValue } from '../../types'
import type { IParameterProps, ISelectProps } from '../../types'
import { Parameter } from '../parameter'
import { SelectItem } from './item'

/** Параметры выпадающего списка-параметра. */
export type SelectProps = IParameterProps<
	string | boolean,
	IStringConvertAttrDescriptor<string | boolean | (string | boolean)[]>
> & Omit<ISelectProps, 'value'> & {
	/** Событие изменения значения. */
	onChange?(value: ParameterValue): void
}

/** Параметр с выпадающим списком. */
export function Select(props: SelectProps) {
	return (
		<Parameter
			getter={props.getter}
			setter={props.setter}
			label={props.label}
			desc={props.desc}
			descriptor={props.descriptor}
			onChange={props.onChange}
		>
			{({ value, onChange }) => (
				<SelectItem
					multiple={props.multiple}
					emptyIsAll={props.emptyIsAll}
					options={props.options}
					value={value as string | boolean | (string | boolean)[]}
					disabled={props.disabled}
					onChange={onChange}
				/>
			)}
		</Parameter>
	)
}
