<template>
    <div id="app">
        <h2 id="header">{{ `${t.ALLOW_NEW_VERSION_AUTO} (${version})` }}</h2>
        <div id="buttons">
            <button id="update" class="btn btn-primary" @click='update'>{{ t.UPDATE }}</button>
            <button id="ignore" class="btn btn-danger" @click='ignore'>{{ t.IGNORE }}</button>
            <button id="close" class="btn btn-secondary" @click='close'>{{ t.CLOSE }}</button>
        </div>
    </div>
</template>

<script>
import mainProcess from '../../../service/mainProcess.js';
import {getText, get} from '../../../service/funcs.js'

const $header = get('#header');

export default {
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName);
                }
            }),
            version: null
        };
    },
    mounted() {
        ipcRenderer.on('content', (_event, data) => {
            this.version = data;
            $header.innerText += ` v${data}`;
        });
    },
    methods: {
        close() {
            window.close();
        },
        update() {
            mainProcess.call('update', this.version);
        },
        ignore() {
            config.settings.updates = false;
            window.close();
        }
    }
}
</script>

<style>
@import '../../../../styles/main.css';

body {
    background: #fff;
}

#main {
    position: relative;
    width: 300px;
    height: 150px;
    margin: 0 auto;
    padding: 10px;
    box-sizing: border-box;
}

#header {
    margin-top: 0;
    text-align: center;
}

#buttons {
    display: flex;
    width: 100%;
    position: absolute;
    bottom: 5px;
    justify-content: center;
}

button {
    margin-right: 20px;
}
</style>
