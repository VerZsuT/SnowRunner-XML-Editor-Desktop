<template>
    <div id="a">
        <label class="form-label" for="language-select">{{ t.LANGUAGE_MENU_ITEM_LABEL }}</label>
        <select id="language-select" class="form-select" v-model='lang'>
            <option v-for='lang in allLangs' :key='lang' :lang='lang'>
                {{ lang }}
            </option>
        </select><br>

        <game-folder :t='t' v-model:path-to-initial='pathToInitial'></game-folder>

        <input type="checkbox" id="ignore-updates" class="form-check-input" v-model='updates'>
        <label for="ignore-updates" class="form-check-label">{{ t.UPDATES_LABEL }}</label><br>

        <input type="checkbox" id="disable-dlc" class="form-check-input" v-model='DLC'>
        <label for="disable-dlc" class="form-check-label">{{ t.DLC_LABEL }}</label><br>

        <input type="checkbox" id="disable-mods" class="form-check-input" v-model='mods'>
        <label for="disable-mods" class="form-check-label">{{ t.MODS_LABEL }}</label><br>

        <input type="checkbox" id="hide-reset-button" class="form-check-input" v-model='resetButton'>
        <label for="hide-reset-button" class="form-check-label">{{ t.RESET_BUTTON_LABEL }}</label><br>

        <button class="btn btn-primary" id="save-to-config" @click='save'>{{ t.SAVE_BUTTON }}</button>

        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 5">
            <div id="live-toast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-body"></div>
            </div>
        </div>
    </div>
</template>

<script>
import '../../../bootstrap/bootstrap.bundle.min.js';

import mainProcess from '../../../service/mainProcess.js';
import {getText} from '../../../service/funcs.js';

import GameFolder from './GameFolder.vue';

export default {
    components: {
        GameFolder
    },
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName);
                }
            }),
            saveBackup: false,
            allLangs: ['RU', 'EN', 'DE'],
            pathToInitial: config.paths.initial,
            gameFolder: config.paths.initial,
            lang: config.lang,
            devMode: config.settings.devMode,
            updates: config.settings.updates,
            limits: config.settings.limits,
            DLC: config.settings.DLC,
            mods: config.settings.mods,
            resetButton: config.settings.resetButton
        }
    },
    watch: {
        pathToInitial() {
            this.saveBackup = true;
        }
    },
    methods: {
        save() {
            if (this.saveBackup) {
                config.paths.initial = this.pathToInitial;
            }
            config.lang = this.lang;
            config.settings = {
                devMode: this.devMode,
                updates: this.updates,
                limits: this.limits,
                DLC: this.DLC,
                mods: this.mods,
                resetButton: this.resetButton
            };

            if (this.saveBackup) {
                mainProcess.call('saveBackup', true);
            } else {
                mainProcess.call('reload');
            }
        }
    }
}
</script>

<style>
@import '../../../../styles/main.css';

body {
    text-align: center;
}

header {
    padding-top: 5px;
    margin-bottom: 20px;
}

header h2 {
    color: white;
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

body {
    background-color: #fff;
}

#main {
    width: 380px;
    margin: 0 auto;
    display: block;
    text-align: left;
    padding-left: 40px;
    box-sizing: border-box;
}

#language-select {
    margin: 0;
}

#game-folder-input {
    margin-bottom: 20px;
}

#save-to-config {
    position: relative;
    margin: 0 auto;
    display: block;
    margin-top: 20px;
    left: -30px;
    z-index: 6;
}

input[type="checkbox"] {
    width: 15px !important;
    margin-right: 5px;
}
</style>
