import { PureComponent } from 'react'
import { render } from 'react-dom'
import '@sxmle-main-style'
import './style'

import { Lang, MAIN, mainProcess, setHotKey, t } from '@sxmle-service'

class WhatsNew extends PureComponent {
    componentDidMount() {
        this.setDevtoolsHotkey()
    }

    render() {
        return (<>
            <h1 className='title'>{t.WHATS_NEW_TITLE} v0.6.6c</h1>
            <ol className='content'>
                {config.lang === Lang.RU? <>
                    <li>Исправлен <i>баг с заголовком файла.</i></li>
                    <li><i>Вес картинок уменьшен</i> примерно в 3 раза.</li>
                    <li><i>Вес установщика уменьшен</i> до ~70МБ.</li>
                    <li><i>Потребление RAM уменьшено</i> до 50-60МБ.</li>
                    <li><i>Добавлены картинки</i> для 3-х новых авто.</li>
                </> :null}
                {config.lang === Lang.EN? <>
                    <li>Fixed <i>file header bug.</i></li>
                    <li><i>The weight of the images has been reduced</i> by about 3 times.</li>
                    <li><i>The weight of the installer has been reduced</i> to ~70MB.</li>
                    <li><i>RAM consumption is reduced</i> to 50-60MB.</li>
                    <li><i>Added images</i> for 3 new cars.</li>
                </> :null}
                {config.lang === Lang.DE? <> 
                    <li>Behoben <i>Fehler mit Datei-Header.</i></li>
                    <li><i>Das Gewicht der Bilder wurde</i> um das 3-fache reduziert.</li>
                    <li><i>Das Gewicht des Installationsprogramms wurde</i> auf ~70MB reduziert.</li>
                    <li><i>RAM-Verbrauch reduziert</i> auf 50-60MB.</li>
                    <li><i>Bilder hinzugefügt</i> für 3 neue Autos.</li>
                </> :null}
            </ol>

            <h1 className='title'>{t.WHATS_NEW_TITLE} v0.6.6b</h1>
            <ol className='content'>
                {config.lang === Lang.RU? <>
                    <li>Исправлен <i>баг с вводом в числовое поле.</i></li>
                    <li>Исправлен <i>баг с вводом в текстовое поле.</i></li>
                    <li>Исправлен <i>баг с вводом в поле ввода координат.</i></li>
                </> :null}
                {config.lang === Lang.EN? <>
                    <li>Fixed <i>a bug with entering into a numeric field.</i></li>
                    <li>Fixed <i>bug with text field input.</i></li>
                    <li>Fixed <i>bug with entering coordinates in the input field.</i></li>
                </> :null}
                {config.lang === Lang.DE? <>
                    <li>Behoben <i>Fehler mit Eingabe in das numerische Feld.</i></li>
                    <li>Behoben <i>Fehler mit der Eingabe in das Textfeld.</i></li>
                    <li>Behoben <i>Fehler mit Eingabe in das Eingabefeld Koordinaten.</i></li>
                </> :null}
            </ol>

            <h1 className='title'>{t.WHATS_NEW_TITLE} v0.6.6a</h1>
            <ol className='content'>
                {config.lang === Lang.RU? <>
                    <li>Исправлен <i>баг с пустым окном при редактировании колёс.</i></li>
                    <li>Исправлен <i>баг с дублированием кнопок файлов колёс.</i></li>
                    <li>Исправлен <i>баг с пустым окном при редактировании авто на языках EN и DE.</i></li>
                    <li>Исправлен <i>баг с неправильным счётчиком файлов обновления.</i></li>
                </> :null}
                {config.lang === Lang.EN? <>
                    <li>Fixed <i>a bug with an empty window when editing wheels.</i></li>
                    <li>Fixed <i>a bug with duplicate buttons of wheel files.</i></li>
                    <li>Fixed <i>a bug with an empty window when editing cars in EN and DE languages.</i></li>
                    <li>Fixed <i>bug with incorrect update file counter.</i></li>
                </> :null}
                {config.lang === Lang.DE? <>
                    <li>Behoben <i>Fehler mit leerem Fenster beim Bearbeiten von Rädern.</i></li>
                    <li>Behoben <i>Fehler mit Duplizierung von Rad-Datei-Tasten.</i></li>
                    <li>Behoben <i>Fehler mit einem leeren Fenster beim Bearbeiten von Autos in EN- und DE-Sprachen.</i></li>
                    <li>Behoben <i>Fehler mit falschem Dateizähler Update.</i></li>
                </> :null}
            </ol>
            
            <h1 className='title'>{t.WHATS_NEW_TITLE} v0.6.6</h1>
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

    private setDevtoolsHotkey() {
        setHotKey({
            key: 'KeyI',
            ctrlKey: true,
            shiftKey: true
        }, () => mainProcess.toggleDevTools())
    }
}

render(<WhatsNew/>, MAIN)
