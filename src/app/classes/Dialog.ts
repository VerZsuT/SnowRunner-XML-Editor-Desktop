import { dialog as elDialog, nativeImage } from 'electron'
import { paths } from '../service'

/** Отвечает за показ диалоговых окон. */
export default class Dialog {
    private static extNames = {
        epf: 'Editor params file',
        pak: 'Pakage file',
        xml: 'XML file'
    }

    /** Открывает окно с сообщением. */
    public static alert = (params: DialogAlertParams) => {
        const { dialogType='sync', title, message, buttons=['OK'], noLink=false, type='info' } = params
        const dialogParams = {
            icon: nativeImage.createFromPath(paths.icon),
            title,
            message,
            buttons,
            noLink,
            type
        }

        if (dialogType === 'sync') {
            return elDialog.showMessageBoxSync(dialogParams)
        } else {
            return elDialog.showMessageBox(dialogParams)
        }
    }

    /** Открывает окно выбора `.epf` файла. */
    public static getEPF = (): string | undefined => {
        return <string|undefined>this.openDialog({
            extention: 'epf'
        })
    }

    /** Открывает окно сохранения `.epf` файла. */
    public static saveEPF = (defaultName: string) => {
        return <string>this.openDialog({
            type: 'save',
            defaultPath: defaultName,
            extention: 'epf'
        })
    }
    
    /** Открывает окно выбора `initial.pak` */
    public static getInitial = () => {
        return <string>this.openDialog({
            extention: 'pak'
        })
    }

    /** Открывает окно выбора папки. */
    public static getDir = () => {
        return <string>this.openDialog({
            source: 'dir'
        })
    }

    /** Открывает окно выбора нескольких `.epf` файлов. */
    public static getMultiEPF = () => {
        return <string[]>this.openDialog({
            properties: ['openFile', 'multiSelections'],
            extention: 'epf'
        })
    }

    /** Открывает окно выбора `.xml` файла. */
    public static getXML = () => {
        return <string>this.openDialog({
            extention: 'xml'
        })
    }

    private static openDialog = (params: OpenDialogParams): string | string[] | undefined => {
        const { type='open', source='file', defaultPath, extention, properties=(source==='file'? ['openFile']:['openDirectory']) } = params
        const dialogParams: DialogParams = {
            properties
        }

        if (extention) {
            dialogParams.filters = [{
                name: this.extNames[extention],
                extensions: [extention]
            }]
        }

        if (type === 'open') {
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
                ...(()=>defaultPath? {defaultPath} : {})(),
                ...(()=>dialogParams.filters? {filters: dialogParams.filters} : {})()
            }
            const result = elDialog.showSaveDialogSync(saveDialogParams)
            if (result) return result
        }
    }
}
