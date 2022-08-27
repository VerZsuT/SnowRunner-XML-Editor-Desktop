import type {Settings} from 'types'

/** Объект настроек */
export const settings: Settings = {}

/** Установить настройки */
export function setSettings(newObj: Settings) {
    Object.assign(settings, newObj)
}
