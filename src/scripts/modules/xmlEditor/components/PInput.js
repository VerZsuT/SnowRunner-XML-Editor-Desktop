import { getText } from "../../../service/funcs.js"

const PInput = {
    props: {
        item: Object
    },
    inject: ['fileDOM'],
    template: `
        <input 
            v-if='item.type === "number"'
            class='form-control'
            type='number'
            v-model.number.lazy='value'
            :min='min' 
            :max='max'
            :step='step'
            :placeholder='t.BY_DEFAULT'
            :disabled='disabled'
        />
        <input 
            v-else
            class='form-control'
            type='text'
            v-model.lazy='value'
            :placeholder='t.BY_DEFAULT'
            :disabled='disabled'
        />
    `,
    data() {
        return {
            defaultValue: this.fileDOM.querySelector(this.item.selector).getAttribute(this.item.name),
            value: this.fileDOM.querySelector(this.item.selector).getAttribute(this.item.name),
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName)
                }
            })
        }
    },
    watch: {
        value(newVal, _) {
            this.fileDOM.querySelector(this.item.selector).setAttribute(this.item.name, newVal || defaultValue)
        }
    },
    computed: {
        isNumber() {
            return this.item.type === 'number'
        },
        min() {
            if (this.item.min !== '-∞' && !config.settings.disableLimits) {
                return this.item.min || 0
            }
        },
        max() {
            if (this.item.max && !config.settings.disableLimits) {
                return this.item.max
            }
        },
        step() {
            return (this.item.numberType === 'int')? 1 : 0.1
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
