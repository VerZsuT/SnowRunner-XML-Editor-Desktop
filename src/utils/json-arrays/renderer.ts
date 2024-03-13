import { Bridge } from 'emr-bridge/renderer'

import ArrayBase from './base'

const Main = Bridge.as<any>()

/** Базовый класс для массива в renderer-process */
export default abstract class RendArrayBase<Item, Extended = Item> extends ArrayBase<Item, Extended> {
  constructor(
    /** Ключ получения массива */
    protected readonly arrayKey: string,
    /** Ключ подписки на событие изменения массива */
    protected readonly onChangeKey: string,
    /** Ключ вызова события изменения массива */
    protected readonly emitChangeKey: string,
    /** Ключ функции сброса массива */
    protected readonly resetKey: string,
    /** Ключ функции сохранения массива */
    protected readonly saveKey: string
  ) {
    super()
    this.init()
  }

  /** Инициализация объекта */
  protected init() {
    this.rawSet(Main[this.arrayKey])
    this.handleChange()
  }

  /** Возвращает массив в исходное состояние */
  async reset() { await Main[this.resetKey]() }

  /** Сохраняет изменения в json */
  async save() {
    this.emitChangeEvent()
    await Main[this.saveKey]()
  }

  /** Вызвать событие изменения */
  protected override emitChangeEvent() {
    Main[this.emitChangeKey](this.get())
  }

  /** Отследить событие изменения */
  protected override onChangeEvent(handler: (newArray: Item[]) => void) {
    Main[this.onChangeKey](handler)
  }
}
