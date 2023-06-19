import { createSelectors, forEach, forEachBy, selector } from '../helpers'
import { Float, ForEach, Group, Int, Select, Template } from '../items'
import gearPreset from '../presets/gear.preset'
import unlockGroup from '../presets/unlock-group.preset'
import $ from './gearbox.texts'

import type { IXMLTemplate } from '#g/types'

const selectors = createSelectors(class {
  @selector static gearbox = `GearboxVariants.Gearbox${forEach}` as const
  @selector static gearboxText = `${this.gearbox}.GameData.UiDesc` as const
  @selector static reverseGear = `${this.gearbox}.ReverseGear` as const
  @selector static highGear = `${this.gearbox}.HighGear` as const
  @selector static gearItem = `${this.gearbox}.Gear${forEachBy(2)}` as const
  @selector static gameData = `${this.gearbox}.GameData` as const
  @selector static gearboxParams = `${this.gameData}.GearboxParams` as const
})

export default {
  selector: 'GearboxVariants',
  template: Template({ ...selectors },
    ForEach(selectors.gearbox,
      Group({
        label: {
          selector: [selectors.gearboxText, selectors.gearbox],
          attribute: ['UiName', 'Name']
        },
        provided: selectors.gearbox
      },
        Float({
          attribute: 'AWDConsumptionModifier',
          label: $.AWD_CONSUMPTION_MODIFIER,
          max: 32,
          min: 0,
          default: 1
        }),
        Float({
          attribute: 'CriticalDamageThreshold',
          label: $.CRITICAL_DAMAGE_THRESHOLD,
          max: 0.999,
          min: 0,
          step: 0.01,
          default: 0.7
        }),
        Int({
          attribute: 'DamageCapacity',
          label: $.DAMAGE_CAPACITY,
          max: 64000,
          step: 10,
          default: 0,
          areas: {
            yellow: [1000, 10000],
            red: [10001, Infinity]
          }
        }),
        Float({
          attribute: 'DamagedConsumptionModifier',
          label: $.DAMAGED_CONSUMPTION_MODIFIER,
          max: 32,
          min: 0,
          step: 0.01,
          default: 1
        }),
        Float({
          attribute: 'FuelConsumption',
          label: $.FUEL_CONSUMPTION,
          max: 10,
          min: 0,
          default: 0.1
        }),
        Float({
          attribute: 'IdleFuelModifier',
          label: $.IDLE_FUEL_CONSUMPTION,
          max: 10,
          min: 0,
          default: 0.3
        }),
        Select({
          attribute: 'IsManualLowGear',
          selector: selectors.gearboxParams,
          label: $.LOWER_MANUAL_GEAR,
          options: [
            ['true', $.ALLOW],
            ['false', $.NOT_ALLOW]
          ],
          default: 1
        }),
        Group({
          label: $.GEARBOX_PARAMS,
          provided: selectors.gearboxParams
        },
          Select({
            attribute: 'IsHighGearExists',
            label: $.HIGH_GEAR,
            options: [
              ['true', $.GEAR_ALLOW],
              ['false', $.GEAR_NOT_ALLOW]
            ],
            default: 0
          }),
          Select({
            attribute: 'IsLowerGearExists',
            label: $.LOWER_GEAR,
            options: [
              ['true', $.GEAR_ALLOW],
              ['false', $.GEAR_NOT_ALLOW]
            ],
            default: 0
          }),
          Select({
            attribute: 'IsLowerPlusGearExists',
            label: $.LOWER_PLUS_GEAR,
            options: [
              ['true', $.GEAR_ALLOW],
              ['false', $.GEAR_NOT_ALLOW]
            ],
            default: 0
          }),
          Select({
            attribute: 'IsLowerMinusGearExists',
            label: $.LOWER_MINUS_GEAR,
            options: [
              ['true', $.GEAR_ALLOW],
              ['false', $.GEAR_NOT_ALLOW]
            ],
            default: 0
          })
        ),
        Group($.GEARS,
          Group({
            label: $.REVERSE_GEAR,
            provided: selectors.reverseGear
          }, ...gearPreset),
          Group({
            label: $.HIGH_GEAR,
            provided: selectors.highGear
          }, ...gearPreset),
          ForEach(selectors.gearItem,
            Group({
              label: '',
              provided: selectors.gearItem,
              addCounter: true
            }, ...gearPreset)
          )
        ),
        unlockGroup(selectors.gameData)
      )
    )
  )
} satisfies IXMLTemplate
