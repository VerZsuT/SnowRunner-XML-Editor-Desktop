import type {createAction} from 'templates/actions/createAction'

import type {TemplateGetter} from './TemplateGetter'

export interface XMLTemplate {
    template: TemplateGetter
    selector: string
    actions?: ReturnType<typeof createAction>[]
    exclude?: ReturnType<typeof createAction>[]
}
