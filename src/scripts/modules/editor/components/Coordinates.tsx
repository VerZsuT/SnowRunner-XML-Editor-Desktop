import { ChangeEvent, PureComponent } from 'react'
import '../styles/Coordinates'

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
    x: number
    y: number
    z: number
}

export default class Coordinates extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    constructor(props: IProps) {
        super(props)
        
        this.state = {
            ...this.parse(props.getValue())
        }
    }

    componentDidMount() {
        this.initImportExport()
    }

    render() {
        return (
            <div className='param-input'>
                <span>X: </span>
                <input
                    step={this.props.item.step}
                    className='x-input form-control inline-block'
                    type='number'
                    value={this.state.x}
                    onChange={this.saveX}
                    disabled={this.props.item.onlyDeveloper}
                />
                <span>Y: </span>
                <input
                    step={this.props.item.step}
                    className='y-input form-control inline-block'
                    type='number'
                    value={this.state.y}
                    onChange={this.saveY}
                    disabled={this.props.item.onlyDeveloper}
                />
                <span>Z: </span>
                <input
                    step={this.props.item.step}
                    className='z-input form-control inline-block'
                    type='number'
                    value={this.state.z}
                    onChange={this.saveZ}
                    disabled={this.props.item.onlyDeveloper}
                />
            </div>
        )
    }

    private saveX = (e: ChangeEvent<HTMLInputElement>) => {
        this.save({x: Number(e.target.value)})
    }

    private saveY = (e: ChangeEvent<HTMLInputElement>) => {
        this.save({y: Number(e.target.value)})
    }

    private saveZ = (e: ChangeEvent<HTMLInputElement>) => {
        this.save({z: Number(e.target.value)})
    }

    private save({x=this.state.x, y=this.state.y, z=this.state.z}) {
        const { fileDOM, ETR, setETR, filePath } = this.context
        const newValue = `(${x}; ${y}; ${z})`

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

        this.props.setValue(this.props.item.selector, this.props.item.name, newValue)
        this.setState({
            ...this.parse(newValue)
        })
    }

    private parse(value: string) {
        if (!value) {
            return {x: 0, y: 0, z: 0}
        }
        let array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(';')
        if (array.length === 1) {
            array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(',')
        }
        const [x, y, z] = array
        return {x: Number(x), y: Number(y), z: Number(z)}
    }

    private initImportExport() {
        const { addParam } = this.context

        addParam({
            forExport: () => {
                if (this.props.isExport && this.props.isParentExport) {
                    return {
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
                        const newCoords = this.parse(value)
                        this.setState({
                            x: newCoords.x,
                            y: newCoords.y,
                            z: newCoords.z
                        })
                    }
                },
                selector: this.props.item.selector,
                name: this.props.item.name
            }
        })
    }
}
