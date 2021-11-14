import {
	Template,
	Group,
	Input,
	Select,
	Selectors,
	forEach,
	forEachBy,
	TemplateType,
	InputType,
	NameType,
	NumberType
} from '../../service'
import {
	descs,
	texts
} from './texts'
import gearPreset from '../presets/gear'
import unlockGroup from '../presets/unlockGroup'

const selectors = Selectors({
	gearbox: 'GearboxVariants.Gearbox',
	gearboxItem: `{gearbox}${forEach}`,
	gearboxItemText: '{gearboxItem}.GameData.UiDesc',
	gear: `{gearbox}${forEach}.Gear`,
	reverseGear: '{gearboxItem}.ReverseGear',
	highGear: '{gearboxItem}.HighGear',
	gearItem: `{gear}${forEachBy(2)}`,
	gameData: '{gearboxItem}.GameData',
	gearboxParams: '{gameData}.GearboxParams'
})

export default <ITemplate> {
	selector: 'GearboxVariants',
	template: Template({
		type: TemplateType.multiply,
		itemSelector: selectors.gearbox,
		selectors: selectors
	}, [
		Group({
			nameType: NameType.computed,
			nameAttribute: 'UiName',
			resNameAttribute: 'Name',
			nameSelector: selectors.gearboxItemText,
			resNameSelector: selectors.gearboxItem,
			defaultSelector: selectors.gearboxItem
		}, [
			Input({
				attribute: 'Name',
				type: InputType.text,
				text: texts.id,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'AWDConsumptionModifier',
				text: texts.awdConsumptionModifier,
				desc: descs.awdConsumptionModifier,
				max: 32,
				default: 1
			}),
			Input({
				attribute: 'CriticalDamageThreshold',
				text: texts.criticalDamageThreshold,
				desc: descs.criticalDamageThreshold,
				max: 0.99,
				step: 0.01,
				default: 0.7
			}),
			Input({
				attribute: 'DamageCapacity',
				numberType: NumberType.integer,
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				max: 64000,
				step: 10,
				default: 0,
				areas: {
					yellow: [[1000, 10000]],
					red: [[10001, Infinity]],
				},
				bold: true
			}),
			Input({
				attribute: 'DamagedConsumptionModifier',
				text: texts.damagedConsumptionModifier,
				desc: descs.damagedConsumptionModifier,
				max: 32,
				step: 0.01,
				default: 1
			}),
			Input({
				attribute: 'FuelConsumption',
				text: texts.fuelConsumption,
				desc: descs.fuelConsumption,
				max: 10,
				default: 0.1,
				bold: true
			}),
			Input({
				attribute: 'IdleFuelModifier',
				text: texts.idleFuelConsumption,
				desc: descs.idleFuelConsumption,
				max: 10,
				default: 0.3
			}),
			Select({
				attribute: 'IsManualLowGear',
				selector: selectors.gearboxParams,
				text: texts.lowerManualGear,
				desc: descs.lowerManualGear,
				options: {
					true: texts.allow,
					false: texts.notAllow
				},
				default: 'false'
			}),
			Group({
				name: texts.gearboxParams,
				defaultSelector: selectors.gearboxParams
			}, [
				Select({
					attribute: 'IsHighGearExists',
					text: texts.highGear,
					desc: descs.highGear,
					options: {
						true: texts.allow,
						false: texts.notAllow
					},
					default: 'true'
				}),
				Select({
					attribute: 'IsLowerGearExists',
					text: texts.lowerGear,
					desc: descs.lowerGear,
					options: {
						true: texts.allow,
						false: texts.notAllow
					},
					default: 'true'
				}),
				Select({
					attribute: 'IsLowerPlusGearExists',
					text: texts.lowerPlusGear,
					desc: descs.lowerPlusGear,
					options: {
						true: texts.allow,
						false: texts.notAllow
					},
					default: 'true'
				}),
				Select({
					attribute: 'IsLowerMinusGearExists',
					text: texts.lowerMinusGear,
					desc: descs.lowerMinusGear,
					options: {
						true: texts.allow,
						false: texts.notAllow
					},
					default: 'true'
				})
			]),
			Group({
				name: texts.gears
			}, [
				Group({
					name: texts.reverceGear,
					defaultSelector: selectors.reverseGear
				}, gearPreset),
				Group({
					name: texts.highGear,
					defaultSelector: selectors.highGear
				}, gearPreset),
				Template({
					type: TemplateType.multiply,
					itemSelector: selectors.gear
				}, [
					Group({
						name: '',
						defaultSelector: selectors.gearItem,
						withCounter: true
					}, gearPreset)
				])
			]),
			unlockGroup(selectors.gameData)
		])
	])
}
