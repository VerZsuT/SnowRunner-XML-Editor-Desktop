import {
    getText
} from "../../../service/funcs.js"

const PInput = {
    props: {
        item: Object
    },
    inject: ['fileDOM', 'getValue'],
    template: `
        <input 
            v-if='item.type === "number"'
            class='form-control'
            type='number'
            v-model.number.lazy='value'
            :disabled='disabled'
        />
        <input 
            v-else
            class='form-control'
            type='text'
            v-model.lazy='value'
            :disabled='disabled'
            :title='defaultValue'
        />
    `,
    data() {
        const value = this.getValue()
        return {
            defaultValue: value,
            value: value,
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName)
                }
            })
        }
    },
    watch: {
        value(newVal, _) {
            if (newVal === '') {
                newVal = this.defaultValue
            }
            newVal = this.limit(newVal)

            if (!this.fileDOM.querySelector(this.item.selector)) {
                const array = this.item.selector.split('>').map(value => value.trim())
                const name = array.pop()
                const rootSelector = array.join(' > ')
                this.fileDOM.querySelector(rootSelector).append(this.fileDOM.createElement(name))
            }
            this.fileDOM.querySelector(this.item.selector).setAttribute(this.item.name, newVal)
            this.value = newVal
        }
    },
    methods: {
        limit(value) {
            if (this.min !== undefined && value < this.min) {
                return this.min
            }
            if (this.max !== undefined && value > this.max) {
                return this.max
            }
            return value
        }
    },
    computed: {
        isNumber() {
            return this.item.type === 'number'
        },
        min() {
            if (this.item.min !== '-∞' && config.settings.limits) {
                return this.item.min || 0
            }
        },
        max() {
            if (this.item.max && config.settings.limits) {
                return this.item.max
            }
        },
        disabled() {
            if (!this.item.onlyDeveloper) {
                return false
            } else {
                return !config.settings.devMode
            }
        }
    }
}

export default PInput
