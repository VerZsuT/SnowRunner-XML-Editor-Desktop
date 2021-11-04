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

<script lang='ts'>
import { defineComponent, inject } from 'vue'
import { mainProcess } from '../../../service'
import { Translation } from '../../../service/funcs'

export default defineComponent({
    setup() {
        const t = inject<Translation>('t')
        const allLangs = ['EN', 'RU', 'DE']

        return {
            allLangs,
            t
        }
    },
    computed: {
        lang: {
            get() {
                return config.lang
            },
            set(value) {
                config.lang = value
                mainProcess.reload()
            }
        }
    }
})
</script>

<style scoped>
.lang-select {
    width: 70px;
    margin: 0 auto;
}
</style>
