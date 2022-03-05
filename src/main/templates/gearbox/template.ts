import type ITemplate from '../types/ITemplate'
import NameType from '../enums/NameType'
import NumberType from '../enums/NumberType'

import { Template, Group, Select, ForEach, Number } from '../items'
import { getSelectors } from '../service'
import { descs, texts } from './texts'
import unlockGroup from '../presets/unlockGroup'
import gear from '../presets/gear'

const selectors = getSelectors(function () {
	const gearbox = `GearboxVariants.Gearbox${this.forEach}`
	const gearboxText = `${gearbox}.GameData.UiDesc`
	const reverseGear = `${gearbox}.ReverseGear`
	const highGear = `${gearbox}.HighGear`
	const gearItem = `${gearbox}.Gear${this.forEachBy(2)}`
	const gameData = `${gearbox}.GameData`
	const gearboxParams = `${gameData}.GearboxParams`
	
	return { gearbox, gearboxText, reverseGear, highGear, gearItem, gameData, gearboxParams }
})

export default <ITemplate>{
	selector: 'GearboxVariants',
	template: Template(selectors, [
		ForEach(selectors.gearbox, [
			Group({
				nameType: NameType.computed,
				nameAttribute: 'UiName',
				resNameAttribute: 'Name',
				nameSelector: selectors.gearboxText,
				resNameSelector: selectors.gearbox,
				defaultSelector: selectors.gearbox
			}, [
				Number({
					attribute: 'AWDConsumptionModifier',
					text: texts.awdConsumptionModifier,
					desc: descs.awdConsumptionModifier,
					max: 32,
					min: 0,
					default: 1
				}),
				Number({
					attribute: 'CriticalDamageThreshold',
					text: texts.criticalDamageThreshold,
					desc: descs.criticalDamageThreshold,
					max: 0.999,
					min: 0,
					step: 0.01,
					default: 0.7
				}),
				Number({
					attribute: 'DamageCapacity',
					type: NumberType.integer,
					text: texts.damageCapacity,
					desc: descs.damageCapacity,
					max: 64000,
					step: 10,
					default: 0,
					areas: {
						yellow: [[1000, 10000]],
						red: [[10001, Infinity]],
					}
				}),
				Number({
					attribute: 'DamagedConsumptionModifier',
					text: texts.damagedConsumptionModifier,
					desc: descs.damagedConsumptionModifier,
					max: 32,
					min: 0,
					step: 0.01,
					default: 1
				}),
				Number({
					attribute: 'FuelConsumption',
					text: texts.fuelConsumption,
					desc: descs.fuelConsumption,
					max: 10,
					min: 0,
					default: 0.1
				}),
				Number({
					attribute: 'IdleFuelModifier',
					text: texts.idleFuelConsumption,
					desc: descs.idleFuelConsumption,
					max: 10,
					min: 0,
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
				Group(texts.gears, [
					Group({
						name: texts.reverceGear,
						defaultSelector: selectors.reverseGear
					}, gear),
					Group({
						name: texts.highGear,
						defaultSelector: selectors.highGear
					}, gear),
					ForEach(selectors.gearItem, [
						Group({
							name: '',
							defaultSelector: selectors.gearItem,
							withCounter: true
						}, gear)
					])
				]),
				unlockGroup(selectors.gameData)
			])
		])
	])
}
