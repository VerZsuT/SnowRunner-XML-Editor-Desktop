import { Localization, LocalizationStrings } from '@localization'

/** Тексты работы с EPF. */
export const EPF_LOCALIZATION = new Localization({
	/** Файлы успешно объединены. */
	successJoin: new LocalizationStrings()
		.ru('Следующие файлы были объединены в один:')
		.en('The following files have been merged into one:')
		.de('Die folgenden Dateien wurden zu einem zusammengefasst:')
		.ch('以下文件已合并为一个'),

	/** Сообщение о содержимом. */
	seeExportedMessage: new LocalizationStrings()
		.ru('В данном файле находятся параметры следующих файлов:')
		.en('This file contains the parameters of the following files:')
		.de('Diese Datei enthält die Einstellungen der folgenden Dateien:')
		.ch('该文件包含以下文件的参数'),

	/** Ошибка чтения файла. */
	readError: new LocalizationStrings()
		.ru('Не удалось прочитать файл')
		.en('Cannot read file')
		.de('Datei konnte nicht gelesen werden')
		.ch('无法读取文件'),

	/** Ошибка записи файла. */
	writeError: new LocalizationStrings()
		.ru('Не удалось записать файл')
		.en('Cannot write file')
		.de('Datei konnte nicht geschrieben werden')
		.ch('无法写入文件')
})
