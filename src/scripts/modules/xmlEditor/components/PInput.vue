<template>
    <input 
        ref='input'
        v-if='item.type === "number"'
        class='form-control'
        type='number'
        :step='item.step'
        v-model.number.lazy='value'
        :disabled='disabled'
        @input='setColor'
    />
    <input 
        v-else
        class='form-control'
        type='text'
        v-model='value'
        :disabled='disabled'
        :title='defaultValue'
    />
</template>

<script>
import {getText} from '../../../service/funcs.js';

export default {
    props: {
        item: Object,
        key: Number
    },
    inject: ['fileDOM', 'filePath', 'getValue', 'setValue', 'ETR', 'params'],
    data() {
        const value = this.getValue();
        return {
            defaultValue: value,
            value: value,
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName);
                }
            })
        };
    },
    mounted() {
        this.params.push({
            forExport: () => {
                return {
                    selector: this.item.selector, 
                    name: this.item.name, 
                    value: this.value
                };
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
        });
        if (this.item.type === 'number') {
            this.$nextTick(function() {
                this.setColor();
            })
        }
    },
    watch: {
        value(newVal, _) {
            if (newVal === '') {
                newVal = this.defaultValue;
            }
            newVal = this.limit(newVal);
            
            if (!this.fileDOM.querySelector(this.item.selector)) {
                const array = this.item.selector.split('>').map(value => value.trim());
                const name = array.pop();
                const rootSelector = array.join(' > ');
                this.fileDOM.querySelector(rootSelector).append(this.fileDOM.createElement(name));

                if (!this.ETR[this.filePath]) {
                    this.ETR[this.filePath] = [];
                }
                if (!this.ETR[this.filePath].includes(this.item.selector)) {
                    this.ETR[this.filePath].push(this.item.selector);
                }
            }
            this.setValue(this.item.selector, this.item.name, newVal);
            this.setColor(null, newVal);
            this.value = newVal;
        }
    },
    methods: {
        setColor(_, v=null) {
            let newVal = v;

            if (v === null) newVal = this.$refs.input.valueAsNumber || 0;
            if (this.item.areas) {
                let color = '#ced4da';

                for (const areaName in this.item.areas) {
                    const value = this.item.areas[areaName];

                    for (const area of value) {
                        if (newVal >= area[0] && newVal <= area[1]) {
                            if (areaName === 'red') {
                                color = `hsl(0deg, 100%, 50%)`;
                            } else if (areaName === 'green') {
                                color = `hsl(120deg, 100%, 50%)`;
                            } else if (areaName === 'yellow') {
                                color = `rgb(235 235 12)`;
                            }
                        }
                    }
                }
                this.$refs.input.style.borderColor = color;
            }
        },
        limit(value) {
            if (this.min !== undefined && value < this.min) {
                return this.min;
            }
            if (this.max !== undefined && value > this.max) {
                return this.max;
            }
            return value;
        }
    },
    computed: {
        isNumber() {
            return this.item.type === 'number';
        },
        min() {
            if (this.item.min !== '-∞' && config.settings.limits) {
                return this.item.min || 0;
            }
        },
        max() {
            if (this.item.max && config.settings.limits) {
                return this.item.max;
            }
        },
        disabled() {
            if (!this.item.onlyDeveloper) {
                return false;
            } else {
                return !config.settings.devMode;
            }
        }
    }
}
</script>
