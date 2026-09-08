import { initMain, mainMethod } from '@bridge/renderer'
import type { Updates as UpdatesMain } from './main'
import type { IRendererUpdates } from './types'

/** Работа с обновлениями программы. [renderer] */
@initMain()
export class Updates implements IRendererUpdates {
	@mainMethod()
	updateApp!: UpdatesMain['updateApp']
}
