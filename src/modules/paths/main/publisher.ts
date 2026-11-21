import { publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { PATHS_MANAGER_TOKEN } from '@utilities/di/main/tokens'
import { Paths, type IMainPathsManager } from './index'

/** Опубликовать {@link Paths}. */
export function publishPaths() {
	let instance: IMainPathsManager
	const getInstance = () => instance ??= di.resolve(PATHS_MANAGER_TOKEN)
	publishInstanceVariable(Paths, 'object', getInstance)
}
