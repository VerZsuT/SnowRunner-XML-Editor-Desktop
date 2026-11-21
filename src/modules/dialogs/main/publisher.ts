import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { DIALOGS_TOKEN } from '@utilities/di/main/tokens'
import type { IMainDialogs } from '../types'
import { Dialogs } from './index'

/** Опубликовать {@link Dialogs}. */
export function publishDialogs() {
	let instance: IMainDialogs
	const getInstance = () => instance ??= di.resolve(DIALOGS_TOKEN)
	publishInstanceFunction(Dialogs, 'getEPF', getInstance)
	publishInstanceFunction(Dialogs, 'saveEPF', getInstance)
	publishInstanceFunction(Dialogs, 'getInitial', getInstance)
	publishInstanceFunction(Dialogs, 'getDir', getInstance)
	publishInstanceFunction(Dialogs, 'getDirs', getInstance)
	publishInstanceFunction(Dialogs, 'getPaks', getInstance)
	publishInstanceFunction(Dialogs, 'getXML', getInstance)
}
