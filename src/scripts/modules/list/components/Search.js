import { getText } from "../../../service/funcs.js"

const Search = {
    template: `
        <div class='search'>
            <label for='search' class='form-label'>{{ t.SEARCH }}:</label>
            <input type='text' id='search' class='form-control' v-model='value'>
        </div>
    `,
    inject: ['filter'],
    data() {
        return {
            value: this.filter.value,
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName)
                }
            })
        }
    },
    watch: {
        value() {
            this.filter.set(this.value)
        }
    }
}

export default Search
