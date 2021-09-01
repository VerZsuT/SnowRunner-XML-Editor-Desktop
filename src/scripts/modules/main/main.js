import '../../bootstrap/bootstrap.bundle.min.js'
import {
    getText
} from '../../service/funcs.js'
import '../../service/menu.js'
import {
    props
} from '../../service/renderer.js'
import {
    createApp
} from '../../vue/vue.esm-browser.js'
import Category from './components/Category.js'

const App = {
    data() {
        return {
            categories: ['trucks', 'trailers', 'cargo']
        }
    }
}
const invalidMods = props.invalidMods

createApp(App)
    .component('Category', Category)
    .mount('#main')
document.title = document.title.replace('{--VERSION--}', `v${config.version}`)
document.querySelector('#main').style.display = 'block'

setTimeout(() => {
    if (invalidMods.length) {
        alert(`${getText('[INVALID_MODS_ALERT1]')}:\n- ${invalidMods.join('\n- ')}\n${getText('[INVALID_MODS_ALERT2]')}`)
    }
}, 1000)
