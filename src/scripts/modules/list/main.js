import '../../bootstrap/bootstrap.bundle.min.js';
import '../../service/menu.js';
import {createApp} from '../../vue/vue.esm-browser.js';

import List from './components/List.js';
import ListItem from './components/ListItem.js';
import Search from './components/Search.js';

const App = {
    data() {
        return {
            dlc: config.settings.DLC,
            mods: config.settings.mods,
            filter: {
                value: null,
                set(value) {
                    this.value = value;
                }
            }
        };
    },
    provide() {
        return {
            filter: this.filter
        };
    }
}

createApp(App)
    .component('List', List)
    .component('ListItem', ListItem)
    .component('Search', Search)
    .mount('#main');
