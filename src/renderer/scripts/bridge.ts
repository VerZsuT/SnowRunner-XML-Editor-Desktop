import { Bridge } from 'emr-bridge/renderer'

import type { MPC } from '#g/types'

/** Свойства и функции, доступные из Main процесса */
const bridge = Bridge.as<MPC>()

export default bridge
