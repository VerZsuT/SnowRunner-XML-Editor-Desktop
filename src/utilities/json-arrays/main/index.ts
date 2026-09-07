import type { File } from '@modules/files/main'
import { ArrayBase } from '../base'
import type { IArrayJSON } from '../types'

/** Базовый класс для массива в main-process. */
export abstract class MainArrayBase<Item, Extended = Item> extends ArrayBase<Item, Extended> {
  /** Версия JSON файла. */
  protected readonly version = '1.0'

  /** Файл для записи/чтения массива. */
  protected abstract jsonFile: File

  /**
   * Инициализировать экземпляр класса.
   * @returns Экземпляр класса.
   */
  protected init() {
    this.set(this.getArray())

    return this
  }

  /** Вернуть массив в исходное состояние. */
  async reset() {
    this.set(this.default)
    await this.save()
  }

  /** Сохранить изменения в json. */
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
  protected convertToNewest(data: any) {
    return data
  }

  /**
   * Получить массив.
   * @returns Массив.
   */
  private getArray(): Item[] {
    if (this.jsonFile.existsSync()) {
      try {
        return this.getFromJSON()
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
  private getFromJSON(): Item[] {
    const { version, data } = this.jsonFile.readFromJSONSync<IArrayJSON>()

    return version < this.version
      ? this.convertToNewest(data)
      : data
  }
}
