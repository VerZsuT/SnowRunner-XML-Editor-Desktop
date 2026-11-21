import type { VehicleFile } from '@renderer/api/bindings'
import { registerConfig } from '@renderer/config'
import { ListsPage } from '@renderer/pages/lists'
import { filterVehicles, sortVehicles, vehicleSource } from '@renderer/pages/lists/utilities'
import { App as AntApp } from 'antd'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** Файл автомобиля. */
function file(
	name: string,
	options: { dlc?: string; modName?: string; truckType?: string } = {}
): VehicleFile {
	return {
		name,
		path: `${name}.xml`,
		archiveName: `[media]\\classes\\trucks\\${name}.xml`,
		truckType: options.truckType ?? null,
		dlc: options.dlc ?? null,
		modName: options.modName ?? null
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

		expect(onOpen).toHaveBeenCalledWith('ank_mk38', 'truck')
	})

	it('переключает избранное файла', async () => {
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

		await userEvent.click(await screen.findByRole('button', { name: /star/ }))

		expect(toggle).toHaveBeenCalledWith('ank_mk38')
	})

	it('показывает только избранное', async () => {
		render(
			<AntApp>
				<ListsPage
					lists={async () => ({ favorites: ['kenworth_963'], edited: [] })}
					load={async () => [file('ank_mk38'), file('kenworth_963')]}
					onOpen={() => {}}
				/>
			</AntApp>
		)

		expect(await screen.findByText('ANK MK38')).toBeInTheDocument()

		await userEvent.click(screen.getByText('Все источники'))
		await userEvent.click(await screen.findByText('Избранное'))

		expect(screen.queryByText('ANK MK38')).not.toBeInTheDocument()
		expect(screen.getByText('KENWORTH 963')).toBeInTheDocument()
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

		await userEvent.click(screen.getByText('Прицепы'))

		expect(await screen.findByText('SCOUT TRAILER FLATBED 1')).toBeInTheDocument()
		expect(load).toHaveBeenLastCalledWith('trailers')
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
