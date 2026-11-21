import { ErrorText } from '@modules/errors/enums'
import { createProgramError } from '@modules/errors/main'
import type { IMainDir as IDir, IMainFile as IFile } from '@modules/files/types'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, ENV_TOKEN, PATHS_TOKEN } from '@utilities/di/main/tokens'
import { execFile } from 'node:child_process'
import { join } from 'node:path'
import type { ISystemArchiver } from './types'

/**
 * Коды завершения WinRAR, которые не являются ошибкой.
 * _0_ — успех, _1_ — предупреждение, _10_ — не найдено файлов по списку.
 */
const NON_FATAL_CODES = new Set([0, 1, 10])

/**
 * Проверить, является ли код завершения ошибкой.
 * @param code Код завершения.
 * @returns `true`, если это ошибка.
 */
export function isWinRarFailure(code: unknown): boolean {
	const value = typeof code === 'string' && /^\d+$/u.test(code)
		? Number(code)
		: code

	if (value === null || value === undefined) {
		// Ошибка запуска процесса (нет файла, таймаут и т.п.) приходит без кода.
		return true
	}

	return !NON_FATAL_CODES.has(value as number)
}

/** Работа с WinRAR. */
export class WinRAR implements ISystemArchiver {
	/** Исполняемый файл WinRAR. */
	private readonly exeName = 'WinRAR.exe'

	/** Списки файлов для распаковки. */
	private readonly lists = {
		/** Список основных файлов/папок для распаковки. */
		main: 'unpack-list.lst',

		/** Список модовых файлов/папок для распаковки. */
		mods: 'unpack-mod-list.lst',

		/** Оптимизированный список основных файлов/папок для распаковки. */
		mainOptimized: 'unpack-list-optimized.lst'
	}

	/** Действия архиватора. */
	private readonly actions = {
		/** Обновление файлов в архиве. */
		update: 'f',

		/** Распаковка файлов из архива. */
		unpack: 'x',

		/** Добавление файла в архив. */
		add: 'a'
	}

	/** Флаги запуска WinRAR. */
	private readonly flags = {
		/** Не включать базовую папку. */
		excludeBase: '-ep1',

		/** Не использовать полные пути. */
		excludeAll: '-ep',

		/** Рекурсивная операция. */
		recursive: '-r',

		/** Выполнение в фоновом режиме. */
		inBackground: '-ibck',

		/** Не паниковать при ошибках. */
		noErrors: '-inul'
	}

	/**
	 * Получить аргументы, зависящие от режима отладки архиватора.
	 * @param isMod Идёт ли работа с модификацией.
	 * @returns Аргументы запуска.
	 */
	private getRunArgs(isMod = false) {
		const env = di.resolve(ENV_TOKEN)

		return env.debugArchiver
			? []
			: [
				this.flags.inBackground,
				...isMod
					? [this.flags.noErrors]
					: []
			]
	}

	async update(dir: IDir, archive: IFile) {
		await archive.chmod(0o777)

		const archiveWriteResult = await archive.canWrite()
		const dirReadResult = await dir.canRead()

		if (!archiveWriteResult.result) {
			throw createProgramError(ErrorText.writeFileError, archiveWriteResult.error, archive.path)
		} else if (!dirReadResult.result) {
			throw createProgramError(ErrorText.readDirError, dirReadResult.error, dir.path)
		}

		await this.run(
			this.actions.update,
			archive.path,
			this.inner(dir.path),
			this.getRunArgs(),
			this.flags.recursive,
			this.flags.excludeBase
		)
	}

	async unpack(archive: IFile, dir: IDir) {
		const config = di.resolve(CONFIG_TOKEN)
		const isMod = !!config.initialPath && archive.path !== config.initialPath
		const list = isMod
			? this.lists.mods
			: config.optimizeUnpack
				? this.lists.mainOptimized
				: this.lists.main

		const readResult = await archive.canRead()

		if (!readResult.result) {
			throw createProgramError(ErrorText.readFileError, readResult.error, archive.path)
		}

		await dir.make()

		const writeResult = await dir.canWrite()

		if (!writeResult.result) {
			throw createProgramError(ErrorText.writeDirError, writeResult.error, dir.path)
		}

		await this.run(
			this.actions.unpack,
			archive.path,
			`@${list}`,
			this.inner(dir.path),
			this.getRunArgs(isMod)
		)
	}

	async add(file: IFile, archive: IFile) {
		await archive.chmod(0o777)

		const readResult = await file.canRead()
		const writeResult = await archive.canWrite()

		if (!readResult.result) {
			throw createProgramError(ErrorText.readFileError, readResult.error, file.path)
		} else if (!writeResult.result) {
			throw createProgramError(ErrorText.writeFileError, writeResult.error, archive.path)
		}

		await this.run(
			this.actions.add,
			archive.path,
			file.path,
			this.getRunArgs(),
			this.flags.excludeAll
		)
	}

	/**
	 * Запустить `WinRAR`.
	 * @param args Параметры запуска.
	 */
	private async run(...args: (string | string[])[]): Promise<void> {
		const dirs = di.resolve(DIRS_TOKEN)
		const paths = di.resolve(PATHS_TOKEN)

		if (!await dirs.winrar.exists()) {
			throw createProgramError(ErrorText.dirNotFound, null, dirs.winrar.path)
		}

		const execArgs = args.flatMap(value => Array.isArray(value) ? value : [value])
		const exePath = join(dirs.winrar.path, this.exeName)

		await new Promise<void>((resolve, reject) => {
			execFile(
				exePath,
				execArgs,
				{
					cwd: paths.winrar,
					windowsHide: true,
					timeout: 10 * 60 * 1000
				},
				error => {
					if (error && isWinRarFailure((error as any).code)) {
						reject(createProgramError(ErrorText.winRarCommandError, error, execArgs.join(' ')))

						return
					}

					resolve()
				}
			)
		})
	}

	/**
	 * Сделать путь внутренним.
	 * @param path Путь.
	 * @returns Внутренний путь.
	 */
	private inner(path: string) {
		return `${path}\\`
	}
}