import type { IStringAttrDescriptor } from '@modules/xml/game/attributes'
import { DiffLockType } from '@modules/xml/renderer'
import { useConfig } from '@renderer/utilities/use-reactive'
import { useEffect, useState } from 'react'
import { useEditorStore } from '../../../store/editor'
import type { ParameterValue } from '../../types'
import { useFile } from '../../utilities/import'
import { resetUtils } from '../../utilities/reset'
import { SELECT_LOCALIZATION as texts } from './localization'
import { Select } from './select'

/** Параметры выбора блокировки дифференциала. */
export interface DiffLockProps {
	/** Описание параметра. */
	descriptor: IStringAttrDescriptor<DiffLockType>

	/** Событие изменения значения. */
	onChange?(value: ParameterValue): void
}

/** Выбор блокировки дифференциала. */
export function DiffLock({ descriptor, onChange }: DiffLockProps) {
	const configState = useConfig()
	const file = useFile()
	const [isAlwaysByDefault, setIsAlwaysByDefault] = useState<boolean>()
	const isAlways = descriptor.get() === DiffLockType.always

	useEffect(() => {
		let cancelled = false

		void (async () => {
			const value = await resetUtils.getDefaultValue(file, useEditorStore.getState().info, descriptor)

			if (!cancelled) {
				setIsAlwaysByDefault(value === DiffLockType.always)
			}
		})()

		return () => {
			cancelled = true
		}
	}, [file, descriptor])

	return (
		<Select
			descriptor={descriptor}
			options={[
				[DiffLockType.none, texts.none],
				[DiffLockType.installed, texts.installed],
				[DiffLockType.uninstalled, texts.uninstalled],
				[DiffLockType.always, texts.always]
			]}
			disabled={isAlways && isAlwaysByDefault && !configState.advancedMode}
			onChange={onChange}
		/>
	)
}
