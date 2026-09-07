import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { WINDOWS_TOKEN } from '@utilities/di/main/tokens'
import type { Windows } from './index'

export function publishWindows() {
	let instance: Windows
	const getInstance = () => instance ??= di.resolve(WINDOWS_TOKEN)
	const className = 'Windows'

	publishInstanceFunction(className, 'openWindow', getInstance)
}
