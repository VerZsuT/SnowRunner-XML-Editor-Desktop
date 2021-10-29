<template>
    <div id="gameFolder">
        <label class='form-label'>
            {{ manual? t.INITIAL_LABEL : t.GAME_FOLDER_LABEL }}
        </label><br>
        <input type='text' class='form-control game-folder-input' :title='gameFolder' :value='gameFolder' disabled>
        <button class='btn btn-secondary btn-sm' @click='getFolder'>
            {{ t.OPEN_BUTTON }}
        </button><br>
        <label class='form-label'>
            {{ t.MANUAL_INITIAL }}
        </label>
        <input type='checkbox' class='form-check-input manual-initial' v-model='manual'><br>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, toRefs, watch } from 'vue'

export default defineComponent({
    props: {
        t: Object,
        pathToInitial: String
    },
    emits: ['update:pathToInitial'],
    setup(props, { emit }) {
        const { t, pathToInitial } = toRefs(props)
        const manual = ref(true)
        const gameFolder = ref(pathToInitial.value)

        watch(manual, () => {
            gameFolder.value = ''
            emit('update:pathToInitial', null)
        })

        return {
            manual,
            gameFolder,
            t,
            pathToInitial
        }
    },
    methods: {
        getFolder() {
            let data: IFolder = {}
            if (this.manual) {
                data = preload.initial
                data.folder = data.initial
            } else {
                data = preload.gameFolder
            }

            if (!data) return

            this.gameFolder = data.folder
            this.$emit('update:pathToInitial', data.initial)
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

.manual-initial {
    width: 15px !important;
    margin-left: 5px;
}
</style>
