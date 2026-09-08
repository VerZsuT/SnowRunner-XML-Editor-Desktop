import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { ARCHIVER_TOKEN } from '@utilities/di/main/tokens'
import type { IMainArchiver } from '../types'
import type { Archive } from './index'

/** Опубликовать {@link Archive}. */
export function publishArchive() {
	let instance: IMainArchiver
	const getInstance = () => instance ??= di.resolve(ARCHIVER_TOKEN)
	const className = 'Archive'

	publishInstanceFunction(className, 'updateFiles', getInstance)
	publishInstanceFunction(className, 'unpack', getInstance)
	publishInstanceFunction(className, 'unpackMain', getInstance)
}
