import { di } from '@utilities/di/container'
import { EDITED_TOKEN } from '@utilities/di/main/tokens'
import { publishMainArray } from '@utilities/json-arrays/main/publisher'
import type { IMainEdited } from '../types'
import type { Edited } from './index'

/** Опубликовать {@link Edited}. */
export function publishEdited() {
	let instance: IMainEdited
	const getInstance = () => instance ??= di.resolve(EDITED_TOKEN)
	const className = 'Edited'

	publishMainArray(className, getInstance)
}
