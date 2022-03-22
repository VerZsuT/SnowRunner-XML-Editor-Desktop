import { readFileSync, writeFileSync } from 'fs'
import { basename } from 'path'

import Dialog from './Dialog'
import Settings from './Settings'
import Texts from './Texts'

/** Отвечает за работу с `.epf` файлами. */
export default class EPF {
    private static settings = Settings.obj

    /**
     * Открыть окно выбора `.epf` файлов.
     * 
     * _После выбора объединяет их и сохраняет по выбранному пользователем пути._
     */
    public static join = () => {
        const files = Dialog.getMultiEPF()

        if (files && files.length > 1) {
            const result = []
            const names = []
            let pathToSave: string

            for (const filePath of files) {
                const object = JSON.parse(readFileSync(filePath).toString())

                if (object instanceof Array) {
                    for (const obj of object) {
                        if (!names.includes(obj.fileName)) {
                            result.push(obj)
                            names.push(obj.fileName)
                        }
                    }
                }
                else {
                    if (!names.includes(object.fileName)) {
                        result.push(object)
                        names.push(object.fileName)
                    }
                }
            }

            pathToSave = Dialog.saveEPF('joined')
            if (pathToSave) {
                writeFileSync(pathToSave, JSON.stringify(result, null, '\t'))
                Dialog.alert({
                    title: this.settings.appId,
                    message: `${Texts.get('SUCCESS_JOIN')}\n- ${files.map((value) => basename(value)).join('\n- ')}`
                })
            }
        }
    }

    /**
     * Вывести содержимое `.epf` файла.
     * 
     * _Анализирует выбранный .epf файл и выводит окно с его содержимым в более удобном формате._
     */
    public static see = () => {
        const path = Dialog.getEPF()
        let object: any
        let result: string[]

        if (!path)
            return

        object = JSON.parse(readFileSync(path).toString())
        result = []

        if (object instanceof Array) {
            for (const item of object) {
                result.push(item.fileName)
            }
        }
        else {
            result.push(object.fileName)
        }

        Dialog.alert({
            title: this.settings.appId,
            message: `${Texts.get('SEE_EXPORTED_MESSAGE')}\n\n${result.join('\n')}`
        })
    }
}
