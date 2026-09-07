import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { ARCHIVE_TOKEN } from '@utilities/di/main/tokens'
import type { Archive } from './index'

/** Опубликовать {@link Archive}. */
export function publishArchive() {
	let instance: Archive
	const getInstance = () => instance ??= di.resolve(ARCHIVE_TOKEN)
	const className = 'Archive'

	publishInstanceFunction(className, 'updateFiles', getInstance)
	publishInstanceFunction(className, 'unpack', getInstance)
	publishInstanceFunction(className, 'unpackMain', getInstance)
}
