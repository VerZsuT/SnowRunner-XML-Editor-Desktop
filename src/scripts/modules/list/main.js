import '../../bootstrap/bootstrap.bundle.min.js'
import '../../service/menu.js'
import { createApp } from '../../vue/vue.esm-browser.js'

import List from './components/List.js'
import ListItem from './components/ListItem.js'

const App = {
    data() {
        return {
            dlcDisabled: config.settings.disableDLC,
            modsDisabled: config.settings.disableMods
        }
    }
}

createApp(App)
.component('List', List)
.component('ListItem', ListItem)
.mount('#main')
document.title = document.title.replace('{--VERSION--}', `v${config.version}`)
document.querySelector('#main').style.display = 'block'
