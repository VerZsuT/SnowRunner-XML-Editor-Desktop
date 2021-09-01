import {
    getText
} from "../../../service/funcs.js"
import {
    funcs
} from "../../../service/renderer.js"

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
            const paths = [`${config.paths.classes}\\${this.item.fileType}\\${fileName}.xml`]
            let mainPath = null

            if (this.currentDLC) {
                const dlcPath = `${config.paths.dlc}\\${this.currentDLC}\\classes\\${this.item.fileType}\\${fileName}.xml`
                paths.push(dlcPath)
                local.currentDLC = this.currentDLC
            } else if (this.currentMod) {
                const modPath = `${config.paths.mods}\\${this.currentMod}\\classes\\${this.item.fileType}\\${fileName}.xml`
                paths.push(modPath)
                local.currentMod = this.currentMod
            }

            for (const path of paths) {
                if (preload.existsSync(path)) {
                    mainPath = path
                }
            }

            if (!mainPath) {
                mainPath = preload.findFromDLC(fileName, this.item.fileType)
            }
            local.filePath = mainPath

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
            return array.map((value, index) => ({
                value,
                index
            }))
        }
    }
}

export default PFile
