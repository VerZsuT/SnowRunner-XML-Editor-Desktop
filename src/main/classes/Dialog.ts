import { dialog as elDialog, nativeImage } from 'electron'
import type IDialogAlertParams from '../types/IDialogAlertParams'
import type IDialogParams from '../types/IDialogParams'
import type IOpenDialogParams from '../types/IOpenDialogParams'
import DialogType from '../enums/DialogType'
import DialogSourceType from '../enums/DialogSourceType'
import DialogAlertType from '../enums/DialogAlertType'

import { paths } from '../service'

/** Отвечает за показ диалоговых окон. */
export default class Dialog {
    private static extNames = {
        epf: 'Editor params file',
        ecf: 'Editor configuration file',
        pak: 'Pakage file',
        xml: 'XML file'
    }

    /** Открыть окно с сообщением. */
    public static alert = (params: IDialogAlertParams) => {
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

        if (dialogType === DialogAlertType.sync)
            return elDialog.showMessageBoxSync(dialogParams)
        else
            return elDialog.showMessageBox(dialogParams)
    }

    /** Открыть окно выбора `.epf` файла. */
    public static getEPF = (): string => {
        return <string>this.openDialog({ extention: 'epf' })
    }

    /** Открыть окно сохранения `.epf` файла. */
    public static saveEPF = (defaultName: string) => {
        return <string>this.openDialog({
            type: DialogType.save,
            defaultPath: defaultName,
            extention: 'epf'
        })
    }

    /** Открыть окно выбора `initial.pak` */
    public static getInitial = () => {
        return <string>this.openDialog({ extention: 'pak' })
    }

    /** Открыть окно выбора папки. */
    public static getDir = () => {
        return <string>this.openDialog({ source: DialogSourceType.dir })
    }

    /** Открыть окно выбора нескольких `.epf` файлов. */
    public static getMultiEPF = () => {
        return <string[]>this.openDialog({
            properties: ['openFile', 'multiSelections'],
            extention: 'epf'
        })
    }

    /** Открыть окно выбора `.xml` файла. */
    public static getXML = () => {
        return <string>this.openDialog({ extention: 'xml' })
    }

    /** Открыть диалоговое окно. */
    public static openDialog = (params: IOpenDialogParams): string | string[] => {
        const {
            type = DialogType.open,
            source = DialogSourceType.file,
            defaultPath, extention,
            properties = (source === DialogSourceType.file ? ['openFile'] : ['openDirectory'])
        } = params
        const dialogParams: IDialogParams = { properties }

        if (extention) {
            dialogParams.filters = [{
                name: this.extNames[extention],
                extensions: [extention]
            }]
        }

        if (type === DialogType.open) {
            const result = elDialog.showOpenDialogSync(dialogParams)
            if (result instanceof Array) {
                if (!dialogParams.properties.includes('multiSelections'))
                    return result[0]
                else
                    return result
            }
        }
        else {
            const saveDialogParams = {
                ...(() => defaultPath ? { defaultPath } : {})(),
                ...(() => dialogParams.filters ? { filters: dialogParams.filters } : {})()
            }
            const result = elDialog.showSaveDialogSync(saveDialogParams)
            
            if (result)
                return result
        }
    }
}
