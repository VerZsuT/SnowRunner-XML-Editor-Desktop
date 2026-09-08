import { initMain, mainMethod } from '@bridge/renderer'
import type { InitialBackup as BackupMain } from './main'
import type { IRendererInitialBackup } from './types'

/** Работа с бэкапом initial.pak. [renderer] */
@initMain()
export class InitialBackup implements IRendererInitialBackup {
	@mainMethod()
	save!: BackupMain['save']

	@mainMethod()
	recoverFromIt!: BackupMain['recoverFromIt']
}
