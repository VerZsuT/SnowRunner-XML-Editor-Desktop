import { Localization, LocalizationStrings } from '@localization'

/** Тексты диалогов. */
export const DIALOGS_LOCALIZATION = new Localization({
  /** Заголовок ошибки. */
  error: new LocalizationStrings()
    .ru('Ошибка')
    .en('Error')
    .de('Fehler')
    .ch('误差'),

  /** Текст "ОК". */
  ok: new LocalizationStrings()
    .ru('Ок')
    .en('Ok')
    .de('Ok')
    .ch('确认')
})
