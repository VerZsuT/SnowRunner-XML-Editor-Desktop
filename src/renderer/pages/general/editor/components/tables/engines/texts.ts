import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  engine: new BaseLocalization()
    .ru('Двигатель')
    .en('Engine')
    .de('Motor')
    .ch('发动机')
}).loadRenderer()
