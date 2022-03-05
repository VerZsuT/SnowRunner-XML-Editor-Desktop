import { MouseEvent, PureComponent } from 'react'
import { IMainContext, MainContext } from '../MainContext'
import { ResetMenu } from './ResetMenu'

import {
    MenuItem,
    Select as SelectMUI,
    SelectChangeEvent
} from '@mui/material'

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
    isShow?: boolean
}

interface IState {
    value: string
    menu: {
        show?: boolean
        x?: number
        y?: number
    }
}

export class Select extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext
    private componentID = `select-${Math.round(Math.random()*100)}`

    private options: JSX.Element[]

    constructor(props: IProps) {
        super(props)

        this.state = {
            value: props.getValue(),
            menu: {}
        }
        this.options = this.props.item.selectParams.map(option =>
            <MenuItem
                key={option.value}
                value={option.value}
            >
                {option.text}
            </MenuItem>
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
        if (this.props.isShow === false) return null

        return (<>
            <ResetMenu
                show={this.state.menu.show ?? false}
                onReset={this.reset}
                onClose={() => this.setState({ menu: {} })}
                x={this.state.menu.x ?? 0}
                y={this.state.menu.y ?? 0}
                text={this.props.item.text}
            />
            
                <SelectMUI
                    id={this.componentID}
                    value={this.state.value}
                    onChange={this.setValue}
                    onContextMenu={this.onContextMenu}
                    size='small'
                >
                    {this.options}
                </SelectMUI>
        </>)
    }

    private setValue = (e: SelectChangeEvent) => {
        const newVal = e.target.value
        const { fileDOM } = this.context

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
                    this.setValue({ target: { value: newValue } } as SelectChangeEvent)
                },
                selector: this.props.item.selector,
                name: this.props.item.name,
                fileName: basename(filePath)
            }
        })
    }

    private onContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        this.setState({
            menu: {
                show: true,
                x: e.clientX,
                y: e.clientY
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
            menu: {}
        })
        if (defaultValue !== undefined) {
            this.setValue({ target: { value: defaultValue } } as SelectChangeEvent)
        }
    }
}