import WindowRoot from "components/WindowRoot";
import { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import Lang from "main/enums/Lang";
import { MAIN } from "scripts/helpers";
import localize from "scripts/localize";
import config from "scripts/config";

import { Typography } from "@mui/material";
import "styles/whatsNew";

class WhatsNew extends WindowRoot {
    public render() {
        return <>
            <Typography variant="h5" className="title">{localize.WHATS_NEW_TITLE} v0.6.8b</Typography>
            {onLang(Lang.RU, <>
                <Typography>- Исправлен баг с распаковкой initial.pak при изменениях в модификациях.</Typography>
                <Typography>- Исправлены ошибки в CH переводе (спасибо 杨 新民).</Typography>
            </>)}
            {onLang(Lang.EN, <>
                <Typography>- Fixed bug with unpacking initial.pak when changing modifications.</Typography>
                <Typography>- Fixed errors in CH translation (thanks to 杨 新民).</Typography>
            </>)}
            {onLang(Lang.DE, <>
                <Typography>- Fehler beim Entpacken von initial.pak behoben, wenn Änderungen vorgenommen wurden.</Typography>
                <Typography>- Fehler in der CH-Übersetzung behoben (Dank an 杨 新民).</Typography>
            </>)}
            {onLang(Lang.CH, <>
                <Typography>- 修正了修改时解压initial.pak的错误。</Typography>
                <Typography>- 修正了CH翻译中的错误 (感谢杨新民) 。</Typography>
            </>)}

            <Typography variant="h5" className="title">{localize.WHATS_NEW_TITLE} v0.6.8a</Typography>
            {onLang(Lang.RU, <>
                <Typography>- Исправлен баг с текстами модификаций.</Typography>
                <Typography>- Исправлен баг с пустым экраном в "Продвинутом режиме".</Typography>
                <Typography>- Исправлен баг с картинками модификаций.</Typography>
                <Typography>- Исправлен баг при пустом атрибуте "Country" в модификациях.</Typography>
                <Typography>- Возвращён автоматический показ окна "Что новое" после обновления.</Typography>
            </>)}
            {onLang(Lang.EN, <>
                <Typography>- Fixed a bug with modification texts.</Typography>
                <Typography>- Fixed a bug with a blank screen in "Advanced Mode".</Typography>
                <Typography>- Fixed a bug with pictures of modifications.</Typography>
                <Typography>- Fixed a bug with an empty "Country" attribute in the modifications.</Typography>
                <Typography>- Returned automatic display of the "What"s new" window after the update.</Typography>
            </>)}
            {onLang(Lang.DE, <>
                <Typography>- Es wurde ein Fehler mit Änderungstexten behoben.</Typography>
                <Typography>- Ein Fehler mit einem leeren Bildschirm im "Fortgeschrittenen Modus" wurde behoben.</Typography>
                <Typography>- Ein Fehler mit Bildmodifikationen wurde behoben.</Typography>
                <Typography>- Ein Fehler wurde behoben, wenn das Attribut "Country" in den Modifikationen leer war.</Typography>
                <Typography>- Das Fenster "Was ist neu" wird nach der Aktualisierung automatisch angezeigt.</Typography>
            </>)}
            {onLang(Lang.CH, <>
                <Typography>- 修正了修改文本的错误。</Typography>
                <Typography>- 修复了"高级模式"下空白屏幕的错误。</Typography>
                <Typography>- 修正了修改图片的错误。</Typography>
                <Typography>- 修正了修改中一个空的"Country"属性的错误。</Typography>
                <Typography>- 返回更新后自动显示"新增功能"窗口。</Typography>
            </>)}

            <Typography variant="h5" className="title">{localize.WHATS_NEW_TITLE} v0.6.8</Typography>
            {onLang(Lang.RU, <>
                <Typography>- Исправлена ошибка при отсутствии интернет соединения.</Typography>
                <Typography>- Изменён метод чтения XML файлов. Должно сильно увеличить процент доступных для редактирования модов.</Typography>
                <Typography>- Немного изменён стиль таблицы.</Typography>
                <Typography>- Добавлена возможность открыть xml файл для ручного редактирования (из интерфейса таблицы, не требуется WinRAR). Изменения вступают в силу после сохранения в программе.</Typography>
                <Typography>- Добавлена настройка "Расширенный режим". Включает функции для продвинутых пользователей (на текущий момент - возможность открытия xml файла внешним редактором).</Typography>
                <Typography>- Добавлена возможность добавить кран-банан большому зиксу (по просьбе).</Typography>
                <Typography>- Добавлен импорт файла перетаскиванием в окно таблицы.</Typography>
                <Typography>- Добавлена кнопка "Экспорт" в контекстном меню в списке.</Typography>
                <Typography>- Добавлена картинка для Step 33-64 Crocodile.</Typography>
                <Typography>- Доп. сценарии также экспортируются (изменения кранов, фаркопов и т.д.).</Typography>
                <Typography>- Убран визуальный баг с "растягиванием" названия авто в списке при поиске и добавлении в избранное.</Typography>
                <Typography>- Убрана полоса прокрутки в меню выбора категории.</Typography>
                <Typography>- Убрана система "execute".</Typography>
                <Typography>- Улучшена производительность.</Typography>
            </>)}
            {onLang(Lang.EN, <>
                <Typography>- Fixed an error when there is no Internet connection.</Typography>
                <Typography>- Changed the method of reading XML files. Should greatly increase the percentage of mods available for editing.</Typography>
                <Typography>- The table style has been slightly changed.</Typography>
                <Typography>- Added the ability to open an xml file for manual editing (from the table interface, no WinRAR required). The changes take effect after they are saved in the program.</Typography>
                <Typography>- Added the "Advanced Mode" setting. Includes functions for advanced users (currently - the ability to open an xml file with an external editor).</Typography>
                <Typography>- Added the ability to add a banana crane to a large zix (on request).</Typography>
                <Typography>- Added file import by dragging into the table window.</Typography>
                <Typography>- Added the "Export" button in the context menu in the list.</Typography>
                <Typography>- Added a picture for Step 33-64 Crocodile.</Typography>
                <Typography>- Additional scripts are also exported (changes to cranes, towbars, etc.).</Typography>
                <Typography>- Removed a visual bug with "stretching" the name of the car in the list when searching and adding to favorites.</Typography>
                <Typography>- Removed the scroll bar in the category selection menu.</Typography>
                <Typography>- Removed the "execute" system.</Typography>
                <Typography>- Improved performance.</Typography>
            </>)}
            {onLang(Lang.DE, <>
                <Typography>- Fehler behoben, bei fehlender Internetverbindung.</Typography>
                <Typography>- Die Methode zum Lesen von XML-Dateien wurde geändert. Sollte den Prozentsatz der editierbaren Mods stark erhöhen.</Typography>
                <Typography>- Der Tabellenstil wurde leicht geändert.</Typography>
                <Typography>- Option hinzugefügt, um eine XML-Datei für die manuelle Bearbeitung zu öffnen (von der Tabellenschnittstelle aus, kein WinRAR erforderlich). Die Änderungen werden nach dem Speichern im Programm wirksam.</Typography>
                <Typography>- Die Einstellung "Erweiterter Modus" wurde hinzugefügt. Enthält Funktionen für fortgeschrittene Benutzer (derzeit ist es möglich, eine XML-Datei mit einem externen Editor zu öffnen).</Typography>
                <Typography>- Option hinzugefügt, um großen Ziks einen Bananenkran hinzuzufügen (auf Anfrage).</Typography>
                <Typography>- Der Import einer Datei wurde durch Ziehen in das Tabellenfenster hinzugefügt.</Typography>
                <Typography>- Die Schaltfläche "Exportieren" wurde im Kontextmenü in der Liste hinzugefügt.</Typography>
                <Typography>- Bild für Step 33-64 Crocodile hinzugefügt.</Typography>
                <Typography>- Weitere Szenarien werden ebenfalls exportiert (Änderungen an Kränen, Anhängern usw.).</Typography>
                <Typography>- Entfernt einen visuellen Fehler mit dem "Strecken" des Autonamens in der Liste, wenn Sie suchen und zu Ihren Favoriten hinzufügen.</Typography>
                <Typography>- Die Bildlaufleiste im Kategorieauswahlmenü wurde entfernt.</Typography>
                <Typography>- Das System "execute" wurde entfernt.</Typography>
                <Typography>- Verbesserte Leistung.</Typography>
            </>)}
            {onLang(Lang.CH, <>
                <Typography>- 增加了中文翻译（错误和遗漏是可能的，使用了翻译) 。</Typography>
                <Typography>- 修正了没有互联网连接时的错误。</Typography>
                <Typography>- 更改了读取XML文件的方法。 应该大大增加可供编辑的mods的百分比。</Typography>
                <Typography>- 表格样式略有改变。</Typography>
                <Typography>- 增加了打开xml文件进行手动编辑的功能 (从表界面, 不需要WinRAR) 。 更改在保存在程序中后生效。</Typography>
                <Typography>- 添加了"高级模式"设置。 包括高级用户的功能（目前-使用外部编辑器打开xml文件的能力) 。</Typography>
                <Typography>- 增加了将香蕉起重机添加到大型zix的能力 (应要求) 。</Typography>
                <Typography>- 通过拖入表格窗口添加文件导入。</Typography>
                <Typography>- 在列表中的上下文菜单中添加了"导出"按钮。</Typography>
                <Typography>- 为Step 33-64步鳄鱼添加了一张图片。</Typography>
                <Typography>- 其他脚本也被导出（对起重机、牵引杆等的更改）。</Typography>
                <Typography>- 删除了一个视觉错误，在搜索和添加到收藏夹时，"拉伸"列表中的汽车名称。</Typography>
                <Typography>- 删除类别选择菜单中的滚动条。</Typography>
                <Typography>- 删除了"执行"系统。</Typography>
                <Typography>- 提高性能。</Typography>
            </>)}
        </>;
    }
}

function onLang(lang: Lang, children: ReactNode) {
    if (config.lang === lang)
        return children;
    else
        return null;
}

createRoot(MAIN).render(<WhatsNew />);

export default WhatsNew;
