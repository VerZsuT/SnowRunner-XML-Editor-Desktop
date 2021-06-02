import { getText } from "../../../service/funcs.js"
import { funcs } from "../../../service/renderer.js"

const PFile = {
    props: {
        item: Object
    },
    inject: ['currentMod', 'currentDLC', 'fileDOM'],
    template: `
        <div>
            <button
                v-for='i in items'
                class='openFile btn btn-secondary btn-sm'
                @click='openEditor(i.value)'
            >
                {{ i.index + 1 }}
                <img src='../icons/pencil.svg' style='filter: invert(1);'>
            </button>
        </div>
    `,
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName)
                }
            })
        }
    },
    methods: {
        openEditor(fileName) {
            if (this.currentDLC) {
                local.fileDLCPath = `${config.paths.dlc}\\${this.currentDLC}\\classes\\${this.item.fileType}\\${fileName}.xml`
                local.currentDLC = this.currentDLC
            }
            else if (this.currentMod) {
                local.fileModPath = `${config.paths.mods}\\${this.currentMod}\\classes\\${this.item.fileType}\\${fileName}.xml`
                local.currentMod = this.currentMod
            }
            local.filePath = `${config.paths.classes}\\${this.item.fileType}\\${fileName}.xml`
            
            funcs.openXMLEditor()
        }
    },
    computed: {
        items() {
            const array = this.item.value.split(',').map((value) => value.trim())
            if (this.item.fileType === 'wheels') {
                for (const compatible of this.fileDOM.querySelectorAll('Truck > TruckData > CompatibleWheels')) {
                    const type = compatible.getAttribute('Type')
                    if (array.indexOf(type) === -1) {
                        array.push(type)
                    }
                }
            }
            return array.map((value, index) => ({value, index}))
        }
    }
}

export default PFile
