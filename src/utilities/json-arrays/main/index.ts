import type { IFile } from '@modules/files/main'
import type { IRepository } from '@src/types'
import { BaseArray } from '../base'
import type { IArrayJSON, IBaseMainArray } from '../types'
import { BaseMainArrayRepository } from './repository'

/** Базовый класс для массива в main-process. */
export abstract class BaseMainArray<Item, Extended = Item>
	extends BaseArray<Item, Extended>
	implements IBaseMainArray<Item, Extended> {
	/** Версия JSON файла. */
	protected readonly VERSION = '1.0'

	/** Репозиторий. */
	protected repository!: IRepository<IArrayJSON>

	/** Файл для записи/чтения массива. */
	protected abstract jsonFile: IFile

	/**
	 * Инициализировать экземпляр класса.
	 * @returns Экземпляр класса.
	 */
	protected init() {
		this.repository = new BaseMainArrayRepository(this.jsonFile)
		this.set(this.getArray())
	}

	async reset() {
		this.set(this.default)
	}

	async save() {
		await this.repository.save({
			version: this.VERSION,
			data: this.get()
		})
	}

	/**
	 * Преобразовать к новой версии.
	 * @param data Данные.
	 * @returns Преобразованные данные.
	 */
	protected convertToNewest(data: any) {
		return data
	}

	/**
	 * Получить массив.
	 * @returns Массив.
	 */
	private getArray(): Item[] {
		try {
			return this.getFromJSON()
		} catch {
			return this.default
		}
	}

	/**
	 * Получить массив из JSON.
	 * @returns Массив.
	 */
	private getFromJSON(): Item[] {
		const fromJson = this.repository.readSync()

		if (!fromJson) {
			return this.default
		}

		return fromJson.version < this.VERSION
			? this.convertToNewest(fromJson.data)
			: fromJson.data
	}
}
