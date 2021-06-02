import { getText } from "../../../service/funcs.js"
import { funcs } from "../../../service/renderer.js"

const PFile = {
    props: {
        item: Object
    },
    inject: ['currentMod', 'currentDLC'],
    template: `
        <div>
            <button
                v-for='fileName in items'
                class='openFile btn btn-secondary btn-sm'
                @click='openEditor(fileName)'
            >
                {{ t.EDIT_FILE_BUTTON }}
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
            return this.item.value.split(',')
        }
    }
}

export default PFile
