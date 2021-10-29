<template>
    <div id='gameFolder'>
        <label class='form-label'>
            {{ manual? t.INITIAL_LABEL : t.GAME_FOLDER_LABEL }}
        </label><br>
        <input type='text' class='form-control game-folder-input' :title='gameFolder' :value='gameFolder' disabled>
        <button class='btn btn-primary btn-sm' @click='getFolder'>
            {{ t.OPEN_BUTTON }}
        </button><br>
        <label class='form-label' :title='t.AUTO_INITIAL_TITLE'>
            {{ t.MANUAL_INITIAL }}
        </label>
        <input type='checkbox' class='form-check-input' v-model='manual'><br>
    </div>
</template>

<script lang='ts'>
/// <reference path='../declare/preload.d.ts' />

import { Translation } from '../../../service/funcs'
import { defineComponent, inject, ref, watch } from 'vue'

export default defineComponent({
    props: {
        setPath: {
            type: Function,
            required: true
        }
    },
    setup() {
        const t = inject<Translation>('t')
        const manual = ref(false)
        const gameFolder = ref('')

        watch(manual, () => {
            gameFolder.value = ''
        })

        return {
            t,
            manual,
            gameFolder
        }
    },
    methods: {
        getFolder() {
            let data: Folder
            if (this.manual) {
                data = firstStepsPreload.initial
                data.folder = data.initial
            } else {
                data = firstStepsPreload.gameFolder
            }

            if (!data) return

            this.gameFolder = data.folder
            this.setPath(data.initial)
        }
    }
})
</script>

<style scoped>
.game-folder-input {
    width: 150px;
    display: inline-block;
    background-color: white;
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>
