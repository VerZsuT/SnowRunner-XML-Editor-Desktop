import { Lang } from './lang'
import { ch } from './locales/ch'
import { de } from './locales/de'
import { en } from './locales/en'
import { ru } from './locales/ru'

export * from './lang'

/** Локализация интерфейса: структура русского файла — эталон для остальных языков. */
export type Locale = typeof ru

/** Тексты всех языков интерфейса. */
export const LOCALES: Record<Lang, Locale> = {
	[Lang.ru]: ru,
	[Lang.en]: en,
	[Lang.de]: de,
	[Lang.ch]: ch
}

/**
 * Тексты текущего языка интерфейса.
 *
 * Язык фиксируется при запуске интерфейса: смена языка перезагружает окно,
 * поэтому выбор в рантайме не нужен. {@link setTexts} вызывается ровно один раз
 * при регистрации конфигурации, а интерфейс грузится динамическим импортом уже
 * после неё — иначе тексты зафиксируются на языке по умолчанию.
 */
export let T: Locale = ru

/**
 * Применить язык интерфейса.
 * @param lang Язык.
 */
export function setTexts(lang: Lang): void {
	T = LOCALES[lang]
}
