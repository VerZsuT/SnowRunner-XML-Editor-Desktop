import { initMain, mainMethod } from '@bridge/renderer'
import type MainSystem from './main'

/**
 * Система.
 * _renderer process_
 */
@initMain()
class System {
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
	@mainMethod()
	userInfo!: typeof MainSystem.userInfo

	/** Открыть ссылку. */
	@mainMethod()
	openLink!: typeof MainSystem.openLink

	/** Открыть путь. */
	@mainMethod()
	openPath!: typeof MainSystem.openPath

	/** Открыть файл. */
	@mainMethod()
	openFile!: typeof MainSystem.openFile
}

/**
 * Система.
 * _renderer process_
 */
export default new System()
