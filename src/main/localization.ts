import { Localization, LocalizationStrings } from '@localization/main'

/** Тексты приложения. */
export const MAIN_LOCALIZATION = new Localization({
	/** Проверка доступа к каталогу данных. */
	checkDataAccess: new LocalizationStrings()
		.ru('Проверка доступа к данным')
		.en('Checking data access')
		.de('Datenzugriff wird geprüft')
		.ch('检查数据访问'),

	/** Проверка initial.pak. */
	checkInitial: new LocalizationStrings()
		.ru('Проверка initial.pak')
		.en('Checking initial.pak')
		.de('Überprüfung initial.pak')
		.ch('检查 initial.pak'),

	/** Проверка наличия файлов. */
	checkFiles: new LocalizationStrings()
		.ru('Проверка наличия файлов')
		.en('Checking files')
		.de('Nach Dateien suchen')
		.ch('检查文件'),

	/** Загрузка игровых текстов. */
	loadGameTexts: new LocalizationStrings()
		.ru('Загрузка игровых текстов')
		.en('Loading game texts')
		.de('Spieltexte werden geladen')
		.ch('加载游戏文本'),

	/** Загрузка дополнений. */
	loadDlc: new LocalizationStrings()
		.ru('Загрузка дополнений')
		.en('Loading DLC')
		.de('DLC wird geladen')
		.ch('装载DLC'),

	/** Загрузка модификаций. */
	loadMods: new LocalizationStrings()
		.ru('Загрузка модификаций')
		.en('Loading mods')
		.de('Anderungen laden')
		.ch('加载修改'),

	/** Распаковка. */
	unpack: new LocalizationStrings()
		.ru('Распаковка')
		.en('Unpacking')
		.de('Auspacken')
		.ch('打开包装')
})
