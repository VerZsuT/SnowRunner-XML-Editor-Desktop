/** Базовый класс для массива. */
export default abstract class ArrayBase<Item, Converted = Item> implements Iterable<Converted> {
  /** Исходный массив. */
  protected accessor arr: Item[] = []

  /** Значение по умолчанию. */
  get default(): Item[] {
    return []
  }

  /** Длина массива. */
  get length(): number {
    return this.arr.length
  }

  /** Преобразованный массив. */
  get converted(): Converted[] {
    return this.arr.map(item => this.convert(item))
  }

  *[Symbol.iterator](): IterableIterator<Converted> {
    for (const item of this.arr) {
      yield this.convert(item)
    }
  }

  /**
   * Преобразовать элемент в выходной тип.
   * @param item Элемент.
   * @returns Выходной элемент.
   */
  protected convert(item: Item): Converted {
    return item as unknown as Converted
  }

  /**
   * Получить массив.
   * @returns Массив.
   */
  get(): Item[] {
    return [...this.arr]
  }

  /**
   * Устанавливает массив.
   * @param array Новый массив.
   */
  set(array: Item[]) {
    this.arr = [...array]
  }

  /**
   * Добавить элементы в конец массива.
   * @param items Элементы.
   * @returns Новая длина массива.
   */
  push(...items: Item[]): number {
    this.arr = [...this.arr, ...items]

    return this.arr.length
  }

  /**
   * Отфильтровать элементы по условию.
   * @param predicate Условие.
   * @returns Элементы, соответствующие условию.
   */
  filter(predicate: (item: Item, index: number, arr: Item[]) => unknown) {
    return this.arr.filter(predicate)
  }

  /**
   * Найти первый элемент по условию.
   * @param predicate Условие.
   * @returns Элемент, соответствующий условию.
   */
  find(predicate: (value: Item, index: number, arr: Item[]) => unknown) {
    return this.arr.find(predicate)
  }

  /**
   * Есть ли элемент, соответствующий условию.
   * @param predicate Условие.
   * @returns Есть ли элемент, соответствующий условию.
   */
  some(predicate: (value: Item, index: number, arr: Item[]) => unknown) {
    return this.arr.some(predicate)
  }

  /**
   * Есть ли элемент в массиве.
   * @param item Элемент.
   * @returns Есть ли элемент в массиве.
   */
  includes(item: Item): boolean {
    return this.arr.includes(item)
  }

  /**
   * Получить входные точки.
   * @returns Входные точки.
   */
  entries() {
    return this.arr.entries()
  }

  /**
   * Удалить элемент по индексу.
   * @param index Индекс.
   */
  removeAt(index: number) {
    this.set(this.filter((_, i) => i !== index))
  }

  /**
   * Найти и удалить элемент по условию.
   * @param predicate Условие.
   */
  findAndRemove(predicate: (value: Item, index: number, object: Item[]) => boolean) {
    this.set(this.filter((...args) => !predicate(...args)))
  }

  /** Очистить массив. */
  clear() {
    this.set([])
  }
}
