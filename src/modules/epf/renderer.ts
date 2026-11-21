import { initMain, mainMethod } from '@bridge/renderer'
import type { Epf as EPFMain } from './main'
import type { IRendererEpf } from './types'

/** Работа с файлами .epf. [renderer]*/
@initMain()
export class Epf implements IRendererEpf {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'Epf'
	@mainMethod()
	join!: EPFMain['join']

	@mainMethod()
	see!: EPFMain['see']
}
