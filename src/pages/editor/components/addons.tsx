import type { AddonFile, GameTexts, TruckAddon } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import { addonLabel, loadAddons } from '@/api/addons'
import { errorMessage } from '@/api/errors'
import { writeField } from '@/api/fields'
import { openPath } from '@/api/system'
import { useConfig } from '@/config'
import { App, Button, Input, InputNumber, Select, Spin, Typography } from 'antd'
import { useRef, useState } from 'react'
import { DocumentField } from './field'
import { Group } from './group'
import { fieldText, texts } from '../texts'
import './addons.scss'

/** Открытый аддон вместе с моделью для полей. */
export interface AddonDocument {
	/** Файл аддона. */
	addon: AddonFile

	/** Открытый документ аддона. */
	session: DocumentSession

	/** Модель аддона. */
	model: TruckAddon
}

/** Параметры группы «Содержимое аддонов». */
export interface AddonsContentProps {
	/** Имя файла трака без расширения. */
	truckName: string

	/** Мод, из которого открыт трак. */
	modName: string | null

	/** Открытые аддоны. */
	docs: AddonDocument[]

	/** Игровые переводы. */
	gameTexts: GameTexts | null

	/** Открывает аддон. */
	onOpen(addon: AddonFile): Promise<void>

	/** Перечитывает модель открытого аддона. */
	onRefresh(doc: AddonDocument): Promise<TruckAddon | null>
}

/** Содержимое аддонов: выбор аддона и его запасы. */
export function AddonsContent({
	truckName,
	modName,
	docs,
	gameTexts,
	onOpen,
	onRefresh
}: AddonsContentProps) {
	const { message } = App.useApp()
	const advanced = useConfig().advancedMode
	const [items, setItems] = useState<AddonFile[] | null>(null)
	const [loading, setLoading] = useState(false)
	const [filter, setFilter] = useState('')
	const [selected, setSelected] = useState<string | null>(null)

	const visible = items
		? items.filter(addon => {
			const query = filter.trim().toLowerCase()

			return !query || addonLabel(addon, gameTexts).toLowerCase().includes(query)
		})
		: []
	const doc = docs.find(item => item.addon.path === selected) ?? null

	async function load() {
		setLoading(true)

		try {
			const loaded = await loadAddons(truckName, modName)
			const first = loaded.find(addon => addon.installed) ?? loaded[0]

			setItems(loaded)

			if (first) {
				await onOpen(first)
				setSelected(first.path)
			}
		} catch (reason) {
			message.error(errorMessage(reason))
		} finally {
			setLoading(false)
		}
	}

	async function choose(path: string) {
		const addon = items?.find(item => item.path === path)

		if (!addon) {
			return
		}

		try {
			await onOpen(addon)
			setSelected(path)
		} catch (reason) {
			message.error(errorMessage(reason))
		}
	}

	function openFile() {
		if (!doc) {
			return
		}

		void openPath(doc.session.path).catch((reason: unknown) => message.error(errorMessage(reason)))
	}

	return (
		<Group label={texts.addonsContent} icon="wrench">
			{items === null
				? loading
					? (
						<div className="editor-addons-loading">
							<Spin />
							<Typography.Text>{texts.loadingAddons}</Typography.Text>
						</div>
					)
					: (
						<div className="editor-addons-loading">
							<Button type="primary" onClick={() => void load()}>
								{texts.loadAddons}
							</Button>
						</div>
					)
				: (
					<>
						<div className="editor-addons-controls">
							<Input
								className="editor-addons-filter"
								allowClear
								placeholder={texts.addonFilter}
								value={filter}
								onChange={event => setFilter(event.target.value)}
							/>
							<Select
								className="editor-addons-select"
								popupMatchSelectWidth={300}
								classNames={{ popup: { root: 'editor-select-dropdown editor-addons-dropdown' } }}
								placeholder={texts.addonFilter}
								value={selected ?? undefined}
								options={visible.map(addon => ({
									value: addon.path,
									label: addonLabel(addon, gameTexts)
								}))}
								notFoundContent={texts.noAddons}
								onChange={(path: string) => void choose(path)}
							/>
						</div>

						{doc
							? (
								<>
									<div className="editor-addons-fields">
										{doc.model.truckData
											? (
												<>
													<DocumentField session={doc.session} field={doc.model.truckData.fuelCapacity} />
													<DocumentField session={doc.session} field={doc.model.truckData.waterCapacity} />
													<DocumentField session={doc.session} field={doc.model.truckData.repairsCapacity} />
													<DocumentField session={doc.session} field={doc.model.truckData.wheelRepairsCapacity} />
												</>
											)
											: (
												<AddonDraft
													key={doc.session.docId}
													doc={doc}
													onRefresh={onRefresh}
												/>
											)}
									</div>

									{advanced && (
										<Button
											className="editor-addons-open"
											type="primary"
											onClick={openFile}
										>
											{texts.openFile}
										</Button>
									)}
								</>
							)
							: selected
								? <Spin />
								: null}
					</>
				)}
		</Group>
	)
}

/** Поля, которые создают TruckData при первом изменении. */
const DRAFT_FIELDS = [
	{ key: 'fuelCapacity', label: 'truckData.fuelCapacity' },
	{ key: 'waterCapacity', label: 'truckData.waterCapacity' },
	{ key: 'repairsCapacity', label: 'truckData.repairsCapacity' },
	{ key: 'wheelRepairsCapacity', label: 'truckData.wheelRepairsCapacity' }
] as const

type DraftKey = typeof DRAFT_FIELDS[number]['key']

/** Поля аддона без TruckData: блок создаётся при первой правке, как в 1.4.0. */
function AddonDraft({ doc, onRefresh }: {
	doc: AddonDocument
	onRefresh(doc: AddonDocument): Promise<TruckAddon | null>
}) {
	const { message } = App.useApp()
	const [values, setValues] = useState<Record<DraftKey, number | null>>({
		fuelCapacity: 0,
		waterCapacity: 0,
		repairsCapacity: 0,
		wheelRepairsCapacity: 0
	})
	const [busy, setBusy] = useState(false)
	const busyRef = useRef(false)
	const createdRef = useRef(false)

	async function commit(key: DraftKey) {
		const value = values[key]

		if (busyRef.current || createdRef.current || value === null || value < 0) {
			return
		}

		busyRef.current = true
		setBusy(true)

		try {
			await doc.session.addElement('/TruckAddon', 'TruckData')
			createdRef.current = true

			const model = await onRefresh(doc)

			// Переносим все введённые значения: после создания TruckData
			// черновик заменяется обычными полями, и отложенные правки
			// иначе потерялись бы.
			for (const item of DRAFT_FIELDS) {
				const next = values[item.key]
				const field = model?.truckData?.[item.key]

				if (field && next !== null) {
					await writeField(doc.session, field, next)
				}
			}
		} catch (reason) {
			message.error(errorMessage(reason))
		} finally {
			busyRef.current = false
			setBusy(false)
		}
	}

	return (
		<>
			{DRAFT_FIELDS.map(item => (
				<div key={item.key} className="editor-field editor-addon-draft">
					<div className="editor-field-label">
						<Typography.Text>{fieldText(item.label)}</Typography.Text>
					</div>
					<div className="editor-field-content">
						<InputNumber
							className="editor-field-input"
							size="large"
							min={0}
							disabled={busy}
							value={values[item.key]}
							onChange={value => setValues(current => ({
								...current,
								[item.key]: typeof value === 'number' ? value : null
							}))}
							onBlur={() => void commit(item.key)}
							onPressEnter={() => void commit(item.key)}
						/>
					</div>
				</div>
			))}
		</>
	)
}
