import type { IBooleanAttrDescriptor, INumberAttrDescriptor } from '@modules/xml/game/attributes'
import { Group } from '../../group/group'
import { Int } from '../../input/variants/int'
import { Select } from '../../select/select'
import { UNLOCK_PRESET_LOCALIZATION as texts } from './localization'

/** Параметры разблокировки. */
export interface UnlockPresetElement {
	/** Цена. */
	$Price: INumberAttrDescriptor

	/** Уровень разблокировки. */
	$UnlockByRank: INumberAttrDescriptor

	/** Разблокировка разведкой. */
	$UnlockByExploration: IBooleanAttrDescriptor
}

/** Параметры компонента разблокировки. */
export interface UnlockPresetProps {
	/** Элемент с параметрами разблокировки. */
	element?: UnlockPresetElement
}

/** Группа разблокировки. */
export function UnlockPreset({ element }: UnlockPresetProps) {
	if (!element) {
		return null
	}

	return (
		<Group label={texts.unlockGroupName}>
			<Int descriptor={element.$Price} />
			<Select
				descriptor={element.$UnlockByExploration}
				options={[
					[true, texts.findOnMap],
					[false, texts.byRank]
				]}
			/>
			<Int descriptor={element.$UnlockByRank} />
		</Group>
	)
}
