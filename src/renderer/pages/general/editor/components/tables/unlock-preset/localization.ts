import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export const UNLOCK_PRESET_LOCALIZATION = loadLocalization(new Localization({
	unlockGroupName: new LocalizationStrings()
		.ru('Разблокировка')
		.en('Unlock')
		.de('Freischalten')
		.ch('解锁'),

	price: new LocalizationStrings()
		.ru('Цена')
		.en('Price')
		.de('Preis')
		.ch('价格'),

	byExploration: new LocalizationStrings()
		.ru('Способ разблокировки')
		.en('Unlock method')
		.de('Methode entsperren')
		.ch('解锁条件'),

	findOnMap: new LocalizationStrings()
		.ru('Найти на карте')
		.en('Find on map')
		.de('Auf Karte finden')
		.ch('在地图上寻找'),

	byRank: new LocalizationStrings()
		.ru('По достижению уровня')
		.en('By rank')
		.de('Nach Rang')
		.ch('达到该等级时'),

	unlockByRank: new LocalizationStrings()
		.ru('Уровень разблокировки')
		.en('Unlock level')
		.de('Level freischalten')
		.ch('解锁等级')
}))
