import type { app, shell } from "electron";

import type { syncUnpackArchive, unpackMain } from "main/scripts/archive";
import type { copyBackup, recoverBackup, saveBackup } from "main/scripts/backup";
import type { checkUpdate } from "main/scripts/checks";
import type { exportConfig, importConfig, resetConfig } from "main/scripts/configMethods";
import type { getDir, getEPF, getInitial, getXML, saveEPF } from "main/scripts/dialogs";
import type { joinEPF, seeEPF } from "main/scripts/epf";
import type { devTools, uninstall, updateFiles } from "main/scripts/public";
import type { findInDir } from "main/scripts/service";
import type { update } from "main/scripts/updates";
import type { setWindowSize } from "main/scripts/windows";
import type openWindow from "main/windows";

interface IFunctions {
    updateFiles: typeof updateFiles;
    runUninstall: typeof uninstall;
    unpack: typeof syncUnpackArchive;

    findInDir: typeof findInDir;
    joinEPF: typeof joinEPF;
    seeEPF: typeof seeEPF;
    reload: typeof app.relaunch;
    quit: typeof app.quit;
    importConfig: typeof importConfig;
    exportConfig: typeof exportConfig;
    openPath: typeof shell.openPath;
    openLink: typeof shell.openExternal;

    setWindowSize: typeof setWindowSize;
    openWindow: typeof openWindow;
    openDialog: typeof getDir;
    openXMLDialog: typeof getXML;
    openInitialDialog: typeof getInitial;
    openEPFDialog: typeof getEPF;
    openSaveDialog: typeof saveEPF;

    saveBackup: typeof saveBackup;
    copyBackup: typeof copyBackup;
    recoverFromBackup: typeof recoverBackup;
    resetConfig: typeof resetConfig;
    checkUpdate: typeof checkUpdate;
    update: typeof update;
    unpackFiles: typeof unpackMain;
    devTools: typeof devTools;
}

export default IFunctions;
