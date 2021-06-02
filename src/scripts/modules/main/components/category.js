import { getText } from "../../../service/funcs.js"
import { funcs } from "../../../service/renderer.js"

const Category = {
    props: {
        name: String
    },
    template: `
        <div class='category' @click='openList'>
            <img :src='imgSrc'>
            <span class='category-name'>{{ t[\`\${name.toUpperCase()}_CATEGORY_TITLE\`] }}</span>
        </div>
    `,
    data() {
        return {
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName)
                }
            })
        }
    },
    methods: {
        openList() {
            local.listType = this.name
            funcs.openList()
        }
    },
    computed: {
        imgSrc() {
            return `../category_images/${this.name}_category.png`
        }
    }
}

export default Category
