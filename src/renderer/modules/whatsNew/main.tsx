import { PureComponent } from 'react'
import { render } from 'react-dom'
import 'styles/whatsNew/main'

import { Lang, MAIN, mainProcess, setHotKey, t } from 'scripts'

const { config } = window.provider
const { toggleDevTools } = mainProcess

class WhatsNew extends PureComponent {
    componentDidMount() {
        this.setDevtoolsHotkey()
    }

    render() {
        return (<>
            <h1 className='title'>{t.WHATS_NEW_TITLE} v0.6.7</h1>
            <ol className='content'>
                {config.lang === Lang.RU? <>
                    <li>Изменение списка авто/прицепов:
                        <ul>
                            <li>Добавлено "Избранное".</li>
                            <li>Добавлена стрелка "Назад".</li>
                            <li>Вкладки теперь зафиксированы с "шапке" окна.</li>
                            <li>Добавление модификаций значительно упрощено. (только для EpicGames)</li>
                        </ul>
                    </li>
                    <li>Изменение меню:
                        <ul>
                            <li>Добавлен пункт меню "Настройки":</li>
                            <li>Добавлена кнопка "Удалить программу".</li>
                            <li>Добавлена кнопка "Импортировать.</li>
                            <li>Добавлена кнопка "Экспортировать".</li>
                            <li>Перенесена кнопка "Сбросить".</li>
                            <li>Перенесена кнопка "Настройки".</li>
                            <li>Скрыт пункт меню EPF.</li>
                            <li>Во вкладке "Помощь" добавлена кнопка "Версия".</li>
                        </ul>
                    </li>
                    <li>Изменение таблицы:
                        <ul>
                            <li>Убрано выделение жирным шрифтом названий параметров.</li>
                            <li>Убраны поля, редактируемые только в "режиме разработчика".</li>
                            <li>Все параметры объединены в одно окно: вместо кнопок "карандашей" теперь сразу выводятся параметры соответствующего файла.</li>
                            <li>При стирании показывается стандартное значение.</li>
                            <li>Общий сброс работает на всё авто.</li>
                            <li>Параметры сбрасываются всегда на стандартные игровые значения.</li>
                            <li>Добавлена возможность добавления аддону запасных частей.</li>
                            <li>Добавлена возможность изменять подвеску прицепов.</li>
                            <li>Добавлена возможность изменять подключаемую ось.</li>
                            <li>Добавлен сброс группы и отдельных параметров.</li>
                            <li>Добавлена возможность добавления US или RU крана автомобилю (при условии что у него УЖЕ ЕСТЬ любой из этих кранов).</li>
                        </ul>
                    </li>
                    <li>Изменение настроек:
                        <ul>
                            <li>Добавлена настройка "Закрыть после сохранения". Позволяет отключить переход в список авто после сохранения изменений.</li>
                        </ul>
                    </li>
                    <li>Общие изменения:
                        <ul>
                            <li>Добавлено авто определение языка при первом запуске.</li>
                            <li>Убрано пропадание окна при переходе.</li>
                            <li>Скрыта категория грузов.</li>
                            <li>Оптимизирована обработка игровых текстов.</li>
                            <li>Исправлено автоматическое определение initial.pak в Steam-версии игры.</li>
                            <li>Крестик теперь полностью закрывает программу.</li>
                        </ul>
                    </li>
                </> :null}
                {config.lang === Lang.EN? <>
                    <li>Changing the list of cars/trailers:
                        <ul>
                            <li>Added "Favorites".</li>
                            <li>Added "Back" arrow.</li>
                            <li>Tabs are now locked to the "header" of the window.</li>
                            <li>Adding modifications has been greatly simplified. (EpicGames only)</li>
                        </ul>
                    </li>
                    <li>Menu change:
                        <ul>
                            <li>Added menu item "Settings":</li>
                            <li>Added button "Remove program".</li>
                            <li>Added button "Import.</li>
                            <li>Added "Export" button.</li>
                            <li>Moved "Reset" button.</li>
                            <li>Moved "Settings" button.</li>
                            <li>The EPF menu item is hidden.</li>
                            <li>Added "Version" button to the "Help" tab.</li>
                        </ul>
                    </li>
                    <li>Modifying the table:
                        <ul>
                            <li>Removed boldfaced parameter names.</li>
                            <li>Removed fields editable only in "developer mode".</li>
                            <li>All parameters are combined into one window: instead of the "pencils" buttons, the parameters of the corresponding file are now displayed immediately.</li>
                            <li>When cleared, the standard value is shown.</li>
                            <li>General reset works for all cars.</li>
                            <li>Parameters are always reset to standard game values.</li>
                            <li>Added the ability to add spare parts to the addon.</li>
                            <li>Added the ability to change the suspension of trailers.</li>
                            <li>Added the ability to change the connected axis.</li>
                            <li>Added reset of the group and individual parameters.</li>
                            <li>Added the ability to add a US or RU crane to a car (provided that it ALREADY HAS any of these cranes).</li>
                        </ul>
                    </li>
                    <li>Change settings:
                        <ul>
                            <li>Added "Close after save" setting. Allows you to disable the transition to the auto list after saving changes.</li>
                        </ul>
                    </li>
                    <li>General changes:
                        <ul>
                            <li>Added auto language detection on first launch.</li>
                            <li>Removed the disappearance of the window during the transition.</li>
                            <li>Hidden cargo category.</li>
                            <li>Optimized game text processing.</li>
                            <li>Fixed automatic detection of initial.pak in the Steam version of the game.</li>
                            <li>The cross now completely closes the program.</li>
                        </ul>
                    </li>
                </> :null}
                {config.lang === Lang.DE? <>
                    <li>Ändern der Liste der Autos/Anhänger:
                        <ul>
                            <li>"Favoriten" hinzugefügt.</li>
                            <li>Pfeil "Zurück" hinzugefügt.</li>
                            <li>Tabs sind jetzt an die "Kopfzeile" des Fensters gebunden.</li>
                            <li>Das Hinzufügen von Modifikationen wurde stark vereinfacht. (nur EpicGames)</li>
                        </ul>
                    </li>
                    <li>Menüwechsel:
                        <ul>
                            <li>Menüpunkt "Einstellungen" hinzugefügt:</li>
                            <li>Schaltfläche "Programm entfernen" hinzugefügt.</li>
                            <li>Schaltfläche "Importieren.</li>
                            <li>Schaltfläche "Exportieren" hinzugefügt.</li>
                            <li>Schaltfläche "Zurücksetzen" verschoben.</li>
                            <li>Schaltfläche "Einstellungen" verschoben.</li>
                            <li>Der Menüpunkt EPF ist ausgeblendet.</li>
                            <li>Schaltfläche "Version" zur Registerkarte "Hilfe" hinzugefügt.</li>
                        </ul>
                    </li>
                    <li>Tabelle ändern:
                        <ul>
                            <li>Fett gedruckte Parameternamen entfernt.</li>
                            <li>Felder entfernt, die nur im "Entwicklermodus" bearbeitet werden können.</li>
                            <li>Alle Parameter sind in einem Fenster zusammengefasst: Statt der "Stiftstifte"-Buttons werden jetzt sofort die Parameter der entsprechenden Datei angezeigt.</li>
                            <li>Beim Löschen wird der Standardwert angezeigt.</li>
                            <li>General Reset funktioniert für alle Autos.</li>
                            <li>Parameter werden immer auf Standard-Spielwerte zurückgesetzt.</li>
                            <li>Es wurde die Möglichkeit hinzugefügt, dem Addon Ersatzteile hinzuzufügen.</li>
                            <li>Möglichkeit hinzugefügt, die Federung von Anhängern zu ändern.</li>
                            <li>Möglichkeit hinzugefügt, die verbundene Achse zu ändern.</li>
                            <li>Reset der Gruppe und einzelner Parameter hinzugefügt.</li>
                            <li>Es wurde die Möglichkeit hinzugefügt, einem Auto einen US- oder RU-Kran hinzuzufügen (vorausgesetzt, es HAT BEREITS einen dieser Kräne).</li>
                        </ul>
                    </li>
                    <li>Einstellungen ändern:
                        <ul>
                            <li>Einstellung "Nach Speichern schließen" hinzugefügt. Ermöglicht Ihnen, den Übergang zur automatischen Liste nach dem Speichern der Änderungen zu deaktivieren.</li>
                        </ul>
                    </li>
                    <li>Allgemeine Änderungen:
                        <ul>
                            <li>Automatische Spracherkennung beim ersten Start hinzugefügt.</li>
                            <li>Das Verschwinden des Fensters während des Übergangs wurde entfernt.</li>
                            <li>Versteckte Frachtkategorie.</li>
                            <li>Optimierte Spieltextverarbeitung.</li>
                            <li>Die automatische Erkennung von initial.pak in der Steam-Version des Spiels wurde korrigiert.</li>
                            <li>Das Kreuz schließt das Programm nun vollständig.</li>
                        </ul>
                    </li>
                </> :null}
            </ol>
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
