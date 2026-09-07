import { mainArrayAccessor, mainMethod } from '@bridge/renderer'
import { ArrayBase } from './base'
import type { MainArrayBase } from './main'

/** Базовый класс для массива в renderer-process. */
export abstract class RendArrayBase<Item, Extended = Item> extends ArrayBase<Item, Extended> {
  @mainArrayAccessor()
  accessor arr: Item[] = []

  /** Вернуть массив в исходное состояние. */
  @mainMethod()
  reset!: MainArrayBase<Item, Extended>['reset']

  /** Сохранить изменения в json. */
  @mainMethod()
  save!: MainArrayBase<Item, Extended>['save']
}
