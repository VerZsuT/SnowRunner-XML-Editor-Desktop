import { engineTemplate } from './engine/template'
import { gearboxTemplate } from './gearbox/template'
import { suspensionTemplate } from './suspension/template'
import { trailerTemplate } from './trailer/template'
import { truckTemplate } from './truck/template'
import { wheelsTemplate } from './wheels/template'
import { winchTemplate } from './winch/template'

import type { ITemplates } from '#types'

export const templates = {
  engine: engineTemplate,
  gearbox: gearboxTemplate,
  suspension: suspensionTemplate,
  trailer: trailerTemplate,
  truck: truckTemplate,
  wheels: wheelsTemplate,
  winch: winchTemplate
} as ITemplates

export const extra = {}
