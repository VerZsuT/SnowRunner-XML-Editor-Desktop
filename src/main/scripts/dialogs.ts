import { dialog as elDialog, nativeImage } from "electron";

import DialogAlertType from "enums/DialogAlertType";
import DialogSourceType from "enums/DialogSourceType";
import DialogType from "enums/DialogType";
import type IDialogAlertParams from "types/IDialogAlertParams";
import type IDialogParams from "types/IDialogParams";
import type IOpenDialogParams from "types/IOpenDialogParams";

import paths from "./paths";
import { publicFunction } from "./renderChannel";
import texts from "./texts";

const { ERROR } = texts;

const extNames = {
    epf: "Editor params file",
    ecf: "Editor configuration file",
    pak: "Package file",
    xml: "XML file"
};

publicFunction("openXMLDialog", getXML);
publicFunction("openEPFDialog", getEPF);
publicFunction("openSaveDialog", saveEPF);
publicFunction("openInitialDialog", getInitial);
publicFunction("openDialog", getDir);

/** Выводит ошибку на экран */
export function error(message: string) {
    alert({
        type: "warning",
        title: ERROR,
        message
    });
}

/** Открыть окно с сообщением */
export function alert(params: IDialogAlertParams) {
    const {
        dialogType = DialogAlertType.sync,
        buttons = ["OK"],
        noLink = false,
        type = "info",
        title, message
    } = params;
    const dialogParams = {
        icon: nativeImage.createFromPath(paths.icon),
        title,
        message,
        buttons,
        noLink,
        type
    };

    if (dialogType === DialogAlertType.sync)
        return elDialog.showMessageBoxSync(dialogParams);

    return elDialog.showMessageBox(dialogParams);
}

/** Открыть окно выбора `.epf` файла */
export function getEPF() {
    return <string>openDialog({ extention: "epf" });
}

/** Открыть окно сохранения `.epf` файла */
export function saveEPF(defaultName: string) {
    return <string>openDialog({
        type: DialogType.save,
        defaultPath: defaultName,
        extention: "epf"
    });
}

/** Открыть окно выбора `initial.pak` */
export function getInitial() {
    return <string>openDialog({ extention: "pak" });
}

/** Открыть окно выбора папки */
export function getDir() {
    return <string>openDialog({ source: DialogSourceType.dir });
}

/** Открыть окно выбора нескольких `.epf` файлов */
export function getMultiEPF() {
    return <string[]>openDialog({
        properties: ["openFile", "multiSelections"],
        extention: "epf"
    });
}

/** Открыть окно выбора `.xml` файла */
export function getXML() {
    return <string>openDialog({ extention: "xml" });
}

/** Открыть диалоговое окно */
export function openDialog(params: IOpenDialogParams): string | string[] {
    const {
        type = DialogType.open,
        source = DialogSourceType.file,
        properties = (source === DialogSourceType.file
            ? ["openFile"]
            : ["openDirectory"]),
        defaultPath, extention
    } = params;
    const dialogParams: IDialogParams = { properties };

    if (extention) {
        dialogParams.filters = [{
            name: extNames[extention],
            extensions: [extention]
        }];
    }

    if (type === DialogType.open) {
        const result = elDialog.showOpenDialogSync(dialogParams);
        if (result instanceof Array) {
            if (!dialogParams.properties.includes("multiSelections"))
                return result[0];
            return result;
        }
    }
    else {
        const saveDialogParams = {
            defaultPath,
            filters: dialogParams.filters
        };
        const result = elDialog.showSaveDialogSync(saveDialogParams);

        if (result)
            return result;
    }
}
