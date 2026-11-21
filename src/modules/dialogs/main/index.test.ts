import { Lang } from '@modules/data/config/enums'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, FILES_TOKEN } from '@utilities/di/main/tokens'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Dialogs } from './index'

/** Поддельный модуль `electron`. */
const electron = vi.hoisted(() => ({
	showOpenDialogSync: vi.fn(),
	showSaveDialogSync: vi.fn(),
	showMessageBox: vi.fn(),
	createFromPath: vi.fn(() => ({ isEmpty: () => false }))
}))

vi.mock('electron', () => ({
	dialog: {
		showOpenDialogSync: electron.showOpenDialogSync,
		showSaveDialogSync: electron.showSaveDialogSync,
		showMessageBox: electron.showMessageBox
	},
	nativeImage: {
		createFromPath: electron.createFromPath
	}
}))

/** Диалоги. */
let dialogs: Dialogs

beforeEach(() => {
	vi.clearAllMocks()
	vi.spyOn(console, 'error').mockImplementation(() => {})

	di.register(CONFIG_TOKEN, { lang: Lang.ru } as any)
	di.register(FILES_TOKEN, {
		icon: { path: 'C:\\icon.ico' },
		newFile: (path: string) => ({ path })
	} as any)

	dialogs = new Dialogs()
})

describe('Dialogs: системные диалоги [main]', () => {
	it('открывает файл и берёт первый результат', () => {
		electron.showOpenDialogSync.mockReturnValue(['C:\\file.epf'])

		expect(dialogs.getEPF()).toBe('C:\\file.epf')
		expect(electron.showOpenDialogSync).toHaveBeenCalledWith({
			properties: ['openFile'],
			filters: [{ name: 'Editor params file', extensions: ['epf'] }]
		})
	})

	it('возвращает массив при multiSelections', () => {
		electron.showOpenDialogSync.mockReturnValue(['C:\\a.pak', 'C:\\b.pak'])

		expect(dialogs.getPaks()).toEqual(['C:\\a.pak', 'C:\\b.pak'])
		expect(electron.showOpenDialogSync).toHaveBeenCalledWith({
			properties: ['multiSelections', 'openFile'],
			filters: [{ name: 'Package file', extensions: ['pak'] }]
		})
	})

	it('открывает папку по умолчанию', () => {
		electron.showOpenDialogSync.mockReturnValue(['C:\\dir'])

		expect(dialogs.getDir()).toBe('C:\\dir')
		expect(electron.showOpenDialogSync).toHaveBeenCalledWith({
			properties: ['openDirectory']
		})
	})

	it('возвращает несколько папок', () => {
		electron.showOpenDialogSync.mockReturnValue(['C:\\one', 'C:\\two'])

		expect(dialogs.getDirs()).toEqual(['C:\\one', 'C:\\two'])
		expect(electron.showOpenDialogSync).toHaveBeenCalledWith({
			properties: ['multiSelections', 'openDirectory']
		})
	})

	it('сохраняет файл с именем по умолчанию', () => {
		electron.showSaveDialogSync.mockReturnValue('C:\\saved.epf')

		expect(dialogs.saveEPF('saved')).toBe('C:\\saved.epf')
		expect(electron.showSaveDialogSync).toHaveBeenCalledWith({
			defaultPath: 'saved',
			filters: [{ name: 'Editor params file', extensions: ['epf'] }]
		})
	})

	it('возвращает undefined при отмене диалога', () => {
		electron.showOpenDialogSync.mockReturnValue(undefined)
		electron.showSaveDialogSync.mockReturnValue(undefined)

		expect(dialogs.getXML()).toBeUndefined()
		expect(dialogs.saveEPF('saved')).toBeUndefined()
	})

	it('передаёт неизвестное расширение как имя фильтра', () => {
		electron.showOpenDialogSync.mockReturnValue(undefined)

		dialogs.openDialog({ extention: 'unknownext' as any })

		expect(electron.showOpenDialogSync).toHaveBeenCalledWith({
			properties: ['openFile'],
			filters: [{ name: 'unknownext', extensions: ['unknownext'] }]
		})
	})

	it('getMultiEPF отдаёт файлы интерфейса IFiles', () => {
		electron.showOpenDialogSync.mockReturnValue(['C:\\a.epf', 'C:\\b.epf'])

		const files = dialogs.getMultiEPF()

		expect(files?.map(file => file.path)).toEqual(['C:\\a.epf', 'C:\\b.epf'])
	})

	it('getMultiEPF возвращает undefined при пустом выборе', () => {
		electron.showOpenDialogSync.mockReturnValue([])

		expect(dialogs.getMultiEPF()).toBeUndefined()
	})

	it('показывает предупреждение с иконкой приложения', async () => {
		electron.showMessageBox.mockResolvedValue({ response: 0 })

		await dialogs.error('text')

		expect(electron.createFromPath).toHaveBeenCalledWith('C:\\icon.ico')
		expect(electron.showMessageBox).toHaveBeenCalledWith(expect.objectContaining({
			message: 'text',
			type: 'warning',
			noLink: false,
			buttons: ['Ок']
		}))
	})

	it('не падает, если системный диалог выбросил ошибку', () => {
		const error = new Error('dialog failed')
		electron.showOpenDialogSync.mockImplementation(() => { throw error })

		expect(dialogs.getEPF()).toBeUndefined()
		expect(console.error).toHaveBeenCalledWith(error)
	})
})
