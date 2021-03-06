import {get, getText} from '../../service/funcs.js';
import mainProcess from '../../service/mainProcess.js';
import {createApp} from '../../vue/vue.esm-browser.js';

const $header = get('#header');

const App = {
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName);
                }
            }),
            version: null
        };
    },
    mounted() {
        ipcRenderer.on('content', (_event, data) => {
            this.version = data;
            $header.innerText += ` v${data}`;
        });
    },
    methods: {
        close() {
            window.close();
        },
        update() {
            mainProcess.update(this.version);
        },
        ignore() {
            config.settings.updates = false;
            window.close();
        }
    }
};

createApp(App).mount('#main');
document.title = document.title.replace('{--VERSION--}', `v${config.version}`);
document.querySelector('#main').style.display = 'block';
