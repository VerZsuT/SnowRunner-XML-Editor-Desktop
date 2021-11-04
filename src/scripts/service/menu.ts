import { create, t, setHotKey } from './funcs'
import mainProcess from './mainProcess'

const $menu = create<HTMLDivElement>('div', {id: 'menu'})
const menu = mainProcess.menu

for (const $item of menu) {
    $menu.append(buildMenu($item, true))
}

document.body.prepend($menu)

/**
 * Создаёт меню на основе шаблона.
 * @param template - шаблон.
*/
function buildMenu(template: IMenuTemplate, root?: boolean): HTMLDivElement | HTMLButtonElement {
    if (template.role === 'separator') {
        return create<HTMLHRElement>('hr', {
            class: 'dropdown-divider'
        })
    }

    const id = Math.random()
    const $root = create<HTMLDivElement>('div', {
        class: `menu-item${!root? ' dropright' : ''}`
    })
    const $button = create<HTMLButtonElement>('button', {
        class: 'btn btn-sm dropdown-item',
        id: id,
        innerText: template.label
    })
    let $list: HTMLUListElement

    if (template.submenu) {
        $list = create<HTMLUListElement>('ul', {
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
        let onclick: ()=>any
        switch (template.role) {
            case 'quitApp':
                onclick = () => mainProcess.quit()
            break
            case 'openURL':
                onclick = () => mainProcess.openLink(template.url)
            break
            case 'showFolder':
                onclick = () => mainProcess.showFolder(template.path)
            break
            case 'resetConfig':
                onclick = () => mainProcess.resetConfig()
            break
            case 'restoreInitial':
                onclick = () => mainProcess.restoreInitial()
            break
            case 'joinExported':
                onclick = () => mainProcess.joinExported()
            break
            case 'seeExported':
                onclick = () => mainProcess.seeExported()
            break
            case 'saveBackup':
                onclick = () => {
                    mainProcess.copyBackup()
                    mainProcess.alertSync(t.SUCCESS_BACKUP_SAVE)
                }
            break
            case 'devTools':
                onclick = () => mainProcess.openDevTools()
                setHotKey({
                    key: 'KeyI',
                    ctrlKey: true,
                    shiftKey: true
                }, () => $button.click())
            break
            case 'reload':
                onclick = () => window.location.reload()
                setHotKey({
                    key: 'KeyR',
                    ctrlKey: true,
                    shiftKey: true
                }, () => $button.click())
            break
            case 'openSettings':
                onclick = () => mainProcess.openSettings()
            break
        }
        $button.addEventListener('click', onclick)
    }

    $root.append($button)
    if ($list) {
        $root.append($list)
        return $root
    } else {
        return $button
    }
}
