import { createApp } from 'vue'
import { getText, Translation } from '../../service/funcs'
import mainProcess from '../../service/mainProcess'

import App from './components/App.vue'

settingsPreload.errorHandler = message => mainProcess.alertSync(getText(<keyof Translation>`${message}`.replace('Error: ', '')))

createApp(App).mount('#main')

