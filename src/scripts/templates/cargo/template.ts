import {
	Template,
	ForEach,
	Group,
	Number,
	Text,
	Coordinates
} from '../items'
import { NumberType } from '../enums'
import { getSelectors } from '../service'
import { descs, texts } from './texts'

const selectors = getSelectors(function() {
	const cargoPart = `Body${this.forEach}`
	const slot = 'TruckAddon.GameData.InstallSlot'
	return {cargoPart, slot}
})

export default <ITemplate> {
	selector: 'TruckAddon > GameData > InstallSlot[CargoType]',
	template: Template(selectors, [
		Group(texts.part, [
			ForEach(selectors.cargoPart, [
				Number({
					attribute: 'Mass',
					selector: selectors.cargoPart,
					type: NumberType.integer,
					text: texts.mass,
					desc: descs.mass
				})
			])
		]),
		Group({
			name: texts.main,
			defaultSelector: selectors.slot
		}, [
			Number({
				attribute: 'CargoLength',
				type: NumberType.integer,
				text: texts.cargoLength,
				desc: descs.cargoLength,
				onlyDev: true
			}),
			Text({
				attribute: 'CargoType',
				text: texts.cargoType,
				desc: descs.cargoType,
				onlyDev: true
			}),
			Coordinates({
				attribute: 'Offset',
				text: texts.offset,
				desc: descs.offset,
				onlyDev: true
			})
		])
	])
}
