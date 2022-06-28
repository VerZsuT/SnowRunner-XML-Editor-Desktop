import { memo } from "react";

import { Menu, MenuProps } from "antd";
import Window from "enums/Window";
import globalTexts from "globalTexts/renderer";
import config from "scripts/config";
import main from "scripts/main";

import texts from "./texts";

type MenuItem = Required<MenuProps>["items"][number];

const {
    quitApp: quit, openLink, openPath, resetConfig, recoverFromBackup, copyBackup,
    runUninstall, importConfig, exportConfig, openWindow, paths
} = main;
const {
    EXIT_MENU_ITEM_LABEL,
    SETTINGS_MENU_LABEL,
    RESTORE_MENU_ITEM_LABEL,
    IMPORT_MENU_ITEM_LABEL,
    EXPORT_MENU_ITEM_LABEL,
    UNINSTALL_MENU_ITEM_LABEL,
    VERSION_MENU_ITEM_LABEL,
    HOW_TO_USE_TITLE,
    FILE_MENU_LABEL,
    BACKUP_MENU_LABEL,
    HELP_MENU_LABEL
} = texts;
const {
    OPEN_BUTTON,
    SAVE_BUTTON,
    RESET_MENU_ITEM_LABEL
} = globalTexts;

const hasInitial = !config.initial;

const fileMenu: MenuItem[] = [
    {
        label: EXIT_MENU_ITEM_LABEL,
        onClick: () => quit(),
        key: "exit"
    }
];

const backupMenu: MenuItem[] = [
    {
        label: OPEN_BUTTON,
        onClick: () => openPath(paths.backupFolder),
        key: "open-backup"
    },
    { type: "divider" },
    {
        label: SAVE_BUTTON,
        onClick: () => copyBackup(),
        key: "save-backup"
    },
    {
        label: RESTORE_MENU_ITEM_LABEL,
        onClick: () => recoverFromBackup(),
        key: "recover-backup"
    }
];

const settingsMenu: MenuItem[] = [
    {
        label: SETTINGS_MENU_LABEL,
        disabled: hasInitial,
        onClick: () => openWindow(Window.Settings),
        key: "open-settings"
    },
    { type: "divider" },
    {
        label: IMPORT_MENU_ITEM_LABEL,
        onClick: () => importConfig(false),
        key: "import-settings"
    },
    {
        label: EXPORT_MENU_ITEM_LABEL,
        disabled: hasInitial,
        onClick: () => exportConfig(false),
        key: "export-settings"
    },
    { type: "divider" },
    {
        label: RESET_MENU_ITEM_LABEL,
        disabled: hasInitial,
        onClick: () => resetConfig(),
        key: "reset-settings"
    },
    {
        label: UNINSTALL_MENU_ITEM_LABEL,
        onClick: () => runUninstall(),
        key: "unins-program"
    }
];

const helpMenu: MenuItem[] = [
    {
        label: VERSION_MENU_ITEM_LABEL,
        onClick: () => openWindow(Window.WhatsNew),
        key: "show-version"
    },
    { type: "divider" },
    {
        label: HOW_TO_USE_TITLE,
        onClick: () => openLink("https://snowrunner.mod.io/guides/snowrunner-xml-editor"),
        key: "how-to-use"
    },
    {
        label: "GitHub",
        onClick: () => openLink("https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop"),
        key: "github"
    },
    {
        label: "YouTube(RU)",
        onClick: () => openLink("https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2"),
        key: "youtube"
    }
];

const menuItems: MenuItem[] = [
    {
        label: FILE_MENU_LABEL,
        key: "file-submenu",
        children: fileMenu
    },
    {
        label: BACKUP_MENU_LABEL,
        disabled: hasInitial,
        key: "backup-submenu",
        children: backupMenu
    },
    {
        label: SETTINGS_MENU_LABEL,
        key: "settings-submenu",
        children: settingsMenu
    },
    {
        label: HELP_MENU_LABEL,
        key: "help-submenu",
        children: helpMenu
    }
];

/** Верхнее сервисное меню */
export default memo(() => (
    <Menu className="menu" mode="horizontal" selectable={false} items={menuItems}/>
));
