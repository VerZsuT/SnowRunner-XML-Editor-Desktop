import type { IMainFile as IFile } from '@modules/files/main'
import { createAutoSaver } from '@utilities/autosave/main'
import { makeReactive } from '@utilities/bridge/main'
import { STORAGE_VERSION, toVersionedJSON, toVersionNumber } from '@utilities/storage'
import { BaseArray } from '../base'
import type { IArrayRepository, IBaseMainArray } from '../types'
import { BaseMainArrayRepository } from './repository'

/** Базовый класс для массива в main-process. */
export abstract class BaseMainArray<Item, Extended = Item>
	extends BaseArray<Item, Extended>
	implements IBaseMainArray<Item, Extended> {
	/** Версия формата JSON файла. */
	protected readonly VERSION = STORAGE_VERSION

	/** Репозиторий. */
	protected repository!: IArrayRepository

	/** Файл для записи/чтения массива. */
	protected abstract jsonFile: IFile

	/** Автосохранение после изменения массива. */
	private readonly autoSaver = createAutoSaver(() => this.save())

	/** Разрешено ли автосохранение (после загрузки данных). */
	private autoSaveEnabled = false

	protected constructor() {
		super()
		makeReactive(this, 'arr', () => {
			if (this.autoSaveEnabled) {
				this.autoSaver.schedule()
			}
		})
	}

	/**
	 * Инициализировать экземпляр класса.
	 * @returns Экземпляр класса.
	 */
	protected init() {
		this.repository = new BaseMainArrayRepository(this.jsonFile)
		this.set(this.getArray())
		this.autoSaveEnabled = true
	}

	async reset() {
		this.set(this.default)
	}

	async save() {
		this.autoSaver.cancel()
		await this.repository.save(toVersionedJSON(this.get()))
	}

	/** Сохранить данные немедленно (без ожидания автосохранения). */
	async flush() {
		this.autoSaver.cancel()
		await this.save()
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
	 * Получить массив из JSON. Принимает новый и legacy форматы.
	 * @returns Массив.
	 */
	private getFromJSON(): Item[] {
		const raw = this.repository.readSync()

		// Legacy: голый массив.
		if (Array.isArray(raw)) {
			return this.convertToNewest(raw)
		}

		if (!raw || typeof raw !== 'object') {
			return this.default
		}

		const file = raw as { version?: unknown; items?: unknown; data?: unknown }
		// Legacy: { version, data }, новый: { version, items }.
		const items = file.items ?? file.data

		if (!Array.isArray(items)) {
			return this.default
		}

		return toVersionNumber(file.version) < this.VERSION
			? this.convertToNewest(items)
			: items
	}
}
