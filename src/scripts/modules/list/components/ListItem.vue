<template>
    <div class='item' v-show='!error && show() && !isDeleted'>
        <span class='item-text' v-if='typeof text === "string"'>
            {{ text }}
        </span>
        <span class='item-text' v-else>
            {{ text.first }}<span style='color: red'>{{ text.second }}</span>{{ text.last }}
        </span>
        <img :src='imageSource' @click='openEditor'>
        <button v-if='item.modId' class='delete-mod' @click='delMod'>X</button>
    </div>
</template>

<script lang='ts'>
import { defineComponent, inject, PropType, ref, toRefs } from 'vue'
import { getIngameText, mainProcess } from '../../../service'

export default defineComponent({
    props: {
        itemType: {
            type: String as PropType<ListType>
        }, 
        item: Object as PropType<any>
    },
    setup(props) {
        const { itemType, item } = toRefs(props)
        const filter = inject('filter')
        const parser = new DOMParser()
        const isDeleted = ref(false)

        return {
            filter,
            parser,
            isDeleted,
            itemType,
            item
        }
    },
    methods: {
        openEditor() {
            local.set('filePath', this.item.path)
            local.set('currentDLC', this.item.dlcName)
            local.set('currentMod', this.item.modId)
            mainProcess.openXMLEditor()
        },
        show() {
            if (!this.filter['value']) {
                return true
            }
            if (this.name.toLowerCase().includes(this.filter['value'].toLowerCase())) {
                return true
            }
            return false
        },
        delMod(event) {
            event.preventDefault()
            delete config.modsList[this.item.modId]
            listPreload.removeDir(listPreload.join(paths.modsTemp, this.item.modId))

            config.modsList.length--
            this.isDeleted = true
        }
    },
    computed: {
        DOM() {
            const data = `<root>${mainProcess.getFileData(this.item.path)}</root>`
            return this.parser.parseFromString(data, 'text/xml')
        },
        imageSource() {
            switch (this.itemType) {
                case 'cargo':
                    return require('../../../../images/icons/cargo_item.png')
                case 'trailers':
                    try {
                        return require(`../../../../images/trailers/${this.item.name}.png`)
                    } catch {
                        return require('../../../../images/icons/trailer_item.png')
                    }
                case 'trucks':
                    try {
                        return require(`../../../../images/trucks/${this.item.name}.jpg`)
                    } catch {
                        const defaultImage = require('../../../../images/icons/truck_item.png')

                        if (this.item.modId && this.DOM.querySelector('GameData > UiDesc')) {
                            const imgName = this.DOM.querySelector('GameData > UiDesc').getAttribute('UiIcon328x458')
                            const truckPath = `../../main/modsTemp/${this.item.modId}/ui/textures/${imgName}.png`
                            if (!listPreload.exists(truckPath)) {
                                return defaultImage
                            } else {
                                return truckPath
                            }
                        } else {
                            return defaultImage
                        }
                    }
            }
        },
        name() {
            let name = this.item.name.prettify()
            if (this.DOM.querySelector('GameData > UiDesc')) {
                const uiName = this.DOM.querySelector('GameData > UiDesc').getAttribute('UiName')
                if (uiName) {
                    name = getIngameText(uiName, this.item.modId) || uiName
                }
            }
            return name
        },
        text() {
            const filter = this.filter['value']
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
})
</script>

<style scoped>
.item {
    transition: all 0.5s ease 0s;
    position: relative;
    width: 250px;
    height: 350px;
    cursor: pointer;
    background: white;
    word-wrap: normal;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 5px;
}

.delete-mod {
    position: absolute;
    top: 4px;
    right: 5px;
    border: none;
    background: none;
    color: white;
}

.delete-mod:hover {
    color: red;
}

.item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.item-text {
    transition: all 0.5s ease 0s;
    width: 100%;
    padding: 5px 0;
    background: black;
    color: white;
    position: absolute;
    top: 0;
    left: 0;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
}

.item:hover {
    filter: brightness(0.8);
}

.item:hover .item-text {
    color: yellow;
}
</style>
