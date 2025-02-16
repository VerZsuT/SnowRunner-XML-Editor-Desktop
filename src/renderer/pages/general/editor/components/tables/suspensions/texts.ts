import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  suspensionSet: new BaseLocalization()
    .ru('Подвески')
    .en('Suspension set')
    .de('Aufhängungsset')
    .ch('悬挂装置'),

  suspension: new BaseLocalization()
    .ru('Ось')
    .en('Suspension')
    .de('Aussetzung')
    .ch('悬架'),

  frontSuspension: new BaseLocalization()
    .ru('Передняя ось')
    .en('Front suspension')
    .de('Vorderachse')
    .ch('前桥'),

  middleSuspension: new BaseLocalization()
    .ru('Центральная ось')
    .en('Middle suspension')
    .de('Zentralachse')
    .ch('中轴线'),

  rearSuspension: new BaseLocalization()
    .ru('Задняя ось')
    .en('Rear suspension')
    .de('Hinterachse')
    .ch('后桥')
}).loadRenderer()
