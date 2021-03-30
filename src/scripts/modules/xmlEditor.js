import { get, getText, create, prettify } from '../service/funcs.js'
import renderer from '../service/renderer.js'
import templates from '../service/templates.js'

const $paramsTable = get('#parameters')
const $saveParamsButton = get('#save-params')
const $title = get('#title')

let config = null
let filePath = null
let currentDLC = localStorage.getItem('currentDLC')
let fileDOM = null

$saveParamsButton.onclick = generateAndSaveFile

checkData()

function checkData() {
    renderer.get('config', data => {
        config = data
        renderer.get('filePath', data => {
            filePath = data || localStorage.getItem('filePath')
            if (filePath.split('/').length !== 1) {
                let a = filePath.split('/')
                $title.innerText = prettify(a[a.length-1].replace('.xml', '')).toUpperCase()
            }
            else {
                let a = filePath.split('\\')
                $title.innerText = prettify(a[a.length-1].replace('.xml', '')).toUpperCase()
            }
            
            renderer.call('getFileData', [filePath, localStorage.getItem('fileDLCPath')], data => {
                loadFile(data)
            })
        })
    })
}

function loadFile(file) {
    const parser = new DOMParser()

    fileDOM = parser.parseFromString(`<root>${file}</root>`, 'text/xml')
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
    createItems(params)
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
        const $group = create('div', {
            class: 'group',
            style: {
                paddingLeft: tabs * 10 + 'px'
            }
        })
        const $groupCont = create('div', {
            class: 'group-cont'
        })
        const $param = create('div')
        const $text = create('div', {
            class: 'param-text',
            style: {
                paddingLeft: tabs * 10 + 'px'
            }
        })
        const $value = create('div', {
            class: 'param-value'
        })

        $param.append($text, $value)
        $group.addEventListener('click', () => {
            if ($groupCont.style.display === 'none' || getComputedStyle($groupCont).display === 'none') {
                $group.innerText = $group.innerText.replace('▼', '▲')
                $groupCont.style.display = 'block'
                $groupCont.style.height = '0px'
                setTimeout(() => {
                    let height = 0
                    for (const $child of $groupCont.children) {
                        let style = getComputedStyle($child)
                        if (style.display !== 'none') {
                            height += +style.height.replace('px', '')
                        }
                    }
                    $groupCont.style.height = `${height}px`
                    setTimeout(() => {
                        $groupCont.style.removeProperty('height')
                    }, 500)
                }, 50)
            } else {
                let height = 0
                for (const $child of $groupCont.children) {
                    let style = getComputedStyle($child)
                    if (style.display !== 'none') {
                        height += +style.height.replace('px', '')
                    }
                }
                $groupCont.style.height = `${height}px`
                setTimeout(() => {
                    $groupCont.style.height = '0px'
                    setTimeout(() => {
                        $groupCont.style.display = 'none'
                    }, 500)
                    $group.innerText = $group.innerText.replace('▲', '▼')
                }, 100)
            }
        })

        if (param.paramType === 'group') {
            if (param.groupItems.length === 0) {
                continue
            }
            $group.innerText = `▼  ${param.groupName}`
            if ($parentGroupCont !== null) {
                $parentGroupCont.append($group, $groupCont)
            }
            else {
                $paramsTable.append($group, $groupCont)
            }
            createItems(param.groupItems, $groupCont, tabs + 1)
        }
        else {
            $text.innerText = param.text

            if (param.paramType === 'info') {
                $value.innerText = param.value
                $param.className = 'info'
            } else if (param.paramType === 'input') {
                $param.className = 'info'
                $param.setAttribute('name', param.name)
                $param.setAttribute('selector', param.selector)

                let $input;
                if (param.inputType === 'select') {
                    $input = createSelect(param.selectParams, param.value)
                }
                else if (param.type === 'file') {
                    $input = create('div')
                    for (let fileName of param.value.split(',')) {
                        fileName = fileName.replaceAll(' ', '')
                        const $button = create('button', {
                            class: 'openFile',
                            innerText: 'Посмотреть'
                        })
                        $button.addEventListener('click', () => {
                            if (currentDLC) {
                                localStorage.setItem('fileDLCPath', `${config.pathToDLC}\\${currentDLC}\\classes\\${param.fileType}\\${fileName}.xml`)
                            }
                            localStorage.setItem('filePath', `${config.pathToClasses}\\${param.fileType}\\${fileName}.xml`)
                            
                            renderer.call('openWindow', 'xmlEditor')
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
                        if (param.min !== '-∞') {
                            $input.min = param.min || 0
                        }
                        if (param.max) {
                            $input.max = param.max
                        }
                        $input.addEventListener('change', () => {
                            let value = $input.value
                            const min = $input.min
                            const max = $input.max
                            
                            if (min !== '' && value < +min) {
                                $input.value = value = min
                            }
                            else if (max !== '' && value > +max) {
                                $input.value = value = max
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
                $input.className = 'param-input'
                if (param.onlyDeveloper) {
                    $input.title = getText('[ONLY_DEVELOPER_EDIT_TEXT]')
                    //if (!developerMode) {
                        if (param.type === 'coordinates') {
                            for (const $cInput of $input.querySelectorAll('input')) {
                                $cInput.setAttribute('disabled', true)
                            }
                        }
                        else {
                            $input.setAttribute('disabled', true)    
                        }
                    //}
                    // else {
                    //     if (param.type === 'coordinates') {
                    //         for (const $cInput of $input.querySelectorAll('input')) {
                    //             $cInput.classList.add('dev-enabled')
                    //         }
                    //     }
                    //     else {
                    //         $input.classList.add('dev-enabled')
                    //     }
                    // }                    
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

    const xmlString = copyrightText + serializer.serializeToString(fileDOM).replace('<root>', '').replace('</root>', '')
    renderer.call('setFileData', [filePath, xmlString], window.close)
}
