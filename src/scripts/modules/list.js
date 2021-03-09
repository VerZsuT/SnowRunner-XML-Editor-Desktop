import DataTunnel from '../service/DataTunnel.js'
import { create, get, prettify } from '../service/funcs.js'

const $list = get('#list')

const listType = localStorage.getItem('listType')
const dataTunnel = new DataTunnel()

dataTunnel.call('getList', listType, addItems)

function addItems(array) {
    for (const item of array) {
        $list.append(createListItem(item.name, item.path))
    }
}

function createListItem(name, path) {
    const $item = create('div', {
        class: 'item',
        file_path: path
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

    $item.addEventListener('click', () => {
        localStorage.setItem('filePath', $item.getAttribute('file_path'))
        dataTunnel.invoke('openWindow', 'xmlEditor')
    })

    return $item
}
