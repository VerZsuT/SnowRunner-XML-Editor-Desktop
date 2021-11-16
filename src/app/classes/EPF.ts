import { readFileSync, writeFileSync } from 'fs'
import { basename } from 'path'

import Dialog from './Dialog'
import Settings from './Settings'
import Texts from './Texts'

/** Отвечает за работу с `.epf` файлами. */
export default class EPF {
    private static settings: ISettings = Settings.obj

    /**
     * Открывает окно выбора `.epf` файлов.
     * 
     * _После выбора объединяет их и сохраняет по выбранному пользователем пути._
    */
    public static join = () => {
        const files = Dialog.getMultiEPF()
    
        if (files && files.length > 1) {
            const result = []
            const names = []
            for (const filePath of files) {
                const object = JSON.parse(readFileSync(filePath).toString())
                if (object instanceof Array) {
                    for (const obj of object) {
                        if (!names.includes(obj.fileName)) {
                            result.push(obj)
                            names.push(obj.fileName)
                        }
                    }
                } else {
                    if (!names.includes(object.fileName)) {
                        result.push(object)
                        names.push(object.fileName)
                    }
                }
            }
    
            const pathToSave = Dialog.saveEPF('joined')
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
     * Выводит окно выбора `.epf` файла.
     * 
     * _Анализирует выбранный .epf файл и выводит окно с его содержимым в более удобном формате._
    */
    public static see = () => {
        const path = Dialog.getEPF()
    
        if (!path) return
    
        const object = JSON.parse(readFileSync(path).toString())
        const result = []
    
        const stringify = item => {
            const name = item.fileName
            
            if (item.deps) {
                const deps = []
                for (const depName in item.deps) {
                    for (const fileName in item.deps[depName]) {
                        deps.push(fileName)
                    }
                }
                return `${name}:\n- ${deps.join('\n- ')}`
            } else {
                return name
            }
        }
    
        if (object instanceof Array) {
            for (const item of object) {
                result.push(stringify(item))
            }
        } else {
            result.push(stringify(object))
        }
    
        Dialog.alert({
            title: this.settings.appId,
            message: `${Texts.get('SEE_EXPORTED_MESSAGE')}\n${result.join('\n\n')}`
        })
    }
}
