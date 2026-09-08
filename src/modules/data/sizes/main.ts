import type { IFile } from '@modules/files/main'
import { SizesRepository } from './repository'
import type { IFileSizes, ISizes } from './types'

/** Работа с массивом размеров архивов. [main] */
export class Sizes implements ISizes {
	/** Репозиторий. */
	private readonly repository = new SizesRepository()

	readonly default: IFileSizes = {
		initial: 0,
		mods: {}
	}

	initial = this.default.initial

	/** Размеры модов. */
	private mods = this.default.mods

	constructor() {
		const { initial, mods } = this.getFileSizes()

		this.initial = initial
		this.mods = mods
	}

	set(sizes: IFileSizes) {
		this.initial = sizes.initial
		this.mods = { ...sizes.mods }
	}

	getModSize(modFile: IFile): number | undefined {
		return this.mods[modFile.name]
	}

	setModSize(modFile: IFile, size: number) {
		this.mods[modFile.name] = size
	}

	async reset() {
		this.set(this.default)
	}

	save() {
		return this.repository.save({
			initial: this.initial,
			mods: this.mods
		})
	}

	/**
	 * Получить размеры.
	 * @returns Размеры.
	 */
	private getFileSizes(): IFileSizes {
		try {
			return this.getFromJSON()
		} catch {
			return this.default
		}
	}

	/**
	 * Получить размеры из JSON.
	 * @returns Размеры.
	 */
	private getFromJSON(): IFileSizes {
		return this.repository.readSync() ?? this.default
	}
}
