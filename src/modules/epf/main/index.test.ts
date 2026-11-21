import { Lang } from '@modules/data/config/enums'
import { File } from '@modules/files/main'
import { di } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN, CONFIG_TOKEN, DIALOGS_TOKEN, FILES_TOKEN, MESSAGES_TOKEN } from '@utilities/di/main/tokens'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Epf } from './index'

/** Временная папка теста. */
let root = ''

/** Диалоги. */
const dialogs = {
	alert: vi.fn<(params: { message: string }) => Promise<unknown>>(async () => ({ response: 0 })),
	error: vi.fn<(message: string) => Promise<unknown>>(async () => ({ response: 0 })),
	getMultiEPF: vi.fn<() => File[] | undefined>(),
	saveEPF: vi.fn<(name: string) => string | undefined>(),
	getEPF: vi.fn<() => string | undefined>()
}

/** Сообщения. */
const messages = { error: vi.fn<(message: string) => void>() }

/**
 * Записать файл с данными экспорта.
 * @param name Имя файла.
 * @param data Данные.
 * @returns Файл.
 */
async function writeEPF(name: string, data: unknown) {
	const path = join(root, name)

	await writeFile(path, JSON.stringify(data))

	return new File(path)
}

beforeEach(async () => {
	root = await mkdtemp(join(tmpdir(), 'sxmle-epf-'))
	vi.clearAllMocks()
	vi.spyOn(console, 'error').mockImplementation(() => {})

	di.register(CONFIG_TOKEN, { lang: Lang.ru } as any)
	di.register(APP_CONSTANTS_TOKEN, { NAME: 'SnowRunner XMLEditor' } as any)
	di.register(MESSAGES_TOKEN, messages as any)
	di.register(FILES_TOKEN, { newFile: (path: string) => new File(path) } as any)
	di.register(DIALOGS_TOKEN, dialogs as any)
})

afterEach(async () => {
	await rm(root, { recursive: true, force: true })
})

describe('Epf: объединение .epf файлов', () => {
	it('объединяет файлы, убирает дубли по fileName и сохраняет порядок', async () => {
		const first = await writeEPF('first.epf', [{ fileName: 'a' }, { fileName: 'b' }])
		const second = await writeEPF('second.epf', [{ fileName: 'b' }, { fileName: 'c' }])
		const target = join(root, 'joined.epf')

		dialogs.getMultiEPF.mockReturnValue([first, second])
		dialogs.saveEPF.mockReturnValue(target)

		await new Epf().join()

		expect(JSON.parse(await readFile(target, 'utf8'))).toEqual([{ fileName: 'a' }, { fileName: 'b' }, { fileName: 'c' }])
		expect(dialogs.saveEPF).toHaveBeenCalledWith('joined')
		expect(dialogs.error).not.toHaveBeenCalled()
		expect(dialogs.alert).toHaveBeenCalledTimes(1)
		expect(dialogs.alert.mock.calls[0][0]).toMatchObject({
			message: expect.stringContaining('first.epf')
		})
	})

	it('принимает объект вместо массива', async () => {
		const first = await writeEPF('first.epf', { fileName: 'single' })
		const second = await writeEPF('second.epf', [{ fileName: 'other' }])
		const target = join(root, 'joined.epf')

		dialogs.getMultiEPF.mockReturnValue([first, second])
		dialogs.saveEPF.mockReturnValue(target)

		await new Epf().join()

		expect(JSON.parse(await readFile(target, 'utf8'))).toEqual([{ fileName: 'single' }, { fileName: 'other' }])
	})

	it('пропускает нечитаемый файл и сообщает об ошибке', async () => {
		const broken = join(root, 'broken.epf')
		const valid = await writeEPF('valid.epf', [{ fileName: 'ok' }])
		const target = join(root, 'joined.epf')

		await writeFile(broken, '{ not json')
		dialogs.getMultiEPF.mockReturnValue([new File(broken), valid])
		dialogs.saveEPF.mockReturnValue(target)

		await new Epf().join()

		expect(dialogs.error).toHaveBeenCalledTimes(1)
		// Ошибка разбора JSON не порождает дополнительного уведомления.
		expect(messages.error).not.toHaveBeenCalled()
		expect(JSON.parse(await readFile(target, 'utf8'))).toEqual([{ fileName: 'ok' }])
	})

	it('ничего не делает при отмене выбора файлов', async () => {
		dialogs.getMultiEPF.mockReturnValue(undefined)

		await new Epf().join()

		expect(dialogs.saveEPF).not.toHaveBeenCalled()
		expect(dialogs.alert).not.toHaveBeenCalled()
	})

	it('не выполняет объединение для одного файла', async () => {
		const single = await writeEPF('single.epf', [{ fileName: 'a' }])

		dialogs.getMultiEPF.mockReturnValue([single])

		await new Epf().join()

		expect(dialogs.saveEPF).not.toHaveBeenCalled()
	})

	it('ничего не сохраняет при отмене сохранения', async () => {
		const first = await writeEPF('first.epf', [{ fileName: 'a' }])
		const second = await writeEPF('second.epf', [{ fileName: 'b' }])

		dialogs.getMultiEPF.mockReturnValue([first, second])
		dialogs.saveEPF.mockReturnValue(undefined)

		await new Epf().join()

		expect(dialogs.alert).not.toHaveBeenCalled()
		expect(dialogs.error).not.toHaveBeenCalled()
	})

	it('сообщает об ошибке записи', async () => {
		const first = await writeEPF('first.epf', [{ fileName: 'a' }])
		const second = await writeEPF('second.epf', [{ fileName: 'b' }])

		dialogs.getMultiEPF.mockReturnValue([first, second])
		// Путь указывает на существующую папку — запись файла невозможна.
		dialogs.saveEPF.mockReturnValue(root)

		await new Epf().join()

		expect(dialogs.error).toHaveBeenCalledTimes(1)
		// Уведомление показывает только граница обработки (диалог), конструктор ошибки молчит.
		expect(messages.error).not.toHaveBeenCalled()
		expect(dialogs.alert).not.toHaveBeenCalled()
	})
})

describe('Epf: просмотр .epf файла', () => {
	it('выводит имена файлов из экспорта', async () => {
		const file = await writeEPF('file.epf', [{ fileName: 'truck_a' }, { fileName: 42 }, { fileName: 'truck_b' }])

		dialogs.getEPF.mockReturnValue(file.path)

		await new Epf().see()

		expect(dialogs.alert).toHaveBeenCalledTimes(1)
		expect(dialogs.alert.mock.calls[0][0]).toMatchObject({
			message: expect.stringContaining('truck_a')
		})
		expect(dialogs.alert.mock.calls[0][0].message).toContain('truck_b')
		expect(dialogs.alert.mock.calls[0][0].message).not.toContain('42')
	})

	it('ничего не выводит при отмене выбора', async () => {
		dialogs.getEPF.mockReturnValue(undefined)

		await new Epf().see()

		expect(dialogs.alert).not.toHaveBeenCalled()
		expect(dialogs.error).not.toHaveBeenCalled()
	})

	it('сообщает об ошибке чтения', async () => {
		const broken = join(root, 'broken.epf')

		await writeFile(broken, '{ not json')
		dialogs.getEPF.mockReturnValue(broken)

		await new Epf().see()

		expect(dialogs.error).toHaveBeenCalledTimes(1)
		expect(messages.error).not.toHaveBeenCalled()
		expect(dialogs.alert).not.toHaveBeenCalled()
	})
})
