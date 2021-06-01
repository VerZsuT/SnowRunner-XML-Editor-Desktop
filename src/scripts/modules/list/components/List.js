import { getText } from "../../../service/funcs.js"

const List = {
    props: ['srcType'],
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
            const array = preload.getList(this.listType, this.srcType)
            if (this.srcType === 'main') {
                return array
            } else {
                const newArray = []
                for (const dlcOrMod of array) {
                    for (const item of dlcOrMod.items) {
                        item.dlcName = dlcOrMod.name
                        item.modId = dlcOrMod.id
                        newArray.push(item)
                    }
                }
                return newArray
            }
            
        }
    }
}

export default List
