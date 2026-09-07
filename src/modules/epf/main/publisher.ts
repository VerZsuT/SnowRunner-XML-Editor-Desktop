import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { EPF_TOKEN } from '@utilities/di/main/tokens'
import type { EPF } from './index'

/** Опубликовать {@link EPF}. */
export function publishEPF() {
	let instance: EPF
	const getInstance = () => instance ??= di.resolve(EPF_TOKEN)
	const className = 'EPF'

	publishInstanceFunction(className, 'join', getInstance)
	publishInstanceFunction(className, 'see', getInstance)
}
