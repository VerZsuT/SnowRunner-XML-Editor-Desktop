import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import type { NumUtils } from '../game-xml'
import { floatAttr, intAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'
import TruckRims from './rims'
import TruckTires from './tires'

export * from './rims'
export { default as TruckRims } from './rims'
export * from './tires'
export { default as TruckTires } from './tires'

/** Рутовый тег файла класса типа колес (набор взаимозаменяемых шин и дисков) */
export default class Wheels extends XMLWithTemplates {
  static override async fromFile(file: File): Promise<Wheels | undefined> {
    const rootSelector = 'TruckWheels'
    const root = await XMLElement.fromFile(file)
    const element = root?.select(rootSelector)
    if (!root || !element) return

    return new this(
      element,
      await XMLTemplates.fromXML(root),
      rootSelector,
      root
    )
  }

  /** Размер допустимого ущерба */
  @intAttr(new Limit({ min: 0, max: 64_000, fixed: true }))
  get DamageCapacity(): number | undefined { return undefined }
  set DamageCapacity(_) {}
  @numUtils()
  get $DamageCapacity() { return {} as NumUtils }

  /** Радиус колеса */
  @floatAttr(Limit.Positive)
  get Radius() { return 1.0 }
  set Radius(_: number | undefined) {}
  @numUtils()
  get $Radius() { return {} as NumUtils }

  /** Ширина колеса */
  @floatAttr(Limit.Positive)
  get Width() { return 1.0 }
  set Width(_: number | undefined) {}
  @numUtils()
  get $Width() { return {} as NumUtils }

  /** Радиус заднего колеса */
  @floatAttr(Limit.Positive)
  get RadiusRear() { return 1.0 }
  set RadiusRear(_: number | undefined) {}
  @numUtils()
  get $RadiusRear() { return {} as NumUtils }

  /** Ширина заднего колеса */
  @floatAttr(Limit.Positive)
  get WidthRear() { return 1.0 }
  set WidthRear(_: number | undefined) {}
  @numUtils()
  get $WidthRear() { return {} as NumUtils }

  /** Секция описания шин */
  @innerElement(TruckTires)
  get TruckTires(): TruckTires | undefined { return undefined }

  /** Секция описания дисков */
  @innerElement(TruckRims)
  get TruckRims(): TruckRims | undefined { return undefined }
}
