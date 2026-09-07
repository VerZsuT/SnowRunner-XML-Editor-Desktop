import { publishInstanceFunction, publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { GAME_TEXTS_TOKEN } from '@utilities/di/main/tokens'
import type { GameTexts } from './index'

export function publishGameTexts() {
	let instance: GameTexts
	const getInstance = () => instance ??= di.resolve(GAME_TEXTS_TOKEN)
	const className = 'GameTexts'

	publishInstanceVariable(className, 'object', getInstance)
	publishInstanceFunction(className, 'initFromInitial', getInstance)
	publishInstanceFunction(className, 'initFromMods', getInstance)
}
