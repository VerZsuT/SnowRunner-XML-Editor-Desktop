const Param = {
    props: {
        tabs: Number,
        item: Object
    },
    template: `
        <div class='info'>
            <div class='param-text' :style='style'>
                {{ item.text }}
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
        </div>
    `,
    data() {
        return {
            style: {
                paddingLeft: `${this.tabs * 10}px`,
                fontWeight: this.item.bold? 'bold' : 'normal'
            }
        }
    }
}

export default Param
