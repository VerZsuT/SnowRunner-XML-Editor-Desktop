import {
    funcs
} from '../../../service/renderer.js'

const Language = {
    props: {
        t: Object
    },
    template: `
        <label class='form-label'>
            {{ t.LANGUAGE_MENU_ITEM_LABEL }}
        </label>
        <select class='form-select' :style='style' v-model='lang'>
            <option v-for='lang in allLangs'>
                {{ lang }}
            </option>
        </select><br>
    `,
    data() {
        return {
            allLangs: ['EN', 'RU', 'DE'],
            style: {
                width: '70px',
                margin: '0 auto'
            }
        }
    },
    computed: {
        lang: {
            get() {
                return config.lang
            },
            set(value) {
                config.lang = value
                funcs.reload()
            }
        }
    }
}

export default Language
