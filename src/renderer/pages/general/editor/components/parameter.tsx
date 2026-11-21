import { Lang } from '@modules/data/config/enums'
import type { IExportedData } from '@modules/epf/types'
import { ContextMenu } from '@renderer/components/context-menu'
import { useConfig } from '@renderer/utilities/use-reactive'
import { isNullable, isString } from '@utilities/checks/renderer'
import { Popover, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { useEditorStore } from '../../store/editor'
import { EDITOR_LOCALIZATION as texts } from '../localization'
import type { IParameterProps, ParameterValue } from '../types'
import { exportUtils } from '../utilities/export'
import { useExportListener, useImportListener } from '../utilities/hooks'
import { useFile } from '../utilities/import'
import { resetUtils, useResetListener } from '../utilities/reset'
import { useActive } from './utilities'
import './parameter.scss'

const { Text } = Typography

/** Параметры параметра. */
export interface ParameterProps extends IParameterProps {
	/** Событие изменения значения. */
	onChange?(value: ParameterValue): void

	/** Содержимое параметра. */
	children(args: { value: ParameterValue, onChange(value: ParameterValue): void }): ReactNode
}

/** Строка таблицы параметров. */
export function Parameter({ descriptor, label, desc, getter, setter, onChange, children }: ParameterProps) {
	const configState = useConfig()
	const file = useFile()
	const { isActive } = useActive()
	const [target, setTarget] = useState<HTMLDivElement | null>(null)

	const getValue = getter ?? descriptor.get
	const [value, setValue] = useState<ParameterValue>(() => getValue() ?? '')

	const labelText = label ?? descriptor.label
	const descText = desc ?? descriptor.desc

	function setActualValue(newValue: ParameterValue) {
		if (isString(newValue)) {
			descriptor.setStr(newValue)
		} else {
			(setter ?? descriptor.set)(newValue)
		}
	}

	function changeValue(newValue: ParameterValue) {
		if (value === newValue) {
			return
		}

		setActualValue(newValue)
		onChange?.(getValue())
		setValue(getValue() ?? '')
	}

	async function resetValue() {
		const defaultVal = await resetUtils.getDefaultValue(file, useEditorStore.getState().info, descriptor)

		if (!defaultVal) {
			return
		}

		changeValue(defaultVal)
	}

	useResetListener(resetValue)

	useImportListener(data => {
		const exportedValue = getExportedValue(data.data)

		if (isNullable(exportedValue)) {
			return
		}

		changeValue(exportedValue)
	})

	useExportListener(data => {
		const { dlc, mod } = useEditorStore.getState().info
		const fileName = exportUtils.getName(file, dlc, mod)
		const fileData = data.data[fileName] ??= {}
		const selectorData = fileData[descriptor.selector] ??= {}

		selectorData[descriptor.name] = descriptor.getStr() ?? descriptor.get()
	})

	const contextItems: MenuProps['items'] = [{
		key: 'reset-param',
		label: `${texts.resetMenuItemLabel} "${labelText}"`,
		onClick: () => void resetValue()
	}]

	function getExportedValue(data: IExportedData['data']): string | number | undefined {
		const { dlc, mod } = useEditorStore.getState().info
		const name = exportUtils.getName(file, dlc, mod)

		return data[name]
			?.[descriptor.selector]
			?.[descriptor.name]
	}

	return (
		<div ref={setTarget} className="grid parameter">
			<ContextMenu items={contextItems} target={target} />
			<div className="label">
				{descText && configState.lang !== Lang.ch
					? (
						<Popover placement="topLeft" content={<Text>{descText}</Text>}>
							<Text>{labelText}</Text>
						</Popover>
					)
					: <Text>{labelText}</Text>}
			</div>
			{isActive && (
				<div className="content">
					{children({ value, onChange: changeValue })}
				</div>
			)}
		</div>
	)
}
