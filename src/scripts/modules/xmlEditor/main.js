import '../../bootstrap/bootstrap.bundle.min.js'
import '../../service/menu.js'
import { createApp } from '../../vue/vue.esm-browser.js'

import { prettify, getIngameText } from '../../service/funcs.js'
import { funcs } from '../../service/renderer.js'
import Params from './components/Params.js'
import Param from './components/Param.js'
import PFile from './components/PFile.js'
import PInput from './components/PInput.js'
import PSelect from './components/PSelect.js'
import PCoords from './components/PCoords.js'
import Group from './components/Group.js'

const App = {
    data() {
        return {
            filePath: local.filePath,
            fileDOM: getDOM(),
            currentMod: local.pop('currentMod'),
        }
    },
    provide() {
        return {
            currentDLC: local.pop('currentDLC'),
            currentMod: this.currentMod,        
            fileDOM: this.fileDOM
        }
    },
    computed: {
        title() {
            if (this.fileDOM.querySelectorAll('GameData UiDesc').length === 1) {
                const text = this.fileDOM.querySelector('GameData UiDesc').getAttribute('UiName')
                return getIngameText(text, this.currentMod) || text
            }

            if (this.filePath.split('/').length !== 1) {
                let a = this.filePath.split('/')
                return prettify(a[a.length-1].replace('.xml', '')).toUpperCase()
            }
            else {
                let a = this.filePath.split('\\')
                return prettify(a[a.length-1].replace('.xml', '')).toUpperCase()
            }
        }
    },
    methods: {
        save() {
            const serializer = new XMLSerializer()
            const copyrightText = `<!--\n\tEdited by: SnowRunner XML Editor Desktop\n\tVersion: v${config.version}\n\tAuthor: VerZsuT\n\tSite: https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/\n-->\n`

            for (const item of this.fileDOM.querySelectorAll('[SXMLE_ID]')) {
                item.removeAttribute('SXMLE_ID')
            }

            const xmlString = `${config.settings.disableEditorLabel? '' : copyrightText}${serializer.serializeToString(this.fileDOM).replace('<root>', '').replace('</root>', '')}`
            funcs.setFileData(this.filePath, xmlString)
            funcs.saveToOriginal(this.currentMod)
            window.close()
        },
        back() {
            window.close()
        }
    }
}

function getDOM() {
    const filePath = local.pop('filePath')
    const resFilePath = local.pop('fileDLCPath') || local.pop('fileModPath')
    const fileData = funcs.getFileData(filePath, resFilePath)
    if (!fileData) return

    const parser = new DOMParser()
    const dom = parser.parseFromString(`<root>${fileData}</root>`, 'text/xml')

    for (const child of dom.querySelector('root').childNodes) {
        if (child.nodeType === 8) {
            child.remove()
        }
    }
    if (dom.querySelector('root').childNodes[0].nodeValue === '\n') {
        dom.querySelector('root').childNodes[0].remove()
    }

    return dom
}

createApp(App)
.component('Params', Params)
.component('PParam', Param)
.component('PCoords', PCoords)
.component('PFile', PFile)
.component('PInput', PInput)
.component('PSelect', PSelect)
.component('PGroup', Group)
.mount('#main')

document.title = document.title.replace('{--VERSION--}', `v${config.version}`)
document.querySelector('#main').style.display = 'block'