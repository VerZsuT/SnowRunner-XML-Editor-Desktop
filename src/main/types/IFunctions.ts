import type { app, shell } from "electron";
import type Archiver from "../classes/Archiver";
import type Backup from "../classes/Backup";
import type Checker from "../classes/Checker";
import type Config from "../classes/Config";
import type Dialog from "../classes/Dialog";
import type EPF from "../classes/EPF";
import type Public from "../classes/Public";
import type Updater from "../classes/Updater";
import type Windows from "../classes/Windows";
import type { findInDir } from "../service";

interface IFunctions {
    getParams: typeof Public.getParams
    updateFiles: typeof Public.updateFiles
    runUninstall: typeof Public.runUninstall
    unpack: typeof Archiver.unpackSync

    findInDir: typeof findInDir
    joinEPF: typeof EPF.join
    seeEPF: typeof EPF.see
    reload: typeof app.relaunch
    quit: typeof app.quit
    importConfig: typeof Config.import
    exportConfig: typeof Config.export
    openPath: typeof shell.openPath
    openLink: typeof shell.openExternal

    openWindow: typeof Windows.open
    openDialog: typeof Dialog.getDir
    openXMLDialog: typeof Dialog.getXML
    openInitialDialog: typeof Dialog.getInitial
    openEPFDialog: typeof Dialog.getEPF
    openSaveDialog: typeof Dialog.saveEPF

    saveBackup: typeof Backup.save
    copyBackup: typeof Backup.copy
    recoverFromBackup: typeof Backup.recover
    resetConfig: typeof Config.reset
    checkUpdate: typeof Checker.checkUpdate
    update: typeof Updater.update
    unpackFiles: typeof Archiver.unpackMain
    toggleDevTools(): void
    enableDevTools(): void
    disableDevTools(): void
}

export default IFunctions;
