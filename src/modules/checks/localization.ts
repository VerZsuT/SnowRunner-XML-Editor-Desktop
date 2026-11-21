import { Localization, LocalizationStrings } from '@localization'

/** Тексты проверок. */
export const CHECKS_LOCALIZATION = new Localization({
	/** Ошибка доступа к каталогу данных. */
	dataAccessDeniedMessage: new LocalizationStrings()
		.ru('Нет доступа к каталогу данных:')
		.en('No access to the data directory:')
		.de('Kein Zugriff auf das Datenverzeichnis:')
		.ch('无法访问数据目录：'),

	/** Доступна новая версия. */
	allowNewVersion: new LocalizationStrings()
		.ru('Доступна новая версия программы.')
		.en('A new version of the program is available.')
		.de('Eine neue Version des Programms ist verfügbar.')
		.ch('新版本的软件已经问世。'),

	/** Не найден `initial.pak`. */
	initialNotFound: new LocalizationStrings()
		.ru('initial.pak не найден.')
		.en('initial.pak not found')
		.de('initial.pak nicht gefunden')
		.ch('没有找到initial.pak。'),

	/** Не найдена папка `classes`. */
	classesNotFound: new LocalizationStrings()
		.ru('Папка classes не найдена.')
		.en('Folder classes not found')
		.de('Klassen nicht gefunden')
		.ch('没有找到classes文件夹。'),

	/** Не найдена папка `_dlc`. */
	dlcFolderNotFound: new LocalizationStrings()
		.ru('Папка с дополнениями не найдена')
		.en('DLC folder not found')
		.de('DLC-Ordner nicht gefunden')
		.ch('未找到增编文件夹')
})
