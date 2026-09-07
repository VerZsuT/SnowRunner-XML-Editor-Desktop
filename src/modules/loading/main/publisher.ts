import { publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { LOADING_TOKEN } from '@utilities/di/main/tokens'
import type { Loading } from './index'

export function publishLoading() {
	let instance: Loading
	const getInstance = () => instance ??= di.resolve(LOADING_TOKEN)
	const className = 'Loading'

	publishInstanceVariable(className, 'state', getInstance)
}
