import { initMain, mainMethod } from '@bridge/renderer'
import type { Updates as UpdatesMain } from './main'
import type { IRendererUpdates } from './types'

/** Работа с обновлениями программы. [renderer] */
@initMain()
export class Updates implements IRendererUpdates {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'Updates'
	@mainMethod()
	updateApp!: UpdatesMain['updateApp']
}
