import { publishInstanceFunction, publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/main/tokens'
import type { Config } from './index'

/** Опубликовать {@link Config}. */
export function publishConfig() {
	let instance: Config
	const getInstance = () => instance ??= di.resolve(CONFIG_TOKEN)
	const className = 'Config'

	publishInstanceVariable(className, 'object', getInstance)
	publishInstanceFunction(className, 'save', getInstance)
	publishInstanceFunction(className, 'reset', getInstance)
}
