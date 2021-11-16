import {
	Template, 
	Group, 
	Input, 
	Selectors,
	forEach,
	TemplateType,
	InputType,
	NumberType
} from '../../service'
import { 
	descs,
	texts
} from './texts'

const selectors = Selectors(() => {
	const cargoPart = 'Body'
	const currentCargoPart = `${cargoPart}${forEach}`
	const slot = 'TruckAddon.GameData.InstallSlot'
	return {cargoPart, currentCargoPart, slot}
})

export default <ITemplate> {
	selector: 'TruckAddon > GameData > InstallSlot[CargoType]',
	template: Template({selectors}, [
		Group({
			name: texts.part
		}, [
			Template({
				type: TemplateType.multiply,
				itemSelector: selectors.cargoPart
			}, [
				Input({
					attribute: 'Mass',
					selector: selectors.currentCargoPart,
					numberType: NumberType.integer,
					text: texts.mass,
					desc: descs.mass
				})
			])
		]),
		Group({
			name: texts.main,
			defaultSelector: selectors.slot
		}, [
			Input({
				attribute: 'CargoLength',
				numberType: NumberType.integer,
				text: texts.cargoLength,
				desc: descs.cargoLength,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'CargoType',
				type: InputType.text,
				text: texts.cargoType,
				desc: descs.cargoType,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Offset',
				type: InputType.coordinates,
				text: texts.offset,
				desc: descs.offset,
				onlyDeveloper: true
			})
		])
	])
}
