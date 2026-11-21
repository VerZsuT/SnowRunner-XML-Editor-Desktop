import { publishInstanceFunction } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { BACKUP_TOKEN } from '@utilities/di/main/tokens'
import type { IMainInitialBackup } from '../types'
import { InitialBackup } from './index'

/** Опубликовать {@link InitialBackup}. */
export function publishBackup() {
	let instance: IMainInitialBackup
	const getInstance = () => instance ??= di.resolve(BACKUP_TOKEN)
	publishInstanceFunction(InitialBackup, 'save', getInstance)
	publishInstanceFunction(InitialBackup, 'recoverFromIt', getInstance)
}
