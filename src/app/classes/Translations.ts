import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

import { parseStrings, paths } from '../service'
import Config from './Config'

import RU from '../../scripts/translations/RU.json'
import EN from '../../scripts/translations/EN.json'
import DE from '../../scripts/translations/DE.json'

type TKeys = keyof typeof RU

/**
 * Отвечает за работу с переводами.
*/
export default class Translations {
    private static config: IConfig = Config.obj

    /**
     * Объект переводов.
    */
    public static obj = {
        /**
         * Русский перевод программы. 
        */
        RU: RU,
        /**
         * Английский перевод программы.
        */
        EN: EN,
        /**
         * Немецкий перевод программы.
        */
        DE: DE,
        /**
         * Игровой перевод из файлов модификаций.
        */
        mods: {},
        /**
         * Игровой перевод из initial.pak.
        */
        ingame: {}
    }

    /**
     * Обрабатывает файл с переводом из initial.pak на текущий выбранный язык в программе.
    */
    public static getIngame = (): Promise<null> => {
        return new Promise(resolve => {
            let ingame: ITranslation
            if (existsSync(paths.strings)) {
                let fileName: string
                switch (this.config.lang) {
                    case 'RU':
                        fileName = 'strings_russian.str'
                    break
                    case 'EN':
                        fileName = 'strings_english.str'
                    break
                    case 'DE':
                        fileName = 'strings_german.str'
                    break
                }
                const stringsFilePath = join(paths.strings, fileName)
                if (existsSync(stringsFilePath)) {
                    ingame = parseStrings(readFileSync(stringsFilePath, {
                        encoding: 'utf16le'
                    }).toString())
                    this.obj.ingame = ingame
                    resolve(null)
                } else {
                    resolve(null)
                }
            } else {
                resolve(null)
            }
        })
    }

    /**
     * Обрабатывает файл с переводом из .pak файлов модов на текущий выбранный язык в программе.
    */
    public static getMods = (): Promise<null> => {
        return new Promise(resolve => {
            const mods = {}
            for (const modId in this.config.modsList) {
                if (existsSync(join(paths.modsTemp, modId, 'texts'))) {
                    let fileName: string
                    switch (this.config.lang) {
                        case 'RU':
                            fileName = 'strings_russian.str'
                        break
                        case 'EN':
                            fileName = 'strings_english.str'
                        break
                        case 'DE':
                            fileName = 'strings_german.str'
                        break
                    }
                    const stringsFilePath = join(paths.modsTemp, modId, 'texts', fileName)
                    if (existsSync(stringsFilePath)) {
                        const result = parseStrings(readFileSync(stringsFilePath, {
                            encoding: 'utf16le'
                        }).toString())
                        mods[modId] = result
                    }
                }
            }
            this.obj.mods = mods
            resolve(null)
        })
    }

    /**
     * Возвращает текст перевода по ключу (в программе).
    */
    public static getText = (key: TKeys, returnKey: boolean=true): string | undefined => {
        const translation = this.obj[this.config.lang]
        if (translation) {
            return translation[key.removePars()] || (returnKey ? key : undefined)
        }
    }
}
