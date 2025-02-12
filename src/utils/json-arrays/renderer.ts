import { mainArrayAccessor, mainMethod } from '../renderer'
import ArrayBase from './base'

/** Базовый класс для массива в renderer-process */
export default abstract class RendArrayBase<Item, Extended = Item> extends ArrayBase<Item, Extended> {
  @mainArrayAccessor()
  protected accessor arr: Item[] = []

  /** Возвращает массив в исходное состояние */
  @mainMethod()
  reset!: () => Promise<void>

  /** Сохраняет изменения в json */
  @mainMethod()
  save!: () => Promise<void>
}
