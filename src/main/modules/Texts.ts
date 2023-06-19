import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

import { Access, publicProperty } from 'emr-bridge'

import Config from './Config'
import Paths from './Paths'

import { handleLangChange } from '#g/texts/main'
import type { IGameTexts, Translation } from '#g/types'

export default class Texts {
  private static readonly locals = {
    RU: 'russian',
    EN: 'english',
    DE: 'german',
    CH: 'chinese_simplified'
  }

  /** Тексты */
  @publicProperty({
    name: 'texts',
    access: Access.get
  })
  private static readonly gameTexts: IGameTexts = {
    /** Игровой из модификаций */
    mods: {},
    /** Игровой из `initial.pak` */
    main: {}
  }

  /** Обработать файл с переводом из `initial.pak` (текущий выбранный язык в программе) */
  static async getFromGame(): Promise<void> {
    if (existsSync(Paths.texts)) {
      this.gameTexts.main = JSON.parse(readFileSync(Paths.texts).toString())
    }

    if (existsSync(Paths.strings)) {
      const stringsFilePath = join(Paths.strings, `strings_${this.locals[Config.lang]}.str`)

      if (existsSync(stringsFilePath)) {
        this.gameTexts.main = this.parseFile(readFileSync(stringsFilePath, { encoding: 'utf16le' }).toString())
        this.saveFromGame()
      }
    }
  }

  /** Обработать файл с переводом из `.pak` файлов модов (текущий выбранный язык в программе) */
  static getFromMods(): void {
    const mods = {}
    for (const modId in Config.mods.items) {
      if (existsSync(join(Paths.modsTemp, modId, 'texts'))) {
        const stringsFilePath = join(Paths.modsTemp, modId, `texts/strings_${this.locals[Config.lang]}.str`)
        if (existsSync(stringsFilePath)) {
          mods[modId] = this.parseFile(readFileSync(stringsFilePath, { encoding: 'utf16le' }).toString(), true)
        }
      }
    }
    this.gameTexts.mods = mods
  }

  /** Сохранить игровой перевод в файл (для оптимизации) */
  static saveFromGame(): void {
    writeFileSync(Paths.texts, JSON.stringify(this.gameTexts.main, null, '\t'))
  }

  /** Обработать файл игрового перевода */
  private static parseFile(data: string, parseAll?: boolean): Translation {
    const strings = {}
    const lines = data.match(/[^\r\n]+/g)

    if (lines) {
      lines.forEach(line => {
        const result = line.split('"')

        if (result && result.length > 1) {
          const key = line.split('"')[0]
            .trimEnd()
            .replaceAll('"', '')
            .replaceAll('\'', '')
            .replaceAll('﻿', '')
          const value = line.split('"')[1]
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
            catch { }
          }
        }
      })
    }
    return strings
  }

  private static startsWith(key: string, array: string[]): boolean {
    for (let i = 0; i < array.length; ++i) {
      if (key.startsWith(array[i])) {
        return true
      }
    }

    return false
  }

  static {
    handleLangChange(() => {
      this.gameTexts.main = {}
      this.gameTexts.mods = {}
      this.getFromGame()
      this.getFromMods()
    })
  }
}
