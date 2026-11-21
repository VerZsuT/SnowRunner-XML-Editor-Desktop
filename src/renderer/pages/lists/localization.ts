import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

/**
 * Тексты списка автомобилей.
 *
 * Новые строки переводятся на русский и английский; немецкий и китайский
 * берутся из английского, пока перевод не перенесён в общий словарь.
 */
export const LISTS_PAGE_LOCALIZATION = loadLocalization(new Localization({
	title: new LocalizationStrings()
		.ru('Автомобили и прицепы')
		.en('Trucks and trailers'),

	trucksCategory: new LocalizationStrings()
		.ru('Автомобили')
		.en('Trucks'),

	trailersCategory: new LocalizationStrings()
		.ru('Прицепы')
		.en('Trailers'),

	allSources: new LocalizationStrings()
		.ru('Все источники')
		.en('All sources'),

	mainSource: new LocalizationStrings()
		.ru('Основная игра')
		.en('Main game'),

	dlcSource: new LocalizationStrings()
		.ru('DLC')
		.en('DLC'),

	modsSource: new LocalizationStrings()
		.ru('Моды')
		.en('Mods'),

	favoritesSource: new LocalizationStrings()
		.ru('Избранное')
		.en('Favorites'),

	editedSource: new LocalizationStrings()
		.ru('Изменённые')
		.en('Edited'),

	addFavorite: new LocalizationStrings()
		.ru('Добавить в избранное')
		.en('Add to favorites'),

	removeFavorite: new LocalizationStrings()
		.ru('Убрать из избранного')
		.en('Remove from favorites'),

	editedMark: new LocalizationStrings()
		.ru('Файл изменён')
		.en('File is edited'),

	allTypes: new LocalizationStrings()
		.ru('Все классы')
		.en('All types'),

	heavyType: new LocalizationStrings()
		.ru('Тяжёлый')
		.en('Heavy'),

	heavyDutyType: new LocalizationStrings()
		.ru('Сверхтяжёлый')
		.en('Heavy duty'),

	highwayType: new LocalizationStrings()
		.ru('Шоссейный')
		.en('Highway'),

	offroadType: new LocalizationStrings()
		.ru('Внедорожный')
		.en('Offroad'),

	scoutType: new LocalizationStrings()
		.ru('Разведывательный')
		.en('Scout'),

	specialType: new LocalizationStrings()
		.ru('Специальный')
		.en('Special'),

	search: new LocalizationStrings()
		.ru('Поиск по имени')
		.en('Search by name'),

	nothingFound: new LocalizationStrings()
		.ru('Ничего не найдено')
		.en('Nothing found'),

	noGameFiles: new LocalizationStrings()
		.ru('Файлы игры не найдены. Укажите initial.pak, чтобы распаковать их.')
		.en('Game files not found. Choose initial.pak to unpack them.'),

	openArchive: new LocalizationStrings()
		.ru('Выбрать initial.pak')
		.en('Choose initial.pak'),

	unpacking: new LocalizationStrings()
		.ru('Распаковка...')
		.en('Unpacking...'),

	unpacked: new LocalizationStrings()
		.ru('Распаковано файлов: {}')
		.en('Unpacked files: {}'),

	setup: new LocalizationStrings()
		.ru('Настройка')
		.en('Setup'),

	refresh: new LocalizationStrings()
		.ru('Обновить')
		.en('Refresh'),

	retry: new LocalizationStrings()
		.ru('Повторить')
		.en('Retry')
}))
