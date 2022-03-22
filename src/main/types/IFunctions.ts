import type { app, shell } from 'electron'
import type Archiver from 'main/classes/Archiver'
import type Backup from 'main/classes/Backup'
import type Checker from 'main/classes/Checker'
import type Config from 'main/classes/Config'
import type Dialog from 'main/classes/Dialog'
import type EPF from 'main/classes/EPF'
import type Public from 'main/classes/Public'
import type Updater from 'main/classes/Updater'
import type Windows from 'main/classes/Windows'
import type { findInDir } from 'main/service'

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

    openWhatsNew: typeof Windows.openWhatsNew
    openEditor: typeof Windows.openEditor
    openList: typeof Windows.openList
    openLoading: typeof Windows.openLoading
    openCategories: typeof Windows.openCategories
    openSettings: typeof Windows.openSettings
    openConsole: typeof Windows.openConsole
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

export default IFunctions
