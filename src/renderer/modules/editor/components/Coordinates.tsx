import { PureComponent } from 'react'
import type { MouseEvent, FocusEvent } from 'react'
import type IInputParams from 'templates/types/IInputParams'
import { IMainContext, MainContext } from '../MainContext'
import ResetMenu, { showResetMenu } from './ResetMenu'

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
}

export default class Coordinates extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    private componentID = `coordinates-${Math.round(Math.random()*100)}`
    private gridStyle = {
        justifyContent: 'center',
        alignItems: 'center'
    }
    private stepProps: {
        step: number
    }

    constructor(props: IProps) {
        super(props)
        this.state = { ...this.parse(props.getValue()) }
        this.stepProps = { step: props.item.step }
    }

    componentDidMount() {
        this.initImportExport()
        this.initReset()
    }

    componentWillUnmount() {
        if (this.props.unregReset)
            this.props.unregReset(this.componentID)
        this.context.removeParam(this.componentID)
    }

    render() {
        const { isShow } = this.props
        const { x, y, z } = this.state

        if (isShow === false)
            return null
        
        return <>
            <ResetMenu/>
            <GridContainer
                style={this.gridStyle}
                id={this.componentID}
                onContextMenu={this.onContextMenu}
            >
                <Typography>X: </Typography>
                <CoordinateField
                    inputProps={this.stepProps}
                    value={x}
                    onBlur={this.saveX}
                    onChange={this.setX}
                />
                <Typography>Y: </Typography>
                <CoordinateField
                    inputProps={this.stepProps}
                    value={y}
                    onBlur={this.saveY}
                    onChange={this.setY}
                />
                <Typography>Z: </Typography>
                <CoordinateField
                    inputProps={this.stepProps}
                    value={z}
                    onBlur={this.saveZ}
                    onChange={this.setZ}
                />
            </GridContainer>
        </>
    }

    private saveX = (e: FocusEvent<HTMLInputElement>) => this.save({ x: +e.target.value })
    private saveY = (e: FocusEvent<HTMLInputElement>) => this.save({ y: +e.target.value })
    private saveZ = (e: FocusEvent<HTMLInputElement>) => this.save({ z: +e.target.value })

    private setX = (e: FocusEvent<HTMLInputElement>) => this.setState({ x: e.target.value })
    private setY = (e: FocusEvent<HTMLInputElement>) => this.setState({ y: e.target.value })
    private setZ = (e: FocusEvent<HTMLInputElement>) => this.setState({ z: e.target.value })

    private save({ x = this.state.x, y = this.state.y, z = this.state.z }) {
        const { item, setValue } = this.props
        const newValue = `(${x}; ${y}; ${z})`
        const { fileDOM } = this.context

        if (!fileDOM(item.selector).length) {
            const array = item.selector.split('>').map(value => value.trim())
            const name = array.pop()
            const rootSelector = array.join(' > ')

            fileDOM(rootSelector).eq(0).append(`<${name}></${name}>`)
        }

        setValue(item.selector, item.name, newValue)
        this.setState({ ...this.parse(newValue) })
    }

    private parse(value: string) {
        let array: string[]
        let x: string
        let y: string
        let z: string

        if (!value)
            return { x: 0, y: 0, z: 0 }

        array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(';')
        if (array.length === 1)
            array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(',');

        [x, y, z] = array
        return { x: +x, y: +y, z: +z }
    }

    private initImportExport() {
        const { isExport, isParentExport, item } = this.props
        const { x, y, z } = this.state
        const { addParam, filePath } = this.context

        addParam({
            id: this.componentID,
            forExport: () => {
                if (isExport && isParentExport) {
                    return {
                        fileName: basename(filePath),
                        selector: item.selector,
                        name: item.name,
                        value: `(${x}; ${y}; ${z})`
                    }
                }
            },
            forImport: {
                setValue: (value: string) => {
                    const thisValue = `(${x}; ${y}; ${z})`
                    if (thisValue !== value)
                        this.save(this.parse(value))
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
            onReset: this.reset
        })
    }

    private initReset() {
        this.props.regReset(this.componentID, this.reset)
    }

    private reset = () => {
        const defaultValue = this.props.getDefaultValue()

        if (defaultValue !== undefined)
            this.save(this.parse(defaultValue))
    }
}
