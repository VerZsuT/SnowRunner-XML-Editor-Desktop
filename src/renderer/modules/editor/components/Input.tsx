import { ChangeEvent, FocusEvent, MouseEvent, PureComponent } from 'react'
import { InputType, NumberType } from 'scripts'
import { IMainContext, MainContext } from '../MainContext'
import { ResetMenu } from './ResetMenu'

const { config } = window.provider
const { basename } = window.editorPreload

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
}

interface IState {
    borderColor: string
    value: string | number
    menuX: number
    menuY: number
    showMenu: boolean
}

export class Input extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext
    private componentID = String(Math.random())

    private min: number
    private max: number
    private defaultValue: string

    constructor(props: IProps) {
        super(props)
        this.state = {
            borderColor: '#ced4da',
            value: props.getValue(),
            showMenu: false,
            menuX: 0,
            menuY: 0
        }

        if (props.item.min !== -Infinity && config.settings.limits) {
            this.min = props.item.min || 0
        }
        if (props.item.max && config.settings.limits) {
            this.max = props.item.max
        }
        this.defaultValue = this.props.getValue()
    }

    componentDidMount() {
        this.initIE()
        this.initReset()
    }

    componentWillUnmount() {
        if (this.props.unregReset) {
            this.props.unregReset(this.componentID)
        }
        this.context.removeParam(this.componentID)
    }

    render() {
        const placeholder = this.props.getDefaultValue()

        return (<>
            <ResetMenu
                show={this.state.showMenu}
                x={this.state.menuX}
                y={this.state.menuY}
                onClick={this.reset}
                onBlur={() => this.setState({ showMenu: false })}
            />
            {this.props.item.type === InputType.number
                ? <input
                    value={this.state.value}
                    className='form-control'
                    type='number'
                    step={this.props.item.step}
                    style={{ borderColor: this.state.borderColor }}
                    onBlur={this.saveValue}
                    onChange={this.onValueChange}
                    placeholder={placeholder}
                    onContextMenu={this.onContextMenu}
                />
                : <input
                    className='form-control'
                    type='text'
                    placeholder={placeholder}
                    value={this.state.value}
                    onChange={this.onValueChange}
                    onBlur={this.saveValue}
                    onContextMenu={this.onContextMenu}
                />
            }
        </>)
    }

    private onContextMenu = (e: MouseEvent<HTMLInputElement>) => {
        e.stopPropagation()
        this.setState({
            showMenu: true,
            menuX: e.clientX,
            menuY: e.clientY
        })
    }

    private saveValue = (e: FocusEvent<HTMLInputElement>) => {
        let newVal: string | number = e.target.value
        const { fileDOM } = this.context

        if (newVal === '') {
            newVal = this.defaultValue
        }

        if (!fileDOM.querySelector(this.props.item.selector)) {
            const array = this.props.item.selector.split('>').map(value => value.trim())
            const name = array.pop()
            const rootSelector = array.join(' > ')
            fileDOM.querySelector(rootSelector).append(fileDOM.createElement(name))
        }
        this.props.setValue(this.props.item.selector, this.props.item.name, String(newVal))
        this.setState({
            value: newVal
        })
    }

    private onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newVal: string | number = e.target.value

        if (this.props.item.type !== InputType.text && newVal !== '') {
            newVal = this.limit(Number(newVal))
        }

        this.changeColor(Number(newVal))
        this.setState({
            value: newVal
        })
    }

    private limit(num: number) {
        if (this.props.item.numberType === NumberType.integer) {
            num = Math.round(num)
        }
        if (this.min !== undefined && num < this.min) {
            return this.min
        }
        if (this.max !== undefined && num > this.max) {
            return this.max
        }
        return num
    }

    private changeColor = (value: number) => {
        let newVal: number = value

        if (value === null || value === NaN) newVal = 0
        if (this.props.item.areas) {
            let color = '#ced4da'

            for (const areaName in this.props.item.areas) {
                const value = this.props.item.areas[areaName]

                for (const area of value) {
                    if (newVal >= area[0] && newVal <= area[1]) {
                        if (areaName === 'red') {
                            color = `hsl(0deg, 100%, 50%)`
                        } else if (areaName === 'green') {
                            color = `hsl(120deg, 100%, 50%)`
                        } else if (areaName === 'yellow') {
                            color = `rgb(235 235 12)`
                        }
                    }
                }
            }
            this.setState({
                borderColor: color
            })
        }
    }

    private initIE() {
        const { addParam, filePath } = this.context

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
                    if (this.state.value !== newValue) {
                        this.saveValue({ target: { value: newValue } } as FocusEvent<HTMLInputElement>)
                    }
                },
                selector: this.props.item.selector,
                name: this.props.item.name,
                fileName: basename(filePath)
            }
        })
    }

    private initReset() {
        if (this.props.regReset) {
            this.props.regReset(this.componentID, this.reset)
        }
    }

    private reset = () => {
        const defaultValue = this.props.getDefaultValue()
        this.setState({
            showMenu: false
        })
        console.log(defaultValue)
        if (defaultValue !== undefined) {
            this.saveValue({ target: { value: defaultValue } } as FocusEvent<HTMLInputElement>)
        }
    }
}
