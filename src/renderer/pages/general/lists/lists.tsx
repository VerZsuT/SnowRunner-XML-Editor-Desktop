import { AppstoreOutlined, FilterOutlined, MenuOutlined } from '@ant-design/icons'
import { Header } from '@renderer/components/header'
import { useKey } from '@renderer/utilities/use-key'
import { di } from '@utilities/di/container'
import { APP_TOKEN } from '@utilities/di/renderer/tokens'
import { Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Category, ListMode } from '../enums'
import { useListStore } from '../store/list'
import { Filters } from './components/filters'
import { List } from './components/list/list'
import { LISTS_LOCALIZATION as texts } from './localization'
import { ItemsUtils } from './utilities/items'
import './lists.scss'

/** Страница списков автомобилей/прицепов. */
export function Lists() {
	const app = di.resolve(APP_TOKEN)
	const category = useListStore(state => state.category)
	const listMode = useListStore(state => state.listMode)
	const setListMode = useListStore(state => state.setListMode)
	const [filtersIsOpen, setFiltersIsOpen] = useState(true)
	const mountedRef = useRef(false)

	useKey('Escape', () => app.quit())

	useEffect(() => {
		const store = useListStore.getState()

		if (!mountedRef.current) {
			mountedRef.current = true

			if (store.files.main.length === 0) {
				void loadFiles(category)
			}

			return
		}

		store.clearFiles()
		void loadFiles(category)
	}, [category])

	async function loadFiles(category: Category) {
		const itemsUtils = new ItemsUtils()
		const [main, dlc, mods] = await Promise.all([
			itemsUtils.getMain(category),
			itemsUtils.getDLC(category),
			itemsUtils.getMods(category)
		])

		useListStore.getState().addFiles('main', main)
		useListStore.getState().addFiles('dlc', dlc)
		useListStore.getState().addFiles('mods', mods)
	}

	function toggleFiltersPanel() {
		setFiltersIsOpen(value => !value)
	}

	function toggleListMode() {
		setListMode(listMode === ListMode.cards
			? ListMode.list
			: ListMode.cards
		)
	}

	return (
		<div className="lists">
			<Header
				text={category === Category.trucks ? texts.trucksListTitle : texts.trailersListTitle}
				extra={(
					<>
						<Button
							className="header-button"
							shape="circle"
							icon={<FilterOutlined className="button-icon" />}
							onClick={toggleFiltersPanel}
						/>
						<Button
							className="header-button"
							shape="circle"
							icon={listMode === ListMode.cards
								? <MenuOutlined className="button-icon" />
								: <AppstoreOutlined className="button-icon" />
							}
							onClick={toggleListMode}
						/>
					</>
				)}
			/>
			<Filters isOpen={filtersIsOpen} />
			<List />
		</div>
	)
}
