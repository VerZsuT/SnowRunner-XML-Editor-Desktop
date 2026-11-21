import { Dir } from '@modules/files/renderer'
import { di } from '@utilities/di/container'
import { useListStore } from '../../store/list'
import { CONFIG_TOKEN, DIRS_TOKEN, DLC_TOKEN, FILES_TOKEN, FS_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import { join } from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Category } from '../../enums'
import { ItemsUtils } from './items'

/** Корень поддельной игры. */
const GAME_DIR = 'C:\\game'

/** Поддельная папка DLC. */
function fakeDlc(name: string) {
	return {
		name,
		dir: {
			dir: (folder: string) => ({
				dir: (sub: string) => ({ path: join(GAME_DIR, '_dlc', name, folder, sub) })
			})
		}
	}
}

describe('ItemsUtils', () => {
	beforeEach(() => {
		di.register(FILES_TOKEN, { isFile: () => false } as any)
		di.register(DIRS_TOKEN, {
			newDir: (path: string) => ({ asFile: () => ({ path }) })
		} as any)
	})

	it('getDLC собирает файлы всех DLC одним scanMany и фильтрует по типу', async () => {
		const dlcs = [fakeDlc('dlc_1'), fakeDlc('dlc_2')]
		const scanMany = vi.fn(async (paths: string[]) => ({
			ok: true as const,
			value: paths.map((path, index) => ({
				path: join(path, `${index}.xml`),
				name: `${index}.xml`,
				kind: 'file' as const
			}))
		}))
		const readMany = vi.fn(async (paths: string[]) => ({
			ok: true as const,
			value: paths.map((_, index) => index === 1 ? '<Truck Type="Trailer"/>' : '<Truck/>')
		}))

		di.register(DLC_TOKEN, dlcs as any)
		di.register(FS_TOKEN, { scanMany, readMany } as any)

		const trucks = await new ItemsUtils().getDLC(Category.trucks)

		expect(scanMany).toHaveBeenCalledTimes(1)
		expect(scanMany.mock.calls[0][0]).toEqual([
			join(GAME_DIR, '_dlc', 'dlc_1', 'classes', 'trucks'),
			join(GAME_DIR, '_dlc', 'dlc_2', 'classes', 'trucks')
		])
		expect(trucks.map(file => file.path)).toEqual([join(GAME_DIR, '_dlc', 'dlc_1', 'classes', 'trucks', '0.xml')])
	})

	it('getDLC ищет прицепы в отдельной папке', async () => {
		const scanMany = vi.fn(async (paths: string[]) => {
			void paths

			return { ok: true as const, value: [] }
		})

		di.register(DLC_TOKEN, [fakeDlc('dlc_1')] as any)
		di.register(FS_TOKEN, { scanMany, readMany: vi.fn() } as any)

		await new ItemsUtils().getDLC(Category.trailers)

		expect(scanMany.mock.calls[0][0]).toEqual([
			join(GAME_DIR, '_dlc', 'dlc_1', 'classes', 'trucks/trailers')
		])
	})

	it('полная загрузка страницы списков делает 6 вызовов Fs независимо от числа DLC и модов', async () => {
		const scan = vi.fn(async () => ({
			ok: true as const,
			value: [{
				path: join(GAME_DIR, 'classes', 'trucks', 'main.xml'),
				name: 'main.xml',
				kind: 'file' as const
			}]
		}))
		const scanMany = vi.fn(async (paths: string[]) => ({
			ok: true as const,
			value: paths.map(path => ({
				path: join(path, 'truck.xml'),
				name: 'truck.xml',
				kind: 'file' as const
			}))
		}))
		const readMany = vi.fn(async (paths: string[]) => ({
			ok: true as const,
			value: paths.map(() => '<Truck/>')
		}))

		di.register(CONFIG_TOKEN, { useMods: true } as any)
		di.register(DIRS_TOKEN, {
			newDir: (path: string) => new Dir(path),
			classes: { dir: (sub: string) => new Dir(join(GAME_DIR, 'classes', sub)) },
			modsTemp: { dir: (...parts: string[]) => new Dir(join(GAME_DIR, 'modsTemp', ...parts)) }
		} as any)
		di.register(FS_TOKEN, { scan, scanMany, readMany } as any)

		async function load(dlcCount: number, modCount: number) {
			di.register(DLC_TOKEN, Array.from({ length: dlcCount }, (_, index) => fakeDlc(`dlc_${index}`)) as any)
			di.register(MODS_TOKEN, Array.from({ length: modCount }, (_, index) => ({ name: `mod_${index}` })) as any)
			useListStore.getState().clearFiles()
			scan.mockClear()
			scanMany.mockClear()
			readMany.mockClear()

			const utils = new ItemsUtils()

			await Promise.all([
				utils.getMain(Category.trucks),
				utils.getDLC(Category.trucks),
				utils.getMods(Category.trucks)
			])

			return scan.mock.calls.length + scanMany.mock.calls.length + readMany.mock.calls.length
		}

		expect(await load(2, 1)).toBe(6)
		expect(useListStore.getState().itemsCache.size).toBe(4)
		expect(await load(5, 3)).toBe(6)
		expect(useListStore.getState().itemsCache.size).toBe(9)
	})
})
