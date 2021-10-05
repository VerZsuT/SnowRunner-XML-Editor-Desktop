<template>
    <div id="save">
        <button class='btn btn-primary save-button' @click='save'>
            {{ t.SAVE_BUTTON }}
        </button>
    </div>
</template>

<script>
import mainProcess from '../../../service/mainProcess.js';
import {getText} from '../../../service/funcs.js';

export default {
    props: {
        pathToInitial: String
    },
    inject: ['t'],
    methods: {
        save() {
            if (!this.pathToInitial) {
                mainProcess.call('alertSync', getText('[NO_GAME_FOLDER]'));
                return;
            }

            config.paths.initial = this.pathToInitial;
            mainProcess.call('saveInitialSum');
            mainProcess.call('saveBackup', true);
        }
    }
}
</script>

<style scoped>
.save-button {
    margin-top: 20px;
    margin-bottom: 60px;
}
</style>
