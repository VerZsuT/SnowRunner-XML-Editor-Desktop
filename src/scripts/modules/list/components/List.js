import { getText } from "../../../service/funcs.js"
import { funcs } from "../../../service/renderer.js"

const List = {
    props: {
        srcType: String
    },
    template: `
        <div>
            <span class="list-title h2">
                <span v-if='srcType === "mods"'>{{ t.MODS_LIST_TITLE }}</span>
                <span v-if='srcType === "dlc"'>{{ t.DLC_LIST_TITLE }}</span>
                <span v-if='srcType === "main"'>{{ t.MAIN_LIST_TITLE }}</span>
            </span>
            <div class='list'>
                <list-item
                    v-for='item in items'
                    :item-type='listType'
                    :item='item'
                    :key='item.path'
                ></list-item>
            </div>
        </div>
    `,
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName)
                }
            }),
            listType: local.listType,
            isArray: this.srcType !== 'main'
        }
    },
    computed: {
        items() {
            let array = preload.getList(this.listType, this.srcType)
            if (this.srcType === 'main') {
                array = array.map((value) => {
                    if (this.listType !== 'trucks') {
                        return value
                    }
                    const fileData = funcs.getFileData(value.path)
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
                        item.dlcName = dlcOrMod.dlcName
                        item.modId = dlcOrMod.id
                        newArray.push(item)
                    }
                }
                newArray = newArray.map((value) => {
                    if (this.listType !== 'trucks') {
                        return value
                    }
                    const fileData = funcs.getFileData(value.path)
                    const dom = new DOMParser().parseFromString(`<root>${fileData}</root>`, 'text/xml')
                    if (dom.querySelector('Truck').getAttribute('Type') !== 'Trailer') {
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
}

export default List
