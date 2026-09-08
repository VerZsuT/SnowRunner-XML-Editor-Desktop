import type { IQuitParams } from './types'

/** Параметры закрытия программы. */
export class QuitParams implements IQuitParams {
	/** Сохранять JSON файлы. */
	saveJSONs = true
}
