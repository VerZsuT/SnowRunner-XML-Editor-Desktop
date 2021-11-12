<template>
    <div class='param-input'>
        <select
            class='form-select'
            v-model='value'
            :disabled='disabled'
        >
            <option 
                :key='option.value'
                v-for='option in item.selectParams'
                :value='option.value'
                :selected='item.value === option.value'
            >
                {{ option.text }}
            </option>
        </select>
        <input type="checkbox" class='input-export' v-model="isExport" v-show="isExporting">    
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        item: Object,
        isExport: {
            type: Boolean,
            default: true
        },
        isExporting: Boolean
    },
    inject: ['fileDOM', 'filePath', 'getValue', 'setValue', 'ETR', 'params'],
    data() {
        return {
            value: this.getValue()
        }
    },
    mounted() {
        this.params.push({
            forExport: () => {
                if (this.isExport) {
                    return {
                        selector: this.item.selector, 
                        name: this.item.name, 
                        value: this.value
                    }
                }
            },
            forImport: {
                setValue: value => {
                    if (this.value !== value) {
                        this.value = value;
                    }
                },
                selector: this.item.selector,
                name: this.item.name
            }
        })
    },
    watch: {
        value(newValue, _) {
            if (!this.fileDOM.querySelector(this.item.selector)) {
                const array = this.item.selector.split('>').map(value => value.trim())
                const name = array.pop()
                const rootSelector = array.join(' > ')
                const element = this.fileDOM.createElement(name)
                this.fileDOM.querySelector(rootSelector).append(element)

                if (!this.ETR[this.filePath]) {
                    this.ETR[this.filePath] = []
                }
                if (!this.ETR[this.filePath].includes(this.item.selector)) {
                    this.ETR[this.filePath].push(this.item.selector)
                }
            }

            this.setValue(this.item.selector, this.item.name, newValue)
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
})
</script>
