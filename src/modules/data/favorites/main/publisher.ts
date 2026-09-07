import { di } from '@utilities/di/container'
import { FAVORITES_TOKEN } from '@utilities/di/main/tokens'
import { publishMainArray } from '@utilities/json-arrays/main/publisher'
import type { Favorites } from './index'

/** Опубликовать {@link Favorites}. */
export function publishFavorites() {
	let instance: Favorites
	const getInstance = () => instance ??= di.resolve(FAVORITES_TOKEN)
	const className = 'Favorites'

	publishMainArray(className, getInstance)
}
