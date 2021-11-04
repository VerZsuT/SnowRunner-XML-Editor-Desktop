import { createApp } from 'vue'
import { setHotKey, t, mainProcess } from '../../service'

import App from './components/App.vue'

setHotKey({
    key: 'Backquote'
}, () => {
    mainProcess.openConsole()
})
const invalidMod = mainProcess.invalidMod

createApp(App).mount('#main')

setTimeout(() => {
    if (invalidMod) {
        mainProcess.alertSync(`${t.INVALID_MODS_ALERT_MAIN}: ${invalidMod.name}\n${t[`INVALID_MODS_ALERT_${invalidMod.error}`]}`)
    }
}, 1000)
