import { publicField, publicMethod } from '../bridge/main'
import ArrayBase from './base'
import type { ArrayJSON } from './types'
import type { File } from '/mods/files/main'

/** Базовый класс для массива в main-process */
export default abstract class MainArrayBase<Item, Extended = Item> extends ArrayBase<Item, Extended> {
  isReady!: Promise<typeof this>

  @publicField()
  protected accessor arr: Item[] = []

  /** Версия JSON файла */
  protected readonly version = '1.0'

  /** Файл для записи/чтения массива */
  protected abstract jsonFile: File

  /** Инициализация класса. */
  protected async init() {
    this.set(await this.getArray())

    return this
  }

  /** Возвращает массив в исходное состояние */
  @publicMethod()
  async reset() {
    this.set(this.default)
    await this.save()
  }

  /** Сохраняет изменения в json */
  @publicMethod()
  async save() {
    await this.jsonFile.writeToJSON({
      version: this.version,
      data: this.get()
    } satisfies ArrayJSON)
  }

  /** Преобразовать к новой версии */
  protected async convertToNewest(data: any) {
    return data
  }

  /** Получить массив изменённых файлов */
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

  /** Получить массив из JSON */
  private async getFromJSON(): Promise<Item[]> {
    const { version, data } = await this.jsonFile.readFromJSON<ArrayJSON>()

    return version < this.version
      ? this.convertToNewest(data)
      : data
  }
}
