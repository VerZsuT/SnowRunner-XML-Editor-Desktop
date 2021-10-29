<template>
    <div class='param-input'>
        <span>X: </span><input :step='item.step' class='x-input form-control inline-block' type='number' v-model='x' :disabled='disabled'>
        <span>Y: </span><input :step='item.step' class='y-input form-control inline-block' type='number' v-model='y' :disabled='disabled'>
        <span>Z: </span><input :step='item.step' class='z-input form-control inline-block' type='number' v-model='z' :disabled='disabled'>
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
    inject: ['fileDOM', 'filePath', 'ETR', 'getValue', 'setValue', 'params'],
    data() {
        return this.parseCoords(this.getValue())
    },
    mounted() {
        this.params.push({
            forExport: () => {
                if (this.isExport) {
                    return {
                        selector: this.item.selector, 
                        name: this.item.name, 
                        value: `(${this.x}; ${this.y}; ${this.z})`
                    }
                }
            },
            forImport: {
                setValue: value => {
                    const thisValue = `(${this.x}; ${this.y}; ${this.z})`;
                    if (thisValue !== value) {
                        const newCoords = this.parseCoords(value)
                        this.x = newCoords.x
                        this.y = newCoords.y
                        this.z = newCoords.z
                    }
                },
                selector: this.item.selector,
                name: this.item.name
            }
        })
    },
    computed: {
        disabled() {
            if (!this.item.onlyDeveloper) {
                return false
            } else {
                return !config.settings.devMode
            }
        }
    },
    watch: {
        x(newVal, _) {
            this.saveCoords(newVal)
        },
        y(newVal, _) {
            this.saveCoords(null, newVal)
        },
        z(newVal, _) {
            this.saveCoords(null, null, newVal)
        }
    },
    methods: {
        parseCoords(value) {
            if (!value) {
                return {x: 0, y: 0, z: 0}
            }
            let array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(';')
            if (array.length === 1) {
                array = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(',')
            }
            const [x, y, z] = array
            return {x ,y ,z}
        },
        saveCoords(x=null, y=null, z=null) {
            if (x !== null) x = `${x}`
            if (y !== null) y = `${y}`
            if (z !== null) z = `${z}`
            const value = `(${x||this.x}; ${y||this.y}; ${z||this.z})`

            if (!this.fileDOM.querySelector(this.item.selector)) {
                const array = this.item.selector.split('>').map(value => value.trim())
                const name = array.pop()
                const rootSelector = array.join(' > ')
                this.fileDOM.querySelector(rootSelector).append(this.fileDOM.createElement(name))

                if (!this.ETR[this.filePath]) {
                    this.ETR[this.filePath] = []
                }
                if (!this.ETR[this.filePath].includes(this.item.selector)) {
                    this.ETR[this.filePath].push(this.item.selector)
                }
            }

            this.setValue(this.item.selector, this.item.name, value)
        }
    }
})
</script>


<style scoped>
div.param-input > input.x-input,
div.param-input > input.y-input,
div.param-input > input.z-input {
    width: 70px !important;
    margin-right: 10px;
}
</style>
