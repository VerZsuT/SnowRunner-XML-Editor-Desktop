import '../../bootstrap/bootstrap.bundle.min.js'

import { funcs } from '../../service/renderer.js'
import { getText } from '../../service/funcs.js'
import { createApp } from '../../vue/vue.esm-browser.js'
import toast from './toast.js'
import GameFolder from './components/GameFolder.js'

const App = {
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName)
                }
            }),
            saveBackup: false,
            allLangs: ['RU', 'EN', 'DE'],
            pathToInitial: config.paths.initial,
            gameFolder: config.paths.initial,
            lang: config.lang,
            devMode: config.settings.devMode,
            updates: config.settings.updates,
            limits: config.settings.limits,
            DLC: config.settings.DLC,
            mods: config.settings.mods,
            resetButton: config.settings.resetButton
        }
    },
    watch: {
        pathToInitial() {
            this.saveBackup = true
        }
    },
    methods: {
        save() {
            if (this.saveBackup) {
                config.paths.initial = this.pathToInitial
            }
            config.lang = this.lang
            config.settings = {
                devMode: this.devMode,
                updates: this.updates,
                limits: this.limits,
                DLC: this.DLC,
                mods: this.mods,
                resetButton: this.resetButton
            }
        
            if (this.saveBackup) {
                funcs.saveBackup(true)
            }
            else {
                funcs.reload()
            }
        }
    }
}

preload.errorHandler = message => toast(getText(`${message}`.replace('Error: ', '')))

createApp(App)
.component('GameFolder', GameFolder)
.mount('#main')
document.title = document.title.replace('{--VERSION--}', `v${config.version}`)
document.querySelector('#main').style.display = 'block'
