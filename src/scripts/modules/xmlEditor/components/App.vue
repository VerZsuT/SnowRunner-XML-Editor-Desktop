<template>
    <section id="work-zone">
        <div id="editor">
            <Search />
            <h2 id="title" class="title" ref='title'>{{ title }}</h2>
            <Params :isExporting='isExporting' />
            <button class="btn btn-primary" id="save-params" @click='save' :title="t.SAVE_BUTTON"></button>
            <button class="btn btn-primary" id="back" @click='back' :title="t.CLOSE"></button>
            <button class="btn btn-primary" id="reset" @click='reset' v-show='ADV[filePath] || ETR[filePath]' :title="t.RESET_MENU_ITEM_LABEL"></button>
            <button class="btn btn-primary" id="export" @click='exportFile' :title="t.EXPORT"></button>
            <button class="btn btn-primary" id="import" @click='importFile' :title="t.IMPORT"></button>
        </div>
    </section>
</template>

<script lang='ts'>
/// <reference path='../types.d.ts' />

import '../../../bootstrap/bootstrap.bundle.min.js'
import '../../../service/menu'

import { prettify, getIngameText, getText, t, Translation } from '../../../service/funcs'
import mainProcess from '../../../service/mainProcess'

import Search from './Search.vue'
import Params from './Params.vue'
import { defineComponent } from '@vue/runtime-core'

const EXPORT_FILE_VERSION = '1.0'

export default defineComponent({
    deps: {},
    components: {
        Search,
        Params
    },
    data() {
        let importData = local.pop('importData')
        if (importData) importData = JSON.parse(importData)

        return {
            ADV: JSON.parse(JSON.stringify(config.ADV)),
            ETR: JSON.parse(JSON.stringify(config.ETR)),
            filePath: local.get('filePath'),
            fileDOM: getDOM(),
            isBridge: local.pop('isBridge') === 'true',
            importData: importData,
            currentMod: local.pop('currentMod'),
            filter: {
                value: null,
                set(value: string) {
                    this.value = value
                }
            },
            params: [],
            deps: {},
            t: t,
            isExporting: false
        };
    },
    provide() {
        return {
            currentDLC: local.pop('currentDLC'),
            currentMod: this.currentMod,
            fileDOM: this.fileDOM,
            filter: this.filter,
            filePath: this.filePath,
            templates: this.fileDOM.querySelector('_templates'),
            globalTemplates: getGlobalTemplates(),
            ADV: this.ADV,
            ETR: this.ETR,
            params: this.params,
            deps: this.deps
        };
    },
    mounted() {
        if (this.isBridge) {
            if (!this.importData) {
                this.exportFile();
            } else {
                this.importFile();
            }
        }
    },
    computed: {
        title() {
            if (this.fileDOM.querySelectorAll('GameData UiDesc').length === 1) {
                const text = this.fileDOM.querySelector('GameData UiDesc').getAttribute('UiName');
                return getIngameText(text, this.currentMod) || text;
            }

            if (this.filePath.split('/').length !== 1) {
                let a = this.filePath.split('/');
                return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase();
            } else {
                let a = this.filePath.split('\\');
                return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase();
            }
        }
    },
    methods: {
        importFile() {
            const currentFileName = editorPreload.basename(this.filePath)
            let data;
            if (!this.importData) {
                const filePath = mainProcess.openEPFDialog()
                if (!filePath) {
                    mainProcess.alertSync(getText('PARAMS_FILE_NOT_FOUND'))
                    return;
                }
                data = JSON.parse(editorPreload.readFile(filePath).toString())
            } else {
                data = {fileName: currentFileName, data: this.importData, version: EXPORT_FILE_VERSION}
            }

            const next1 = (item, fromArray=false) => {
                if (currentFileName === item.fileName && !item.version) {
                    return this.legacyImport(item, fromArray)
                }

                if (currentFileName !== item.fileName) {
                    const fonded = this.findIn(currentFileName, item)
                    if (!fonded) {
                        if (!fromArray) {
                            mainProcess.alertSync(getText('BREAK_IMPORT_INVALID_NAME').replace('%file', currentFileName))
                        }
                        return false
                    } else {
                        item = {data: fonded}
                    }
                }

                for (const selector in item.data) {
                    for (const attribute in item.data[selector]) {
                        for (const obj of this.params) {
                            const forImport = obj.forImport
                            if (forImport.selector === selector && forImport.name === attribute) {
                                forImport.setValue(item.data[selector][attribute])
                            }
                        }
                    }
                }

                const next2 = () => {
                    if (!this.importData) {
                        mainProcess.alertSync(getText('WAS_IMPORTED'))
                        return true
                    } else {
                        this.save(false, false).then(() => {
                            ipcRenderer.send('bridge-channel', 'true')
                            window.close()
                        })
                    }
                }
                
                if (item.deps) {
                    let count = 1
                    let fullCount = 0
                    for (const depName in item.deps) {
                        if (!this.deps[depName]) continue
                        for (const fileName in item.deps[depName]) {
                            for (const dep of this.deps[depName]) {
                                if (dep.name !== fileName) continue
                                fullCount++
                            }
                        }
                    }
                    if (fullCount !== 0) {
                        this.$refs.title.innerText = `${getText('IN_PROGRESS')} (${count}/${fullCount})`;
        
                        (async () => {
                            for (const depName in item.deps) {
                                if (!this.deps[depName]) continue
                                for (const fileName in item.deps[depName]) {
                                    for (const dep of this.deps[depName]) {
                                        if (dep.name !== fileName) continue
                                        await dep.toImport(item.deps[depName][fileName])
                                        this.$refs.title.innerText = `${getText('IN_PROGRESS')} (${++count}/${fullCount})`
                                    }
                                }
                            }
                            this.$refs.title.innerText = this.title
                        })().then(next2)
                    }
                } else {
                    next2()
                }
            }

            if (data instanceof Array) {
                let imported = false
                
                for (const item of data) {
                    const fonded = this.findIn(currentFileName, item)
                    if (item.fileName === currentFileName || fonded) {
                        next1(item, true)
                        imported = true
                    }
                }

                if (!imported) {
                    mainProcess.alertSync(getText('BREAK_IMPORT_INVALID_NAME').replace('%file', currentFileName))
                }
            } else {
                next1(data)
            }
        },
        legacyImport(data, fromArray=false) {
            if (editorPreload.basename(this.filePath) !== data.fileName) {
                if (!fromArray) {
                    mainProcess.alertSync(getText('BREAK_IMPORT_INVALID_NAME'))
                }
                return false
            }
            delete data.fileName
            for (const selector in data) {
                for (const attribute in data[selector]) {
                    for (const obj of this.params) {
                        const forImport = obj.forImport
                        if (forImport.selector === selector && forImport.name === attribute) {
                            forImport.setValue(data[selector][attribute])
                        }
                    }
                }
            }
            mainProcess.alertSync(getText('WAS_IMPORTED'))
            return true
        },
        exportFile() {
            if (!this.isExporting && !this.isBridge) {
                this.isExporting = true
                return
            }

            const out = {
                fileName: null,
                data: null,
                version: null,
                deps: null
            }
            if (!this.isBridge) {
                out.fileName = editorPreload.basename(this.filePath)
                out.data = {}
                out.version = EXPORT_FILE_VERSION
            } else {
                delete out.data
            }
            for (const obj of this.params) {
                const expObj = obj.forExport()
                if (!expObj) continue

                if (this.isBridge) {
                    if (!out[expObj.selector]) out[expObj.selector] = {}
                    out[expObj.selector][expObj.name] = expObj.value
                } else {
                    if (!out.data[expObj.selector]) out.data[expObj.selector] = {}
                    out.data[expObj.selector][expObj.name] = expObj.value
                }
            }

            let pathToSave = ''
            if (!this.isBridge) {
                pathToSave = mainProcess.openSaveDialog(editorPreload.basename(this.filePath, '.xml'))
                if (!pathToSave) {
                    mainProcess.alertSync(getText('PATH_TO_SAVE_NOT_FOUND'))
                    return
                }
            }
            this.getDepsData().then(data => {
                if (data) out.deps = data
                if (!this.isBridge) {
                    editorPreload.saveFile(pathToSave, JSON.stringify(out, null, '\t'))
                    mainProcess.alertSync(getText('WAS_EXPORTED'))
                    this.isExporting = false
                } else {
                    ipcRenderer.send('bridge-channel', out)
                    window.close()
                }
            });
        },
        findIn(name, object) {
            if (!object.deps) return false

            for (const depName in object.deps) {
                if (object.deps[depName][name]) return object.deps[depName][name]
            }
            return false
        },
        getDepsData() {
            return new Promise(async (resolve) => {
                const fullCount = this.calcCount()
                let count = 1
                let data = null

                this.$refs.title.innerText = `${getText('IN_PROGRESS')} (${count}/${fullCount})`
                for (const depName in this.deps) {
                    if (!data) data = {}
                    const depObj = data[depName] = {}

                    for (const dep of this.deps[depName]) {
                        if (!dep.isExport()) continue
                        depObj[dep.name] = await dep.getData()
                        this.$refs.title.innerText = `${getText('IN_PROGRESS')} (${++count}/${fullCount})`
                    }
                }
                this.$refs.title.innerText = this.title
                resolve(data)
            })
        },
        calcCount() {
            let count = 0
            for (const depName in this.deps) {
                for (const dep of this.deps[depName]) {
                    if (dep.isExport()) count++
                }
            }
            return count
        },
        save(closeAfter=true, saveToOriginal=true) {
            return new Promise(resolve => {
                this.$refs.title.innerText = getText('SAVING_MESSAGE')
                setTimeout(() => {
                    const serializer = new XMLSerializer()
                    const copyrightText = `<!--\n\tEdited by: SnowRunner XML Editor Desktop\n\tVersion: v${config.version}\n\tAuthor: VerZsuT\n\tSite: https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/\n-->\n`
        
                    for (const item of this.fileDOM.querySelectorAll('[SXMLE_ID]')) {
                        item.removeAttribute('SXMLE_ID')
                    }
        
                    const xmlString = `${copyrightText}${serializer.serializeToString(this.fileDOM).replace('<root>', '').replace('</root>', '')}`
                    mainProcess.setFileData(this.filePath, xmlString)
                    if (saveToOriginal) {
                        mainProcess.saveToOriginal(this.currentMod)
                    }
        
                    const tempADV = JSON.parse(JSON.stringify(config.ADV))
                    if (this.ADV[this.filePath]) {
                        tempADV[this.filePath] = JSON.parse(JSON.stringify(this.ADV[this.filePath]))
                    } else if (tempADV[this.filePath]) {
                        delete tempADV[this.filePath]
                    }
                    config.ADV = tempADV
        
                    const tempETR = JSON.parse(JSON.stringify(config.ETR))
                    if (this.ETR[this.filePath]) {
                        tempETR[this.filePath] = JSON.parse(JSON.stringify(this.ETR[this.filePath]))
                    } else if (tempETR[this.filePath]) {
                        delete tempETR[this.filePath]
                    }
                    config.ETR = tempETR
                    
                    if (closeAfter) {
                        window.close()
                    }
                    resolve(null)
                }, 100)
            })
        },
        back() {
            window.close()
        },
        reset() {
            if (!mainProcess.confirm(getText('RESET_CONFIRM_MESSAGE'))) {
                return
            }
            
            const itemsToReset = this.ADV[this.filePath]
            if (itemsToReset) {
                for (const selector in itemsToReset) {
                    const item = this.fileDOM.querySelector(selector)
                    const ADV = itemsToReset[selector]
    
                    for (const attrName in ADV) {
                        const value = ADV[attrName]
    
                        if (value === 'ADV_NULL') {
                            item.removeAttribute(attrName)
                        } else {
                            item.setAttribute(attrName, value)
                        }
                    }
                }
                delete this.ADV[this.filePath]
            }

            const itemsToDelete = this.ETR[this.filePath]
            if (itemsToDelete) {
                for (const selector in itemsToDelete) {
                    const item = this.fileDOM.querySelector(selector)
                    item.remove()
                }
                delete this.ETR[this.filePath]
            }

            mainProcess.alertSync(getText('FILE_IS_RESETED'));
            (document.querySelector('#save-params') as HTMLButtonElement).click()
        }
    }
})

function getGlobalTemplates() {
    const filePath = editorPreload.join(editorPreload.paths.mainTemp, '[media]', '_templates', 'trucks.xml')
    const fileData = mainProcess.getFileData(filePath)

    return new DOMParser().parseFromString(fileData, 'text/xml')
}

function getDOM() {
    const filePath = local.pop('filePath')
    const fileData = mainProcess.getFileData(filePath)
    if (!fileData) return

    const parser = new DOMParser()
    const dom = parser.parseFromString(`<root>${fileData}</root>`, 'text/xml')
    if (dom.querySelector('parsererror')) {
        const error = document.querySelector('#error') as HTMLDivElement
        error.innerText = getText(<keyof Translation> error.innerText)
        error.style.display = 'block'
        throw new Error('[RECOGNIZE_ERROR]')
    }

    dom.querySelector('root').childNodes.forEach((child) => {
        if (child.nodeType === 8) {
            child.remove()
        }
    })

    if (dom.querySelector('root').childNodes[0].nodeValue === '\n') {
        dom.querySelector('root').childNodes[0].remove()
    }
    return dom
}
</script>

<style>
@import '../../../../styles/main.css';
</style>
