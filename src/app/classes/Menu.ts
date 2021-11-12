import { paths } from '../service'
import Config from './Config'
import Texts from './Texts'

/**
 * Овечает за меню программы.
*/
export default class Menu {
    private static config: IConfig = Config.obj

    /**
     * Возвращает шаблон меню.
    */
    public static get = (): IMenuTemplate[] => {
        return [
            {
                label: Texts.get('FILE_MENU_LABEL'),
                submenu: [
                    ...this.ifHasInitial([
                        {
                            label: Texts.get('SETTINGS_MENU_ITEM_LABEL'),
                            role: 'openSettings'
                        },
                        { role: 'separator' }
                    ]),
                    ...this.ifDevBuild(this.ifHasInitial([
                        {
                            label: Texts.get('RESET_MENU_ITEM_LABEL'),
                            role: 'resetConfig'
                        }
                    ])),
                    ...this.ifDevBuild([
                        {
                            label: 'DevTools',
                            role: 'devTools'
                        },
                        {
                            label: 'Reload',
                            role: 'reload'
                        }
                    ]),
                    {
                        label: Texts.get('EXIT_MENU_ITEM_LABEL'),
                        role: 'quitApp'
                    }
                ]
            },
            ...this.ifHasInitial([
                {
                    label: Texts.get('BACKUP_MENU_LABEL'),
                    submenu: [
                        {
                            label: Texts.get('OPEN_BUTTON'),
                            role: 'showFolder',
                            path: paths.backupFolder
                        },
                        { role: 'separator' },
                        {
                            label: Texts.get('SAVE_BUTTON'),
                            role: 'saveBackup'
                        },
                        {
                            label: Texts.get('RESTORE_MENU_ITEM_LABEL'),
                            role: 'restoreInitial'
                        }
                    ]
                }
            ]),
            ...this.ifHasInitial([
                {
                    label: Texts.get('EPF_MENU_LABEL'),
                    submenu: [
                        {
                            label: Texts.get('JOIN_EXPORTED_FILES'),
                            role: 'joinExported'
                        },
                        {
                            label: Texts.get('SEE_EXPORTED_FILE'),
                            role: 'seeExported'
                        }
                    ]
                }
            ]),
            {
                label: Texts.get('HELP_MENU_LABEL'),
                submenu: [
                    {
                        label: Texts.get('HOW_TO_USE_TITLE'),
                        role: 'openURL',
                        url: 'https://snowrunner.mod.io/guides/snowrunner-xml-editor'
                    },
                    {
                        label: 'GitHub',
                        role: 'openURL',
                        url: 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop'
                    },
                    {
                        label: 'YouTube(RU)',
                        role: 'openURL',
                        url: 'https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2'
                    }
                ]
            }
        ]
    }

    /**
     * Возвращает переданный шаблон если присутствует путь к initial.pak.
    */
    private static ifHasInitial = (menu: IMenuTemplate[]): IMenuTemplate[] => {
        if (this.config.paths.initial) {
            return menu
        }
        return []
    }

    /**
     * Возвращает переданный шаблон если тип билда `dev`.
    */
    private static ifDevBuild = (menu: IMenuTemplate[]): IMenuTemplate[] => {
        if (this.config.buildType === 'dev') {
            return menu
        }
        return []
    }
}
