import '../../bootstrap/bootstrap.bundle.min.js'
import '../../service/menu.js'
import { createApp } from '../../vue/vue.esm-browser.js'
import Category from './components/Category.js'

const App = {
    data() {
        return {
            categories: ['trucks', 'trailers', 'cargo']
        }
    }
}

createApp(App)
.component('Category', Category)
.mount('#main')
document.title = document.title.replace('{--VERSION--}', `v${config.version}`)
document.querySelector('#main').style.display = 'block'
