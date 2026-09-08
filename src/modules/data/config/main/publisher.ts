import { publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { CONFIG_MANAGER_TOKEN } from '@utilities/di/main/tokens'
import type { IMainConfigManager } from '../types'
import type { Config } from './index'

/** Опубликовать {@link Config}. */
export function publishConfig() {
	let instance: IMainConfigManager
	const getInstance = () => instance ??= di.resolve(CONFIG_MANAGER_TOKEN)
	const className = 'Config'

	publishInstanceVariable(className, 'object', getInstance)
}
