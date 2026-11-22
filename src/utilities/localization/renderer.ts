import { Lang } from './lang'
import type { Localization } from './index'
import type { ITextsToLocalize, LocalizedTexts } from './types'

export * from './index'

/** Источник текущего языка интерфейса. */
let configSource: (() => { lang: Lang }) | undefined

/**
 * Зарегистрировать источник конфигурации для локализации.
 * @param source Функция, возвращающая текущую конфигурацию.
 */
export function setLocalizationConfig(source: () => { lang: Lang }): void {
	configSource = source
}

/**
 * Загрузить локализацию.
 * renderer process
 * @param locale Локализация.
 * @returns Локализированные строки.
 */
export function loadLocalization<
	Value = string,
	ToLocalize extends ITextsToLocalize<Value> = ITextsToLocalize<Value>
>(locale: Localization<Value, ToLocalize>) {
	return new Proxy({} as LocalizedTexts<ToLocalize>, {
		get(_, name) {
			const config = configSource?.() ?? { lang: Lang.en }

			return locale.get(config)[name.toString()]
		}
	})
}
