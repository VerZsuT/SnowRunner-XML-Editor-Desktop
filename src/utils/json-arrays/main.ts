import { publicField, publicMethod } from '../bridge/main'
import ArrayBase from './base'
import type { IArrayJSON } from './types'
import type { IFile } from '/mods/files/main'

/** Базовый класс для массива в main-process. */
export default abstract class MainArrayBase<Item, Extended = Item> extends ArrayBase<Item, Extended> {
  /** Готов ли массив к использованию. */
  isReady!: Promise<typeof this>

  @publicField()
  protected accessor arr: Item[] = []

  /** Версия JSON файла. */
  protected readonly version = '1.0'

  /** Файл для записи/чтения массива. */
  protected abstract jsonFile: IFile

  /**
   * Инициализировать экземпляр класса.
   * @returns Экземпляр класса.
   */
  protected async init() {
    this.set(await this.getArray())

    return this
  }

  /** Вернуть массив в исходное состояние. */
  @publicMethod()
  async reset() {
    this.set(this.default)
    await this.save()
  }

  /** Сохранить изменения в json. */
  @publicMethod()
  async save() {
    await this.jsonFile.writeToJSON({
      version: this.version,
      data: this.get()
    } satisfies IArrayJSON)
  }

  /**
   * Преобразовать к новой версии.
   * @param data Данные.
   * @returns Преобразованные данные.
   */
  protected async convertToNewest(data: any) {
    return data
  }

  /**
   * Получить массив.
   * @returns Массив.
   */
  private async getArray(): Promise<Item[]> {
    if (await this.jsonFile.exists()) {
      try {
        return await this.getFromJSON()
      } catch {
        return this.default
      }
    } else {
      return this.default
    }
  }

  /**
   * Получить массив из JSON.
   * @returns Массив.
   */
  private async getFromJSON(): Promise<Item[]> {
    const { version, data } = await this.jsonFile.readFromJSON<IArrayJSON>()

    return version < this.version
      ? this.convertToNewest(data)
      : data
  }
}
