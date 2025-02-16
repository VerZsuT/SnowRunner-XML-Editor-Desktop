import type { FSWatcher } from 'node:fs'
import { Archive } from '../main'
import type { IGameTexts, ITranslation } from './types'
import Config, { Lang } from '/mods/data/config/main'
import { Dirs } from '/mods/files/main'
import { providePublic, publicField, publicMethod } from '/utils/bridge/main'

export type * from './types'

/**
 * Работа с игровой локализацией.  
 * _main process_
 */
@providePublic()
class GameTexts {
  /** Название файлов локализаций игры для каждого языка. */
  private readonly locals: Record<Lang, string> = {
    [Lang.ru]: 'russian',
    [Lang.en]: 'english',
    [Lang.de]: 'german',
    [Lang.ch]: 'chinese_simplified'
  }

  /** Тексты. */
  @publicField()
  private accessor object: IGameTexts = {
    mods: {},
    main: {}
  }

  /** Обработать файл с переводом из `initial.pak` (текущий выбранный язык в программе). */
  @publicMethod()
  async initFromInitial() {
    if (!await Dirs.strings.exists()) {
      return
    }

    const stringsFile = Dirs.strings.file(`strings_${this.locals[Config.lang]}.str`)
    const parse = async () => {
        await Archive.isInitialUnpacking

        if (await stringsFile.exists()) {
          this.set({ main: this.parseFile(await stringsFile.read('utf16le')) })
        }
    }

    if (!await stringsFile.exists()) {
      return
    }

    let watcher: FSWatcher | undefined

    const watchAndParse = async () => {
      try {
        await Archive.isInitialUnpacking
        watcher?.close()
        watcher = stringsFile.watch(parse).on('error', watchAndParse)
        await parse()
      } catch {}
    }

    await watchAndParse()
  }

  /** Обработать файл с переводом из `.pak` файлов модов (текущий выбранный язык в программе). */
  @publicMethod()
  async initFromMods() {
    const result: IGameTexts['mods'] = {}
    const Mods = (await import('/mods/data/mods/main')).default

    for (const mod of Mods) {
      if (!await Dirs.modsTemp.dir(mod.name, 'texts').exists()) {
        continue
      }

      const stringsFile = Dirs.modsTemp.file(mod.name, `texts/strings_${this.locals[Config.lang]}.str`)

      if (!await stringsFile.exists()) {
        continue
      }

      this.set({
        mods: {
          ...this.object.mods,
          [mod.name]: this.parseFile(await stringsFile.read('utf16le'))
        }
      })
    }

    this.set({ mods: result })
  }

  /**
   * Обработать файл игрового перевода.
   * @param data Содержимое файла.
   * @returns Игровой перевод.
   */
  private parseFile(data: string): ITranslation {
    const strings = {}
    const lines = data.match(/[^\n\r]+/g)

    if (!lines) {
      return strings
    }

    for (const line of lines) {
      const result = line.split('"')

      if (!result || result.length <= 1) {
        continue
      }

      let [key, value] = line.split('"')

      if (!key || !value) {
        continue
      }

      key = key
        .trimEnd()
        .replaceAll('"', '')
        .replaceAll('\'', '')
        .replaceAll('﻿', '')
      value = value
        .replaceAll('\\', '')

      try {
        strings[key] = value
      } catch {}
    }
    
    return strings
  }

  /**
   * Установить объект перевода.
   * @param newObject Новый объект.
   */
  private set(newObject: Partial<IGameTexts>) {
    this.object = {
      ...this.object,
      ...newObject
    }
  }
}

/**
 * Работа с игровой локализацией.  
 * _main process_
 */
export default new GameTexts()
