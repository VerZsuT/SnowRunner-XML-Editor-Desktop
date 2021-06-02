const PSelect = {
    props: {
        item: Object
    },
    inject: ['fileDOM'],
    template: `
        <select
            class='form-select'
            v-model='value'
            :disabled='disabled'
        >
            <option 
                v-for='option in item.selectParams'
                :value='option.value'
                :selected='item.value === option.value'
            >
                {{ option.text }}
            </option>
        </select>
    `,
    data() {
        return {
            defaultValue: this.fileDOM.querySelector(this.item.selector).getAttribute(this.item.name),
            value: this.fileDOM.querySelector(this.item.selector).getAttribute(this.item.name)
        }
    },
    watch: {
        value(newValue, _) {
            if (newValue === '__DefaultSelectValue__') {
                this.fileDOM.querySelector(this.item.selector).setAttribute(this.item.name, this.defaultValue)
            } else {
                this.fileDOM.querySelector(this.item.selector).setAttribute(this.item.name, newValue)
            }
        }
    },
    mounted() {
        if (!this.value) {
            this.value = '__DefaultSelectValue__'
        }
    },
    computed: {
        disabled() {
            if (!this.item.onlyDeveloper) {
                return false
            } else {
                return !config.settings.devMode
            } 
        }
    }
}

export default PSelect
