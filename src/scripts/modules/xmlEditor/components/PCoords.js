export default {
    props: {
        item: Object
    },
    inject: ['fileDOM', 'getValue'],
    template: `
        <div>
            <span>X: </span><input class='x-input form-control inline-block' type='number' v-model='x' :disabled='disabled'>
            <span>Y: </span><input class='y-input form-control inline-block' type='number' v-model='y' :disabled='disabled'>
            <span>Z: </span><input class='z-input form-control inline-block' type='number' v-model='z' :disabled='disabled'>
        </div>
    `,
    data() {
        return this.parseCoords(this.getValue());
    },
    computed: {
        disabled() {
            if (!this.item.onlyDeveloper) {
                return false;
            } else {
                return !config.settings.devMode;
            }
        }
    },
    watch: {
        x(newVal, _) {
            this.saveCoords(newVal);
        },
        y(newVal, _) {
            this.saveCoords(null, newVal);
        },
        z(newVal, _) {
            this.saveCoords(null, null, newVal);
        }
    },
    methods: {
        parseCoords(value) {
            if (!value) {
                return {x: 0, y: 0, z: 0};
            }
            const [x, y, z] = value.replace('(', '').replace(')', '').replaceAll(' ', '').split(';');
            return {x ,y ,z};
        },
        saveCoords(x=null, y=null, z=null) {
            if (x !== null) x = `${x}`;
            if (y !== null) y = `${y}`;
            if (z !== null) z = `${z}`;
            
            this.fileDOM.querySelector(this.item.selector).setAttribute(this.item.name, `(${x||this.x}; ${y||this.y}; ${z||this.z})`);
        }
    }
}
