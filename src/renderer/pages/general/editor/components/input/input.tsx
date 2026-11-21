import type { Limit } from '@modules/xml/renderer'
import type { IInputProps, IParameterProps, ParameterValue } from '../../types'
import { Parameter } from '../parameter'
import { InputItem } from './item'
import { InputTip } from './input-tip'

/** Параметры поля ввода. */
export type InputProps = IParameterProps<string | number> & Omit<IInputProps, 'value'> & {
	/** Событие изменения значения. */
	onChange?(value: ParameterValue): void
}

/** Параметр с полем ввода. */
export function Input(props: InputProps) {
	return (
		<Parameter
			label={props.label}
			desc={props.desc}
			getter={props.getter}
			setter={props.setter}
			descriptor={props.descriptor}
			onChange={props.onChange}
		>
			{({ value, onChange }) => (
				<InputTip descriptor={props.descriptor} areas={props.areas}>
					<InputItem
						type={props.type}
						numberType={props.numberType}
						areas={props.areas ?? props.descriptor.areas}
						step={props.step ?? props.descriptor.step}
						value={value as string | number}
						min={props.min ?? (props.descriptor.limit as Limit)?.minValue}
						max={props.max ?? (props.descriptor.limit as Limit)?.maxValue}
						onChange={onChange}
					/>
				</InputTip>
			)}
		</Parameter>
	)
}
