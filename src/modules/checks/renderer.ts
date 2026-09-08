import { initMain, mainMethod } from '@bridge/renderer'
import type { Checks as ChecksMain } from './main'
import type { IRendererChecks } from './types'

export type * from './types'

/** Разного рода проверки. [renderer] */
@initMain()
export class Checks implements IRendererChecks {
	@mainMethod()
	checkUpdate!: ChecksMain['checkUpdate']

	@mainMethod()
	hasAdminPrivileges!: ChecksMain['hasAdminPrivileges']

	@mainMethod()
	checkInitialChanges!: ChecksMain['checkInitialChanges']
}
