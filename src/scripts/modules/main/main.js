import {createApp} from 'vue';
import {getText} from '../../service/funcs.js';
import mainProcess from '../../service/mainProcess.js';

import App from './components/App.vue';

document.addEventListener('keypress', (event) => {
    if (event.code === 'Backquote') {
        mainProcess.call('openConsole');
    }
});
const invalidMod = mainProcess.get('invalidMod');

createApp(App).mount('#main');

setTimeout(() => {
    if (invalidMod) {
        mainProcess.call('alertSync', `${getText('[INVALID_MODS_ALERT_MAIN]')}: ${invalidMod.name}\n${getText(`[INVALID_MODS_ALERT_${invalidMod.error}]`)}`);
    }
}, 1000);
