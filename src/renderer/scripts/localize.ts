import type {Localizations} from 'types'

import {config} from './config'

const lang = config.lang

/** Возвращает объект в зависимости от текущего языка программы */
export function localize<T extends Localizations<T['RU']>>(obj: T): T['RU'] {
    return obj[lang]
}
