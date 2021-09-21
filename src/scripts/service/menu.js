import {create} from './funcs.js';
import mainProcess from './mainProcess.js';

const $menu = create('div', {id: 'menu'});
const menu = mainProcess.menu;

for (const $item of menu) {
    $menu.append(buildMenu($item, true));
}

document.body.prepend($menu);

/**
 * Создаёт меню на основе шаблона.
 * @param {object} template - шаблон.
 * @param {boolean} root
 */
function buildMenu(template, root=false) {
    if (template.role === 'separator') {
        return create('hr', {
            class: 'dropdown-divider'
        });
    }
    const id = Math.random();
    const $root = create('div', {
        class: `menu-item${!root? ' dropright' : ''}`
    });
    const $button = create('button', {
        class: 'btn btn-sm dropdown-item',
        id: id,
        innerText: template.label
    });
    let $list;

    if (template.submenu) {
        $list = create('ul', {
            class: 'dropdown-menu',
            'aria-labelledby': id
        });
        $button.setAttribute('data-bs-toggle', 'dropdown');
        for (const $item of template.submenu) {
            const $listItem = buildMenu($item);
            $list.append($listItem);
        }
    }

    if (template.role) {
        switch (template.role) {
            case 'quit-app':
                $button.addEventListener('click', () => mainProcess.quit());
                break;
            case 'open-link':
                $button.addEventListener('click', () => mainProcess.openLink(template.url));
                break;
            case 'show-file':
                $button.addEventListener('click', () => mainProcess.showFile(template.path));
                break;
            case 'show-folder':
                $button.addEventListener('click', () => mainProcess.showFolder(template.path));
                break;
            case 'reset-config':
                $button.addEventListener('click', () => mainProcess.resetConfig());
                break;
            case 'restore-initial':
                $button.addEventListener('click', () => mainProcess.restoreInitial());
                break;
            case 'save-backup':
                $button.addEventListener('click', () => mainProcess.copyBackup());
                break;
            case 'dev-tools':
                $button.addEventListener('click', () => mainProcess.openDevTools());
                document.addEventListener('keypress', (event) => {
                    if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
                        $button.click();
                    }
                });
                break;
            case 'reload':
                $button.addEventListener('click', () => window.location.reload());
                document.addEventListener('keypress', (event) => {
                    if (event.ctrlKey && event.shiftKey && event.code === 'KeyR') {
                        $button.click();
                    }
                });
                break;
            case 'open-editor':
                if (template.dlc) {
                    $button.addEventListener('click', () => mainProcess.openXMLEditor(template.path, template.dlc));
                } else {
                    $button.addEventListener('click', () => mainProcess.openXMLEditor(template.path));
                }
                break;
            case 'open-settings':
                $button.addEventListener('click', () => mainProcess.openSettings());
                break;
        }
    }

    $root.append($button);
    if ($list) {
        $root.append($list);
        return $root;
    } else {
        return $button;
    }
}
