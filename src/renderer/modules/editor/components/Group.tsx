import { PureComponent } from 'react'
import memoizee from 'memoizee'
import type { MouseEvent } from 'react'
import type IGroupParams from 'templates/types/IGroupParams'
import InputType from 'templates/enums/InputType'

import { IMainContext, MainContext } from '../MainContext'
import Parameter from './Parameter'
import ResetMenu, { showResetMenu } from './ResetMenu'
import GroupAccordion from 'modules/components/GroupAccordion'

import { TableBody } from '@mui/material'
import Table from '../styled/Table'

interface IProps {
    item: IGroupParams
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
    toggle(expand: boolean): void
    isParentExport: boolean
    isExporting: boolean
    isShow: boolean
    isOpen: boolean
}

interface IState {
    isExport: boolean
    openedGroup: number
}

export default class Group extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    private emptyContStyle = { height: '47px' }
    private componentID = `group-${Math.round(Math.random()*100)}`
    private iconSRC: string
    private items: {
        groups: any[]
        params: {
            files: any[]
            default: any[]
        }
    }
    private toReset: {
        [id: string]: () => void
    }

    constructor(props: IProps) {
        super(props)
        this.state = {
            isExport: props.isParentExport,
            openedGroup: null
        }
        this.toReset = {}
        this.items = this.getItems()
        if (props.item.icon)
            this.iconSRC = require(`images/icons/editor/${props.item.icon}`)
    }

    componentDidMount() {
        this.initReset()
    }

    componentWillUnmount() {
        if (this.props.unregReset) {
            this.props.unregReset(this.componentID)
        }
    }

    render() {
        const { isParentExport, isExporting, isOpen, isShow, item, toggle } = this.props
        const { isExport, openedGroup } = this.state

        const defaultParams = this.items.params.default.map((param, index) =>
            <Parameter
                isParentExport={isExport && isParentExport}
                isExporting={isExporting}
                item={param}
                regReset={this.regReset}
                key={`${param.name}-${index}`}
                unregReset={this.unregReset}
                isShow={isOpen}
            />
        )
        const filesParams = this.items.params.files.map((param, index) =>
            <Parameter
                item={param}
                key={`${param.name}-${index}`}
                regReset={this.regReset}
                unregReset={this.unregReset}
                isParentExport={isExport && isParentExport}
                isExporting={isExporting}
                isShow={isOpen}
            />
        )
        const groups = this.items.groups.map((groupItem, index) =>
            <Group
                item={groupItem}
                key={`${groupItem.groupName}-${index}`}
                regReset={this.regReset}
                unregReset={this.unregReset}
                isParentExport={isExport && isParentExport}
                isExporting={isExporting}
                isShow={isOpen}
                isOpen={openedGroup === index}
                toggle={this.toggleExpand(index)}
            />
        )

        if (isShow === false) {
            return (
                <div style={this.emptyContStyle}>
                    {defaultParams}
                    {filesParams}
                    {groups}
                </div>
            )
        }

        return <>
            <ResetMenu/>
            <GroupAccordion
                id={this.componentID}
                title={item.groupName}
                iconSRC={this.iconSRC}
                showExport={isExporting}
                isExport={isExport && isParentExport}
                onChangeExport={this.toggleExporting}
                onContextMenu={this.showContextMenu}
                onChange={toggle}
                expanded={isOpen}
            >
                {defaultParams.length ?
                    <Table>
                        <TableBody>
                            {defaultParams} 
                        </TableBody>
                    </Table>
                : null}
                {filesParams}
                {groups}
            </GroupAccordion>
        </>
    }

    private toggleExpand = memoizee((index: number) => (expand: boolean) => this.setState({ openedGroup: expand? index : null }))

    private toggleExporting = () => {
        if (this.props.isParentExport)
            this.setState(({ isExport }) => ({ isExport: !isExport }))
    }

    private initReset() {
        if (this.props.regReset)
            this.props.regReset(this.componentID, this.reset)
    }

    private reset = () => {
        for (const itemID in this.toReset) {
            this.toReset[itemID]()
        }
    }

    private regReset = (id: string, func: () => void) => {
        this.toReset[id] = func
    }

    private unregReset = (id: string) => {
        delete this.toReset[id]
    }

    private getItems() {
        const groups = []
        const params = {
            files: [],
            default: []
        }

        for (const groupItem of this.props.item.groupItems) {
            if (groupItem.paramType === 'group') {
                groups.push(groupItem)
            }
            else {
                if (groupItem.type === InputType.file)
                    params.files.push(groupItem)
                else
                    params.default.push(groupItem)
            }
        }
        return { groups, params }
    }

    private showContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        showResetMenu({
            x: e.clientX,
            y: e.clientY,
            text: this.props.item.groupName,
            onReset: this.reset
        })
    }
}
