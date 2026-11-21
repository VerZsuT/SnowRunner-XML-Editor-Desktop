import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { CHECKS_TOKEN } from '@utilities/di/main/tokens'
import type { IMainChecks } from '../types'
import { Checks } from './index'

/** Опубликовать {@link Checks}. */
export function publishChecks() {
	let instance: IMainChecks
	const getInstance = () => instance ??= di.resolve(CHECKS_TOKEN)
	publishInstanceFunction(Checks, 'checkDataAccess', getInstance)
	publishInstanceFunction(Checks, 'checkInitialChanges', getInstance)
	publishInstanceFunction(Checks, 'checkUpdate', getInstance)
}
