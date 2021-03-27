import { removePars, getTextFromTemplate, getText } from './funcs.js'

export function Template(params, children) {
    return ({
        type: params.type,
        itemSelector: params.itemSelector,
        replaceName: 'CYCLE',
        single: params.single || false,
        children: children,
        get attributes() {
            const array = []
            for (const name in params) {
                array.push({name: name, value: params[name]})
            }
            return array
        },
        nodeName: 'Template',
        getParams(props) {
            let selectors = props.selectors
            let defaultSelector = props.defaultSelector || null
            let onlySingle = props.onlySingle || false
            let tCycleNumber = props.tCycleNumber || 1
            let tNumber = props.tNumber || 1
            let multiply = props.multiply
            let fileDOM = props.fileDOM
            let templateId = props.templateId

            if (multiply === undefined) {
                multiply = (this.type === 'Multiply')
            }

            let params = []
            let newSelectors = {}
            if (multiply) {
                const items = fileDOM.querySelectorAll(selectors[removePars(this.itemSelector)])
                let currentNum = 1
                for (const item of items) {
                    if (currentNum < this.startWith) {
                        continue
                    }
                    const id = Math.round(Math.random() * Math.pow(10, 10))
                    item.setAttribute('SXMLE_ID', id)
                    for (const selector in selectors) {
                        newSelectors[selector] = selectors[selector].replaceAll(`-${this.replaceName}${tNumber}-`, id)
                        if (currentNum === 1) {
                            newSelectors[selector] = newSelectors[selector].replaceAll(`-F_${this.replaceName}${tNumber}-`, id)
                        }
                        else if (currentNum === items.length) {
                            newSelectors[selector] = newSelectors[selector].replaceAll(`-L_${this.replaceName}${tNumber}-`, id)
                        }
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-N${currentNum}_${this.replaceName}${tNumber}-`, id)
                    }
                    params = params.concat(this.getParams({
                        selectors: newSelectors, 
                        defaultSelector: defaultSelector,
                        onlySingle: false, 
                        multiply: false,
                        tCycleNumber: currentNum,
                        fileDOM: fileDOM,
                        tNumber: multiply ? tNumber + 1 : tNumber,
                        templateId: templateId
                    }))
                    currentNum++
                }
                params = params.concat(this.getParams({
                    selectors: newSelectors, 
                    defaultSelector: defaultSelector, 
                    onlySingle: true, 
                    multiply: false,
                    fileDOM: fileDOM,
                    tNumber: tNumber,
                    templateId: templateId
                }))
                return params
            }
            for (const child of this.children) {
                if ((onlySingle && !child.single) || (!onlySingle && child.single)) {
                    return []
                }
                params = params.concat(child.getParams({
                    selectors: selectors,
                    defaultSelector: defaultSelector,
                    onlySingle: onlySingle,
                    cycleNumber: tCycleNumber,
                    tNumber: multiply ? tNumber + 1 : tNumber,
                    fileDOM: fileDOM,
                    templateId: templateId
                }))
            }
            return params
        }
    })
}

export function Group(params, children) {
    return ({
        name: params.name,
        nameType: params.nameType || 'Static',
        nameSelector: params.nameSelector,
        nameAttribute: params.nameAttribute,
        defaultSelector: params.defaultSelector,
        single: params.single || false,
        withCounter: params.withCounter || false,
        children: children,
        get attributes() {
            const array = []
            for (const name in params) {
                array.push({name: name, value: params[name]})
            }
            return array
        },
        nodeName: 'Group',
        getParams(props) {
            let selectors = props.selectors
            let defaultSelector = props.defaultSelector || null
            let onlySingle = props.onlySingle || false
            let cycleNumber = props.cycleNumber
            let fileDOM = props.fileDOM
            let templateId = props.templateId

            let param = null
            let params = []
            let groupName;
            if (this.nameType !== 'Static') {
                const nameSelector = removePars(this.nameSelector)
                const $nameElement = fileDOM.querySelector(selectors[nameSelector] || nameSelector)

                if ($nameElement === null) {
                    return params
                }

                if (this.nameType === 'Computed') {
                    const nameAttribute = this.nameAttribute
                    groupName = $nameElement.getAttribute(nameAttribute)
                } else if (this.nameType === 'TagName') {
                    groupName = $nameElement.nodeName
                }
            } else {
                groupName = this.name
            }

            if (this.single) {
                for (const child of this.children) {
                    child.single = true
                }
            }
            const groupDefaultSelector = removePars(this.defaultSelector)
            for (const child of this.children) {
                if ((onlySingle && !child.single) || (!onlySingle && child.single)) {
                    continue
                }
                params = params.concat(child.getParams({
                    selectors: selectors, 
                    defaultSelector: groupDefaultSelector || defaultSelector, 
                    onlySingle: onlySingle,
                    tNumber: props.tNumber,
                    fileDOM: fileDOM,
                    templateId: templateId
                }))
            }
            groupName = getTextFromTemplate(groupName, templateId) || getText(groupName)
            if (this.withCounter) {
                groupName += ` ${cycleNumber}`
            }

            param = {
                paramType: 'group',
                groupName: groupName,
                groupItems: params
            }
            return [param]
        }
    })
}

export function Input(params) {
    return ({
        attribute: params.attribute,
        text: params.text,
        selector: params.selector,
        single: params.single || false,
        onlyDeveloper: params.onlyDeveloper || false,
        type: params.type || 'number',
        min: params.min || params.numberType === 'float' ? 0.01 : 0,
        max: params.max,
        numberType: params.numberType || 'int',
        fileType: params.fileType,
        get attributes() {
            const array = []
            for (const name in params) {
                array.push({name: name, value: params[name]})
            }
            return array
        },
        nodeName: 'Input',
        getParams(props) {
            let selectors = props.selectors
            let defaultSelector = props.defaultSelector
            let fileDOM = props.fileDOM
            let templateId = props.templateId

            let param = null
            const selectorType = removePars(this.selector)
            const selector = selectors[selectorType] || selectorType || selectors[defaultSelector]
            if (!fileDOM.querySelector(selector)) {
                console.warn(`Missing parameter\n\tName: '${this.attribute}',\n\tText: '${this.text}',\n\tSelector: '${selector}'.`)
                return []
            }
            const value = fileDOM.querySelector(selector).getAttribute(this.attribute)

            param = {
                name: this.attribute,
                text: getTextFromTemplate(this.text, templateId) || getText(this.text),
                value: value,
                selector: selector,
                paramType: 'input',
                inputType: 'text',
                onlyDeveloper: this.onlyDeveloper,
                type: this.type,
                min: this.min,
                max: this.max,
                numberType: this.numberType,
                fileType: this.fileType
            }

            return [param]
        }
    })
}

export function Info(params) {
    return ({
        attribute: params.attribute,
        text: params.text,
        selector: params.selector,
        single: params.single || false,
        onlyDeveloper: params.onlyDeveloper || false,
        get attributes() {
            const array = []
            for (const name in params) {
                array.push({name: name, value: params[name]})
            }
            return array
        },
        nodeName: 'Info',
        getParams(props) {
            let selectors = props.selectors
            let defaultSelector = props.defaultSelector
            let fileDOM = props.fileDOM
            let templateId = props.templateId

            let param = null
            const selectorType = removePars(this.selector)
            const selector = selectors[selectorType] || selectorType || selectors[defaultSelector]
            if (!fileDOM.querySelector(selector)) {
                console.warn(`Missing parameter\n\tName: '${this.attribute}',\n\tText: '${this.text}',\n\tSelector: '${selector}'.`)
                return []
            }
            const value = fileDOM.querySelector(selector).getAttribute(this.attribute)
            param = {
                text: getTextFromTemplate(this.text, templateId) || getText(this.text),
                value: value,
                paramType: 'info'
            }
            
            return [param]
        }
    })
}

export function Select(params, children) {
    return ({
        attribute: params.attribute,
        text: params.text,
        selector: params.selector,
        single: params.single,
        onlyDeveloper: params.onlyDeveloper,
        children: children,
        get attributes() {
            const array = []
            for (const name in params) {
                array.push({name: name, value: params[name]})
            }
            return array
        },
        nodeName: 'Select',
        getParams(props) {
            let selectors = props.selectors
            let defaultSelector = props.defaultSelector
            let fileDOM = props.fileDOM
            let templateId = props.templateId

            let param = null
            const selectorType = removePars(this.selector)
            const selector = selectors[selectorType] || selectorType || selectors[defaultSelector]
            if (!fileDOM.querySelector(selector)) {
                console.warn(`Missing parameter\n\tName: '${this.attribute}',\n\tText: '${this.text}',\n\tSelector: '${selector}'.`)
                return []
            }
            const value = fileDOM.querySelector(selector).getAttribute(this.attribute)
            
            let options = []
            let haveDefaultValue = false
            for (const option of this.children) {
                if (option.value === "__DefaultSelectValue__") {
                    haveDefaultValue = true
                }
            }
            if (!haveDefaultValue) {
                options.push({
                    text: getText('[BY_DEFAULT]'),
                    value: '__DefaultSelectValue__'
                })
            }
            for (const option of this.children) {
                const text_1 = option.text
                options.push({
                    text: getTextFromTemplate(text_1, templateId) || getText(text_1),
                    value: option.value
                })
            }
            param = {
                name: this.attribute,
                text: getTextFromTemplate(this.text, templateId) || getText(this.text),
                value: value,
                selectParams: options,
                selector: selector,
                paramType: 'input',
                inputType: 'select',
                onlyDeveloper: this.onlyDeveloper
            }
            
            return [param]
        }
    })
}

export function Opt(params) {
    return ({
        text: params.text,
        value: params.value,
        get attributes() {
            const array = []
            for (const name in params) {
                array.push({name: name, value: params[name]})
            }
            return array
        },
        nodeName: 'Option'
    })
}

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
                                           .replaceAll('#last', '[SXMLE_ID="-L_CYCLE1-"]')
                for (let i = 1; i <= 20; i++) {
                    obj[child.id] = obj[child.id].replaceAll(`#${i}-th(`, `[SXMLE_ID="-N${i}_CYCLE`)
                }
                obj[child.id] = obj[child.id].replaceAll(')', '-"]').replaceAll('.', ' > ')
            }

            for (const id in obj) {
                for (const id2 in obj) {
                    obj[id2] = obj[id2].replace(`{${id}}`, obj[id])
                }
            }
            return obj
        }
    })
}

export function Selector(params) {
    return ({
        id: params.id,
        value: params.value,
        nodeName: 'Selector',
        get attributes() {
            const array = []
            for (const name in params) {
                array.push({name: name, value: params[name]})
            }
            return array
        }
    })
}
