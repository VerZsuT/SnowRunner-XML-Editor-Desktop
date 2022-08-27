import type {app, shell} from 'electron'

import type {syncUnpackArchive, unpackMain} from 'main/scripts/archive'
import type {copyBackup, recoverFromBackup, saveBackup} from 'main/scripts/backup'
import type {checkUpdate} from 'main/scripts/checks'
import type {exportConfig, importConfig, resetConfig} from 'main/scripts/configMethods'
import type {getDir, getEPF, getInitial, getXML, saveEPF} from 'main/scripts/dialogs'
import type {joinEPF, seeEPF} from 'main/scripts/epf'
import type {devTools, uninstall, updateFiles} from 'main/scripts/public'
import type {findInDir} from 'main/scripts/service'
import type {update} from 'main/scripts/updates'
import type {openWindow} from 'main/windows'

export interface MainFunctions {
    updateFiles: typeof updateFiles
    runUninstall: typeof uninstall
    unpack: typeof syncUnpackArchive

    findInDir: typeof findInDir
    joinEPF: typeof joinEPF
    seeEPF: typeof seeEPF
    relaunchApp: typeof app.relaunch
    quitApp: typeof app.quit
    importConfig: typeof importConfig
    exportConfig: typeof exportConfig
    openPath: typeof shell.openPath
    openLink: typeof shell.openExternal

    openWindow: typeof openWindow
    getDir: typeof getDir
    getXML: typeof getXML
    getInitial: typeof getInitial
    getEPF: typeof getEPF
    saveEPF: typeof saveEPF

    saveBackup: typeof saveBackup
    copyBackup: typeof copyBackup
    recoverFromBackup: typeof recoverFromBackup
    resetConfig: typeof resetConfig
    checkUpdate: typeof checkUpdate
    updateApp: typeof update
    unpackMain: typeof unpackMain
    devTools: typeof devTools
}
