<template>
    <div class='param-input'>
        <div 
            class='openCont'
            :key='i.value'
            v-for='i in getItems()'
        >
            <button
                class='openFile btn btn-secondary btn-sm'
                @click='openEditor(i.value)'
            >
                {{ i.index + 1 }}
                <div class='open-file-button'></div>
            </button>
            <input type="checkbox" class='file-export' v-model="toExport[i.value]" v-show="isExporting">
        </div>
    </div>
</template>

<script lang='ts'>
import { t, mainProcess } from '../../../service'

export default {
    props: {
        item: Object,
        isExporting: Boolean,
        isExport: {
            type: Boolean,
            default: true
        }
    },
    inject: ['currentMod', 'currentDLC', 'fileDOM', 'deps'],
    data() {
        return {
            t: t,
            toExport: this.getExport()
        };
    },
    mounted() {
        const array = []
        for (const item of this.getItems()) {
            array.push({
                name: `${item.value}.xml`,
                isExport: () => this.toExport[item.value],
                getData: () => {
                    return new Promise(resolve => {
                        ipcRenderer.once('bridge-channel', (_, exportedData) => {
                            resolve(exportedData)
                        })

                        this.openEditor(item.value, true)
                    })
                },
                toImport: data => {
                    return new Promise(resolve => {
                        ipcRenderer.once('bridge-channel', (_, _1) => {
                            resolve(null)
                        })

                        this.openEditor(item.value, true, data)
                    })
                }
            })
        }
        this.deps[this.item.fileType] = array
    },
    watch: {
        isExport() {
            this.toExport = this.getExport()
        }
    },
    methods: {
        getExport() {
            const comp = {}
                for (const item of this.getItems()) {
                comp[item.value] = this.isExport
            }
            return comp
        },
        openEditor(fileName, bridge=false, importData=null) {
            const paths = [`${config.paths.classes}\\${this.item.fileType}\\${fileName}.xml`]
            let mainPath = null

            if (this.currentDLC) {
                const dlcPath = `${config.paths.dlc}\\${this.currentDLC}\\classes\\${this.item.fileType}\\${fileName}.xml`
                paths.push(dlcPath)
                local.set('currentDLC', this.currentDLC)
            } else if (this.currentMod) {
                const modPath = `${config.paths.mods}\\${this.currentMod}\\classes\\${this.item.fileType}\\${fileName}.xml`
                paths.push(modPath)
                local.set('currentMod', this.currentMod)
            }

            for (const path of paths) {
                if (editorPreload.existsSync(path)) {
                    mainPath = path
                }
            }

            if (!mainPath) {
                mainPath = editorPreload.findFromDLC(fileName, this.item.fileType)
            }
            local.set('filePath', mainPath)
            if (bridge) {
                local.set('isBridge', 'true')
                if (importData) {
                    local.set('importData', JSON.stringify(importData))
                }
            }
            mainProcess.openXMLEditor(bridge)
        },
        getItems() {
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
</script>

<style scoped>
.openFile {
    margin-right: 30px;
}

.openCont {
    position: relative;
    display: inline-block;
    top: 3px;
}

.file-export {
    position: absolute;
    width: 20px !important;
    margin: 0;
    top: 14px;
    right: 10px;
}
</style>
