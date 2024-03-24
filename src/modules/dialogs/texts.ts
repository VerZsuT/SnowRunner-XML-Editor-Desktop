import { BaseLocalization, BaseLocalizationObj } from '/utils/texts/base-localization'

export default new BaseLocalizationObj({
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
