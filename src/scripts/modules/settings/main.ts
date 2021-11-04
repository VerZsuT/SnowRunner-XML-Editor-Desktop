import { createApp } from 'vue'
import { t, mainProcess } from '../../service'
import { Translation } from '../../service/funcs'

import App from './components/App.vue'

settingsPreload.errorHandler = message => mainProcess.alertSync(t[<keyof Translation>`${message}`.replace('Error: ', '')])

createApp(App).mount('#main')

