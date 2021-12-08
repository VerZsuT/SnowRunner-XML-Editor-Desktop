import { PureComponent } from 'react'
import { render } from 'react-dom'
import './style.css'

import { Lang, MAIN, mainProcess, setHotKey, t } from '@editor-service'

class WhatsNew extends PureComponent {
    render() {
        return (<>
            <h1 className='title'>{t.WHATS_NEW_TITLE} v{config.version}</h1>
            <ol className='content'>
            {config.lang === Lang.RU? <>
                <li>Добавлено окно <i>"Что нового"</i>, на которое вы смотрите :)</li>
                <li>Переход с <i>Vue</i> на <i>React</i>.</li>
                <li>Убран показ окна консоли при сохранении файла.</li>
                <li>Изменения параметров <i>авто</i>:</li>
                <ul>
                    <li>Добавлена <i>чувствительность руля</i>.</li>
                    <li>Добавлена <i>длина лебёдки</i>.</li>
                    <li>Добавлена <i>сила лебёдки</i>.</li>
                    <li><i>Угол поворота колеса</i> теперь дробное число. Изменены максимальное и минимальное значение <i>[-90.0, 90.0]</i></li>
                    <li>Добавлен <i>угол наклона колеса</i>.</li>
                    <li>Добавлена возможность менять <i>размер колёс</i>.</li>
                </ul>
                <li>Изменения параметров <i>двигателя</i>:</li>
                <ul>
                    <li>Добавлена <i>задержка торможения</i>.</li>
                    <li>Добавлено <i>замедление ускорения</i>.</li>
                </ul>
                <li>Разрешено изменять <i>способ разблокировки</i> частей авто.</li>
                <li>Добавлена поддержка <i>автоматического определения initial.pak для Steam</i> версии игры.</li>
                <li>Исправлена <i>работа поиска в редакторе</i> параметров:</li>
                <ul>
                    <li><i>Параметры</i> больше не исчезают.</li>
                    <li><i>Пустые группы</i> больше не показываются.</li>
                </ul>
            </> :null}
            {config.lang === Lang.EN? <>
                <li>Added the <i>"What's new"</i> window that you are looking at :)</li>
                <li>Switching from <i>Vue</i> to <i>React</i>.</li>
                <li>Removed the display of the console window when saving a file.</li>
                <li>Parameter changes <i>auto</i>:</li>
                <ul>
                    <li>Added <i>steering wheel sensitivity</i>.</li>
                    <li>Added <i>winch length</i>.</li>
                    <li>Added <i>winch power</i>.</li>
                    <li><i>The angle of rotation of the wheel</i> is now a fractional number. Changed the maximum and minimum values <i>[-90.0, 90.0]</i></li>
                    <li>Added <i>wheel tilt angle</i>.</li>
                    <li>Added the ability to change the <i>wheel size</i>.</li>
                </ul>
                <li>Changes in the parameters of the <i>engine</i>:</li>
                <ul>
                    <li>Added <i>braking delay</i>.</li>
                    <li>Added <i>acceleration deceleration</i>.</li>
                </ul>
                <li>It is allowed to change the <i>method of unlocking</i> parts of the car.</li>
                <li>Added support for <i>automatic detection of initial.pak for Steam</i> version of the game.</li>
                <li>Fixed <i>search operation in the </i> parameters editor:</li>
                <ul>
                    <li><i>The</i> parameters no longer disappear.</li>
                    <li><i>Empty groups</i> are no longer shown.</li>
                </ul>
            </> :null}
            {config.lang === Lang.DE? <>
                <li>Das Fenster <i>"Was ist neu"</i>, das Sie betrachten, wurde hinzugefügt :)</li>
                <li>Wechselt von <i>Vue</i> zu <i>React</i>.</li>
                <li>Entfernt die Anzeige des Konsolenfensters beim Speichern der Datei.</li>
                <li>Einstellungen ändern <i>auto</i>:</li>
                <ul>
                    <li>Hinzugefügt <i>Lenkempfindlichkeit</i>.</li>
                    <li>Hinzugefügt <i>Länge der Winde</i>.</li>
                    <li>Hinzugefügt <i>Winde Kraft</i>.</li>
                    <li><i>Raddrehwinkel</i> ist jetzt eine Bruchzahl. Maximal- und Minimalwert <i>[-90.0, 90.0]</i></li> geändert
                    <li>Hinzugefügt <i>Winkel des Rades</i>.</li>
                    <li>Option hinzugefügt, um <i>Größe der Räder</i> zu ändern.</li>
                </ul>
                <li>Änderungen der Parameter des <i>Motors</i>:</li>
                <ul>
                    <li><i>Verzögerung</i> hinzugefügt.</li>
                    <li>Hinzugefügt <i>Beschleunigung Verlangsamung</i>.</li>
                </ul>
                <li>Erlaubt, die <i>Methode zum Entsperren</i> Auto-Teile zu ändern.</li>
                <li>Unterstützung für <i>automatische Erkennung initial hinzugefügt.pak für Steam</i> Version des Spiels.</li>
                <li>Feste <i>Job-Suche im Editor</i> Parameter:</li>
                <ul>
                    <li><i>Parameter</i> verschwinden nicht mehr.</li>
                    <li><i>Leere Gruppen</i> werden nicht mehr angezeigt.</li>
                </ul>
            </> :null}
            </ol>
        </>)
    }
}

setHotKey({
    key: 'KeyI',
    ctrlKey: true,
    shiftKey: true
}, () => mainProcess.toggleDevTools())

render(<WhatsNew/>, MAIN)
