import { PureComponent } from 'react'
import '../styles/File.css'

import { FileType, mainProcess } from '@editor-service'
import { IMainContext, MainContext } from '../MainContext'

interface IProps {
    item: IInputParams
    isParentExport: boolean
    isExporting: boolean
    getValue: () => string
    setValue: (selector: string, attName: string, value: string) => void
}

interface IState {
    isExport: boolean
    toExport: any
}

export default class File extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    constructor(props: IProps) {
        super(props)

        this.state = {
            isExport: props.isParentExport,
            toExport: null
        }
    }

    componentDidMount() {
        const { addDep } = this.context
        this.setState({
            toExport: this.getExport()
        })

        const array = []
        for (const i of this.getItems()) {
            array.push({
                name: `${i.value}.xml`,
                isExport: () => (this.state.toExport[i.value] && this.props.isParentExport),
                getData: () => {
                    return new Promise(resolve => {
                        ipcRenderer.once('bridge-channel', (_, exportedData) => {
                            resolve(exportedData)
                        })
                        this.openEditor(i.value, true)
                    })
                },
                toImport: data => {
                    return new Promise<void>(resolve => {
                        ipcRenderer.once('bridge-channel', (_, _1) => {
                            resolve()
                        })
                        this.openEditor(i.value, true, data)
                    })
                }
            })
        }
        addDep(this.props.item.fileType, array)
    }

    render() {
        const items = this.getItems()
        return (
            <div className='param-input'>
                {items.map((item, index) => 
                    <div 
                        className='openCont'
                        key={item.value+index}
                    >
                        <button
                            className='openFile btn btn-secondary btn-sm'
                            onClick={()=>this.openEditor(item.value)}
                        >
                            {item.index + 1}
                            <div className='open-file-button'></div>
                        </button>
                        {this.props.isExporting?
                            <input
                                type='checkbox'
                                className='file-export'
                                checked={this.state.toExport[item.value]}
                                onChange={()=>this.toggleExporting(item.value)}
                            />
                        :null}
                    </div>
                )}
            </div>
        )
    }

    private toggleExporting = (name: string) => {
        if (this.props.isParentExport) {
            const tempExport = Object.assign({}, this.state.toExport)
            tempExport[name] = !tempExport[name]
    
            this.setState({
                toExport: tempExport
            })
        }
    }

    private getItems() {
        const { fileDOM } = this.context
        const item: IInputParams = this.props.item
    
        const array: string[] = (String(item.value)).split(',').map((value) => value.trim())
        if (item.fileType === FileType.wheels && item.name !== 'Type') {
            fileDOM.querySelectorAll('Truck > TruckData > CompatibleWheels').forEach(compatible => {
                const type = compatible.getAttribute('Type')
                if (array.includes(type)) {
                    array.push(type)
                }
            })
        }
        return array.map((value, index)=>({value, index}))
    }

    private getExport() {
        const isExport: boolean = this.props.isParentExport

        const comp = {}
            for (const i of this.getItems()) {
            comp[i.value] = isExport
        }
        return comp
    }

    private openEditor(fileName: string, bridge?: boolean, importData?: any) {
        const { currentDLC, currentMod } = this.context

        const item: IInputParams = this.props.item
        const paths = [`${config.paths.classes}\\${item.fileType}\\${fileName}.xml`]
        let mainPath: string
    
        if (currentDLC) {
            const dlcPath = `${config.paths.dlc}\\${currentDLC}\\classes\\${item.fileType}\\${fileName}.xml`
            paths.push(dlcPath)
            local.set('currentDLC', currentDLC)
        } else if (currentMod) {
            const modPath = `${config.paths.mods}\\${currentMod}\\classes\\${item.fileType}\\${fileName}.xml`
            paths.push(modPath)
            local.set('currentMod', currentMod)
        }
    
        for (const path of paths) {
            if (editorPreload.existsSync(path)) {
                mainPath = path
            }
        }
    
        if (!mainPath) {
            mainPath = editorPreload.findFromDLC(fileName, item.fileType)
        }
        local.set('filePath', mainPath)
        if (bridge) {
            local.set('isBridge', 'true')
            if (importData) {
                local.set('importData', JSON.stringify(importData))
            }
        }
        mainProcess.openEditor(bridge)
    }
}
