import { mainArrayAccessor, mainMethod } from '@bridge/renderer'
import { BaseArray } from './base'
import type { BaseMainArray } from './main'
import type { IBaseRendererArray } from './types'

/** Базовый класс для массива в renderer-process. */
export abstract class BaseRendererArray<Item, Extended = Item> extends BaseArray<Item, Extended> implements IBaseRendererArray<Item, Extended> {
	@mainArrayAccessor()
	override accessor arr: Item[] = []

	@mainMethod()
	reset!: BaseMainArray<Item, Extended>['reset']

	@mainMethod()
	save!: BaseMainArray<Item, Extended>['save']
}
