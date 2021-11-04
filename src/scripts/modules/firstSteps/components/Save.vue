<template>
    <div id="save">
        <button class='btn btn-primary save-button' @click='save'>
            {{ t.SAVE_BUTTON }}
        </button>
    </div>
</template>

<script lang='ts'>
import { defineComponent, inject, toRefs } from 'vue'

import { t, mainProcess } from '../../../service'
import { Translation } from '../../../service/funcs'

export default defineComponent({
    props: {
        pathToInitial: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const t = inject<Translation>('t')
        const { pathToInitial } = toRefs(props)

        return {
            t,
            pathToInitial
        }
    },
    methods: {
        save() {
            if (!this.pathToInitial) {
                mainProcess.alertSync(t.NO_GAME_FOLDER)
                return;
            }

            config.paths.initial = this.pathToInitial
            mainProcess.saveInitialSum()
            mainProcess.saveBackup(true)
        }
    }
})
</script>

<style scoped>
.save-button {
    margin-top: 20px;
    margin-bottom: 60px;
}
</style>
