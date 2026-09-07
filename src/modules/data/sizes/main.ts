import type { Files, IFile } from '@modules/files/main'
import { inject } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/main/tokens'
import type { IFileSizes } from './types'

export type * from './types'

/**
 * Работа с массивом размеров архивов.
 * _main process_
 */
export class Sizes {
	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: Files

  /** Значение по умолчанию. */
  readonly default: IFileSizes = {
    initial: 0,
    mods: {}
  }

  /** Размер initial.pak. */
  initial = this.default.initial

  /** Размеры модов. */
  private mods = this.default.mods

  constructor() {
    this.init()
  }

  /** Инициализировать класс. */
  private init() {
    const { initial, mods } = this.getFileSizes()

    this.initial = initial
    this.mods = mods
  }

  /**
   * Установить размеры.
   * @param sizes Размеры.
   */
  set(sizes: IFileSizes) {
    this.initial = sizes.initial
    this.mods = { ...sizes.mods }
  }

  /**
   * Получить размер мода.
   * @param modFile Файл мода.
   * @returns Размер мода.
   */
  getModSize(modFile: IFile): number | undefined {
    return this.mods[modFile.name]
  }

  /**
   * Установить размер мода.
   * @param modFile Файл мода.
   * @param size Размер.
  */
  setModSize(modFile: IFile, size: number) {
    this.mods[modFile.name] = size
  }

  /** Сбросить все размеры. */
  async reset() {
    this.set(this.default)
    await this.save()
  }

  /** Сохранить изменения размеров. */
  async save() {
    await this.files.sizes.writeToJSON({
      initial: this.initial,
      mods: this.mods
    } satisfies IFileSizes)
  }

  /**
   * Получить размеры.
   * @returns Размеры.
   */
  private getFileSizes(): IFileSizes {
    if (this.files.sizes.existsSync()) {
      try {
        return this.getFromJSON()
      } catch {
        return this.default
      }
    }

    return this.default
  }

  /**
   * Получить размеры из JSON.
   * @returns Размеры.
   */
  private getFromJSON(): IFileSizes {
    return this.files.sizes.readFromJSONSync<IFileSizes>()
  }
}
