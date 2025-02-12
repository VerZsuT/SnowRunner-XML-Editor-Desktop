import type { IFileSizes } from './types'
import type { File } from '/mods/files/main'
import { Files } from '/mods/files/main'

export type * from './types'

/**
 * Работа с массивом размеров архивов  
 * _main process_
*/
class Sizes {
  readonly isReady: Promise<typeof this>

  /** Значение по умолчанию */
  readonly default: IFileSizes = {
    initial: 0,
    mods: {}
  }

  /** Размер initial.pak */
  initial = this.default.initial

  /** Размеры модов */
  private mods = this.default.mods

  constructor() {
    this.isReady = this.init()
  }

  /** Инициализация класса. */
  private async init() {
    const { initial, mods } = await this.getFileSizes()
    this.initial = initial
    this.mods = mods
    
    return this
  }

  /** Устанавливает объект размеров */
  set(sizes: IFileSizes) {
    this.initial = sizes.initial
    this.mods = { ...sizes.mods }
  }

  /**
   * Возвращает размер мода
   * @param modFile - файл мода
   */
  getModSize(modFile: File): number | undefined {
    return this.mods[modFile.name]
  }

  /**
   * Установить размер мода
   * @param modFile - файл мода
   * @param size - размер
  */
  setModSize(modFile: File, size: number) {
    this.mods[modFile.name] = size
  }

  /** Сбросить все размеры */
  async reset() {
    this.set(this.default)
    await this.save()
  }

  /** Сохранить изменения размеров */
  async save() {
    await Files.sizes.writeToJSON({
      initial: this.initial,
      mods: this.mods
    } satisfies IFileSizes)
  }

  /** Получить объект размеров */
  private async getFileSizes(): Promise<IFileSizes> {
    if (await Files.sizes.exists()) {
      try {
        return await this.getFromJSON()
      } catch {
        return this.default
      }
    } else {
      return this.default
    }
  }

  /** Получить из JSON */
  private async getFromJSON(): Promise<IFileSizes> {
    return await Files.sizes.readFromJSON<IFileSizes>()
  }
}

export default await new Sizes().isReady
