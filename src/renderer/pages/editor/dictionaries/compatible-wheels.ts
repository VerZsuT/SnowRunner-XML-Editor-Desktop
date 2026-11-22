import { Localization, LocalizationStrings, loadLocalization } from '@localization/renderer'

export const COMPATIBLE_WHEELS_LOCALIZATION = loadLocalization(new Localization({
	scale: new LocalizationStrings()
		.ru('Размер колеса')
		.en('Wheel size')
		.de('Rad-Größe')
		.ch('车轮尺寸'),

	type: new LocalizationStrings()
		.ru('Название')
		.en('Name')
		.de('Titel')
		.ch('标题')
}))
