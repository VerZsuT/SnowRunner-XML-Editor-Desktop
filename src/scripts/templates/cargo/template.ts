import {
	Template, 
	Group, 
	Input, 
	Selectors
} from '../../service'
import { 
	descs,
	texts
} from './texts'

const selectors = Selectors({
	cargoPart: 'Body',
	cargoPartItem: 'Body#every',
	slot: 'TruckAddon.GameData.InstallSlot'
})

export default <ITemplate> {
	selector: 'TruckAddon > GameData > InstallSlot[CargoType]',
	template: Template({selectors: selectors}, [
		Group({
			name: texts.part,
			defaultSelector: 'cargoPartItem'
		}, [
			Template({
				type: 'multiply',
				itemSelector: 'cargoPart'
			}, [
				Input({
					attribute: 'Mass',
					text: texts.mass,
					desc: descs.mass
				})
			])
		]),
		Group({
			name: texts.main,
			defaultSelector: 'slot'
		}, [
			Input({
				attribute: 'CargoLength',
				text: texts.cargoLength,
				desc: descs.cargoLength,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'CargoType',
				onlyDeveloper: true,
				type: 'text',
				text: texts.cargoType,
				desc: descs.cargoType
			}),
			Input({
				type: 'coordinates',
				onlyDeveloper: true,
				attribute: 'Offset',
				text: texts.offset,
				desc: descs.offset,
				step: 0.1
			})
		])
	])
}
