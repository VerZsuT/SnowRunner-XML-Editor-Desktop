const Param = {
    props: {
        tabs: Number,
        item: Object
    },
    inject: ['filter', 'fileDOM', 'templates', 'globalTemplates'],
    template: `
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
                    v-if='item.inputType === "select"'
                    :item='item'
                    class='param-input'
                ></p-select>
                <p-file
                    v-else-if='item.type === "file"'
                    :item='item'
                    class='param-input'
                ></p-file>
                <p-coords
                    v-else-if='item.type === "coordinates"'
                    :item='item'
                    class='param-input'
                ></p-coords>
                <p-input
                    v-else
                    :item='item'
                    class='param-input'
                ></p-input>
            </div>
            <img 
                class='desc'
                v-if='item.desc'
                :title='item.desc[lang]'
                src='../icons/info.png'
            >
        </div>
    `,
    data() {
        return {
            style: {
                paddingLeft: `${this.tabs * 10}px`,
                fontWeight: this.item.bold ? 'bold' : 'normal'
            },
            lang: config.lang
        }
    },
    computed: {
        text() {
            const text = this.item.text
            const filter = this.filter.value
            if (!filter) {
                return text
            }

            const firstIndex = text.toLowerCase().indexOf(filter.toLowerCase())
            const lastIndex = firstIndex + filter.length
            return {
                first: text.slice(0, firstIndex),
                second: text.slice(firstIndex, lastIndex),
                last: text.slice(lastIndex, text.length)
            }
        }
    },
    methods: {
        getValue() {
            let value = this.item.value
            if (!value && value !== 0 && this.templates) {
                let el = this.fileDOM.querySelector(this.item.selector)
                const array = this.item.selector.split('>').map((value) => value.trim())
                const innerName = array.slice(array.length - 1)[0]
                const tagName = innerName.split('[')[0]
                if (!el) {
                    el = this.fileDOM.querySelector(array.slice(0, array.length - 1).join(' > '))
                }
                if (el) {
                    let templateName = el.getAttribute('_template')
                    if (!templateName) {
                        templateName = this.getParentTemplate(el)
                    }
                    if (templateName) {
                        if (this.templates) {
                            const template = this.templates.querySelector(templateName)
                            if (template) {
                                const templateValue = template.getAttribute(this.item.name)
                                if (templateValue) {
                                    value = templateValue
                                } else {
                                    const el2 = template.querySelector(tagName)
                                    if (el2) {
                                        const templateValue2 = el2.getAttribute(this.item.name)
                                        if (templateValue2) {
                                            value = templateValue2
                                        } else {
                                            const templateName1 = el2.getAttribute('_template')
                                            if (templateName1) {
                                                value = this.getValueInGlobal(templateName1, tagName)
                                            }
                                        }
                                    }
                                }
                            } else {
                                value = this.getValueInGlobal(templateName, tagName)
                            }
                        }
                    }
                }
            }
            if (value === null || value === undefined) {
                value = this.item.default
            }

            return value
        },
        getValueInGlobal(templateName, tagName) {
            const template = this.globalTemplates.querySelector(`${tagName} > ${templateName}`)
            if (template) {
                const templateValue = template.getAttribute(this.item.name)
                if (templateValue) {
                    return templateValue
                } else {
                    const el2 = template.querySelector(tagName)
                    if (el2) {
                        const templateValue2 = el2.getAttribute(this.item.name)
                        if (templateValue2) {
                            return templateValue2
                        }
                    }
                }
            }
            return this.item.value
        },
        getParentTemplate(el) {
            if (el.parent) {
                const template = el.parent.getAttribute('_template')
                if (template) {
                    return template
                } else {
                    return this.getParentTemplate(el.parent)
                }
            }
        }
    },
    provide() {
        return {
            getValue: this.getValue
        }
    }
}

export default Param
