import { initMain, mainMethod } from '@bridge/renderer'
import type { Archive as ArchiveMain } from './main'
import type { IRendererArchiver } from './types'

/** Работа с архивами. [renderer] */
@initMain()
export class Archive implements IRendererArchiver {
	@mainMethod()
	unpack!: ArchiveMain['unpack']

	@mainMethod()
	unpackMain!: ArchiveMain['unpackMain']

	@mainMethod()
	updateFiles!: ArchiveMain['updateFiles']
}
