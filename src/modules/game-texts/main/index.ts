import { makeReactive } from '@bridge/main'
import type { Config, IConfig } from '@modules/data/config/main'
import { Lang } from '@modules/data/config/main'
import type { Dirs } from '@modules/files/main'
import { di, inject } from '@utilities/di/container'
import { ARCHIVE_TOKEN, CONFIG_TOKEN, DIRS_TOKEN, MODS_TOKEN } from '@utilities/di/main/tokens'
import type { FSWatcher } from 'node:fs'
import type { IGameTexts, ITranslation } from '../types'

export type * from '../types'

/**
 * Работа с игровой локализацией.
 * _main process_
 */
export class GameTexts {
	@inject(CONFIG_TOKEN)
	private readonly config!: Config & IConfig

	@inject(DIRS_TOKEN)
	private readonly dirs!: Dirs

  /** Название файлов локализаций игры для каждого языка. */
  private readonly locals: Record<Lang, string> = {
    [Lang.ru]: 'russian',
    [Lang.en]: 'english',
    [Lang.de]: 'german',
    [Lang.ch]: 'chinese_simplified'
  }

  /** Тексты. */
  accessor object: IGameTexts = {
    mods: {},
    main: {}
  }

	constructor() {
		makeReactive(this, 'GameTexts', 'object')
	}

  /** Обработать файл с переводом из `initial.pak` (текущий выбранный язык в программе). */
  async initFromInitial() {
    if (!await this.dirs.strings.exists()) {
      return
    }

		const archive = di.resolve(ARCHIVE_TOKEN)
    const stringsFile = this.dirs.strings.file(`strings_${this.locals[this.config.lang]}.str`)
    const parse = async () => {
        await archive.isInitialUnpacking

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
        await archive.isInitialUnpacking
        watcher?.close()
        watcher = stringsFile.watch(parse).on('error', watchAndParse)
        await parse()
      } catch {}
    }

    await watchAndParse()
  }

  /** Обработать файл с переводом из `.pak` файлов модов (текущий выбранный язык в программе). */
  async initFromMods() {
		const mods = di.resolve(MODS_TOKEN)
    const result: IGameTexts['mods'] = {}

    for (const mod of mods) {
      if (!await this.dirs.modsTemp.dir(mod.name, 'texts').exists()) {
        continue
      }

      const stringsFile = this.dirs.modsTemp.file(mod.name, `texts/strings_${this.locals[this.config.lang]}.str`)

      if (!await stringsFile.exists()) {
        continue
      }

      result[mod.name] = this.parseFile(await stringsFile.read('utf16le'))
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
