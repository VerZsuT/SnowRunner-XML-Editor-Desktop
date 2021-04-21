import { create, get } from './funcs.js'
import { props, funcs } from './renderer.js'

const $menu = get('#menu')
let menu = $menu.getAttribute('short')? props.shortMenu : props.menu

if (menu) {
    for (const $item of menu) {
        $menu.append(buildMenu($item, true))
    }
}

function buildMenu(template, root=false) {
    if (template.role === 'separator') {
        return create('hr', {
            class: 'dropdown-divider'
        })
    }
    const id = Math.random()
    const $root = create('div', {
        class: `menu-item${!root? ' dropright' : ''}`
    })
    const $button = create('button', {
        class: 'btn btn-sm dropdown-item',
        id: id,
        innerText: template.label
    })
    let $list

    if (template.submenu) {
        $list = create('ul', {
            class: 'dropdown-menu',
            'aria-labelledby': id
        })
        $button.setAttribute('data-bs-toggle', 'dropdown')
        for (const $item of template.submenu) {
            const $listItem = buildMenu($item)
            $list.append($listItem)
        }
    }

    if (template.role) {
        switch (template.role) {
            case 'quit-app':
                $button.addEventListener('click', () => funcs.quit())
                break
            case 'open-link':
                $button.addEventListener('click', () => funcs.openLink(template.url))
                break
            case 'show-file':
                $button.addEventListener('click', () => funcs.showFile(template.path))
                break
            case 'show-folder':
                $button.addEventListener('click', () => funcs.showFolder(template.path))
                break
            case 'language':
                $button.addEventListener('click', () => funcs.setLang(template.label))
                break
            case 'reset-config':
                $button.addEventListener('click', () => funcs.resetConfig())
                break
            case 'devmode':
                if (template.checked) $button.classList.add('active')
                $button.addEventListener('click', () => funcs.setDevMode(!template.checked))
                break
            case 'restore-initial':
                $button.addEventListener('click', () => funcs.restoreInitial())
                break
            case 'save-backup':
                $button.addEventListener('click', () => funcs.saveBackup())
                break
            case 'open-editor':
                if (template.dlc) {
                    $button.addEventListener('click', () => funcs.openXMLEditor(template.path, template.dlc))
                }
                else {
                    $button.addEventListener('click', () => funcs.openXMLEditor(template.path))
                }
                break
        }
    }

    $root.append($button)
    if ($list) {
        $root.append($list)
        return $root
    }
    else {
        return $button
    }
}