import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const SUSPENSION_SET_LOCALIZATION = loadLocalization(new Localization({
	name: new LocalizationStrings()
		.ru('Название')
		.en('Name')
		.de('Titel')
		.ch('标题'),

	damageCapacity: new LocalizationStrings()
		.ru('Прочность')
		.en('Damage capacity')
		.de('Schadenskapazität')
		.ch('血量'),

	damageCapacityDesc: new LocalizationStrings()
		.ru('Размер допустимого ущерба подвеске')
		.en('The amount of possible damage to the suspension')
		.de('Die Höhe des zulässigen Schadens an der Aufhängung'),

	criticalDamageThreshold: new LocalizationStrings()
		.ru('Порог критического повреждения')
		.en('Critical damage threshold')
		.de('Kritische Schadensschwelle')
		.ch('损坏阈值'),

	criticalDamageThresholdDesc: new LocalizationStrings()
		.ru('Порог критического урона подвески')
		.en('Suspension Critical Damage Threshold')
		.de('Schwelle für kritischen Fahrwerksschaden'),

	brokenWheelDamageMultiplierDesc: new LocalizationStrings()
		.ru('Коэффициент увеличения повреждения подвески при пробитом колесе')
		.en('The coefficient of increase in suspension damage with a punctured wheel')
		.de('Erhöhte Fahrwerksschäden bei eingeschlossenem Rad')
}))
