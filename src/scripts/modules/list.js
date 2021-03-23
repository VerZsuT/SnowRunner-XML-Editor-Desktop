import MainProc from '../service/MainProc.js'
import { create, get, prettify } from '../service/funcs.js'

const $list = get('#list')

const listType = localStorage.getItem('listType')
const mainProc = new MainProc()

addItems()

function addItems() {
    mainProc.call('getList', listType)
    .then((array) => {
        for (const item of array) {
            $list.append(createListItem(item.name, item.path))
        }
    }, alert)
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
    else if (listType === 'trailers') {
        $item.append(create('img', {
            src: `../icons/trailer_item.png`
        }))
    }

    $item.addEventListener('click', () => {
        localStorage.setItem('filePath', $item.getAttribute('file_path'))
        mainProc.call('openWindow', 'xmlEditor')
    })

    return $item
}
