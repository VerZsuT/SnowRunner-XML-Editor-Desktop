<template>
    <div id="app">
        <search></search>
        <list v-if='mods' src-type='mods'></list>
        <list v-if='dlc' src-type='dlc'></list>
        <list src-type='main'></list>
    </div>
</template>

<script>
import '../../../bootstrap/bootstrap.bundle.min.js';
import '../../../service/menu.js';

import Search from './Search.vue';
import List from './List.vue';

export default {
    components: {
        Search,
        List
    },
    data() {
        return {
            dlc: config.settings.DLC,
            mods: config.settings.mods,
            filter: {
                value: '',
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
</script>

<style>
@import '../../../../styles/main.css';
</style>
