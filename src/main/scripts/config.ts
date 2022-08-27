import {readFileSync} from 'fs'

import {Lang} from 'enums'
import type {Config} from 'types'

import {paths} from './paths'

export const config = getConfig()

/** Получить текущую конфигурацию */
function getConfig() {
    const config: Config = JSON.parse(readFileSync(paths.config).toString())

    if (config.lang === null) {
        const locale = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1]
        config.lang = Object.keys(Lang).includes(locale) ? <Lang>locale : Lang.EN
    }
    return config
}
