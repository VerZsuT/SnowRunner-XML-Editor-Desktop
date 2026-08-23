import { providePublic, publicMethod } from '@bridge/main'
import { shell } from 'electron'
import { userInfo } from 'node:os'

/**
 * Система.
 * _main process_
 */
@providePublic()
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
  @publicMethod()
  userInfo(...args: Parameters<typeof userInfo>) {
    return userInfo(...args)
  }

	/** Открыть ссылку. */
	@publicMethod()
	async openLink(...args: Parameters<typeof shell.openExternal>) {
		return shell.openExternal(...args)
	}

  /** Открыть файл. */
  @publicMethod()
  async openFile(...args: Parameters<typeof shell.openExternal>) {
    return shell.openExternal(...args)
  }

  /** Открыть путь. */
  @publicMethod()
  async openPath(...args: Parameters<typeof shell.openPath>) {
    return shell.openPath(...args)
  }
}

/**
 * Система.
 * _main process_
 */
export default new System()
