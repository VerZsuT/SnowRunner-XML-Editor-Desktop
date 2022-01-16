import { PureComponent, MouseEvent } from 'react'
import { InputType } from 'scripts'
import { IMainContext, MainContext } from '../MainContext'
import { Parameter } from './Parameter'
import { ResetMenu } from './ResetMenu'

import { GroupAccordion } from 'modules/components/GroupAccordion'

import {
    Table as MuiTable,
    TableBody,
    styled
} from '@mui/material'

const Table = styled(MuiTable)({
    width: '100%',
    position: 'relative',
    bottom: '8px'
})

interface IProps {
    item: IGroupParams
    isParentExport: boolean
    isExporting: boolean
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
    isShow?: boolean
}

interface IState {
    isExport: boolean
    expanded: boolean
    menu: {
        show?: boolean
        x?: number
        y?: number
    }
}

export class Group extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

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
            menu: {},
            expanded: false
        }
        this.toReset = {}
        this.items = this.getItems()
        if (props.item.icon) {
            this.iconSRC = require(`images/icons/editor/${props.item.icon}`)
        }
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
        const defaultParams = this.items.params.default.map((param, index) =>
            <Parameter
                isParentExport={this.state.isExport && this.props.isParentExport}
                isExporting={this.props.isExporting}
                item={param}
                regReset={this.regReset}
                key={`${param.name}-${index}`}
                unregReset={this.unregReset}
                isShow={this.state.expanded}
            />
        )
        const filesParams = this.items.params.files.map((param, index) =>
            <Parameter
                isParentExport={this.state.isExport && this.props.isParentExport}
                isExporting={this.props.isExporting}
                item={param}
                key={`${param.name}-${index}`}
                regReset={this.regReset}
                unregReset={this.unregReset}
                isShow={this.state.expanded}
            />
        )
        const groups = this.items.groups.map((groupItem, index) =>
            <Group
                isParentExport={this.state.isExport && this.props.isParentExport}
                isExporting={this.props.isExporting}
                item={groupItem}
                key={`${groupItem.groupName}-${index}`}
                regReset={this.regReset}
                unregReset={this.unregReset}
                isShow={this.state.expanded}
            />
        )

        if (this.props.isShow === false) return <>
            {defaultParams}
            {filesParams}
            {groups}
        </>

        return <>
            <ResetMenu
                show={this.state.menu.show ?? false}
                onReset={this.reset}
                onClose={() => this.setState({ menu: {} })}
                text={this.props.item.groupName}
                x={this.state.menu.x ?? 0}
                y={this.state.menu.y ?? 0}
            />
            <GroupAccordion
                id={this.componentID}
                title={this.props.item.groupName}
                iconSRC={this.iconSRC}
                showExport={this.props.isExporting}
                isExport={this.state.isExport && this.props.isParentExport}
                onChangeExport={this.toggleExporting}
                onContextMenu={this.showContextMenu}
                expanded={this.state.expanded}
                onChange={expanded => this.setState({ expanded })}
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

    private toggleExporting = () => {
        if (this.props.isParentExport) {
            this.setState({
                isExport: !this.state.isExport
            })
        }
    }

    private initReset() {
        if (this.props.regReset) {
            this.props.regReset(this.componentID, this.reset)
        }
    }

    private reset = () => {
        for (const itemID in this.toReset) {
            this.toReset[itemID]()
        }
        this.setState({
            menu: {}
        })
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
            } else {
                if (groupItem.type === InputType.file) {
                    params.files.push(groupItem)
                } else {
                    params.default.push(groupItem)
                }
            }
        }
        return { groups, params }
    }

    private showContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        this.setState({
            menu: {
                show: true,
                x: e.clientX,
                y: e.clientY
            }
        })

    }
}
