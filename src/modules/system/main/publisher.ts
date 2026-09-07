import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { SYSTEM_TOKEN } from '@utilities/di/main/tokens'
import type { System } from './index'

export function publishSystem() {
	let instance: System
	const getInstance = () => instance ??= di.resolve(SYSTEM_TOKEN)
	const className = 'System'

	publishInstanceFunction(className, 'userInfo', getInstance)
	publishInstanceFunction(className, 'openLink', getInstance)
	publishInstanceFunction(className, 'openFile', getInstance)
	publishInstanceFunction(className, 'openPath', getInstance)
}
