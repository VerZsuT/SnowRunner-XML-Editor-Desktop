import type { IResettable } from '@src/types'

/** JSON файл массива. */
export interface IArrayJSON {
	/** Версия файла. */
	version: string

	/** Данные массива. */
	data: any
}

/** Базовый массив. */
export interface IBaseArray<Item, Converted> extends Iterable<Converted> {
	/** Исходный массив. */
	arr: Item[]

	/** Значение по умолчанию. */
	default: Item[]

	/** Длина массива. */
	length: number

	/** Преобразованный массив. */
	converted: Converted[]

	/**
	 * Преобразовать элемент в выходной тип.
	 * @param item Элемент.
	 * @returns Выходной элемент.
	 */
	convert(item: Item): Converted

	/**
	 * Получить массив.
	 * @returns Массив.
	 */
	get(): Item[]

	/**
	 * Установить значение массива.
	 * @param array Новый массив.
	 */
	set(array: Item[]): void

	/**
	 * Добавить элементы в конец массива.
	 * @param items Элементы.
	 * @returns Новая длина массива.
	 */
	push(...items: Item[]): number

	/**
	 * Отфильтровать элементы по условию.
	 * @param predicate Условие.
	 * @returns Элементы, соответствующие условию.
	 */
	filter(predicate: (item: Item, index: number, arr: Item[]) => unknown): Item[]

	/**
	 * Найти первый элемент по условию.
	 * @param predicate Условие.
	 * @returns Элемент, соответствующий условию.
	 */
	find(predicate: (value: Item, index: number, arr: Item[]) => unknown): Item | undefined

	/**
	 * Есть ли элемент, соответствующий условию.
	 * @param predicate Условие.
	 * @returns Есть ли элемент, соответствующий условию.
	 */
	some(predicate: (value: Item, index: number, arr: Item[]) => unknown): boolean

	/**
	 * Есть ли элемент в массиве.
	 * @param item Элемент.
	 * @returns Есть ли элемент в массиве.
	 */
	includes(item: Item): boolean

	/**
	 * Получить входные точки.
	 * @returns Входные точки.
	 */
	entries(): ArrayIterator<[number, Item]>

	/**
	 * Удалить элемент по индексу.
	 * @param index Индекс.
	 */
	removeAt(index: number): void

	/**
	 * Найти и удалить элемент по условию.
	 * @param predicate Условие.
	 */
	findAndRemove(predicate: (value: Item, index: number, object: Item[]) => boolean): void

	/** Очистить массив. */
	clear(): void
}

/** Базовый массив. [main] */
export interface IBasePublicArray<Item> extends IResettable {
	/** Исходный массив. */
	arr: Item[]

	/** Сохранить изменения в json. */
	save(): Promise<void>
}

/** Базовый массив. [main] */
export interface IBaseMainArray<Item, Extended> extends IBaseArray<Item, Extended>, IBasePublicArray<Item> {}

/** Базовый массив. [renderer] */
export interface IBaseRendererArray<Item, Extended> extends IBaseArray<Item, Extended>, Omit<IBasePublicArray<Item>, 'arr'> {}

