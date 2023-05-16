import { createSelectors, forEach, selector } from '../helpers'
import { Coords, File, Float, ForEach, Group, Int, Select, Template, Text } from '../items'
import $ from './truck.texts'

import { FileType } from '#g/enums'
import type { IXMLTemplate } from '#g/types'
import { AddonsContent, BanditCrane, Cranes, Trailers } from '#r_editor/extraActions'

class Selectors {
  @selector truckData = 'Truck.TruckData'
  @selector gameData = 'Truck.GameData'
  @selector UIDesc = `${this.gameData}.UiDesc`
  @selector wheels = `${this.truckData}.Wheels`
  @selector extraWheels = `${this.truckData}.ExtraWheels`
  @selector extraWheel = `${this.extraWheels}.Wheel${forEach}`
  @selector compatibleWheels = `${this.truckData}.CompatibleWheels${forEach}`
  @selector upgradableWinch = `${this.truckData}.WinchUpgradeSocket`
  @selector staticWinch = `${this.truckData}.Winch`
  @selector suspension = `${this.truckData}.SuspensionSocket`
  @selector gearbox = `${this.truckData}.GearboxSocket`
  @selector engine = `${this.truckData}.EngineSocket`
  @selector fuelTank = `${this.truckData}.FuelTank`
  @selector physicsBody = 'Truck.PhysicsModel.Body'
  @selector wheel = `${this.wheels}.Wheel${forEach}`
}

const selectors = createSelectors(Selectors)

const truckTemplate: IXMLTemplate = {
  selector: 'Truck',
  extraActions: [
    BanditCrane,
    AddonsContent,
    Cranes,
    Trailers
  ],
  template: Template({ ...selectors },
    Group({
      label: $.TEXT_GROUP_NAME,
      provided: selectors.UIDesc,
      iconName: 'texts.png'
    },
      Text({
        attribute: 'UiName',
        label: $.UI_NAME
      }),
      Text({
        attribute: 'UiDesc',
        label: $.UI_DESC
      })
    ),
    Group({
      label: $.CONTROL_GROUP_NAME,
      provided: selectors.truckData,
      iconName: 'steering-wheel.png'
    },
      Float({
        attribute: 'Responsiveness',
        label: $.RESPONSIVENESS,
        max: 1.0,
        min: 0.0,
        step: 0.01
      }),
      Float({
        attribute: 'BackSteerSpeed',
        label: $.BACK_STEER_SPEED,
        max: 1.0,
        min: 0.0,
        step: 0.01
      }),
      Float({
        attribute: 'SteerSpeed',
        label: $.STEER_SPEED,
        max: 1.0,
        min: 0.0,
        step: 0.01
      })
    ),
    Group({
      label: $.WINCH_GROUP_NAME,
      iconName: 'winches.png'
    },
      Float({
        attribute: 'Length',
        selector: selectors.staticWinch,
        label: $.WINCH_LENGTH,
        max: 100,
        min: 0,
        step: 1,
        default: 14
      }),
      Float({
        attribute: 'StrengthMult',
        selector: selectors.staticWinch,
        label: $.WINCH_STRENGTH,
        max: 10,
        min: 0,
        default: 1
      }),
      File({
        attribute: 'Type',
        selector: selectors.upgradableWinch,
        type: FileType.winches
      })
    ),
    Group({
      label: $.WHEELS_GROUP_NAME,
      provided: selectors.wheels,
      iconName: 'wheels.png'
    },
      Group($.PHYSICS_WHEELS,
        ForEach(selectors.wheel,
          Group({
            label: $.WHEEL,
            provided: selectors.wheel,
            addCounter: true
          },
            Select({
              attribute: 'Torque',
              label: $.TORQUE,
              options: [
                ['default', $.TORQUE_DEFAULT],
                ['full', $.TORQUE_FULL],
                ['none', $.TORQUE_NONE],
                ['connectable', $.TORQUE_CONNECTABLE]
              ],
              default: 2
            }),
            Float({
              attribute: 'SteeringAngle',
              label: $.STEERING_ANGLE,
              max: 90,
              min: -90,
              step: 1,
              default: 0
            })
          )
        ),
        ForEach(selectors.extraWheel,
          Group({
            label: $.EXTRA_WHEEL,
            provided: selectors.extraWheel,
            addCounter: true
          },
            Select({
              attribute: 'Torque',
              label: $.TORQUE,
              options: [
                ['default', $.TORQUE_DEFAULT],
                ['full', $.TORQUE_FULL],
                ['none', $.TORQUE_NONE],
                ['connectable', $.TORQUE_CONNECTABLE]
              ],
              default: 2
            }),
            Float({
              attribute: 'SteeringAngle',
              label: $.STEERING_ANGLE,
              max: 90,
              min: -90,
              step: 1,
              default: 0
            })
          )
        )
      ),
      Group($.WHEELS_SIZES,
        ForEach(selectors.compatibleWheels,
          Group({
            label: $.WHEELS_SET,
            provided: selectors.compatibleWheels,
            addCounter: true
          },
            Float({
              attribute: 'Scale',
              label: $.WHEELS_SCALE
            })
          )
        )
      ),
      File({
        attribute: 'DefaultWheelType',
        type: FileType.wheels
      })
    ),
    Group({
      label: $.SUSPENSION_GROUP_NAME,
      provided: selectors.suspension,
      iconName: 'suspensions.png'
    },
      Coords({
        attribute: 'CenterOfMassOffset',
        selector: selectors.physicsBody,
        label: $.CENTER_OF_MASS
      }),
      Select({
        attribute: 'DiffLockType',
        selector: selectors.truckData,
        label: $.DIFF_LOCK,
        options: [
          ['None', $.NONE],
          ['Installed', $.INSTALLED],
          ['Uninstalled', $.UNINSTALLED],
          ['Always', $.ALWAYS]
        ]
      }),
      File({
        attribute: 'Type',
        type: FileType.suspensions
      })
    ),
    Group({
      label: $.GEARBOX_GROUP_NAME,
      provided: selectors.gearbox,
      iconName: 'gearboxes.png'
    },
      File({
        attribute: 'Type',
        type: FileType.gearboxes
      })
    ),
    Group({
      label: $.ENGINE_GROUP_NAME,
      provided: selectors.engine,
      iconName: 'engines.png'
    },
      Float({
        attribute: 'EngineStartDelay',
        selector: selectors.truckData,
        label: $.ENGINE_START_DELAY,
        max: 8,
        min: 0
      }),
      Float({
        attribute: 'ExhaustStartTime',
        selector: selectors.truckData,
        label: $.EXHAUST_START_TIME,
        min: 0
      }),
      File({
        attribute: 'Type',
        type: FileType.engines
      })
    ),
    Group({
      label: $.FUEL_GROUP_NAME,
      provided: selectors.fuelTank,
      iconName: 'fuel.png'
    },
      Int({
        attribute: 'DamageCapacity',
        label: $.DAMAGE_CAPACITY,
        step: 10,
        default: 0,
        areas: {
          yellow: [1000, 5000],
          red: [5001, Infinity]
        }
      }),
      Int({
        attribute: 'FuelCapacity',
        selector: selectors.truckData,
        label: $.FUEL_CAPACITY,
        step: 10,
        areas: {
          yellow: [1000, 5000],
          red: [5001, Infinity]
        }
      })
    ),
    Group({
      label: $.UNLOCK_GROUP_NAME,
      provided: selectors.gameData,
      iconName: 'unlock.png'
    },
      Select({
        attribute: 'Country',
        label: $.COUNTRY,
        options: [
          [['RU', 'RU,CAS'], $.RUSSIA],
          ['US', $.US],
          ['EMPTY', $.ANY]
        ]
      }),
      Int({
        attribute: 'Price',
        label: $.PRICE
      }),
      Select({
        attribute: 'UnlockByExploration',
        label: $.BY_EXPLORATION,
        options: [
          ['true', $.FIND_ON_MAP],
          ['false', $.BY_RANK]
        ]
      }),
      Int({
        attribute: 'UnlockByRank',
        label: $.UNLOCK_BY_RANK,
        max: 30,
        min: 1
      })
    )
  )
}

export default truckTemplate
