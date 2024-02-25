import { publicFunction, publicVariable } from 'emr-bridge'

import ArrayBase from './base'

import type { File } from '/mods/files/main'

import type { ArrayJSON } from './types'

/** Инициализация публичных объектов/методов */
export function initArrayPublic(Instance: MainArrayBase<any>, arrayKey: string, resetKey: string, saveKey: string) {
  publicVariable(arrayKey, {
    get: Instance.get.bind(Instance),
    set: Instance.set.bind(Instance)
  })
  publicFunction(resetKey, Instance.reset.bind(Instance))
  publicFunction(saveKey, Instance.save.bind(Instance))
}

/** Базовый класс для массива в main-process */
export default abstract class MainArrayBase<Item, Extended  = Item> extends ArrayBase<Item, Extended> {
  protected readonly version = '1.0'

  /** Файл для записи/чтения массива */
  protected abstract jsonFile: File

  /**
   * Инициализация класса  
   * __НЕ ИСПОЛЬЗОВАТЬ__
  */
  async _init() {
    this.set(await this.getArray())
    this.handleChange()
    return this
  }

  /** Возвращает массив в исходное состояние */
  async reset() {
    this.set(this.default)
    await this.save()
  }

  /** Сохраняет изменения в json */
  async save() {
    await this.jsonFile.writeToJSON({
      version: this.version,
      data: this.get()
    })
  }

  protected async convertToNewest(data: any) {
    return data
  }

  /** Получить массив изменённых файлов */
  private async getArray(): Promise<Item[]> {
    if (await this.jsonFile.exists()) {
      try { return await this.getFromJSON() }
      catch { return this.default }
    }
    else {
      return this.default
    }
  }

  /** Получить массив из JSON */
  private async getFromJSON(): Promise<Item[]> {
    const { version, data } = await this.jsonFile.readFromJSON<ArrayJSON>()
    if (version < this.version) return this.convertToNewest(data)
    return data
  }
}
