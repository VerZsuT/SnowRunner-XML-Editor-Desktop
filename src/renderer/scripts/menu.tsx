import { MenuRole } from './enums'
import { t, setHotKey } from './funcs'
import { mainProcess } from './mainProcess'
import 'bootstrap'

const {
    menu, quit, openLink, openPath,
    resetConfig, recoverFromBackup, copyBackup,
    joinEPF, seeEPF, runUninstall, importConfig,
    exportConfig, alertSync, toggleDevTools, openSettings,
    openWhatsNew
} = mainProcess

export const Menu = (
    <div id='menu'>
        {menu.map(value => buildMenu(value, true))}
    </div>
)

function buildMenu(template: MenuTemplate, isRoot?: boolean): JSX.Element {
    const id = String(Math.random())

    if (template.role === MenuRole.separator) {
        return <hr key={`${id}-hr`} className='dropdown-divider' />
    }
    const button = (
        <button
            className='btn btn-sm dropdown-item'
            id={id}
            key={`${id}-button`}
            data-bs-toggle={template.submenu ? 'dropdown' : ''}
            onClick={getOnclick(template)}
        >
            {template.label}
        </button>
    )
    const root = (
        <div
            className={`menu-item${!isRoot ? ' dropright' : ''}`}
            key={`${id}-root`}
        >
            {button}
            {template.submenu ?
                <ul className='dropdown-menu' aria-labelledby={id}>
                    {template.submenu ?
                        template.submenu.map(value => buildMenu(value))
                        : null}
                </ul>
                : null}
        </div>
    )
    return template.submenu ? root : button
}

function getOnclick(template: MenuTemplate) {
    if (template.role) {
        let onclick: () => any
        switch (template.role) {
            case MenuRole.quitApp:
                onclick = () => quit()
                break
            case MenuRole.openURL:
                onclick = () => openLink(template.url)
                break
            case MenuRole.showFolder:
                onclick = () => openPath(template.path)
                break
            case MenuRole.resetConfig:
                onclick = () => resetConfig()
                break
            case MenuRole.recoverFromBackup:
                onclick = () => recoverFromBackup()
                break
            case MenuRole.joinEPF:
                onclick = () => joinEPF()
                break
            case MenuRole.seeEPF:
                onclick = () => seeEPF()
                break
            case MenuRole.uninstall:
                onclick = () => runUninstall()
                break
            case MenuRole.importConfig:
                onclick = () => importConfig(false)
                break
            case MenuRole.exportConfig:
                onclick = () => exportConfig(false)
                break
            case MenuRole.openWhatsNew:
                onclick = () => openWhatsNew()
                break
            case MenuRole.saveBackup:
                onclick = () => {
                    copyBackup()
                    alertSync(t.SUCCESS_BACKUP_SAVE)
                }
                break
            case MenuRole.devTools:
                onclick = () => toggleDevTools()
                setHotKey({
                    key: 'KeyI',
                    ctrlKey: true,
                    shiftKey: true
                }, () => onclick())
                break
            case MenuRole.reload:
                onclick = () => window.location.reload()
                setHotKey({
                    key: 'KeyR',
                    ctrlKey: true,
                    shiftKey: true
                }, () => onclick())
                break
            case MenuRole.openSettings:
                onclick = () => openSettings()
                break
        }
        return onclick
    }
    return () => { }
}
