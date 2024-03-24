<template>
  <div class="container">
    <VersionInfo
      version="1.0.0"
      :changes="v100.get()"
    />
  </div>
</template>

<script lang='ts' setup>
import VersionInfo from './version-info.vue'

import { ProgramWindow } from '/mods/renderer'
import { useWindowReady } from '/rend/utils'
import { Localization } from '/utils/texts/renderer'

useWindowReady(ProgramWindow.whatsNew)

const v100 = new Localization<string[]>()
  .ru([
    'Исправлен "CH" перевод',
    'Исправлена обработка некоторых уникальных авто',
    'Исправлено неправильное определение модов при одинаковом "modio.json" файле',
    'Обновлены стандартные параметры',
    'Добавлены текстовые описания параметров при наведении на название',
    'Добавлен центр масс прицепов',
    'Добавлена возможность открытия файлов сторонним редактором, используемых открытым авто (в расширенном режиме)',
    'Добавлен возврат состояния списка к тому что был до открытия таблицы'
  ])
  .en([
    'Fixed the "CH" translation',
    'Fixed the processing of some unique cars',
    'Fixed incorrect definition of mods with the same "modio.json" file',
    'Standard parameters have been updated',
    'Added text descriptions of parameters when hovering over the name',
    'Added the center of mass of trailers',
    'Added the ability to open files with a third-party editor used by an open auto (in advanced mode)',
    'Added a return of the list state to what it was before opening the table'
  ])
  .de([
    'Korrigiert "CH" Übersetzung',
    'Die Handhabung einiger einzigartiger Autos wurde behoben',
    'Es wurde eine falsche Definition von Mods bei demselben "modio" behoben.json" Datei',
    'Die Standardeinstellungen wurden aktualisiert',
    'Es wurden Textbeschreibungen für Parameter hinzugefügt, wenn Sie über den Titel schweben',
    'Das Massenzentrum der Anhänger wurde hinzugefügt',
    'Es wurde die Möglichkeit hinzugefügt, Dateien mit einem Drittanbieter-Editor zu öffnen, der von geöffnetem Auto (im erweiterten Modus) verwendet wird',
    'Hinzugefügt, um den Status der Liste zu dem zurückzugeben, was vor dem Öffnen der Tabelle war'
  ])
  .ch([
    '修正了"CH"翻译',
    '修正了一些独特的汽车的加工',
    '修正了mods的不正确定义与相同的"modio。json"文件',
    '标准参数已更新',
    '将鼠标悬停在名称上时添加了参数的文本描述',
    '增加了拖车的质心',
    '添加了使用open auto使用的第三方编辑器打开文件的功能（在高级模式下）',
    '添加了列表状态的返回到打开表之前的状态'
  ])
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
