import type { EditedFile } from './bindings'
import { commands } from './bindings'
import { call } from './invoke'

/** Пользовательские списки файлов. */
export interface UserLists {
	/** Имена избранных файлов. */
	favorites: string[]

	/** Имена изменённых файлов. */
	edited: string[]
}

/** Избранные файлы. */
export async function loadFavorites(): Promise<string[]> {
	return commands.listFavorites()
}

/** Переключает избранное; возвращает новое состояние файла. */
export async function toggleFavorite(name: string): Promise<boolean> {
	return call(commands.toggleFavorite(name))
}

/** Изменённые файлы. */
export async function loadEdited(): Promise<EditedFile[]> {
	return commands.listEdited()
}

/** Снимает пометку изменённого файла. */
export async function unmarkEdited(name: string): Promise<boolean> {
	return call(commands.unmarkEdited(name))
}

/** Загружает избранное и изменённые файлы одним запросом. */
export async function loadUserLists(): Promise<UserLists> {
	const [favorites, edited] = await Promise.all([loadFavorites(), loadEdited()])

	return { favorites, edited: edited.map(item => item.name) }
}
