import { PureComponent } from 'react'
import { render } from 'react-dom'
import { getIngameText, MAIN, mainProcess, prettify, setHotKey, t } from 'scripts'
import { Parameters } from './components/Parameters'
import { AddonsPopup } from './components/addonsPopup/AddonsPopup'
import { IMainContext, MainContext } from './MainContext'
import { getDOM, getGlobalTemplates } from './service'
import { Loading } from '../components/Loading'
import { ProgramMenu } from 'menu'
import 'styles/editor'

import {
    AlertColor,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
    Typography,
    styled
} from '@mui/material'
import {
    ArrowBack as ArrowBackIcon,
    Menu as MenuIcon,
    SaveRounded
} from '@mui/icons-material'
import { ErrorHandler } from 'modules/components/ErrorHandler'
import { Alert } from 'modules/components/Alert'
import { Confirm } from 'modules/components/Confirm'
import { Container } from 'modules/components/styled'

const { basename, readFile, saveFile } = window.editorPreload
const { config, local } = window.provider
const { writeFile, updateFiles, openEPFDialog, openSaveDialog, openList } = mainProcess

const Title = styled(Container)({
    backgroundColor: '#1c7dca',
    position: 'fixed',
    top: '31px',
    color: '#fafafa',
    padding: '8px 0',
    textAlign: 'center',
    zIndex: 20
})

const BackArrowButton = styled(IconButton)({
    position: 'absolute',
    top: '0',
    left: '0'
})

const SaveButton = styled(IconButton)({
    position: 'absolute',
    top: '0',
    left: '43px'
})

const TasksButton = styled(IconButton)({
    position: 'absolute',
    top: '0',
    left: '86px'
})

interface IState {
    isExporting: boolean
    isLoading: boolean
    title: string
    showPopup: boolean
    menuAnchor: Element
    enableReset: boolean
    alert: {
        show?: boolean
        text?: string
        type?: AlertColor
    }
    confirm: {
        show?: boolean
        text?: string
        onSuccess?(): void
        onClose?(): void
    }
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
            title: this.mainTitle,
            showPopup: false,
            enableReset: !Boolean(this.currentMod),
            isLoading: false,
            menuAnchor: null,
            alert: {},
            confirm: {}
        }
        this.files = [{
            path: this.filePath,
            dom: fileDOM,
            mod: this.currentMod,
            dlc: this.currentDLC
        }]
    }

    componentDidMount(): void {
        this.setBackHotkey()
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
            defaults: this.defaults
        }


        return (<>
            <ProgramMenu />
            <ErrorHandler />
            <Alert 
                show={this.state.alert.show ?? false}
                onClose={() => this.setState({ alert: {} })}
                text={this.state.alert.text ?? ''}
                type={this.state.alert.type ?? 'info'}
            />
            <Confirm
                open={this.state.confirm.show ?? false}
                text={this.state.confirm.text ?? ''}
                onClose={this.state.confirm.onClose ?? (() => this.setState({ confirm: {} }))}
                onSuccess={this.state.confirm.onSuccess ?? (() => {})}
            />
            <Loading open={this.state.isLoading} />
            
            <Title>
                <Typography variant='h5'>
                    {this.state.title}
                </Typography>
                <Tooltip title={t.BACK_BUTTON}>
                    <BackArrowButton
                        onClick={this.back}
                        color='inherit'
                    >
                        <ArrowBackIcon style={{ fontSize: '30px' }} />
                    </BackArrowButton>
                </Tooltip>
                <Tooltip title={t.SAVE_BUTTON}>
                    <SaveButton
                        onClick={() => this.save()}
                        color='inherit'
                    >
                        <SaveRounded style={{ fontSize: '30px' }} />
                    </SaveButton>
                </Tooltip>
                <TasksButton
                    onClick={e => this.openTasksMenu(e.currentTarget)}
                    color='inherit'
                >
                    <MenuIcon style={{ fontSize: '30px' }} />
                </TasksButton>
                <Menu
                    anchorEl={this.state.menuAnchor}
                    open={Boolean(this.state.menuAnchor)}
                    onClose={this.closeTasksMenu}
                >
                    <MenuItem
                        disabled={!this.state.enableReset}
                        onClick={this.reset}
                    >
                        {t.RESET_MENU_ITEM_LABEL}
                    </MenuItem>
                    <MenuItem
                        onClick={this.showAddonPopup}
                        disabled={!Boolean(this.fileDOM.querySelector('Truck') && !this.fileDOM.querySelector('Truck').getAttribute('Type'))}
                    >
                        {t.ADDONS_POPUP_TITLE}
                    </MenuItem>
                    <MenuItem onClick={this.exportFile}>
                        {t.EXPORT}
                    </MenuItem>
                    <MenuItem onClick={this.importFile} >
                        {t.IMPORT}
                    </MenuItem>
                </Menu>
            </Title>

            <AddonsPopup
                fileDOM={this.fileDOM}
                modId={this.currentMod}
                truckName={basename(this.filePath, '.xml')}
                hidePopup={this.hidePopup}
                show={this.state.showPopup}
            />
            <MainContext.Provider value={mainContext}>
                <Container style={{ padding: '0 30px', marginTop: '100px' }}>
                    <Parameters
                        isExporting={this.state.isExporting}
                        regReset={this.regReset}
                        unregReset={this.unregReset}
                    />
                </Container>
            </MainContext.Provider>
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
            showPopup: true,
            menuAnchor: null
        })
    }

    private alert(text: string, type: AlertColor='info') {
        this.setState({
            alert: {
                show: true,
                text,
                type
            }
        })
    }

    private openTasksMenu = (element: Element) => {
        this.setState({
            menuAnchor: element
        })
    }

    private closeTasksMenu = () => {
        this.setState({
            menuAnchor: null
        })
    }

    private hidePopup = () => {
        this.setState({
            showPopup: false
        })
    }

    private setBackHotkey = () => {
        setHotKey({
            key: 'Escape',
            eventName: 'keydown'
        }, () => {
            this.back()
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
                const parser = new DOMParser()
                const copyrightText = `<!--\n\tEdited by: SnowRunner XML Editor Desktop\n\tVersion: v${config.version}\n\tAuthor: VerZsuT\n\tSite: https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/\n-->\n`
                for (const file of this.files) {
                    const dom = parser.parseFromString(serializer.serializeToString(file.dom), 'text/xml')
                    dom.querySelectorAll('[SXMLE_ID]').forEach(item => {
                        item.removeAttribute('SXMLE_ID')
                    })
                    dom.querySelectorAll('Wheels > Wheel').forEach(wheel => {
                        if (!wheel.attributes.length) {
                            wheel.remove()
                        }
                    })

                    const xmlString = `${copyrightText}${serializer.serializeToString(dom).replace('<root>', '').replace('</root>', '')}`
                    writeFile(file.path, xmlString)
                }


                if (this.currentMod) {
                    updateFiles(this.currentMod)
                }
                updateFiles()
                this.setState({
                    title: this.mainTitle
                })
                this.alert(t.SUCCESS_SAVE_FILES, 'success')
                resolve()
            }, 100)
        })
    }

    private importFile = () => {
        const currentFileName = basename(this.filePath)
        const filePath = openEPFDialog()

        if (!filePath) {
            this.alert(t.PARAMS_FILE_NOT_FOUND, 'error')
            return
        }
        const data = JSON.parse(readFile(filePath).toString())

        const next = (item: any, fromArray?: boolean) => {
            if (currentFileName !== item.fileName) {
                if (!fromArray) {
                    this.alert(t.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName), 'error')
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
            this.alert(t.WAS_IMPORTED, 'success')
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
                this.alert(t.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName), 'error')
            }
        } else {
            next(data)
        }
        this.closeTasksMenu()
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
            this.alert(t.PATH_TO_SAVE_NOT_FOUND, 'error')
            return
        }

        saveFile(pathToSave, JSON.stringify(out, null, '\t'))
        this.alert(t.WAS_EXPORTED, 'success')
        this.setState({
            isExporting: false,
            menuAnchor: null
        })
    }

    private back = () => {
        this.setState({
            isLoading: true
        })
        openList()
    }

    private confirm(text: string, onSuccess: () => void, onClose?: () => void) {
        this.setState({
            confirm: {
                show: true,
                text,
                onSuccess,
                onClose
            }
        })
    }

    private reset = () => {
        this.confirm(t.RESET_CONFIRM_MESSAGE, () => {
            for (const itemID in this.toReset) {
                this.toReset[itemID]()
            }
            this.setState({
                confirm: {},
                menuAnchor: null
            })
            this.alert(t.SUCCESS_RESET, 'success')
        })
    }
}

render(<Editor />, MAIN)
