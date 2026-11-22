import { EditFilled, StarFilled } from '@ant-design/icons'
import type { VehicleFile } from '@/api/bindings'
import type { VehicleCategory } from '@/api/vehicles'
import { ContextMenu } from '@/components/context-menu'
import type { Locale } from '@/utilities/localization'
import type { MenuProps } from 'antd'
import { Tag, Tooltip } from 'antd'
import { useState } from 'react'
import { vehicleImage } from '../images'

/** Вид списка: карточки с обложкой или строки с миниатюрой. */
export type ListMode = 'cards' | 'list'

/** Параметры элемента списка. */
export interface VehicleItemProps {
	/** Файл автомобиля. */
	file: VehicleFile

	/** Категория списка. */
	category: VehicleCategory

	/** Вид списка. */
	mode: ListMode

	/** Название для человека: игровой перевод или имя файла. */
	name: string

	/** Подпись класса, если он известен. */
	typeLabel: string | null

	/** Файл в избранном. */
	favorite: boolean

	/** Файл изменён. */
	edited: boolean

	/** Подстрока поиска: совпадение подсвечивается. */
	search: string

	/** Тексты страницы. */
	texts: Locale['lists']

	/** Открывает редактор. */
	onOpen(): void

	/** Переключает избранное. */
	onToggleFavorite(): void

	/** Экспортирует параметры файла. */
	onExport(): void

	/** Импортирует параметры в файл. */
	onImport(): void

	/** Сбрасывает правки файла. */
	onReset(): void
}

/**
 * Элемент списка: карточка с обложкой или строка с миниатюрой.
 *
 * Правый клик открывает меню файла: избранное, экспорт, импорт и сброс.
 */
export function VehicleItem({
	file,
	category,
	mode,
	name,
	typeLabel,
	favorite,
	edited,
	search,
	texts,
	onOpen,
	onToggleFavorite,
	onExport,
	onImport,
	onReset
}: VehicleItemProps) {
	const [target, setTarget] = useState<HTMLDivElement | null>(null)
	const image = vehicleImage(category, file.name)
	const items: MenuProps['items'] = [
		{
			key: 'favorite',
			label: favorite ? texts.removeFavorite : texts.addFavorite,
			onClick: onToggleFavorite
		},
		{ type: 'divider' },
		{ key: 'export', label: texts.export, onClick: onExport },
		{ key: 'import', label: texts.import, onClick: onImport },
		{ key: 'reset', label: texts.reset, onClick: onReset }
	]
	const sourceLabel = file.dlc ?? file.modName ?? texts.mainSource

	if (mode === 'cards') {
		return (
			<div
				ref={setTarget}
				className="lists-card"
				data-vehicle={file.name}
				role="button"
				tabIndex={0}
				onClick={onOpen}
				onKeyDown={event => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault()
						onOpen()
					}
				}}
			>
				<ContextMenu target={target} items={items} />
				<img className="lists-card-image" src={image} alt="" loading="lazy" draggable={false} />
				<div className="lists-card-marks">
					{favorite && <StarFilled className="lists-mark-favorite" />}
					{edited && (
						<Tooltip title={texts.editedMark}>
							<EditFilled className="lists-mark-edited" />
						</Tooltip>
					)}
				</div>
				<div className="lists-card-title">
					<Highlight text={name} search={search} />
				</div>
			</div>
		)
	}

	return (
		<div
			ref={setTarget}
			className="lists-row"
			data-vehicle={file.name}
			role="button"
			tabIndex={0}
			onClick={onOpen}
			onKeyDown={event => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault()
					onOpen()
				}
			}}
		>
			<ContextMenu target={target} items={items} />
			<img className="lists-row-image" src={image} alt="" loading="lazy" draggable={false} />
			<div className="lists-row-body">
				<div className="lists-row-title">
					<Highlight text={name} search={search} />
				</div>
				<div className="lists-row-tags">
					<Tag>
						{sourceLabel}
					</Tag>
					{typeLabel && <Tag>{typeLabel}</Tag>}
					{favorite && (
						<Tag color="gold">
							<StarFilled />
						</Tag>
					)}
					{edited && (
						<Tooltip title={texts.editedMark}>
							<Tag>
								<EditFilled />
							</Tag>
						</Tooltip>
					)}
				</div>
			</div>
		</div>
	)
}

/** Имя с подсветкой совпадения поиска. */
function Highlight({ text, search }: { text: string, search: string }) {
	const query = search.trim()
	const index = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1

	if (index < 0) {
		return <>{text}</>
	}

	return (
		<>
			{text.slice(0, index)}
			<span className="lists-match">{text.slice(index, index + query.length)}</span>
			{text.slice(index + query.length)}
		</>
	)
}
