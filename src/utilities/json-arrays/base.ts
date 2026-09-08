import type { IBaseArray } from './types'

/** Базовый класс для массива. */
export abstract class BaseArray<Item, Converted = Item> implements IBaseArray<Item, Converted> {
	accessor arr: Item[] = []

	get default(): Item[] {
		return []
	}

	get length(): number {
		return this.arr.length
	}

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
	convert(item: Item): Converted {
		return item as unknown as Converted
	}

	get(): Item[] {
		return [...this.arr]
	}

	set(array: Item[]) {
		this.arr = [...array]
	}

	push(...items: Item[]): number {
		this.arr = [...this.arr, ...items]

		return this.arr.length
	}

	filter(predicate: (item: Item, index: number, arr: Item[]) => unknown) {
		return this.arr.filter(predicate)
	}

	find(predicate: (value: Item, index: number, arr: Item[]) => unknown) {
		return this.arr.find(predicate)
	}

	some(predicate: (value: Item, index: number, arr: Item[]) => unknown) {
		return this.arr.some(predicate)
	}

	includes(item: Item): boolean {
		return this.arr.includes(item)
	}

	entries() {
		return this.arr.entries()
	}

	removeAt(index: number) {
		this.set(this.filter((_, i) => i !== index))
	}

	findAndRemove(predicate: (value: Item, index: number, object: Item[]) => boolean) {
		this.set(this.filter((...args) => !predicate(...args)))
	}

	/** Очистить массив. */
	clear() {
		this.set([])
	}
}
