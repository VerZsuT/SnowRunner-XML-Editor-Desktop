import type { INumberAttrDescriptor } from '@modules/xml/game/attributes'
import { NumberType } from '../../../enums'
import type { IParameterProps, NumberProps } from '../../../types'
import { Num } from './num'

/** Параметры числа с плавающей точкой. */
export type FloatProps = IParameterProps<number, INumberAttrDescriptor> & Omit<NumberProps, 'type' | 'value'> & {
	/** Событие изменения значения. */
	onChange?(value: number): void
}

/** Поле ввода числа с плавающей точкой. */
export function Float(props: FloatProps) {
	return <Num {...props} numberType={NumberType.float} />
}
