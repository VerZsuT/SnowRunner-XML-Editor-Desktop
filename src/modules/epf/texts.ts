import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default createTextsLoader({
  /** Файлы успешно объединены */
  successJoin: new BaseLocalization()
    .ru('Следующие файлы были объединены в один:')
    .en('The following files have been merged into one:')
    .de('Die folgenden Dateien wurden zu einem zusammengefasst:')
    .ch('以下文件已合并为一个'),
  /** Сообщение о содержимом */
  seeExportedMessage: new BaseLocalization()
    .ru('В данном файле находятся параметры следующих файлов:')
    .en('This file contains the parameters of the following files:')
    .de('Diese Datei enthält die Einstellungen der folgenden Dateien:')
    .ch('该文件包含以下文件的参数')
})
