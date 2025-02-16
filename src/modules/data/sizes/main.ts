import type { IFileSizes } from './types'
import type { IFile } from '/mods/files/main'
import { Files } from '/mods/files/main'

export type * from './types'

/**
 * Работа с массивом размеров архивов.  
 * _main process_
 */
class Sizes {
  /** Готов ли класс к использованию. */
  readonly isReady: Promise<typeof this>

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
    this.isReady = this.init()
  }

  /** Инициализировать класс. */
  private async init() {
    const { initial, mods } = await this.getFileSizes()

    this.initial = initial
    this.mods = mods
    
    return this
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
    await Files.sizes.writeToJSON({
      initial: this.initial,
      mods: this.mods
    } satisfies IFileSizes)
  }

  /**
   * Получить размеры.
   * @returns Размеры.
   */
  private async getFileSizes(): Promise<IFileSizes> {
    if (await Files.sizes.exists()) {
      try {
        return await this.getFromJSON()
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
  private async getFromJSON(): Promise<IFileSizes> {
    return await Files.sizes.readFromJSON<IFileSizes>()
  }
}

/**
 * Работа с массивом размеров архивов.  
 * _main process_
 */
export default await new Sizes().isReady
