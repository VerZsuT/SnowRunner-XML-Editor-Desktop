import { PureComponent } from 'react'
import '../styles/InnerList.css'

import { mainProcess, t } from '@editor-service'
import InnerListItem from './InnerListItem'
import { FilterContext } from '../FilterContext'

interface IProps {
    srcType: SrcType
}

export default class InnerList extends PureComponent<IProps> {
    static contextType = FilterContext

    private listType = local.get('listType') as ListType
    private title = this.getTitle()
    private items = this.getItems().map(item => 
        <InnerListItem
            item={item}
            key={item.path}
        />
    )

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
        if (this.props.srcType === 'mods') {
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
        if (this.props.srcType === 'dlc') {
            return <span>{t.DLC_LIST_TITLE}</span>
        }
        return <span>{t.MAIN_LIST_TITLE}</span>
    }

    private getItems() {
        let array = []
        if (this.listType === 'trucks' || this.listType === 'trailers' || this.listType === 'cargo') {
            array = listPreload.getList(this.listType, this.props.srcType as FromList)
        }
        if (this.props.srcType === 'main') {
            array = array.map((value) => {
                if (this.listType !== 'trucks') {
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
                if (this.listType === 'trailers' && $Truck && $Truck.getAttribute('Type') === 'Trailer') {
                    return value
                } else if (this.listType === 'trucks' && $Truck && $Truck.getAttribute('Type') !== 'Trailer') {
                    return value
                } else if (this.listType === 'cargo') {
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
