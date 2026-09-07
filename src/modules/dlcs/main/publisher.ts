import { publishInstanceFunction, publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { DLC_TOKEN } from '@utilities/di/main/tokens'
import type { DLCs } from './index'

/** Опубликовать {@link DLCs}. */
export function publishDLCs() {
	let instance: DLCs
	const getInstance = () => instance ??= di.resolve(DLC_TOKEN)
	const className = 'DLCs'

	publishInstanceVariable(className, 'arr', getInstance)
	publishInstanceFunction(className, 'reset', getInstance)
}
