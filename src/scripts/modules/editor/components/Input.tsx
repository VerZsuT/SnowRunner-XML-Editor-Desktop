import { ChangeEvent, PureComponent } from 'react'

import { InputType, NumberType } from '@sxmle-service'
import { IMainContext, MainContext } from '../MainContext'

interface IProps {
    item: IInputParams
    isParentExport: boolean
    isExporting: boolean
    isExport: boolean
    getValue: () => string
    setValue: (selector: string, attName: string, value: string) => void
}

interface IState {
    borderColor: string
    value: string|number
}

export default class Input extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    private min: number
    private max: number
    private defaultValue: string

    constructor(props: IProps) {
        super(props)
        this.state = {
            borderColor: '#ced4da',
            value: props.getValue()
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
        this.initImportExport()
    }

    render() {
        return (<>
            {this.props.item.type === InputType.number
                ? <input 
                    value={this.state.value}
                    className='form-control'
                    type='number'
                    step={this.props.item.step}
                    disabled={this.props.item.onlyDeveloper}
                    style={{borderColor: this.state.borderColor}}
                    onInput={this.setColor}
                    onChange={this.onValueChange}
                  />
                : <input 
                    className='form-control'
                    type='text'
                    disabled={this.props.item.onlyDeveloper}
                    title={this.defaultValue}
                    value={this.state.value}
                    onChange={this.onValueChange}
                  />
            }
        </>)
    }

    private onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        let newVal: string|number = e.target.value
        const { fileDOM, ETR, setETR, filePath } = this.context

        if (newVal === '') {
            newVal = this.defaultValue
        }
        if (this.props.item.type !== InputType.text) {
            newVal = this.limit(Number(newVal))
        }
        
        if (!fileDOM.querySelector(this.props.item.selector)) {
            const array = this.props.item.selector.split('>').map(value => value.trim())
            const name = array.pop()
            const rootSelector = array.join(' > ')
            fileDOM.querySelector(rootSelector).append(fileDOM.createElement(name))

            const tempETR = Object.assign({}, ETR)
            if (!ETR[filePath]) {
                tempETR[filePath] = []
                setETR(tempETR)
            }
            if (!ETR[filePath].includes(this.props.item.selector)) {
                tempETR[filePath].push(this.props.item.selector)
                setETR(tempETR)
            }
        }
        this.props.setValue(this.props.item.selector, this.props.item.name, String(newVal))
        this.setColor(e)
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

    private setColor = (e: ChangeEvent<HTMLInputElement>) => {
        const v = +e.target.value
        let newVal: number = v

        if (v === null || v === NaN) newVal = 0
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

    private initImportExport() {
        const { addParam } = this.context

        addParam({
            forExport: () => {
                if (this.props.isExport && this.props.isParentExport) {
                    return {
                        selector: this.props.item.selector, 
                        name: this.props.item.name, 
                        value: this.state.value
                    }
                }
            },
            forImport: {
                setValue: (newValue: string) => {
                    if (this.state.value !== newValue) {
                        this.setState({
                            value: newValue
                        })
                        this.props.setValue(this.props.item.selector, this.props.item.name, newValue)
                    }
                },
                selector: this.props.item.selector,
                name: this.props.item.name
            }
        })
    }
}
