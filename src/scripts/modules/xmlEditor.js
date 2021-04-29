import '../bootstrap/bootstrap.bundle.min.js'
import '../service/menu.js'
import '../service/translate.js'

import { get, getText, create, prettify, getIngameText } from '../service/funcs.js'
import { props, funcs } from '../service/renderer.js'
import templates from '../service/templates.js'

const $paramsTable = get('#parameters')
const $saveParamsButton = get('#save-params')
const $backButton = get('#back')
const $title = get('#title')

const devMode = config.devMode
let filePath = null
let currentDLC = null
let fileDOM = null

$saveParamsButton.onclick = generateAndSaveFile
$backButton.onclick = window.close

checkData()

function checkData() {
    const indexFilePath = props.filePath
    const indexCurrentDLC = props.currentDLC

    filePath = indexFilePath || local.filePath
    currentDLC = indexCurrentDLC || local.currentDLC
    if (filePath.split('/').length !== 1) {
        let a = filePath.split('/')
        $title.innerText = prettify(a[a.length-1].replace('.xml', '')).toUpperCase()
    }
    else {
        let a = filePath.split('\\')
        $title.innerText = prettify(a[a.length-1].replace('.xml', '')).toUpperCase()
    }
    
    const fileData = funcs.getFileData(filePath, local.fileDLCPath)
    if (!fileData) return
    loadFile(fileData)
}

function loadFile(file) {
    const parser = new DOMParser()

    fileDOM = parser.parseFromString(`<root>${file}</root>`, 'text/xml')

    let ingameText
    if (fileDOM.querySelectorAll('GameData UiDesc').length === 1) {
        const text = fileDOM.querySelector('GameData UiDesc').getAttribute('UiName')
        ingameText = getIngameText(text) || text
    }
    if (ingameText) $title.innerText = ingameText

    const comments = []
    for (const child of fileDOM.querySelector('root').childNodes) {
        if (child.nodeType === 8) {
            comments.push(child)
        }
    }
    
    for (const comment of comments) {
        comment.remove()
    }

    if (fileDOM.querySelector('root').childNodes[0].nodeValue === '\n') {
        fileDOM.querySelector('root').childNodes[0].remove()
    }

    initParams()
}

function initParams() {
    let template
    let name

    for (let tmp in templates) {
        let selector = `root > ${templates[tmp].selector}`
        if (fileDOM.querySelector(selector)) {
            template = templates[tmp]
            name = tmp
            break
        }
    }

    const params = parseTemplate(template.main, name)
    createItems(params, get('#parameters'))
}

function parseTemplate(obj, name) {
    const selectors = obj[1].toObject()
    const template = obj[0]
    
    return template.getParams({selectors: selectors, fileDOM: fileDOM, templateName: name})
}

function parseCoords(string) {
    return string.replace('(', '').replace(')', '').replaceAll(' ', '').split(';')
}

function createItems(params, $parentGroupCont=null, tabs=1) {
    for (const param of params) {
        const id = Math.round(Math.random() * 1000000)
        const id2 = Math.round(Math.random() * 1000000)
        const id3 = Math.round(Math.random() * 1000000)
        const $root = create('div', {
            class: 'accordion-item'
        })
        const $groupHeader = create('div', {
            class: 'accordion-header',
            id: `_${id2}`,
            style: {
                paddingLeft: tabs * 10 + 'px'
            }
        })
        const $groupHeaderCont = create('div', {
            class: 'group accordion-button collapsed',
            'data-bs-toggle': 'collapse',
            'data-bs-target': `#_${id}`,
            'aria-expanded': 'false',
            style: {
                paddingLeft: tabs * 5 + 'px'
            }
        })
        const $groupContainer = create('div', {
            class: `group-cont accordion-collapse collapse`,
            'aria-labelledby': `_${id2}`,
            id: `_${id}`
        })
        const $groupContent = create('div', {
            id: `_${id3}`,
            class: 'accordion-body'
        })
        const $param = create('div', {
            class: 'list-group-item'
        })
        const $text = create('div', {
            class: 'param-text',
            style: {
                paddingLeft: tabs * 10 + 'px',
                fontWeight: param.bold? 'bold' : 'normal' 
            }
        })
        const $value = create('div', {
            class: 'param-value'
        })

        if ($parentGroupCont) {
            $groupContainer.setAttribute('data-bs-parent', `#${$parentGroupCont.id}`)
            $groupHeaderCont.onclick = () => {
                setTimeout(() => {
                    $parentGroupCont.classList.add('show')
                }, 1000)
            }
        }
        

        $param.append($text, $value)

        if (param.paramType === 'group') {
            if (param.groupItems.length === 0) {
                continue
            }
            $groupHeader.innerText = param.groupName
            if ($parentGroupCont !== null) {
                $groupContainer.append($groupContent)
                $groupHeaderCont.append($groupHeader)
                $root.append($groupHeaderCont, $groupContainer)
                $parentGroupCont.append($root)
            }
            else {
                $groupContainer.append($groupContent)
                $groupHeaderCont.append($groupHeader)
                $root.append($groupHeaderCont, $groupContainer)
                $paramsTable.append($root)
            }
            createItems(param.groupItems, $groupContent, tabs + 1)
        }
        else {
            $text.innerText = param.text
            if (param.paramType === 'input') {
                $param.className = 'info'
                $param.setAttribute('name', param.name)
                $param.setAttribute('selector', param.selector)

                let $input;
                if (param.inputType === 'select') {
                    $input = createSelect(param.selectParams, param.value)
                    $input.classList.add('form-select')
                }
                else if (param.type === 'file') {
                    $input = create('div')
                    for (let fileName of param.value.split(',')) {
                        fileName = fileName.replaceAll(' ', '')
                        const $button = create('button', {
                            class: 'openFile btn btn-secondary btn-sm',
                            innerText: getText('[EDIT_FILE_BUTTON]')
                        })
                        $button.addEventListener('click', () => {
                            if (currentDLC) {
                                local.fileDLCPath = `${config.pathToDLC}\\${currentDLC}\\classes\\${param.fileType}\\${fileName}.xml`
                            }
                            local.filePath = `${config.pathToClasses}\\${param.fileType}\\${fileName}.xml`
                            
                            funcs.openXMLEditor()
                        })
                        $input.append($button)
                    }
                }
                else if (param.type === 'coordinates') {
                    const [x, y, z] = parseCoords(param.value)
                    const $xSpan = create('span', {
                        innerText: 'X: '
                    })
                    const $ySpan = create('span', {
                        innerText: 'Y: '
                    })
                    const $zSpan = create('span', {
                        innerText: 'Z: '
                    })
                    const $xInput = create('input', {
                        class: 'x-input',
                        value: x,
                        type: 'number'
                    })
                    const $yInput = create('input', {
                        class: 'y-input',
                        value: y,
                        type: 'number'
                    })
                    const $zInput = create('input', {
                        class: 'z-input',
                        value: z,
                        type: 'number'
                    })
                    $input = create('div')
                    $input.append($xSpan, $xInput, $ySpan, $yInput, $zSpan, $zInput)
                }
                else {
                    $input = create('input', {
                        type: param.type,
                        value: param.value
                    })

                    if (param.type === 'number') {
                        if (!config.disableLimits) {
                            if (param.min !== '-∞') {
                                $input.min = param.min || 0
                            }
                            if (param.max) {
                                $input.max = param.max
                            }
                        }
                        $input.addEventListener('change', () => {
                            const min = $input.min
                            const max = $input.max
                            let value = $input.value

                            if (!config.disableLimits) {
                                if (min !== '' && value < +min) {
                                    $input.value = value = min
                                }
                                else if (max !== '' && value > +max) {
                                    $input.value = value = max
                                }
                            }

                            if (param.numberType === 'int') {
                                $input.step = '1'
                                $input.value = parseInt(value)
                            }
                            else if (param.numberType === 'float') {
                                $input.step = '0.1'
                                $input.value = parseFloat(value)
                            }
                        })
                    }
                    if (!param.value) {
                        $input.placeholder = getText('[BY_DEFAULT]')
                    }
                }
                $input.classList.add('param-input')
                if (!$input.querySelector('button')) {
                    $input.classList.add('form-control')
                }
                if (param.onlyDeveloper) {
                    $input.title = getText('[ONLY_DEVELOPER_EDIT_TEXT]')
                    if (!devMode) {
                        if (param.type === 'coordinates') {
                            for (const $cInput of $input.querySelectorAll('input')) {
                                $cInput.setAttribute('disabled', true)
                            }
                        }
                        else {
                            $input.setAttribute('disabled', true)    
                        }
                    }
                    else {
                        if (param.type === 'coordinates') {
                            for (const $cInput of $input.querySelectorAll('input')) {
                                $cInput.classList.add('dev-enabled')
                            }
                        }
                        else {
                            $input.classList.add('dev-enabled')
                        }
                    }                    
                }
                let f = () => {
                    $param.className = $param.className.replace('info', 'param')
                    $input.removeEventListener('change', f)
                }
                $input.addEventListener('change', f)
                $value.append($input)
            }

            if ($parentGroupCont !== null) {
                $parentGroupCont.append($param)
            }
            else {
                $paramsTable.append($param)
            }
        }
    }
}

function createSelect(options, selectedValue) {
    const $select = create('select')
    let haveValue = false

    for (const option of options) {
        const $optionElement = create('option', {
            innerText: option.text,
            value: option.value
        })
        
        if (option.value === selectedValue) {
            $optionElement.setAttribute('selected', 'selected')
            haveValue = true
        }
        $select.append($optionElement)
    }

    if (!haveValue) {
        $select.querySelector('option[value="__DefaultSelectValue__"]').setAttribute('selected', 'selected')
    }

    return $select
}

function toCoordsString($div) {
    const x = $div.querySelector('.x-input').value || 0
    const y = $div.querySelector('.y-input').value || 0
    const z = $div.querySelector('.z-input').value || 0

    return `(${x}; ${y}; ${z})`
}

function generateAndSaveFile() {
    const serializer = new XMLSerializer()
    const $$params = $paramsTable.querySelectorAll('.param')
    const copyrightText = `<!--\n\tEdited by: SnowRunner XML Editor Desktop\n\tVersion: v${config.version}\n\tAuthor: VerZsuT\n\tSite: https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/\n-->\n`

    for (const $param of $$params) {
        const selector = $param.getAttribute('selector')
        const $obj = fileDOM.querySelector(selector)
        const name = $param.getAttribute('name')
        const $input = $param.querySelector('.param-input')
        const value = $input.value

        if (value === undefined) {
            value = toCoordsString($input)
        }

        if (value == '__DefaultSelectValue__') {
            continue
        }

        $obj.setAttribute(name, value)
    }

    for (const item of fileDOM.querySelectorAll('[SXMLE_ID]')) {
        item.removeAttribute('SXMLE_ID')
    }

    const xmlString = `${config.disableEditorLabel? '' : copyrightText}${serializer.serializeToString(fileDOM).replace('<root>', '').replace('</root>', '')}`
    funcs.setFileData(filePath, xmlString)
    funcs.saveToOriginal()
    window.close()
}
