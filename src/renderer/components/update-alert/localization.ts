import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

/** Тексты уведомления об обновлении. */
export const UPDATE_ALERT_LOCALIZATION = loadLocalization(new Localization({
	title: new LocalizationStrings()
		.ru('Обновление')
		.en('Update')
		.de('Erneuerung')
		.ch('更新资料'),

	available: new LocalizationStrings()
		.ru('Доступна новая версия программы ({})')
		.en('A new version of the program is available ({})')
		.de('Eine neue Version des Programms ist verfügbar ({})')
		.ch('新版本的方案已经推出（{}）'),

	installer: new LocalizationStrings()
		.ru('Установщик (.exe)')
		.en('Installer (.exe)')
		.de('Installer (.exe)')
		.ch('安装程序（.exe)'),

	portable: new LocalizationStrings()
		.ru('Портативная (.rar)')
		.en('Portable (.rar)')
		.de('Portable (.rar)')
		.ch('便携式（.rar)'),

	update: new LocalizationStrings()
		.ru('Обновить')
		.en('Update')
		.de('Update')
		.ch('更新资料'),

	ignore: new LocalizationStrings()
		.ru('Игнорировать')
		.en('Ignore')
		.de('Ignorieren')
		.ch('忽略不计'),

	downloading: new LocalizationStrings()
		.ru('Загрузка обновления')
		.en('Downloading the update')
		.de('Update wird heruntergeladen')
		.ch('正在下载更新'),

	downloaded: new LocalizationStrings()
		.ru('Загрузка завершена. Запускаем установщик...')
		.en('Download complete. Starting the installer...')
		.de('Download abgeschlossen. Installationsprogramm wird gestartet...')
		.ch('下载完成。正在启动安装程序...'),

	downloadError: new LocalizationStrings()
		.ru('Не удалось загрузить обновление')
		.en('Failed to download the update')
		.de('Update konnte nicht heruntergeladen werden')
		.ch('下载更新失败'),

	close: new LocalizationStrings()
		.ru('Закрыть')
		.en('Close')
		.de('Schließen')
		.ch('关闭')
}))
