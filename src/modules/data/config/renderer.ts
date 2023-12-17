import { Bridge } from 'emr-bridge/renderer'

import { File } from '/mods/files/renderer'
import { providePubFunc } from '/utils/bridge/renderer'

import { reactive, readonly } from 'vue'

import { BuildType } from './enums'
import type _MainConfig from './main'
import type { IPublic } from './public'
import { Keys } from './public'
import type { IConfig } from './types'

export * from './enums'
export type * from './types'

/**
 * Работа с конфигурацией программы  
 * _renderer process_ 
*/
class Config {
  /** Мост main-rend */
  private readonly Bridge = Bridge.as<IPublic>()
  /** Объект конфига */
  private readonly object = reactive(this.Bridge[Keys.object])

  private readonly listeners = new Set<() => void>()

  ref = readonly(this.object)

  constructor() { this.init() }

  onChange(listener: () => void) {
    this.listeners.add(listener)
  }
  removeOnChange(listener: () => void) {
    this.listeners.delete(listener)
  }

  /**
   * Инициализация класса  
   * __НЕ ИСПОЛЬЗОВАТЬ__
   */
  private init() {
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => this.object[key],
        set: value => this.set({ [key]: value }),
        enumerable: true
      })
    }

    this.Bridge[Keys.onChange](changed => {
      this.rawSet(changed)
      for (const listener of this.listeners) listener()
    })
  }

  /** Получить объект конфига */
  get(): IConfig { return { ...this.object } }

  /** Установить конфиг */
  set(newObject: Partial<IConfig>) {
    this.rawSet(newObject)
    this.Bridge[Keys.object] = { ...this.object, ...newObject }
  }

  private rawSet(newObject: Partial<IConfig>) {
    Object.assign(this.object, newObject)
  }

  /** Файл initial.pak */
  get initial(): File {
    return new File(this.object.initialPath || '')
  }

  /** Программа в режиме разработки */
  get isDev(): boolean {
    return this.object.buildType === BuildType.dev
  }

  /**
   * Сбросить `config.json` на "заводскую" версию
   * 
   * @param noReload - отмена перезагрузки после завершения  
   * {@link _MainConfig.reset|Перейти к методу}
   */
  reset = providePubFunc<IPublic[Keys.reset]>(Keys.reset)

  /**
   * Сохранить изменения в `config.json`  
   * {@link _MainConfig.save|Перейти к методу}
  */
  save = providePubFunc<IPublic[Keys.save]>(Keys.save)
}

export default new Config() as Config & IConfig
