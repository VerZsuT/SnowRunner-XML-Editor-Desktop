import { PureComponent } from 'react'
import { render } from 'react-dom'
import '@sxmle-bootstrap'
import '@sxmle-service/menu'
import '@sxmle-main-style'

import { get, getIngameText, MAIN, mainProcess, prettify, t } from '@sxmle-service'
import Search from './components/Search'
import Parameters from './components/Parameters'
import { MainContext } from './MainContext'

interface IState {
    isExporting: boolean
    filter: string
    title: string
    ADV: ConfigADV
    ETR: ConfigETR
}

class Editor extends PureComponent<any, IState> {
    private importData: any
    private fileDOM: Document
    private tableItems: ITemplateParams
    private filePath: string
    private isBridge: boolean
    private currentMod: string
    private currentDLC: string
    private mainTitle: string
    private templates: Element
    private globalTemplates: Document

    private EXPORT_FILE_VERSION = '1.0'
    private params = []
    private deps = {}

    constructor(props: any) {
        super(props)

        this.importData = local.get('importData')? JSON.parse(local.pop('importData')) : null
        this.filePath = local.pop('filePath')
        const [fileDOM, tableItems] = this.getDOM()
        this.fileDOM = fileDOM
        this.tableItems = tableItems
        this.isBridge = local.pop('isBridge') === 'true'
        this.currentMod = local.pop('currentMod')
        this.currentDLC = local.pop('currentDLC')
        this.mainTitle = this.getMainTitle()
        this.templates = this.fileDOM.querySelector('_templates')
        this.globalTemplates = this.getGlobalTemplates()
        this.state = {
            isExporting: false,
            filter: '',
            title: this.mainTitle,
            ADV: Object.assign({}, config.ADV),
            ETR: Object.assign({}, config.ETR)
        }
    }

    componentDidMount() {
        if (this.isBridge) {
            if (!this.importData) {
                this.exportFile()
            } else {
                this.importFile()
            }
        }
    }

    render() {
        const mainContext = {
            ADV: this.state.ADV,
            ETR: this.state.ETR,
            setADV: this.setADV,
            setETR: this.setETR,
            fileDOM: this.fileDOM,
            filePath: this.filePath,
            addParam: this.addParam,
            addDep: this.addDep,
            currentDLC: this.currentDLC,
            currentMod: this.currentMod,
            templates: this.templates,
            globalTemplates: this.globalTemplates,
            tableItems: this.tableItems,
            filter: this.state.filter
        }

        return (<>
            <h1 id='error'>{t.PARSE_FILE_ERROR}</h1>
            <section id='work-zone'>
                <div id='editor'>
                    <MainContext.Provider value={mainContext}>
                        <Search value={this.state.filter} onChange={filter=>this.setState({filter})} />

                        <h2 id='title' className='title'>{this.state.title}</h2>

                        <Parameters isExporting={this.state.isExporting} />
                        
                        <button
                            className='btn btn-primary'
                            id='save-params'
                            onClick={()=>this.save()}
                            title={t.SAVE_BUTTON}
                        ></button>
                        <button
                            className='btn btn-primary'
                            id='back'
                            onClick={this.back}
                            title={t.CLOSE}
                        ></button>
                        {this.state.ADV[this.filePath] || this.state.ETR[this.filePath]
                            ? <button
                                className='btn btn-primary'
                                id='reset'
                                onClick={this.reset}
                                title={t.RESET_MENU_ITEM_LABEL}
                            ></button>
                            : null
                        }
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
                    </MainContext.Provider>
                </div>
            </section>
        </>)
    }

    private setADV = (newADV: ConfigADV) => {
        this.setState({
            ADV: newADV
        })
    }

    private setETR = (newETR: ConfigETR) => {
        this.setState({
            ETR: newETR
        })
    }

    private addParam = (param: any) => {
        this.params.push(param)
    }

    private addDep = (name: string, value: any) => {
        this.deps[name] = value
    }

    private findIn(name: string, object) {
        if (!object.deps) return false

        for (const depName in object.deps) {
            if (object.deps[depName][name]) return object.deps[depName][name]
        }
        return false
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

    private calcCount() {
        let count = 0
        for (const depName in this.deps) {
            for (const dep of this.deps[depName]) {
                if (dep.isExport()) count++
            }
        }
        return count
    }

    private async getDepsData() {
        const fullCount = this.calcCount()
        let count = 1
        let data = null

        this.setState({
            title: `${t.IN_PROGRESS} (${count}/${fullCount})`
        })
        for (const depName in this.deps) {
            if (!data) data = {}
            const depObj = data[depName] = {}

            for (const dep of this.deps[depName]) {
                if (!dep.isExport()) continue
                depObj[dep.name] = await dep.getData()
                this.setState({
                    title: `${t.IN_PROGRESS} (${++count}/${fullCount})`
                })
            }
        }
        this.setState({
            title: this.mainTitle
        })
        return data
    }

    private legacyImport(data, fromArray?: boolean) {
        if (editorPreload.basename(this.filePath) !== data.fileName) {
            if (!fromArray) {
                mainProcess.alertSync(t.BREAK_IMPORT_INVALID_NAME)
            }
            return false
        }
        delete data.fileName
        for (const selector in data) {
            for (const attribute in data[selector]) {
                for (const obj of this.params) {
                    const forImport = obj.forImport
                    if (forImport.selector === selector && forImport.name === attribute) {
                        forImport.setValue(data[selector][attribute])
                    }
                }
            }
        }
        mainProcess.alertSync(t.WAS_IMPORTED)
        return true
    }

    private save = async (closeAfter=true, saveToOriginal=true) => {
        this.setState({
            title: t.SAVING_MESSAGE
        })
        await new Promise<void>(resolve => {
            setTimeout(() => {
                const serializer = new XMLSerializer()
                const copyrightText = `<!--\n\tEdited by: SnowRunner XML Editor Desktop\n\tVersion: v${config.version}\n\tAuthor: VerZsuT\n\tSite: https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/\n-->\n`
    
                this.fileDOM.querySelectorAll('[SXMLE_ID]').forEach(item => {
                    item.removeAttribute('SXMLE_ID')
                })
                
                const xmlString = `${copyrightText}${serializer.serializeToString(this.fileDOM).replace('<root>', '').replace('</root>', '')}`
                mainProcess.writeFile(this.filePath, xmlString)
                if (saveToOriginal) {
                    mainProcess.updateFiles(this.currentMod)
                }
    
                const tempADV = Object.assign({}, config.ADV)
                if (this.state.ADV[this.filePath]) {
                    tempADV[this.filePath] = JSON.parse(JSON.stringify(this.state.ADV[this.filePath]))
                } else if (tempADV[this.filePath]) {
                    delete tempADV[this.filePath]
                }
                config.ADV = tempADV
    
                const tempETR = Object.assign({}, config.ETR)
                if (this.state.ETR[this.filePath]) {
                    tempETR[this.filePath] = JSON.parse(JSON.stringify(this.state.ETR[this.filePath]))
                } else if (tempETR[this.filePath]) {
                    delete tempETR[this.filePath]
                }
                config.ETR = tempETR
                
                if (closeAfter) {
                    window.close()
                }
                resolve()
            }, 100)
        })
    }

    private importFile = () => {
        const currentFileName = editorPreload.basename(this.filePath)
        let data: any
        if (!this.importData) {
            const filePath = mainProcess.openEPFDialog()
            if (!filePath) {
                mainProcess.alertSync(t.PARAMS_FILE_NOT_FOUND)
                return;
            }
            data = JSON.parse(editorPreload.readFile(filePath).toString())
        } else {
            data = {fileName: currentFileName, data: this.importData, version: this.EXPORT_FILE_VERSION}
        }

        const next1 = (item, fromArray?: boolean) => {
            if (currentFileName === item.fileName && !item.version) {
                return this.legacyImport(item, fromArray)
            }

            if (currentFileName !== item.fileName) {
                const fonded = this.findIn(currentFileName, item)
                if (!fonded) {
                    if (!fromArray) {
                        mainProcess.alertSync(t.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
                    }
                    return false
                } else {
                    item = {data: fonded}
                }
            }

            for (const selector in item.data) {
                for (const attribute in item.data[selector]) {
                    for (const obj of this.params) {
                        const forImport = obj.forImport
                        if (forImport.selector === selector && forImport.name === attribute) {
                            forImport.setValue(item.data[selector][attribute])
                        }
                    }
                }
            }

            const next2 = () => {
                if (!this.importData) {
                    mainProcess.alertSync(t.WAS_IMPORTED)
                    return true
                } else {
                    this.save(false, false).then(() => {
                        ipcRenderer.send('bridge-channel', 'true')
                        window.close()
                    })
                }
            }
            
            if (item.deps) {
                let count = 1
                let fullCount = 0
                for (const depName in item.deps) {
                    if (!this.deps[depName]) continue
                    for (const fileName in item.deps[depName]) {
                        for (const dep of this.deps[depName]) {
                            if (dep.name !== fileName) continue
                            fullCount++
                        }
                    }
                }
                if (fullCount !== 0) {
                    this.setState({
                        title: `${t.IN_PROGRESS} (${count}/${fullCount})`
                    });
    
                    (async () => {
                        for (const depName in item.deps) {
                            if (!this.deps[depName]) continue
                            for (const fileName in item.deps[depName]) {
                                for (const dep of this.deps[depName]) {
                                    if (dep.name !== fileName) continue
                                    await dep.toImport(item.deps[depName][fileName])
                                    this.setState({
                                        title: `${t.IN_PROGRESS} (${++count}/${fullCount})`
                                    })
                                }
                            }
                        }
                        this.setState({
                            title: this.mainTitle
                        })
                    })().then(next2)
                }
            } else {
                next2()
            }
        }

        if (data instanceof Array) {
            let imported = false
            
            for (const item of data) {
                const fonded = this.findIn(currentFileName, item)
                if (item.fileName === currentFileName || fonded) {
                    next1(item, true)
                    imported = true
                }
            }

            if (!imported) {
                mainProcess.alertSync(t.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
            }
        } else {
            next1(data)
        }
    }

    private exportFile = () => {
        if (!this.state.isExporting && !this.isBridge) {
            this.setState({
                isExporting: true
            })
            return
        }

        const out = {
            fileName: null,
            data: null,
            version: null,
            deps: null
        }
        if (!this.isBridge) {
            out.fileName = editorPreload.basename(this.filePath)
            out.data = {}
            out.version = this.EXPORT_FILE_VERSION
        } else {
            delete out.data
        }
        for (const obj of this.params) {
            const expObj = obj.forExport()
            if (!expObj) continue

            if (this.isBridge) {
                if (!out[expObj.selector]) out[expObj.selector] = {}
                out[expObj.selector][expObj.name] = expObj.value
            } else {
                if (!out.data[expObj.selector]) out.data[expObj.selector] = {}
                out.data[expObj.selector][expObj.name] = expObj.value
            }
        }

        let pathToSave = ''
        if (!this.isBridge) {
            pathToSave = mainProcess.openSaveDialog(editorPreload.basename(this.filePath, '.xml'))
            if (!pathToSave) {
                mainProcess.alertSync(t.PATH_TO_SAVE_NOT_FOUND)
                return
            }
        }
        this.getDepsData().then(data => {
            if (data) out.deps = data
            if (!this.isBridge) {
                editorPreload.saveFile(pathToSave, JSON.stringify(out, null, '\t'))
                mainProcess.alertSync(t.WAS_EXPORTED)
                this.setState({
                    isExporting: false
                })
            } else {
                ipcRenderer.send('bridge-channel', out)
                window.close()
            }
        })
    }

    private back = () => {
        window.close()
    }

    private reset = () => {
        if (!mainProcess.confirm(t.RESET_CONFIRM_MESSAGE)) {
            return
        }
        
        const itemsToReset = this.state.ADV[this.filePath]
        if (itemsToReset) {
            for (const selector in itemsToReset) {
                const item = this.fileDOM.querySelector(selector)
                const ADV = itemsToReset[selector]

                for (const attrName in ADV) {
                    const value = ADV[attrName]

                    if (value === 'ADV_NULL') {
                        item.removeAttribute(attrName)
                    } else {
                        item.setAttribute(attrName, value)
                    }
                }
            }
            delete this.state.ADV[this.filePath]
        }

        const itemsToDelete = this.state.ETR[this.filePath]
        if (itemsToDelete) {
            for (const selector in itemsToDelete) {
                const item = this.fileDOM.querySelector(selector)
                item.remove()
            }
            delete this.state.ETR[this.filePath]
        }

        mainProcess.alertSync(t.FILE_IS_RESETED);
        (get<HTMLButtonElement>('#save-params')).click()
    }

    private getGlobalTemplates() {
        const filePath = editorPreload.join(editorPreload.paths.mainTemp, '[media]', '_templates', 'trucks.xml')
        const fileData = mainProcess.readFile(filePath)
    
        return new DOMParser().parseFromString(fileData, 'text/xml')
    }

    private getDOM() {
        const fileData = mainProcess.readFile(this.filePath)
        if (!fileData) return
    
        const parser = new DOMParser()
        const $dom = parser.parseFromString(`<root>${fileData}</root>`, 'text/xml')
        if ($dom.querySelector('parsererror')) {
            const error = get<HTMLDivElement>('#error')
            error.innerText = t[error.innerText]
            error.style.display = 'block'
            throw new Error('[RECOGNIZE_ERROR]')
        }
    
        const $root = $dom.querySelector('root')
        $root.childNodes.forEach(child => {
            if (child.nodeType === 8) {
                child.remove()
            }
        })
    
        if ($root.childNodes[0].nodeValue === '\n') {
            $root.childNodes[0].remove()
        }
    
        const tempDOM = $dom
        const templates = mainProcess.templates
        let name: string
        for (let tmp in templates) {
            let selector = `root > ${templates[tmp].selector}`
            if (tempDOM.querySelector(selector)) {
                name = tmp
                break
            }
        }
        const domString = new XMLSerializer().serializeToString(tempDOM)
        const result = mainProcess.getParams(domString, name)
    
        return [new DOMParser().parseFromString(result.dom, 'application/xml'), result.params] as [Document, ITemplateParams]
    }
}

render(<Editor/>, MAIN)
