import { ensureConfig } from '@/config'
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
		// Ошибка не должна кэшироваться навсегда: следующий вызов повторит запрос.
		loaded = commands.gameTexts(lang).catch((reason: unknown) => {
			if (loadedLang === lang) {
				loaded = null
				loadedLang = ''
			}

			throw reason
		})
	}

	return loaded
}

/** Сбрасывает кэш переводов: после распаковки или изменения модов. */
export function invalidateGameTexts(): void {
	loaded = null
	loadedLang = ''
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
