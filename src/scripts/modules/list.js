import renderer from '../service/RendererProcess.js'
import { create, get, prettify } from '../service/funcs.js'

const $list = get('#list')
const $dlcList = get('#dlc-list')

const listType = localStorage.getItem('listType')

addItems()

function addItems() {
    renderer.call('getList', [listType, true], array => {
        for (const dlc of array) {
            for (const item of dlc.items) {
                $dlcList.append(createListItem(item.name, item.path, dlc.name))
            }
        }

        renderer.call('getList', listType, array => {
            for (const item of array) {
                $list.append(createListItem(item.name, item.path))
            }
        })
    })
}

function createListItem(name, path, dlcName=null) {
    const $item = create('div', {
        class: 'item',
        file_path: path,
        dlc_name: dlcName
    })

    $item.append(create('span', {
        class: 'item-text',
        innerText: prettify(name)
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
        localStorage.setItem('filePath', $item.getAttribute('file_path'))
        localStorage.setItem('currentDLC', $item.getAttribute('dlc_name'))
        renderer.call('openWindow', 'xmlEditor')
    })

    return $item
}
