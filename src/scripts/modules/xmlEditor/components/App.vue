<template>
    <section id="work-zone">
        <div id="editor">
            <search></search>
            <h2 id="title" class="title">{{ title }}</h2>
            <params></params>
            <button class="btn btn-primary" id="save-params" @click='save' :title="t['SAVE_BUTTON']"></button>
            <button class="btn btn-primary" id="back" @click='back' :title="t['CLOSE']"></button>
            <button class="btn btn-primary" id="reset" @click='reset' v-show='ADV[filePath] || ETR[filePath]' :title="t['RESET_MENU_ITEM_LABEL']"></button>
            <button class="btn btn-primary" id="export" @click='exportFile' :title="t['EXPORT']"></button>
            <button class="btn btn-primary" id="import" @click='importFile' :title="t['IMPORT']"></button>
        </div>
    </section>
</template>

<script>
import '../../../bootstrap/bootstrap.bundle.min.js';
import '../../../service/menu.js';

import {prettify, getIngameText, getText} from '../../../service/funcs.js';
import mainProcess from '../../../service/mainProcess.js';

import Search from './Search.vue';
import Params from './Params.vue';

export default {
    components: {
        Search,
        Params
    },
    data() {
        return {
            ADV: JSON.parse(JSON.stringify(config.ADV)),
            ETR: JSON.parse(JSON.stringify(config.ETR)),
            filePath: local.get('filePath'),
            fileDOM: getDOM(),
            currentMod: local.pop('currentMod'),
            filter: {
                value: null,
                set(value) {
                    this.value = value;
                }
            },
            params: [],
            t: new Proxy({}, {
                get(_, propName) {
                    return getText(propName);
                }
            })
        };
    },
    provide() {
        return {
            currentDLC: local.pop('currentDLC'),
            currentMod: this.currentMod,
            fileDOM: this.fileDOM,
            filter: this.filter,
            filePath: this.filePath,
            templates: this.fileDOM.querySelector('_templates'),
            globalTemplates: getGlobalTemplates(),
            ADV: this.ADV,
            ETR: this.ETR,
            params: this.params
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
        importFile() {
            const filePath = mainProcess.call('openJSONDialog');
            if (!filePath) {
                mainProcess.call('alert', getText('[PARAMS_FILE_NOT_FOUND]'));
                return;
            }

            const data = JSON.parse(preload.readFile(filePath));
            if (preload.basename(this.filePath) !== data.fileName) {
                mainProcess.call('alert', getText('[BREAK_IMPORT]'));
                return;
            }
            delete data.fileName;

            for (const selector in data) {
                for (const attribute in data[selector]) {
                    for (const obj of this.params) {
                        const forImport = obj.forImport;
                        if (forImport.selector === selector && forImport.name === attribute) {
                            forImport.setValue(data[selector][attribute]);
                        }
                    }
                }
            }
            mainProcess.call('alert', getText('WAS_IMPORTED'));
        },
        exportFile() {
            const out = {
                fileName: preload.basename(this.filePath)
            };
            for (const obj of this.params) {
                const expObj = obj.forExport();

                if (!out[expObj.selector]) out[expObj.selector] = {};
                out[expObj.selector][expObj.name] = expObj.value;
            }

            const pathToSave = mainProcess.call('openSaveDialog', preload.basename(this.filePath, '.xml'));
            if (!pathToSave) {
                mainProcess.call('alert', getText('[PATH_TO_SAVE_NOT_FOUND]'));
                return;
            }

            preload.saveFile(pathToSave, JSON.stringify(out, null, '\t'));
            mainProcess.call('alert', getText('[WAS_EXPORTED]'));
        },
        save() {
            document.querySelector('#title').innerText = getText('SAVING_MESSAGE');
            setTimeout(() => {
                const serializer = new XMLSerializer();
                const copyrightText = `<!--\n\tEdited by: SnowRunner XML Editor Desktop\n\tVersion: v${config.version}\n\tAuthor: VerZsuT\n\tSite: https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/\n-->\n`;

                for (const item of this.fileDOM.querySelectorAll('[SXMLE_ID]')) {
                    item.removeAttribute('SXMLE_ID');
                }

                const xmlString = `${copyrightText}${serializer.serializeToString(this.fileDOM).replace('<root>', '').replace('</root>', '')}`;
                mainProcess.call('setFileData', this.filePath, xmlString);
                mainProcess.call('saveToOriginal', this.currentMod);

                const tempADV = JSON.parse(JSON.stringify(config.ADV));
                if (this.ADV[this.filePath]) {
                    tempADV[this.filePath] = JSON.parse(JSON.stringify(this.ADV[this.filePath]));
                } else if (tempADV[this.filePath]) {
                    delete tempADV[this.filePath];
                }
                config.ADV = tempADV;

                const tempETR = JSON.parse(JSON.stringify(config.ETR));
                if (this.ETR[this.filePath]) {
                    tempETR[this.filePath] = JSON.parse(JSON.stringify(this.ETR[this.filePath]));
                } else if (tempETR[this.filePath]) {
                    delete tempETR[this.filePath];
                }
                config.ETR = tempETR;
                
                window.close();
            }, 100);
        },
        back() {
            window.close();
        },
        reset() {
            if (!mainProcess.call('confirm', getText('[RESET_CONFIRM_MESSAGE]'))) {
                return;
            }
            
            const itemsToReset = this.ADV[this.filePath];
            if (itemsToReset) {
                for (const selector in itemsToReset) {
                    const item = this.fileDOM.querySelector(selector);
                    const ADV = itemsToReset[selector];
    
                    for (const attrName in ADV) {
                        const value = ADV[attrName];
    
                        if (value === 'ADV_NULL') {
                            item.removeAttribute(attrName);
                        } else {
                            item.setAttribute(attrName, value);
                        }
                    }
                }
                delete this.ADV[this.filePath];
            }

            const itemsToDelete = this.ETR[this.filePath];
            if (itemsToDelete) {
                for (const selector in itemsToDelete) {
                    const item = this.fileDOM.querySelector(selector);
                    item.remove();
                }
                delete this.ETR[this.filePath];
            }

            mainProcess.call('alert', getText('[FILE_IS_RESETED]'));
            document.querySelector('#save-params').click();
        }
    }
}

function getGlobalTemplates() {
    const filePath = preload.join(preload.paths.mainTemp, '[media]', '_templates', 'trucks.xml');
    const fileData = mainProcess.call('getFileData', filePath);

    return new DOMParser().parseFromString(fileData, 'text/xml');
}

function getDOM() {
    const filePath = local.pop('filePath');
    const fileData = mainProcess.call('getFileData', filePath);
    if (!fileData) return;

    const parser = new DOMParser();
    const dom = parser.parseFromString(`<root>${fileData}</root>`, 'text/xml');
    if (dom.querySelector('parsererror')) {
        const error = document.querySelector('#error');
        error.innerText = getText(error.innerText);
        error.style.display = 'block';
        throw new Error('[RECOGNIZE_ERROR]');
    }

    for (const child of dom.querySelector('root').childNodes) {
        if (child.nodeType === 8) {
            child.remove();
        }
    }
    if (dom.querySelector('root').childNodes[0].nodeValue === '\n') {
        dom.querySelector('root').childNodes[0].remove();
    }
    return dom;
}
</script>

<style>
@import '../../../../styles/main.css';
</style>
