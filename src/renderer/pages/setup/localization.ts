import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

/**
 * Тексты экрана настройки.
 *
 * Новые строки переводятся на русский и английский; немецкий и китайский
 * берутся из английского, пока перевод не перенесён в общий словарь.
 */
export const SETUP_PAGE_LOCALIZATION = loadLocalization(new Localization({
	title: new LocalizationStrings()
		.ru('Настройка')
		.en('Setup'),

	paths: new LocalizationStrings()
		.ru('Пути программы')
		.en('Program paths'),

	dataRoot: new LocalizationStrings()
		.ru('Каталог данных')
		.en('Data directory'),

	mode: new LocalizationStrings()
		.ru('Режим хранения')
		.en('Storage mode'),

	modeInstalled: new LocalizationStrings()
		.ru('Установленная сборка')
		.en('Installed'),

	modePortable: new LocalizationStrings()
		.ru('Портативная сборка')
		.en('Portable'),

	modeDev: new LocalizationStrings()
		.ru('Режим разработки')
		.en('Development'),

	classes: new LocalizationStrings()
		.ru('Файлы игры')
		.en('Game files'),

	mainTemp: new LocalizationStrings()
		.ru('Распакованные данные')
		.en('Unpacked data'),

	backupFolder: new LocalizationStrings()
		.ru('Каталог бэкапов')
		.en('Backups directory'),

	backupInitial: new LocalizationStrings()
		.ru('Бэкап initial.pak')
		.en('initial.pak backup'),

	game: new LocalizationStrings()
		.ru('Файлы игры')
		.en('Game files'),

	archivePath: new LocalizationStrings()
		.ru('Путь к initial.pak')
		.en('initial.pak path'),

	noPath: new LocalizationStrings()
		.ru('Архив не выбран')
		.en('Archive is not selected'),

	choose: new LocalizationStrings()
		.ru('Выбрать')
		.en('Choose'),

	unpack: new LocalizationStrings()
		.ru('Распаковать')
		.en('Unpack'),

	unpackConfirm: new LocalizationStrings()
		.ru('Сначала будет сделан бэкап архива, затем файлы игры распакуются заново. Продолжить?')
		.en('The archive will be backed up first, then the game files will be unpacked again. Continue?'),

	unpacked: new LocalizationStrings()
		.ru('Распаковано файлов: {}')
		.en('Unpacked files: {}'),

	backup: new LocalizationStrings()
		.ru('Бэкап')
		.en('Backup'),

	backedUp: new LocalizationStrings()
		.ru('Бэкап сохранён: {}')
		.en('Backup saved: {}'),

	update: new LocalizationStrings()
		.ru('Обновить архив')
		.en('Update archive'),

	updateMod: new LocalizationStrings()
		.ru('Записать мод в .pak')
		.en('Write mod into .pak'),

	updated: new LocalizationStrings()
		.ru('Записей обновлено: {}')
		.en('Entries updated: {}'),

	verify: new LocalizationStrings()
		.ru('Проверить')
		.en('Verify'),

	verified: new LocalizationStrings()
		.ru('Записей проверено: {}')
		.en('Entries verified: {}'),

	restore: new LocalizationStrings()
		.ru('Восстановить из бэкапа')
		.en('Restore from backup'),

	restoreConfirm: new LocalizationStrings()
		.ru('Заменить initial.pak копией из каталога данных? Несохранённые изменения архива будут потеряны.')
		.en('Replace initial.pak with the copy from the data directory? Unsaved archive changes will be lost.'),

	restored: new LocalizationStrings()
		.ru('Архив восстановлен из бэкапа')
		.en('Archive restored from backup'),

	mods: new LocalizationStrings()
		.ru('Моды')
		.en('Mods'),

	noMods: new LocalizationStrings()
		.ru('Моды не добавлены')
		.en('No mods added'),

	addMod: new LocalizationStrings()
		.ru('Добавить мод (.pak)')
		.en('Add mod (.pak)'),

	syncMods: new LocalizationStrings()
		.ru('Обновить моды')
		.en('Refresh mods'),

	removeMod: new LocalizationStrings()
		.ru('Убрать мод из списка')
		.en('Remove mod from the list'),

	options: new LocalizationStrings()
		.ru('Параметры')
		.en('Options'),

	useMods: new LocalizationStrings()
		.ru('Использовать моды')
		.en('Use mods'),

	advancedMode: new LocalizationStrings()
		.ru('Расширенный режим')
		.en('Advanced mode'),

	cancel: new LocalizationStrings()
		.ru('Отмена')
		.en('Cancel'),

	saved: new LocalizationStrings()
		.ru('Настройки сохранены')
		.en('Settings saved'),

	loadError: new LocalizationStrings()
		.ru('Не удалось прочитать настройки')
		.en('Failed to read the settings')
}))
