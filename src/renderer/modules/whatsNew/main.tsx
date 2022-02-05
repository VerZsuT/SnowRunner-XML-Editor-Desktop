import { PureComponent } from 'react'
import { render } from 'react-dom'
import { Lang, MAIN, mainProcess, setHotKey, t } from 'scripts'

import { Typography } from '@mui/material'
import 'styles/whatsNew'

const { config } = window.provider
const { toggleDevTools } = mainProcess

class WhatsNew extends PureComponent {
    componentDidMount() {
        this.setDevtoolsHotkey()
    }

    render() {
        return (<>
            <Typography variant="h5" className="title">{t.WHATS_NEW_TITLE} v0.6.7d</Typography>
            {config.lang === Lang.RU ? <>
                <Typography>Добавлено автозакрытие вкладки в таблице.</Typography>
                <Typography>Улучшен вид консоли.</Typography>
                <Typography>Изменены команды консоли.</Typography>
                <Typography>Добавлена предварительная версия 'execute' системы (позволяет создавать пользовательские сценарии для использования в программе)</Typography>
                <Typography>Исправлено бесконечное окно загрузки при восстановлении initial.pak.</Typography>
                <Typography>Исправлена неправильная работа импорта/экспорта конфигурации программы.</Typography>
                <Typography>Улучшена плавность открытия/закрытия вкладок таблицы.</Typography>
                <Typography>Обновлен встроенный WinRAR.</Typography>
                <Typography>Обновлены компоненты программы.</Typography>
            </> : null}
            {config.lang === Lang.EN ? <>
                <Typography>Added auto-closing tabs in the table.</Typography>
                <Typography>Improved console view.</Typography>
                <Typography>Console commands have been changed.</Typography>
                <Typography>Added a preliminary version of the 'execute' system (allows you to create custom scripts for use in the program)</Typography>
                <Typography>Fixed an infinite loading window when restoring initial.pak.</Typography>
                <Typography>Fixed incorrect operation of program configuration import/export.</Typography>
                <Typography>Improved smoothness of opening/closing table tabs.</Typography>
                <Typography>Updated the built-in WinRAR.</Typography>
                <Typography>The program components have been updated.</Typography>
            </> : null}
            {config.lang === Lang.DE ? <>
                <Typography>Es wurde eine Tab-automatische Schließung in der Tabelle hinzugefügt.</Typography>
                <Typography>Verbesserte Konsolenansicht.</Typography>
                <Typography>Die Konsolenbefehle wurden geändert.</Typography>
                <Typography>Es wurde eine Vorabversion des 'execute'-Systems hinzugefügt (ermöglicht das Erstellen benutzerdefinierter Skripts für die Verwendung im Programm)</Typography>
                <Typography>Es wurde ein unendliches Ladefenster bei der Wiederherstellung von initial behoben.pak.</Typography>
                <Typography>Es wurde ein fehlerhafter Import/Export der Programmkonfiguration behoben.</Typography>
                <Typography>Verbesserte Glätte beim Öffnen/Schließen von Tabellenregisterkarten.</Typography>
                <Typography>Das eingebaute WinRAR wurde aktualisiert.</Typography>
                <Typography>Die Programmkomponenten wurden aktualisiert.</Typography>
            </> : null}
        </>)
    }

    private setDevtoolsHotkey() {
        setHotKey({
            key: 'KeyI',
            ctrlKey: true,
            shiftKey: true
        }, () => toggleDevTools())
    }
}

render(<WhatsNew />, MAIN)
