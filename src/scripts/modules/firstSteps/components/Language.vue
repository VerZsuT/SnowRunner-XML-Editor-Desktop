<template>
    <div id="language">
        <label class='form-label'>
            {{ t.LANGUAGE_MENU_ITEM_LABEL }}
        </label>
        <select class='form-select lang-select' v-model='lang'>
            <option :key='lang' v-for='lang in allLangs'>
                {{ lang }}
            </option>
        </select><br>
    </div>
</template>

<script>
import mainProcess from '../../../service/mainProcess.js';

export default {
    inject: ['t'],
    data() {
        return {
            allLangs: ['EN', 'RU', 'DE']
        };
    },
    computed: {
        lang: {
            get() {
                return config.lang;
            },
            set(value) {
                config.lang = value;
                mainProcess.call('reload');
            }
        }
    }
}
</script>

<style scoped>
.lang-select {
    width: 70px;
    margin: 0 auto;
}
</style>
