<template>
    <div>
        <button
            :key='i.value'
            v-for='i in items'
            class='openFile btn btn-secondary btn-sm'
            @click='openEditor(i.value)'
        >
            {{ i.index + 1 }}
            <div class='open-file-button'></div>
        </button>
    </div>
</template>

<script>
import {getText} from '../../../service/funcs.js';
import mainProcess from '../../../service/mainProcess.js';

export default {
    props: {
        item: Object
    },
    inject: ['currentMod', 'currentDLC', 'fileDOM'],
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
        openEditor(fileName) {
            const paths = [`${config.paths.classes}\\${this.item.fileType}\\${fileName}.xml`];
            let mainPath = null;

            if (this.currentDLC) {
                const dlcPath = `${config.paths.dlc}\\${this.currentDLC}\\classes\\${this.item.fileType}\\${fileName}.xml`;
                paths.push(dlcPath);
                local.set('currentDLC', this.currentDLC);
            } else if (this.currentMod) {
                const modPath = `${config.paths.mods}\\${this.currentMod}\\classes\\${this.item.fileType}\\${fileName}.xml`;
                paths.push(modPath);
                local.set('currentMod', this.currentMod);
            }

            for (const path of paths) {
                if (preload.existsSync(path)) {
                    mainPath = path;
                }
            }

            if (!mainPath) {
                mainPath = preload.findFromDLC(fileName, this.item.fileType);
            }
            local.set('filePath', mainPath);

            mainProcess.call('openXMLEditor');
        }
    },
    computed: {
        items() {
            const array = this.item.value.split(',').map((value) => value.trim());
            if (this.item.fileType === 'wheels') {
                for (const compatible of this.fileDOM.querySelectorAll('Truck > TruckData > CompatibleWheels')) {
                    const type = compatible.getAttribute('Type');
                    if (array.indexOf(type) === -1) {
                        array.push(type);
                    }
                }
            }
            return array.map((value, index) => ({value, index}));
        }
    }
};
</script>
