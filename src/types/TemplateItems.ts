import type {GroupGetter} from './GroupGetter'
import type {InputGetter} from './InputGetter'
import type {SelectGetter} from './SelectGetter'
import type {TemplateGetter} from './TemplateGetter'

export type TemplateItems = GroupGetter | InputGetter | SelectGetter | TemplateGetter
