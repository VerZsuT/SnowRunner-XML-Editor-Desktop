import { PureComponent } from 'react'
import '../styles/Group.css'

import { IMainContext, MainContext } from '../MainContext'

import Parameter from './Parameter'

interface IProps {
    tabs: number
    parent: string
    item: IGroupParams
    isParentExport: boolean
    isExporting: boolean
}

interface IState {
    isExport: boolean
}

export default class Group extends PureComponent<IProps, IState> {
    static contextType = MainContext
    declare context: IMainContext

    private headerID: number
    private containerID: number
    private contentID: number
    private items: {
        groups: any[]
        params: any[]
    }
    private styles: {
        [name: string]: React.CSSProperties
    }

    constructor(props: IProps) {
        super(props)

        this.state = {
            isExport: props.isParentExport
        }
        this.styles = {
            header: { paddingLeft: `${props.tabs * 10}px` },
            headerCont: { paddingLeft: `${props.tabs * 5}px` }
        }
        this.headerID = Math.round(Math.random() * 1000000)
        this.containerID = Math.round(Math.random() * 1000000)
        this.contentID = Math.round(Math.random() * 1000000)
        this.items = this.getItems()
    }

    render() {
        const { filter } = this.context

        return this.filt(this.props.item.groupItems)?
            <div className='accordion-item' style={{position: 'relative'}}>
                <div 
                    className={`group accordion-button${!Boolean(filter)? ' collapsed':''}`}
                    data-bs-toggle='collapse'
                    data-bs-target={`#_${this.containerID}`}
                    aria-expanded='false'
                    style={this.styles.headerCont}
                >
                    <div className='accordion-header' style={this.styles.header} id={`_${this.headerID}`}>
                        {this.props.item.groupName}
                    </div>
                </div>
                <div
                    className={`group-cont accordion-collapse collapse${Boolean(filter)? ' show':''}`}
                    aria-labelledby={`_${this.headerID}`}
                    data-bs-parent={`#${this.props.parent}`}
                    id={`_${this.containerID}`}
                >
                    <div className='accordion-body' id={`_${this.contentID}`}>
                        {this.items.params.map(param => 
                            <Parameter
                                isParentExport={this.state.isExport && this.props.isParentExport}
                                isExporting={this.props.isExporting}
                                item={param}
                                tabs={this.props.tabs + 1}
                                key={param.name}
                            />
                        )}
                        
                        {this.items.groups.map(groupItem => 
                            <Group
                                isParentExport={this.state.isExport && this.props.isParentExport}
                                isExporting={this.props.isExporting}
                                item={groupItem}
                                parent={`_${this.contentID}`}
                                tabs={this.props.tabs + 1}
                                key={groupItem.groupName}
                            />
                        )}
                    </div>
                </div>
                {this.props.isExporting?
                    <input
                        type='checkbox'
                        className='group-export'
                        checked={this.state.isExport && this.props.isParentExport}
                        onChange={this.toggleExporting}
                    />
                :null}
            </div>
        :null
    }

    private toggleExporting = () => {
        if (this.props.isParentExport) {
            this.setState({
                isExport: !this.state.isExport
            })
        }
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
}
