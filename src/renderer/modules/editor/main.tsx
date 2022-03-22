import { PureComponent } from 'react'
import { render } from 'react-dom'
import { load } from 'cheerio'
import type { CSSProperties } from 'react'
import type { Cheerio, CheerioAPI, Node } from 'cheerio'
import type IIEParam from './types/IIEParam'
import type ITemplateParams from 'templates/types/ITemplateParams'
import type IExportData from './types/IExportData'
import type IEditorAction from './types/IEditorAction'
import Menu from 'menu'
import FileType from 'templates/enums/FileType'

import { getIngameText, MAIN, prettify, setHotKey } from 'scripts/funcs'
import main from 'scripts/main'
import local from 'scripts/storage'
import localize from 'scripts/localize'
import { process, getGlobalTemplates } from 'scripts/dom'
import { IMainContext, MainContext } from './MainContext'

import ErrorHandler from 'modules/components/ErrorHandler'
import Alert, { showAlert } from 'modules/components/Alert'
import Confirm, { showConfirm } from 'modules/components/Confirm'
import Loading, { showLoading } from 'modules/components/Loading'
import DropArea from 'modules/components/DropArea'
import Popup from 'modules/components/Popup'
import Parameters from './components/Parameters'
import ErrorHeader from './components/ErrorHeader'
import MainHeader from './components/MainHeader'

import { Typography } from '@mui/material'
import Container from 'modules/components/styled/Container'
import 'styles/editor'

const { basename, readFileSync, writeFileSync } = window.service
const { updateFiles, openEPFDialog, openSaveDialog, openList } = main

interface IState {
    isExporting: boolean
    title: string
    menuAnchor: Element
    enableReset: boolean
}

export default class Editor extends PureComponent<any, IState> {
    private styles = {
        errorCont: {
            padding: '0 30px',
            marginTop: '100px',
            textAlign: 'center'
        } as CSSProperties,
        params: {
            padding: '0 30px',
            marginTop: '100px'
        }
    }
    private tableItems: ITemplateParams
    private mainTitle: string
    private hasError: boolean
    private templates: Cheerio<Node>
    private globalTemplates: CheerioAPI
    private toReset: {
        [id: string]: () => void
    }
    private defaults: {
        [selector: string]: {
            [attribute: string]: string | number
        }
    }
    private EXPORT_FILE_VERSION = '2.0'
    private params: IIEParam[] = []

    private fileDOM: CheerioAPI
    private actions: IEditorAction[]
    private files: {
        dom: CheerioAPI
        path: string
        mod: string
        dlc: string
        fileType: FileType
    }[]
    
    public currentMod: string
    public currentDLC: string
    public filePath: string

    constructor(props: any) {
        super(props)

        this.init()
        this.state = {
            isExporting: false,
            title: this.mainTitle,
            enableReset: !this.currentMod,
            menuAnchor: null
        }
        this.files = [{
            path: this.filePath,
            dom: this.fileDOM,
            mod: this.currentMod,
            dlc: this.currentDLC,
            fileType: FileType.truck
        }]

        if (this.fileDOM('error').length) {
            this.hasError = true
        }
    }

    public init() {
        this.toReset = {}
        this.filePath = local.get('filePath')
        const [fileDOM, tableItems, actions] = process(this.filePath)
        this.fileDOM = fileDOM
        this.actions = actions
        this.tableItems = tableItems
        this.currentMod = local.get('currentMod')
        this.currentDLC = local.get('currentDLC')
        this.mainTitle = this.getMainTitle()
        this.templates = this.fileDOM('_templates')
        this.globalTemplates = getGlobalTemplates()
        this.defaults = main.defaults[basename(this.filePath)] ?? {}
    }

    public componentDidMount(): void {
        this.setBackHotkey()
        this.checkExporting()
    }

    public render() {
        const mainContext: IMainContext = {
            addToSave: this.addFile,
            fileDOM: this.fileDOM,
            filePath: this.filePath,
            addParam: this.addParam,
            removeParam: this.removeParam,
            currentDLC: this.currentDLC,
            currentMod: this.currentMod,
            templates: this.templates,
            globalTemplates: this.globalTemplates,
            tableItems: this.tableItems,
            defaults: this.defaults
        }

        if (this.hasError) {
            return <>
                <Menu/>
                <ErrorHandler/>
                <Loading/>

                <ErrorHeader 
                    title={this.state.title}
                    back={this.back}
                    files={this.files}
                />
                <Container
                    style={this.styles.errorCont}
                >
                    <Typography>
                        {localize.PROC_FILE_ERROR}
                    </Typography>
                </Container>
            </>
        }

        return <>
            <Menu/>
            <ErrorHandler/>
            <DropArea onDrop={this.onDropFile}/>
            <Alert/>
            <Confirm/>
            <Loading/>
            <Popup/>
            
            <MainHeader
                editor={this}
                title={this.state.title}
                back={this.back}
                save={this.save}
                menuAnchor={this.state.menuAnchor}
                reset={this.reset}
                importFile={this.importFile}
                exportFile={this.exportFile}
                enableReset={this.state.enableReset}
                actions={this.actions}
                files={this.files}
            />
            <MainContext.Provider value={mainContext}>
                <Container id='table' style={this.styles.params}>
                    <Parameters
                        isExporting={this.state.isExporting}
                        regReset={this.regReset}
                        unregReset={this.unregReset}
                    />
                </Container>
            </MainContext.Provider>
        </>
    }

    private onDropFile = (files: FileList) => this.importFile(files[0].path)

    private checkExporting() {
        if (local.pop('isExport') === 'true') {
            this.setState({ isExporting: true }, () => {
                this.exportFile()
                window.close()
            })
        }
    }

    private addFile = (mod: string, dlc: string, dom: CheerioAPI, path: string, fileType: FileType) => {
        this.files.push({ dom, path, mod, dlc, fileType })
    }

    private addParam = (param: IIEParam) => {
        this.params.push(param)
    }

    private regReset = (id: string, func: () => void) => {
        this.toReset[id] = func
    }

    private unregReset = (id: string) => {
        delete this.toReset[id]
    }

    private removeParam = (id: string) => {
        this.params.filter(item => item.id !== id)
    }

    private setBackHotkey = () => {
        setHotKey({
            key: 'Escape',
            eventName: 'keydown'
        }, () => this.back())
    }

    private getMainTitle() {
        if (this.fileDOM('GameData UiDesc').length === 1) {
            const text = this.fileDOM('GameData UiDesc').attr('UiName')
            return getIngameText(text, this.currentMod) || text
        }

        if (this.filePath.split('/').length !== 1) {
            let a = this.filePath.split('/')
            return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase()
        }
        else {
            let a = this.filePath.split('\\')
            return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase()
        }
    }

    public save = async (isUpdateFiles = true) => {
        this.setState({ title: localize.SAVING_MESSAGE })
        await new Promise<void>(resolve => {
            setTimeout(() => {
                for (const file of this.files) {
                    const dom = load(file.dom.html(), { xmlMode: true })

                    dom('[SXMLE_ID]').map((_, el) =>
                        dom(el).removeAttr('SXMLE_ID'))
                    writeFileSync(file.path, dom.html())
                }

                if (isUpdateFiles) {
                    if (this.currentMod)
                        updateFiles(this.currentMod)
                    updateFiles()
                    showAlert({ text: localize.SUCCESS_SAVE_FILES })
                }
                this.setState({ title: this.mainTitle })
                resolve()
            }, 100)
        })
    }

    private importFile = (path?: string) => {
        const currentFileName = basename(this.filePath)
        const filePath = path ?? openEPFDialog()
        let data: IExportData | IExportData[]

        if (!filePath) {
            showAlert({ text: localize.PARAMS_FILE_NOT_FOUND, type: 'error' })
            return
        }
        data = JSON.parse(readFileSync(filePath))

        const importData = (item: IExportData) => {
            for (const fileName in item.data) {
                for (const selector in item.data[fileName]) {
                    for (const attribute in item.data[fileName][selector]) {
                        for (const obj of this.params) {
                            const forImport = obj.forImport
                            if (forImport.selector === selector && forImport.name === attribute && forImport.fileName === fileName)
                                forImport.setValue(String(item.data[fileName][selector][attribute]))
                        }
                    }
                }
            }
            for (const actionID in item.actionsData) {
                for (const action of this.actions) {
                    if (action.id === actionID)
                        action.object.import(item.actionsData[actionID])
                }
            }
            showAlert({ text: localize.WAS_IMPORTED })
            return true
        }

        if (data instanceof Array) {
            let imported = false

            for (const item of data) {
                if (item.fileName === currentFileName) {
                    if (importData(item))
                        imported = true
                }
            }

            if (!imported)
                showAlert({ text: localize.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName), type: 'error' })
        }
        else if (currentFileName !== data.fileName) {
            showAlert({ text: localize.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName), type: 'error' })
        }
        else {
            importData(data)
        }
    }

    private exportFile = () => {
        let out: IExportData
        let pathToSave: string

        if (!this.state.isExporting) {
            this.setState({ isExporting: true })
            return
        }

        pathToSave = openSaveDialog(basename(this.filePath, '.xml'))
        if (!pathToSave) {
            showAlert({ text: localize.PATH_TO_SAVE_NOT_FOUND, type: 'error' })
            return
        }

        out = {
            fileName: basename(this.filePath),
            data: {},
            actionsData: {},
            version: this.EXPORT_FILE_VERSION
        }

        for (const param of this.params) {
            const expObj = param.forExport()
            if (!expObj)
                continue

            const { fileName, name, selector, value } = expObj

            if (!out.data[fileName]) {
                out.data[fileName] = {}
            }
            if (!out.data[fileName][selector]) {
                out.data[fileName][selector] = {}
            }
            out.data[fileName][selector][name] = value
        }

        for (const action of this.actions) {
            const exported = action.object.export()
            if (exported)
                out.actionsData[action.id] = exported
        }

        writeFileSync(pathToSave, JSON.stringify(out, null, '\t'))
        showAlert({ text: localize.WAS_EXPORTED })
        this.setState({
            isExporting: false,
            menuAnchor: null
        })
    }

    private back = () => {
        showLoading()
        openList()
    }

    private reset = () => {
        showConfirm({
            text: localize.RESET_CONFIRM_MESSAGE,
            onSuccess: () => {
                for (const itemID in this.toReset) {
                    this.toReset[itemID]()
                }
                this.setState({ menuAnchor: null })
                showAlert({ text: localize.SUCCESS_RESET })
            }
        })
    }
}

render(<Editor/>, MAIN)
