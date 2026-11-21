import type { IMainFile as IFile } from '@modules/files/main'
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
	private mods = { ...this.default.mods }

	constructor() {
		const { initial, mods } = this.getFileSizes()

		this.initial = initial
		this.mods = mods
	}

	set(sizes: IFileSizes) {
		const valid = this.sanitize(sizes)

		this.initial = valid.initial
		this.mods = valid.mods
	}

	getModSize(modFile: IFile): number | undefined {
		return Object.hasOwn(this.mods, modFile.name)
			? this.mods[modFile.name]
			: undefined
	}

	setModSize(modFile: IFile, size: number) {
		if (!Number.isFinite(size) || size < 0) {
			return
		}

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
		return this.sanitize(this.repository.readSync())
	}

	/**
	 * Привести размеры к валидному виду.
	 * @param sizes Размеры.
	 * @returns Валидные размеры.
	 */
	private sanitize(sizes?: Partial<IFileSizes> | null): IFileSizes {
		const initial = typeof sizes?.initial === 'number' && Number.isFinite(sizes.initial) && sizes.initial >= 0
			? sizes.initial
			: 0
		const mods: IFileSizes['mods'] = Object.create(null)

		if (sizes?.mods && typeof sizes.mods === 'object' && !Array.isArray(sizes.mods)) {
			for (const [name, size] of Object.entries(sizes.mods)) {
				if (typeof size === 'number' && Number.isFinite(size) && size >= 0) {
					mods[name] = size
				}
			}
		}

		return { initial, mods }
	}
}