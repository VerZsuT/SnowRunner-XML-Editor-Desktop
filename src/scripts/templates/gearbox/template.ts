import {
	Template,
	Group,
	Input,
	Select,
	Opt,
	Selectors
} from '../../service'
import {
	descs,
	texts
} from './texts'

const selectors = Selectors({
	gearbox: 'GearboxVariants.Gearbox',
	gearboxItem: '{gearbox}#every',
	gearboxItemText: '{gearboxItem}.GameData.UiDesc',
	gear: '{gearbox}#every.Gear',
	reverseGear: '{gearboxItem}.ReverseGear',
	highGear: '{gearboxItem}.HighGear',
	gearItem: '{gear}#every(2)',
	gameData: '{gearboxItem}.GameData',
	gearboxParams: '{gameData}.GearboxParams'
})

export default <ITemplate> {
	selector: 'GearboxVariants',
	template: Template({
		type: 'multiply',
		itemSelector: 'gearbox',
		selectors: selectors
	}, [
		Group({
			nameType: 'computed',
			nameSelector: 'gearboxItemText',
			resNameSelector: 'gearboxItem',
			nameAttribute: 'UiName',
			resNameAttribute: 'Name',
			defaultSelector: 'gearboxItem'
		}, [
			Input({
				attribute: 'Name',
				text: texts.id,
				type: 'text',
				onlyDeveloper: true
			}),
			Input({
				attribute: 'AWDConsumptionModifier',
				text: texts.awdConsumptionModifier,
				desc: descs.awdConsumptionModifier,
				numberType: 'float',
				max: 32,
				step: 0.1,
				default: 1
			}),
			Input({
				attribute: 'CriticalDamageThreshold',
				text: texts.criticalDamageThreshold,
				desc: descs.criticalDamageThreshold,
				numberType: 'float',
				max: 0.99,
				step: 0.01,
				default: 0.7
			}),
			Input({
				attribute: 'DamageCapacity',
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				max: 64000,
				bold: true,
				step: 10,
				default: 0,
				areas: {
					yellow: [[1000, 10000]],
					red: [[10001, Infinity]],
				},
			}),
			Input({
				attribute: 'DamagedConsumptionModifier',
				text: texts.damagedConsumptionModifier,
				desc: descs.damagedConsumptionModifier,
				numberType: 'float',
				max: 32,
				step: 0.01,
				default: 1
			}),
			Input({
				attribute: 'FuelConsumption',
				text: texts.fuelConsumption,
				desc: descs.fuelConsumption,
				numberType: 'float',
				max: 10,
				step: 0.1,
				bold: true,
				default: 0.1
			}),
			Input({
				attribute: 'IdleFuelModifier',
				text: texts.idleFuelConsumption,
				desc: descs.idleFuelConsumption,
				numberType: 'float',
				max: 10,
				step: 0.1,
				default: 0.3
			}),
			Select({
				attribute: 'IsManualLowGear',
				selector: 'gearboxParams',
				text: texts.lowerManualGear,
				desc: descs.lowerManualGear,
				default: 'false'
			}, [
				Opt({
					text: texts.allow,
					value: 'true'
				}),
				Opt({
					text: texts.notAllow,
					value: 'false'
				})
			]),
			Group({
				name: texts.gearboxParams,
				defaultSelector: 'gearboxParams'
			}, [
				Select({
					attribute: 'IsHighGearExists',
					text: texts.highGear,
					desc: descs.highGear,
					default: 'true'
				}, [
					Opt({
						text: texts.allow,
						value: 'true'
					}),
					Opt({
						text: texts.notAllow,
						value: 'false'
					})
				]),
				Select({
					attribute: 'IsLowerGearExists',
					text: texts.lowerGear,
					desc: descs.lowerGear,
					default: 'true'
				}, [
					Opt({
						text: texts.allow,
						value: 'true'
					}),
					Opt({
						text: texts.notAllow,
						value: 'false'
					})
				]),
				Select({
					attribute: 'IsLowerPlusGearExists',
					text: texts.lowerPlusGear,
					desc: descs.lowerPlusGear,
					default: 'true'
				}, [
					Opt({
						text: texts.allow,
						value: 'true'
					}),
					Opt({
						text: texts.notAllow,
						value: 'false'
					})
				]),
				Select({
					attribute: 'IsLowerMinusGearExists',
					text: texts.lowerMinusGear,
					desc: descs.lowerMinusGear,
					default: 'true'
				}, [
					Opt({
						text: texts.allow,
						value: 'true'
					}),
					Opt({
						text: texts.notAllow,
						value: 'false'
					})
				])
			]),
			Group({
				name: texts.gears
			}, [
				Group({
					name: texts.reverceGear,
					defaultSelector: 'reverseGear'
				}, [
					Input({
						attribute: 'AngVel',
						text: texts.angelVelocity,
						desc: descs.angelVelocity,
						numberType: 'float',
						max: 32,
						step: 1,
						bold: true,
						default: 0
					}),
					Input({
						attribute: 'FuelModifier',
						text: texts.fuelModifier,
						desc: descs.fuelModifier,
						numberType: 'float',
						max: 10,
						step: 0.1,
						default: 1
					})
				]),
				Group({
					name: texts.highGear,
					defaultSelector: 'highGear'
				}, [
					Input({
						attribute: 'AngVel',
						text: texts.angelVelocity,
						desc: descs.angelVelocity,
						numberType: 'float',
						max: 32,
						step: 1,
						bold: true,
						default: 0
					}),
					Input({
						attribute: 'FuelModifier',
						text: texts.fuelModifier,
						desc: descs.fuelModifier,
						numberType: 'float',
						max: 10,
						step: 0.1,
						default: 1
					})
				]),
				Template({
					type: 'multiply',
					itemSelector: 'gear'
				}, [
					Group({
						name: '',
						defaultSelector: 'gearItem',
						withCounter: true
					}, [
						Input({
							attribute: 'AngVel',
							text: texts.angelVelocity,
							desc: descs.angelVelocity,
							numberType: 'float',
							max: 32,
							step: 1,
							bold: true,
							default: 0
						}),
						Input({
							attribute: 'FuelModifier',
							text: texts.fuelModifier,
							desc: descs.fuelModifier,
							numberType: 'float',
							max: 10,
							step: 0.1,
							default: 1
						})
					])
				])
			]),
			Group({
				name: texts.unlockGroupName,
				defaultSelector: 'gameData'
			}, [
				Input({
					attribute: 'Price',
					text: texts.price,
					desc: descs.price,
					bold: true
				}),
				Select({
					attribute: 'UnlockByExploration',
					text: texts.byExploration,
					desc: descs.byExploration,
					onlyDeveloper: true
				}, [
					Opt({
						text: texts.findOnMap,
						value: 'true'
					}),
					Opt({
						text: texts.byRank,
						value: 'false'
					})
				]),
				Input({
					attribute: 'UnlockByRank',
					text: texts.unlockByRank,
					desc: descs.unlockByRank,
					min: 1
				})
			])
		])
	])
}
