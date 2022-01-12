import { Fragment, PureComponent } from 'react'
import { IMainContext, MainContext } from '../MainContext'
import { Coordinates } from './Coordinates'
import { Input } from './Input'
import { Select } from './Select'
import { FileType, mainProcess } from 'scripts'
import { Parameters } from './Parameters'

import {
    Checkbox,
    TableCell,
    TableRow as MuiTableRow,
    Typography,
    styled,
    TableCellProps
} from '@mui/material'

const { existsSync, findFromDLC } = window.editorPreload
const { paths } = window.provider

const TableRow = styled(MuiTableRow)({
    '&:last-child td': {
        borderBottom: 0
    }
})

const ParamText = styled(TableCell)({
    paddingLeft: '41px',
    paddingRight: '16px',
    paddingTop: '10px',
    paddingBottom: '10px',
    width: '50%'
})

const ParamValue = styled((props: TableCellProps) =>
    <TableCell align='center' {...props}/>
)({
    padding: '10px 16px'
})

interface InnerItem {
    filePath: string
    fileName: string
    fileDOM: Document
    mod: string
    dlc: string
    templates: Element
    tableItems: any[]
    defaults: {
        [selector: string]: {
            [attr: string]: string | number
        }
    }
}

interface IProps {
    item: any
    isExporting: boolean
    isParentExport: boolean
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
}

interface IState {
    isExport: boolean
    innerItems: InnerItem[]
}

export class Parameter extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    constructor(props: IProps) {
        super(props)
        this.state = {
            isExport: props.isParentExport,
            innerItems: null
        }
    }

    componentDidMount() {
        if (this.props.item.type === 'file') {
            const items: InnerItem[] = []
            const propsItem: IInputParams = this.props.item

            const fileNames: string[] = (String(propsItem.value)).split(',').map((value) => value.trim())
            if (propsItem.fileType === FileType.wheels && propsItem.name !== 'Type') {
                this.context.fileDOM.querySelectorAll('Truck > TruckData > CompatibleWheels').forEach(compatible => {
                    const type = compatible.getAttribute('Type')
                    if (!fileNames.includes(type)) {
                        fileNames.push(type)
                    }
                })
            }

            for (const fileName of fileNames) {
                const pathsToFiles = [`${paths.classes}\\${propsItem.fileType}\\${fileName}.xml`]
                const contextDLC = this.context.currentDLC
                const contextMod = this.context.currentMod
                let mainPath: string
                let currentDLC: string
                let currentMod: string

                if (contextDLC) {
                    const dlcPath = `${paths.dlc}\\${contextDLC}\\classes\\${propsItem.fileType}\\${fileName}.xml`
                    pathsToFiles.push(dlcPath)
                    currentDLC = contextDLC
                } else if (contextMod) {
                    const modPath = `${paths.modsTemp}\\${contextMod}\\classes\\${propsItem.fileType}\\${fileName}.xml`
                    pathsToFiles.push(modPath)
                    currentMod = contextMod
                }

                for (const path of pathsToFiles) {
                    if (existsSync(path)) {
                        mainPath = path
                    }
                }

                if (!mainPath) {
                    mainPath = findFromDLC(fileName, propsItem.fileType)
                    currentMod = undefined
                }
                if (!mainPath) continue

                const [fileDOM, tableItems] = this.context.getDOM(mainPath)
                this.context.addToSave(currentMod, currentDLC, fileDOM, mainPath)

                items.push({
                    filePath: mainPath,
                    fileName,
                    fileDOM,
                    dlc: currentDLC,
                    mod: currentMod,
                    templates: fileDOM.querySelector('_templates'),
                    tableItems,
                    defaults: mainProcess.defaults[fileName + '.xml'] || {}
                })
            }
            this.setState({
                innerItems: items
            })
        }
    }

    render() {
        let items: JSX.Element[] = []
        if (this.state.innerItems) {
            for (const item of this.state.innerItems) {
                const mainContext: IMainContext = {
                    ...this.context,
                    fileDOM: item.fileDOM,
                    filePath: item.filePath,
                    currentDLC: item.dlc,
                    currentMod: item.mod,
                    templates: item.templates,
                    tableItems: item.tableItems,
                    defaults: item.defaults
                }

                items.push(<Fragment key={item.filePath}>
                    <MainContext.Provider value={mainContext}>
                        <Parameters
                            isExporting={this.props.isExporting}
                            postfix={item.fileName}
                            regReset={this.props.regReset}
                            unregReset={this.props.unregReset}
                        />
                    </MainContext.Provider>
                </Fragment>)
            }
        }

        if (items.length) {
            return items
        }

        const text = this.getText()
        const defaultProps = {
            isExporting: this.props.isExporting,
            isParentExport: this.props.isParentExport,
            isExport: this.state.isExport,
            getValue: this.getValue,
            getDefaultValue: this.getDefaultValue,
            setValue: this.setValue,
            regReset: this.props.regReset,
            unregReset: this.props.unregReset
        }
        let item = (
            <Input
                {...defaultProps}
                item={this.props.item as IInputParams}
            />
        )
        if (this.props.item.inputType === 'select') {
            item = (
                <Select
                    {...defaultProps}
                    item={this.props.item as ISelectParams}
                />
            )
        }
        if (this.props.item.type === 'coordinates') {
            item = (
                <Coordinates
                    {...defaultProps}
                    item={this.props.item as IInputParams}
                />
            )
        }

        return this.includes(this.props.item.text) ? 
            <TableRow>
                <ParamText>
                    <Typography>
                    {typeof text === 'string'
                        ? text
                        : <>
                            {text.first}
                            <span style={{ color: 'red' }}>
                                {text.second}
                            </span>
                            {text.last}
                            </>
                    }
                    </Typography>
                </ParamText>
                <ParamValue>{item}</ParamValue>
                {this.props.isExporting && this.props.item.type !== 'file' ?
                    <TableCell style={{ width: '20px' }}>
                        <Checkbox
                            checked={this.state.isExport && this.props.isParentExport}
                            onChange={this.toggleExporting}    
                        />
                    </TableCell>
                : null}
            </TableRow>
        : null
    }

    private toggleExporting = () => {
        if (this.props.isParentExport) {
            this.setState({
                isExport: !this.state.isExport
            })
        }
    }

    private getText = () => {
        const { filter } = this.context
        const text = this.props.item.text
        if (!filter) {
            return text
        }

        const firstIndex = text.toLowerCase().indexOf(filter.toLowerCase())
        const lastIndex = firstIndex + filter.length
        return {
            first: text.slice(0, firstIndex),
            second: text.slice(firstIndex, lastIndex),
            last: text.slice(lastIndex, text.length)
        }
    }

    private includes = (text: string) => {
        const { filter } = this.context

        if (!filter) return true
        return text.toLowerCase().includes(filter)
    }

    private getValue = () => {
        const { templates } = this.context

        let value = this.props.item.value
        if (!value && value !== 0 && templates) {
            value = this.getFromTemplates()
        }
        if (value === null || value === undefined) {
            value = this.props.item.default
        }

        return value
    }

    private getFromTemplates = () => {
        const { fileDOM, templates } = this.context

        let el = fileDOM.querySelector(this.props.item.selector)
        const array = this.props.item.selector.split(' ')
            .map((value: string) => value.trim())
            .filter((value: string) => value !== '>')
        const innerName = array.slice(array.length - 1)[0]
        const tagName = innerName.split('[')[0]
        if (!el) {
            el = fileDOM.querySelector(array.slice(0, array.length - 1).join(' > '))
        }
        if (el) {
            let templateName = el.getAttribute('_template')
            if (!templateName) {
                templateName = this.getParentTemplate(el)
            }
            if (templateName) {
                const template = templates.querySelector(templateName)
                if (template) {
                    const templateValue = template.getAttribute(this.props.item.name)
                    if (templateValue) {
                        return templateValue
                    }

                    const el2 = template.querySelector(tagName)
                    if (el2) {
                        const templateValue2 = el2.getAttribute(this.props.item.name)
                        if (templateValue2) {
                            return templateValue2
                        }
                        const templateName1 = el2.getAttribute('_template')
                        if (templateName1) {
                            return this.getValueInGlobal(templateName1, tagName)
                        }
                    }
                } else {
                    return this.getValueInGlobal(templateName, tagName)
                }
            }
        }
    }

    private setValue = (selector: string, attrName: string, value: string | number) => {
        const { fileDOM } = this.context
        const element = fileDOM.querySelector(selector)

        element.setAttribute(attrName, String(value))
    }

    private getDefaultValue = () => {
        const { defaults } = this.context

        const selector = this.props.item.selector
        const name = this.props.item.name
        if (!defaults[selector] || defaults[selector][name] === undefined) {
            return undefined
        }

        return String(defaults[selector][name])
    }

    private getValueInGlobal = (templateName: string, tagName: string) => {
        const { globalTemplates } = this.context

        const template = globalTemplates.querySelector(`${tagName} > ${templateName}`)
        if (template) {
            const templateValue = template.getAttribute(this.props.item.name)
            if (templateValue) {
                return templateValue
            } else {
                const el2 = template.querySelector(tagName)
                if (el2) {
                    const templateValue2 = el2.getAttribute(this.props.item.name)
                    if (templateValue2) {
                        return templateValue2
                    }
                }
            }
        }
        return this.props.item.value
    }

    private getParentTemplate = (el: any) => {
        if (el.parentElement) {
            const template = el.parentElement.getAttribute('_template')
            if (template) {
                return template
            } else {
                return this.getParentTemplate(el.parentElement)
            }
        }
    }
}
