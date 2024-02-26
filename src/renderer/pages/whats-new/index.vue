<template>
  <div class='container'>
    <VersionInfo version='0.8.4' :changes='desc084.texts' />
    <VersionInfo version='0.8.3' :changes='desc083.texts' />
    <VersionInfo version='0.8.2' :changes='desc082.texts' />
    <VersionInfo version='0.8.1' :changes='desc081.texts' />
    <VersionInfo version='0.8.0' :changes='desc080.texts' />
  </div>
</template>

<script lang='ts' setup>
import VersionInfo from './version-info.vue'
import { Lang, ProgramWindow } from '/mods/renderer'
import { useWindowReady } from '/rend/utils'
import { localize } from '/utils/texts/renderer'

useWindowReady(ProgramWindow.whatsNew)

const desc084 = localize({
  texts: {
    [Lang.ru]: [
      'Исправлен баг с отсутствием некоторых двигателей',
      'Оптимизирован список'
    ],
    [Lang.en]: [
      'Fixed a bug with missing some engines',
      'The list has been optimized'
    ],
    [Lang.de]: [
      'Fehler behoben, bei dem einige Motoren fehlten',
      'Liste wurde optimiert'
    ],
    [Lang.ch]: [
      '修正了一个缺少一些引擎的错误',
      '列表已优化'
    ]
  }
})
const desc083 = localize({
  texts: {
    [Lang.ru]: [
      'Исправлен баг с редактированием параметров на выбор',
      'Исправлен текст при скачивании обновления'
    ],
    [Lang.en]: [
      'Fixed a bug with editing the parameters to choose from',
      'The text was corrected when downloading the update'
    ],
    [Lang.de]: [
      'Fehler beim Bearbeiten von Optionen zur Auswahl behoben',
      'Text beim Herunterladen des Updates wurde korrigiert'
    ],
    [Lang.ch]: [
      '修正了编辑可供选择的参数的错误',
      '下载更新时已更正文本'
    ]
  }
})
const desc082 = localize({
  texts: {
    [Lang.ru]: ['Исправлен баг при котором нельзя было редактировать колёса из DLC'],
    [Lang.en]: ['Fixed a bug where it was impossible to edit the wheels from the DLC'],
    [Lang.de]: ['Es wurde ein Fehler behoben, bei dem Räder aus dem DLC nicht bearbeitet werden konnten'],
    [Lang.ch]: ['修正了一个无法从DLC中编辑轮子的错误']
  }
})
const desc081 = localize({
  texts: {
    [Lang.ru]: [
      'Исправлен баг с редактированием некоторых дробных параметров',
      'Исправлен баг с параметром "Точная регулировка"'
    ],
    [Lang.en]: [
      'Fixed a bug with editing some Float parameters',
      'Fixed a bug with the "Precise adjustment" parameter'
    ],
    [Lang.de]: [
      'Fehler beim Bearbeiten einiger Fraktionsparameter behoben',
      'Fehler mit der Option "Feinabstimmung" behoben'
    ],
    [Lang.ch]: [
      "修正了编辑一些分数参数的错误",
      '修复了"精细调整"参数的错误'
    ],
  }
})
const desc080 = localize({
  texts: {
    [Lang.ru]: [
      'Переход с React на Vue.',
      'Переход с Webpack на Vite.',
      'Код переписан на асинхронный и более стабильный.',
      'Улучшена система обработки шаблонов _templates.',
      'Обновление программы стало более простое и менее подвержено ошибкам.',
      'Обновлены стандартные параметры автомобилей.',
      'К сожалению больше нет поддержки Windows 7, 8/8.1.',
      'Любые ошибки теперь показываются пользователю.',
      'Изменение настроек больше не требует перезагрузки программы.',
      'Дополнительные параметры перенесены в саму таблицу.',
      'Добавлена поддержка регионов CAS и NE у авто.',
      'Добавлена возможность сохранять параметры несколькольких авто в одном файле.',
      'Добавлена возможность выбора нескольких регионов.',
      'Добавлена возможность импорта/сброса в списке.',
      'Исправлена работа восстановления после обновления игры.',
      'Исправлен баг с флагом "только для чтения" у initial.pak.',
      'Исправлен "белый окран" таблицы при ошибке чтения файла.'
    ],
    [Lang.en]: [
      'Switching from React to Vue.',
      'Switching from Webpack to Vite.',
      'The code has been rewritten to asynchronous and more stable.',
      'The _templates template processing system has been improved.',
      'The program update has become simpler and less error-prone.',
      'Standard car parameters have been updated.',
      'Unfortunately there is no longer support for Windows 7, 8/8.1.',
      'Any errors are now shown to the user.',
      'Changing the settings no longer requires restarting the program.',
      'Additional parameters have been moved to the table itself.',
      'Added support for the CAS and NE regions for cars.',
      'Added the ability to save the parameters of several cars in one file.',
      'Added the ability to select multiple regions.',
      'Added the ability to import/reset in the list.',
      'Fixed the recovery operation after updating the game.',
      'Fixed a bug with the "read-only" flag in initial.pak.',
      'Fixed the "white screen" of the table when reading a file error.'
    ],
    [Lang.de]: [
      'Wechsel von React zu Vue.',
      'Wechsel von Webpack zu Vite.',
      'Der Code wurde in asynchronen und stabileren Code umgeschrieben.',
      'Das System zur Verarbeitung von _templates-Vorlagen wurde verbessert.',
      'Die Aktualisierung des Programms ist einfacher und weniger fehleranfällig geworden.',
      'Die Standardeinstellungen der Fahrzeuge wurden aktualisiert.',
      'Leider gibt es keine Unterstützung für Windows 7, 8/8.1 mehr.',
      'Alle Fehler werden jetzt dem Benutzer angezeigt.',
      'Das Ändern der Einstellungen erfordert keinen Neustart des Programms mehr.',
      'Zusätzliche Parameter wurden in die Tabelle selbst übertragen.',
      'Unterstützung für CAS- und NE-Regionen bei Auto hinzugefügt.',
      'Es wurde die Möglichkeit hinzugefügt, mehrere Autoeinstellungen in einer Datei zu speichern.',
      'Es wurde die Möglichkeit hinzugefügt, mehrere Regionen auszuwählen.',
      'Option zum Importieren/Zurücksetzen in der Liste hinzugefügt.',
      'Die Wiederherstellung nach dem Update des Spiels wurde behoben.',
      'Ein Fehler mit dem Flag "schreibgeschützt" bei initial wurde behoben.pak.',
      'Der weiße Bildschirm der Tabelle wurde behoben, wenn die Datei nicht gelesen wurde.'
    ],
    [Lang.ch]: [
      '从React切换到Vue。',
      '从Webpack切换到Vite。',
      '代码已被重写为异步和更稳定。',
      '改进了_templates模板处理系统。',
      '程序更新变得更简单，更不容易出错。',
      '标准汽车参数已更新。',
      '不幸的是不再支持Windows7, 8/8.1。',
      '任何错误现在都显示给用户。',
      '更改设置不再需要重新启动程序。',
      '其他参数已移动到表本身。',
      '增加了对汽车的CAS和NE区域的支持。',
      '增加了将几辆车的参数保存在一个文件中的功能。',
      '增加了选择多个地区的能力。',
      '增加了在列表中导入/重置的功能。',
      '修复了更新游戏后的恢复操作。',
      '修复了初始"只读"标志的错误。帕克。',
      '修复了读取文件错误时表格的"白屏"。'
    ]
  }
})
</script>

<style lang='scss'>
body {
  background-color: white;
}
</style>

<style lang='scss' scoped>
.container {
  overflow: auto;
}
</style>
