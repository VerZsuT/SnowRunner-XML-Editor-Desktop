import {
	Template,
	Group,
	Input,
	Select,
	Selectors,
	forEach,
	TemplateType,
	NameType,
	InputType,
	NumberType
} from '../../service'
import unlockGroup from '../presets/unlockGroup'
import {
	descs,
	texts
} from './texts'

const selectors = Selectors(() => {
	const winch = 'WinchVariants.Winch'
	const currentWinch = `${winch}${forEach}`
	const currentWinchText = `${currentWinch}.GameData.UiDesc`
	const gameData = `${currentWinch}.GameData`
	return {winch, currentWinch, currentWinchText, gameData}
})

export default <ITemplate> {
	selector: 'WinchVariants',
	template: Template({
		type: TemplateType.multiply,
		itemSelector: selectors.winch,
		selectors: selectors
	}, [
		Group({
			nameType: NameType.computed,
			nameAttribute: 'UiName',
			resNameAttribute: 'Name',
			nameSelector: selectors.currentWinchText,
			resNameSelector: selectors.currentWinch,
			defaultSelector: selectors.currentWinch
		}, [
			Input({
				attribute: 'Name',
				type: InputType.text,
				text: texts.id,
				desc: descs.id,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Length',
				numberType: NumberType.integer,
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
			Input({
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
}
