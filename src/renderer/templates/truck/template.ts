import { AddonsContent } from '../../actions/addonsContent'
import { Cranes } from '../../actions/cranes'
import { Trailers } from '../../actions/trailers'
import { BanditCrane } from '../../actions/zikz_605r/banditCrane'
import { Coords, File, ForEach, Group, Num, Select, Template, Text } from '../items'
import { forEach, initSelectors, selector } from '../service'
import {
  ALWAYS,
  ANY,
  BACK_STEER_SPEED,
  BY_EXPLORATION,
  BY_RANK,
  CENTER_OF_MASS,
  CONTROL_GROUP_NAME,
  COUNTRY,
  DAMAGE_CAPACITY,
  DIFF_LOCK,
  ENGINE_GROUP_NAME,
  ENGINE_START_DELAY,
  EXHAUST_START_TIME,
  EXTRA_WHEEL,
  FIND_ON_MAP,
  FUEL_CAPACITY,
  FUEL_GROUP_NAME,
  GEARBOX_GROUP_NAME,
  INSTALLED,
  NONE,
  PHYSICS_WHEELS,
  PRICE,
  RESPONSIVENESS,
  RUSSIA, STEERING_ANGLE, STEER_SPEED, SUSPENSION_GROUP_NAME,
  TEXT_GROUP_NAME,
  TORQUE,
  TORQUE_CONNECTABLE,
  TORQUE_DEFAULT,
  TORQUE_FULL,
  TORQUE_NONE,
  UI_DESC,
  UI_NAME,
  UNINSTALLED,
  UNLOCK_BY_RANK,
  UNLOCK_GROUP_NAME,
  US,
  WHEEL,
  WHEELS_GROUP_NAME,
  WHEELS_SCALE,
  WHEELS_SET,
  WHEELS_SIZES,
  WINCH_GROUP_NAME,
  WINCH_LENGTH,
  WINCH_STRENGTH
} from './texts'

import { FileType, NumberType } from '#enums'
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

const selectors = initSelectors(new Selectors())

export const truckTemplate = {
  selector: 'Truck',
  actions: [
    new BanditCrane(),
    new AddonsContent(),
    new Cranes(),
    new Trailers()
  ],
  template: new Template({ ...selectors }, [
    new Group({
      label: TEXT_GROUP_NAME,
      provided: selectors.UIDesc,
      iconName: 'texts.png'
    }, [
      new Text({
        attribute: 'UiName',
        label: UI_NAME
      }),
      new Text({
        attribute: 'UiDesc',
        label: UI_DESC
      })
    ]),
    new Group({
      label: CONTROL_GROUP_NAME,
      provided: selectors.truckData,
      iconName: 'steering-wheel.png'
    }, [
      new Num({
        attribute: 'Responsiveness',
        label: RESPONSIVENESS,
        max: 1.0,
        min: 0.0,
        step: 0.01
      }),
      new Num({
        attribute: 'BackSteerSpeed',
        label: BACK_STEER_SPEED,
        max: 1.0,
        min: 0.0,
        step: 0.01
      }),
      new Num({
        attribute: 'SteerSpeed',
        label: STEER_SPEED,
        max: 1.0,
        min: 0.0,
        step: 0.01
      })
    ]),
    new Group({
      label: WINCH_GROUP_NAME,
      iconName: 'winches.png'
    }, [
      new Num({
        attribute: 'Length',
        selector: selectors.staticWinch,
        label: WINCH_LENGTH,
        max: 100,
        min: 0,
        step: 1,
        default: 14
      }),
      new Num({
        attribute: 'StrengthMult',
        selector: selectors.staticWinch,
        label: WINCH_STRENGTH,
        max: 10,
        min: 0,
        default: 1
      }),
      new File({
        attribute: 'Type',
        selector: selectors.upgradableWinch,
        type: FileType.winches
      })
    ]),
    new Group({
      label: WHEELS_GROUP_NAME,
      provided: selectors.wheels,
      iconName: 'wheels.png'
    }, [
      new Group(PHYSICS_WHEELS, [
        new ForEach(selectors.wheel, [
          new Group({
            label: WHEEL,
            provided: selectors.wheel,
            addCounter: true
          }, [
            new Select({
              attribute: 'Torque',
              label: TORQUE,
              options: {
                default: TORQUE_DEFAULT,
                full: TORQUE_FULL,
                none: TORQUE_NONE,
                connectable: TORQUE_CONNECTABLE
              },
              default: 'none'
            }),
            new Num({
              attribute: 'SteeringAngle',
              label: STEERING_ANGLE,
              max: 90,
              min: -90,
              step: 1,
              default: 0
            })
          ])
        ]),
        new ForEach(selectors.extraWheel, [
          new Group({
            label: EXTRA_WHEEL,
            provided: selectors.extraWheel,
            addCounter: true
          }, [
            new Select({
              attribute: 'Torque',
              label: TORQUE,
              options: {
                default: TORQUE_DEFAULT,
                full: TORQUE_FULL,
                none: TORQUE_NONE,
                connectable: TORQUE_CONNECTABLE
              },
              default: 'none'
            }),
            new Num({
              attribute: 'SteeringAngle',
              label: STEERING_ANGLE,
              max: 90,
              min: -90,
              step: 1,
              default: 0
            })
          ])
        ])
      ]),
      new Group(WHEELS_SIZES, [
        new ForEach(selectors.compatibleWheels, [
          new Group({
            label: WHEELS_SET,
            provided: selectors.compatibleWheels,
            addCounter: true
          }, [
            new Num({
              attribute: 'Scale',
              label: WHEELS_SCALE
            })
          ])
        ])
      ]),
      new File({
        attribute: 'DefaultWheelType',
        type: FileType.wheels
      })
    ]),
    new Group({
      label: SUSPENSION_GROUP_NAME,
      provided: selectors.suspension,
      iconName: 'suspensions.png'
    }, [
      new Coords({
        attribute: 'CenterOfMassOffset',
        selector: selectors.physicsBody,
        label: CENTER_OF_MASS
      }),
      new Select({
        attribute: 'DiffLockType',
        selector: selectors.truckData,
        label: DIFF_LOCK,
        options: {
          None: NONE,
          Installed: INSTALLED,
          Uninstalled: UNINSTALLED,
          Always: ALWAYS
        }
      }),
      new File({
        attribute: 'Type',
        type: FileType.suspensions
      })
    ]),
    new Group({
      label: GEARBOX_GROUP_NAME,
      provided: selectors.gearbox,
      iconName: 'gearboxes.png'
    }, [
      new File({
        attribute: 'Type',
        type: FileType.gearboxes
      })
    ]),
    new Group({
      label: ENGINE_GROUP_NAME,
      provided: selectors.engine,
      iconName: 'engines.png'
    }, [
      new Num({
        attribute: 'EngineStartDelay',
        selector: selectors.truckData,
        label: ENGINE_START_DELAY,
        max: 8,
        min: 0
      }),
      new Num({
        attribute: 'ExhaustStartTime',
        selector: selectors.truckData,
        label: EXHAUST_START_TIME,
        min: 0
      }),
      new File({
        attribute: 'Type',
        type: FileType.engines
      })
    ]),
    new Group({
      label: FUEL_GROUP_NAME,
      provided: selectors.fuelTank,
      iconName: 'fuel.png'
    }, [
      new Num({
        attribute: 'DamageCapacity',
        type: NumberType.integer,
        label: DAMAGE_CAPACITY,
        step: 10,
        default: 0,
        areas: {
          yellow: [[1000, 5000]],
          red: [[5001, Infinity]]
        }
      }),
      new Num({
        attribute: 'FuelCapacity',
        type: NumberType.integer,
        selector: selectors.truckData,
        label: FUEL_CAPACITY,
        step: 10,
        areas: {
          yellow: [[1000, 5000]],
          red: [[5001, Infinity]]
        }
      })
    ]),
    new Group({
      label: UNLOCK_GROUP_NAME,
      provided: selectors.gameData,
      iconName: 'unlock.png'
    }, [
      new Select({
        attribute: 'Country',
        label: COUNTRY,
        default: '',
        options: {
          RU: RUSSIA,
          US: US,
          EMPTY: ANY
        }
      }),
      new Num({
        attribute: 'Price',
        type: NumberType.integer,
        label: PRICE
      }),
      new Select({
        attribute: 'UnlockByExploration',
        label: BY_EXPLORATION,
        options: {
          true: FIND_ON_MAP,
          false: BY_RANK
        }
      }),
      new Num({
        attribute: 'UnlockByRank',
        type: NumberType.integer,
        label: UNLOCK_BY_RANK,
        max: 30,
        min: 1
      })
    ])
  ])
} as IXMLTemplate
