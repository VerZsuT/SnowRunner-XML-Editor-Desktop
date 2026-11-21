import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

/**
 * Тексты экрана редактора.
 *
 * Новые строки переводятся на русский и английский; немецкий и китайский
 * берутся из английского, пока перевод не перенесён в общий словарь.
 */
export const EDITOR_PAGE_LOCALIZATION = loadLocalization(new Localization({
	title: new LocalizationStrings()
		.ru('Редактор')
		.en('Editor'),

	trucks: new LocalizationStrings()
		.ru('Автомобили и прицепы')
		.en('Trucks and trailers'),

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

	refresh: new LocalizationStrings()
		.ru('Обновить')
		.en('Refresh'),

	save: new LocalizationStrings()
		.ru('Сохранить')
		.en('Save'),

	saved: new LocalizationStrings()
		.ru('Сохранено')
		.en('Saved'),

	unsaved: new LocalizationStrings()
		.ru('Есть несохранённые изменения')
		.en('There are unsaved changes'),

	reset: new LocalizationStrings()
		.ru('Сбросить параметр')
		.en('Reset parameter'),

	resetDocument: new LocalizationStrings()
		.ru('Сбросить всё')
		.en('Reset all'),

	resetConfirm: new LocalizationStrings()
		.ru('Сбросить все параметры документа к исходным значениям?')
		.en('Reset all the document parameters to the original values?'),

	resetDone: new LocalizationStrings()
		.ru('Параметры сброшены. Не забудьте сохранить изменения')
		.en('Parameters have been reset. Do not forget to save the changes'),

	discardConfirm: new LocalizationStrings()
		.ru('Изменения не сохранены и будут потеряны. Закрыть редактор?')
		.en('Changes are not saved and will be lost. Close the editor?'),

	loadError: new LocalizationStrings()
		.ru('Не удалось открыть файл')
		.en('Failed to open the file'),

	cancel: new LocalizationStrings()
		.ru('Отмена')
		.en('Cancel'),

	close: new LocalizationStrings()
		.ru('Закрыть')
		.en('Close'),

	yes: new LocalizationStrings()
		.ru('Да')
		.en('Yes'),

	no: new LocalizationStrings()
		.ru('Нет')
		.en('No'),

	texts: new LocalizationStrings()
		.ru('Тексты')
		.en('Texts'),

	control: new LocalizationStrings()
		.ru('Управление')
		.en('Control'),

	winch: new LocalizationStrings()
		.ru('Лебёдка')
		.en('Winch'),

	wheels: new LocalizationStrings()
		.ru('Колёса')
		.en('Wheels'),

	wheel: new LocalizationStrings()
		.ru('Колесо')
		.en('Wheel'),

	extraWheel: new LocalizationStrings()
		.ru('Доп. колесо')
		.en('Extra wheel'),

	wheelSizes: new LocalizationStrings()
		.ru('Доступные размеры колёс')
		.en('Available wheel sizes'),

	wheelSet: new LocalizationStrings()
		.ru('Набор колёс')
		.en('Set of wheels'),

	suspension: new LocalizationStrings()
		.ru('Подвеска')
		.en('Suspension'),

	suspensions: new LocalizationStrings()
		.ru('Подвески')
		.en('Suspensions'),

	suspensionSet: new LocalizationStrings()
		.ru('Набор подвесок')
		.en('Suspension set'),

	frontSuspension: new LocalizationStrings()
		.ru('Передняя подвеска')
		.en('Front suspension'),

	middleSuspension: new LocalizationStrings()
		.ru('Средняя подвеска')
		.en('Middle suspension'),

	rearSuspension: new LocalizationStrings()
		.ru('Задняя подвеска')
		.en('Rear suspension'),

	gearbox: new LocalizationStrings()
		.ru('Коробка передач')
		.en('Gearbox'),

	gearboxes: new LocalizationStrings()
		.ru('Коробки передач')
		.en('Gearboxes'),

	gearboxParams: new LocalizationStrings()
		.ru('Параметры коробки')
		.en('Gearbox parameters'),

	gears: new LocalizationStrings()
		.ru('Передачи')
		.en('Gears'),

	gear: new LocalizationStrings()
		.ru('Передача')
		.en('Gear'),

	reverseGear: new LocalizationStrings()
		.ru('Задняя передача')
		.en('Reverse gear'),

	highGear: new LocalizationStrings()
		.ru('Повышенная передача')
		.en('High gear'),

	engine: new LocalizationStrings()
		.ru('Двигатель')
		.en('Engine'),

	engines: new LocalizationStrings()
		.ru('Двигатели')
		.en('Engines'),

	fuel: new LocalizationStrings()
		.ru('Топливный бак')
		.en('Fuel tank'),

	physicsModel: new LocalizationStrings()
		.ru('Физическая модель')
		.en('Physics model'),

	unlock: new LocalizationStrings()
		.ru('Разблокировка')
		.en('Unlock'),

	tire: new LocalizationStrings()
		.ru('Покрышка')
		.en('Tire'),

	truck: new LocalizationStrings()
		.ru('Тягач')
		.en('Truck'),

	trailer: new LocalizationStrings()
		.ru('Прицеп')
		.en('Trailer'),

	russia: new LocalizationStrings()
		.ru('Россия')
		.en('Russia'),

	usa: new LocalizationStrings()
		.ru('США')
		.en('USA'),

	cas: new LocalizationStrings()
		.ru('Центральная Азия')
		.en('Central Asia'),

	ne: new LocalizationStrings()
		.ru('Северная Европа')
		.en('Northern Europe'),

	findOnMap: new LocalizationStrings()
		.ru('Найти на карте')
		.en('Find on map'),

	byRank: new LocalizationStrings()
		.ru('По достижению уровня')
		.en('By rank'),

	torqueDefault: new LocalizationStrings()
		.ru('Всегда ведущее')
		.en('Drive'),

	torqueFull: new LocalizationStrings()
		.ru('Ведущее при полном приводе')
		.en('Driving with AWD'),

	torqueNone: new LocalizationStrings()
		.ru('Ведомое')
		.en('Driven'),

	torqueConnectable: new LocalizationStrings()
		.ru('Определяется аддоном')
		.en('Defined by the addon'),

	diffLockAlways: new LocalizationStrings()
		.ru('Всегда включена')
		.en('Always'),

	diffLockInstalled: new LocalizationStrings()
		.ru('Устанавливается')
		.en('Installed'),

	diffLockUninstalled: new LocalizationStrings()
		.ru('Не устанавливается')
		.en('Uninstalled'),

	diffLockNone: new LocalizationStrings()
		.ru('Отсутствует')
		.en('None'),

	wheelFront: new LocalizationStrings()
		.ru('Переднее')
		.en('Front'),

	wheelMiddle: new LocalizationStrings()
		.ru('Среднее')
		.en('Middle'),

	wheelRear: new LocalizationStrings()
		.ru('Заднее')
		.en('Rear'),

	drive: new LocalizationStrings()
		.ru('Привод')
		.en('Drive')
}))
