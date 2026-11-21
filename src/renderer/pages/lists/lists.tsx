import { EditFilled, ReloadOutlined, SettingOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { unpackInitial } from '@renderer/api/archive'
import type { GameTexts, VehicleFile } from '@renderer/api/bindings'
import type { UserLists } from '@renderer/api/lists'
import { loadUserLists, toggleFavorite as toggleFavoriteFile } from '@renderer/api/lists'
import { loadConfig, saveConfig } from '@renderer/api/settings'
import { loadGameTexts, translate } from '@renderer/api/texts'
import { applyConfig, fromConfigDto } from '@renderer/config'
import type { VehicleCategory } from '@renderer/api/vehicles'
import { listVehicles } from '@renderer/api/vehicles'
import { Header } from '@renderer/components/header'
import { open } from '@tauri-apps/plugin-dialog'
import { formatString, prettyString } from '@utilities/strings'
import { App as AntApp, Button, Empty, Input, Segmented, Select, Spin, Tag, Tooltip } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { LISTS_PAGE_LOCALIZATION as texts } from './localization'
import type { VehicleSource } from './utilities'
import { filterVehicles, sortVehicles } from './utilities'
import './lists.scss'

/** Параметры страницы списков. */
export interface ListsPageProps {
	/** Открыть редактор автомобиля. */
	onOpen(name: string, kind: 'truck' | 'trailer'): void

	/** Открыть экран настройки. */
	onSetup?(): void

	/** Загрузчик списка: подменяется в тестах. */
	load?(category: VehicleCategory): Promise<VehicleFile[]>

	/** Загрузчик избранного и изменённых файлов: подменяется в тестах. */
	lists?(): Promise<UserLists>

	/** Переключатель избранного: подменяется в тестах. */
	toggle?(name: string): Promise<boolean>

	/** Загрузчик игровых переводов: подменяется в тестах. */
	texts?(): Promise<GameTexts>
}

/** Страница списков траков и прицепов. */
export function ListsPage({
	onOpen,
	onSetup,
	load = listVehicles,
	lists = loadUserLists,
	toggle = toggleFavoriteFile,
	texts: loadTexts = loadGameTexts
}: ListsPageProps) {
	const { message } = AntApp.useApp()
	const [category, setCategory] = useState<VehicleCategory>('trucks')
	const [source, setSource] = useState<VehicleSource>('all')
	const [truckType, setTruckType] = useState('')
	const [search, setSearch] = useState('')
	const [files, setFiles] = useState<VehicleFile[] | null>(null)
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
	}, [lists, reload])

	useEffect(() => {
		let cancelled = false

		void load(category).then(
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

			const files = await unpackInitial(path)

			message.success(formatString(texts.unpacked, String(files)))
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

	return (
		<div className="lists">
			<Header
				text={texts.title}
				extra={(
					<>
						<Tooltip title={texts.refresh}>
							<Button
								type="text"
								icon={<ReloadOutlined />}
								onClick={() => {
									setFiles(null)
									setError(null)
									setReload(value => value + 1)
								}}
							/>
						</Tooltip>
						{onSetup && (
							<Tooltip title={texts.setup}>
								<Button type="text" icon={<SettingOutlined />} onClick={onSetup} />
							</Tooltip>
						)}
					</>
				)}
			/>
			<div className="lists-filters">
				<Segmented
					options={categories}
					value={category}
					onChange={value => {
						setCategory(value as VehicleCategory)
						setTruckType('')
						setFiles(null)
						setError(null)
					}}
				/>
				<Select
					className="lists-filter"
					variant="borderless"
					options={sources}
					value={source}
					onChange={value => setSource(value as VehicleSource)}
				/>
				<Select
					className="lists-filter"
					variant="borderless"
					disabled={category === 'trailers'}
					options={types}
					value={truckType}
					onChange={setTruckType}
				/>
				<Input
					className="lists-search"
					allowClear
					placeholder={texts.search}
					value={search}
					onChange={event => setSearch(event.target.value)}
				/>
			</div>
			<div className="lists-content">
				{files === null
					? <Spin className="lists-spin" size="large" />
					: visible.length === 0
						? (
							<Empty
								className="lists-empty"
								description={files.length === 0 ? (error ?? texts.noGameFiles) : texts.nothingFound}
							>
								{files.length === 0 && (
									<Button type="primary" loading={busy} onClick={() => void unpack()}>
										{texts.openArchive}
									</Button>
								)}
							</Empty>
						)
						: (
							<div className="lists-list">
								{visible.map(file => {
									const favorite = favorites.has(file.name)

									return (
										<div
											key={[file.name, file.dlc, file.modName].filter(Boolean).join('/')}
											className="lists-item"
											onClick={() => onOpen(file.name, category === 'trailers' ? 'trailer' : 'truck')}
										>
											<Tooltip title={favorite ? texts.removeFavorite : texts.addFavorite}>
												<Button
													className="lists-item-favorite"
													type="text"
													icon={favorite ? <StarFilled /> : <StarOutlined />}
													onClick={event => {
														event.stopPropagation()
														void toggleFavorite(file.name)
													}}
												/>
											</Tooltip>
											<div className="lists-item-name">
												{translate(gameTexts, file.uiName, file.modName)
													?? prettyString(file.name).toUpperCase()}
											</div>
											<div className="lists-item-tags">
												{edited.has(file.name) && (
													<Tooltip title={texts.editedMark}>
														<EditFilled className="lists-item-edited" />
													</Tooltip>
												)}
												{typeLabel(file.truckType) && <Tag>{typeLabel(file.truckType)}</Tag>}
												<Tag color={file.dlc ? 'blue' : file.modName ? 'green' : undefined}>
													{file.dlc ?? file.modName ?? texts.mainSource}
												</Tag>
											</div>
										</div>
									)
								})}
							</div>
						)}
			</div>
		</div>
	)
}

/** Текст ошибки. */
function toMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
