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

<script>
export default {
    props: {
        setPath: Function
    },
    inject: ['t'],
    data() {
        return {
            manual: false,
            gameFolder: ''
        };
    },
    watch: {
        manual() {
            this.gameFolder = '';
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
            this.setPath(data.initial);
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
</style>
