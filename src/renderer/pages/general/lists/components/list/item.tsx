import { EditFilled, StarFilled } from '@ant-design/icons'
import { ProgramError } from '@modules/errors/renderer'
import type { IFile } from '@modules/files/types'
import { Page } from '@modules/windows/enums'
import type { TruckType } from '@modules/xml/renderer'
import { TruckXML } from '@modules/xml/renderer'
import { ContextMenu } from '@renderer/components/context-menu'
import { useEditorStore } from '@renderer/pages/general/store/editor'
import { useListStore } from '@renderer/pages/general/store/list'
import { usePageStore } from '@renderer/pages/general/store/page'
import { useArraySnapshot } from '@renderer/utilities/use-reactive'
import { di } from '@utilities/di/container'
import { EDITED_TOKEN, FAVORITES_TOKEN, GAME_TEXTS_TOKEN, IMAGES_TOKEN, MESSAGES_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import { prettyString } from '@utilities/strings/renderer'
import type { MenuProps } from 'antd'
import { Card, Tag, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { ListMode, type Category } from '../../../enums'
import { LISTS_LOCALIZATION as texts } from '../../localization'
import { editorUtils } from '../../utilities/editor'
import './item.scss'

const { Text } = Typography

/** Параметры элемента списка. */
export interface ListItemProps {
	/** Файл. */
	file: IFile

	/** Категория. */
	category: Category

	/** Видим ли элемент в выбранном источнике. */
	visible?: boolean
}

/** Элемент списка. */
export function ListItem({ file, category, visible = true }: ListItemProps) {
	const images = di.resolve(IMAGES_TOKEN)
	const favorites = di.resolve(FAVORITES_TOKEN)
	const edited = di.resolve(EDITED_TOKEN)
	const messages = di.resolve(MESSAGES_TOKEN)

	const nameFilter = useListStore(state => state.name)
	const typeFilter = useListStore(state => state.truckType)
	const files = useListStore(state => state.files)
	const listMode = useListStore(state => state.listMode)
	const toggleFavorite = useListStore(state => state.toggleFavorite)
	const clearEditorStore = useEditorStore(state => state.clearEditorStore)
	const setFile = useEditorStore(state => state.setFile)
	const route = usePageStore(state => state.route)

	const favoritesSnapshot = useArraySnapshot(favorites.arr)
	const editedSnapshot = useArraySnapshot(edited.arr)

	const [container, setContainer] = useState<HTMLDivElement | null>(null)
	const [xml, setXml] = useState<TruckXML | null>(null)
	const [imgSrc, setImgSrc] = useState(() => images.getDefault(category))
	const [name, setName] = useState('')
	const [type, setType] = useState<TruckType | undefined>()

	useEffect(() => {
		let cancelled = false

		void load()

		return () => {
			cancelled = true
		}

		async function load() {
			const cache = useListStore.getState().itemsCache.get(file.path)
			const xmlRes = cache
				? cache.xml
				: await TruckXML.from(file)

			if (cancelled) {
				return
			}

			if (xmlRes) {
				useListStore.getState().itemsCache.set(file.path, { xml: xmlRes })
			}

			if (!xmlRes) {
				console.error(`Error on loading xml file ${file.path}`)
				setName('ERROR')

				return
			}

			setXml(xmlRes)
			setName(getName(file, xmlRes))
			setType(xmlRes.TruckData?.TruckType)
		}
	}, [file])

	useEffect(() => {
		if (!xml) {
			return
		}

		let cancelled = false

		void images.getSrc(category, file, xml).then(src => {
			if (!cancelled) {
				setImgSrc(src)
			}
		})

		return () => {
			cancelled = true
		}
	}, [images, xml, category, file])

	useEffect(() => {
		const currentFile = useEditorStore.getState().file

		if (!container || !currentFile || currentFile.path !== file.path) {
			return
		}

		container.scrollIntoView?.(false)
		// Намеренно только после монтирования.
	}, [container])

	const nameMatches = nameFilter
		? name.toLowerCase().includes(nameFilter.toLowerCase())
		: true
	const typeMatches = typeFilter && type
		? type.toLowerCase() === typeFilter.toLowerCase()
		: true
	const isShow = nameMatches && typeMatches
	const title = getTitle(name, nameFilter)
	const isFavorite = favoritesSnapshot.includes(file.name)
	const isEdited = editedSnapshot.some(item => item.name === file.name)
	const typeText = type
		? texts[`${type}_TYPE` as keyof typeof texts]
		: undefined

	const contextMenuItems: MenuProps['items'] = [
		{
			label: isFavorite
				? texts.removeFavorite
				: texts.addFavorite,
			key: 'toggle-favorite',
			onClick: toggleFav
		},
		{
			label: texts.export,
			key: 'export',
			onClick: () => void exportFile()
		},
		{
			label: texts.import,
			key: 'import',
			onClick: () => void importFile()
		},
		{
			label: texts.reset,
			key: 'reset',
			onClick: () => void resetFile()
		}
	]

	async function exportFile() {
		return editorUtils
			.export([{ source: file }])
			.catch(reason => new ProgramError(reason))
			.finally(messages.loading(texts.processing))
	}

	async function importFile() {
		return editorUtils
			.import([{ file }])
			.catch(reason => new ProgramError(reason))
			.finally(messages.loading(texts.processing))
	}

	async function resetFile() {
		return editorUtils
			.reset([file])
			.catch(reason => new ProgramError(reason))
			.finally(messages.loading(texts.processing))
	}

	function openEditor() {
		clearEditorStore()
		setFile(file)
		route(Page.editor)
	}

	function toggleFav() {
		toggleFavorite(file)
	}

	return (
		<div
			ref={setContainer}
			className="card-container"
			style={{ display: visible && isShow ? undefined : 'none' }}
		>
			<ContextMenu
				target={container}
				items={contextMenuItems}
			/>

			{listMode === ListMode.list
				? (
					<div
						className="row"
						onClick={openEditor}
					>
						<img
							width="63"
							height="87"
							src={imgSrc}
						/>
						<div className="description">
							<Text className="title">
								{title.first}<span className="red">{title.second}</span>{title.last}
							</Text>
							<div className="indicators-tags">
								{files.main.includes(file)
									? <Tag>{texts.mainSource}</Tag>
									: files.dlc.includes(file)
										? <Tag>{texts.dlcSource}</Tag>
										: files.mods.includes(file)
											? <Tag>{texts.modsSource}</Tag>
											: null}
								{typeText && <Tag>{typeText}</Tag>}
								{isFavorite && (
									<Tag color="gold">
										<StarFilled className="favorite-star" />
									</Tag>
								)}
								{isEdited && (
									<Tag>
										<EditFilled className="edited-mark" />
									</Tag>
								)}
							</div>
						</div>
					</div>
				)
				: (
					<Card
						className="card"
						loading={!xml || !imgSrc}
						hoverable
						cover={(
							<img
								width="250"
								height="350"
								src={imgSrc}
								onClick={openEditor}
							/>
						)}
					>
						<Card.Meta
							className="card-title"
							title={(
								<>
									{title.first}<span className="red">{title.second}</span>{title.last}
								</>
							)}
						/>
						<div className="indicators">
							{isFavorite && <StarFilled className="favorite-star" />}
							{isEdited && <EditFilled className="edited-mark" />}
						</div>
					</Card>
				)}
		</div>
	)
}

function getName(file: IFile, xml: TruckXML): string {
	let name = prettyString(file.name)

	if (xml.GameData?.UiDesc) {
		const uiName = xml.GameData?.UiDesc?.UiName

		if (uiName) {
			const gameTexts = di.resolve(GAME_TEXTS_TOKEN)
			const mods = di.resolve(MODS_TOKEN)

			name = gameTexts.get(uiName, mods.getModID(file)) || uiName
		}
	}

	return name
}

function getTitle(name: string, nameFilter: string) {
	if (!nameFilter) {
		return {
			first: name,
			second: '',
			last: ''
		}
	}

	const firstIndex = name.toLowerCase().indexOf(nameFilter.toLowerCase())
	const lastIndex = firstIndex + nameFilter.length

	return {
		first: name.slice(0, firstIndex),
		second: name.slice(firstIndex, lastIndex),
		last: name.slice(lastIndex, name.length)
	}
}
