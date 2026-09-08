import { initMain } from '@bridge/renderer'
import type { IDir, IDirs, IFile, IFindDirsArgs, IFindFilesArgs } from '@modules/files/types'
import { inject } from '@utilities/di/container'
import { DIRS_TOKEN } from '@utilities/di/renderer/tokens'
import { BaseRendererArray } from '@utilities/json-arrays/renderer'
import type { IDLC, IRendererDlc } from './types'

/** Работа с дополнениями игры. [renderer] */
@initMain()
export class Dlc extends BaseRendererArray<IDLC, IDLC & { dir: IDir }> implements IRendererDlc {
	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: IDirs

	override convert(item: IDLC): IDLC & { dir: IDir } {
		return { ...item, dir: this.dirs.newDir(item.path) }
	}

	override save = async () => {}

	getDLC(file: IFile): string | undefined {
		return file.path.includes(this.dirs.dlc.name)
			? file.path
				.split(this.dirs.dlc.name)
				.at(1)
				?.split('\\')
				.at(1)
			: undefined
	}

	async findFiles(args: IFindFilesArgs): Promise<IFile[]> {
		return this.dirs.dlc.findFiles(args)
	}

	async findDirs(args: IFindDirsArgs): Promise<IDir[]> {
		return this.dirs.dlc.findDirs(args)
	}
}
