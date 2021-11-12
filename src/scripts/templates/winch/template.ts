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
	winch: 'WinchVariants.Winch',
	winchItem: '{winch}#every',
	winchItemText: '{winchItem}.GameData.UiDesc',
	gameData: '{winchItem}.GameData'
})

export default <ITemplate> {
	selector: 'WinchVariants',
	template: Template({
		type: 'multiply',
		itemSelector: 'winch',
		selectors: selectors
	}, [
		Group({
			nameType: 'computed',
			nameSelector: 'winchItemText',
			resNameSelector: 'winchItem',
			nameAttribute: 'UiName',
			resNameAttribute: 'Name',
			defaultSelector: 'winchItem'
		}, [
			Input({
				attribute: 'Name',
				text: texts.id,
				desc: descs.id,
				type: 'text',
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Length',
				text: texts.length,
				desc: descs.length,
				min: 0,
				step: 1,
				max: 100,
				bold: true,
				default: 14,
				areas: {
					yellow: [[30, 50]],
					red: [[51, 100]]
				}
			}),
			Input({
				attribute: 'StrengthMult',
				text: texts.strengthMult,
				desc: descs.strengthMult,
				min: 0,
				step: 0.1,
				max: 10,
				bold: true,
				default: 1,
				areas: {
					yellow: [[2, 5]],
					red: [[5.1, 10]]
				}
			}),
			Select({
				attribute: 'IsEngineIgnitionRequired',
				text: texts.isEngineIgnitionRequired,
				desc: descs.isEngineIgnitionRequired,
				bold: true,
				default: 'true'
			}, [
				Opt({
					text: texts.engine,
					value: 'true'
				}),
				Opt({
					text: texts.battery,
					value: 'false'
				})
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
					text: texts.unlockByExploration,
					desc: descs.unlockByExploration,
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
