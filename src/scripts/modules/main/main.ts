import { createApp } from 'vue'
import { getText } from '../../service/funcs'
import mainProcess from '../../service/mainProcess'

import App from './components/App.vue'

document.addEventListener('keypress', (event) => {
    if (event.code === 'Backquote') {
        mainProcess.openConsole()
    }
});
const invalidMod = mainProcess.invalidMod

createApp(App).mount('#main')

setTimeout(() => {
    if (invalidMod) {
        mainProcess.alertSync(`${getText('INVALID_MODS_ALERT_MAIN')}: ${invalidMod.name}\n${getText(`INVALID_MODS_ALERT_${invalidMod.error}`)}`)
    }
}, 1000)
