import { PureComponent, MouseEvent } from 'react'
import { IMainContext, MainContext } from '../MainContext'
import { Parameter } from './Parameter'
import { ResetMenu } from './ResetMenu'

interface IProps {
    parent: string
    item: IGroupParams
    isParentExport: boolean
    isExporting: boolean
    regReset?(id: string, func: () => void): void
    unregReset?(id: string): void
}

interface IState {
    isExport: boolean
    showContextMenu: boolean
    menuX: number
    menuY: number
}

export class Group extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    private componentID = String(Math.random())
    private headerID: number
    private containerID: number
    private contentID: number
    private iconSRC: string
    private items: {
        groups: any[]
        params: any[]
    }
    private toReset: {
        [id: string]: () => void
    }

    constructor(props: IProps) {
        super(props)

        this.state = {
            isExport: props.isParentExport,
            showContextMenu: false,
            menuX: 0,
            menuY: 0
        }
        this.toReset = {}
        this.headerID = Math.round(Math.random() * 1000000)
        this.containerID = Math.round(Math.random() * 1000000)
        this.contentID = Math.round(Math.random() * 1000000)
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
        const { filter } = this.context

        return this.filt(this.props.item.groupItems) ? <>
            <ResetMenu
                show={this.state.showContextMenu}
                x={this.state.menuX}
                y={this.state.menuY}
                onClick={this.reset}
                onBlur={() => this.setState({ showContextMenu: false })}
                text={this.props.item.groupName}
            />
            <div
                className='accordion-item'
            >
                <div
                    className={`group accordion-button${!Boolean(filter) ? ' collapsed' : ''}`}
                    data-bs-toggle='collapse'
                    data-bs-target={`#_${this.containerID}`}
                    aria-expanded='false'
                    onContextMenu={this.showContextMenu}
                >
                    {this.iconSRC ?
                        <img src={this.iconSRC} />
                        : null}
                    <div className='accordion-header' id={`_${this.headerID}`}>
                        {this.props.item.groupName}
                    </div>
                </div>
                <div
                    className={`group-cont accordion-collapse collapse${Boolean(filter) ? ' show' : ''}`}
                    aria-labelledby={`_${this.headerID}`}
                    data-bs-parent={`#${this.props.parent}`}
                    id={`_${this.containerID}`}
                >
                    <div className='accordion-body' id={`_${this.contentID}`}>
                        {this.items.params.map((param, index) =>
                            <Parameter
                                isParentExport={this.state.isExport && this.props.isParentExport}
                                isExporting={this.props.isExporting}
                                item={param}
                                key={`${param.name}-${index}`}
                                regReset={this.regReset}
                                unregReset={this.unregReset}
                            />
                        )}

                        {this.items.groups.map((groupItem, index) =>
                            <Group
                                isParentExport={this.state.isExport && this.props.isParentExport}
                                isExporting={this.props.isExporting}
                                item={groupItem}
                                parent={`_${this.contentID}`}
                                key={`${groupItem.groupName}-${index}`}
                                regReset={this.regReset}
                                unregReset={this.unregReset}
                            />
                        )}
                    </div>
                </div>
                {this.props.isExporting ?
                    <input
                        type='checkbox'
                        className='group-export'
                        checked={this.state.isExport && this.props.isParentExport}
                        onChange={this.toggleExporting}
                    />
                    : null}
            </div>
        </> : null
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
            showContextMenu: false
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
        const params = []
        for (const groupItem of this.props.item.groupItems) {
            if (groupItem.paramType === 'group') {
                groups.push(groupItem)
            } else {
                params.push(groupItem)
            }
        }
        return { groups, params }
    }

    private filt(items: any[]): boolean {
        const { filter } = this.context

        if (!filter) return true
        let hasItem = false

        for (const item of items) {
            if (item.paramType === 'group') {
                hasItem = this.filt(item.groupItems)
            } else {
                hasItem = item.text.toLowerCase().includes(filter)
            }
            if (hasItem) break
        }
        return hasItem
    }

    private showContextMenu = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        this.setState({
            showContextMenu: true,
            menuX: e.clientX,
            menuY: e.clientY
        })

    }
}
