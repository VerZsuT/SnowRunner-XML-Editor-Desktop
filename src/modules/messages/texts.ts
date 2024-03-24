import { BaseLocalization, BaseLocalizationObj } from '/utils/texts/base-localization'

export default new BaseLocalizationObj({
  /** Заголовок ошибки */
  error: new BaseLocalization()
    .ru('Ошибка')
    .en('Error')
    .de('Fehler')
    .ch('误差')
})
