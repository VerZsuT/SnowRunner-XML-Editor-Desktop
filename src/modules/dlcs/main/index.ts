import type { IDir, IDirs, IFile, IFindDirsArgs, IFindFilesArgs } from '@modules/files/types'
import { makeReactive } from '@utilities/bridge/main'
import { inject } from '@utilities/di/container'
import { DIRS_TOKEN } from '@utilities/di/main/tokens'
import { BaseArray } from '@utilities/json-arrays/base'
import type { IDLC, IMainDlc } from '../types'

/** Работа с дополнениями игры. [main] */
export class Dlc extends BaseArray<IDLC, IDLC & { dir: IDir }> implements IMainDlc {
	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: IDirs

	constructor() {
		super()
		makeReactive(this, 'DLCs', 'arr')
	}

	override convert(item: IDLC): IDLC & { dir: IDir } {
		return { ...item, dir: this.dirs.newDir(item.path) }
	}

	async init() {
		const dlcs: IDLC[] = []

		for (const entry of await this.dirs.dlc.read()) {
			if (await entry.isFile()) {
				continue
			}

			dlcs.push({ name: entry.asDir().name, path: entry.path })
		}

		this.set(dlcs)
	}

	async reset() {
		this.set(this.default)
	}

	async findFiles(args: IFindFilesArgs): Promise<IFile[]> {
		return this.dirs.dlc.findFiles(args)
	}

	async findDirs(args: IFindDirsArgs): Promise<IDir[]> {
		return this.dirs.dlc.findDirs(args)
	}
}
