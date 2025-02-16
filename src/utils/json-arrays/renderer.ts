import { mainArrayAccessor, mainMethod } from '../renderer'
import ArrayBase from './base'
import type MainArrayBase from './main'

/** Базовый класс для массива в renderer-process. */
export default abstract class RendArrayBase<Item, Extended = Item> extends ArrayBase<Item, Extended> {
  @mainArrayAccessor()
  protected accessor arr: Item[] = []

  /** Вернуть массив в исходное состояние. */
  @mainMethod()
  reset!: MainArrayBase<Item, Extended>['reset']

  /** Сохранить изменения в json. */
  @mainMethod()
  save!: MainArrayBase<Item, Extended>['save']
}
