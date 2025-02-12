/** Базовый класс для массива */
export default abstract class ArrayBase<Item, Converted = Item> implements Iterable<Converted> {
  /** Исходный массив */
  protected accessor arr: Item[] = []

  /** Значение по умолчанию */
  get default(): Item[] {
    return []
  }

  /** Длина массива */
  get length(): number {
    return this.arr.length
  }

  /** Преобразованный массив */
  get converted(): Converted[] {
    return this.arr.map(item => this.convert(item))
  }

  *[Symbol.iterator](): IterableIterator<Converted> {
    for (const item of this.arr) {
      yield this.convert(item)
    }
  }

  /** Преобразователь типа */
  protected convert(item: Item): Converted {
    return item as unknown as Converted
  }

  /** Возвращает массив */
  get(): Item[] {
    return [...this.arr]
  }

  /** Устанавливает переданный массив */
  set(array: Item[]) {
    this.arr = [...array]
  }

  /** Добавляет элемент в конец массива, и возвращает новую длину массива. */
  push(...items: Item[]): number {
    this.arr = [...this.arr, ...items]

    return this.arr.length
  }

  /** Возвращает элементы, соответствующие условию в переданной функции. */
  filter(predicate: (item: Item, index: number, arr: Item[]) => unknown) {
    return this.arr.filter(predicate)
  }

  /** Возвращает первый элемент, соответствующий условию в переданной функции */
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
  clear() {
    this.set([])
  }
}
