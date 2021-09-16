import {removePars, getTextFromTemplate, getIngameText, getDescription} from './funcs.js';

/**
 * params: 
 * - **type** ['multiply', 'single'] = *'single'*
 * - **itemSelector** [string]
 * - **replaceName** [string] = *'CYCLE'*
 * - **single** [bool]
 * @returns {object} Template
 */
export function Template(params, children) {
    return ({
        type: params.type,
        itemSelector: params.itemSelector,
        replaceName: 'CYCLE',
        single: params.single || false,
        children: children,
        get attributes() {
            const array = [];
            for (const name in params) {
                array.push({
                    name: name,
                    value: params[name]
                });
            }
            return array;
        },
        nodeName: 'Template',
        getParams(props) {
            let selectors = props.selectors;
            let defaultSelector = props.defaultSelector || null;
            let onlySingle = props.onlySingle || false;
            let tCycleNumber = props.tCycleNumber || 1;
            let tNumber = props.tNumber || 1;
            let multiply = props.multiply;
            let fileDOM = props.fileDOM;
            let templateName = props.templateName;

            if (multiply === undefined) {
                multiply = (this.type === 'Multiply');
            }

            let params = [];
            let newSelectors = {};
            if (multiply) {
                const items = fileDOM.querySelectorAll(selectors[removePars(this.itemSelector)]);
                let currentNum = 1;
                for (const item of items) {
                    if (currentNum < this.startWith) {
                        continue;
                    }
                    const id = Math.round(Math.random() * Math.pow(10, 10));
                    item.setAttribute('SXMLE_ID', id)
                    for (const selector in selectors) {
                        newSelectors[selector] = selectors[selector].replaceAll(`-${this.replaceName}${tNumber}-`, id);
                        if (currentNum === 1) {
                            newSelectors[selector] = newSelectors[selector].replaceAll(`-F_${this.replaceName}${tNumber}-`, id);
                        } else if (currentNum === items.length) {
                            newSelectors[selector] = newSelectors[selector].replaceAll(`-L_${this.replaceName}${tNumber}-`, id);
                        }
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-N${currentNum}_${this.replaceName}${tNumber}-`, id);
                    }
                    params = params.concat(this.getParams({
                        selectors: newSelectors,
                        defaultSelector: defaultSelector,
                        onlySingle: false,
                        multiply: false,
                        tCycleNumber: currentNum,
                        fileDOM: fileDOM,
                        tNumber: multiply ? tNumber + 1 : tNumber,
                        templateName: templateName
                    }));
                    currentNum++;
                }
                params = params.concat(this.getParams({
                    selectors: newSelectors,
                    defaultSelector: defaultSelector,
                    onlySingle: true,
                    multiply: false,
                    fileDOM: fileDOM,
                    tNumber: tNumber,
                    templateName: templateName
                }));
                return params;
            }
            for (const child of this.children) {
                if ((onlySingle && !child.single) || (!onlySingle && child.single)) {
                    return [];
                }
                params = params.concat(child.getParams({
                    selectors: selectors,
                    defaultSelector: defaultSelector,
                    onlySingle: onlySingle,
                    cycleNumber: tCycleNumber,
                    tNumber: multiply ? tNumber + 1 : tNumber,
                    fileDOM: fileDOM,
                    templateName: templateName
                }));
            }
            return params;
        }
    });
}

/**
 * params: 
 * - **name** [string]
 * - **nameType** ['TagName', 'Computed', 'Static'] = *'Static'*
 * - **nameSelector** [string]
 * - **nameAttribute** [string]
 * - **defaultSelector** [string]
 * - **single** [bool]
 * - **withCounter** [bool]
 * @returns {object} Group
 */
export function Group(params, children) {
    return ({
        name: params.name,
        nameType: params.nameType || 'Static',
        nameSelector: params.nameSelector,
        resNameSelector: params.resNameSelector,
        nameAttribute: params.nameAttribute,
        resNameAttribute: params.resNameAttribute,
        defaultSelector: params.defaultSelector,
        single: params.single || false,
        withCounter: params.withCounter || false,
        children: children,
        get attributes() {
            const array = [];
            for (const name in params) {
                array.push({
                    name: name,
                    value: params[name]
                });
            }
            return array;
        },
        nodeName: 'Group',
        getParams(props) {
            let selectors = props.selectors;
            let defaultSelector = props.defaultSelector || null;
            let onlySingle = props.onlySingle || false;
            let cycleNumber = props.cycleNumber;
            let fileDOM = props.fileDOM;
            let templateName = props.templateName;

            let param = null;
            let params = [];
            let groupName;
            if (this.nameType !== 'Static') {
                const nameSelector = removePars(this.nameSelector);
                const resNameSelector = removePars(this.resNameSelector);

                const $nameElement = fileDOM.querySelector(selectors[nameSelector] || nameSelector);
                const $resNameElement = fileDOM.querySelector(selectors[resNameSelector] || resNameSelector);

                if ($nameElement === null && $resNameElement === null) {
                    return params;
                }

                if (this.nameType === 'Computed') {
                    const nameAttribute = this.nameAttribute;
                    const resNameAttribute = this.resNameAttribute;

                    groupName = getIngameText($nameElement.getAttribute(nameAttribute)) || $resNameElement.getAttribute(resNameAttribute);
                } else if (this.nameType === 'TagName') {
                    groupName = $nameElement.nodeName;
                }
            } else {
                groupName = this.name;
            }

            if (this.single) {
                for (const child of this.children) {
                    child.single = true;
                }
            }
            const groupDefaultSelector = removePars(this.defaultSelector);
            for (const child of this.children) {
                if ((onlySingle && !child.single) || (!onlySingle && child.single)) {
                    continue;
                }
                params = params.concat(child.getParams({
                    selectors: selectors,
                    defaultSelector: groupDefaultSelector || defaultSelector,
                    onlySingle: onlySingle,
                    tNumber: props.tNumber,
                    fileDOM: fileDOM,
                    templateName: templateName
                }));
            }
            groupName = getTextFromTemplate(groupName, templateName);
            if (this.withCounter) {
                groupName += ` ${cycleNumber}`;
            }

            param = {
                paramType: 'group',
                groupName: groupName,
                groupItems: params
            };
            return [param];
        }
    });
}

/**
 * params:
 * - **attribute** [string]
 * - **text** [string]
 * - **selector** [string]
 * - **single** [bool]
 * - **onlyDeveloper** [bool]
 * - **type** ['text', 'file', 'coordinates', 'number'] = *'number'*
 * - **numberType** ['int', 'float'] = *'int'*
 * - **fileType** [string]
 * - **min** [number]
 * - **max** [number]
 * @returns {object} Input
 */
export function Input(params) {
    return ({
        attribute: params.attribute,
        text: params.text,
        selector: params.selector,
        single: params.single || false,
        onlyDeveloper: params.onlyDeveloper || false,
        type: params.type || 'number',
        min: params.min || (params.numberType === 'float' ? 0.01 : 0),
        max: params.max,
        step: params.step,
        numberType: params.numberType || 'int',
        fileType: params.fileType,
        canAddTag: params.canAddTag,
        bold: params.bold || false,
        desc: params.desc,
        default: params.default,
        get attributes() {
            const array = [];
            for (const name in params) {
                array.push({
                    name: name,
                    value: params[name]
                });
            }
            return array;
        },
        nodeName: 'Input',
        getParams(props) {
            let selectors = props.selectors;
            let defaultSelector = props.defaultSelector;
            let fileDOM = props.fileDOM;
            let templateName = props.templateName;

            let param = null;
            const selectorType = removePars(this.selector);
            const selector = selectors[selectorType] || selectorType || selectors[defaultSelector];
            let value = '';
            if (!fileDOM.querySelector(selector)) {
                if (!this.canAddTag) {
                    console.warn(`Missing parameter\n\tName: '${this.attribute}',\n\tText: '${this.text}',\n\tSelector: '${selector}'.`);
                    return [];
                }
            } else {
                value = fileDOM.querySelector(selector).getAttribute(this.attribute);
            }

            param = {
                name: this.attribute,
                text: getTextFromTemplate(this.text, templateName),
                value: value,
                selector: selector,
                paramType: 'input',
                inputType: 'text',
                onlyDeveloper: this.onlyDeveloper,
                type: this.type,
                min: this.min,
                max: this.max,
                step: this.step,
                numberType: this.numberType,
                fileType: this.fileType,
                bold: this.bold,
                desc: getDescription(this.desc, templateName),
                default: this.default
            };

            return [param];
        }
    });
}

/**
 * params: 
 * - **attribute** [string]
 * - **text** [string]
 * - **selector** [string]
 * - **single** [bool]
 * - **onlyDeveloper** [bool]
 * @returns {object} Select
 */
export function Select(params, children) {
    return ({
        attribute: params.attribute,
        text: params.text,
        selector: params.selector,
        single: params.single,
        onlyDeveloper: params.onlyDeveloper,
        children: children,
        bold: params.bold,
        canAddTag: params.canAddTag,
        desc: params.desc,
        default: params.default,
        get attributes() {
            const array = [];
            for (const name in params) {
                array.push({
                    name: name,
                    value: params[name]
                });
            }
            return array;
        },
        nodeName: 'Select',
        getParams(props) {
            let selectors = props.selectors;
            let defaultSelector = props.defaultSelector;
            let fileDOM = props.fileDOM;
            let templateName = props.templateName;

            let param = null;
            const selectorType = removePars(this.selector);
            const selector = selectors[selectorType] || selectorType || selectors[defaultSelector];
            let value = null;
            if (!fileDOM.querySelector(selector)) {
                if (!this.canAddTag) {
                    console.warn(`Missing parameter\n\tName: '${this.attribute}',\n\tText: '${this.text}',\n\tSelector: '${selector}'.`);
                    return [];
                }
            } else {
                value = fileDOM.querySelector(selector).getAttribute(this.attribute);
            }

            let options = [];
            for (const option of this.children) {
                const text_1 = option.text;
                options.push({
                    text: getTextFromTemplate(text_1, templateName),
                    value: option.value
                });
            }
            param = {
                name: this.attribute,
                text: getTextFromTemplate(this.text, templateName),
                value: value,
                selectParams: options,
                selector: selector,
                paramType: 'input',
                inputType: 'select',
                onlyDeveloper: this.onlyDeveloper,
                bold: this.bold,
                desc: getDescription(this.desc, templateName),
                default: this.default
            };

            return [param];
        }
    });
}

/**
 * params:
 * - **text** [string]
 * - **value** [string]
 * @returns {object} Option
 */
export function Opt(params) {
    return ({
        text: params.text,
        value: params.value,
        get attributes() {
            const array = [];
            for (const name in params) {
                array.push({
                    name: name,
                    value: params[name]
                });
            }
            return array;
        },
        nodeName: 'Option'
    });
}

/**
 * @returns {object} Selectors
 */
export function Selectors(children) {
    return ({
        children: children,
        nodeName: 'Selectors',
        attributes: [],
        toObject() {
            const obj = {}
            for (const child of children) {
                obj[child.id] = child.value.replaceAll('#every(', '[SXMLE_ID="-CYCLE')
                    .replaceAll('#first(', '[SXMLE_ID="-F_CYCLE')
                    .replaceAll('#last(', '[SXMLE_ID="-L_CYCLE')
                    .replaceAll('#every', '[SXMLE_ID="-CYCLE1-"]')
                    .replaceAll('#first', '[SXMLE_ID="-F_CYCLE1-"]')
                    .replaceAll('#last', '[SXMLE_ID="-L_CYCLE1-"]');
                for (let i = 1; i <= 20; i++) {
                    obj[child.id] = obj[child.id].replaceAll(`#${i}-th(`, `[SXMLE_ID="-N${i}_CYCLE`);
                }
                obj[child.id] = obj[child.id].replaceAll(')', '-"]').replaceAll('.', ' > ');
            }

            for (const id in obj) {
                for (const id2 in obj) {
                    obj[id2] = obj[id2].replace(`{${id}}`, obj[id]);
                }
            }
            return obj;
        }
    });
}

/**
 * params: 
 * - **id** [string]
 * - **value** [string]
 * @returns {object} Selector
 */
export function Selector(params) {
    return ({
        id: params.id,
        value: params.value,
        nodeName: 'Selector',
        get attributes() {
            const array = [];
            for (const name in params) {
                array.push({
                    name: name,
                    value: params[name]
                });
            }
            return array;
        }
    });
}
