import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { WINDOWS_TOKEN } from '@utilities/di/main/tokens'
import type { IMainWindows } from '../types'
import type { Windows } from './index'

/** Опубликовать {@link Windows}. */
export function publishWindows() {
	let instance: IMainWindows
	const getInstance = () => instance ??= di.resolve(WINDOWS_TOKEN)
	const className = 'Windows'

	publishInstanceFunction(className, 'openWindow', getInstance)
}
