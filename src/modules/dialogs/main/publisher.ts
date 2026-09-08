import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { DIALOGS_TOKEN } from '@utilities/di/main/tokens'
import type { IMainDialogs } from '../types'
import type { Dialogs } from './index'

/** Опубликовать {@link Dialogs}. */
export function publishDialogs() {
	let instance: IMainDialogs
	const getInstance = () => instance ??= di.resolve(DIALOGS_TOKEN)
	const className = 'Dialogs'

	publishInstanceFunction(className, 'getEPF', getInstance)
	publishInstanceFunction(className, 'saveEPF', getInstance)
	publishInstanceFunction(className, 'getInitial', getInstance)
	publishInstanceFunction(className, 'getDir', getInstance)
	publishInstanceFunction(className, 'getDirs', getInstance)
	publishInstanceFunction(className, 'getPaks', getInstance)
	publishInstanceFunction(className, 'getXML', getInstance)
}
