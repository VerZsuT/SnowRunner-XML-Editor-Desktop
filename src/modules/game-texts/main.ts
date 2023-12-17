import { publicVariable } from 'emr-bridge'

import type { IPublic } from './public'
import { Keys } from './public'
import type { IGameTexts, ITranslation } from './types'

import Config, { Lang } from '/mods/data/config/main'
import type Mods from '/mods/data/mods/main'
import { Dirs, Files } from '/mods/files/main'

export type * from './types'

/**
 * Работа с игровой локализацией  
 * _main process_
*/
class GameTexts {
  /** Название файлов локализаций игры для каждого языка */
  private readonly locals = {
    [Lang.ru]: 'russian',
    [Lang.en]: 'english',
    [Lang.de]: 'german',
    [Lang.ch]: 'chinese_simplified'
  }

  /** Тексты */
  private readonly object: IGameTexts = {
    /** Из модификаций */
    mods: {},
    /** Из `initial.pak` */
    main: {}
  }

  constructor() { this.initPublic() }

  /** Получить игровые тексты */
  getTexts() { return this.object }

  /** Обработать файл с переводом из `initial.pak` (текущий выбранный язык в программе) */
  async initFromInitial() {
    if (await Files.initialTexts.exists()) {
      this.object.main = await Files.initialTexts.readFromJSON()
    }

    if (await Dirs.strings.exists()) {
      const stringsFile = Dirs.strings.file(`strings_${this.locals[Config.lang]}.str`)

      if (await stringsFile.exists()) {
        this.object.main = this.parseFile(await stringsFile.read('utf16le'))
        await this.saveFromInitial()
      }
    }
  }

  /** Обработать файл с переводом из `.pak` файлов модов (текущий выбранный язык в программе) */
  async initFromMods(array: ReturnType<typeof Mods['get']>) {
    const mods: IGameTexts['mods'] = {}

    for (const mod of array) {
      if (await Dirs.modsTemp.dir(mod.name, 'texts').exists()) {
        const stringsFile = Dirs.modsTemp.file(mod.name, `texts/strings_${this.locals[Config.lang]}.str`)

        if (await stringsFile.exists()) {
          try { mods[mod.name] = this.parseFile(await stringsFile.read('utf16le'), true) }
          catch {}
        }
      }
    }
    this.object.mods = mods
  }

  /** Сохранить игровой перевод в файл (для оптимизации) */
  async saveFromInitial() {
    await Files.initialTexts.writeToJSON(this.object.main)
  }

  /** Обработать файл игрового перевода */
  private parseFile(data: string, parseAll?: boolean): ITranslation {
    const strings = {}
    const lines = data.match(/[^\n\r]+/g)

    if (lines) {
      for (const line of lines) {
        const result = line.split('"')

        if (result && result.length > 1) {
          const key = line.split('"')[0]!
            .trimEnd()
            .replaceAll('"', '')
            .replaceAll('\'', '')
            .replaceAll('﻿', '')
          const value = line.split('"')[1]!
            .replaceAll('\\', '')

          if (parseAll || (this.startsWith(key, [
            'UI_VEHICLE',
            'UI_ADDON',
            'UI_ADDONS',
            'UI_UPGRADE',
            'UI_TUNING',
            'UI_SCOUT',
            'UI_FRAME',
            'UI_STUFF',
            'UI_SEMITRAILER',
            'UI_TRAILER',
            'UI_ROCKET',
            'UI_TRAIN',
            'UI_ENGINE',
            'UI_GEARBOX',
            'UI_SUSPENSION',
            'UI_RIM',
            'UI_TIRE',
            'UI_WINCH',
            'UI_DLC'
          ]) && key.endsWith('NAME'))) {
            try {
              strings[key] = value
            }
            catch {}
          }
        }
      }
    }
    return strings
  }

  /** Начинается ли ключ на одну из переданных строк */
  private startsWith(key: string, array: string[]): boolean {
    for (const element of array) {
      if (key.startsWith(element!)) {
        return true
      }
    }

    return false
  }

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicVariable<IPublic[Keys.gameTexts]>(Keys.gameTexts, {
      get: this.getTexts.bind(this)
    })
  }
}

export default new GameTexts()
