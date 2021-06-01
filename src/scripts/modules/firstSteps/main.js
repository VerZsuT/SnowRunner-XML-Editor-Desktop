import { createApp } from '../../vue/vue.esm-browser.js'
import '../../service/shortMenu.js'
import '../../bootstrap/bootstrap.bundle.min.js'
import { getText } from '../../service/funcs.js'

import GameFolder from './components/GameFolder.js'
import Language from './components/Language.js'
import Save from './components/Save.js'
import Mods from './components/Mods.js'

const App = {
    components: {
        GameFolder,
        Language,
        Save,
        Mods
    },
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName)
                }
            }),
            gameFolder: null,
            pathToInitial: null,
            modsSupport: preload.isModsSupport(),
            enableMods: false
        }
    },
    computed: {
        disableModsCheckbox() {
            return !(this.modsSupport.profile && this.modsSupport.existed)
        }
    }
}

createApp(App).mount('#main')
document.title = document.title.replace('{--VERSION--}', `v${config.version}`)
document.querySelector('#main').style.display = 'block'
