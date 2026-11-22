import type { VehicleFile } from '@/api/bindings'
import { registerConfig } from '@/config'
import { ListsPage } from '@/pages/lists'
import type { VehicleActions } from '@/pages/lists/actions'
import { filterVehicles, sortVehicles, vehicleSource } from '@/pages/lists/utilities'
import { App as AntApp } from 'antd'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** Файл автомобиля. */
function file(
	name: string,
	options: { dlc?: string; modName?: string; truckType?: string; uiName?: string } = {}
): VehicleFile {
	return {
		name,
		path: `${name}.xml`,
		archiveName: `[media]\\classes\\trucks\\${name}.xml`,
		truckType: options.truckType ?? null,
		dlc: options.dlc ?? null,
		modName: options.modName ?? null,
		uiName: options.uiName ?? null
	}
}

/** Действия контекстного меню с подставными ответами. */
function actions(overrides: Partial<VehicleActions> = {}): VehicleActions {
	return {
		export: vi.fn(async () => 3),
		import: vi.fn(async () => 2),
		reset: vi.fn(async () => {}),
		...overrides
	}
}

describe('ListsPage', () => {
	beforeEach(() => {
		registerConfig()
	})

	it('показывает файлы и открывает трак', async () => {
		const onOpen = vi.fn()

		render(
			<AntApp>
				<ListsPage
					load={async () => [file('ank_mk38', { truckType: 'OFFROAD' })]}
					onOpen={onOpen}
				/>
			</AntApp>
		)

		await userEvent.click(await screen.findByText('ANK MK38'))

		expect(onOpen).toHaveBeenCalledWith('ank_mk38', 'truck', null)
	})

	it('переключает избранное из контекстного меню', async () => {
		const toggle = vi.fn(async () => true)

		render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: [], edited: [] })}
					load={async () => [file('ank_mk38')]}
					toggle={toggle}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		fireEvent.contextMenu(await screen.findByText('ANK MK38'))
		await userEvent.click(await screen.findByText('Добавить в избранное'))

		expect(toggle).toHaveBeenCalledWith('ank_mk38')
	})

	it('показывает игровой перевод названия', async () => {
		render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: [], edited: [] })}
					texts={async () => ({ main: { UI_NAME: 'Разведчик' }, mods: {} })}
					load={async () => [file('ank_mk38', { uiName: 'UI_NAME' })]}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		expect(await screen.findByText('Разведчик')).toBeInTheDocument()
		expect(screen.queryByText('ANK MK38')).not.toBeInTheDocument()
	})

	it('показывает только избранное без повторной загрузки', async () => {
		const load = vi.fn(async () => [file('ank_mk38'), file('kenworth_963')])

		render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: ['kenworth_963'], edited: [] })}
					load={load}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		expect(await screen.findByText('ANK MK38')).toBeInTheDocument()

		await userEvent.click(screen.getByText('Все источники'))
		await userEvent.click(await screen.findByText('Избранное'))

		expect(screen.queryByText('ANK MK38')).not.toBeInTheDocument()
		expect(screen.getByText('KENWORTH 963')).toBeInTheDocument()
		expect(load).toHaveBeenCalledTimes(1)
	})

	it('переключает категорию на прицепы', async () => {
		const load = vi.fn(async (category: 'trucks' | 'trailers') => [
			category === 'trailers' ? file('scout_trailer_flatbed_1') : file('ank_mk38')
		])

		render(
			<AntApp>
				<ListsPage load={load} onOpen={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('ANK MK38')).toBeInTheDocument()

		await userEvent.click(screen.getByText('Автомобили'))
		await userEvent.click(await screen.findByText('Прицепы'))

		expect(await screen.findByText('SCOUT TRAILER FLATBED 1')).toBeInTheDocument()
		expect(load).toHaveBeenLastCalledWith('trailers')
	})

	it('переключает карточки и список', async () => {
		const { container } = render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: [], edited: [] })}
					load={async () => [file('ank_mk38', { truckType: 'OFFROAD' })]}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		expect(await screen.findByText('ANK MK38')).toBeInTheDocument()
		expect(container.querySelector('.lists-cards')).not.toBeNull()

		await userEvent.click(screen.getByRole('button', { name: 'mode' }))

		expect(container.querySelector('.lists-rows')).not.toBeNull()
		expect(container.querySelector('.lists-cards')).toBeNull()
	})

	it('сворачивает панель фильтров', async () => {
		const { container } = render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: [], edited: [] })}
					load={async () => [file('ank_mk38')]}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		expect(await screen.findByText('ANK MK38')).toBeInTheDocument()

		const reveal = container.querySelector('.lists-filters-reveal')

		await userEvent.click(screen.getByRole('button', { name: 'filters' }))

		expect(reveal).toHaveAttribute('aria-hidden', 'true')

		await userEvent.click(screen.getByRole('button', { name: 'filters' }))

		expect(reveal).toHaveAttribute('aria-hidden', 'false')
		expect(screen.getByPlaceholderText('Поиск по имени')).toBeInTheDocument()
	})

	it('открывает управление модами из списка модов', async () => {
		const mods = {
			list: vi.fn(async () => []),
			find: vi.fn(async () => []),
			add: vi.fn(async () => []),
			remove: vi.fn(async () => []),
			sync: vi.fn(async () => [])
		}

		render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: [], edited: [] })}
					load={async () => [file('mod_truck', { modName: 'my_mod' })]}
					mods={mods}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		expect(await screen.findByText('MOD TRUCK')).toBeInTheDocument()

		await userEvent.click(screen.getByText('Все источники'))
		await userEvent.click(await screen.findByText('Моды'))
		await userEvent.click(await screen.findByRole('button', { name: 'Изменить' }))

		expect(await screen.findByText('Моды не добавлены')).toBeInTheDocument()
		expect(mods.list).toHaveBeenCalledTimes(1)
	})

	it('добавляет выбранный мод из найденных', async () => {
		const candidate = { name: 'found_mod', path: 'D:/mods/found_mod.pak' }
		const mods = {
			list: vi.fn(async () => []),
			find: vi.fn(async () => [candidate]),
			add: vi.fn(async () => [{
				fileName: 'found_mod.pak',
				name: 'found_mod',
				path: candidate.path,
				size: 1
			}]),
			remove: vi.fn(async () => []),
			sync: vi.fn(async () => [])
		}

		render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: [], edited: [] })}
					load={async () => [file('mod_truck', { modName: 'my_mod' })]}
					mods={mods}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		expect(await screen.findByText('MOD TRUCK')).toBeInTheDocument()

		await userEvent.click(screen.getByText('Все источники'))
		await userEvent.click(await screen.findByText('Моды'))
		await userEvent.click(await screen.findByRole('button', { name: 'Изменить' }))

		await userEvent.click(await screen.findByText('found_mod'))
		await userEvent.click(screen.getByRole('button', { name: 'Добавить выбранные' }))

		await waitFor(() => expect(mods.add).toHaveBeenCalledWith(candidate.path))
	})

	it('показывает заглушку до загрузки файлов', async () => {
		let resolve: (files: VehicleFile[]) => void = () => {}
		const load = () => new Promise<VehicleFile[]>(resolveFiles => {
			resolve = resolveFiles
		})
		const { container } = render(
			<AntApp>
				<ListsPage load={load} onOpen={() => {}} />
			</AntApp>
		)

		expect(container.querySelectorAll('.lists-skeleton-card')).toHaveLength(9)

		await act(async () => {
			resolve([file('ank_mk38')])
		})

		expect(await screen.findByText('ANK MK38')).toBeInTheDocument()
		expect(container.querySelector('.lists-skeleton-card')).toBeNull()
	})

	it('переиспользует загруженные файлы при повторном открытии', async () => {
		const load = vi.fn(async () => [file('ank_mk38')])
		const first = render(
			<AntApp>
				<ListsPage load={load} onOpen={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('ANK MK38')).toBeInTheDocument()
		expect(load).toHaveBeenCalledTimes(1)

		first.unmount()

		render(
			<AntApp>
				<ListsPage load={load} onOpen={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('ANK MK38')).toBeInTheDocument()
		expect(load).toHaveBeenCalledTimes(1)
	})

	it('подсвечивает совпадение поиска', async () => {
		const { container } = render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: [], edited: [] })}
					load={async () => [file('ank_mk38')]}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		expect(await screen.findByText('ANK MK38')).toBeInTheDocument()

		await userEvent.type(screen.getByPlaceholderText('Поиск по имени'), 'mk3')

		expect(container.querySelector('.lists-match')?.textContent).toBe('MK3')
	})

	it('экспортирует файл из контекстного меню', async () => {
		const fake = actions()

		render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: [], edited: [] })}
					load={async () => [file('ank_mk38')]}
					actions={fake}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		fireEvent.contextMenu(await screen.findByText('ANK MK38'))
		await userEvent.click(await screen.findByText('Экспорт'))

		expect(fake.export).toHaveBeenCalledWith({ name: 'ank_mk38', kind: 'truck', modName: null })
		expect(await screen.findByText('Экспортировано атрибутов: 3')).toBeInTheDocument()
	})

	it('сбрасывает файл после подтверждения', async () => {
		const fake = actions()
		const unmark = vi.fn(async () => true)

		render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: [], edited: ['ank_mk38'] })}
					load={async () => [file('ank_mk38')]}
					actions={fake}
					unmark={unmark}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		fireEvent.contextMenu(await screen.findByText('ANK MK38'))
		await userEvent.click(await screen.findByText('Сбросить'))

		const dialog = await screen.findByRole('dialog')

		await userEvent.click(dialog.querySelector('.ant-btn-dangerous') as HTMLElement)

		expect(fake.reset).toHaveBeenCalledWith({ name: 'ank_mk38', kind: 'truck', modName: null })
		expect(unmark).toHaveBeenCalledWith('ank_mk38')
	})
})

describe('фильтры списка', () => {
	const files = [
		file('ank_mk38', { truckType: 'OFFROAD' }),
		file('kenworth_963', { dlc: 'dlc_10', truckType: 'HEAVY' }),
		file('mod_truck', { modName: 'my_mod' })
	]

	it('определяет источник файла', () => {
		expect(files.map(vehicleSource)).toEqual(['main', 'dlc', 'mods'])
	})

	it('фильтрует по источнику, классу и имени', () => {
		expect(filterVehicles(files, { source: 'dlc', truckType: '', search: '' })).toEqual([files[1]])
		expect(filterVehicles(files, { source: 'all', truckType: 'OFFROAD', search: '' })).toEqual([files[0]])
		expect(filterVehicles(files, { source: 'all', truckType: '', search: 'ANk' })).toEqual([files[0]])
	})

	it('фильтрует по избранному и изменённым', () => {
		expect(filterVehicles(files, {
			source: 'favorites',
			truckType: '',
			search: '',
			favorites: new Set(['mod_truck'])
		})).toEqual([files[2]])
		expect(filterVehicles(files, {
			source: 'edited',
			truckType: '',
			search: '',
			edited: new Set(['ank_mk38'])
		})).toEqual([files[0]])
	})

	it('сортирует по источнику и имени', () => {
		expect(sortVehicles([files[2], files[1], files[0]]).map(item => item.name))
			.toEqual(['ank_mk38', 'kenworth_963', 'mod_truck'])
	})
})
