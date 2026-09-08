import { publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { DLC_TOKEN } from '@utilities/di/main/tokens'
import type { IMainDlc } from '../types'
import type { Dlc } from './index'

/** Опубликовать {@link Dlc}. */
export function publishDLCs() {
	let instance: IMainDlc
	const getInstance = () => instance ??= di.resolve(DLC_TOKEN)
	const className = 'Dlc'

	publishInstanceVariable(className, 'arr', getInstance)
}
