import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export const ERROR_BOUNDARY_LOCALIZATION = loadLocalization(new Localization({
	title: new LocalizationStrings()
		.ru('Что-то пошло не так')
		.en('Something went wrong')
		.de('Etwas ist schiefgelaufen')
		.ch('出了点问题'),

	description: new LocalizationStrings()
		.ru('Страница не смогла отрисоваться. Перезапустите окно программы.')
		.en('The page could not be rendered. Restart the application window.')
		.de('Die Seite konnte nicht gerendert werden. Starten Sie das Fenster neu.')
		.ch('页面无法渲染。请重新启动程序窗口。'),

	restart: new LocalizationStrings()
		.ru('Перезапустить окно')
		.en('Restart window')
		.de('Fenster neu starten')
		.ch('重新启动窗口')
}))
