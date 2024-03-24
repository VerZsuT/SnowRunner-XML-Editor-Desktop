import type { NumUtils, StrUtils } from '../../game-xml'
import { floatAttr, numUtils, strAttr, strUtils } from '../../game-xml'
import Limit from '../../limit'
import type { WheelLocation } from '../../truck/truck-data/wheels/wheel'
import XMLWithTemplates from '../../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

/** Подвеска */
export default class Suspension extends XMLWithTemplates {
  /** Тип колеса */
  @strAttr()
  get WheelType(): WheelLocation | undefined { return undefined }
  set WheelType(_) {}
  @strUtils()
  get $WheelType() { return {} as StrUtils }

  /** Высота подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get Height(): number | undefined { return undefined }
  set Height(_) {}
  @numUtils()
  get $Height() { return {} as NumUtils }
  HeightDesc = new Localization()
    .ru('Высота подвески')
    .en('Suspension height')
    .de('Höhe der Aufhängung')
    .get()

  /** Жесткость подвески */
  @floatAttr(new Limit({ min: 0.01 }))
  get Strength(): number | undefined { return undefined }
  set Strength(_) {}
  @numUtils()
  get $Strength() { return {} as NumUtils }
  StrengthDesc = new Localization()
    .ru('Жесткость подвески')
    .en('Suspension stiffness')
    .de('Federungssteifigkeit')
    .get()

  /** Затухание */
  @floatAttr(new Limit({ min: 0.0, max: 1000.0 }))
  get Damping(): number | undefined { return undefined }
  set Damping(_) {}
  @numUtils()
  get $Damping() { return {} as NumUtils }
  DampingDesc = new Localization()
    .ru('Демпинг (снижение скорости и интенсивности вибраций)')
    .en('Damping (reducing the speed and intensity of vibrations)')
    .de('Damping (reduzierte Geschwindigkeit und Vibrationsintensität)')
    .get()

  /** Минимальный ход подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get SuspensionMin(): number | undefined { return undefined }
  set SuspensionMin(_) {}
  @numUtils()
  get $SuspensionMin() { return {} as NumUtils }
  SuspensionMinDesc = new Localization()
    .ru('Минимальный ход подвески (Позиция, которую колесо может принять при полной просадке подвески)')
    .en('Minimum suspension stroke (The position that the wheel can take when the suspension is fully sagged)')
    .de('Minimaler Federweg (Position, die das Rad annehmen kann, wenn die Federung vollständig abfällt)')
    .get()

  /** Максимальный ход подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get SuspensionMax(): number | undefined { return undefined }
  set SuspensionMax(_) {}
  @numUtils()
  get $SuspensionMax() { return {} as NumUtils }
  SuspensionMaxDesc = new Localization()
    .ru('Максимальный ход подвески (Позиция, которую может принять колесо, если подвеска в рабочем состоянии и ее жесткость равна нулю, когда колесо висит в воздухе)')
    .en('Maximum suspension travel (The position that the wheel can take if the suspension is in working condition and its stiffness is zero when the wheel is hanging in the air)')
    .de('Maximaler Federweg (Die Position, die das Rad annehmen kann, wenn die Federung in Betrieb ist und ihre Steifigkeit Null ist, wenn das Rad in der Luft hängt)')
    .get()

  /** Максимальный ход сломанной подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get BrokenSuspensionMax(): number | undefined { return undefined }
  set BrokenSuspensionMax(_) {}
  @numUtils()
  get $BrokenSuspensionMax() { return {} as NumUtils }
  BrokenSuspensionMaxDesc = new Localization()
    .ru('Максимальный ход сломанной подвески')
    .en('The maximum stroke of a broken suspension')
    .de('Maximaler Hub der gebrochenen Aufhängung')
    .get()
}
