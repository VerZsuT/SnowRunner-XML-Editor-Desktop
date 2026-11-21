import type { INumberAttrDescriptor } from '@modules/xml/game/attributes'
import { Float } from '../../input/variants/float'

/** Параметры передачи. */
export interface GearPresetElement {
	/** Максимальная угловая скорость. */
	$AngVel: INumberAttrDescriptor

	/** Множитель расхода топлива. */
	$FuelModifier: INumberAttrDescriptor
}

/** Параметры компонента передачи. */
export interface GearPresetProps {
	/** Элемент передачи. */
	element?: GearPresetElement
}

/** Параметры передачи. */
export function GearPreset({ element }: GearPresetProps) {
	if (!element) {
		return null
	}

	return (
		<>
			<Float descriptor={element.$AngVel} />
			<Float descriptor={element.$FuelModifier} />
		</>
	)
}
