import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import { BaseWheelFriction } from '../base'
import type { NumUtils } from '../game-xml'
import { floatAttr, intAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'

/** Рутовый тег файла класса коробки передач */
export default class Wheel extends XMLWithTemplates {
  static override async fromFile(file: File): Promise<Wheel | undefined> {
    const rootSelector = 'TruckWheel'
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

  /** Масса колеса */
  @intAttr(Limit.Positive.fixed())
  get Mass(): number | undefined { return undefined }
  set Mass(_) {}
  @numUtils()
  get $Mass() { return {} as NumUtils }

  /** Радиус колеса */
  @floatAttr(Limit.Positive)
  get Radius(): number | undefined { return undefined }
  set Radius(_) {}
  @numUtils()
  get $Radius() { return {} as NumUtils }

  /** Ширина */
  @floatAttr(Limit.Positive)
  get Width(): number | undefined { return undefined }
  set Width(_) {}
  @numUtils()
  get $Width() { return {} as NumUtils }

  /** Размер допустимого ущерба */
  @intAttr(new Limit({ min: 0, max: 64_000, fixed: true }))
  get DamageCapacity(): number | undefined { return undefined }
  set DamageCapacity(_) {}
  @numUtils()
  get $DamageCapacity() { return {} as NumUtils }

  /** Трение колеса */
  @innerElement(BaseWheelFriction, 'WheelFriction', true)
  get WheelFriction(): BaseWheelFriction | undefined { return undefined }
}
