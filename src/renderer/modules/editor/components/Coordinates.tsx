import { MouseEvent, PureComponent } from 'react'
import { IMainContext, MainContext } from '../MainContext'
import { ResetMenu } from './ResetMenu'

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
    x: number | string
    y: number | string
    z: number | string
    showMenu: boolean
    menuX: number
    menuY: number
}

export class Coordinates extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext
    private componentID = String(Math.random())

    constructor(props: IProps) {
        super(props)

        this.state = {
            ...this.parse(props.getValue()),
            showMenu: false,
            menuX: 0,
            menuY: 0
        }
    }

    componentDidMount() {
        this.initImportExport()
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
            <div
                className='param-input'
                onContextMenu={this.onContextMenu}
            >
                <span>X: </span>
                <input
                    step={this.props.item.step}
                    className='x-input form-control inline-block'
                    type='number'
                    value={this.state.x}
                    onBlur={e => this.save({ x: Number(e.target.value) })}
                    onChange={e => this.setState({ x: e.target.value })}
                />
                <span>Y: </span>
                <input
                    step={this.props.item.step}
                    className='y-input form-control inline-block'
                    type='number'
                    value={this.state.y}
                    onBlur={e => this.save({ y: Number(e.target.value) })}
                    onChange={e => this.setState({ y: e.target.value })}
                />
                <span>Z: </span>
                <input
                    step={this.props.item.step}
                    className='z-input form-control inline-block'
                    type='number'
                    value={this.state.z}
                    onBlur={e => this.save({ z: Number(e.target.value) })}
                    onChange={e => this.setState({ z: e.target.value })}
                />
            </div>
        </>)
    }

    private save({ x = this.state.x, y = this.state.y, z = this.state.z }) {
        const newValue = `(${x}; ${y}; ${z})`
        const { fileDOM } = this.context

        if (!fileDOM.querySelector(this.props.item.selector)) {
            const array = this.props.item.selector.split('>').map(value => value.trim())
            const name = array.pop()
            const rootSelector = array.join(' > ')
            fileDOM.querySelector(rootSelector).append(fileDOM.createElement(name))
        }

        this.props.setValue(this.props.item.selector, this.props.item.name, newValue)
        this.setState({
            ...this.parse(newValue)
        })
    }

    private parse(value: string) {
        if (!value) {
            return { x: 0, y: 0, z: 0 }
        }
        let array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(';')
        if (array.length === 1) {
            array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(',')
        }
        const [x, y, z] = array
        return { x: Number(x), y: Number(y), z: Number(z) }
    }

    private initImportExport() {
        const { addParam, filePath } = this.context

        addParam({
            id: this.componentID,
            forExport: () => {
                if (this.props.isExport && this.props.isParentExport) {
                    return {
                        fileName: basename(filePath),
                        selector: this.props.item.selector,
                        name: this.props.item.name,
                        value: `(${this.state.x}; ${this.state.y}; ${this.state.z})`
                    }
                }
            },
            forImport: {
                setValue: (value: string) => {
                    const thisValue = `(${this.state.x}; ${this.state.y}; ${this.state.z})`
                    if (thisValue !== value) {
                        this.save(this.parse(value))
                    }
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
            showMenu: true,
            menuX: e.clientX,
            menuY: e.clientY
        })
    }

    private initReset() {
        this.props.regReset(this.componentID, this.reset)
    }

    private reset = () => {
        const defaultValue = this.props.getDefaultValue()
        this.setState({
            showMenu: false
        })
        console.log(defaultValue)
        if (defaultValue !== undefined) {
            this.save(this.parse(defaultValue))
        }
    }
}
