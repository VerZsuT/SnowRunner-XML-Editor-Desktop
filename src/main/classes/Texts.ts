import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { RU, EN, DE, ITexts } from 'texts'
import { paths } from '../service'
import { Config } from './Config'

type TKeys = keyof ITexts

/** Отвечает за работу с переводами. */
export class Texts {
    private static config = Config.obj

    /** Объект переводов. */
    static obj = {
        /** Русский перевод программы. */
        RU: RU,
        /** Английский перевод программы. */
        EN: EN,
        /** Немецкий перевод программы. */
        DE: DE,
        /** Игровой перевод из файлов модификаций. */
        mods: {},
        /** Игровой перевод из `initial.pak.` */
        ingame: {}
    }

    /** Обрабатывает файл с переводом из `initial.pak` на текущий выбранный язык в программе. */
    static addIngame = async () => {
        if (existsSync(paths.texts)) {
            this.obj.ingame = JSON.parse(readFileSync(paths.texts).toString())
        }

        if (existsSync(paths.strings)) {
            const map = {
                RU: 'russian',
                EN: 'english',
                DE: 'german'
            }
            const stringsFilePath = join(paths.strings, `strings_${map[this.config.lang]}.str`)
            if (existsSync(stringsFilePath)) {
                this.obj.ingame = this.parse(readFileSync(stringsFilePath, { encoding: 'utf16le' }).toString())
                this.save()
            }
        }
    }

    /** Обрабатывает файл с переводом из `.pak` файлов модов на текущий выбранный язык в программе. */
    static addFromMods = () => {
        const mods = {}
        const map = {
            RU: 'russian',
            EN: 'english',
            DE: 'german'
        }
        for (const modId in this.config.mods.items) {
            if (existsSync(join(paths.modsTemp, modId, 'texts'))) {
                const stringsFilePath = join(paths.modsTemp, modId, 'texts', `strings_${map[this.config.lang]}.str`)
                if (existsSync(stringsFilePath)) {
                    mods[modId] = this.parse(readFileSync(stringsFilePath, { encoding: 'utf16le' }).toString())
                }
            }
        }
        this.obj.mods = mods
    }

    /** Возвращает текст перевода по ключу (в программе). */
    static get = (key: TKeys, returnKey = true): string | undefined => {
        const translation = this.obj[this.config.lang]
        if (translation) {
            return translation[key] || (returnKey ? key : undefined)
        }
    }

    private static save() {
        writeFileSync(paths.texts, JSON.stringify(this.obj.ingame, null, '\t'))
    }

    private static parse(data: string): Translation {
        const strings = {}
        const lines = data.match(/[^\r\n]+/g)
        if (lines) {
            for (const line of lines) {
                const result = line.match(/(.*?)[\s\t]*(\".*?\")/)

                if (result && result.length === 3) {
                    const key = result[1].replaceAll('"', '').replaceAll("'", '').replaceAll('﻿', '')
                    if (this.startsWith(key, [
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
                    ]) && key.endsWith('NAME')) {
                        try {
                            const value = JSON.parse(result[2].replaceAll('\\', ''))
                            strings[key] = value
                        } catch { }
                    }
                }
            }
        }
        return strings
    }

    private static startsWith(key: string, array: string[]) {
        for (const str of array) {
            if (key.startsWith(str)) {
                return true
            }
        }
        return false
    }
}
