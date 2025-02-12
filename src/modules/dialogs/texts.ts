import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default createTextsLoader({
  /** Заголовок ошибки */
  error: new BaseLocalization()
    .ru('Ошибка')
    .en('Error')
    .de('Fehler')
    .ch('误差'),
  /** Текст "ОК" */
  ok: new BaseLocalization()
    .ru('Ок')
    .en('Ok')
    .de('Ok')
    .ch('确认')
})
