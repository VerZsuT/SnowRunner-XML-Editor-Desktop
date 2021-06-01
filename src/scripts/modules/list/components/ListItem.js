import { getIngameText, prettify } from "../../../service/funcs.js"
import { funcs } from "../../../service/renderer.js"

const ListItem = {
    props: ['itemType', 'item'],
    template: `
        <div 
            class='item'
            v-if='!error'
            @click='openEditor'
        >
            <span class='item-text'>{{ name }}</span>
            <img :src='imageSource'>
        </div>
    `,
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
                    }
                    return path
            }
        },
        name() {
            if (this.DOM.querySelector('GameData > UiDesc')) {
                const uiName = this.DOM.querySelector('GameData > UiDesc').getAttribute('UiName') 
                return getIngameText(uiName, this.item.modId) || uiName
            } else {
                prettify(this.item.name)
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
