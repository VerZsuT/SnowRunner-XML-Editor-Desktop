import { PureComponent } from 'react'
import { render } from 'react-dom'
import { getIngameText, MAIN, mainProcess, prettify, t } from 'scripts'
import { Search } from './components/Search'
import { Parameters } from './components/Parameters'
import { AddonsPopup } from './components/addonsPopup/AddonsPopup'
import { IMainContext, MainContext } from './MainContext'
import { getDOM, getGlobalTemplates } from './service'
import { Menu } from 'menu'
import 'styles/editor/main'

const { basename, readFile, saveFile } = window.editorPreload
const { config, local } = window.provider
const { writeFile, updateFiles, alertSync, openEPFDialog, openSaveDialog, openList, confirm } = mainProcess

interface IState {
    isExporting: boolean
    filter: string
    title: string
    showPopup: boolean
    enableReset: boolean
}

class Editor extends PureComponent<any, IState> {
    private fileDOM: Document
    private tableItems: ITemplateParams
    private filePath: string
    private currentMod: string
    private currentDLC: string
    private mainTitle: string
    private templates: Element
    private globalTemplates: Document
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
    private files: {
        dom: Document
        path: string
        mod: string
        dlc: string
    }[]

    constructor(props: any) {
        super(props)

        this.toReset = {}
        this.filePath = local.get('filePath')
        const [fileDOM, tableItems] = getDOM(this.filePath)
        this.fileDOM = fileDOM
        this.tableItems = tableItems
        this.currentMod = local.get('currentMod')
        this.currentDLC = local.get('currentDLC')
        this.mainTitle = this.getMainTitle()
        this.templates = this.fileDOM.querySelector('_templates')
        this.globalTemplates = getGlobalTemplates()
        this.defaults = mainProcess.defaults[basename(this.filePath)] ?? {}
        this.state = {
            isExporting: false,
            filter: '',
            title: this.mainTitle,
            showPopup: false,
            enableReset: !Boolean(this.currentMod)
        }
        this.files = [{
            path: this.filePath,
            dom: fileDOM,
            mod: this.currentMod,
            dlc: this.currentDLC
        }]
    }

    render() {
        const mainContext: IMainContext = {
            getDOM: getDOM,
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
            filter: this.state.filter,
            defaults: this.defaults
        }


        return (<>
            {Menu}
            <h1 id='error'>{t.PARSE_FILE_ERROR}</h1>
            <section id='work-zone'>
                <div id='editor'>
                    <Search value={this.state.filter} onChange={filter => this.setState({ filter })} />
                    <h2 id='title' className='title'>{this.state.title}</h2>

                    <button
                        className='btn btn-primary'
                        id='save'
                        onClick={() => this.save()}
                        title={t.SAVE_BUTTON}
                    ></button>
                    <button
                        className='btn btn-primary'
                        id='back'
                        onClick={this.back}
                        title={t.BACK_BUTTON}
                    ></button>
                    <button
                        className='btn btn-primary'
                        id='reset'
                        onClick={this.reset}
                        title={t.RESET_MENU_ITEM_LABEL}
                        disabled={!this.state.enableReset}
                    ></button>

                    <button
                        className='btn btn-primary'
                        id='show-addons'
                        onClick={this.showAddonPopup}
                        title={t.ADDONS_POPUP_TITLE}
                        disabled={!Boolean(this.fileDOM.querySelector('Truck') && !this.fileDOM.querySelector('Truck').getAttribute('Type'))}
                    ></button>
                    <AddonsPopup
                        fileDOM={this.fileDOM}
                        modId={this.currentMod}
                        truckName={basename(this.filePath, '.xml')}
                        hidePopup={this.hidePopup}
                        show={this.state.showPopup}
                    />
                    <button
                        className='btn btn-primary'
                        id='export'
                        onClick={this.exportFile}
                        title={t.EXPORT}
                    ></button>
                    <button
                        className='btn btn-primary'
                        id='import'
                        onClick={this.importFile}
                        title={t.IMPORT}
                    ></button>
                    <MainContext.Provider value={mainContext}>
                        <Parameters
                            isExporting={this.state.isExporting}
                            regReset={this.regReset}
                            unregReset={this.unregReset}
                        />
                    </MainContext.Provider>
                </div>
            </section>
        </>)
    }

    private addFile = (mod: string, dlc: string, dom: Document, path: string) => {
        this.files.push({ dom, path, mod, dlc })
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

    private showAddonPopup = () => {
        this.setState({
            showPopup: true
        })
    }

    private hidePopup = () => {
        this.setState({
            showPopup: false
        })
    }

    private getMainTitle() {
        if (this.fileDOM.querySelectorAll('GameData UiDesc').length === 1) {
            const text = this.fileDOM.querySelector('GameData UiDesc').getAttribute('UiName')
            return getIngameText(text, this.currentMod) || text
        }

        if (this.filePath.split('/').length !== 1) {
            let a = this.filePath.split('/')
            return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase()
        } else {
            let a = this.filePath.split('\\')
            return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase()
        }
    }

    private save = async () => {
        this.setState({
            title: t.SAVING_MESSAGE
        })
        await new Promise<void>(resolve => {
            setTimeout(() => {
                const serializer = new XMLSerializer()
                const copyrightText = `<!--\n\tEdited by: SnowRunner XML Editor Desktop\n\tVersion: v${config.version}\n\tAuthor: VerZsuT\n\tSite: https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/\n-->\n`
                for (const file of this.files) {
                    file.dom.querySelectorAll('[SXMLE_ID]').forEach(item => {
                        item.removeAttribute('SXMLE_ID')
                    })

                    const xmlString = `${copyrightText}${serializer.serializeToString(file.dom).replace('<root>', '').replace('</root>', '')}`
                    writeFile(file.path, xmlString)
                }

                
                if (this.currentMod) {
                    updateFiles(this.currentMod)
                }
                updateFiles()
                this.setState({
                    title: this.mainTitle
                })
                alertSync(t.SUCCESS_SAVE_FILES)
                resolve()
            }, 100)
        })
    }

    private importFile = () => {
        const currentFileName = basename(this.filePath)
        const filePath = openEPFDialog()

        if (!filePath) {
            alertSync(t.PARAMS_FILE_NOT_FOUND)
            return
        }
        const data = JSON.parse(readFile(filePath).toString())

        const next = (item: any, fromArray?: boolean) => {
            if (currentFileName !== item.fileName) {
                if (!fromArray) {
                    alertSync(t.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
                }
                return false
            }

            for (const fileName in item.data) {
                for (const selector in item.data[fileName]) {
                    for (const attribute in item.data[fileName][selector]) {
                        for (const obj of this.params) {
                            const forImport = obj.forImport
                            if (forImport.selector === selector && forImport.name === attribute && forImport.fileName === fileName) {
                                forImport.setValue(item.data[fileName][selector][attribute])
                            }
                        }
                    }
                }
            }
            alertSync(t.WAS_IMPORTED)
            return true
        }

        if (data instanceof Array) {
            let imported = false

            for (const item of data) {
                if (item.fileName === currentFileName) {
                    if (next(item, true)) {
                        imported = true
                    }
                }
            }

            if (!imported) {
                alertSync(t.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
            }
        } else {
            next(data)
        }
    }

    private exportFile = () => {
        if (!this.state.isExporting) {
            this.setState({
                isExporting: true
            })
            return
        }

        const out = {
            fileName: basename(this.filePath),
            data: {},
            version: this.EXPORT_FILE_VERSION
        }

        for (const param of this.params) {
            const expObj = param.forExport()
            if (!expObj) continue
            const { fileName, name, selector, value } = expObj

            if (!out.data[fileName]) out.data[fileName] = {}
            if (!out.data[fileName][selector]) out.data[fileName][selector] = {}
            out.data[fileName][selector][name] = value
        }

        const pathToSave = openSaveDialog(basename(this.filePath, '.xml'))
        if (!pathToSave) {
            alertSync(t.PATH_TO_SAVE_NOT_FOUND)
            return
        }

        saveFile(pathToSave, JSON.stringify(out, null, '\t'))
        alertSync(t.WAS_EXPORTED)
        this.setState({
            isExporting: false
        })
    }

    private back = () => {
        openList()
    }

    private reset = () => {
        if (!confirm(t.RESET_CONFIRM_MESSAGE)) {
            return
        }
        
        for (const itemID in this.toReset) {
            this.toReset[itemID]()
        }
    }
}

render(<Editor />, MAIN)
