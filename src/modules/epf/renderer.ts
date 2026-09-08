import { initMain, mainMethod } from '@bridge/renderer'
import type { Epf as EPFMain } from './main'
import type { IRendererEpf } from './types'

/** Работа с файлами .epf. [renderer]*/
@initMain()
export class Epf implements IRendererEpf {
	@mainMethod()
	join!: EPFMain['join']

	@mainMethod()
	see!: EPFMain['see']
}
