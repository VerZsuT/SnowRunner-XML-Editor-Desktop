import '../../bootstrap/bootstrap.bundle.min.js';
import {getText} from '../../service/funcs.js';
import '../../service/menu.js';
import mainProcess from '../../service/mainProcess.js';
import {createApp} from '../../vue/vue.esm-browser.js';
import Category from './components/Category.js';

document.addEventListener('keypress', (event) => {
    if (event.code === 'Backquote') {
        mainProcess.openConsole();
    }
});

const invalidMods = mainProcess.invalidMods;
const App = {
    data() {
        return {
            categories: ['trucks', 'trailers', 'cargo']
        };
    }
}

createApp(App)
    .component('Category', Category)
    .mount('#main');

setTimeout(() => {
    if (invalidMods.length) {
        alert(`${getText('[INVALID_MODS_ALERT1]')}:\n- ${invalidMods.join('\n- ')}\n${getText('[INVALID_MODS_ALERT2]')}`);
    }
}, 1000);
