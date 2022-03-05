import { MouseEvent, PureComponent } from 'react'
import type IInputParams from 'templates/types/IInputParams'
import { IMainContext, MainContext } from '../MainContext'
import ResetMenu from './ResetMenu'

import { Typography } from '@mui/material'
import GridContainer from 'modules/components/styled/GridContainer'
import CoordinateField from '../styled/CoordinateField'

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
    x: number | string
    y: number | string
    z: number | string
    menu: {
        show?: boolean
        x?: number
        y?: number
    }
}

export default class Coordinates extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext
    private componentID = `coordinates-${Math.round(Math.random()*100)}`

    constructor(props: IProps) {
        super(props)

        this.state = {
            ...this.parse(props.getValue()),
            menu: {}
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
        if (this.props.isShow === false) {
            return null
        }
        
        return (<>
            <ResetMenu
                show={this.state.menu.show ?? false}
                onReset={this.reset}
                onClose={() => this.setState({ menu: {} })}
                x={this.state.menu.x ?? 0}
                y={this.state.menu.y ?? 0}
                text={this.props.item.text}
            />
            <GridContainer
                style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                id={this.componentID}
                onContextMenu={this.onContextMenu}
            >
                <Typography>X: </Typography>
                <CoordinateField
                    inputProps={{ step: this.props.item.step }}
                    value={this.state.x}
                    onBlur={e => this.save({ x: +e.target.value })}
                    onChange={e => this.setState({ x: e.target.value })}
                />
                <Typography>Y: </Typography>
                <CoordinateField
                    inputProps={{ step: this.props.item.step }}
                    value={this.state.y}
                    onBlur={e => this.save({ y: +e.target.value })}
                    onChange={e => this.setState({ y: e.target.value })}
                />
                <Typography>Z: </Typography>
                <CoordinateField
                    inputProps={{ step: this.props.item.step }}
                    value={this.state.z}
                    onBlur={e => this.save({ z: +e.target.value })}
                    onChange={e => this.setState({ z: e.target.value })}
                />
            </GridContainer>
        </>)
    }

    private save({ x = this.state.x, y = this.state.y, z = this.state.z }) {
        const newValue = `(${x}; ${y}; ${z})`
        const { fileDOM } = this.context

        if (!fileDOM(this.props.item.selector).length) {
            const array = this.props.item.selector.split('>').map(value => value.trim())
            const name = array.pop()
            const rootSelector = array.join(' > ')

            fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`)
        }

        this.props.setValue(this.props.item.selector, this.props.item.name, newValue)
        this.setState({ ...this.parse(newValue) })
    }

    private parse(value: string) {
        let array: string[]
        let x: string
        let y: string
        let z: string

        if (!value) {
            return { x: 0, y: 0, z: 0 }
        }

        array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(';')
        if (array.length === 1) {
            array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(',');
        }
        [x, y, z] = array
        return { x: +x, y: +y, z: +z }
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
            menu: {
                show: true,
                x: e.clientX,
                y: e.clientY
            }
        })
    }

    private initReset() {
        this.props.regReset(this.componentID, this.reset)
    }

    private reset = () => {
        const defaultValue = this.props.getDefaultValue()

        this.setState({ menu: {} })
        if (defaultValue !== undefined) {
            this.save(this.parse(defaultValue))
        }
    }
}
