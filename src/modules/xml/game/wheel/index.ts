import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import type { INumberAttrDescriptor } from '../attributes'
import { floatAttr, integerAttr, limit } from '../attributes'
import { BaseWheelFriction } from '../base'
import Limit from '../limit'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'

/** Рутовый тег файла класса коробки передач. */
export default class Wheel extends XMLWithTemplates {
  static override async from(str: string): Promise<Wheel | undefined>
  static override async from(file: File): Promise<Wheel | undefined>
  static override async from(source: string | File): Promise<Wheel | undefined> {
    const rootSelector = 'TruckWheel'
    const root = await XMLElement.from(source as File)
    const element = root?.select(rootSelector)

    if (root && element) {
      return new this(
        element,
        await XMLTemplates.from(root),
        rootSelector,
        root
      )
    }
  }

  /** Масса колеса. */
  @limit(Limit.Positive.fixed())
  @integerAttr()
  accessor Mass: number | undefined
  declare $Mass: INumberAttrDescriptor

  /** Радиус колеса. */
  @limit(Limit.Positive)
  @floatAttr()
  accessor Radius: number | undefined
  declare $Radius: INumberAttrDescriptor

  /** Ширина. */
  @limit(Limit.Positive)
  @floatAttr()
  accessor Width: number | undefined
  declare $Width: INumberAttrDescriptor

  /** Размер допустимого ущерба. */
  @limit(new Limit({ min: 0, max: 64_000, fixed: true }))
  @integerAttr()
  accessor DamageCapacity: number | undefined
  declare $DamageCapacity: INumberAttrDescriptor

  /** Трение колеса. */
  @innerElement(BaseWheelFriction, 'WheelFriction', true)
  readonly WheelFriction: BaseWheelFriction | undefined
}
