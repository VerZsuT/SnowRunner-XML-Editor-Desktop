import { ensureConfig } from '@renderer/config'
import type { GameTexts } from './bindings'
import { commands } from './bindings'

/** Загруженные переводы текущего языка. */
let loaded: Promise<GameTexts> | null = null

/** Язык загруженных переводов. */
let loadedLang = ''

/**
 * Игровые переводы языка интерфейса: один запрос на язык.
 * @returns Переводы игры и распакованных модов.
 */
export function loadGameTexts(): Promise<GameTexts> {
	const lang = ensureConfig().lang

	if (!loaded || loadedLang !== lang) {
		loadedLang = lang
		loaded = commands.gameTexts(lang)
	}

	return loaded
}

/**
 * Перевод игрового ключа: сначала строки мода, затем строки игры.
 * @param texts Переводы.
 * @param key Ключ перевода.
 * @param modName Имя мода.
 * @returns Перевод или undefined, если ключа нет.
 */
export function translate(
	texts: GameTexts | null | undefined,
	key: string | null | undefined,
	modName?: string | null
): string | undefined {
	if (!key) {
		return
	}

	const mod = modName ? texts?.mods[modName] : undefined

	return mod?.[key] ?? texts?.main[key]
}
