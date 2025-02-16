import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Тексты загрузки. */
export default createTextsLoader({
  /** Завершено. */
  completed: new BaseLocalization()
    .ru('Завершено')
    .en('Completed')
    .de('Abgeschlossen')
    .ch('已完成')
})
