import Config from '@modules/data/config/main'
import type { Localization } from './index'
import type { ITextsToLocalize } from './types'

export * from './index'

/**
 * Загрузить локализацию.
 * _main process_
 * @param locale Локализация.
 * @returns Локализированные строки.
 */
export function loadLocalization<
	Value = string,
	ToLocalize extends ITextsToLocalize<Value> = ITextsToLocalize<Value>
>(locale: Localization<Value, ToLocalize>) {
	return locale.get(Config)
}
