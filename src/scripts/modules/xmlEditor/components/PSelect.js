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
            defaultValue: this.item.value,
            value: this.item.value
        }
    },
    watch: {
        value(newValue, _) {
            if (!this.fileDOM.querySelector(this.item.selector)) {
                const array = this.item.selector.split('>').map(value => value.trim())
                const name = array.pop()
                const rootSelector = array.join(' > ')
                this.fileDOM.querySelector(rootSelector).append(this.fileDOM.createElement(name))
            }

            if (newValue === '__DefaultSelectValue__') {
                this.fileDOM.querySelector(this.item.selector).setAttribute(this.item.name, this.defaultValue)
            } else {
                this.fileDOM.querySelector(this.item.selector).setAttribute(this.item.name, newValue)
            }
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
