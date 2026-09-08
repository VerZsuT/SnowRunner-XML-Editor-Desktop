import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export const ENGINES_LOCALIZATION = loadLocalization(new Localization({
	engine: new LocalizationStrings()
		.ru('Двигатель')
		.en('Engine')
		.de('Motor')
		.ch('发动机')
}))
