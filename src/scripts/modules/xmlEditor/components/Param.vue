<template>
    <div class='info'>
        <div class='param-text' :style='style'>
            <span v-if='typeof text === "string"'>
                {{ text }}
            </span>
            <span v-else>
                {{ text.first }}<span style='color: red'>{{ text.second }}</span>{{ text.last }}
            </span>
        </div>
        <div class='param-value'>
            <p-select
                :isExporting='isExporting'
                :isExport='isExport'
                v-if='item.inputType === "select"'
                :item='item'
            ></p-select>
            <p-file
                :isExporting='isExporting'
                :isExport='isExport'
                v-else-if='item.type === "file"'
                :item='item'
            ></p-file>
            <p-coords
                :isExporting='isExporting'
                :isExport='isExport'
                v-else-if='item.type === "coordinates"'
                :item='item'
            ></p-coords>
            <p-input
                :isExporting='isExporting'
                :isExport='isExport'
                v-else
                :item='item'
            ></p-input>
        </div>
        <div 
            class='desc'
            v-if='item.desc'
            :title='item.desc'
        ></div>
    </div>
</template>

<script>
import PInput from './PInput.vue';
import PFile from './PFile.vue';
import PCoords from './PCoords.vue';
import PSelect from './PSelect.vue';

export default {
    components: {
        PInput,
        PFile,
        PCoords,
        PSelect
    },
    props: {
        tabs: Number,
        item: Object,
        isExporting: Boolean,
        isExport: {
            type: Boolean,
            default: true
        }
    },
    inject: ['filter', 'fileDOM', 'filePath', 'templates', 'globalTemplates', 'ADV', 'ETR'],
    data() {
        return {
            style: {
                paddingLeft: `${this.tabs * 10}px`,
                fontWeight: this.item.bold ? 'bold' : 'normal'
            },
            lang: config.lang
        };
    },
    computed: {
        text() {
            const text = this.item.text;
            const filter = this.filter.value;
            if (!filter) {
                return text;
            }

            const firstIndex = text.toLowerCase().indexOf(filter.toLowerCase());
            const lastIndex = firstIndex + filter.length;
            return {
                first: text.slice(0, firstIndex),
                second: text.slice(firstIndex, lastIndex),
                last: text.slice(lastIndex, text.length)
            };
        }
    },
    methods: {
        getValue() {
            let value = this.item.value;
            if (!value && value !== 0 && this.templates) {
                let el = this.fileDOM.querySelector(this.item.selector);
                const array = this.item.selector.split('>').map((value) => value.trim());
                const innerName = array.slice(array.length - 1)[0];
                const tagName = innerName.split('[')[0];
                if (!el) {
                    el = this.fileDOM.querySelector(array.slice(0, array.length - 1).join(' > '));
                }
                if (el) {
                    let templateName = el.getAttribute('_template');
                    if (!templateName) {
                        templateName = this.getParentTemplate(el);
                    }
                    if (templateName) {
                        const template = this.templates.querySelector(templateName);
                        if (template) {
                            const templateValue = template.getAttribute(this.item.name);
                            if (templateValue) {
                                value = templateValue;
                            } else {
                                const el2 = template.querySelector(tagName);
                                if (el2) {
                                    const templateValue2 = el2.getAttribute(this.item.name);
                                    if (templateValue2) {
                                        value = templateValue2;
                                    } else {
                                        const templateName1 = el2.getAttribute('_template');
                                        if (templateName1) {
                                            value = this.getValueInGlobal(templateName1, tagName);
                                        }
                                    }
                                }
                            }
                        } else {
                            value = this.getValueInGlobal(templateName, tagName);
                        }
                    }
                }
            }
            if (value === null || value === undefined) {
                value = this.item.default;
            }

            return value;
        },
        setValue(selector, attrName, value) {
            const element = this.fileDOM.querySelector(selector);
            if (!this.ADV[this.filePath]) {
                this.ADV[this.filePath] = {};
            }

            const fileADV = this.ADV[this.filePath];
            if (!fileADV[selector]) {
                fileADV[selector] = {};
            }

            const tagADV = fileADV[selector];
            if (!tagADV[attrName]) {
                const defaultValue = element.getAttribute(attrName);

                if (defaultValue !== null) {
                    tagADV[attrName] = defaultValue;
                } else {
                    tagADV[attrName] = 'ADV_NULL';
                }
            }

            element.setAttribute(attrName, value);
        },
        getValueInGlobal(templateName, tagName) {
            const template = this.globalTemplates.querySelector(`${tagName} > ${templateName}`);
            if (template) {
                const templateValue = template.getAttribute(this.item.name);
                if (templateValue) {
                    return templateValue;
                } else {
                    const el2 = template.querySelector(tagName);
                    if (el2) {
                        const templateValue2 = el2.getAttribute(this.item.name);
                        if (templateValue2) {
                            return templateValue2;
                        }
                    }
                }
            }
            return this.item.value;
        },
        getParentTemplate(el) {
            if (el.parentElement) {
                const template = el.parentElement.getAttribute('_template');
                if (template) {
                    return template;
                } else {
                    return this.getParentTemplate(el.parentElement);
                }
            }
        }
    },
    provide() {
        return {
            getValue: this.getValue,
            setValue: this.setValue
        };
    }
}
</script>


<style>
.input-export {
    position: absolute;
    right: 8px;
    bottom: 5px;
    width: 20px !important;
}
</style>
