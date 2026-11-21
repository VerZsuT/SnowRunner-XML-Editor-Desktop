import type { IPositionAttrDescriptor } from '@modules/xml/game/attributes'
import type { Position } from '@modules/xml/game/position'
import type { IInputProps, IParameterProps, ParameterValue } from '../../types'
import { Parameter } from '../parameter'
import { CoordsItem } from './item'

/** Параметры координат. */
export type CoordsProps = IParameterProps<Position, IPositionAttrDescriptor> & Omit<IInputProps, 'value' | 'type'> & {
	/** Событие изменения значения. */
	onChange?(value: ParameterValue): void
}

/** Параметр координат. */
export function Coords(props: CoordsProps) {
	return (
		<Parameter
			getter={props.getter}
			label={props.label}
			desc={props.desc}
			descriptor={props.descriptor}
			onChange={props.onChange}
		>
			{({ value, onChange }) => (
				<CoordsItem
					numberType={props.numberType}
					step={props.step}
					value={value as unknown as Position}
					onChange={onChange}
				/>
			)}
		</Parameter>
	)
}
