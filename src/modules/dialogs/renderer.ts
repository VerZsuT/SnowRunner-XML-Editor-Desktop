import { initMain, mainMethod } from '@bridge/renderer'
import type { Dialogs as DialogsMain } from './main'
import type { IRendererDialogs } from './types'

/** Вывод системных диалогов. [renderer] */
@initMain()
export class Dialogs implements IRendererDialogs {
	@mainMethod()
	getEPF!: DialogsMain['getEPF']

	@mainMethod()
	saveEPF!: DialogsMain['saveEPF']

	@mainMethod()
	getInitial!: DialogsMain['getInitial']

	@mainMethod()
	getDir!: DialogsMain['getDir']

	@mainMethod()
	getDirs!: DialogsMain['getDirs']

	@mainMethod()
	getPaks!: DialogsMain['getPaks']

	@mainMethod()
	getXML!: DialogsMain['getXML']
}
