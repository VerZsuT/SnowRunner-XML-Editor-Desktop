import { BuildType, MenuRole } from './enums'
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
                            role: MenuRole.openSettings
                        },
                        { role: MenuRole.separator }
                    ]),
                    ...this.ifDevBuild(this.ifHasInitial([
                        {
                            label: Texts.get('RESET_MENU_ITEM_LABEL'),
                            role: MenuRole.resetConfig
                        }
                    ])),
                    ...this.ifDevBuild([
                        {
                            label: 'DevTools',
                            role: MenuRole.devTools
                        },
                        {
                            label: 'Reload',
                            role: MenuRole.reload
                        }
                    ]),
                    {
                        label: Texts.get('EXIT_MENU_ITEM_LABEL'),
                        role: MenuRole.quitApp
                    }
                ]
            },
            ...this.ifHasInitial([
                {
                    label: Texts.get('BACKUP_MENU_LABEL'),
                    submenu: [
                        {
                            label: Texts.get('OPEN_BUTTON'),
                            role: MenuRole.showFolder,
                            path: paths.backupFolder
                        },
                        { role: MenuRole.separator },
                        {
                            label: Texts.get('SAVE_BUTTON'),
                            role: MenuRole.saveBackup
                        },
                        {
                            label: Texts.get('RESTORE_MENU_ITEM_LABEL'),
                            role: MenuRole.recoverFromBackup
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
                            role: MenuRole.joinEPF
                        },
                        {
                            label: Texts.get('SEE_EXPORTED_FILE'),
                            role: MenuRole.seeEPF
                        }
                    ]
                }
            ]),
            {
                label: Texts.get('HELP_MENU_LABEL'),
                submenu: [
                    {
                        label: Texts.get('HOW_TO_USE_TITLE'),
                        role: MenuRole.openURL,
                        url: 'https://snowrunner.mod.io/guides/snowrunner-xml-editor'
                    },
                    {
                        label: 'GitHub',
                        role: MenuRole.openURL,
                        url: 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop'
                    },
                    {
                        label: 'YouTube(RU)',
                        role: MenuRole.openURL,
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
        if (this.config.buildType === BuildType.dev) {
            return menu
        }
        return []
    }
}
