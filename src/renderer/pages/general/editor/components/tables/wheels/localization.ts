import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export const WHEELS_LOCALIZATION = loadLocalization(new Localization({
	tire: new LocalizationStrings()
		.ru('Покрышка')
		.en('Tire')
		.de('Reifen')
		.ch('轮胎'),

	yes: new LocalizationStrings()
		.ru('Да')
		.en('Yes')
		.de('Ja')
		.ch('是'),

	no: new LocalizationStrings()
		.ru('Нет')
		.en('No')
		.de('Nein')
		.ch('没有')
}))
