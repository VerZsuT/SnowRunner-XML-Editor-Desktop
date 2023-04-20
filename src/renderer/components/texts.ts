import { compareWithGlobal } from '#g/texts/renderer'

const $ = compareWithGlobal({
  RU: {
    EXIT_MENU_ITEM_LABEL: 'Выход',
    SETTINGS_MENU_LABEL: 'Настройки',
    UNINSTALL_MENU_ITEM_LABEL: 'Удалить программу',
    RESTORE_MENU_ITEM_LABEL: 'Восстановить',
    BACKUP_MENU_LABEL: 'Бэкап',
    FILE_MENU_LABEL: 'Файл',
    HELP_MENU_LABEL: 'Помощь',
    HOW_TO_USE_TITLE: 'Как пользоваться',
    VERSION_MENU_ITEM_LABEL: 'Версия'
  },
  EN: {
    EXIT_MENU_ITEM_LABEL: 'Exit',
    SETTINGS_MENU_LABEL: 'Settings',
    RESTORE_MENU_ITEM_LABEL: 'Restore',
    UNINSTALL_MENU_ITEM_LABEL: 'Uninstall the program',
    BACKUP_MENU_LABEL: 'Backup',
    FILE_MENU_LABEL: 'File',
    HELP_MENU_LABEL: 'Help',
    HOW_TO_USE_TITLE: 'How to use',
    VERSION_MENU_ITEM_LABEL: 'Version'
  },
  DE: {
    EXIT_MENU_ITEM_LABEL: 'Exit',
    SETTINGS_MENU_LABEL: 'Einstellungen',
    RESTORE_MENU_ITEM_LABEL: 'Standard Wiederherstellen',
    UNINSTALL_MENU_ITEM_LABEL: 'Programm deinstallieren',
    BACKUP_MENU_LABEL: 'Sicherung',
    FILE_MENU_LABEL: 'Datei',
    HELP_MENU_LABEL: 'Hilfe',
    HOW_TO_USE_TITLE: 'Wie benutzt man',
    VERSION_MENU_ITEM_LABEL: 'Ausführung'
  },
  CH: {
    EXIT_MENU_ITEM_LABEL: '退出',
    SETTINGS_MENU_LABEL: '设置',
    RESTORE_MENU_ITEM_LABEL: '还原',
    UNINSTALL_MENU_ITEM_LABEL: '卸载程序',
    BACKUP_MENU_LABEL: '备份',
    FILE_MENU_LABEL: '文件',
    HELP_MENU_LABEL: '帮助',
    HOW_TO_USE_TITLE: '如何使用',
    VERSION_MENU_ITEM_LABEL: '版本'
  }
}, {
  EXPORT_DEFAULTS_TITLE: 'Export defaults',
  GITHUB_TITLE: 'Github',
  YOUTUBE_TITLE: 'YouTube(RU)'
})

export default $
