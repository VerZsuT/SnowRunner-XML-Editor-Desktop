import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { CHECKS_TOKEN } from '@utilities/di/main/tokens'
import type { IMainChecks } from '../types'
import type { Checks } from './index'

/** Опубликовать {@link Checks}. */
export function publishChecks() {
	let instance: IMainChecks
	const getInstance = () => instance ??= di.resolve(CHECKS_TOKEN)
	const className = 'Checks'

	publishInstanceFunction(className, 'hasAdminPrivileges', getInstance)
	publishInstanceFunction(className, 'checkInitialChanges', getInstance)
	publishInstanceFunction(className, 'checkUpdate', getInstance)
}
