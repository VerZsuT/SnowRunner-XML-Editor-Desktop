import { initMain, mainObjectField } from '@bridge/renderer'
import type { IPaths, IRendererPathsManager } from './types'

export type * from './types'

/** Пути, используемые в программе. [renderer] */
@initMain()
export class Paths implements IRendererPathsManager {
	@mainObjectField()
	readonly object!: IPaths

	get() {
		return Object.freeze(this.object)
	}
}
