import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { SYSTEM_TOKEN } from '@utilities/di/main/tokens'
import type { IPublicSystem } from '../types'
import { System } from './index'

/** Опубликовать {@link System}. */
export function publishSystem() {
	let instance: IPublicSystem
	const getInstance = () => instance ??= di.resolve(SYSTEM_TOKEN)
	publishInstanceFunction(System, 'userInfo', getInstance)
	publishInstanceFunction(System, 'openLink', getInstance)
	publishInstanceFunction(System, 'openFile', getInstance)
	publishInstanceFunction(System, 'openPath', getInstance)
}
