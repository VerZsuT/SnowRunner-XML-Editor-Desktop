// @vitest-environment node
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { PORTABLE_MARKER, resolveDataLocation } from './mode'

/** Каталог установки. */
const APP_ROOT = 'C:/Program Files/SnowRunnerXMLEditor/resources/app'

/** Каталог данных пользователя. */
const USER_DATA = 'C:/Users/user/AppData/Roaming/SnowRunner XML Editor'

/** Путь к exe установленной версии. */
const EXE_PATH = 'C:/Program Files/SnowRunnerXMLEditor/SnowRunnerXMLEditor.exe'

/** Путь к exe портативной версии. */
const PORTABLE_EXE_PATH = 'D:/Games/SnowRunnerXMLEditor/SnowRunnerXMLEditor.exe'

describe('resolveDataLocation', () => {
	it('в dev режиме использует userData', () => {
		expect(resolveDataLocation({ isPackaged: false, exePath: EXE_PATH, userDataPath: USER_DATA }))
			.toEqual({ mode: 'dev', dataRoot: USER_DATA })
	})

	it('в установленной сборке использует userData', () => {
		expect(resolveDataLocation({ isPackaged: true, exePath: EXE_PATH, userDataPath: USER_DATA, exists: () => false }))
			.toEqual({ mode: 'installed', dataRoot: USER_DATA })
	})

	it('в портативной сборке использует папку data рядом с exe', () => {
		const marker = join('D:/Games/SnowRunnerXMLEditor', PORTABLE_MARKER)
		const exists = (path: string) => path === marker

		expect(resolveDataLocation({ isPackaged: true, exePath: PORTABLE_EXE_PATH, userDataPath: USER_DATA, exists }))
			.toEqual({ mode: 'portable', dataRoot: join('D:/Games/SnowRunnerXMLEditor', 'data') })
	})

	it('не хранит данные установленной версии внутри папки приложения', () => {
		const { dataRoot } = resolveDataLocation({ isPackaged: true, exePath: EXE_PATH, userDataPath: USER_DATA, exists: () => false })

		expect(dataRoot.startsWith(APP_ROOT)).toBe(false)
	})
})
