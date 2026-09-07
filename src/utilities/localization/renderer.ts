import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import type { Localization } from './index'
import type { ITextsToLocalize, LocalizedTexts } from './types'

export * from './index'

/**
 * Загрузить локализацию.
 * renderer process_
 * @param locale Локализация.
 * @returns Локализированные строки.
 */
export function loadLocalization<
	Value = string,
	ToLocalize extends ITextsToLocalize<Value> = ITextsToLocalize<Value>
>(locale: Localization<Value, ToLocalize>) {
	const secretKey = Symbol('Loaded localization')

	return new Proxy({} as LocalizedTexts<ToLocalize>, {
		get(_, name, __) {
			return (locale[secretKey] ??= locale.get(di.resolve(CONFIG_TOKEN)))[name.toString()]
		}
	})
}
