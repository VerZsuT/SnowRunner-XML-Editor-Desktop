<template>
    <div id='app'>
        <header>
            <h2 class='h2'>{{ t.FIRST_STEPS_DESCRIPTION }}</h2>
        </header>

        <div class='steps'>
            <Language />
            <GameFolder :setPath='setPath' />
            <Save :pathToInitial='pathToInitial' />
        </div>
    </div>
</template>

<script lang='ts'>
import '../../../service/menu'
import '../../../bootstrap/bootstrap.bundle.min.js'
import { defineComponent, provide, ref } from 'vue'

import { t } from '../../../service/funcs'

import GameFolder from './GameFolder.vue'
import Language from './Language.vue'
import Save from './Save.vue'

export default defineComponent({
    components: {
        GameFolder,
        Language,
        Save
    },
    setup() {
        const pathToInitial = ref('')
        provide('t', t)

        return {
            t,
            pathToInitial
        }
    },
    methods: {
        setPath(value: string) {
            this.pathToInitial = value
        }
    }
})
</script>

<style>
@import '../../../../styles/main.css';

body {
    text-align: center;
}

input[type='text']:disabled {
    background: white !important;
}

input[type='checkbox'] {
    width: 15px !important;
    margin-left: 5px;
}

label {
    font-weight: bold;
}
</style>

<style scoped> 
header {
    padding-top: 5px;
    margin-bottom: 20px;
}

header h2 {
    color: white;
}
</style>
