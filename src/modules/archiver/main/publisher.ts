import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { ARCHIVER_TOKEN } from '@utilities/di/main/tokens'
import type { IMainArchiver } from '../types'
import { Archive } from './index'

/** Опубликовать {@link Archive}. */
export function publishArchive() {
	let instance: IMainArchiver
	const getInstance = () => instance ??= di.resolve(ARCHIVER_TOKEN)
	publishInstanceFunction(Archive, 'updateFiles', getInstance)
	publishInstanceFunction(Archive, 'unpack', getInstance)
	publishInstanceFunction(Archive, 'unpackMain', getInstance)
}
