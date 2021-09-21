import '../../bootstrap/bootstrap.bundle.min.js';
import '../../service/menu.js';
import {createApp} from '../../vue/vue.esm-browser.js';
import {prettify, getIngameText, getText} from '../../service/funcs.js';
import mainProcess from '../../service/mainProcess.js';
import Params from './components/Params.js';
import Param from './components/Param.js';
import PFile from './components/PFile.js';
import PInput from './components/PInput.js';
import PSelect from './components/PSelect.js';
import PCoords from './components/PCoords.js';
import Group from './components/Group.js';
import Search from './components/Search.js';

const App = {
    data() {
        return {
            filePath: local.filePath,
            fileDOM: getDOM(),
            currentMod: local.pop('currentMod'),
            filter: {
                value: null,
                set(value) {
                    this.value = value;
                }
            }
        };
    },
    provide() {
        return {
            currentDLC: local.pop('currentDLC'),
            currentMod: this.currentMod,
            fileDOM: this.fileDOM,
            filter: this.filter,
            templates: this.fileDOM.querySelector('_templates'),
            globalTemplates: getGlobalTemplates()
        };
    },
    computed: {
        title() {
            if (this.fileDOM.querySelectorAll('GameData UiDesc').length === 1) {
                const text = this.fileDOM.querySelector('GameData UiDesc').getAttribute('UiName');
                return getIngameText(text, this.currentMod) || text;
            }

            if (this.filePath.split('/').length !== 1) {
                let a = this.filePath.split('/');
                return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase();
            } else {
                let a = this.filePath.split('\\');
                return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase();
            }
        }
    },
    methods: {
        save() {
            document.querySelector('#title').innerText = getText('SAVING_MESSAGE');
            setTimeout(() => {
                const serializer = new XMLSerializer();
                const copyrightText = `<!--\n\tEdited by: SnowRunner XML Editor Desktop\n\tVersion: v${config.version}\n\tAuthor: VerZsuT\n\tSite: https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/\n-->\n`;

                for (const item of this.fileDOM.querySelectorAll('[SXMLE_ID]')) {
                    item.removeAttribute('SXMLE_ID');
                }

                const xmlString = `${copyrightText}${serializer.serializeToString(this.fileDOM).replace('<root>', '').replace('</root>', '')}`;
                mainProcess.setFileData(this.filePath, xmlString);
                mainProcess.saveToOriginal(this.currentMod);
                window.close();
            }, 100);
        },
        back() {
            window.close();
        }
    }
};

function getGlobalTemplates() {
    const filePath = preload.join(preload.paths.mainTemp, '[media]', '_templates', 'trucks.xml');
    const fileData = mainProcess.getFileData(filePath);

    return new DOMParser().parseFromString(fileData, 'text/xml');
}

function getDOM() {
    const filePath = local.pop('filePath');
    const fileData = mainProcess.getFileData(filePath);
    if (!fileData) return;

    const parser = new DOMParser();
    const dom = parser.parseFromString(`<root>${fileData}</root>`, 'text/xml');
    if (dom.querySelector('parsererror')) {
        const error = document.querySelector('#error');
        error.innerText = getText(error.innerText);
        error.style.display = 'block';
        throw new Error('Ошибка распознания файла');
    }

    for (const child of dom.querySelector('root').childNodes) {
        if (child.nodeType === 8) {
            child.remove();
        }
    }
    if (dom.querySelector('root').childNodes[0].nodeValue === '\n') {
        dom.querySelector('root').childNodes[0].remove();
    }
    window.dom = dom;
    return dom;
}

createApp(App)
    .component('Params', Params)
    .component('PParam', Param)
    .component('PCoords', PCoords)
    .component('PFile', PFile)
    .component('PInput', PInput)
    .component('PSelect', PSelect)
    .component('PGroup', Group)
    .component('Search', Search)
    .mount('#main');

