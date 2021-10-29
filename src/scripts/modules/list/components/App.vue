<template>
    <div id="app">
        <Search />
        <List v-if='mods' srcType='mods' />
        <List v-if='dlc' srcType='dlc' />
        <List srcType='main' />
    </div>
</template>

<script lang='ts'>
import '../../../bootstrap/bootstrap.bundle.min.js'
import '../../../service/menu'
import { defineComponent, provide, reactive } from 'vue'

import Search from './Search.vue'
import List from './List.vue'

export default defineComponent({
    components: {
        Search,
        List
    },
    setup() {
        const dlc = config.settings.DLC
        const mods = config.settings.mods
        const filter = reactive({
            value: '',
            set(value: string) {
                this.value = value
            }
        })
        provide('filter', filter)

        return {
            dlc,
            mods,
            filter
        }
    }
})
</script>

<style>
@import '../../../../styles/main.css';
</style>
