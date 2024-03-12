import { shallowRef, triggerRef } from 'vue'

/** Базовый класс для массива */
export default abstract class ArrayBase<Item, Converted = Item> {
  /** Исходный массив */
  protected arr: Item[] = []
  /** Реактивная ссылка на объект */
  protected thisRef = shallowRef(this)

  /** Значение по умолчанию */
  get default(): Item[] { return [] }

  /** Реактивная ссылка */
  get ref() { return this.thisRef.value }

  /** Длина массива */
  get length(): number { return this.arr.length }

  /** Преобразованный массив */
  get converted(): Converted[] {
    return this.arr.map(item => this.convert(item))
  }

  *[Symbol.iterator](): IterableIterator<Converted> {
    for (const item of this.arr) {
      yield this.convert(item)
    }
  }

  /** Отследить изменение */
  protected handleChange() {
    this.onChangeEvent(newArray => {
      this.rawSet(newArray)
    })
  }

  /** Преобразователь типа */
  protected convert(item: Item): Converted {
    return item as unknown as Converted
  }

  /** Возвращает массив */
  get(): Item[] { return [...this.arr] }

  /** Устанавливает переданный массив */
  set(array: Item[]) {
    this.rawSet(array)
    this.emitChangeEvent(this.get())
  }

  /** Устанавливает переданный массив без вызова события изменения */
  rawSet(array: Item[]) {
    this.arr = [...array]
    triggerRef(this.thisRef)
  }

  /** Добавляет элемент в конец массива, и возвращает новую длину массива. */
  push(...items: Item[]): number {
    const result = this.arr.push(...items)

    triggerRef(this.thisRef)
    this.emitChangeEvent(this.get())

    return result
  }

  /** Возвращает элементы, соответствующие условию в переданной функции. */
  filter(predicate: (item: Item, index: number, arr: Item[]) => unknown) {
    return this.arr.filter(predicate)
  }

  /** Возаращает первый элемент, соответвующий условию в переданной функции */
  find(predicate: (value: Item, index: number, arr: Item[]) => unknown) {
    return this.arr.find(predicate)
  }

  /** Имеется ли элемент, соответствующий условию в переданной функции */
  some(predicate: (value: Item, index: number, arr: Item[]) => unknown) {
    return this.arr.some(predicate)
  }

  /** Имеется ли элемент в массиве */
  includes(item: Item): boolean {
    return this.arr.includes(item)
  }

  /** Входные точки */
  entries() {
    return this.arr.entries()
  }

  /** Удаляет элемент по индексу */
  removeAt(index: number) {
    this.set(this.filter((_, i) => i !== index))
  }

  /** Находит элемент и удаляет его из массива */
  findAndRemove(predicate: (value: Item, index: number, object: Item[]) => boolean) {
    this.set(this.filter((...args) => !predicate(...args)))
  }

  /** Очищает массив */
  clear() { this.set([]) }

  /** Функция вызова события изменения массива */
  protected abstract emitChangeEvent(newArray: Item[]): void
  /** Функция подписки на событие изменения массива */
  protected abstract onChangeEvent(handler: (newArray: Item[]) => void): void
}
