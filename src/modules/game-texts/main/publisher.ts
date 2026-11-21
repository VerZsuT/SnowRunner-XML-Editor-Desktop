import { publishInstanceFunction, publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { GAME_TEXTS_TOKEN } from '@utilities/di/main/tokens'
import type { IMainGameTexts } from '../types'
import { GameTexts } from './index'

/** Опубликовать {@link GameTexts}. */
export function publishGameTexts() {
	let instance: IMainGameTexts
	const getInstance = () => instance ??= di.resolve(GAME_TEXTS_TOKEN)
	publishInstanceVariable(GameTexts, 'object', getInstance)
	publishInstanceFunction(GameTexts, 'initFromInitial', getInstance)
	publishInstanceFunction(GameTexts, 'initFromMods', getInstance)
}
