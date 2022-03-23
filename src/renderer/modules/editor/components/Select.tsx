import { PureComponent } from 'react'
import type { MouseEvent } from 'react'
import type ISelectParams from 'templates/types/ISelectParams'

import { IMainContext, MainContext } from '../MainContext'
import ResetMenu, { showResetMenu } from './ResetMenu'

import { MenuItem, Select as SelectMUI, SelectChangeEvent } from '@mui/material'

const { basename } = window.service

interface IProps {
    item: ISelectParams
    isParentExport: boolean
    isExporting: boolean
    isExport: boolean
    getValue(): string
    getDefaultValue(): string
    setValue(selector: string, attName: string, value: string): void
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
    isShow?: boolean
}

interface IState {
    value: string
}

export default class Select extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext
    private componentID = `select-${Math.round(Math.random()*100)}`

    private options: JSX.Element[]

    constructor(props: IProps) {
        super(props)
        this.state = {
            value: props.getValue() ?? ''
        }
        this.options = this.props.item.selectParams.map(option =>
            <MenuItem key={option.value} value={option.value}>
                {option.text}
            </MenuItem>
        )
    }

    componentDidMount() {
        this.initIE()
        this.initReset()
    }

    componentWillUnmount() {
        if (this.props.unregReset)
            this.props.unregReset(this.componentID)

        this.context.removeParam(this.componentID)
    }

    render() {
        const { isShow } = this.props
        const { value } = this.state

        if (isShow === false)
            return null

        return <>
            <ResetMenu/>
                <SelectMUI
                    id={this.componentID}
                    value={value}
                    onChange={this.setValue}
                    onContextMenu={this.onContextMenu}
                    size='small'
                >
                    {this.options}
                </SelectMUI>
        </>
    }

    private setValue = (e: SelectChangeEvent) => {
        const { item, setValue } = this.props
        const newVal = e.target.value
        const { fileDOM } = this.context

        if (!fileDOM(item.selector).length) {
            const array = item.selector.split('>').map(value => value.trim())
            const name = array.pop()
            const rootSelector = array.join(' > ')

            fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`)
        }

        setValue(item.selector, item.name, newVal)
        this.setState({ value: newVal })
    }

    private initIE() {
        const { addParam, filePath } = this.context
        const { isExport, isParentExport, item, getValue } = this.props

        addParam({
            id: this.componentID,
            forExport: () => {
                if (isExport && isParentExport) {
                    return {
                        selector: item.selector,
                        name: item.name,
                        value: getValue(),
                        fileName: basename(filePath)
                    }
                }
            },
            forImport: {
                setValue: (newValue: string) => {
                    this.setValue({ target: { value: newValue } } as SelectChangeEvent)
                },
                selector: item.selector,
                name: item.name,
                fileName: basename(filePath)
            }
        })
    }

    private onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        showResetMenu({
            x: e.clientX,
            y: e.clientY,
            text: this.props.item.text,
            onReset: this.reset
        })
    }

    private initReset() {
        if (this.props.regReset)
            this.props.regReset(this.componentID, this.reset)
    }

    private reset = () => {
        const defaultValue = this.props.getDefaultValue()

        if (defaultValue !== undefined)
            this.setValue({ target: { value: defaultValue } } as SelectChangeEvent)
    }
}
