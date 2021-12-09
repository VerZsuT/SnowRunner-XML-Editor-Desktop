import { PureComponent } from 'react'
import '../styles/InnerList.css'

import { mainProcess, t } from '@editor-service'
import InnerListItem from './InnerListItem'
import { FilterContext } from '../FilterContext'
import { FromList, ListType, SrcType } from '../enums'

interface IProps {
    srcType: SrcType
}

export default class InnerList extends PureComponent<IProps> {
    static contextType = FilterContext

    private listType: ListType
    private title: JSX.Element
    private items: JSX.Element[]

    constructor(props: IProps) {
        super(props)

        this.listType = local.get('listType') as ListType
        this.title = this.getTitle()
        this.items = this.getItems().map(item => 
            <InnerListItem
                item={item}
                key={item.path}
            />
        )
    }

    render() {
        return (
            <div>
                <span className='list-title h2'>
                    {this.title}
                </span>
                <div className='list'>
                    {this.items.length
                        ? this.items
                        : <span v-if='items.length === 0'>{t.EMPTY}</span>
                    }
                </div>
            </div>
        )
    }

    private addMod() {
        const result = listPreload.getModPak()
        if (!config.modsList[result.id]) {
            config.modsList.length++
        }
        config.modsList[result.id] = {
            name: result.name,
            path: result.path
        }
        if (mainProcess.confirm(t.RELAUNCH_PROMPT)) {
            mainProcess.reload()
        }
    }

    private getTitle() {
        if (this.props.srcType === SrcType.mods) {
            return (
                <span>
                    {t.MODS_LIST_TITLE}
                    <button
                        className='btn btn-primary'
                        onClick={()=>this.addMod()}
                        style={{padding: '0 10px'}}
                    >
                        {t.MODS_ADD_BUTTON}
                    </button>
                </span>
            )
        }
        if (this.props.srcType === SrcType.dlc) {
            return <span>{t.DLC_LIST_TITLE}</span>
        }
        return <span>{t.MAIN_LIST_TITLE}</span>
    }

    private getItems() {
        let array = []
        if (this.listType === ListType.trucks || this.listType === ListType.trailers || this.listType === ListType.cargo) {
            array = listPreload.getList(this.listType, this.props.srcType as unknown as FromList)
        }
        if (this.props.srcType === SrcType.main) {
            array = array.map((value) => {
                if (this.listType !== ListType.trucks) {
                    return value
                }
                const fileData = mainProcess.readFile(value.path)
                const dom = new DOMParser().parseFromString(`<root>${fileData}</root>`, 'text/xml')
                if (dom.querySelector('Truck').getAttribute('Type') !== 'Trailer') {
                    return value
                }
            })
            const out = []
            for (const item of array) {
                if (item) {
                    out.push(item)
                }
            }
            return out
        } else {
            let newArray = []
            for (const dlcOrMod of array) {
                for (const item of dlcOrMod.items) {
                    newArray.push({
                        ...item,
                        dlcName: dlcOrMod.dlcName,
                        modId: dlcOrMod.id
                    })
                }
            }
            newArray = newArray.map((value) => {
                const fileData = mainProcess.readFile(value.path)
                const $dom = new DOMParser().parseFromString(`<root>${fileData}</root>`, 'text/xml')
                const $Truck = $dom.querySelector('Truck')
                if (this.listType === ListType.trailers && $Truck && $Truck.getAttribute('Type') === 'Trailer') {
                    return value
                } else if (this.listType === ListType.trucks && $Truck && $Truck.getAttribute('Type') !== 'Trailer') {
                    return value
                } else if (this.listType === ListType.cargo) {
                    return value
                }
            })
            const out = []
            for (const item of newArray) {
                if (item) {
                    out.push(item)
                }
            }
            return out
        }
    }
}
