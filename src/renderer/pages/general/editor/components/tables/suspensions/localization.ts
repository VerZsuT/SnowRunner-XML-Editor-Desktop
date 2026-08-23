import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export default loadLocalization(new Localization({
  suspensionSet: new LocalizationStrings()
    .ru('Подвески')
    .en('Suspension set')
    .de('Aufhängungsset')
    .ch('悬挂装置'),

  suspension: new LocalizationStrings()
    .ru('Ось')
    .en('Suspension')
    .de('Aussetzung')
    .ch('悬架'),

  frontSuspension: new LocalizationStrings()
    .ru('Передняя ось')
    .en('Front suspension')
    .de('Vorderachse')
    .ch('前桥'),

  middleSuspension: new LocalizationStrings()
    .ru('Центральная ось')
    .en('Middle suspension')
    .de('Zentralachse')
    .ch('中轴线'),

  rearSuspension: new LocalizationStrings()
    .ru('Задняя ось')
    .en('Rear suspension')
    .de('Hinterachse')
    .ch('后桥')
}))
