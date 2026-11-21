import type { IFile } from '@modules/files/renderer'
import { Spin } from '@renderer/components/spin'
import { di } from '@utilities/di/container'
import { MODS_TOKEN } from '@utilities/di/renderer/tokens'
import type { TransferProps } from 'antd'
import { Button, Modal, Transfer } from 'antd'
import { useEffect, useState } from 'react'
import type { TransferItem } from 'antd/es/transfer'
import { LISTS_LOCALIZATION as texts } from '../localization'
import './mods-popup.scss'

/** Элемент мода. */
type ModItem = [IFile, string]

/** Элемент списка переноса. */
interface ModTransferItem extends TransferItem {
	/** Ключ. */
	key: string

	/** Название. */
	title: string
}

/** Параметры окна модификаций. */
export interface ModsPopupProps {
	/** Открыто ли окно. */
	open: boolean

	/**
	 * Скрыть окно.
	 * @param reload Требуется ли перезагрузка программы.
	 */
	onHide(reload: boolean): void
}

/** Окно выбора модификаций. */
export function ModsPopup({ open, onHide }: ModsPopupProps) {
	const mods = di.resolve(MODS_TOKEN)
	const [items, setItems] = useState<ModItem[] | undefined>(undefined)
	const [targetKeys, setTargetKeys] = useState<string[]>([])

	const transferLocale: TransferProps['locale'] = {
		itemUnit: '',
		itemsUnit: '',
		searchPlaceholder: '',
		notFoundContent: texts.emptyList
	}

	useEffect(() => {
		if (!open || items) {
			return
		}

		let cancelled = false

		void (async () => {
			const loaded = await mods.getAllMods()

			if (cancelled) {
				return
			}

			setItems(loaded)
			setTargetKeys(getTargetKeys(loaded))
		})()

		return () => {
			cancelled = true
		}
	}, [open, items, mods])

	function saveChanges() {
		if (!items) {
			return
		}

		mods.saveFromSelect(targetKeys, items)
		onHide(true)
	}

	function hidePopup() {
		if (!items) {
			return
		}

		setTargetKeys(getTargetKeys(items))
		onHide(false)
	}

	function getTargetKeys(source: ModItem[]): string[] {
		const keys = mods.toSelectKeys(source)

		return mods
			.filter(mod => keys.includes(mod.path))
			.map(mod => mod.path)
	}

	async function addItems(newItems?: ModItem[]) {
		if (!newItems || !items) {
			return
		}

		const result = [...items]

		for (const [file, name] of newItems) {
			if (!items.some(item => item[1] === name)) {
				result.push([file, name])
			}
		}

		setItems(result)
	}

	async function addPaks() {
		await addItems(await mods.requestPaks())
	}

	async function addDirs() {
		await addItems(await mods.requestDirs())
	}

	return (
		<Modal
			title={items ? texts.modsPopupTitle : texts.loading}
			open={open}
			okText={texts.ok}
			cancelText={texts.cancel}
			onOk={saveChanges}
			onCancel={hidePopup}
		>
			{items
				? (
					<>
						<Transfer<ModTransferItem>
							className="mods-transfer"
							dataSource={items.map(([file, name]) => ({
								key: file.path,
								title: name
							}))}
							targetKeys={targetKeys}
							titles={[texts.foundItems, texts.addedItems]}
							render={item => item.title}
							locale={transferLocale}
							onChange={newKeys => setTargetKeys(newKeys.map(key => String(key)))}
						/>
						<Button
							className="mods-manual-button"
							onClick={() => void addPaks()}
						>
							{texts.manualMod}
						</Button>
						<Button
							className="mods-manual-button"
							onClick={() => void addDirs()}
						>
							{texts.manualModFolder}
						</Button>
					</>
				)
				: <Spin />}
		</Modal>
	)
}
