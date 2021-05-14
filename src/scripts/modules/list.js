import '../bootstrap/bootstrap.bundle.min.js'
import '../service/menu.js'
import '../service/translate.js'

import { funcs } from '../service/renderer.js'
import { create, get, getIngameText, prettify } from '../service/funcs.js'

const $list = get('#list')
const $dlcList = get('#dlc-list')
const $modsList = get('#mods-list')
const parser = new DOMParser()

const listType = local.listType

addItems()

function addItems() {
    if (!config.settings.disableMods) {
        const modsArray = funcs.getList(listType, 'mods')
        for (const mod of modsArray) {
            for (const item of mod.items) {
                $modsList.append(createListItem(item.name, item.path, null, mod.id))
            }
        }
    }

    if (!config.settings.disableDLC) {
        const dlcArray = funcs.getList(listType, 'dlc')
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

function createListItem(name, path, dlcName=null, modId=null) {
    const data = `<root>${funcs.getFileData(path)}</root>`
    const DOM = parser.parseFromString(data, 'text/xml')
    if (DOM.querySelector('parsererror')) {
        return ''
    }
    let innerName
    if (DOM.querySelector('GameData > UiDesc')) {
        const uiName = DOM.querySelector('GameData > UiDesc').getAttribute('UiName') 
        innerName = getIngameText(uiName, modId) || uiName
    }

    const $item = create('div', {
        class: 'item',
        file_path: path,
        dlc_name: dlcName,
        mod_id: modId
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
        let path = `../truck_images/${name}.jpg`
        if (modId && DOM.querySelector('GameData > UiDesc')) {
            const imgName = DOM.querySelector('GameData > UiDesc').getAttribute('UiIcon328x458')
            path = `../scripts/modsTemp/${modId}/ui/textures/${imgName}.png`
        }
        $item.append(create('img', {
            src: path
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
        local.currentMod = $item.getAttribute('mod_id')
        funcs.openXMLEditor()
    })

    return $item
}
