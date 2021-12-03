import {
	Template,
	Group,
	Select,
	ForEach,
	Number,
	Text
} from '../items'
import { NameType, NumberType } from '../enums'
import { getSelectors } from '../service'
import { descs, texts } from './texts'
import { unlockGroup } from '../presets'

const selectors = getSelectors(function() {
	const winch = `WinchVariants.Winch${this.forEach}`
	const winchText = `${winch}.GameData.UiDesc`
	const gameData = `${winch}.GameData`
	return {winch, winchText, gameData}
})

export default <ITemplate> {
	selector: 'WinchVariants',
	template: Template(selectors, [
		ForEach(selectors.winch, [
			Group({
				nameType: NameType.computed,
				nameAttribute: 'UiName',
				resNameAttribute: 'Name',
				nameSelector: selectors.winchText,
				resNameSelector: selectors.winch,
				defaultSelector: selectors.winch
			}, [
				Text({
					attribute: 'Name',
					text: texts.id,
					desc: descs.id,
					onlyDev: true
				}),
				Number({
					attribute: 'Length',
					type: NumberType.integer,
					text: texts.length,
					desc: descs.length,
					max: 100,
					default: 14,
					areas: {
						yellow: [[30, 50]],
						red: [[51, 100]]
					},
					bold: true
				}),
				Number({
					attribute: 'StrengthMult',
					text: texts.strengthMult,
					desc: descs.strengthMult,
					max: 10,
					default: 1,
					areas: {
						yellow: [[2, 5]],
						red: [[5.1, 10]]
					},
					bold: true
				}),
				Select({
					attribute: 'IsEngineIgnitionRequired',
					text: texts.isEngineIgnitionRequired,
					desc: descs.isEngineIgnitionRequired,
					options: {
						true: texts.engine,
						false: texts.battery
					},
					default: 'true',
					bold: true
				}),
				unlockGroup(selectors.gameData)
			])
		])
	])
}
