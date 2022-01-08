import { dialog as elDialog, nativeImage } from 'electron'
import { paths } from '../service'
import { DialogType, DialogSourceType, DialogAlertType } from '../enums'

/** Отвечает за показ диалоговых окон. */
export class Dialog {
    private static extNames = {
        epf: 'Editor params file',
        ecf: 'Editor configuration file',
        pak: 'Pakage file',
        xml: 'XML file'
    }

    /** Открывает окно с сообщением. */
    static alert = (params: DialogAlertParams) => {
        const {
            dialogType = DialogAlertType.sync,
            title, message,
            buttons = ['OK'],
            noLink = false,
            type = 'info'
        } = params
        const dialogParams = {
            icon: nativeImage.createFromPath(paths.icon),
            title,
            message,
            buttons,
            noLink,
            type
        }

        if (dialogType === DialogAlertType.sync) {
            return elDialog.showMessageBoxSync(dialogParams)
        } else {
            return elDialog.showMessageBox(dialogParams)
        }
    }

    /** Открывает окно выбора `.epf` файла. */
    static getEPF = (): string => {
        return <string>this.openDialog({
            extention: 'epf'
        })
    }

    /** Открывает окно сохранения `.epf` файла. */
    static saveEPF = (defaultName: string) => {
        return <string>this.openDialog({
            type: DialogType.save,
            defaultPath: defaultName,
            extention: 'epf'
        })
    }

    /** Открывает окно выбора `initial.pak` */
    static getInitial = () => {
        return <string>this.openDialog({
            extention: 'pak'
        })
    }

    /** Открывает окно выбора папки. */
    static getDir = () => {
        return <string>this.openDialog({
            source: DialogSourceType.dir
        })
    }

    /** Открывает окно выбора нескольких `.epf` файлов. */
    static getMultiEPF = () => {
        return <string[]>this.openDialog({
            properties: ['openFile', 'multiSelections'],
            extention: 'epf'
        })
    }

    /** Открывает окно выбора `.xml` файла. */
    static getXML = () => {
        return <string>this.openDialog({
            extention: 'xml'
        })
    }

    static openDialog = (params: OpenDialogParams): string | string[] => {
        const {
            type = DialogType.open,
            source = DialogSourceType.file,
            defaultPath, extention,
            properties = (source === DialogSourceType.file ? ['openFile'] : ['openDirectory'])
        } = params
        const dialogParams: DialogParams = {
            properties
        }

        if (extention) {
            dialogParams.filters = [{
                name: this.extNames[extention],
                extensions: [extention]
            }]
        }

        if (type === DialogType.open) {
            const result = elDialog.showOpenDialogSync(dialogParams)
            if (result instanceof Array) {
                if (!dialogParams.properties.includes('multiSelections')) {
                    return result[0]
                } else {
                    return result
                }
            }
        } else {
            const saveDialogParams = {
                ...(() => defaultPath ? { defaultPath } : {})(),
                ...(() => dialogParams.filters ? { filters: dialogParams.filters } : {})()
            }
            const result = elDialog.showSaveDialogSync(saveDialogParams)
            if (result) return result
        }
    }
}
