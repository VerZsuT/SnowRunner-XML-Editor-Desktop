import { create, getText } from './funcs.js';
import mainProcess from './mainProcess.js';

const $menu = create('div', {id: 'menu'});
const menu = mainProcess.get('menu');

for (const $item of menu) {
    $menu.append(buildMenu($item, true));
}

document.body.prepend($menu);

/**
 * Создаёт меню на основе шаблона.
 * @param template - шаблон.
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
            case 'quitApp':
                $button.addEventListener('click', () => mainProcess.call('quit'));
            break;
            case 'openURL':
                $button.addEventListener('click', () => mainProcess.call('openLink', template.url));
            break;
            case 'showFolder':
                $button.addEventListener('click', () => mainProcess.call('showFolder', template.path));
            break;
            case 'resetConfig':
                $button.addEventListener('click', () => mainProcess.call('resetConfig'));
            break;
            case 'restoreInitial':
                $button.addEventListener('click', () => mainProcess.call('restoreInitial'));
            break;
            case 'joinExported':
                $button.addEventListener('click', () => mainProcess.call('joinExported'));
            break;
            case 'seeExported':
                $button.addEventListener('click', () => mainProcess.call('seeExported'));
            break;
            case 'saveBackup':
                $button.addEventListener('click', () => {
                    mainProcess.call('copyBackup');
                    mainProcess.call('alertSync', getText('[SUCCESS_BACKUP_SAVE]'));
                });
            break;
            case 'devTools':
                $button.addEventListener('click', () => mainProcess.call('openDevTools'));
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
            case 'openSettings':
                $button.addEventListener('click', () => mainProcess.call('openSettings'));
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
