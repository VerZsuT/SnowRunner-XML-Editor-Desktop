import { createApp } from 'vue'
import { t, mainProcess } from '../../service'
import App from './components/App.vue'

settingsPreload.errorHandler = message => mainProcess.alertSync(t[`${message}`.replace('Error: ', '')])

createApp(App).mount('#main')

