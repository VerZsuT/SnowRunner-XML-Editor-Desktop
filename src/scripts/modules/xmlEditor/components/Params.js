import templates from "../../../service/templates.js"

const Params = {
    template: `
        <div id="parameters" class="accordion snow">
            <div v-for='item in params'>
                <p-group
                    v-if='item.paramType === "group"'
                    :item='item'
                    parent='parameters'
                    :tabs='1'
                ></p-group>
                <p-param
                    v-else
                    :item='item'
                    :tabs='1'
                ></p-param>
            </div>
        </div>
    `,
    inject: ['fileDOM'],
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
            
            return template.getParams({
                selectors: selectors,
                fileDOM: this.fileDOM,
                templateName: name
            })
        }
    }
}

export default Params
