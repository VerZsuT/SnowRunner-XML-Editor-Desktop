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

<script>
export default {
    props: {
        t: Object,
        pathToInitial: String
    },
    emits: ['update:pathToInitial'],
    data() {
        return {
            manual: true,
            gameFolder: this.pathToInitial
        };
    },
    watch: {
        manual() {
            this.gameFolder = null;
            this.$emit('update:pathToInitial', null);
        }
    },
    methods: {
        getFolder() {
            let data = {};
            if (this.manual) {
                data = preload.initial;
                data.folder = data.initial;
            } else {
                data = preload.gameFolder;
            }

            if (!data) return;

            this.gameFolder = data.folder;
            this.$emit('update:pathToInitial', data.initial);
        }
    }
}
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
