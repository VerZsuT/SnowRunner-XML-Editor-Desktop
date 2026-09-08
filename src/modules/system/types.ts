import type { shell } from 'electron'
import type { userInfo } from 'node:os'
import type { Lang } from '../data/config/enums'

/** Система. [main] */
export interface IMainSystem extends IPublicSystem {
	/**
	 * Получить язык пользователя.
	 * @returns Язык пользователя.
	 */
	getUserLang(): Lang | undefined
}

/** Система. [public] */
export interface IPublicSystem {
	/**
	 * Returns information about the currently effective user. On POSIX platforms,
	 * this is typically a subset of the password file. The returned object includes
	 * the `username`, `uid`, `gid`, `shell`, and `homedir`. On Windows, the `uid` and `gid` fields are `-1`, and `shell` is `null`.
	 *
	 * The value of `homedir` returned by `os.userInfo()` is provided by the operating
	 * system. This differs from the result of `os.homedir()`, which queries
	 * environment variables for the home directory before falling back to the
	 * operating system response.
	 *
	 * Throws a [`SystemError`](https://nodejs.org/docs/latest-v22.x/api/errors.html#class-systemerror) if a user has no `username` or `homedir`.
	 */
	userInfo(...args: Parameters<typeof userInfo>): ReturnType<typeof userInfo>

	/** Открыть ссылку. */
	openLink: typeof shell.openExternal

	/** Открыть файл. */
	openFile: typeof shell.openExternal

	/** Открыть путь. */
	openPath: typeof shell.openPath
}

/** Система. [renderer] */
export type IRendererSystem = IPublicSystem
