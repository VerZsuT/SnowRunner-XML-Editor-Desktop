import { ChangeEvent, PureComponent } from 'react'

import { IMainContext, MainContext } from '../MainContext'

interface IProps {
    item: ISelectParams
    isParentExport: boolean
    isExporting: boolean
    isExport: boolean
    getValue: () => string
    setValue: (selector: string, attName: string, value: string) => void
}

interface IState {
    value: string
}

export default class Select extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    private options: JSX.Element[]

    constructor(props: IProps) {
        super(props)
        this.state = {
            value: props.getValue(),
        }
        this.options = this.props.item.selectParams.map(option => 
            <option
                key={option.value}
                value={option.value}
            >
                {option.text}
            </option>
        )
    }

    componentDidMount() {
        const { addParam } = this.context

        addParam({
            forExport: () => {
                if (this.props.isExport && this.props.isParentExport) {
                    return {
                        selector: this.props.item.selector,
                        name: this.props.item.name,
                        value: this.props.getValue()
                    }
                }
            },
            forImport: {
                setValue: (newValue: string) => {
                    this.setState({
                        value: newValue
                    })
                    this.props.setValue(this.props.item.selector, this.props.item.name, newValue)
                },
                selector: this.props.item.selector,
                name: this.props.item.name
            }
        })
    }

    render() {
        return (
            <div className='param-input'>
                <select
                    className='form-select'
                    disabled={this.props.item.onlyDeveloper}
                    value={this.state.value}
                    onChange={this.setValue}
                >
                    {this.options}
                </select>
            </div>
        )
    }

    private setValue = (e: ChangeEvent<HTMLSelectElement>) => {
        const newVal = e.target.value
        const { fileDOM, ETR, setETR, filePath } = this.context

        if (!fileDOM.querySelector(this.props.item.selector)) {
            const array = this.props.item.selector.split('>').map(value => value.trim())
            const name = array.pop()
            const rootSelector = array.join(' > ')
            const element = fileDOM.createElement(name)
            fileDOM.querySelector(rootSelector).append(element)
            
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

        this.props.setValue(this.props.item.selector, this.props.item.name, newVal)
        this.setState({
            value: newVal
        })
    }
}
