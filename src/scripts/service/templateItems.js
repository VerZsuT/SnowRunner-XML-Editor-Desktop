import { removePars, getTextFromTemplate, getIngameText, getDescription } from './funcs.js';

class TemplateElement {
    get attributes() {
        const array = [];
        for (const name in this.params) {
            array.push({
                name: name,
                value: this.params[name]
            });
        }
        return array;
    }
}

class TemplateInputElement extends TemplateElement {
    constructor(params) {
        super();
        this.attribute = params.attribute
        this.params = params;
        this.text = params.text;
        this.default = params.default;
        this.selector = params.selector;
        this.bold = params.bold;
        this.onlyDeveloper = params.onlyDeveloper;
        this.default = params.default;
        this.canAddTag = params.canAddTag
        this.desc = params.desc
    }
}

class CTemplate extends TemplateElement {
    replaceName = 'CYCLE'
    nodeName = 'Template'

    constructor(params, children) {
        super();
        this.params = params;
        this.children = children;
        this.type = params.type;
        this.itemSelector = params.itemSelector;
    }

    getParams(props) {
        const selectors = props.selectors;
        const defaultSelector = props.defaultSelector || null;
        const tCycleNumber = props.tCycleNumber || 1;
        const tNumber = props.tNumber || 1;
        const fileDOM = props.fileDOM;
        const templateName = props.templateName;
        let counter = props.counter || 1;
        let multiply = props.multiply;

        if (multiply === undefined) {
            multiply = (this.type === 'multiply');
        }

        let params = [];
        let newSelectors = {};
        if (multiply) {
            const items = fileDOM.querySelectorAll(selectors[removePars(this.itemSelector)]);
            let currentNum = 1;
            for (const item of items) {
                item.setAttribute('SXMLE_ID', String(counter));
                for (const selector in selectors) {
                    newSelectors[selector] = selectors[selector].replaceAll(`-${this.replaceName}${tNumber}-`, String(counter));
                    if (currentNum === 1) {
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-F_${this.replaceName}${tNumber}-`, String(counter));
                    } else if (currentNum === items.length) {
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-L_${this.replaceName}${tNumber}-`, String(counter));
                    }
                    newSelectors[selector] = newSelectors[selector].replaceAll(`-N${currentNum}_${this.replaceName}${tNumber}-`, String(counter));
                }
                counter++;
                params = params.concat(this.getParams({
                    selectors: newSelectors,
                    defaultSelector: defaultSelector,
                    multiply: false,
                    tCycleNumber: currentNum,
                    fileDOM: fileDOM,
                    tNumber: multiply? tNumber+1 : tNumber,
                    templateName: templateName,
                    counter: counter
                }));
                currentNum++;
            }
        } else {
            for (const child of this.children) {
                params = params.concat(child.getParams({
                    selectors: selectors,
                    defaultSelector: defaultSelector,
                    cycleNumber: tCycleNumber,
                    tNumber: multiply? tNumber+1 : tNumber,
                    fileDOM: fileDOM,
                    templateName: templateName
                }));
            }
        }
        return params;
    }
}

class CGroup extends TemplateElement {
    nodeName = 'Group'

    constructor(params, children) {
        super();
        this.params = params
        this.children = children
        this.name = params.name
        this.nameType = params.nameType || 'static'
        this.nameSelector = params.nameSelector
        this.resNameSelector = params.resNameSelector
        this.nameAttribute = params.nameAttribute
        this.resNameAttribute = params.resNameAttribute
        this.defaultSelector = params.defaultSelector
        this.withCounter = params.withCounter || false
    }

    getParams(props) {
        const selectors = props.selectors;
        const defaultSelector = props.defaultSelector || null;
        const cycleNumber = props.cycleNumber;
        const fileDOM = props.fileDOM;
        const templateName = props.templateName;

        let param;
        let params = [];
        let groupName;
        if (this.nameType !== 'static') {
            const nameSelector = removePars(this.nameSelector);
            const resNameSelector = removePars(this.resNameSelector);

            const $nameElement = fileDOM.querySelector(selectors[nameSelector] || nameSelector);
            const $resNameElement = fileDOM.querySelector(selectors[resNameSelector] || resNameSelector);

            if ($nameElement === null && $resNameElement === null) {
                return params;
            }

            if (this.nameType === 'computed') {
                const nameAttribute = this.nameAttribute;
                const resNameAttribute = this.resNameAttribute;

                groupName = getIngameText($nameElement.getAttribute(nameAttribute)) || $resNameElement.getAttribute(resNameAttribute);
            } else if (this.nameType === 'tagName') {
                groupName = $nameElement.nodeName;
            }
        } else {
            groupName = this.name;
        }

        const groupDefaultSelector = removePars(this.defaultSelector);
        for (const child of this.children) {
            params = params.concat(child.getParams({
                selectors: selectors,
                defaultSelector: groupDefaultSelector || defaultSelector,
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
}

class CInput extends TemplateInputElement {
    nodeName = 'Input'

    constructor(params) {
        super(params);
        this.params = params;
        this.type = params.type || 'number'
        this.min = params.min || (params.numberType === 'float' ? 0.01 : 0)
        this.max = params.max
        this.step = params.step
        this.numberType = params.numberType || 'int'
        this.fileType = params.fileType
        this.areas = params.areas
    }

    getParams(props) {
        const selectors = props.selectors;
        const defaultSelector = props.defaultSelector;
        const fileDOM = props.fileDOM;
        const templateName = props.templateName;

        const selectorType = removePars(this.selector);
        const selector = selectors[selectorType] || selectorType || selectors[defaultSelector];
        let param = null;
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
            default: this.default,
            areas: this.areas
        };

        return [param];
    }
}

class CSelect extends TemplateInputElement {
    nodeName = 'Select'

    constructor(params, children) {
        super(params);
        this.params = params;
        this.children = children;
    }

    getParams(props) {
        let selectors = props.selectors;
        let defaultSelector = props.defaultSelector;
        let fileDOM = props.fileDOM;
        let templateName = props.templateName;
        
        const selectorType = removePars(this.selector);
        const selector = selectors[selectorType] || selectorType || selectors[defaultSelector];
        let param;
        let value;
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
}

class COption extends TemplateElement {
    nodeName = 'Option'

    constructor(params) {
        super();
        this.params = params;
        this.text = params.text;
        this.value = params.value;
    }
}

class CSelectors extends TemplateElement {
    nodeName = 'Selectors'

    constructor(children) {
        super();
        this.children = children;
    }

    toObject() {
        const obj = {}
        for (const child of this.children) {
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
}

class CSelector extends TemplateElement {
    nodeName = 'Selector'

    constructor(params) {
        super();
        this.params = params;
        this.id = params.id;
        this.value = params.value;
    }
}

export function Template(params, children) {
    return new CTemplate(params, children);
}

export function Group(params, children) {
    return new CGroup(params, children);
}

export function Input(params) {
    return new CInput(params);
}

export function Select(params, children) {
    return new CSelect(params, children);
}

export function Opt(params) {
    return new COption(params);
}

export function Selectors(children) {
    return new CSelectors(children);
}

export function Selector(params) {
    return new CSelector(params);
}
