import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

import { Access, providePublic, publicProperty } from 'emr-bridge'

import config from './config'
import paths from './paths'

import type { IGameTexts, Translation } from '#types'

class Texts {
  private readonly locals = {
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
  private readonly gameTexts = <IGameTexts> {
    /** Игровой из модификаций */
    mods: {},
    /** Игровой из `initial.pak` */
    main: {}
  }

  /** Обработать файл с переводом из `initial.pak` (текущий выбранный язык в программе) */
  async getFromGame(): Promise<void> {
    if (existsSync(paths.texts))
      this.gameTexts.main = JSON.parse(readFileSync(paths.texts).toString())

    if (existsSync(paths.strings)) {
      const stringsFilePath = join(paths.strings, `strings_${this.locals[config.lang]}.str`)

      if (existsSync(stringsFilePath)) {
        this.gameTexts.main = this.parseFile(readFileSync(stringsFilePath, { encoding: 'utf16le' }).toString())
        this.saveFromGame()
      }
    }
  }

  /** Обработать файл с переводом из `.pak` файлов модов (текущий выбранный язык в программе) */
  getFromMods(): void {
    const mods = {}
    for (const modId in config.mods.items) {
      if (existsSync(join(paths.modsTemp, modId, 'texts'))) {
        const stringsFilePath = join(paths.modsTemp, modId, `texts/strings_${this.locals[config.lang]}.str`)
        if (existsSync(stringsFilePath))
          mods[modId] = this.parseFile(readFileSync(stringsFilePath, { encoding: 'utf16le' }).toString(), true)
      }
    }
    this.gameTexts.mods = mods
  }

  /** Сохранить игровой перевод в файл (для оптимизации) */
  saveFromGame(): void {
    writeFileSync(paths.texts, JSON.stringify(this.gameTexts.main, null, '\t'))
  }

  /** Обработать файл игрового перевода */
  private parseFile(data: string, parseAll?: boolean): Translation {
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
            'UI_WINCH'
          ]) && key.endsWith('NAME'))) {
            try {
              strings[key] = value
            }
            catch {
            }
          }
        }
      })
    }
    return strings
  }

  private startsWith(key: string, array: string[]): boolean {
    for (let i = 0; i < array.length; ++i) {
      if (key.startsWith(array[i]))
        return true
    }

    return false
  }
}

export default providePublic(new Texts())
