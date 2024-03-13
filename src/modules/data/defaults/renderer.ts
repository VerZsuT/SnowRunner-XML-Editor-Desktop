import type { IDefaults } from './types'

export type * from './types'

/** Стандартные значения параметров таблицы */
export default {
  trailer_sideboard_2_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 900
    },
    'Truck > GameData': {
      Price: 3400
    }
  },
  trailer_service_2_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 1500,
      WheelRepairsCapacity: 8
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 5000
    },
    'Truck > GameData': {
      Price: 6400
    }
  },
  trailer_oiltank_default: {
    'Truck > TruckData': {
      FuelCapacity: 2000,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1300
    },
    'Truck > FuelMass > Body': {
      Mass: 3700
    },
    'Truck > GameData': {
      Price: 4900
    }
  },
  trailer_flatbed_special_2_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1200
    },
    'Truck > GameData': {
      Price: 3400
    }
  },
  trailer_flatbed_ramps_4_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 4
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 700
    },
    'Truck > GameData': {
      Price: 4200
    }
  },
  trailer_flatbed_2_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1400
    },
    'Truck > GameData': {
      Price: 3800
    }
  },
  trailer_addon_maintainer_default: {
    'Truck > TruckData': {
      FuelCapacity: 2000,
      WaterCapacity: 0,
      RepairsCapacity: 350,
      WheelRepairsCapacity: 6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.15
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.15
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.15
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.15
    },
    'Truck > PhysicsModel > Body': {
      Mass: 900
    },
    'Truck > GameData': {
      Price: 7500
    }
  },
  semitrailer_stepdeck_5_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 5
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.01
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.01
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.01
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.01
    },
    'Truck > PhysicsModel > Body': {
      Mass: 400
    },
    'Truck > GameData': {
      Price: 7200
    }
  },
  semitrailer_sideboard_5_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 5
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1000
    },
    'Truck > GameData': {
      Price: 6800
    }
  },
  semitrailer_oil_rig_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(9)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(10)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > PhysicsModel > Body': {
      Mass: 8000
    },
    'Truck > GameData': {}
  },
  semitrailer_oiltank_default: {
    'Truck > TruckData': {
      FuelCapacity: 3700,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > PhysicsModel > Body': {
      Mass: 4000
    },
    'Truck > FuelMass > Body': {
      Mass: 3700
    },
    'Truck > GameData': {
      Price: 6000
    }
  },
  semitrailer_m747_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 3
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.2
    },
    'Truck > PhysicsModel > Body': {
      Mass: 3000
    },
    'Truck > GameData': {
      Price: 6400
    }
  },
  semitrailer_heavy_oiltank_default: {
    'Truck > TruckData': {
      FuelCapacity: 5000,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.035
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.035
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.035
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.035
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.035
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.035
    },
    'Truck > PhysicsModel > Body': {
      Mass: 11_000
    },
    'Truck > FuelMass > Body': {
      Mass: 5000
    },
    'Truck > GameData': {
      Price: 7200
    }
  },
  semitrailer_heavy_construction_equipment_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > PhysicsModel > Body': {
      Mass: 10_000
    },
    'Truck > GameData': {
      Price: 7500
    }
  },
  semitrailer_gooseneck_4_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 4
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.06,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.06,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.06,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.06,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.35
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1000
    },
    'Truck > GameData': {
      Price: 5700
    }
  },
  semitrailer_flatbed_5_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 5
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1000
    },
    'Truck > GameData': {
      Price: 6600
    }
  },
  semitrailer_coiled_tubing_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > PhysicsModel > Body': {
      Mass: 10_000
    },
    'Truck > GameData': {
      Price: 4700
    }
  },
  scout_trailer_oiltank_default: {
    'Truck > TruckData': {
      FuelCapacity: 900,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 2500
    },
    'Truck > FuelMass > Body': {
      Mass: 900
    },
    'Truck > GameData': {
      Price: 3800
    }
  },
  scout_trailer_flatbed_2_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 800
    },
    'Truck > GameData': {
      Price: 3400
    }
  },
  scout_trailer_flatbed_1_default: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 800
    },
    'Truck > GameData': {
      Price: 2700
    }
  },
  zikz_5368_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_ZIKZ_5368_NAME',
      UiDesc: 'UI_VEHICLE_ZIKZ_5368_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 190
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 37
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 37
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.4; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 17_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_default: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  gearboxes_trucks_default: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 4.5,
      Torque: 130_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 5.5,
      Torque: 140_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.04,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(4)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 2.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7.5,
      Torque: 185_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(4) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_zikz_5368_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 140
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.1,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.06,
      Strength: 0.12,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.05,
      Damping: 0.4,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.26,
      Strength: 0.04,
      Damping: 0.4,
      SuspensionMin: -0.28,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 6400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6100,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_offroad_double_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_highway_double_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_double_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_actaeon_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  yar_87_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_YAR_87_NAME',
      UiDesc: 'UI_VEHICLE_YAR_87_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.55,
      BackSteerSpeed: 0.05,
      SteerSpeed: 0.05,
      DiffLockType: 'Always',
      EngineStartDelay: 2,
      ExhaustStartTime: 1.8,
      FuelCapacity: 110
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.62
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.62
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.62
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.4; -0.2; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 15_100,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  winches_scouts_default: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_default: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 20,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 1.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 18,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 24,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.8,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 12,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 16,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.9,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 110,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 13,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_scout_modern_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.35,
      FuelConsumption: 1.5,
      Torque: 70_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.4,
      FuelConsumption: 1.7,
      Torque: 80_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 170,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.45,
      FuelConsumption: 1.9,
      Torque: 90_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout_yar_871_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_scout_yar_87_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  s_yar_87_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.35,
      Strength: 0.02,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.02,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_yar87_mudtires_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  ws_6900xd_twin_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_WS_6900XD_TWIN_NAME',
      UiDesc: 'UI_VEHICLE_WS_6900XD_TWIN_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.016,
      SteerSpeed: 0.024,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 360
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.8
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.8
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.8
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.8
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.7
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 90_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_default: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  e_us_special_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.035,
      FuelConsumption: 9.5,
      Torque: 200_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11,
      Torque: 220_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 280,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 12.5,
      Torque: 250_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_double1_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    }
  },
  wheels_heavy_single_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 8500,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_double2_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  s_ws_6900xd_twin_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.025,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.025,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 260
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.3,
      Strength: 0.022,
      Damping: 0.2,
      SuspensionMin: -0.45,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.9,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_single_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single2_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_highway_double_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_double_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_allterrain_double_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  ws_4964_white_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_WS_4964_WHITE_NAME',
      UiDesc: 'UI_VEHICLE_WS_4964_WHITE_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 300
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.2; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 32_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_white_ws4964_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 170
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.18,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.33,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 9400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.035,
      FuelConsumption: 5.5,
      Torque: 135_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 190,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.035,
      FuelConsumption: 6,
      Torque: 145_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_top_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.035,
      FuelConsumption: 6.5,
      Torque: 155_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 8500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  voron_grad_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_VORON_GRAD_NAME',
      UiDesc: 'UI_VEHICLE_VORON_GRAD_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.02,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 330
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(14)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(15)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(16)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(17)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(18)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(19)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(20)': {
      Scale: 0.63
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 65_700,
      UnlockByExploration: 'false',
      UnlockByRank: 18
    }
  },
  wheels_heavy_single2_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 7700,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    }
  },
  s_voron_grad_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_modern_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 210,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.042,
      FuelConsumption: 6,
      Torque: 170_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 230,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7,
      Torque: 190_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 8.5,
      Torque: 210_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_modern_grad_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.04,
      FuelConsumption: 8.2,
      Torque: 235_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 13_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  voron_d53233_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_VORON_D53233_NAME',
      UiDesc: 'UI_VEHICLE_VORON_D53233_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.025,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 270
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(14)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(15)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(16)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(17)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(18)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(19)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(20)': {
      Scale: 0.63
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 62_600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_trucks_unique_offroad_default: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 7,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_heavy_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 6.5,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 260,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7.5,
      Torque: 180_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 12_800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 8.5,
      Torque: 200_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 14_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_voron_d53233_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.05,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.45,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 9400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  voron_ae4380_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_VORON_AE4380_NAME',
      UiDesc: 'UI_VEHICLE_VORON_AE4380_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.022,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 250
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(14)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(15)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(16)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(17)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(18)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(19)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(20)': {
      Scale: 0.63
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 64_900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_voron_ae4380_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 190
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.05,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 210
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.45,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 8500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  tuz_420_tatarin_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TUZ_420_TATARIN_NAME',
      UiDesc: 'UI_VEHICLE_TUZ_420_TATARIN_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 300
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.6; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 106_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_special_default: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 3.7,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 1.6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_tuz_tatarin_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.99,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.2,
      FuelConsumption: 13,
      Torque: 200_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 1,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_btr_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_tuz_420_tatarin_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.99,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  tuz_166_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TUZ_166_NAME',
      UiDesc: 'UI_VEHICLE_TUZ_166_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.5,
      BackSteerSpeed: 0.058,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 1.7,
      ExhaustStartTime: 1.6,
      FuelCapacity: 60
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.5
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; -0.4; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_tuz_default: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 80,
      DamagedConsumptionModifier: 1.8,
      FuelConsumption: 1.1,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout2_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 4
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  wheels_scout1_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2.5,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_tuz_166_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.22,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 140
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.22,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.02,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.02,
      SuspensionMin: -0.22,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_scout_old_tuz_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 80,
      DamagedConsumptionModifier: 2,
      EngineResponsiveness: 0.01,
      FuelConsumption: 0.4,
      Torque: 20_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.4,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_scout_old_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 0.6,
      Torque: 30_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.09,
      FuelConsumption: 1.1,
      Torque: 40_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 170,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.14,
      FuelConsumption: 1.4,
      Torque: 46_500,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(4)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 70,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.08,
      FuelConsumption: 1.9,
      Torque: 72_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(4) > GameData': {
      Price: 7500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout_highway_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.7,
      BodyFrictionAsphalt: 2.2,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2.3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_offroad_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 1.1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_mudtires_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  tayga_6436_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TAYGA_6436_NAME',
      UiDesc: 'UI_VEHICLE_TAYGA_6436_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.03,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 330
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(14)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(15)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(16)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(17)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(18)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(19)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(20)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(21)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(22)': {
      Scale: 0.65
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.3; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 57_100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_tayga_6436_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.11,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.07,
      Strength: 0.025,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.025,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 10_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_tayga_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    }
  },
  step_310e_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_STEP_310E_NAME',
      UiDesc: 'UI_VEHICLE_STEP_310E_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.1,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 220
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.55
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 75_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_step_310e_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 2,
      EngineResponsiveness: 0.04,
      FuelConsumption: 5,
      Torque: 150_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_step_310e_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.06,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.28,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 190
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.11,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.28,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  royal_bm17_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_ROYAL_BM17_NAME',
      UiDesc: 'UI_VEHICLE_ROYAL_BM17_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 280
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 37
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 37
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.65
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 120
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 104_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_royal_bm17_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.09,
      Strength: 0.1,
      Damping: 0.2,
      SuspensionMin: -0.22,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.03,
      Strength: 0.07,
      Damping: 0.2,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.17,
      Strength: 0.1,
      Damping: 0.2,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.08,
      Damping: 0.2,
      SuspensionMin: -0.23,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 10_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.2,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.25,
      FuelConsumption: 6.5,
      Torque: 180_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.3,
      FuelConsumption: 7.5,
      Torque: 192_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_catroyal_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.15,
      FuelConsumption: 5,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  pacific_p16_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_PACIFIC_P16_NAME',
      UiDesc: 'UI_VEHICLE_PACIFIC_P16_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.02,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 300
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.73
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.73
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 116_000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_heavy_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.1,
      FuelConsumption: 8.5,
      Torque: 175_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.15,
      FuelConsumption: 9,
      Torque: 190_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 13_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 280,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.2,
      FuelConsumption: 10,
      Torque: 210_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_pacific_p16_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.08,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.09,
      Strength: 0.08,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_double_p16_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 3.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  pacific_p12w_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_PACIFIC_P12W_NAME',
      UiDesc: 'UI_VEHICLE_PACIFIC_P12W_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.02,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 350
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.73
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.73
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.73
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.73
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.73
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.73
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.73
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.73
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 104_400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_p12_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_pacific_p12w_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.5,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.06,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  navistar_5000mv_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_NAVISTAR_5000_NAME',
      UiDesc: 'UI_VEHICLE_NAVISTAR_5000_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.45,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 340
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.62
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.62
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.62
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.62
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.62
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 113_600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_military_navistar_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.3,
      FuelConsumption: 8.5,
      Torque: 175_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 360,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.35,
      FuelConsumption: 11.5,
      Torque: 210_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_navistar_5000mv_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 260
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.08,
      Damping: 0.27,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 8300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.07,
      Damping: 0.15,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.03,
      Damping: 0.15,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  kolob_74941_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KOLOB_74941_NAME',
      UiDesc: 'UI_VEHICLE_KOLOB_74941_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.018,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 340
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.745
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.745
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1; -1.3; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 92_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_special_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.045,
      FuelConsumption: 9,
      Torque: 205_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 270,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 10,
      Torque: 230_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 20_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11.5,
      Torque: 260_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_single_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.7,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_kolob_74941_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.025,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.022,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 230
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.025,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.022,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 11_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_mudtires_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.6,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_special_kolob_default: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 1.9,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 4.7,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 6.2,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 8.2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 7900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  kolob_74760_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KOLOB_74760_NAME',
      UiDesc: 'UI_VEHICLE_KOLOB_74760_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.016,
      DiffLockType: 'Always',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 380
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.745
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.745
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1; -0.3; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 107_700,
      UnlockByExploration: 'false',
      UnlockByRank: 22
    }
  },
  s_kolob_74760_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0,
      Strength: 0.05,
      Damping: 0.08,
      SuspensionMin: -0.15,
      SuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.15,
      SuspensionMax: 0.3,
      BrokenSuspensionMax: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0,
      Strength: 0.05,
      Damping: 0.08,
      SuspensionMin: -0.25,
      SuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.25,
      SuspensionMax: 0.3,
      BrokenSuspensionMax: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 11_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  khan_lo4f_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KHAN_Lo4F_NAME',
      UiDesc: 'UI_VEHICLE_KHAN_Lo4F_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.65,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.04,
      DiffLockType: 'Always',
      EngineStartDelay: 1.7,
      ExhaustStartTime: 1.6,
      FuelCapacity: 80
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.38
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.38
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.38
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.38
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.38
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.42
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; -0.6; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 3400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_khan_lo4f_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.16,
      Strength: 0.06,
      Damping: 0.23,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.12,
      Strength: 0.08,
      Damping: 0.22,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 1700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.26,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.07,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  khan_39_marshall_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KHAN_39_MARSHALL_NAME',
      UiDesc: 'UI_VEHICLE_KHAN_39_MARSHALL_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.03,
      DiffLockType: 'Installed',
      EngineStartDelay: 1.7,
      ExhaustStartTime: 1.6,
      FuelCapacity: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.56
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.3; -0.3; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_khan_39_marshall_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.025,
      Damping: 0.15,
      SuspensionMin: -0.28,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.02,
      Damping: 0.15,
      SuspensionMin: -0.28,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 1700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  international_transtar_4070a_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_INTERNATIONAL_TRANSTAR_4070A_NAME',
      UiDesc: 'UI_VEHICLE_INTERNATIONAL_TRANSTAR_4070A_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.03,
      DiffLockType: 'None',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 265
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.53
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 17_900,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    }
  },
  s_international_transtar_4070a_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.23,
      Strength: 0.07,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.23,
      Strength: 0.04,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.33,
      Strength: 0.06,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.3,
      Strength: 0.03,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 6200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_4070_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.035,
      FuelConsumption: 7,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 8500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  international_scout_800_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_INTERNATIONAL_SCOUT_800_NAME',
      UiDesc: 'UI_VEHICLE_INTERNATIONAL_SCOUT_800_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 1.7,
      ExhaustStartTime: 1.6,
      FuelCapacity: 72
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.5
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.1; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 4800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_old_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.25,
      FuelConsumption: 1.3,
      Torque: 35_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.3,
      FuelConsumption: 1.7,
      Torque: 42_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.35,
      FuelConsumption: 2,
      Torque: 50_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_international_scout_800_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.055,
      Damping: 0.2,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.35,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.35,
      Strength: 0.045,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 4900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  international_paystar_5070_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_INTERNATIONAL_PAYSTAR_5070_NAME',
      UiDesc: 'UI_VEHICLE_INTERNATIONAL_PAYSTAR_5070_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.016,
      SteerSpeed: 0.022,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 240
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.58
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.3; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 63_400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_paystar5070_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7,
      Torque: 150_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_international_paystar_5070_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.18
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.1,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.4,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.18
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  international_loadstar_1700_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_INTERNATIONAL_LOADSTAR_1700_NAME',
      UiDesc: 'UI_VEHICLE_INTERNATIONAL_LOADSTAR_1700_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 1.7,
      ExhaustStartTime: 1.6,
      FuelCapacity: 130
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.52
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.4; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 28_200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_international_loadstar_1700_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.042,
      Damping: 0.1,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.03,
      Strength: 0.06,
      Damping: 0.15,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.35,
      Strength: 0.035,
      Damping: 0.2,
      SuspensionMin: -0.45,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.18,
      Strength: 0.045,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  international_fleetstar_f2070a_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_FLEETSTAR_F2070A_NAME',
      UiDesc: 'UI_VEHICLE_FLEETSTAR_F2070A_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.1,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.033,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 240
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.57
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.57
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.57
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.57
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.6; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 13_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_fleetstar_f2070a_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 140
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.05,
      Strength: 0.05,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.08,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 170
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.18,
      Strength: 0.05,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.23,
      Strength: 0.08,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  hummer_h2_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_HUMMER_H2_NAME',
      UiDesc: 'UI_VEHICLE_HUMMER_H2_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.15,
      SteerSpeed: 0.032,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.6,
      FuelCapacity: 80
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.5
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_modern_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 1,
      FuelConsumption: 0.9,
      Torque: 90_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 1.1,
      Torque: 110_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 140,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.04,
      FuelConsumption: 1.3,
      Torque: 120_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout_offroad2_hummer_h2_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_hummer_h2_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.08,
      Strength: 0.06,
      Damping: 0.2,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.08,
      Strength: 0.07,
      Damping: 0.2,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.18,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gmc_9500_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_GMC_9500_NAME',
      UiDesc: 'UI_VEHICLE_GMC_9500_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.25,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.02,
      DiffLockType: 'None',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 240
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 10_600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_gmc9500_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.9,
      EngineResponsiveness: 0.035,
      FuelConsumption: 7.5,
      Torque: 140_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_gmc9500_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.4,
      SuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.25,
      SuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 210
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.08,
      Damping: 0.3,
      SuspensionMin: -0.45,
      SuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.08,
      Damping: 0.3,
      SuspensionMin: -0.3,
      SuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 6400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  freightliner_m916a1_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_FREIGHTLINER_M916A1_NAME',
      UiDesc: 'UI_VEHICLE_FREIGHTLINER_M916A1_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.025,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 200
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.3; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 74_200,
      UnlockByExploration: 'false',
      UnlockByRank: 17
    }
  },
  s_freightliner_m916a1_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.1,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.02,
      Strength: 0.1,
      Damping: 0.2,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 250
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.1,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.12,
      Strength: 0.1,
      Damping: 0.2,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_trucks_unique_m916a1_finetune_default: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 5.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 5500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  freightliner_114sd_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_FREIGHTLINER_114SD_NAME',
      UiDesc: 'UI_VEHICLE_FREIGHTLINER_114SD_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.25,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 300
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 76_600,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  s_freightliner_114sd_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 140
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.06,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.035,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.06,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.035,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  ford_clt9000_default: {
    'Truck > GameData > UiDesc': {},
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.017,
      DiffLockType: 'None',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 280
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.55
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.8; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 26_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_ford_clt9000_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 110
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 140
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.4,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.45,
      BrokenSuspensionMax: 0.05
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.3,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.05
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_clt_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.035,
      FuelConsumption: 5,
      Torque: 155_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 9400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  don_71_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_DON_71_NAME',
      UiDesc: 'UI_VEHICLE_DON_71_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.03,
      DiffLockType: 'Installed',
      EngineStartDelay: 1.7,
      ExhaustStartTime: 1.6,
      FuelCapacity: 42
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(14)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(15)': {
      Scale: 0.45
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 3600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_scout_old_don_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.02,
      FuelConsumption: 0.7,
      Torque: 25_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_don_71_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.025,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.17
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.025,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 140
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.025,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.17
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.025,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.025,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.17
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.025,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  derry_longhorn_4520_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_DERRY_LONGHORN_4520_NAME',
      UiDesc: 'UI_VEHICLE_DERRY_LONGHORN_4520_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.25,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.02,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 400
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: -24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: -24
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.64
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.5; -0.5; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 125_500,
      UnlockByExploration: 'false',
      UnlockByRank: 24
    }
  },
  s_derry_longhorn_4520_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.06,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.07,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_longhorn_4520_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 190,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.25,
      FuelConsumption: 8,
      Torque: 230_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.05
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 14_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  derry_longhorn_3194_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_DERRY_LONGHORN_3194_NAME',
      UiDesc: 'UI_VEHICLE_DERRY_LONGHORN_3194_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.25,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.018,
      DiffLockType: 'Always',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 370
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.66
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1; -0.3; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 110_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_derry_longhorn_3194_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.13,
      Strength: 0.06,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.17,
      Strength: 0.015,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(3)': {
      Height: -0.35,
      Strength: 0.1,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  dan_96320_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_DAN_96320_NAME',
      UiDesc: 'UI_VEHICLE_DAN_96320_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.018,
      DiffLockType: 'Always',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 350
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.65
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(2; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 106_800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_dan_96320_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.08,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.04,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.55,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.08,
      SuspensionMin: -0.3,
      SuspensionMax: 0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.04,
      SuspensionMin: -0.3,
      SuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 9200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  chevrolet_kodiakc70_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_CHEVROLET_KODIAKC70_NAME',
      UiDesc: 'UI_VEHICLE_CHEVROLET_KODIAKC70_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.03,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 200
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.55
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.4; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 19_500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_chevrolet_kodiakC70_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.08,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 190
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.08,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 6400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  chevrolet_ck1500_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_CHEVROLET_CK1500_NAME',
      UiDesc: 'UI_VEHICLE_CHEVROLET_CK1500_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.03,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 1.7,
      ExhaustStartTime: 1.6,
      FuelCapacity: 80
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.48
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.48
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.45
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.48
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.1; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_scout_old_ck1500_default: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.25,
      FuelConsumption: 3.3,
      Torque: 60_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_chevrolet_ck1500_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.11,
      Strength: 0.035,
      Damping: 0.25,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.04,
      Strength: 0.045,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 4500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  cat_ct680_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_CAT_CT680_NAME',
      UiDesc: 'UI_VEHICLE_CAT_CT680_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 280
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.8; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 37_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  s_cat_ct680_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.06,
      Damping: 0.5,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0,
      Strength: 0.07,
      Damping: 0.5,
      SuspensionMin: 0,
      BrokenSuspensionMax: 0
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  cat_745c_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_CAT_745C_NAME',
      UiDesc: 'UI_VEHICLE_CAT_745C_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.05,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.017,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 340
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.9
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.9
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; -0.5; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 100_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_cat_745c_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.05,
      Strength: 0.1,
      Damping: 0.1,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.05,
      Strength: 0.7,
      Damping: 0.4,
      SuspensionMin: -0.1,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  azov_73210_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_AZOV_73210_NAME',
      UiDesc: 'UI_VEHICLE_AZOV_73210_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.017,
      DiffLockType: 'Always',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 350
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 20
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 20
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(9)': {
      Torque: 'default',
      SteeringAngle: -20
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(10)': {
      Torque: 'default',
      SteeringAngle: -20
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.63
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.4; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 66_000,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  s_azov_73210_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 190
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.16,
      Strength: 0.03,
      Damping: 0.4,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.14,
      Strength: 0.04,
      Damping: 0.4,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.03,
      Damping: 0.4,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.18,
      Strength: 0.04,
      Damping: 0.4,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  azov_64131_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_AZOV_64131_NAME',
      UiDesc: 'UI_VEHICLE_AZOV_64131_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.25,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.02,
      DiffLockType: 'Always',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 350
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 20
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 20
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 69_000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_azov_64131_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.07,
      Strength: 0.06,
      Damping: 0.4,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.058,
      Strength: 0.08,
      Damping: 0.4,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  azov_5319_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_AZOV_5319_NAME',
      UiDesc: 'UI_VEHICLE_AZOV_5319_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.017,
      DiffLockType: 'Always',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 200
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 20
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 20
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.63
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 64_600,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  s_azov_5319_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.079,
      Strength: 0.07,
      Damping: 0.4,
      SuspensionMin: -0.19,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.018,
      Strength: 0.08,
      Damping: 0.4,
      SuspensionMin: -0.19,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  azov_4220_antarctic_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_AZOV_4220_ANTARCTIC_NAME',
      UiDesc: 'UI_VEHICLE_AZOV_4220_ANTARCTIC_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.4,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.03,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 340
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.9
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.9
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(1; -1; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 111_600,
      UnlockByExploration: 'false',
      UnlockByRank: 26
    }
  },
  s_azov_4220_antarctic_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.05,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.6,
      SuspensionMin: -0.1,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  ank_mk38_default: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_ANK_MK38_NAME',
      UiDesc: 'UI_VEHICLE_ANK_MK38_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 200
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.65
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.3; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 51_100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_ank_mk38_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_ank_mk38_default: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.08,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.18,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 250
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.35,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.28,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(4)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(4) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(4) > Suspension:nth-of-type(2)': {
      Height: 0.18,
      Strength: 0.025,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(4) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_ankmk38_default: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  semitrailer_wind_blade_ru_08: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_SEMITRAILER_ROCKET_NAME',
      UiDesc: 'UI_SEMITRAILER_ROCKET_DESC'
    },
    'Truck > GameData': {
      Country: '',
      Price: 20_000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gmc_8000_DLC_trial_6: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_GMC_8000_NAME',
      UiDesc: 'UI_VEHICLE_GMC_8000_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.25,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.02,
      DiffLockType: 'None',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 285
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.58
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-2.2; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 90_000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_DLC_trial_6: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  gearboxes_trucks_DLC_trial_6: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_DLC_trial_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6100,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_highway_double_DLC_trial_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_DLC_trial_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_offroad_double_DLC_trial_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_DLC_trial_6: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.035,
      FuelConsumption: 5.5,
      Torque: 135_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 190,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.035,
      FuelConsumption: 6,
      Torque: 145_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_gmc8000_DLC_trial_6: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 230,
      DamagedConsumptionModifier: 1.9,
      EngineResponsiveness: 0.035,
      FuelConsumption: 9.5,
      Torque: 170_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_gmc8000_DLC_trial_6: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.12,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.3,
      SuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.3,
      SuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 210
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.22,
      Strength: 0.05,
      Damping: 0.4,
      SuspensionMin: -0.3,
      SuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.05,
      Damping: 0.4,
      SuspensionMin: -0.3,
      SuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7200,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 230
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.27,
      Strength: 0.05,
      Damping: 0.4,
      SuspensionMin: -0.4,
      SuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.05,
      Damping: 0.4,
      SuspensionMin: -0.3,
      SuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 9800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  trailer_watertank_dlc_9: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 2000,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1300
    },
    'Truck > GameData': {
      Price: 4900
    }
  },
  trailer_log_pole_zikz_612h_dlc_9: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.1
    },
    'Truck > PhysicsModel > Body': {
      Mass: 100
    },
    'Truck > GameData': {
      Price: 14_100
    }
  },
  semitrailer_watertank_dlc_9: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 3700,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > PhysicsModel > Body': {
      Mass: 4000
    },
    'Truck > GameData': {
      Price: 6000
    }
  },
  zikz_612h_mastodont_dlc_9: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_ZIKZ_612H_MASTODONT_NAME',
      UiDesc: 'UI_VEHICLE_ZIKZ_612H_MASTODONT_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.016,
      DiffLockType: 'Always',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 500
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 29.7
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 29.7
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.78
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.77
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.77
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.78
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 180
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 191_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_9: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  wheels_superheavy_mudtires_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.6,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_special_zikz_612h_dlc_9: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.35
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.1,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 3.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 3.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.1,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 0.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 1.2,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 2.5,
      FuelModifier: 1.15
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 4,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 0.8,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 1.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 2.5,
      FuelModifier: 1.15
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 3.8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(6)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_special_zikz_mastodont_dlc_9: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.03,
      FuelConsumption: 20,
      Torque: 203_000,
      DamagedMinTorqueMultiplier: 0.8,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.7,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 13_200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 260,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.035,
      FuelConsumption: 17,
      Torque: 230_000,
      DamagedMinTorqueMultiplier: 0.9,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.4,
      MaxDeltaAngVel: 0.03
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 320,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.045,
      FuelConsumption: 14,
      Torque: 265_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.3,
      MaxDeltaAngVel: 0.05
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_zikz_612h_mastodont_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_single2_zikz_612h_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 7700,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    }
  },
  s_zikz_612h_mastodont_dlc_9: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.065,
      Strength: 0.065,
      Damping: 0.5,
      SuspensionMin: -0.25,
      SuspensionMax: 0.1,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.07,
      Strength: 0.07,
      Damping: 0.55,
      SuspensionMin: -0.25,
      SuspensionMax: 0.1,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(3)': {
      Height: 0.03,
      Strength: 0.1,
      Damping: 0.75,
      SuspensionMin: -0.2,
      SuspensionMax: 0.1,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(4)': {
      Height: 0.03,
      Strength: 0.12,
      Damping: 0.85,
      SuspensionMin: -0.2,
      SuspensionMax: 0.1,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_single_zikz_612h_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 8500,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  zikz_566a_dlc_9: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_ZiKZ_566A_NAME',
      UiDesc: 'UI_VEHICLE_ZiKZ_566A_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.12,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.022,
      DiffLockType: 'Installed',
      EngineStartDelay: 3,
      ExhaustStartTime: 3.2,
      FuelCapacity: 150
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 27
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 27
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; -0.2; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 80_900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_9: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  wheels_medium_double_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6100,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_heavy_mudtires_tayga_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    }
  },
  wheels_medium_highway_double_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_double_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_offroad_double_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_zikz_566a_dlc_9: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.8,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 11,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 15,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 9300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 11,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 9500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_dlc_9: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 4.5,
      Torque: 130_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 5.5,
      Torque: 140_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.04,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(4)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 2.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7.5,
      Torque: 185_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(4) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_zikz_566a_dlc_9: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 8.5,
      Torque: 200_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.4,
      BrakesDelay: 1,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 16_200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_zikz_566a_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_zikz_566a_dlc_9: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.05,
      Damping: 0.8,
      SuspensionMin: -0.21,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.12,
      Strength: 0.08,
      Damping: 0.6,
      SuspensionMin: -0.14,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.26,
      Strength: 0.05,
      Damping: 0.8,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.24,
      Strength: 0.08,
      Damping: 0.6,
      SuspensionMin: -0.21,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  derry_special_15c177_dlc_9: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_DERRY_SPECIAL_15C177_NAME',
      UiDesc: 'UI_VEHICLE_DERRY_SPECIAL_15C177_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.017,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 380
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 26
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 26
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 21
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 21
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.7
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.7
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 150_000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_single2_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 7700,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    }
  },
  wheels_heavy_single_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 8500,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_offroad_single_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single2_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.9,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_special_dlc_9: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 3.7,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 1.6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_special_kolob_dlc_9: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 1.9,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 4.7,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 6.2,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 8.2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 7900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_special_dlc_9: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.035,
      FuelConsumption: 9.5,
      Torque: 200_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11,
      Torque: 220_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 280,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 12.5,
      Torque: 250_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_derry_special_dlc_9: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 12,
      Torque: 280_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.3,
      MaxDeltaAngVel: 0.05
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 25_000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_derry_special_15c177_dlc_9: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_derry_special_15c177_dlc_9: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.15,
      Damping: 0.9,
      SuspensionMin: -0.22,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.01,
      Strength: 0.1,
      Damping: 0.65,
      SuspensionMin: -0.09,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 230
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.14,
      Strength: 0.1,
      Damping: 0.4,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.037,
      Strength: 0.15,
      Damping: 0.5,
      SuspensionMin: -0.1,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 15_500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  trailer_planter_dlc_8: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.9
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.9
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.9
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.9
    },
    'Truck > PhysicsModel > Body': {
      Mass: 500
    },
    'Truck > GameData': {
      Price: 5700
    }
  },
  trailer_harvester_dlc_8: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.02,
      SuspensionStrength: 0.3
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.02,
      SuspensionStrength: 0.3
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.02,
      SuspensionStrength: 0.3
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.02,
      SuspensionStrength: 0.3
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.02,
      SuspensionStrength: 0.3
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.02,
      SuspensionStrength: 0.3
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.02,
      SuspensionStrength: 0.3
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.02,
      SuspensionStrength: 0.3
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1000
    },
    'Truck > GameData': {
      Price: 2900
    }
  },
  trailer_cultivator_dlc_8: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.9
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.9
    },
    'Truck > PhysicsModel > Body': {
      Mass: 500
    },
    'Truck > GameData': {
      Price: 4200
    }
  },
  western_star_nf1430_dlc_8: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_WESTERN_STAR_NF1430_NAME',
      UiDesc: 'UI_VEHICLE_WESTERN_STAR_NF1430_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.02,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 290
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(3)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(4)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.56
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 120_600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_8: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  gearboxes_trucks_dlc_8: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_double1_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    }
  },
  wheels_heavy_double2_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_highway_double_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_double_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_allterrain_double_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_dlc_8: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.2,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.25,
      FuelConsumption: 6.5,
      Torque: 180_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.3,
      FuelConsumption: 7.5,
      Torque: 192_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_ws_49x_dlc_8: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 170,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.15,
      FuelConsumption: 8.5,
      Torque: 220_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 12_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_western_star_nf1430_dlc_8: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.15,
      Damping: 0.15,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.09,
      Damping: 0.2,
      SuspensionMin: -0.17,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(3)': {
      Height: 0.09,
      Strength: 0.07,
      Damping: 0.6,
      SuspensionMin: -0.17,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  western_star_nf1424_dlc_8: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_WESTERN_STAR_NF1424_NAME',
      UiDesc: 'UI_VEHICLE_WESTERN_STAR_NF1424_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.02,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 290
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.61
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.61
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.61
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.61
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.9; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 113_500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6100,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_allterrain_double_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_offroad_double_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_highway_double_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_western_star_nf1424_dlc_8: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.16,
      Strength: 0.12,
      Damping: 0.12,
      SuspensionMin: -0.12,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.07,
      Strength: 0.1,
      Damping: 0.2,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.07,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.23,
      Strength: 0.08,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 17
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.55,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.17,
      Strength: 0.1,
      SuspensionMin: -0.2,
      SuspensionMax: 0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.1,
      SuspensionMin: -0.2,
      SuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 8300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  step_39331_pike_dlc_8: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_STEP_39331_PIKE_NAME',
      UiDesc: 'UI_VEHICLE_STEP_39331_PIKE_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.03,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 250
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.55
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-2.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 63_000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_8: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  e_ru_truck_old_dlc_8: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 4.5,
      Torque: 130_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 5.5,
      Torque: 140_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.04,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(4)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 2.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7.5,
      Torque: 185_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(4) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_single2_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 7700,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    }
  },
  wheels_heavy_mudtires_single2_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.9,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_step_39331_pike_dlc_8: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.05,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.05,
      Strength: 0.06,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.07,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_step_39331_pike_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  rezvani_hercules_6x6_dlc_8: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_REZVANI_NAME',
      UiDesc: 'UI_VEHICLE_REZVANI_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.15,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.6,
      FuelCapacity: 80
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.49
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.49
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.49
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.49
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.49
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.49
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; -0.3; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 25_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_8: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_dlc_8: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 20,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 1.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 18,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 24,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.8,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 12,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 16,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.9,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 110,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 13,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_modern_dlc_8: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 1,
      FuelConsumption: 0.9,
      Torque: 90_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 1.1,
      Torque: 110_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 140,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.04,
      FuelConsumption: 1.3,
      Torque: 120_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout1_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2.5,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout2_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 4
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  wheels_scout_highway_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.7,
      BodyFrictionAsphalt: 2.2,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2.3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_offroad_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 1.1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_mudtires_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_rezvani_hercules_6x6_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_rezvani_hercules_6x6_dlc_8: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.06,
      Strength: 0.06,
      Damping: 0.17,
      SuspensionMin: -0.19,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.08,
      Strength: 0.05,
      Damping: 0.17,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.18,
      Strength: 0.05,
      Damping: 0.2,
      SuspensionMin: -0.28,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.37,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  kirovets_k7m_dlc_8: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KIROVETS_K7M_NAME',
      UiDesc: 'UI_VEHICLE_KIROVETS_K7M_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.4,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.015,
      DiffLockType: 'Always',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 340
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 1
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 1
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.5; 1; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 172_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_special_dlc_8: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 3.7,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 1.6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_kirovets_k7m_special_dlc_8: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.045,
      FuelConsumption: 9,
      Torque: 115_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 270,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 10,
      Torque: 140_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 20_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11.5,
      Torque: 170_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_extend_kirovets_k7m_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_base_kirovets_k7m_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_kirovets_k7m_dlc_8: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0,
      Strength: 0.1,
      Damping: 0.5,
      SuspensionMin: -0.13,
      SuspensionMax: 0.13,
      BrokenSuspensionMax: 0.13
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0,
      Strength: 0,
      Damping: 0,
      SuspensionMin: 0,
      SuspensionMax: 0,
      BrokenSuspensionMax: 0
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  kirovets_k700_dlc_8: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KIROVETS_K700_NAME',
      UiDesc: 'UI_VEHICLE_KIROVETS_K700_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.4,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.015,
      DiffLockType: 'Always',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 340
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.8
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.8
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.8
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.5; -0.5; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 126_100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_single_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.7,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_mudtires_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.6,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_kirovets_k700_special_dlc_8: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.045,
      FuelConsumption: 9,
      Torque: 130_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 270,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 10,
      Torque: 150_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 20_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11.5,
      Torque: 175_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_kirovets_k700_dlc_8: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_kirovets_k700_dlc_8: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.02,
      Strength: 0.1,
      Damping: 0.8,
      SuspensionMin: -0.134,
      SuspensionMax: 0.2,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0,
      Strength: 0.9,
      SuspensionMin: 0,
      SuspensionMax: 0,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  western_star_57x_dlc_7: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_WESTERN_STAR_57X_NAME',
      UiDesc: 'UI_VEHICLE_WESTERN_STAR_57X_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.02,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 290
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.54
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.54
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.54
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.54
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.56
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.5; -0.2; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 115_700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_7: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  gearboxes_trucks_dlc_7: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6100,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_highway_double_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_offroad_double_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_dlc_7: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.2,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.25,
      FuelConsumption: 6.5,
      Torque: 180_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.3,
      FuelConsumption: 7.5,
      Torque: 192_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_ws_49x_dlc_7: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 170,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.15,
      FuelConsumption: 8.5,
      Torque: 220_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 12_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_western_star_57x_dlc_7: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.08,
      Strength: 0.07,
      Damping: 0.15,
      SuspensionMin: -0.17,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.07,
      Strength: 0.08,
      Damping: 0.2,
      SuspensionMin: -0.21,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.16,
      Strength: 0.09,
      Damping: 0.05,
      SuspensionMin: -0.17,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.1,
      Damping: 0.5,
      SuspensionMin: -0.21,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  gor_by4_dlc_7: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_GOR_BY4_NAME',
      UiDesc: 'UI_VEHICLE_GOR_BY4_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.03,
      DiffLockType: 'Installed',
      EngineStartDelay: 1.7,
      ExhaustStartTime: 1.6,
      FuelCapacity: 50
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.37
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.37
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.37
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.37
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.37
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.37
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.39
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.3; -0.2; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 3600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_7: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_dlc_7: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 20,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 1.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 18,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 24,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.8,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 12,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 16,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.9,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 110,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 13,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_scout_old_dlc_7: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 0.6,
      Torque: 30_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.09,
      FuelConsumption: 1.1,
      Torque: 40_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 170,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.14,
      FuelConsumption: 1.4,
      Torque: 46_500,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(4)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 70,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.08,
      FuelConsumption: 1.9,
      Torque: 72_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(4) > GameData': {
      Price: 7500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout1_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2.5,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout2_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 4
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  wheels_scout_offroad_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 1.1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_mudtires_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_highway_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.7,
      BodyFrictionAsphalt: 2.2,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2.3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_gor_by4_dlc_7: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.08,
      Strength: 0.03,
      Damping: 0.18,
      SuspensionMin: -0.19,
      SuspensionMax: 0.29,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.03,
      Damping: 0.18,
      SuspensionMin: -0.19,
      SuspensionMax: 0.29,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.19,
      Strength: 0.02,
      Damping: 0.16,
      SuspensionMin: -0.28,
      SuspensionMax: 0.29,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.21,
      Strength: 0.02,
      Damping: 0.18,
      SuspensionMin: -0.24,
      SuspensionMax: 0.29,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_gor_by4_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    }
  },
  azov_43_191_sprinter_dlc_7: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_AZOV_42_191_SPRINTER__NAME',
      UiDesc: 'UI_VEHICLE_AZOV_42_191_SPRINTER_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.25,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.02,
      DiffLockType: 'Always',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 350
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 58_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_7: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  wheels_heavy_single_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 8500,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_offroad_single_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.9,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single2_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_azov_43_191_sprinter_dlc_7: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_azov_sprinter_dlc_7: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7,
      FuelModifier: 2.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 2.1,
      FuelModifier: 3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 3.5,
      FuelModifier: 2.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 5.1,
      FuelModifier: 2.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 7.3,
      FuelModifier: 2.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 9.2,
      FuelModifier: 2.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(6)': {
      AngVel: 11.6,
      FuelModifier: 2.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_modern_dlc_7: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 210,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.042,
      FuelConsumption: 6,
      Torque: 170_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 230,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7,
      Torque: 190_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 8.5,
      Torque: 210_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_azov_sprinter_dlc_7: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 210,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.042,
      FuelConsumption: 6,
      Torque: 250_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.1
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 10_900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_azov_43_191_sprinter_dlc_7: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.07,
      Strength: 0.06,
      Damping: 0.4,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.058,
      Strength: 0.08,
      Damping: 0.4,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  scout_trailer_offroad_tent_dlc_6: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 600
    },
    'Truck > GameData': {
      Price: 3400
    }
  },
  scout_trailer_offroad_cargo_dlc_6: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 800
    },
    'Truck > GameData': {
      Price: 3400
    }
  },
  scout_trailer_offroad_dlc_6: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 600
    },
    'Truck > GameData': {
      Price: 3400
    }
  },
  tayga_6455b_dlc_6: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TAYGA_6455b_NAME',
      UiDesc: 'UI_VEHICLE_TAYGA_6455b_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.03,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 330
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.61
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.61
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.61
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.61
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.61
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.64
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-2.4; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 70_200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_6: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  gearboxes_trucks_dlc_6: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_heavy_dlc_6: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 6.5,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 260,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7.5,
      Torque: 180_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 12_800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 8.5,
      Torque: 200_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 14_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_single2_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 7700,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    }
  },
  wheels_heavy_mudtires_tayga_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    }
  },
  wheels_heavy_single_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 8500,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_mudtires_single_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.9,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single2_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_single_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_tayga_6455b_dlc_6: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.13,
      Strength: 0.05,
      Damping: 0.1,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.086,
      Strength: 0.063,
      Damping: 0.15,
      SuspensionMin: -0.18,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.025,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 9400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  step_3364_crocodile_dlc_6: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_STEP_3364_CROCODILE_NAME',
      UiDesc: 'UI_VEHICLE_STEP_3364_CROCODILE_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.03,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 150
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.53
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.53
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.2; 0; -0.2)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 12_000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_dlc_6: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 4.5,
      Torque: 130_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 5.5,
      Torque: 140_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.04,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(4)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 2.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7.5,
      Torque: 185_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(4) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6100,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_highway_double_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_double_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_offroad_double_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_step_3364_crocodile_dlc_6: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.19,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.19,
      Strength: 0.06,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.29,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.29,
      Strength: 0.05,
      Damping: 0.4,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_step_3364_crocodile_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  land_rover_defender_90_dlc_6: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_LAND_ROVER_DEFENDER_90_NAME',
      UiDesc: 'UI_VEHICLE_LAND_ROVER_DEFENDER_90_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.032,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.6,
      FuelCapacity: 80
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.42
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_6: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_dlc_6: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 20,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 1.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 18,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 24,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.8,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 12,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 16,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.9,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 110,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 13,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_modern_dlc_6: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 1,
      FuelConsumption: 0.9,
      Torque: 90_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 1.1,
      Torque: 110_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 140,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.04,
      FuelConsumption: 1.3,
      Torque: 120_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout2_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 4
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  wheels_scout1_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2.5,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_highway_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.7,
      BodyFrictionAsphalt: 2.2,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2.3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_offroad_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 1.1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_mudtires_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_land_rover_defender_90_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_land_rover_defender_90_dlc_6: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.03,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.07,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.14,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.26,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.18,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.26,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  land_rover_defender_110_dlc_6: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_LAND_ROVER_DEFENDER_110_NAME',
      UiDesc: 'UI_VEHICLE_LAND_ROVER_DEFENDER_110_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.032,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.6,
      FuelCapacity: 80
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.41
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.39
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.41
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.41
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.8; 0.1; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_land_rover_defender_110_dlc_6: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.11,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.17,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.04,
      Damping: 0.2,
      SuspensionMin: -0.17,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.16,
      Strength: 0.055,
      Damping: 0.35,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.16,
      Strength: 0.055,
      Damping: 0.35,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_land_rover_defender_110_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  aramatsu_forester_dlc_6: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_ARAMATSU_FORESTER__NAME',
      UiDesc: 'UI_VEHICLE_ARAMATSU_FORESTER_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.05,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.017,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 340
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.66
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; -0.5; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 3500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_6: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  gearboxes_special_dlc_6: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 3.7,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 1.6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_dlc_6: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.2,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.25,
      FuelConsumption: 6.5,
      Torque: 180_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.3,
      FuelConsumption: 7.5,
      Torque: 192_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_aramatsu_forester_dlc_6: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0,
      Strength: 0.1,
      Damping: 0.1,
      SuspensionMin: 0,
      BrokenSuspensionMax: 0.001
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0,
      Strength: 0.7,
      Damping: 0.4,
      SuspensionMin: 0,
      BrokenSuspensionMax: 0.001
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  ank_mk38_ht_dlc_6: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_ANK_MK38_CIVILIAN_NAME',
      UiDesc: 'UI_VEHICLE_ANK_MK38_CIVILIAN_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 200
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.65
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.3; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 51_100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_heavy_dlc_6: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.1,
      FuelConsumption: 8.5,
      Torque: 175_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.15,
      FuelConsumption: 9,
      Torque: 190_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 13_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 280,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.2,
      FuelConsumption: 10,
      Torque: 210_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_ank_mk38_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_ankmk38_dlc_6: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  s_ank_mk38_ht_dlc_6: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.05,
      Damping: 0.35,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.08,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.05,
      Damping: 0.4,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.18,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.04,
      Damping: 0.4,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.18,
      Strength: 0.02,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  tatra_phoenix_dlc_5: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TATRA_PHOENIX_NAME',
      UiDesc: 'UI_VEHICLE_TATRA_PHOENIX_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.015,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 345
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 18
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 18
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SteeringAngle: 16
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SteeringAngle: 16
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: -8
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: -8
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SteeringAngle: -14
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SteeringAngle: -14
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.58
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.58
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-2.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS,NE',
      Price: 72_800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_5: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  gearboxes_trucks_dlc_5: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_single_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 8500,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_mudtires_single2_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.9,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_single_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_truck_modern_dlc_5: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 210,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.042,
      FuelConsumption: 6,
      Torque: 170_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 230,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7,
      Torque: 190_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 8.5,
      Torque: 210_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_modern_grad_dlc_5: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.04,
      FuelConsumption: 8.2,
      Torque: 235_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 13_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_tatra_phoenix_dlc_5: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.035,
      Damping: 0.3,
      SuspensionMin: -0.35,
      SuspensionMax: 0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.12,
      Strength: 0.065,
      Damping: 0.3,
      SuspensionMin: -0.25,
      SuspensionMax: 0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_tatra_phoenix_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  tatra_force_t815_7_dlc_5: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TATRA_FORCE_T815_7_NAME',
      UiDesc: 'UI_VEHICLE_TATRA_FORCE_T815_7_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.022,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 380
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SteeringAngle: 18
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SteeringAngle: 18
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.64
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(1; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS,NE',
      Price: 182_600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_5: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  e_ru_special_dlc_5: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.045,
      FuelConsumption: 9,
      Torque: 205_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 270,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 10,
      Torque: 230_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 20_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11.5,
      Torque: 260_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_special_dlc_5: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 3.7,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 1.6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_special_kolob_dlc_5: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 1.9,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 4.7,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 6.2,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 8.2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 7900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_tatra_force_t815_7_dlc_5: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.18,
      Strength: 0.035,
      Damping: 0.3,
      SuspensionMin: -0.32,
      SuspensionMax: 0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.09,
      Damping: 0.3,
      SuspensionMin: -0.25,
      SuspensionMax: 0.3,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_tatra_force_815_7_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  jeep_wrangler_dlc_5: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_JEEP_WRANGLER_NAME',
      UiDesc: 'UI_VEHICLE_JEEP_WRANGLER_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.1,
      SteerSpeed: 0.032,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.6,
      FuelCapacity: 80
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.41
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.41
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.41
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.41
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.41
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.41
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.46
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(1; -0.5; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_5: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_dlc_5: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 20,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 1.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 18,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 24,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.8,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 12,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 16,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.9,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 110,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 13,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_modern_dlc_5: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 1,
      FuelConsumption: 0.9,
      Torque: 90_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 1.1,
      Torque: 110_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 140,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.04,
      FuelConsumption: 1.3,
      Torque: 120_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout1_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2.5,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout2_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 4
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  wheels_scout_highway_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.7,
      BodyFrictionAsphalt: 2.2,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2.3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_mudtires_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_offroad_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 1.1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_jeep_wrangler_dlc_5: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.03,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.07,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.08,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.12,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.13,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.17,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(4)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 70
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(4) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.012,
      Damping: 0.2,
      SuspensionMin: -0.47,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(4) > Suspension:nth-of-type(2)': {
      Height: 0.35,
      Strength: 0.012,
      Damping: 0.2,
      SuspensionMin: -0.47,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(4) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_offroad2_jeep_wrangler_dlc_5: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  jeep_cj7_renegade_dlc_5: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_JEEP_CJ7_RENEGADE_NAME',
      UiDesc: 'UI_VEHICLE_JEEP_CJ7_RENEGADE_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.032,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.6,
      FuelCapacity: 75
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.35
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.4
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.4
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_scout_old_dlc_5: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.25,
      FuelConsumption: 1.3,
      Torque: 35_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.3,
      FuelConsumption: 1.7,
      Torque: 42_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.35,
      FuelConsumption: 2,
      Torque: 50_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_jeep_cj7_renegade_dlc_5: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.08,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.12,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.18,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.22,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  international_hx_520_dlc_4_1: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_INTERNATIONAL_HX_520_NAME',
      UiDesc: 'UI_VEHICLE_INTERNATIONAL_HX_520_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 280
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: ''
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 151_900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_4_1: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  gearboxes_trucks_dlc_4_1: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_dlc_4_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6100,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  e_us_truck_modern_dlc_4_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.2,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.25,
      FuelConsumption: 6.5,
      Torque: 180_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.3,
      FuelConsumption: 7.5,
      Torque: 192_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_catroyal_dlc_4_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.15,
      FuelConsumption: 5,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_offroad_double_dlc_4_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_highway_double_dlc_4_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_dlc_4_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_international_hx_520_dlc_4_1: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.05,
      Damping: 0.5,
      SuspensionMin: -0.4,
      SuspensionMax: 0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0,
      Strength: 0.07,
      Damping: 0.5,
      SuspensionMin: 0,
      SuspensionMax: 0,
      BrokenSuspensionMax: 0
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  cat_ct681_dlc_4_1: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_CAT_CT681_NAME',
      UiDesc: 'UI_VEHICLE_CAT_CT681_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 260
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: ''
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 59_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_cat_ct681_dlc_4_1: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.06,
      Damping: 0.5,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.04,
      Strength: 0.02,
      Damping: 0.6,
      SuspensionMin: -0.18,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(3)': {
      Height: 0,
      Strength: 0.07,
      Damping: 0.5,
      SuspensionMin: 0,
      BrokenSuspensionMax: 0
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_cathx_dlc_4_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.1,
      FuelConsumption: 6.5,
      Torque: 210_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  trailer_train_rocket_dlc_4: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(9)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(10)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(11)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(12)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(13)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(14)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(15)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(16)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(17)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(18)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(19)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(20)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 0.6
    },
    'Truck > PhysicsModel > Body': {
      Mass: 120_000
    },
    'Truck > GameData': {
      Price: 18_800
    }
  },
  semitrailer_rocket_dlc_4: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_SEMITRAILER_ROCKET_NAME',
      UiDesc: 'UI_SEMITRAILER_ROCKET_DESC'
    },
    'Truck > GameData': {
      Country: '',
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  semitrailer_for_rocket_dlc_4: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_SEMITRAILER_FOR_ROCKET_NAME',
      UiDesc: 'UI_SEMITRAILER_FOR_ROCKET_DESC'
    },
    'Truck > GameData': {
      Country: '',
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  zikz_605r_dlc_4: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_ZIKZ_605R_NAME',
      UiDesc: 'UI_VEHICLE_ZIKZ_605R_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.016,
      DiffLockType: 'Always',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 380
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.78
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.68
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; -0.25; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 165_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_4: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  gearboxes_special_dlc_4: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 3.7,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 1.6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_special_dlc_4: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.045,
      FuelConsumption: 9,
      Torque: 205_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 270,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 10,
      Torque: 230_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 20_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11.5,
      Torque: 260_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_mudtires_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.6,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_zikz_605r_1_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_zikz_605r_dlc_4: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.03,
      Damping: 0.2,
      SuspensionMin: -0.25,
      SuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.001,
      Strength: 0.8,
      Damping: 0.8,
      SuspensionMin: 0,
      SuspensionMax: 0.01
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  tatra_t813_dlc_4: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TATRA_T813_NAME',
      UiDesc: 'UI_VEHICLE_TATRA_T813_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.2,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.022,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 380
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SteeringAngle: 18
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SteeringAngle: 18
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.64
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.64
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-2.2; -0.5; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS,NE',
      Price: 177_100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_single_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 8500,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_offroad_single_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.9,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single2_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_special_kolob_dlc_4: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 1.9,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 4.7,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 6.2,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 8.2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 7900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_tatra_t813_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_tatra_t813_dlc_4: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.035,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.12,
      Strength: 0.032,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  tatra_805_dlc_4: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TATRA_805_NAME',
      UiDesc: 'UI_VEHICLE_TATRA_805_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 190
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.47
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS,NE',
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_4: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  gearboxes_trucks_dlc_4: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_dlc_4: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 4.5,
      Torque: 130_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 5.5,
      Torque: 140_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.04,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(4)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 2.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7.5,
      Torque: 185_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(4) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_front_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_offroad_single_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_highway_single_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_single_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_actaeon_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  s_tatra_805_dlc_4: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.035,
      Damping: 0.3,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.055,
      Damping: 0.3,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  khan_317_sentinel_dlc_4: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KHAN_317_SENTINEL_H2_NAME',
      UiDesc: 'UI_VEHICLE_KHAN_317_SENTINEL_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.15,
      SteerSpeed: 0.032,
      DiffLockType: 'Uninstalled',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.6,
      FuelCapacity: 80
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.42
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.52
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 28_200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_4: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_dlc_4: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 20,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 1.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 18,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 24,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.8,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 12,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 16,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.9,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 110,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 13,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_scout_modern_dlc_4: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.35,
      FuelConsumption: 1.5,
      Torque: 70_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.4,
      FuelConsumption: 1.7,
      Torque: 80_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 170,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.45,
      FuelConsumption: 1.9,
      Torque: 90_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout1_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2.5,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout2_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 4
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  wheels_scout_mudtires_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_offroad_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 1.1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_highway_dlc_4: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.7,
      BodyFrictionAsphalt: 2.2,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2.3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_khan_317_sentinel_dlc_4: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.12,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.12,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.37,
      Strength: 0.02,
      Damping: 0.3,
      SuspensionMin: -0.38,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.37,
      Strength: 0.02,
      Damping: 0.3,
      SuspensionMin: -0.38,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  train_dlc_3: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(9)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(10)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(11)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(12)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.6
    },
    'Truck > PhysicsModel > Body': {
      Mass: 140_000
    },
    'Truck > GameData': {
      Price: 18_800
    }
  },
  trailer_log_pole_dlc_3: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.1
    },
    'Truck > PhysicsModel > Body': {
      Mass: 100
    },
    'Truck > GameData': {
      Price: 14_100
    }
  },
  trailer_log_dlc_3: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.08
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.08
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.08
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.1,
      SuspensionStrength: 0.08
    },
    'Truck > PhysicsModel > Body': {
      Mass: 600
    },
    'Truck > GameData': {
      Price: 14_100
    }
  },
  trailer_generator_dlc_3: {
    'Truck > TruckData': {
      FuelCapacity: 1500,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.075,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.33
    },
    'Truck > PhysicsModel > Body': {
      Mass: 2000
    },
    'Truck > GameData': {
      Price: 13_200
    }
  },
  paystar_5600ts_dlc_3: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_INTERNATIONAL_PAYSTAR_5600TS_NAME',
      UiDesc: 'UI_VEHICLE_INTERNATIONAL_PAYSTAR_5600TS_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.016,
      SteerSpeed: 0.024,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 280
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(9)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(10)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(14)': {
      Scale: 0.545
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(15)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(16)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(17)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(18)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(19)': {
      Scale: 0.63
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(20)': {
      Scale: 0.63
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 102_600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_3: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  e_us_special_dlc_3: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.035,
      FuelConsumption: 9.5,
      Torque: 200_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11,
      Torque: 220_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 280,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 12.5,
      Torque: 250_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_trucks_dlc_3: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_double1_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    }
  },
  wheels_heavy_double2_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_single_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 8500,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_single2_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 7700,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    }
  },
  wheels_heavy_highway_double_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_allterrain_double_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_double_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_single_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.9,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single2_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_paystar_5600ts_dlc_3: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.08,
      Strength: 0.08,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.08,
      Strength: 0.025,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.18,
      Strength: 0.07,
      Damping: 0.3,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.022,
      Damping: 0.2,
      SuspensionMin: -0.45,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 9400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  pacific_p512_dlc_3: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_PACIFIC_P512_NAME',
      UiDesc: 'UI_VEHICLE_PACIFIC_P512_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.03,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 200
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.646
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.646
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 108_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_3: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  e_us_truck_old_heavy_dlc_3: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.1,
      FuelConsumption: 8.5,
      Torque: 175_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.15,
      FuelConsumption: 9,
      Torque: 190_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 13_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 280,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.2,
      FuelConsumption: 10,
      Torque: 210_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_pacific_p512_dlc_3: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 200
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.09,
      Strength: 0.06,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.11,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_p512_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 3.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  boar_45318_dlc_3: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_BOAR_45318_NAME',
      UiDesc: 'UI_VEHICLE_BOAR_45318_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 300
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 37
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 37
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.69
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.74
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.74
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.69
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.69
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.69
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.74
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.74
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.74
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.55; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 120
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 155_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_special_dlc_3: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.045,
      FuelConsumption: 9,
      Torque: 205_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 270,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 10,
      Torque: 230_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 20_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11.5,
      Torque: 260_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6100,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_highway_double_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_offroad_double_dlc_3: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_boar_45318_dlc_3: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 230
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.1,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.08,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 250
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.2,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.08,
      Damping: 0.3,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  krs_58_bandit_dlc_2_2: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KRS_58_BANDIT_NAME',
      UiDesc: 'UI_VEHICLE_KRS_58_BANDIT_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.55,
      BackSteerSpeed: 0.05,
      SteerSpeed: 0.035,
      DiffLockType: 'Always',
      EngineStartDelay: 2,
      ExhaustStartTime: 1.8,
      FuelCapacity: 150
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 24
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.65
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.65
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.3; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 98_500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_2_2: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  gearboxes_trucks_dlc_2_2: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_dlc_2_2: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 4.5,
      Torque: 130_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 5.5,
      Torque: 140_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.04,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(4)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 2.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7.5,
      Torque: 185_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(4) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_front_dlc_2_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_offroad_double_dlc_2_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_dlc_2_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_highway_double_dlc_2_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_actaeon_dlc_2_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  s_krs_58_bandit_dlc_2_2: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.16,
      Strength: 0.06,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.16,
      Strength: 0.06,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  semitrailer_special_w_cat_770_dlc_2_1: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.06,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.06,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.06,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.06,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.35
    },
    'Truck > PhysicsModel > Body': {
      Mass: 9000
    },
    'Truck > GameData': {
      Price: 11_700
    }
  },
  semitrailer_oil_refinery_dlc_2_1: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(9)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(10)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > PhysicsModel > Body': {
      Mass: 8000
    },
    'Truck > GameData': {
      Price: 12_200
    }
  },
  semitrailer_gooseneck_8_dlc_2_1: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 8
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(9)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(10)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.1
    },
    'Truck > PhysicsModel > Body': {
      Mass: 750
    },
    'Truck > GameData': {
      Price: 9400
    }
  },
  semitrailer_cat770g_dlc_2_1: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.0244,
      SuspensionStrength: 0.0422
    },
    'Truck > PhysicsModel > Body': {
      Mass: 20_000
    },
    'Truck > GameData': {
      Price: 10_400
    }
  },
  western_star_49x_dlc_2_1: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_WESTERN_STAR_49X_NAME',
      UiDesc: 'UI_VEHICLE_WESTERN_STAR_49X_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.02,
      DiffLockType: 'Installed',
      EngineStartDelay: 3.2,
      ExhaustStartTime: 2.8,
      FuelCapacity: 290
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 36
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 121_500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_2_1: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  gearboxes_trucks_dlc_2_1: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_dlc_2_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6100,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(11) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_offroad_double_dlc_2_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_dlc_2_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_highway_double_dlc_2_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_dlc_2_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.2,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.25,
      FuelConsumption: 6.5,
      Torque: 180_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.3,
      FuelConsumption: 7.5,
      Torque: 192_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_ws_49x_dlc_2_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 170,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.15,
      FuelConsumption: 8.5,
      Torque: 220_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 12_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_western_star_49x_dlc_2_1: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.3,
      Strength: 0.12,
      Damping: 0.15,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.35,
      Strength: 0.015,
      Damping: 0.2,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(3)': {
      Height: 0,
      Strength: 0.017,
      Damping: 0.6,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  cat_th357_dlc_2_1: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_CAT_TH357_NAME',
      UiDesc: 'UI_VEHICLE_CAT_TH357_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.1,
      BackSteerSpeed: 0.05,
      SteerSpeed: 0.015,
      DiffLockType: 'Always',
      EngineStartDelay: 2,
      ExhaustStartTime: 1.8,
      FuelCapacity: 110
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: -32
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: -32
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.648
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.7; -0.4; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 85_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_2_1: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_special_dlc_2_1: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 3.7,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 1.6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_special_cat_th357_dlc_2_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 90,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.01,
      FuelConsumption: 1.1,
      Torque: 90_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_cat_th357_single_dlc_2_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 8300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_cat_th357_dlc_2_1: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.01,
      Strength: 0.8,
      Damping: 0.8,
      SuspensionMin: 0,
      SuspensionMax: 0.01,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.01,
      Strength: 0.8,
      Damping: 0.8,
      SuspensionMin: 0,
      SuspensionMax: 0.05,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  cat_770g_dlc_2_1: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_CAT_770G_NAME',
      UiDesc: 'UI_VEHICLE_CAT_770G_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.05,
      BackSteerSpeed: 0.015,
      SteerSpeed: 0.017,
      DiffLockType: 'Always',
      EngineStartDelay: 0.6,
      ExhaustStartTime: 0.6,
      FuelCapacity: 530
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 20
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 20
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.94
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.94
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.5; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 143_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_special_dlc_2_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.035,
      FuelConsumption: 9.5,
      Torque: 200_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11,
      Torque: 220_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 280,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 12.5,
      Torque: 250_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_mudtires_dlc_2_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.6,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_cat770g_double_dlc_2_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_cat_770g_dlc_2_1: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.05,
      Strength: 0.1,
      Damping: 0.3,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.05,
      Strength: 0.05,
      Damping: 0.05,
      SuspensionMin: -0.1,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  semitrailer_stepdeck_plane_01_dlc_1_2: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 5
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1000
    },
    'Truck > GameData': {
      Price: 7500
    }
  },
  tuz_108_warthog_dlc_1_2: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TUZ_108_WARTHOG_NAME',
      UiDesc: 'UI_VEHICLE_TUZ_108_WARTHOG_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 200
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 25
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 25
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(14)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(15)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(16)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(17)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(18)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.3; 0.1; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 120
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 19_900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_1_2: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  gearboxes_trucks_dlc_1_2: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_modern_dlc_1_2: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 210,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.042,
      FuelConsumption: 6,
      Torque: 170_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 230,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7,
      Torque: 190_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 8.5,
      Torque: 210_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_front_dlc_1_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_highway_double_dlc_1_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_offroad_double_dlc_1_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_dlc_1_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_double_dlc_1_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_actaeon_dlc_1_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  s_tuz_108_warthog_dlc_1_2: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.08,
      Strength: 0.06,
      Damping: 0.6,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.08,
      Strength: 0.08,
      Damping: 0.6,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.18,
      Strength: 0.06,
      Damping: 0.6,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.18,
      Strength: 0.08,
      Damping: 0.6,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 6400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.13,
      Strength: 0.06,
      Damping: 0.4,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.13,
      Strength: 0.08,
      Damping: 0.4,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 9800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  chevy_apache_dlc_1_2: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_CHEVY_APACHE_NAME',
      UiDesc: 'UI_VEHICLE_CHEVY_APACHE_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.55,
      BackSteerSpeed: 0.05,
      SteerSpeed: 0.035,
      DiffLockType: 'Always',
      EngineStartDelay: 2,
      ExhaustStartTime: 1.8,
      FuelCapacity: 95
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 26
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 26
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'full',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.56
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.1; -0.2; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 29_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_1_2: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_dlc_1_2: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 20,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 1.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 18,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 24,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.8,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 12,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 16,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.9,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 110,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 13,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_old_dlc_1_2: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.25,
      FuelConsumption: 1.3,
      Torque: 35_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.3,
      FuelConsumption: 1.7,
      Torque: 42_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.35,
      FuelConsumption: 2,
      Torque: 50_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_old_ck1500_dlc_1_2: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.25,
      FuelConsumption: 3.3,
      Torque: 60_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout_apache_offroad_dlc_1_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 1.1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_yar87_mudtires_dlc_1_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_apache_1_dlc_1_2: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  s_chevy_apache_dlc_1_2: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 140
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.02,
      SuspensionMin: -0.4,
      SuspensionMax: 0,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0,
      Strength: 0.02,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.3
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 3200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  scout_trailer_radar_dlc_1_1: {
    'Truck > TruckData': {
      FuelCapacity: 120,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.05,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.05,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.05,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.05,
      SuspensionStrength: 0.1
    },
    'Truck > PhysicsModel > Body': {
      Mass: 600
    },
    'Truck > GameData': {
      Price: 5800
    }
  },
  cargo_cabin_01_dlc_1_1: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.01
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.01
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.01
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0,
      SuspensionStrength: 0.01
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1700
    },
    'Truck > GameData': {}
  },
  tuz_16_actaeon_dlc_1_1: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_TUZ_16_ACTAEON_NAME',
      UiDesc: 'UI_VEHICLE_TUZ_16_ACTAEON_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.03,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 110
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 25
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 25
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.5
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(13)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(14)': {
      Scale: 0.55
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(15)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(16)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(17)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(18)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 120
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 54_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_trucks_dlc_1_1: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_truck_old_dlc_1_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.04,
      FuelConsumption: 4.5,
      Torque: 130_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.04,
      FuelConsumption: 5.5,
      Torque: 140_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 7200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.04,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(4)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 2.1,
      EngineResponsiveness: 0.04,
      FuelConsumption: 7.5,
      Torque: 185_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(4) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_medium_double_front_dlc_1_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(9) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(10) > GameData': {
      Price: 6400,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  wheels_medium_highway_double_dlc_1_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_offroad_double_dlc_1_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_allterrain_double_dlc_1_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_double_dlc_1_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_1_1: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  winches_actaeon_dlc_1_1: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 0.8,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_medium_mudtires_actaeon_dlc_1_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    }
  },
  s_tuz_16_actaeon_dlc_1_1: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.13,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.04,
      Damping: 0.3,
      SuspensionMin: -0.16,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 140
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.1,
      Strength: 0.04,
      Damping: 0.4,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.04,
      Damping: 0.4,
      SuspensionMin: -0.13,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 9800,
      UnlockByExploration: 'false',
      UnlockByRank: 26
    }
  },
  ford_f750_dlc_1_1: {
    'Truck > GameData > UiDesc': {},
    'Truck > TruckData': {
      Responsiveness: 0.6,
      BackSteerSpeed: 0.06,
      SteerSpeed: 0.03,
      DiffLockType: 'Always',
      EngineStartDelay: 1.7,
      ExhaustStartTime: 1.6,
      FuelCapacity: 140
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'connectable',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.57
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.47
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.52
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.57
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.57
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-1.7; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 43_600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_1_1: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_f750_dlc_1_1: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.2,
      DamageCapacity: 75,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(6)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_ford_f750_dlc_1_1: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 5
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  e_us_scout_old_dlc_1_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.25,
      FuelConsumption: 1.3,
      Torque: 35_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.3,
      FuelConsumption: 1.7,
      Torque: 42_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.35,
      FuelConsumption: 2,
      Torque: 50_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_old_f750_dlc_1_1: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 2.5,
      EngineResponsiveness: 0.5,
      FuelConsumption: 5.5,
      Torque: 120_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.3,
      MaxDeltaAngVel: 0.015
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 8500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  s_ford_f750_dlc_1_1: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 120
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.2,
      Strength: 0.042,
      Damping: 0.2,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.1,
      Strength: 0.1,
      Damping: 0.25,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.27,
      Strength: 0.042,
      Damping: 0.3,
      SuspensionMin: -0.37,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.17,
      Strength: 0.08,
      Damping: 0.3,
      SuspensionMin: -0.15,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 75
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.32,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.5,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.22,
      Strength: 0.08,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  semitrailer_stepdeck_plane_02_dlc_12: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > GameData > AddonSlots': {
      Quantity: 5
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.04,
      SuspensionStrength: 0.04
    },
    'Truck > PhysicsModel > Body': {
      Mass: 1000
    },
    'Truck > GameData': {
      Price: 7500
    }
  },
  semitrailer_reactor_starter_dlc_12: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: -0.08,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: -0.08,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: -0.08,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: -0.08,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: -0.08,
      SuspensionStrength: 0.1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: -0.08,
      SuspensionStrength: 0.1
    },
    'Truck > PhysicsModel > Body': {
      Mass: 6500
    },
    'Truck > GameData': {
      Price: 12_200
    }
  },
  mtb_8106_dlc_12: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_MTB_8106_NAME',
      UiDesc: 'UI_VEHICLE_MTB_8106_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.85,
      BackSteerSpeed: 0.03,
      SteerSpeed: 0.032,
      DiffLockType: 'Installed',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.6,
      FuelCapacity: 80
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 28
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.44
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.44
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.44
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.44
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.44
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.46
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(-0.32; 0.1; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 4100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_12: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_dlc_12: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 20,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 1.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 18,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 24,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.8,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 12,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 16,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.9,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 110,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 13,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout1_dlc_12: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2.5,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout2_dlc_12: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 4
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  wheels_scout_offroad_dlc_12: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 1.1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_mudtires_dlc_12: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_highway_dlc_12: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.7,
      BodyFrictionAsphalt: 2.2,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2.3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_mtb_8106_dlc_12: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.23,
      Strength: 0.03,
      Damping: 0.55,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.24,
      Strength: 0.04,
      Damping: 0.55,
      SuspensionMin: -0.23,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 3800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.33,
      Strength: 0.03,
      Damping: 0.55,
      SuspensionMin: -0.27,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.34,
      Strength: 0.035,
      Damping: 0.55,
      SuspensionMin: -0.29,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.43,
      Strength: 0.014,
      Damping: 0.55,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.44,
      Strength: 0.015,
      Damping: 0.55,
      SuspensionMin: -0.4,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 6600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_old_dlc_12: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.25,
      FuelConsumption: 1.3,
      Torque: 35_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.3,
      FuelConsumption: 1.7,
      Torque: 42_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.35,
      FuelConsumption: 2,
      Torque: 50_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_special_mtb_8106_dlc_12: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.65,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.51,
      EngineResponsiveness: 0.37,
      FuelConsumption: 1.85,
      Torque: 58_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.28,
      MaxDeltaAngVel: 0.04
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 6600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  femm_37at_dlc_12: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_FEMM_37AT_NAME',
      UiDesc: 'UI_VEHICLE_FEMM_37AT_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.3,
      BackSteerSpeed: 0.02,
      SteerSpeed: 0.035,
      DiffLockType: 'Installed',
      EngineStartDelay: 1.9,
      ExhaustStartTime: 1.9,
      FuelCapacity: 340
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.9
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.9
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.7; 0; -0.1)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS',
      Price: 181_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_12: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  gearboxes_special_dlc_12: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 3.7,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 1.6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_single_dlc_12: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.7,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_mudtires_dlc_12: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.6,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_ru_special_dlc_12: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.3,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.045,
      FuelConsumption: 9,
      Torque: 205_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 270,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.04,
      FuelConsumption: 10,
      Torque: 230_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 20_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.04,
      FuelConsumption: 11.5,
      Torque: 260_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_special_femm_37at_dlc_12: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.58,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.06,
      FuelConsumption: 10.8,
      Torque: 245_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.75,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 28_000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.33,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.8,
      EngineResponsiveness: 0.06,
      FuelConsumption: 18,
      Torque: 288_000,
      DamagedMinTorqueMultiplier: 0.8,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.7,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 30_000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_femm_37at_dlc_12: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.06,
      Damping: 0.7,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.09,
      Strength: 0.08,
      Damping: 0.5,
      SuspensionMin: -0.3,
      SuspensionMax: 0.04,
      BrokenSuspensionMax: 0.03
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  semitrailer_star_dlc_11: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.15,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.15,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.15,
      SuspensionStrength: 0.0422
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.15,
      SuspensionStrength: 0.0422
    },
    'Truck > PhysicsModel > Body': {
      Mass: 10_000
    },
    'Truck > GameData': {
      Price: 6800
    }
  },
  scout_trailer_light_repair_dlc_11: {
    'Truck > TruckData': {
      FuelCapacity: 150,
      WaterCapacity: 0,
      RepairsCapacity: 250,
      WheelRepairsCapacity: 2
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.01,
      SuspensionStrength: 1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.065
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.07,
      SuspensionStrength: 0.065
    },
    'Truck > PhysicsModel > Body': {
      Mass: 900
    },
    'Truck > GameData': {
      Price: 3400
    }
  },
  scout_trailer_heavy_repair_dlc_11: {
    'Truck > TruckData': {
      FuelCapacity: 220,
      WaterCapacity: 0,
      RepairsCapacity: 320,
      WheelRepairsCapacity: 3
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0,
      SuspensionStrength: 1
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.03,
      SuspensionStrength: 0.03
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.03,
      SuspensionStrength: 0.03
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.03,
      SuspensionStrength: 0.03
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.03,
      SuspensionStrength: 0.03
    },
    'Truck > PhysicsModel > Body': {
      Mass: 800
    },
    'Truck > GameData': {
      Price: 4300
    }
  },
  neo_falcon_2000_dlc_11: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_NEO_FALCON_2000_NAME',
      UiDesc: 'UI_VEHICLE_NEO_FALCON_2000_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.65,
      BackSteerSpeed: 0.08,
      SteerSpeed: 0.032,
      DiffLockType: 'Installed',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.6,
      FuelCapacity: 90
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 34
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 34
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.48
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.48
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.46
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.48
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.48
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.48
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.5; -0.3; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 150
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 2600,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_scouts_dlc_11: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 21,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 6
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 21,
      StrengthMult: 1.4,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 12_200,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(5)': {
      Length: 14,
      StrengthMult: 0.9,
      IsEngineIgnitionRequired: 'false'
    },
    'WinchVariants > Winch:nth-of-type(5) > GameData': {
      Price: 9400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  gearboxes_scouts_dlc_11: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 120,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 1.8,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 2,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 14,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 20,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 1.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 3,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 10,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 18,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 24,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.8,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 3,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 12,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 16,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 2100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.9,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 110,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.4,
      IdleFuelModifier: 0.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 10,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 13,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 1900,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_scout_old_dlc_11: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.25,
      FuelConsumption: 1.3,
      Torque: 35_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 100,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.3,
      FuelConsumption: 1.7,
      Torque: 42_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.5,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.35,
      FuelConsumption: 2,
      Torque: 50_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout1_dlc_11: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.8,
      BodyFrictionAsphalt: 2.5,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout2_dlc_11: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.4,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 2500,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 4
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 7
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    }
  },
  wheels_scout_mudtires_dlc_11: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.1,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_neo_falcon_2000_dlc_11: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.125,
      Strength: 0.025,
      Damping: 0.2,
      SuspensionMin: -0.18,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.14,
      Strength: 0.025,
      Damping: 0.2,
      SuspensionMin: -0.14,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 100
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.25,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.3,
      SuspensionMax: 1.5,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.25,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.25,
      SuspensionMax: 1.5,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 5700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_scout_highway_dlc_11: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 0.7,
      BodyFrictionAsphalt: 2.2,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 1200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 2.3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 1400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_offroad_dlc_11: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2.2,
      BodyFrictionAsphalt: 1.1,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  burlak_6x6_dlc_11: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_BURLAK_6X6_NAME',
      UiDesc: 'UI_VEHICLE_BURLAK_6X6_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.5,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.03,
      DiffLockType: 'Installed',
      EngineStartDelay: 2.2,
      ExhaustStartTime: 1.8,
      FuelCapacity: 280
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.875
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0.8; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 100
    },
    'Truck > GameData': {
      Country: 'RU,CAS,NE',
      Price: 97_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_offroad_burlak_6x6_dlc_11: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.4,
      FuelConsumption: 2.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.22
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3,
      FuelModifier: 1.15
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 2.6,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 4.2,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 5.6,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 6.5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_ru_offroad_burlak_6x6_dlc_11: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.1,
      FuelConsumption: 5.2,
      Torque: 80_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.05
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_burlak_6x6_dlc_11: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 80
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.02,
      Damping: 0.3,
      SuspensionMin: -0.25,
      SuspensionMax: 1,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.15,
      Strength: 0.02,
      Damping: 0.3,
      SuspensionMin: -0.25,
      SuspensionMax: 1,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 2700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_scout_burlak_offroad_dlc_11: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 2300,
      UnlockByExploration: 'false',
      UnlockByRank: 2
    }
  },
  semitrailer_fishing_boat_dlc_10: {
    'Truck > TruckData': {
      FuelCapacity: 0,
      WaterCapacity: 0,
      RepairsCapacity: 0,
      WheelRepairsCapacity: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      SuspensionHeight: 0.26,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      SuspensionHeight: 0.26,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      SuspensionHeight: 0.26,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      SuspensionHeight: 0.26,
      SuspensionStrength: 0.05
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      SuspensionHeight: 0.26,
      SuspensionStrength: 0.35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      SuspensionHeight: 0.26,
      SuspensionStrength: 0.35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      SuspensionHeight: 0.26,
      SuspensionStrength: 0.35
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      SuspensionHeight: 0.26,
      SuspensionStrength: 0.35
    },
    'Truck > PhysicsModel > Body': {
      Mass: 9000
    },
    'Truck > GameData': {
      Price: 11_700
    }
  },
  mack_defense_m917_dlc_10: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_MACK_DEFENSE_M917_NAME',
      UiDesc: 'UI_VEHICLE_MACK_DEFENSE_M917_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.45,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.025,
      DiffLockType: 'Installed',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 350
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'default',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(7)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(8)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.6
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.6
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; -0.4; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 110
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 95_500,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  winches_medium_trucks_dlc_10: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 18,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 8
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 12
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 18,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 16
    }
  },
  e_us_truck_modern_mack_defense_m917_dlc_10: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      EngineResponsiveness: 0.035,
      FuelConsumption: 8,
      Torque: 176_500,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.6,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 300,
      DamagedConsumptionModifier: 1.4,
      EngineResponsiveness: 0.044,
      FuelConsumption: 10,
      Torque: 232_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.75,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.015
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 19_700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.75,
      DamageCapacity: 280,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.045,
      FuelConsumption: 9.5,
      Torque: 222_000,
      DamagedMinTorqueMultiplier: 0.9,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.4,
      MaxDeltaAngVel: 0.02
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 24_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_special_mack_defense_dlc_10: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.15,
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 200,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 1.5,
      IdleFuelModifier: 0.45
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.35
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_single_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7000,
      UnlockByExploration: 'false',
      UnlockByRank: 13
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 8500,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(7) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(8) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_mack_defense_m917_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 2.8,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.8,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_mack_defense_m917_dlc_10: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 300
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.18,
      Strength: 0.05,
      Damping: 0.4,
      SuspensionMin: -0.25,
      SuspensionMax: -0.1,
      BrokenSuspensionMax: -0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.12,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.25,
      SuspensionMax: -0.1,
      BrokenSuspensionMax: -0.1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 260
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.23,
      Strength: 0.05,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.17,
      Strength: 0.03,
      Damping: 0.3,
      SuspensionMin: -0.25,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(1)': {
      Height: 0.19,
      Strength: 0.04,
      Damping: 0.4,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > Suspension:nth-of-type(2)': {
      Height: 0.13,
      Strength: 0.02,
      Damping: 0.3,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.25
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(3) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_single_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.9,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.3,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.9,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 7400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_mudtires_single2_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.4,
      SubstanceFriction: 2.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 2.4,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 2.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.8,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 2.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  kenworth_w990_dlc_10: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KENWORTH_W990_NAME',
      UiDesc: 'UI_VEHICLE_KENWORTH_W990_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.45,
      BackSteerSpeed: 0.025,
      SteerSpeed: 0.025,
      DiffLockType: 'Always',
      EngineStartDelay: 0.8,
      ExhaustStartTime: 0.9,
      FuelCapacity: 380
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 40
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(1)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > ExtraWheels > Wheel:nth-of-type(2)': {
      Torque: 'none',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(4)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(5)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(6)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(7)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(8)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(9)': {
      Scale: 0.56
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(10)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(11)': {
      Scale: 0.66
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(12)': {
      Scale: 0.66
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; -0.4; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 100_800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  winches_heavy_trucks_dlc_10: {
    'WinchVariants > Winch:nth-of-type(1)': {
      Length: 14,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(1) > GameData': {
      Price: 1000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'WinchVariants > Winch:nth-of-type(2)': {
      Length: 17,
      StrengthMult: 1,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(2) > GameData': {
      Price: 15_000,
      UnlockByExploration: 'false',
      UnlockByRank: 10
    },
    'WinchVariants > Winch:nth-of-type(3)': {
      Length: 14,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(3) > GameData': {
      Price: 18_800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    },
    'WinchVariants > Winch:nth-of-type(4)': {
      Length: 17,
      StrengthMult: 1.3,
      IsEngineIgnitionRequired: 'true'
    },
    'WinchVariants > Winch:nth-of-type(4) > GameData': {
      Price: 22_500,
      UnlockByExploration: 'false',
      UnlockByRank: 20
    }
  },
  gearboxes_trucks_dlc_10: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 2.5,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'false',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 1.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 7.5,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 8,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 10,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 1900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1.3,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 150,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 1,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 14,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 1.5,
      FuelModifier: 2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 4,
      FuelModifier: 1.9
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(5)': {
      AngVel: 15,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(6)': {
      AngVel: 18,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(7)': {
      AngVel: 21,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(8)': {
      AngVel: 24,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 3800,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 8,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 6,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 8,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 12,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 5300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.6,
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 130,
      DamagedConsumptionModifier: 1.5,
      FuelConsumption: 3.2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 2,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 5,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 7.5,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 10,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 4700,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_heavy_double2_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.9,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.5,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 11
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1.2,
      SubstanceFriction: 1.3,
      IsIgnoreIce: 'true'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 14
    }
  },
  wheels_heavy_double1_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.2,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.9,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(5) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(6) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 9
    }
  },
  wheels_kenworth_990_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 3.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 6000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_kenworth_w990_dlc_10: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.8,
      DamageCapacity: 280
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.18,
      Strength: 0.12,
      Damping: 0.15,
      SuspensionMin: -0.25,
      SuspensionMax: 1.4,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0.2,
      Strength: 0.015,
      Damping: 0.2,
      SuspensionMin: -0.3,
      SuspensionMax: 1.4,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(3)': {
      Height: 0,
      Strength: 0.017,
      Damping: 0.6,
      SuspensionMin: -0.1,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 230
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(1)': {
      Height: 0.32,
      Strength: 0.1,
      Damping: 0.15,
      SuspensionMin: -0.35,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(2)': {
      Height: 0.32,
      Strength: 0.013,
      Damping: 0.2,
      SuspensionMin: -0.2,
      BrokenSuspensionMax: 0.15
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > Suspension:nth-of-type(3)': {
      Height: 0,
      Strength: 0.017,
      Damping: 0.6,
      SuspensionMin: -0.1,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(2) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_dlc_10: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.5,
      DamageCapacity: 160,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.2,
      FuelConsumption: 6,
      Torque: 160_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 3000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.3,
      EngineResponsiveness: 0.25,
      FuelConsumption: 6.5,
      Torque: 180_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 10_400,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.1,
      EngineResponsiveness: 0.3,
      FuelConsumption: 7.5,
      Torque: 192_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.8,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 11_300,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_modern_kenworth_990_dlc_10: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.4,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.2,
      EngineResponsiveness: 0.18,
      FuelConsumption: 8.8,
      Torque: 228_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 20_700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_allterrain_double_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.5,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.7,
      SubstanceFriction: 1.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 5300,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 1.5,
      BodyFrictionAsphalt: 1.4,
      SubstanceFriction: 1.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_offroad_double_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 3,
      BodyFrictionAsphalt: 1,
      SubstanceFriction: 1.7,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 5900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 3.1,
      BodyFrictionAsphalt: 0.8,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 3.2,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 1.6,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 6800,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_heavy_highway_double_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 3600,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.1,
      BodyFrictionAsphalt: 3,
      SubstanceFriction: 0.3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 4000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 0.9,
      BodyFrictionAsphalt: 3.2,
      SubstanceFriction: 0.4,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 4400,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  kenworth_963_dlc_10: {
    'Truck > GameData > UiDesc': {
      UiName: 'UI_VEHICLE_KENWORTH_963_NAME',
      UiDesc: 'UI_VEHICLE_KENWORTH_963_DESC'
    },
    'Truck > TruckData': {
      Responsiveness: 0.15,
      BackSteerSpeed: 0.01,
      SteerSpeed: 0.02,
      DiffLockType: 'Always',
      EngineStartDelay: 1.8,
      ExhaustStartTime: 1.5,
      FuelCapacity: 510
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(1)': {
      Torque: 'full',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(2)': {
      Torque: 'full',
      SteeringAngle: 30
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(3)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(4)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(5)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > Wheels > Wheel:nth-of-type(6)': {
      Torque: 'default',
      SteeringAngle: 0
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(1)': {
      Scale: 0.9
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(2)': {
      Scale: 0.87
    },
    'Truck > TruckData > CompatibleWheels:nth-of-type(3)': {
      Scale: 0.87
    },
    'Truck > PhysicsModel > Body': {
      CenterOfMassOffset: '(0; 0; 0)'
    },
    'Truck > TruckData > FuelTank': {
      DamageCapacity: 50
    },
    'Truck > GameData': {
      Country: 'US,NE',
      Price: 121_200,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  e_us_truck_old_kenworth_963_dlc_10: {
    'EngineVariants > Engine:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.1,
      FuelConsumption: 8.5,
      Torque: 175_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.6,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(1) > GameData': {
      Price: 5700,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(2)': {
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 240,
      DamagedConsumptionModifier: 1.7,
      EngineResponsiveness: 0.15,
      FuelConsumption: 9,
      Torque: 190_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.01
    },
    'EngineVariants > Engine:nth-of-type(2) > GameData': {
      Price: 13_200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'EngineVariants > Engine:nth-of-type(3)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.6,
      EngineResponsiveness: 0.2,
      FuelConsumption: 12,
      Torque: 265_000,
      DamagedMinTorqueMultiplier: 1,
      DamagedMaxTorqueMultiplier: 0.7,
      BrakesDelay: 0.5,
      MaxDeltaAngVel: 0.012
    },
    'EngineVariants > Engine:nth-of-type(3) > GameData': {
      Price: 16_000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  gearboxes_special_kenworth_963_dlc_10: {
    'GearboxVariants > Gearbox:nth-of-type(1)': {
      AWDConsumptionModifier: 1.4,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 230,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 3.3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > ReverseGear': {
      AngVel: 0.6,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.8
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(2)': {
      AngVel: 1.2,
      FuelModifier: 1.65
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(3)': {
      AngVel: 2.1,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(4)': {
      AngVel: 3,
      FuelModifier: 1.35
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(5)': {
      AngVel: 3.9,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(6)': {
      AngVel: 4.8,
      FuelModifier: 1.05
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > Gear:nth-of-type(7)': {
      AngVel: 5.2,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(1) > GameData': {
      Price: 3200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(2)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 220,
      DamagedConsumptionModifier: 1.6,
      FuelConsumption: 2,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'false',
      IsLowerMinusGearExists: 'false'
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > ReverseGear': {
      AngVel: 0.5,
      FuelModifier: 0.89
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > HighGear': {
      AngVel: 3,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(2)': {
      AngVel: 1.7,
      FuelModifier: 1.4
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(3)': {
      AngVel: 2.5,
      FuelModifier: 1.2
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(2) > GameData': {
      Price: 2900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3)': {
      AWDConsumptionModifier: 1,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 250,
      DamagedConsumptionModifier: 1.7,
      FuelConsumption: 3,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData > GearboxParams': {
      IsManualLowGear: 'false',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(2)': {
      AngVel: 1.8,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(3)': {
      AngVel: 2.6,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(4)': {
      AngVel: 3.7,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > Gear:nth-of-type(5)': {
      AngVel: 4.9,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(3) > GameData': {
      Price: 6000,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4)': {
      AWDConsumptionModifier: 1.2,
      CriticalDamageThreshold: 0.7,
      DamageCapacity: 180,
      DamagedConsumptionModifier: 1.9,
      FuelConsumption: 4,
      IdleFuelModifier: 0.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData > GearboxParams': {
      IsManualLowGear: 'true',
      IsHighGearExists: 'true',
      IsLowerGearExists: 'true',
      IsLowerPlusGearExists: 'true',
      IsLowerMinusGearExists: 'true'
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > ReverseGear': {
      AngVel: 0.7,
      FuelModifier: 0.9
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > HighGear': {
      AngVel: 5,
      FuelModifier: 1.6
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(1)': {
      AngVel: 0.9,
      FuelModifier: 1.7
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(2)': {
      AngVel: 1.6,
      FuelModifier: 1.5
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(3)': {
      AngVel: 2.2,
      FuelModifier: 1.3
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(4)': {
      AngVel: 3.5,
      FuelModifier: 1.1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > Gear:nth-of-type(5)': {
      AngVel: 5,
      FuelModifier: 1
    },
    'GearboxVariants > Gearbox:nth-of-type(4) > GameData': {
      Price: 5100,
      UnlockByExploration: 'true',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_single_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 15
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.7,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(4) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  s_kenworth_963_dlc_10: {
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1)': {
      CriticalDamageThreshold: 0.6,
      DamageCapacity: 260
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(1)': {
      Height: 0.15,
      Strength: 0.06,
      Damping: 0.7,
      SuspensionMin: -0.3,
      BrokenSuspensionMax: 0.2
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > Suspension:nth-of-type(2)': {
      Height: 0,
      Strength: 0,
      Damping: 0,
      SuspensionMin: 0,
      SuspensionMax: 0,
      BrokenSuspensionMax: 0
    },
    'SuspensionSetVariants > SuspensionSet:nth-of-type(1) > GameData': {
      Price: 6200,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_kenworth_963_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 1.6,
      SubstanceFriction: 1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 4900,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  },
  wheels_superheavy_mudtires_dlc_10: {
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > WheelFriction': {
      BodyFriction: 1.6,
      BodyFrictionAsphalt: 0.6,
      SubstanceFriction: 3,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(1) > GameData': {
      Price: 7500,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > WheelFriction': {
      BodyFriction: 1.7,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.2,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(2) > GameData': {
      Price: 8100,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > WheelFriction': {
      BodyFriction: 2,
      BodyFrictionAsphalt: 0.5,
      SubstanceFriction: 3.1,
      IsIgnoreIce: 'false'
    },
    'TruckWheels > TruckTires > TruckTire:nth-of-type(3) > GameData': {
      Price: 9000,
      UnlockByExploration: 'false',
      UnlockByRank: 1
    }
  }
} satisfies IDefaults
