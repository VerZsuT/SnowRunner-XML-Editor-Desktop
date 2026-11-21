import { InputType } from '../../../enums'
import type { IInputProps, IParameterProps, ParameterValue } from '../../../types'
import { Input } from '../input'

/** Параметры текстового поля. */
export type TextProps = IParameterProps<string> & Omit<IInputProps, 'type' | 'value'> & {
	/** Событие изменения значения. */
	onChange?(value: ParameterValue): void
}

/** Текстовое поле ввода. */
export function Text(props: TextProps) {
	return <Input {...props} type={InputType.text} />
}
