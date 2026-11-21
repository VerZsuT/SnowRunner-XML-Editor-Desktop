import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { EPF_TOKEN } from '@utilities/di/main/tokens'
import type { IMainEpf } from '../types'
import { Epf } from './index'

/** Опубликовать {@link Epf}. */
export function publishEPF() {
	let instance: IMainEpf
	const getInstance = () => instance ??= di.resolve(EPF_TOKEN)
	publishInstanceFunction(Epf, 'join', getInstance)
	publishInstanceFunction(Epf, 'see', getInstance)
}
