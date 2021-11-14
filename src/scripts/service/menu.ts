import { MenuRole } from '../../app/classes/enums'
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
*/
function buildMenu(template: IMenuTemplate, root?: boolean): HTMLDivElement | HTMLButtonElement {
    if (template.role === MenuRole.separator) {
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
            case MenuRole.quitApp:
                onclick = () => mainProcess.quit()
            break
            case MenuRole.openURL:
                onclick = () => mainProcess.openLink(template.url)
            break
            case MenuRole.showFolder:
                onclick = () => mainProcess.openPath(template.path)
            break
            case MenuRole.resetConfig:
                onclick = () => mainProcess.resetConfig()
            break
            case MenuRole.recoverFromBackup:
                onclick = () => mainProcess.recoverFromBackup()
            break
            case MenuRole.joinEPF:
                onclick = () => mainProcess.joinEPF()
            break
            case MenuRole.seeEPF:
                onclick = () => mainProcess.seeEPF()
            break
            case MenuRole.saveBackup:
                onclick = () => {
                    mainProcess.copyBackup()
                    mainProcess.alertSync(t.SUCCESS_BACKUP_SAVE)
                }
            break
            case MenuRole.devTools:
                onclick = () => mainProcess.toggleDevTools()
                setHotKey({
                    key: 'KeyI',
                    ctrlKey: true,
                    shiftKey: true
                }, () => $button.click())
            break
            case MenuRole.reload:
                onclick = () => window.location.reload()
                setHotKey({
                    key: 'KeyR',
                    ctrlKey: true,
                    shiftKey: true
                }, () => $button.click())
            break
            case MenuRole.openSettings:
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
