import AddonsContent from '../../actions/AddonsContent'
import BanditCrane from '../../actions/BanditCrane'
import Cranes from '../../actions/cranes'
import Trailers from '../../actions/trailers'
import { Coords, File, Float, ForEach, Group, Int, Select, Template, Text } from '../items'
import { createSelectors, forEach, selector } from '../service'
import $ from './texts'

import { FileType } from '#enums'
import type { IXMLTemplate } from '#types'

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

export default {
  selector: 'Truck',
  actions: [
    BanditCrane,
    AddonsContent,
    Cranes,
    Trailers
  ],
  template: new Template({ ...selectors },
    new Group({
      label: $.TEXT_GROUP_NAME,
      provided: selectors.UIDesc,
      iconName: 'texts.png'
    },
      new Text({
        attribute: 'UiName',
        label: $.UI_NAME
      }),
      new Text({
        attribute: 'UiDesc',
        label: $.UI_DESC
      })
    ),
    new Group({
      label: $.CONTROL_GROUP_NAME,
      provided: selectors.truckData,
      iconName: 'steering-wheel.png'
    },
      new Float({
        attribute: 'Responsiveness',
        label: $.RESPONSIVENESS,
        max: 1.0,
        min: 0.0,
        step: 0.01
      }),
      new Float({
        attribute: 'BackSteerSpeed',
        label: $.BACK_STEER_SPEED,
        max: 1.0,
        min: 0.0,
        step: 0.01
      }),
      new Float({
        attribute: 'SteerSpeed',
        label: $.STEER_SPEED,
        max: 1.0,
        min: 0.0,
        step: 0.01
      })
    ),
    new Group({
      label: $.WINCH_GROUP_NAME,
      iconName: 'winches.png'
    },
      new Float({
        attribute: 'Length',
        selector: selectors.staticWinch,
        label: $.WINCH_LENGTH,
        max: 100,
        min: 0,
        step: 1,
        default: 14
      }),
      new Float({
        attribute: 'StrengthMult',
        selector: selectors.staticWinch,
        label: $.WINCH_STRENGTH,
        max: 10,
        min: 0,
        default: 1
      }),
      new File({
        attribute: 'Type',
        selector: selectors.upgradableWinch,
        type: FileType.winches
      })
    ),
    new Group({
      label: $.WHEELS_GROUP_NAME,
      provided: selectors.wheels,
      iconName: 'wheels.png'
    },
      new Group($.PHYSICS_WHEELS,
        new ForEach(selectors.wheel,
          new Group({
            label: $.WHEEL,
            provided: selectors.wheel,
            addCounter: true
          },
            new Select({
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
            new Float({
              attribute: 'SteeringAngle',
              label: $.STEERING_ANGLE,
              max: 90,
              min: -90,
              step: 1,
              default: 0
            })
          )
        ),
        new ForEach(selectors.extraWheel,
          new Group({
            label: $.EXTRA_WHEEL,
            provided: selectors.extraWheel,
            addCounter: true
          },
            new Select({
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
            new Float({
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
      new Group($.WHEELS_SIZES,
        new ForEach(selectors.compatibleWheels,
          new Group({
            label: $.WHEELS_SET,
            provided: selectors.compatibleWheels,
            addCounter: true
          },
            new Float({
              attribute: 'Scale',
              label: $.WHEELS_SCALE
            })
          )
        )
      ),
      new File({
        attribute: 'DefaultWheelType',
        type: FileType.wheels
      })
    ),
    new Group({
      label: $.SUSPENSION_GROUP_NAME,
      provided: selectors.suspension,
      iconName: 'suspensions.png'
    },
      new Coords({
        attribute: 'CenterOfMassOffset',
        selector: selectors.physicsBody,
        label: $.CENTER_OF_MASS
      }),
      new Select({
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
      new File({
        attribute: 'Type',
        type: FileType.suspensions
      })
    ),
    new Group({
      label: $.GEARBOX_GROUP_NAME,
      provided: selectors.gearbox,
      iconName: 'gearboxes.png'
    },
      new File({
        attribute: 'Type',
        type: FileType.gearboxes
      })
    ),
    new Group({
      label: $.ENGINE_GROUP_NAME,
      provided: selectors.engine,
      iconName: 'engines.png'
    },
      new Float({
        attribute: 'EngineStartDelay',
        selector: selectors.truckData,
        label: $.ENGINE_START_DELAY,
        max: 8,
        min: 0
      }),
      new Float({
        attribute: 'ExhaustStartTime',
        selector: selectors.truckData,
        label: $.EXHAUST_START_TIME,
        min: 0
      }),
      new File({
        attribute: 'Type',
        type: FileType.engines
      })
    ),
    new Group({
      label: $.FUEL_GROUP_NAME,
      provided: selectors.fuelTank,
      iconName: 'fuel.png'
    },
      new Int({
        attribute: 'DamageCapacity',
        label: $.DAMAGE_CAPACITY,
        step: 10,
        default: 0,
        areas: {
          yellow: [1000, 5000],
          red: [5001, Infinity]
        }
      }),
      new Int({
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
    new Group({
      label: $.UNLOCK_GROUP_NAME,
      provided: selectors.gameData,
      iconName: 'unlock.png'
    },
      new Select({
        attribute: 'Country',
        label: $.COUNTRY,
        options: [
          ['RU', $.RUSSIA],
          ['US', $.US],
          ['EMPTY', $.ANY]
        ]
      }),
      new Int({
        attribute: 'Price',
        label: $.PRICE
      }),
      new Select({
        attribute: 'UnlockByExploration',
        label: $.BY_EXPLORATION,
        options: [
          ['true', $.FIND_ON_MAP],
          ['false', $.BY_RANK]
        ]
      }),
      new Int({
        attribute: 'UnlockByRank',
        label: $.UNLOCK_BY_RANK,
        max: 30,
        min: 1
      })
    )
  )
} as IXMLTemplate
