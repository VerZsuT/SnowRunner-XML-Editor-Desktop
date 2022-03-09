import { ChangeEvent, FocusEvent, MouseEvent, PureComponent } from 'react'
import type IInputParams from 'templates/types/IInputParams'
import InputType from 'templates/enums/InputType'
import NumberType from 'templates/enums/NumberType'
import config from 'scripts/config'

import { IMainContext, MainContext } from '../MainContext'
import ResetMenu from './ResetMenu'

import TextField from '../styled/TextField'

const { basename } = window.service

interface IProps {
    item: IInputParams
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
    borderColor: string
    value: string | number
    menu: {
        show?: boolean
        x?: number
        y?: number
    }
}

export default class Input extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext
    private componentID = `input-${Math.round(Math.random()*100)}`

    private min: number
    private max: number
    private defaultValue: string

    constructor(props: IProps) {
        super(props)
        this.state = {
            borderColor: '#ced4da',
            value: props.getValue(),
            menu: {}
        }

        if (props.item.min !== -Infinity && config.settings.limits)
            this.min = props.item.min || 0

        if (props.item.max && config.settings.limits)
            this.max = props.item.max

        this.defaultValue = this.props.getValue()
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
        let placeholder: string

        if (this.props.isShow === false)
            return null

        placeholder = this.props.getDefaultValue()

        return (<>
            <ResetMenu
                show={this.state.menu.show ?? false}
                onReset={this.reset}
                onClose={() => this.setState({ menu: {} })}
                x={this.state.menu.x ?? 0}
                y={this.state.menu.y ?? 0}
                text={this.props.item.text}
            />
            {this.props.item.type === InputType.number
                ? <TextField
                    id={this.componentID}
                    value={this.state.value}
                    type='number'
                    inputProps={{ step: this.props.item.step }}
                    onBlur={this.saveValue}
                    onChange={this.onValueChange}
                    placeholder={placeholder}
                    onContextMenu={this.onContextMenu}
                />
                : <TextField
                    id={this.componentID}
                    type='text'
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={this.onValueChange}
                    onBlur={this.saveValue}
                    onContextMenu={this.onContextMenu}
                    style={{ width: '150px' }}
                />
            }
        </>)
    }

    private onContextMenu = (e: MouseEvent<HTMLInputElement>) => {
        e.stopPropagation()
        this.setState({
            menu: {
                show: true,
                x: e.clientX,
                y: e.clientY
            }
        })
    }

    private saveValue = (e: FocusEvent<HTMLInputElement>) => {
        let newVal: string | number = e.target.value
        const { fileDOM } = this.context

        if (newVal === '')
            newVal = this.defaultValue

        if (!fileDOM(this.props.item.selector).length) {
            const array = this.props.item.selector.split('>').map(value => value.trim())
            const name = array.pop().split('[')[0]
            const rootSelector = array.join(' > ')

            fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`)
        }
        this.props.setValue(this.props.item.selector, this.props.item.name, String(newVal))
        this.setState({ value: newVal })
    }

    private onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newVal: string | number = e.target.value

        if (this.props.item.type !== InputType.text && newVal !== '')
            newVal = this.limit(+newVal)

        this.changeColor(+newVal)
        this.setState({ value: newVal })
    }

    private limit(num: number) {
        if (this.props.item.numberType === NumberType.integer)
            num = Math.round(num)

        if (this.min !== undefined && num < this.min)
            return this.min

        if (this.max !== undefined && num > this.max)
            return this.max

        return num
    }

    private changeColor = (value: number) => {
        let newVal: number = value

        if (value === null || value === NaN)
            newVal = 0

        if (this.props.item.areas) {
            let color = '#ced4da'

            for (const areaName in this.props.item.areas) {
                const value = this.props.item.areas[areaName]

                for (const area of value) {
                    if (newVal >= area[0] && newVal <= area[1]) {
                        if (areaName === 'red')
                            color = `hsl(0deg, 100%, 50%)`
                        else if (areaName === 'green')
                            color = `hsl(120deg, 100%, 50%)`
                        else if (areaName === 'yellow')
                            color = `rgb(235 235 12)`
                    }
                }
            }
            this.setState({ borderColor: color })
        }
    }

    private initIE() {
        const { addParam, filePath } = this.context

        if (this.props.item.type === 'file')
            return

        addParam({
            id: this.componentID,
            forExport: () => {
                if (this.props.isExport && this.props.isParentExport) {
                    return {
                        selector: this.props.item.selector,
                        name: this.props.item.name,
                        value: this.state.value,
                        fileName: basename(filePath)
                    }
                }
            },
            forImport: {
                setValue: (newValue: string) => {
                    if (this.state.value !== newValue)
                        this.saveValue({ target: { value: newValue } } as FocusEvent<HTMLInputElement>)
                },
                selector: this.props.item.selector,
                name: this.props.item.name,
                fileName: basename(filePath)
            }
        })
    }

    private initReset() {
        if (this.props.regReset)
            this.props.regReset(this.componentID, this.reset)
    }

    private reset = () => {
        const defaultValue = this.props.getDefaultValue()

        this.setState({ menu: {} })
        if (defaultValue !== undefined)
            this.saveValue({ target: { value: defaultValue } } as FocusEvent<HTMLInputElement>)
    }
}
