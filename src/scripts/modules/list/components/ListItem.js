import { getIngameText, prettify } from "../../../service/funcs.js"
import { funcs } from "../../../service/renderer.js"

const ListItem = {
    props: {
        itemType: String, 
        item: Object
    },
    template: `
        <div
            class='item'
            v-show='!error && show()'
            @click='openEditor'
        >
            <span
                class='item-text'
                v-if='typeof text === "string"'
            >
                {{ text }}
            </span>
            <span
                class='item-text'
                v-else
            >
                {{ text.first }}<span style='color: red'>{{ text.second }}</span>{{ text.last }}
            </span>
            <img :src='imageSource'>
        </div>
    `,
    inject: ['filter'],
    data() {
        return {
            parser: new DOMParser()
        }
    },
    methods: {
        openEditor() {
            local.filePath = this.item.path
            local.currentDLC = this.item.dlcName
            local.currentMod = this.item.modId
            funcs.openXMLEditor()
        },
        show() {
            if (!this.filter.value) {
                return true
            }
            if (this.name.toLowerCase().includes(this.filter.value.toLowerCase())) {
                return true
            }
            return false
        }
    },
    computed: {
        DOM() {
            const data = `<root>${funcs.getFileData(this.item.path)}</root>`
            return this.parser.parseFromString(data, 'text/xml')
        },
        imageSource() {
            switch (this.itemType) {
                case 'cargo':
                    return '../icons/cargo_item.png'
                case 'trailers':
                    return '../icons/trailer_item.png'
                case 'trucks':
                    let path = `../truck_images/${this.item.name}.jpg`
                    if (this.item.modId && this.DOM.querySelector('GameData > UiDesc')) {
                        const imgName = this.DOM.querySelector('GameData > UiDesc').getAttribute('UiIcon328x458')
                        path = `../scripts/modsTemp/${this.item.modId}/ui/textures/${imgName}.png`
                        let path2 = `../../modsTemp/${this.item.modId}/ui/textures/${imgName}.png`
                        if (!preload.exists(path2)) {
                            path = '../icons/truck_item.png'
                        }
                    }
                    return path
            }
        },
        name() {
            let name = prettify(this.item.name)
            if (this.DOM.querySelector('GameData > UiDesc')) {
                const uiName = this.DOM.querySelector('GameData > UiDesc').getAttribute('UiName')
                if (uiName) {
                    name = getIngameText(uiName, this.item.modId) || uiName
                }
            }
            return name
        },
        text() {
            const filter = this.filter.value
            if (!filter) {
                return this.name
            }
            const firstIndex = this.name.toLowerCase().indexOf(filter.toLowerCase())
            const lastIndex = firstIndex + filter.length
            return {
                first: this.name.slice(0, firstIndex),
                second: this.name.slice(firstIndex, lastIndex),
                last: this.name.slice(lastIndex, this.name.length)
            }
        },
        error() {
            return (
                this.DOM.querySelector('parsererror') || 
                (
                    this.item.type === 'trucks' && 
                    this.DOM.querySelector('Truck') && 
                    this.DOM.querySelector('Truck').getAttribute('Type') === 'Trailer'
                )
            )   
        }
    }
}

export default ListItem
