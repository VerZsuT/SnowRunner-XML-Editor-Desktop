import { Bridge } from 'emr-bridge/renderer'

import ArrayBase from './base'

/** Базовый класс для массива в renderer-process */
export default abstract class RendArrayBase<Item, Extended = Item> extends ArrayBase<Item, Extended> {
  /** Мост main-rend */
  private readonly _Bridge = Bridge.as<any>()

  /** Ключ получения массива */
  protected abstract arrayKey: string
  /** Ключ подписки на событие изменения массива */
  protected abstract onChangeKey: string
  /** Ключ вызова события изменения массива */
  protected abstract emitChangeKey: string
  /** Ключ функции сброса массива */
  protected abstract resetKey: string
  /** Ключ функции сохранения массива */
  protected abstract saveKey: string

  /** Инициализация объекта */
  protected init() {
    this.rawSet(this._Bridge[this.arrayKey])
    this.handleChange()
  }

  /** Возвращает массив в исходное состояние */
  async reset() { await this._Bridge[this.resetKey]() }

  /** Сохраняет изменения в json */
  async save() {
    this.emitChangeEvent()
    await this._Bridge[this.saveKey]()
  }

  protected override emitChangeEvent() {
    this._Bridge[this.emitChangeKey](this.get())
  }

  protected override onChangeEvent(handler: (newArray: Item[]) => void) {
    this._Bridge[this.onChangeKey](handler)
  }
}
