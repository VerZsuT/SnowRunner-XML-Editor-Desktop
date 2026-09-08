import { publishInstanceVariable } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { LOADING_TOKEN } from '@utilities/di/main/tokens'
import type { IMainLoading } from '../types'
import type { Loading } from './index'

/** Опубликовать {@link Loading}. */
export function publishLoading() {
	let instance: IMainLoading
	const getInstance = () => instance ??= di.resolve(LOADING_TOKEN)
	const className = 'Loading'

	publishInstanceVariable(className, 'state', getInstance)
}
