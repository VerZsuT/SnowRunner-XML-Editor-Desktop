const PCoords = {
    props: {
        item: Object
    },
    inject: ['fileDOM'],
    template: `
        <div>
            <span>X: </span><input class='x-input form-control inline-block' type='number' v-model='x' :disabled='disabled'>
            <span>Y: </span><input class='y-input form-control inline-block' type='number' v-model='y' :disabled='disabled'>
            <span>Z: </span><input class='z-input form-control inline-block' type='number' v-model='z' :disabled='disabled'>
        </div>
    `,
    data() {
        return {
            x: this.parseCoords()[0],
            y: this.parseCoords()[1],
            z: this.parseCoords()[2]
        }
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
        x(newVal, _) {saveCoords(newVal)},
        y(newVal, _) {saveCoords(null, newVal)},
        z(newVal, _) {saveCoords(null, null, newVal)}
    },
    methods: {
        parseCoords() {
            return this.item.value.replace('(', '').replace(')', '').replaceAll(' ', '').split(';')
        },
        saveCoords(x=null, y=null, z=null) {
            this.fileDOM.querySelector(this.item.selector).setAttribute(this.item.name, `(${x||this.x}; ${y||this.y}; ${z||this.z})`)
        }
    }
}

export default PCoords
