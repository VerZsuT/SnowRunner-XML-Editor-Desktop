<template>
    <div class='search'>
        <label for='search' class='form-label'>{{ t.SEARCH }}:</label>
        <input type='text' id='search' class='form-control' v-model='value'>
    </div>
</template>

<script>
import {getText} from '../../../service/funcs.js';

export default {
    inject: ['filter'],
    data() {
        return {
            value: this.filter['value'],
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(String(propName));
                }
            })
        };
    },
    watch: {
        value() {
            this.filter['set'](this.value);
        }
    }
}
</script>

<style scoped>
div.search {
    position: fixed;
    text-align: center;
    top: 0;
    background: none;
    z-index: 2;
    width: 300px;
    left: 50%;
    margin-left: -150px;
}

div.search>label[for='search'] {
    font-size: 0.7em;
    position: relative;
    bottom: 1.5px;
}

#search {
    display: inline-block;
    height: 24px;
    margin-left: 10px;
    font-size: 0.9em;
}

#search:focus {
    outline: 0 !important;
    outline-color: transparent !important;
    outline-width: 0 !important;
    outline-style: none !important;
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0) !important;
}
</style>
