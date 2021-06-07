import templates from "../../../service/templates.js"

const Params = {
    template: `
        <div id="parameters" class="accordion snow">
            <div v-for='item in params'>
                <p-group
                    v-if='item.paramType === "group" && item.groupItems.length'
                    :item='item'
                    parent='parameters'
                    :tabs='1'
                    :key='item.groupName'
                ></p-group>
                <p-param
                    v-if='item.paramType !== "group"'
                    :item='item'
                    :tabs='1'
                    :key='item.name'
                ></p-param>
            </div>
        </div>
    `,
    inject: ['fileDOM', 'filter'],
    computed: {
        params() {
            let template = null
            let name = null
            for (let tmp in templates) {
                let selector = `root > ${templates[tmp].selector}`
                if (this.fileDOM.querySelector(selector)) {
                    template = templates[tmp]
                    name = tmp
                    break
                }
            }

            return this.parseTemplate(template.main, name)
        }
    },
    methods: {
        parseTemplate(obj, name) {
            const selectors = obj[1].toObject()
            const template = obj[0]

            return this.filt(template.getParams({
                selectors: selectors,
                fileDOM: this.fileDOM,
                templateName: name
            }))
        },
        filt(array) {
            const newArray = []

            array.map((value) => {
                const newValue = Object(value)
                if (value.groupName) {
                    newValue.groupItems = this.filt(value.groupItems)
                    newArray.push(newValue)
                } else if (!this.filter.value || value.text.toLowerCase().includes(this.filter.value.toLowerCase())) {
                    newArray.push(newValue)
                }
            })

            return newArray
        }
    }
}

export default Params
