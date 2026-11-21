import type { INumberAttrDescriptor } from '@modules/xml/game/attributes'
import { InputType, NumberType } from '../../../enums'
import type { IInputProps, IParameterProps } from '../../../types'
import { Input } from '../input'

/** Параметры числового поля. */
export type NumProps = IParameterProps<number, INumberAttrDescriptor> & Omit<IInputProps, 'type' | 'value'> & {
	/** Событие изменения значения. */
	onChange?(value: number): void
}

/** Числовое поле ввода. */
export function Num({ numberType, onChange, ...props }: NumProps) {
	return (
		<Input
			{...props}
			type={InputType.number}
			numberType={numberType ?? NumberType.float}
			onChange={value => onChange?.(Number(value))}
		/>
	)
}
