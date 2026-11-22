import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const ADDON_SLOTS_LOCALIZATION = loadLocalization(new Localization({
	quantity: new LocalizationStrings()
		.ru('Кол-во груза')
		.en('Cargo quantity')
		.de('Menge der Ladung')
		.ch('装载货物的格数'),

	quantityDesc: new LocalizationStrings()
		.ru('Количество слотов для груза')
		.en('Number of cargo slots')
		.de('Anzahl der Ladeschlitze')
}))
