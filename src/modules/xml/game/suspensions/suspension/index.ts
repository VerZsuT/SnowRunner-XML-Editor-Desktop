import type { INumberAttrDescriptor, IStringAttrDescriptor } from '../../attributes'
import { floatAttr, lazy, limit, stringAttr } from '../../attributes'
import Limit from '../../limit'
import type { WheelLocation } from '../../truck/truck-data/wheels/wheel'
import XMLWithTemplates from '../../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Подвеска. */
export default class Suspension extends XMLWithTemplates {
  /** Тип колеса. */
  @stringAttr()
  accessor WheelType: WheelLocation | undefined
  declare $WheelType: IStringAttrDescriptor<WheelLocation>

  /** Высота подвески. */
  @limit(new Limit({ min: -1000.0, max: 1000.0 }))
  @floatAttr()
  accessor Height: number | undefined
  declare $Height: INumberAttrDescriptor
 @lazy get HeightDesc() {
    return new BaseLocalization()
      .ru('Высота подвески')
      .en('Suspension height')
      .de('Höhe der Aufhängung')
      .get(Config)
 }

  /** Жесткость подвески. */
  @limit(new Limit({ min: 0.01 }))
  @floatAttr()
  accessor Strength: number | undefined
  declare $Strength: INumberAttrDescriptor
  @lazy get StrengthDesc() {
    return new BaseLocalization()
      .ru('Жесткость подвески')
      .en('Suspension stiffness')
      .de('Federungssteifigkeit')
      .get(Config)
  }

  /** Затухание. */
  @limit(new Limit({ min: 0.0, max: 1000.0 }))
  @floatAttr()
  accessor Damping: number | undefined
  declare $Damping: INumberAttrDescriptor
  @lazy get DampingDesc() {
    return new BaseLocalization()
      .ru('Демпинг (снижение скорости и интенсивности вибраций)')
      .en('Damping (reducing the speed and intensity of vibrations)')
      .de('Damping (reduzierte Geschwindigkeit und Vibrationsintensität)')
      .get(Config)
  }

  /** Минимальный ход подвески. */
  @limit(new Limit({ min: -1000.0, max: 1000.0 }))
  @floatAttr()
  accessor SuspensionMin: number | undefined
  declare $SuspensionMin: INumberAttrDescriptor
  @lazy get SuspensionMinDesc() {
    return new BaseLocalization()
      .ru('Минимальный ход подвески (Позиция, которую колесо может принять при полной просадке подвески)')
      .en('Minimum suspension stroke (The position that the wheel can take when the suspension is fully sagged)')
      .de('Minimaler Federweg (Position, die das Rad annehmen kann, wenn die Federung vollständig abfällt)')
      .get(Config)
  }

  /** Максимальный ход подвески. */
  @limit(new Limit({ min: -1000.0, max: 1000.0 }))
  @floatAttr()
  accessor SuspensionMax: number | undefined = 1.0
  declare $SuspensionMax: INumberAttrDescriptor
  @lazy get SuspensionMaxDesc() {
    return new BaseLocalization()
      .ru('Максимальный ход подвески (Позиция, которую может принять колесо, если подвеска в рабочем состоянии и ее жесткость равна нулю, когда колесо висит в воздухе)')
      .en('Maximum suspension travel (The position that the wheel can take if the suspension is in working condition and its stiffness is zero when the wheel is hanging in the air)')
      .de('Maximaler Federweg (Die Position, die das Rad annehmen kann, wenn die Federung in Betrieb ist und ihre Steifigkeit Null ist, wenn das Rad in der Luft hängt)')
      .get(Config)
  }

  /** Максимальный ход сломанной подвески. */
  @limit(new Limit({ min: -1000.0, max: 1000.0 }))
  @floatAttr()
  accessor BrokenSuspensionMax: number | undefined
  declare $BrokenSuspensionMax: INumberAttrDescriptor
  @lazy get BrokenSuspensionMaxDesc() {
    return new BaseLocalization()
      .ru('Максимальный ход сломанной подвески')
      .en('The maximum stroke of a broken suspension')
      .de('Maximaler Hub der gebrochenen Aufhängung')
      .get(Config)
  }
}
