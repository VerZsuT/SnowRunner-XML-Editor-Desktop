import {getIngameText, prettify} from '../../../service/funcs.js';
import mainProcess from '../../../service/mainProcess.js';

export default {
    props: {
        itemType: String,
        item: Object
    },
    template: `
        <div
            class='item'
            v-show='!error && show()'
            @click='openEditor'
        >
            <span
                class='item-text'
                v-if='typeof text === "string"'
            >
                {{ text }}
            </span>
            <span
                class='item-text'
                v-else
            >
                {{ text.first }}<span style='color: red'>{{ text.second }}</span>{{ text.last }}
            </span>
            <img :src='imageSource'>
        </div>
    `,
    inject: ['filter'],
    data() {
        return {
            parser: new DOMParser()
        };
    },
    methods: {
        openEditor() {
            local.filePath = this.item.path;
            local.currentDLC = this.item.dlcName;
            local.currentMod = this.item.modId;
            mainProcess.openXMLEditor();
        },
        show() {
            if (!this.filter.value) {
                return true;
            }
            if (this.name.toLowerCase().includes(this.filter.value.toLowerCase())) {
                return true;
            }
            return false;
        }
    },
    computed: {
        DOM() {
            const data = `<root>${mainProcess.getFileData(this.item.path)}</root>`;
            return this.parser.parseFromString(data, 'text/xml');
        },
        imageSource() {
            switch (this.itemType) {
                case 'cargo':
                    return '../icons/cargo_item.png';
                case 'trailers':
                    let trailerPath = `../images/trailers/${this.item.name}.png`;
                    const trailerPath2 = `../../../images/trailers/${this.item.name}.png`;

                    if (!preload.exists(trailerPath2)) {
                        trailerPath = '../icons/trailer_item.png';
                    }
                    return trailerPath;
                case 'trucks':
                    let truckPath = `../images/trucks/${this.item.name}.jpg`;

                    if (this.item.modId && this.DOM.querySelector('GameData > UiDesc')) {
                        const imgName = this.DOM.querySelector('GameData > UiDesc').getAttribute('UiIcon328x458');
                        // Этот используется в html файле.
                        truckPath = `../scripts/modsTemp/${this.item.modId}/ui/textures/${imgName}.png`;
                        // Этот нужен для проверки на наличие.
                        const truckPath2 = `../../modsTemp/${this.item.modId}/ui/textures/${imgName}.png`;
                        if (!preload.exists(truckPath2)) {
                            truckPath = '../icons/truck_item.png';
                        }
                    }
                    return truckPath;
            }
        },
        name() {
            let name = prettify(this.item.name);
            if (this.DOM.querySelector('GameData > UiDesc')) {
                const uiName = this.DOM.querySelector('GameData > UiDesc').getAttribute('UiName');
                if (uiName) {
                    name = getIngameText(uiName, this.item.modId) || uiName;
                }
            }
            return name;
        },
        text() {
            const filter = this.filter.value;
            if (!filter) {
                return this.name;
            }
            const firstIndex = this.name.toLowerCase().indexOf(filter.toLowerCase());
            const lastIndex = firstIndex + filter.length;
            return {
                first: this.name.slice(0, firstIndex),
                second: this.name.slice(firstIndex, lastIndex),
                last: this.name.slice(lastIndex, this.name.length)
            };
        },
        error() {
            return (
                this.DOM.querySelector('parsererror') ||
                (
                    this.item.type === 'trucks' &&
                    this.DOM.querySelector('Truck') &&
                    this.DOM.querySelector('Truck').getAttribute('Type') === 'Trailer'
                )
            );
        }
    }
}
