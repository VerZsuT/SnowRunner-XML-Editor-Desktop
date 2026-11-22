import type { AddonFile, GameTexts, TruckAddon } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import { addonLabel, loadAddons, selectableAddons } from '@/api/addons'
import { errorMessage } from '@/api/errors'
import { App, Button, Select, Spin, Switch, Tag, Typography } from 'antd'
import { useState } from 'react'
import { DocumentField } from './field'
import { Group } from './group'
import { texts } from '../texts'
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

	/** Открытые аддоны. */
	docs: AddonDocument[]

	/** Игровые переводы. */
	gameTexts: GameTexts | null

	/** Открывает аддон. */
	onOpen(addon: AddonFile): Promise<void>

	/** Перечитывает модель открытого аддона. */
	onRefresh(doc: AddonDocument): Promise<void>
}

/** Содержимое аддонов: выбор аддона и его запасы. */
export function AddonsContent({ truckName, docs, gameTexts, onOpen, onRefresh }: AddonsContentProps) {
	const { message } = App.useApp()
	const [items, setItems] = useState<AddonFile[] | null>(null)
	const [loading, setLoading] = useState(false)
	const [all, setAll] = useState(false)
	const [selected, setSelected] = useState<string | null>(null)

	const visible = items ? (all ? items : selectableAddons(items)) : []
	const doc = docs.find(item => item.addon.path === selected) ?? null

	async function load() {
		setLoading(true)

		try {
			const loaded = await loadAddons(truckName)
			const first = selectableAddons(loaded)[0]

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

	async function createTruckData(doc: AddonDocument) {
		try {
			await doc.session.addElement('/TruckAddon', 'TruckData')
			await onRefresh(doc)
		} catch (reason) {
			message.error(errorMessage(reason))
		}
	}

	return (
		<Group label={texts.addonsContent}>
			{items === null
				? loading
					? (
						<div className="editor-addons-loading">
							<Spin />
							<Typography.Text>{texts.loadingAddons}</Typography.Text>
						</div>
					)
					: (
						<Button type="primary" onClick={() => void load()}>
							{texts.loadAddons}
						</Button>
					)
				: (
					<>
						<div className="editor-addons-controls">
							<Select
								className="editor-addons-select"
								showSearch
								optionFilterProp="label"
								placeholder={texts.addonFilter}
								value={selected ?? undefined}
								options={visible.map(addon => ({
									value: addon.path,
									label: addonLabel(addon, gameTexts)
								}))}
								notFoundContent={texts.noAddons}
								onChange={path => void choose(path)}
							/>
							<Switch
								checked={all}
								checkedChildren={texts.allAddons}
								unCheckedChildren={texts.installedAddons}
								onChange={setAll}
							/>
						</div>

						{doc
							? (
								<>
									<Tag color={doc.addon.installed ? 'green' : 'default'}>
										{doc.addon.installed ? texts.installedAddon : texts.notInstalledAddon}
									</Tag>

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
											<Button onClick={() => void createTruckData(doc)}>
												{texts.createTruckData}
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
