import { Popover, Switch, Typography } from 'antd'
import './bool-setting.scss'

const { Text } = Typography

/** Параметры переключателя. */
export interface BoolSettingProps {
	/** Заголовок. */
	label: string

	/** Подсказка. */
	tip?: string

	/** Значение. */
	checked: boolean

	/** Изменить значение. */
	onChange(value: boolean): void
}

/** Переключатель логической настройки. */
export function BoolSetting({ label, tip, checked, onChange }: BoolSettingProps) {
	const control = (
		<span>
			<Switch size="small" checked={checked} onChange={onChange} />
			<Text className="bool-setting-label">
				{label}
			</Text>
		</span>
	)

	return (
		<>
			{tip
				? (
					<Popover placement="topLeft" content={<Text>{tip}</Text>}>
						{control}
					</Popover>
				)
				: control}
			<br />
		</>
	)
}
