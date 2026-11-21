import { Dir, File } from '@modules/files/renderer'
import type { IFile } from '@modules/files/types'
import { InitialSelect } from '@renderer/pages/general/setup/initial-select'
import { Lang } from '@modules/data/config/enums'
import { CONFIG_TOKEN, DIALOGS_TOKEN, DIRS_TOKEN, FILES_TOKEN, MESSAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { di } from '@utilities/di/container'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/** Временная папка текущего теста. */
let tempDir = ''

/** Сообщения, показанные программой. */
let error = vi.fn<(message: unknown) => void>()

/** Выбранный файл. */
let onChange = vi.fn<(file?: IFile) => void>()

/**
 * Подготовить зависимости компонента.
 * @param initial Путь, который вернёт диалог выбора файла.
 * @param dir Путь, который вернёт диалог выбора папки.
 */
function prepare(initial: string | undefined, dir: string | undefined) {
	error = vi.fn<(message: unknown) => void>()
	onChange = vi.fn<(file?: IFile) => void>()

	di.register(CONFIG_TOKEN, { lang: Lang.ru } as any)
	di.register(FILES_TOKEN, { newFile: (path: string) => new File(path) } as any)
	di.register(DIRS_TOKEN, { newDir: (path: string) => new Dir(path) } as any)
	di.register(MESSAGES_TOKEN, { error } as any)
	di.register(DIALOGS_TOKEN, {
		getInitial: () => initial,
		getDir: () => dir
	} as any)
}

/** Нажать кнопку выбора файла. */
async function clickFile() {
	fireEvent.click(screen.getByRole('button', { name: /initial\.pak/u }))
}

/** Нажать кнопку выбора папки игры. */
async function clickFolder() {
	fireEvent.click(screen.getByRole('button', { name: /папк|folder|Spielordner|游戏/u }))
}

beforeEach(() => {
	tempDir = mkdtempSync(join(tmpdir(), 'initial-select-'))
})

afterEach(() => {
	rmSync(tempDir, { force: true, recursive: true })
})

describe('InitialSelect: выбор initial.pak', () => {
	it('принимает существующий initial.pak', async () => {
		const path = join(tempDir, 'initial.pak')

		writeFileSync(path, '')
		prepare(path, undefined)
		render(<InitialSelect onChange={onChange} />)
		await clickFile()

		await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
		expect((onChange.mock.calls[0][0] as IFile).path).toBe(path)
		expect(error).not.toHaveBeenCalled()
	})

	it('отклоняет файл с другим именем', async () => {
		const path = join(tempDir, 'other.pak')

		writeFileSync(path, '')
		prepare(path, undefined)
		render(<InitialSelect onChange={onChange} />)
		await clickFile()

		await waitFor(() => expect(error).toHaveBeenCalledTimes(1))
		expect(onChange).not.toHaveBeenCalled()
	})

	it('отклоняет несуществующий initial.pak', async () => {
		prepare(join(tempDir, 'initial.pak'), undefined)
		render(<InitialSelect onChange={onChange} />)
		await clickFile()

		await waitFor(() => expect(error).toHaveBeenCalledTimes(1))
		expect(onChange).not.toHaveBeenCalled()
	})

	it('находит initial.pak внутри папки игры', async () => {
		const parts = ['steamapps', 'common', 'SnowRunner', 'en_us', 'preload', 'paks', 'client']
		const folder = join(tempDir, ...parts)
		const path = join(folder, 'initial.pak')

		mkdirSync(folder, { recursive: true })
		writeFileSync(path, '')
		prepare(undefined, tempDir)
		render(<InitialSelect onChange={onChange} />)
		await clickFolder()

		await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1))
		expect((onChange.mock.calls[0][0] as IFile).path).toBe(path)
		expect(error).not.toHaveBeenCalled()
	})

	it('сообщает об ошибке, если в папке нет initial.pak', async () => {
		prepare(undefined, tempDir)
		render(<InitialSelect onChange={onChange} />)
		await clickFolder()

		await waitFor(() => expect(error).toHaveBeenCalledTimes(1))
		expect(onChange).not.toHaveBeenCalled()
	})

	it('сообщает об ошибке при отмене выбора папки', async () => {
		prepare(undefined, undefined)
		render(<InitialSelect onChange={onChange} />)
		await clickFolder()

		await waitFor(() => expect(error).toHaveBeenCalledTimes(1))
		expect(onChange).not.toHaveBeenCalled()
	})
})
