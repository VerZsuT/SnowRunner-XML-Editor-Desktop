import { initMain, mainMethod } from '@bridge/renderer'
import type { System as SystemMain } from './main'
import type { IRendererSystem } from './types'

/** Система. [renderer] */
@initMain()
export class System implements IRendererSystem {
	@mainMethod()
	userInfo!: SystemMain['userInfo']

	@mainMethod()
	openLink!: SystemMain['openLink']

	@mainMethod()
	openPath!: SystemMain['openPath']

	@mainMethod()
	openFile!: SystemMain['openFile']
}
