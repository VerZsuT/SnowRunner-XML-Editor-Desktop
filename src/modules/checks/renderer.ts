import { initMain, mainMethod } from '@bridge/renderer'
import type { Checks as ChecksMain } from './main'
import type { IRendererChecks } from './types'

export type * from './types'

/** Разного рода проверки. [renderer] */
@initMain()
export class Checks implements IRendererChecks {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'Checks'
	@mainMethod()
	checkUpdate!: ChecksMain['checkUpdate']

	@mainMethod()
	checkDataAccess!: ChecksMain['checkDataAccess']

	@mainMethod()
	checkInitialChanges!: ChecksMain['checkInitialChanges']
}
