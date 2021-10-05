import {createApp} from 'vue';
import {getText} from '../../service/funcs.js';
import mainProcess from '../../service/mainProcess.js';

import App from './components/App.vue';

preload.errorHandler = message => mainProcess.call('alertSync', getText(`${message}`.replace('Error: ', '')));

createApp(App).mount('#main');

