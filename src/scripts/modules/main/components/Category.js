import {getText} from '../../../service/funcs.js';
import mainProcess from '../../../service/mainProcess.js';

export default {
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
                    return getText(propName);
                }
            })
        };
    },
    methods: {
        openList() {
            local.listType = this.name;
            mainProcess.openList();
        }
    },
    computed: {
        imgSrc() {
            return `../category_images/${this.name}_category.png`;
        }
    }
}
