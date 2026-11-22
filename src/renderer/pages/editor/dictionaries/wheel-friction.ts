import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const WHEEL_FRICTION_LOCALIZATION = loadLocalization(new Localization({
	bodyFriction: new LocalizationStrings()
		.ru('Сцепление на бездорожье')
		.en('Body friction')
		.de('Körperreibung')
		.ch('在干土地上的摩擦力'),

	bodyFrictionDesc: new LocalizationStrings()
		.ru('Трение с грунтом, без грязи и других объектов')
		.en('Friction with the ground, without dirt and other objects')
		.de('Reibung mit dem Boden, ohne Schmutz und andere Gegenstände'),

	bodyFrictionAsphalt: new LocalizationStrings()
		.ru('Сцепление на асфальте')
		.en('Body friction asphalt')
		.de('Körperreibung asphalt')
		.ch('在公路上的摩擦力'),

	bodyFrictionAsphaltDesc: new LocalizationStrings()
		.ru('Трение с дорогой')
		.en('Friction with the road')
		.de('Reibung mit der Straße'),

	substanceFriction: new LocalizationStrings()
		.ru('Сцепление в грязи')
		.en('Substance friction')
		.de('Substanzreibung')
		.ch('在泥浆里的摩擦力'),

	substanceFrictionDesc: new LocalizationStrings()
		.ru('Трение с грязью')
		.en('Friction with mud')
		.de('Reiben mit Schmutz'),

	isIgnoreIce: new LocalizationStrings()
		.ru('Едет по льду')
		.en('Rides on ice')
		.de('Fahrten auf Eis')
		.ch('在冰上驾驶'),

	isIgnoreIceDesc: new LocalizationStrings()
		.ru('Имеет ли колесо хорошее сцепление на льду')
		.en('Does the wheel have good grip on ice')
		.de('Hat das Rad einen guten Griff auf dem Eis')
}))
