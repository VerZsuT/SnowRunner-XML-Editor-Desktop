import { TruckType } from '@modules/xml/renderer'
import { useConfig } from '@renderer/utilities/use-reactive'
import type { SelectProps } from 'antd'
import { Input, Select } from 'antd'
import { Category, SourceType } from '../../enums'
import { useListStore } from '../../store/list'
import { LISTS_LOCALIZATION as texts } from '../localization'
import './filters.scss'

/** Параметры фильтров. */
export interface FiltersProps {
	/** Открыта ли панель фильтров. */
	isOpen: boolean
}

/** Панель фильтров списка. */
export function Filters({ isOpen }: FiltersProps) {
	const config = useConfig()
	const category = useListStore(state => state.category)
	const source = useListStore(state => state.source)
	const name = useListStore(state => state.name)
	const truckType = useListStore(state => state.truckType)
	const setSource = useListStore(state => state.setSource)
	const setCategory = useListStore(state => state.setCategory)
	const setName = useListStore(state => state.setName)
	const setTruckType = useListStore(state => state.setTruckType)

	const categories: SelectProps['options'] = [
		{
			label: texts.trucksCategory,
			value: Category.trucks
		},
		{
			label: texts.trailersCategory,
			value: Category.trailers
		}
	]

	const sources: SelectProps['options'] = [
		{
			label: texts.allSource,
			value: SourceType.all
		},
		{
			label: texts.mainSource,
			value: SourceType.main
		},
		{
			label: texts.dlcSource,
			value: SourceType.dlc
		},
		{
			label: texts.modsSource,
			value: SourceType.mods,
			disabled: !config.useMods
		},
		{
			label: texts.favoritesSource,
			value: SourceType.favorites
		},
		{
			label: texts.editedSource,
			value: SourceType.edited
		}
	]

	const truckTypes: SelectProps['options'] = [
		{
			label: texts.allTypes,
			value: ''
		},
		{
			label: texts.HEAVY_TYPE,
			value: TruckType.heavy
		},
		{
			label: texts.HEAVY_DUTY_TYPE,
			value: TruckType.heavyDuty
		},
		{
			label: texts.HIGHWAY_TYPE,
			value: TruckType.highway
		},
		{
			label: texts.OFFROAD_TYPE,
			value: TruckType.offroad
		},
		{
			label: texts.SCOUT_TYPE,
			value: TruckType.scout
		}
	]

	return (
		<div className={['filters', !isOpen && 'filters--closed'].filter(Boolean).join(' ')}>
			<Select
				className="filter-select"
				size="large"
				variant="borderless"
				options={categories}
				value={category}
				onChange={value => setCategory(value as Category)}
			/>
			<Select
				className="filter-select"
				size="large"
				variant="borderless"
				options={sources}
				value={source}
				onChange={value => setSource(value as SourceType)}
			/>
			<Select
				className="filter-select"
				size="large"
				variant="borderless"
				disabled={category !== Category.trucks}
				options={truckTypes}
				value={truckType}
				onChange={value => setTruckType(value as TruckType | '')}
			/>
			<Input
				className="filter-input"
				size="large"
				variant="borderless"
				placeholder={texts.search}
				value={name}
				onChange={event => setName(event.target.value)}
			/>
		</div>
	)
}
