import { BaseLocalizationObj } from './base-localization'
import type { ITextsToLocalize, LocalizedTexts } from './types'

/**
 * Создать загрузчик локализации.
 * @param texts Тексты для локализации.
 * @returns Локализация.
 */
export function createTextsLoader<
	Value = string,
  ToLocalize extends ITextsToLocalize<Value> = ITextsToLocalize<Value>
>(texts: ToLocalize) {
	const obj = new BaseLocalizationObj<Value, ToLocalize>(texts)
	let mainTexts: LocalizedTexts<ToLocalize> | undefined
	let rendererTexts: typeof mainTexts

	return {
		async loadMain() {
			return mainTexts ??= obj.get((await import('/mods/data/config/main')).default)
		},
		async loadRenderer() {
			return rendererTexts ??= obj.get((await import('/mods/data/config/renderer')).default)
		}
	}
}
