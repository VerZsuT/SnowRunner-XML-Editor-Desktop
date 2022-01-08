import { ChangeEvent, MouseEvent, PureComponent } from 'react'
import { IMainContext, MainContext } from '../MainContext'
import { ResetMenu } from './ResetMenu'

const { basename } = window.editorPreload

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
}

interface IState {
    value: string
    showMenu: boolean
    menuX: number
    menuY: number
}

export class Select extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext
    private componentID = String(Math.random())

    private options: JSX.Element[]

    constructor(props: IProps) {
        super(props)

        this.state = {
            value: props.getValue(),
            showMenu: false,
            menuX: 0,
            menuY: 0
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
        return (<>
            <ResetMenu
                show={this.state.showMenu}
                x={this.state.menuX}
                y={this.state.menuY}
                onClick={this.reset}
                onBlur={() => this.setState({ showMenu: false })}
            />
            <div className='param-input'>
                <select
                    className='form-select'
                    value={this.state.value}
                    onChange={this.setValue}
                    onContextMenu={this.onContextMenu}
                >
                    {this.options}
                </select>
            </div>
        </>)
    }

    private setValue = (e: ChangeEvent<HTMLSelectElement>) => {
        const newVal = e.target.value
        const { fileDOM, filePath } = this.context

        if (!fileDOM.querySelector(this.props.item.selector)) {
            const array = this.props.item.selector.split('>').map(value => value.trim())
            const name = array.pop()
            const rootSelector = array.join(' > ')
            const element = fileDOM.createElement(name)
            fileDOM.querySelector(rootSelector).append(element)
        }

        this.props.setValue(this.props.item.selector, this.props.item.name, newVal)
        this.setState({
            value: newVal
        })
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
                        value: this.props.getValue(),
                        fileName: basename(filePath)
                    }
                }
            },
            forImport: {
                setValue: (newValue: string) => {
                    this.setValue({ target: { value: newValue } } as ChangeEvent<HTMLSelectElement>)
                },
                selector: this.props.item.selector,
                name: this.props.item.name,
                fileName: basename(filePath)
            }
        })
    }

    private onContextMenu = (e: MouseEvent<HTMLSelectElement>) => {
        e.stopPropagation()
        this.setState({
            showMenu: true,
            menuX: e.clientX,
            menuY: e.clientY
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
            this.setValue({ target: { value: defaultValue } } as ChangeEvent<HTMLSelectElement>)
        }
    }
}
