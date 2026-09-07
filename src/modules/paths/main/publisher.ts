import { publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { PATHS_TOKEN } from '@utilities/di/main/tokens'
import type { Paths } from './index'

export function publishPaths() {
	let instance: Paths
	const getInstance = () => instance ??= di.resolve(PATHS_TOKEN)
	const className = 'Paths'

	publishInstanceVariable(className, 'object', getInstance)
}
