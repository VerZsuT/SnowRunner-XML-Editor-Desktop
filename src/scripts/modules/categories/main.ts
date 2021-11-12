import { createApp } from 'vue'
import { setHotKey, t, mainProcess } from '../../service'

import App from './components/App.vue'

setHotKey({
    key: 'Backquote'
}, () => {
    mainProcess.openConsole()
})
const invalidMods = mainProcess.invalidMods

createApp(App).mount('#main')

setTimeout(() => {
    if (invalidMods) {
        mainProcess.alertSync(`${t.INVALID_MODS_ALERT_MAIN}: ${invalidMods.name}\n${t[`INVALID_MODS_ALERT_${invalidMods.error}`]}`)
    }
}, 1000)
