import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { DIRS_TOKEN, MODS_TOKEN } from '@utilities/di/main/tokens'
import { publishMainArray } from '@utilities/json-arrays/main/publisher'
import { publishFunction } from 'emr-bridge/main'
import type { PubType } from '../public'
import { PubKeys } from '../public'
import type { Mods } from './index'

/** Опубликовать {@link Mods}. */
export function publishMods() {
	let instance: Mods
	const getInstance = () => instance ??= di.resolve(MODS_TOKEN)
	const className = 'Mods'

	publishMainArray(className, getInstance)
	publishInstanceFunction(className, 'procMods', getInstance)
	publishFunction<PubType[PubKeys.findMods]>(PubKeys.findMods, async dirPath => {
		return (await getInstance().findMods(di.resolve(DIRS_TOKEN).new(dirPath)))
			.map(([mod, name]) => [mod.path, name])
	})
	publishFunction<PubType[PubKeys.getAllMods]>(PubKeys.getAllMods, async () => {
		return (await getInstance().getAllMods())
			.map(([mod, name]) => [mod.path, name])
	})
}
