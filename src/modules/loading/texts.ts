import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default createTextsLoader({
	completed: new BaseLocalization()
    .ru('Завершено')
    .en('Completed')
    .de('Abgeschlossen')
    .ch('已完成')
})
