import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  loading: new Localization()
    .ru('Загрузка')
    .en('Loading')
    .de('Herunterladen')
    .ch('加载'),
  download: new Localization()
    .ru('Скачивание')
    .en('Downloading')
    .de('Herunterladen')
    .ch('下载')
}).get()
