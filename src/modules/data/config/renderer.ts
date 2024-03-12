import { Bridge } from 'emr-bridge/renderer'

import { File } from '/mods/files/renderer'
import { providePubFunc } from '/utils/bridge/renderer'

import { shallowReactive, shallowReadonly } from 'vue'

import { BuildType } from './enums'
import type _MainConfig from './main'
import type { PubType } from './public'
import { PubKeys } from './public'
import type { IConfig } from './types'

export * from './enums'
export type * from './types'

/** Мост main-rend */
const Main = Bridge.as<PubType>()

/**
 * Работа с конфигурацией программы  
 * _renderer process_ 
*/
class Config extends EventTarget {
  /** Объект конфига */
  private readonly object = shallowReactive(Main[PubKeys.object])

  /** Объект для реактивности */
  ref = shallowReadonly(this.object)

  /** Файл initial.pak */
  get initial(): File {
    return new File(this.object.initialPath || '')
  }

  /** Программа в режиме разработки */
  get isDev(): boolean {
    return this.object.buildType === BuildType.dev
  }

  constructor() { super(); this.init() }

  /** Получить объект конфига */
  get(): IConfig { return { ...this.object } }

  /** Установить конфиг */
  set(newObject: Partial<IConfig>) {
    this.rawSet(newObject)
    Main[PubKeys.object] = { ...this.object, ...newObject }
  }

  /**
   * Сбросить `config.json` на "заводскую" версию
   * @param noReload - отмена перезагрузки после завершения  
   * {@link _MainConfig.reset|Перейти к методу}
   */
  reset = providePubFunc<PubType[PubKeys.reset]>(PubKeys.reset)

  /**
   * Сохранить изменения в `config.json`  
   * {@link _MainConfig.save|Перейти к методу}
  */
  save = providePubFunc<PubType[PubKeys.save]>(PubKeys.save)

  /** Инициализация класса */
  private init() {
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => this.object[key],
        set: value => this.set({ [key]: value }),
        enumerable: true
      })
    }

    Main[PubKeys.onChange](changed => {
      this.rawSet(changed)
      this.dispatchEvent(new Event('change'))
    })
  }

  /** Установить конфиг без вызова события изменения */
  private rawSet(newObject: Partial<IConfig>) {
    Object.assign(this.object, newObject)
  }
}

export default new Config() as Config & IConfig
