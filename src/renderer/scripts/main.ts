import { Main } from 'emr-bridge/preload'

import type { MPC } from '#g/types'

// Только для preload процесса

/** Свойства и функции, доступные из Main процесса */
const main = Main.as<MPC>()

export default main
