<template>
    <div id='app'>
        <header>
            <h2 class='h2'>{{ t.FIRST_STEPS_DESCRIPTION }}</h2>
        </header>

        <div class='steps'>
            <language></language>
            <game-folder :setPath='setPath'></game-folder>
            <save :pathToInitial='pathToInitial'></save>
        </div>
    </div>
</template>

<script>
import '../../../service/menu.js';
import '../../../bootstrap/bootstrap.bundle.min.js';

import {getText} from '../../../service/funcs.js';

import GameFolder from './GameFolder.vue';
import Language from './Language.vue';
import Save from './Save.vue';

export default {
    components: {
        GameFolder,
        Language,
        Save
    },
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(String(propName));
                }
            }),
            pathToInitial: null
        }
    },
    provide() {
        return {
            t: this.t
        }
    },
    methods: {
        setPath(value) {
            this.pathToInitial = value;
        }
    }
}
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
