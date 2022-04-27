import { readFileSync, writeFileSync } from "fs";
import { basename } from "path";

import { settings } from "./Settings";
import dialog from "./Dialog";
import texts from "./Texts";
import { linkWithRenderAs } from "../renderChannel";
import HasLinked from "../types/HasLinked";

/** Отвечает за работу с `.epf` файлами. */
class EPF extends HasLinked {
    /**
     * Открыть окно выбора `.epf` файлов.
     * 
     * _После выбора объединяет их и сохраняет по выбранному пользователем пути._
     */
    @linkWithRenderAs("joinEPF")
    public join() {
        const files = dialog.getMultiEPF();

        if (files && files.length > 1) {
            const result = [];
            const names = [];
            let pathToSave: string;

            for (const filePath of files) {
                const object = JSON.parse(readFileSync(filePath).toString());

                if (object instanceof Array) {
                    for (const obj of object) {
                        if (!names.includes(obj.fileName)) {
                            result.push(obj);
                            names.push(obj.fileName);
                        }
                    }
                }
                else {
                    if (!names.includes(object.fileName)) {
                        result.push(object);
                        names.push(object.fileName);
                    }
                }
            }

            pathToSave = dialog.saveEPF("joined");
            if (pathToSave) {
                writeFileSync(pathToSave, JSON.stringify(result, null, "\t"));
                dialog.alert({
                    title: settings.appId,
                    message: `${texts.get("SUCCESS_JOIN")}\n- ${files.map((value) => basename(value)).join("\n- ")}`
                });
            }
        }
    }

    /**
     * Вывести содержимое `.epf` файла.
     * 
     * _Анализирует выбранный .epf файл и выводит окно с его содержимым в более удобном формате._
     */
    @linkWithRenderAs("seeEPF")
    public see() {
        const path = dialog.getEPF();
        let object: any;
        let result: string[];

        if (!path)
            return;

        object = JSON.parse(readFileSync(path).toString());
        result = [];

        if (object instanceof Array) {
            for (const item of object) {
                result.push(item.fileName);
            }
        }
        else {
            result.push(object.fileName);
        }

        dialog.alert({
            title: settings.appId,
            message: `${texts.get("SEE_EXPORTED_MESSAGE")}\n\n${result.join("\n")}`
        });
    }
}

export default new EPF();
