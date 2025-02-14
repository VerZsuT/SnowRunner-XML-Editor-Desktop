import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  scale: new BaseLocalization()
    .ru('Размер колеса')
    .en('Wheel size')
    .de('Rad-Größe')
    .ch('车轮尺寸'),

  type: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题')
}).loadRenderer()
