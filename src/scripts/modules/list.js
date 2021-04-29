import '../bootstrap/bootstrap.bundle.min.js'
import '../service/menu.js'
import '../service/translate.js'

import { funcs } from '../service/renderer.js'
import { create, get, getIngameText, prettify } from '../service/funcs.js'

const $list = get('#list')
const $dlcList = get('#dlc-list')
const parser = new DOMParser()

const listType = local.listType

addItems()

function addItems() {
    if (!config.disableDLC) {
        const dlcArray = funcs.getList(listType, true)
        for (const dlc of dlcArray) {
            for (const item of dlc.items) {
                $dlcList.append(createListItem(item.name, item.path, dlc.name))
            }
        }
    }
    
    const mainArray = funcs.getList(listType)
    for (const item of mainArray) {
        $list.append(createListItem(item.name, item.path))
    }
}

function createListItem(name, path, dlcName=null) {
    const data = `<root>${funcs.getFileData(path)}</root>`
    const DOM = parser.parseFromString(data, 'text/xml')
    let innerName
    if (DOM.querySelectorAll('GameData > UiDesc').length === 1) {
        const uiName = DOM.querySelector('GameData > UiDesc').getAttribute('UiName') 
        innerName = getIngameText(uiName) || uiName
    }

    const $item = create('div', {
        class: 'item',
        file_path: path,
        dlc_name: dlcName
    })

    $item.append(create('span', {
        class: 'item-text',
        innerText: innerName || prettify(name)
    }))
    if (listType === 'cargo') {
        $item.append(create('img', {
            src: `../icons/cargo_item.png`
        }))    
    }
    else if (listType === 'trucks') {
        $item.append(create('img', {
            src: `../truck_images/${name}.jpg`
        }))
    }
    else if (listType === 'trailers') {
        $item.append(create('img', {
            src: `../icons/trailer_item.png`
        }))
    }

    $item.addEventListener('click', () => {
        local.filePath = $item.getAttribute('file_path')
        local.currentDLC = $item.getAttribute('dlc_name')
        funcs.openXMLEditor()
    })

    return $item
}
