import { readFileSync, writeFileSync } from "fs";
import { basename } from "path";

import { alert, getEPF, getMultiEPF, saveEPF } from "./dialogs";
import { publicFunction } from "./renderChannel";
import settings from "./settings";
import texts from "./texts";

const { SEE_EXPORTED_MESSAGE, SUCCESS_JOIN } = texts;

publicFunction("seeEPF", saveEPF);
publicFunction("joinEPF", joinEPF);

const DEFAULT_NAME = "joined";

/**
 * Открыть окно выбора `.epf` файлов.
 *
 * После выбора объединяет их и сохраняет по выбранному пользователем пути
 */
export function joinEPF() {
    const files = getMultiEPF();

    if (files && files.length > 1) {
        const result = [];
        const names = [];

        for (const filePath of files) {
            const fileObject = JSON.parse(readFileSync(filePath).toString());

            if (fileObject instanceof Array) {
                for (const obj of fileObject) {
                    if (!names.includes(obj.fileName)) {
                        result.push(obj);
                        names.push(obj.fileName);
                    }
                }
            }
            else if (!names.includes(fileObject.fileName)) {
                result.push(fileObject);
                names.push(fileObject.fileName);
            }
        }

        const pathToSave = saveEPF(DEFAULT_NAME);
        if (pathToSave) {
            writeFileSync(pathToSave, JSON.stringify(result, null, "\t"));
            alert({
                title: settings.appId,
                message: `${SUCCESS_JOIN}\n- ${files.map(value => basename(value)).join("\n- ")}`
            });
        }
    }
}

/**
 * Вывести содержимое `.epf` файла.
 *
 * Анализирует выбранный .epf файл и выводит окно с его содержимым в более удобном формате
 */
export function seeEPF() {
    const path = getEPF();

    if (!path)
        return;

    const fileObject = JSON.parse(readFileSync(path).toString());
    const result: string[] = [];

    if (fileObject instanceof Array) {
        for (const item of fileObject)
            result.push(item.fileName);
    }
    else {
        result.push(fileObject.fileName);
    }

    alert({
        title: settings.appId,
        message: `${SEE_EXPORTED_MESSAGE}\n\n${result.join("\n")}`
    });
}
