import {createApp} from '../../vue/vue.esm-browser.js';
import '../../bootstrap/bootstrap.bundle.min.js';

import {getText} from '../../service/funcs.js';
import '../../service/menu.js';
import GameFolder from './components/GameFolder.js';
import Language from './components/Language.js';
import Save from './components/Save.js';

const App = {
    components: {
        GameFolder,
        Language,
        Save
    },
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName);
                }
            }),
            gameFolder: null,
            pathToInitial: null
        }
    }
}

createApp(App).mount('#main');
