import type { INumberAttrDescriptor } from '@modules/xml/game/attributes'
import { NumberType } from '../../../enums'
import type { IParameterProps, NumberProps } from '../../../types'
import { Num } from './num'

/** Параметры целочисленного поля. */
export type IntProps = IParameterProps<number, INumberAttrDescriptor> & Omit<NumberProps, 'type' | 'value'> & {
	/** Событие изменения значения. */
	onChange?(value: number): void
}

/** Поле ввода целого числа. */
export function Int(props: IntProps) {
	return <Num {...props} numberType={NumberType.integer} />
}
