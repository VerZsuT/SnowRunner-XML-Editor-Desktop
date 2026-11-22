import { AppstoreOutlined, FilterOutlined, MenuOutlined } from '@ant-design/icons'
import { LOCALES } from '@/utilities/localization'
import { unpackInitial } from '@/api/archive'
import type { GameTexts, VehicleFile } from '@/api/bindings'
import type { UserLists } from '@/api/lists'
import { loadUserLists, toggleFavorite as toggleFavoriteFile, unmarkEdited } from '@/api/lists'
import { loadConfig, saveConfig } from '@/api/settings'
import { loadGameTexts, translate } from '@/api/texts'
import { applyConfig, fromConfigDto, useConfig } from '@/config'
import type { VehicleCategory } from '@/api/vehicles'
import { listVehicles } from '@/api/vehicles'
import { Header } from '@/components/header'
import { open } from '@tauri-apps/plugin-dialog'
import { formatString, prettyString } from '@/utilities/strings'
import { App as AntApp, Button, Empty, Input, Select, Tooltip } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import type { VehicleActions, VehicleTarget } from './actions'
import { vehicleActions } from './actions'
import { cachedVehicles, invalidateVehicles, loadVehiclesCached } from './catalog'
import type { ModsClient } from './components/mods-modal'
import { ModsModal } from './components/mods-modal'
import { ListsSkeleton } from './components/skeleton'
import type { ListMode } from './components/vehicle-item'
import { VehicleItem } from './components/vehicle-item'
import type { VehicleSource } from './utilities'
import { filterVehicles, sortVehicles } from './utilities'
import './lists.scss'

/** Параметры страницы списков. */
export interface ListsPageProps {
	/** Открыть редактор автомобиля; `modName` задаёт мод источника. */
	onOpen(name: string, kind: 'truck' | 'trailer', modName: string | null): void

	/** Загрузчик списка: подменяется в тестах. */
	load?(category: VehicleCategory): Promise<VehicleFile[]>

	/** Загрузчик избранного и изменённых файлов: подменяется в тестах. */
	lists?(): Promise<UserLists>

	/** Переключатель избранного: подменяется в тестах. */
	toggle?(name: string): Promise<boolean>

	/** Снятие метки изменённого файла: подменяется в тестах. */
	unmark?(name: string): Promise<boolean>

	/** Действия контекстного меню: подменяются в тестах. */
	actions?: VehicleActions

	/** Загрузчик игровых переводов: подменяется в тестах. */
	texts?(): Promise<GameTexts>

	/** Экран показан: при возврате из редактора обновляются только пользовательские списки. */
	active?: boolean

	/** Клиент управления модами: подменяется в тестах. */
	mods?: ModsClient
}

/** Страница списков траков и прицепов. */
export function ListsPage({
	onOpen,
	load = listVehicles,
	lists = loadUserLists,
	toggle = toggleFavoriteFile,
	unmark = unmarkEdited,
	actions = vehicleActions,
	texts: loadTexts = loadGameTexts,
	active = true,
	mods
}: ListsPageProps) {
	const { message, modal } = AntApp.useApp()
	const ui = useConfig()
	// Тексты читаются из состояния: смена языка видна без перезагрузки окна.
	const texts = LOCALES[ui.lang].lists
	const setupTexts = LOCALES[ui.lang].setup
	const [category, setCategory] = useState<VehicleCategory>('trucks')
	const [source, setSource] = useState<VehicleSource>('all')
	const [truckType, setTruckType] = useState('')
	const [search, setSearch] = useState('')
	const [mode, setMode] = useState<ListMode>('cards')
	const [filtersOpen, setFiltersOpen] = useState(true)
	const [modsOpen, setModsOpen] = useState(false)
	const [files, setFiles] = useState<VehicleFile[] | null>(() => {
		const cached = cachedVehicles(load, 'trucks')

		return cached ? sortVehicles(cached) : null
	})
	const [error, setError] = useState<string | null>(null)
	const [reload, setReload] = useState(0)
	const [busy, setBusy] = useState(false)
	const [userLists, setUserLists] = useState<UserLists>({ favorites: [], edited: [] })
	const [gameTexts, setGameTexts] = useState<GameTexts | null>(null)

	useEffect(() => {
		let cancelled = false

		void (async () => {
			try {
				const value = await loadTexts()

				if (!cancelled) {
					setGameTexts(value)
				}
			} catch {
				// Переводы не обязательны: без них остаются ключи и имена файлов.
			}
		})()

		return () => {
			cancelled = true
		}
	}, [loadTexts])

	useEffect(() => {
		if (!active) {
			return
		}

		let cancelled = false

		void lists().then(
			value => {
				if (!cancelled) {
					setUserLists(value)
				}
			},
			() => {}
		)

		return () => {
			cancelled = true
		}
	}, [active, lists, reload])

	useEffect(() => {
		// Готовый кэш уже показан обработчиком смены категории или начальным состоянием.
		if (cachedVehicles(load, category)) {
			return
		}

		let cancelled = false

		void loadVehiclesCached(load, category).then(
			value => {
				if (!cancelled) {
					setFiles(sortVehicles(value))
				}
			},
			reason => {
				if (!cancelled) {
					setFiles([])
					setError(toMessage(reason))
				}
			}
		)

		return () => {
			cancelled = true
		}
	}, [category, load, reload])

	const favorites = useMemo(() => new Set(userLists.favorites), [userLists.favorites])
	const edited = useMemo(() => new Set(userLists.edited), [userLists.edited])
	const visible = useMemo(
		() => filterVehicles(files ?? [], { source, truckType, search, favorites, edited }),
		[edited, favorites, files, search, source, truckType]
	)
	const hasMods = files?.some(file => file.modName !== null) ?? false

	const categories = [
		{ label: texts.trucksCategory, value: 'trucks' },
		{ label: texts.trailersCategory, value: 'trailers' }
	]

	const sources = [
		{ label: texts.allSources, value: 'all' },
		{ label: texts.mainSource, value: 'main' },
		{ label: texts.dlcSource, value: 'dlc' },
		{ label: texts.modsSource, value: 'mods' },
		{ label: texts.favoritesSource, value: 'favorites' },
		{ label: texts.editedSource, value: 'edited' }
	]

	const types = [
		{ label: texts.allTypes, value: '' },
		{ label: texts.heavyType, value: 'HEAVY' },
		{ label: texts.heavyDutyType, value: 'HEAVY_DUTY' },
		{ label: texts.highwayType, value: 'HIGHWAY' },
		{ label: texts.offroadType, value: 'OFFROAD' },
		{ label: texts.scoutType, value: 'SCOUT' },
		{ label: texts.specialType, value: 'SPECIAL' }
	]

	async function unpack() {
		const path = await open({
			multiple: false,
			directory: false,
			filters: [{ name: 'initial.pak', extensions: ['pak'] }]
		})

		if (typeof path !== 'string') {
			return
		}

		setBusy(true)

		try {
			const config = await loadConfig()
			const saved = await saveConfig({ ...config, initialPath: path })

			applyConfig(fromConfigDto(saved))

			const count = await unpackInitial(path)

			message.success(formatString(texts.unpacked, String(count)))
			invalidateVehicles(load)
			setReload(value => value + 1)
		} catch (reason) {
			message.error(toMessage(reason))
		}

		setBusy(false)
	}

	async function toggleFavorite(name: string) {
		try {
			const favorite = await toggle(name)

			setUserLists(current => ({
				...current,
				favorites: favorite
					? [...current.favorites.filter(item => item !== name), name]
					: current.favorites.filter(item => item !== name)
			}))
		} catch (reason) {
			message.error(toMessage(reason))
		}
	}

	/** После изменения модов список должен увидеть новые файлы. */
	function modsChanged() {
		invalidateVehicles(load)
		setReload(value => value + 1)
	}

	function typeLabel(value: string | null): string | null {
		switch (value) {
			case 'HEAVY': return texts.heavyType
			case 'HEAVY_DUTY': return texts.heavyDutyType
			case 'HIGHWAY': return texts.highwayType
			case 'OFFROAD': return texts.offroadType
			case 'SCOUT': return texts.scoutType
			case 'SPECIAL': return texts.specialType
			default: return null
		}
	}

	function target(file: VehicleFile): VehicleTarget {
		return {
			name: file.name,
			kind: category === 'trailers' ? 'trailer' : 'truck',
			modName: file.modName
		}
	}

	async function exportFile(file: VehicleFile) {
		try {
			const count = await actions.export(target(file))

			if (count !== null) {
				message.success(formatString(texts.exported, String(count)))
			}
		} catch (reason) {
			message.error(toMessage(reason))
		}
	}

	async function importFile(file: VehicleFile) {
		try {
			const count = await actions.import(target(file))

			if (count !== null) {
				message.success(formatString(texts.imported, String(count)))
				invalidateVehicles(load, category)
				setReload(value => value + 1)
			}
		} catch (reason) {
			message.error(toMessage(reason))
		}
	}

	function resetFile(file: VehicleFile) {
		modal.confirm({
			title: texts.reset,
			content: texts.resetConfirm,
			okText: texts.reset,
			cancelText: texts.cancel,
			okButtonProps: { danger: true },
			onOk: async () => {
				try {
					await actions.reset(target(file))
					await unmark(file.name).catch(() => false)
					message.success(texts.resetDone)
					invalidateVehicles(load, category)
					setReload(value => value + 1)
				} catch (reason) {
					message.error(toMessage(reason))
				}
			}
		})
	}

	return (
		<div className="lists">
			<Header
				text={texts.title}
				extra={(
					<>
						<Tooltip title={texts.filtersToggle}>
							<Button
								aria-label="filters"
								type="text"
								shape="circle"
								icon={<FilterOutlined />}
								onClick={() => setFiltersOpen(open => !open)}
							/>
						</Tooltip>
						<Tooltip title={mode === 'cards' ? texts.listMode : texts.cardsMode}>
							<Button
								aria-label="mode"
								type="text"
								shape="circle"
								icon={mode === 'cards' ? <MenuOutlined /> : <AppstoreOutlined />}
								onClick={() => setMode(current => current === 'cards' ? 'list' : 'cards')}
							/>
						</Tooltip>
					</>
				)}
			/>
			<div
				className={filtersOpen ? 'lists-filters-reveal is-open' : 'lists-filters-reveal'}
				aria-hidden={!filtersOpen}
				inert={!filtersOpen}
			>
				<div className="lists-filters">
					<Select
						className="lists-filter"
						size="large"
						variant="borderless"
						options={categories}
						value={category}
						onChange={value => {
							const next = value as VehicleCategory
							const cached = cachedVehicles(load, next)

							setCategory(next)
							setTruckType('')
							setError(null)
							setFiles(cached ? sortVehicles(cached) : null)
						}}
					/>
					<Select
						className="lists-filter"
						size="large"
						variant="borderless"
						options={sources}
						value={source}
						onChange={value => setSource(value as VehicleSource)}
					/>
					<Select
						className="lists-filter"
						size="large"
						variant="borderless"
						disabled={category === 'trailers'}
						options={types}
						value={truckType}
						onChange={setTruckType}
					/>
					<Input
						className="lists-search"
						size="large"
						variant="borderless"
						allowClear
						placeholder={texts.search}
						value={search}
						onChange={event => setSearch(event.target.value)}
					/>
				</div>
			</div>
			<div className="lists-content" aria-busy={files === null}>
				{source === 'mods' && (
					<div className="lists-mods-button">
						<Button type="primary" onClick={() => setModsOpen(true)}>
							{texts.editMods}
						</Button>
					</div>
				)}
				{files === null
					? <ListsSkeleton mode={mode} />
					: visible.length === 0
						? (
							<Empty
								className="lists-empty"
								description={files.length === 0
									? (error ?? texts.noGameFiles)
									: source === 'mods' && !hasMods
										? setupTexts.noMods
										: texts.nothingFound}
							>
								{files.length === 0 && (
									<Button type="primary" loading={busy} onClick={() => void unpack()}>
										{texts.openArchive}
									</Button>
								)}
							</Empty>
						)
						: (
							<div className={mode === 'cards' ? 'lists-cards' : 'lists-rows'}>
								{visible.map(file => (
									<VehicleItem
										key={[file.name, file.dlc, file.modName].filter(Boolean).join('/')}
										file={file}
										category={category}
										mode={mode}
										name={translate(gameTexts, file.uiName, file.modName)
											?? prettyString(file.name).toUpperCase()}
										typeLabel={typeLabel(file.truckType)}
										favorite={favorites.has(file.name)}
										edited={edited.has(file.name)}
										search={search}
										texts={texts}
										onOpen={() => onOpen(file.name, category === 'trailers' ? 'trailer' : 'truck', file.modName)}
										onToggleFavorite={() => void toggleFavorite(file.name)}
										onExport={() => void exportFile(file)}
										onImport={() => void importFile(file)}
										onReset={() => resetFile(file)}
									/>
								))}
							</div>
						)}
			</div>
			<ModsModal
				open={modsOpen}
				texts={setupTexts}
				closeText={texts.close}
				onClose={() => setModsOpen(false)}
				onChanged={modsChanged}
				client={mods}
			/>
		</div>
	)
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
