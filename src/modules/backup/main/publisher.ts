import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { BACKUP_TOKEN } from '@utilities/di/main/tokens'
import type { Backup } from './index'

/** Опубликовать {@link Backup}. */
export function publishBackup() {
	let instance: Backup
	const getInstance = () => instance ??= di.resolve(BACKUP_TOKEN)
	const className = 'Backup'

	publishInstanceFunction(className, 'save', getInstance)
	publishInstanceFunction(className, 'recoverFromIt', getInstance)
}
