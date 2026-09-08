import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { EPF_TOKEN } from '@utilities/di/main/tokens'
import type { IMainEpf } from '../types'
import type { Epf } from './index'

/** Опубликовать {@link Epf}. */
export function publishEPF() {
	let instance: IMainEpf
	const getInstance = () => instance ??= di.resolve(EPF_TOKEN)
	const className = 'Epf'

	publishInstanceFunction(className, 'join', getInstance)
	publishInstanceFunction(className, 'see', getInstance)
}
