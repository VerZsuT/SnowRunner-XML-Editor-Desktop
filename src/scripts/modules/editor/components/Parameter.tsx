import { PureComponent } from 'react'
import '../styles/Parameter.css'

import { IMainContext, MainContext } from '../MainContext'

import Coordinates from './Coordinates'
import File from './File'
import Input from './Input'
import Select from './Select'

interface IProps {
    tabs: number
    item: any
    isExporting: boolean
    isParentExport: boolean
}

interface IState {
    isExport: boolean
}

export default class Parameter extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    private style: React.CSSProperties

    constructor(props: IProps) {
        super(props)
        this.state = {
            isExport: props.isParentExport
        }

        this.style = {
            paddingLeft: `${props.tabs * 10}px`,
            fontWeight: props.item.bold ? 'bold' : 'normal'
        }
    }

    render() {
        const text = this.getText()
        let item =
            <Input
                isExporting={this.props.isExporting}
                isParentExport={this.props.isParentExport}
                isExport={this.state.isExport}
                item={this.props.item as IInputParams}
                getValue={this.getValue}
                setValue={this.setValue}
            />
        if (this.props.item.inputType === 'select') {
            item = 
                <Select
                    isExporting={this.props.isExporting}
                    isParentExport={this.props.isParentExport}
                    isExport={this.state.isExport}
                    item={this.props.item as ISelectParams}
                    getValue={this.getValue}
                    setValue={this.setValue}
                />
        }
        if (this.props.item.type === 'file') {
            item = 
                <File
                    isExporting={this.props.isExporting}
                    isParentExport={this.props.isParentExport}
                    item={this.props.item as IInputParams}
                    getValue={this.getValue}
                    setValue={this.setValue}
                />
        }
        if (this.props.item.type === 'coordinates') {
            item = 
                <Coordinates
                    isExporting={this.props.isExporting}
                    isParentExport={this.props.isParentExport}
                    isExport={this.state.isExport}
                    item={this.props.item as IInputParams}
                    getValue={this.getValue}
                    setValue={this.setValue}
                />
        }

        return this.includes(this.props.item.text)?
            <div className='info'>
                <div className='param-text' style={this.style}>
                    {typeof text === 'string'
                        ? <span>
                            {text}
                          </span>
                        : <span>
                            {text.first}<span style={{color: 'red'}}>{text.second}</span>{text.last}
                          </span>
                    }
                </div>
                <div className='param-value'>
                    {item}
                    {this.props.isExporting && this.props.item.type !== 'file'?
                        <input
                            type='checkbox'
                            className='input-export'
                            checked={this.state.isExport && this.props.isParentExport}
                            onChange={this.toggleExporting}
                        />
                    :null}
                </div>
                {this.props.item.desc?
                    <div className='desc' title={this.props.item.desc}></div>
                :null}
            </div>
        :null
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
        const { fileDOM, templates } = this.context

        let value = this.props.item.value
        if (!value && value !== 0 && templates) {
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
                                value = this.getValueInGlobal(templateName1, tagName)
                            }
                        }
                    } else {
                        value = this.getValueInGlobal(templateName, tagName)
                    }
                }
            }
        }
        if (value === null || value === undefined) {
            value = this.props.item.default
        }

        return value
    }

    private setValue = (selector: string, attrName: string, value: string|number) => {
        const { fileDOM, filePath, ADV, setADV } = this.context

        const element = fileDOM.querySelector(selector)

        const tempADV = Object.assign({}, ADV)
        if (!ADV[filePath]) {
            tempADV[filePath] = {}
        }

        const fileADV = tempADV[filePath]
        if (!fileADV[selector]) {
            fileADV[selector] = {}
        }

        const tagADV = fileADV[selector]
        if (!tagADV[attrName]) {
            const defaultValue = element.getAttribute(attrName)

            if (defaultValue !== null) {
                tagADV[attrName] = defaultValue
            } else {
                tagADV[attrName] = 'ADV_NULL'
            }
        }
        setADV(tempADV)

        element.setAttribute(attrName, String(value))
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

    private getParentTemplate = (el) => {
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
