import { ForEach, Group, Num, Select, Template } from '../items'
import { gearPreset } from '../presets/gear'
import { unlockGroup } from '../presets/unlockGroup'
import { forEach, forEachBy, initSelectors, selector } from '../service'
import {
  ALLOW,
  AWD_CONSUMPTION_MODIFIER,
  CRITICAL_DAMAGE_THRESHOLD,
  DAMAGE_CAPACITY,
  DAMAGED_CONSUMPTION_MODIFIER,
  FUEL_CONSUMPTION,
  GEAR_ALLOW,
  GEAR_NOT_ALLOW,
  GEARBOX_PARAMS,
  GEARS,
  HIGH_GEAR,
  IDLE_FUEL_CONSUMPTION,
  LOWER_GEAR,
  LOWER_MANUAL_GEAR,
  LOWER_MINUS_GEAR,
  LOWER_PLUS_GEAR,
  NOT_ALLOW,
  REVERSE_GEAR
} from './texts'

import { NameType, NumberType } from '#enums'
import type { IXMLTemplate } from '#types'

class Selectors {
  @selector gearbox = `GearboxVariants.Gearbox${forEach}`
  @selector gearboxText = `${this.gearbox}.GameData.UiDesc`
  @selector reverseGear = `${this.gearbox}.ReverseGear`
  @selector highGear = `${this.gearbox}.HighGear`
  @selector gearItem = `${this.gearbox}.Gear${forEachBy(2)}`
  @selector gameData = `${this.gearbox}.GameData`
  @selector gearboxParams = `${this.gameData}.GearboxParams`
}

const selectors = initSelectors(new Selectors())

export const gearboxTemplate = {
  selector: 'GearboxVariants',
  template: new Template({ ...selectors }, [
    new ForEach(selectors.gearbox, [
      new Group({
        label: {
          type: NameType.computed,
          attribute: ['UiName', 'Name'],
          selector: [selectors.gearboxText, selectors.gearbox]
        },
        provided: selectors.gearbox
      }, [
        new Num({
          attribute: 'AWDConsumptionModifier',
          label: AWD_CONSUMPTION_MODIFIER,
          max: 32,
          min: 0,
          default: 1
        }),
        new Num({
          attribute: 'CriticalDamageThreshold',
          label: CRITICAL_DAMAGE_THRESHOLD,
          max: 0.999,
          min: 0,
          step: 0.01,
          default: 0.7
        }),
        new Num({
          attribute: 'DamageCapacity',
          type: NumberType.integer,
          label: DAMAGE_CAPACITY,
          max: 64000,
          step: 10,
          default: 0,
          areas: {
            yellow: [[1000, 10000]],
            red: [[10001, Infinity]]
          }
        }),
        new Num({
          attribute: 'DamagedConsumptionModifier',
          label: DAMAGED_CONSUMPTION_MODIFIER,
          max: 32,
          min: 0,
          step: 0.01,
          default: 1
        }),
        new Num({
          attribute: 'FuelConsumption',
          label: FUEL_CONSUMPTION,
          max: 10,
          min: 0,
          default: 0.1
        }),
        new Num({
          attribute: 'IdleFuelModifier',
          label: IDLE_FUEL_CONSUMPTION,
          max: 10,
          min: 0,
          default: 0.3
        }),
        new Select({
          attribute: 'IsManualLowGear',
          selector: selectors.gearboxParams,
          label: LOWER_MANUAL_GEAR,
          options: {
            true: ALLOW,
            false: NOT_ALLOW
          },
          default: 'false'
        }),
        new Group({
          label: GEARBOX_PARAMS,
          provided: selectors.gearboxParams
        }, [
          new Select({
            attribute: 'IsHighGearExists',
            label: HIGH_GEAR,
            options: {
              true: GEAR_ALLOW,
              false: GEAR_NOT_ALLOW
            },
            default: 'true'
          }),
          new Select({
            attribute: 'IsLowerGearExists',
            label: LOWER_GEAR,
            options: {
              true: GEAR_ALLOW,
              false: GEAR_NOT_ALLOW
            },
            default: 'true'
          }),
          new Select({
            attribute: 'IsLowerPlusGearExists',
            label: LOWER_PLUS_GEAR,
            options: {
              true: GEAR_ALLOW,
              false: GEAR_NOT_ALLOW
            },
            default: 'true'
          }),
          new Select({
            attribute: 'IsLowerMinusGearExists',
            label: LOWER_MINUS_GEAR,
            options: {
              true: GEAR_ALLOW,
              false: GEAR_NOT_ALLOW
            },
            default: 'true'
          })
        ]),
        new Group(GEARS, [
          new Group({
            label: REVERSE_GEAR,
            provided: selectors.reverseGear
          }, gearPreset),
          new Group({
            label: HIGH_GEAR,
            provided: selectors.highGear
          }, gearPreset),
          new ForEach(selectors.gearItem, [
            new Group({
              label: '',
              provided: selectors.gearItem,
              addCounter: true
            }, gearPreset)
          ])
        ]),
        unlockGroup(selectors.gameData)
      ])
    ])
  ])
} as IXMLTemplate
