import type { IAttrDescriptor } from '@modules/xml/game/attributes'
import type { Limit } from '@modules/xml/renderer'
import { areasToString, formatString } from '@utilities/strings/renderer'
import { Popover, Typography } from 'antd'
import type { ReactNode } from 'react'
import { EDITOR_LOCALIZATION as texts } from '../../localization'
import type { IInputAreas, InputArea } from '../../types'

const { Text } = Typography

/** Параметры подсказки поля ввода. */
export interface InputTipProps {
	/** Описание параметра. */
	descriptor: IAttrDescriptor<string | number>

	/** Цветовые зоны. */
	areas?: IInputAreas

	/** Содержимое. */
	children: ReactNode
}

/** Подсказка поля ввода. */
export function InputTip({ descriptor, areas, children }: InputTipProps) {
	const areasValue = areas ?? descriptor.areas
	const valueTips = {
		min: getValueTip((descriptor.limit as Limit)?.minValue, texts.inputMin, Number.NEGATIVE_INFINITY),
		max: getValueTip((descriptor.limit as Limit)?.maxValue, texts.inputMax, Number.POSITIVE_INFINITY),
		default: getValueTip(descriptor.default, texts.inputDefault)
	}
	const areaTips = {
		green: getAreaTip(areasValue?.green, texts.inputGreenArea),
		yellow: getAreaTip(areasValue?.yellow, texts.inputYellowArea),
		red: getAreaTip(areasValue?.red, texts.inputRedArea)
	}
	const valueTipsHasAny = valueTips.min !== undefined || valueTips.max !== undefined || valueTips.default !== undefined
	const areaTipsHasAny = areaTips.green !== undefined || areaTips.yellow !== undefined || areaTips.red !== undefined

	if (!valueTipsHasAny && !areaTipsHasAny) {
		return children
	}

	const content = (
		<>
			{valueTipsHasAny && (
				<Text>
					{valueTips.min !== undefined && (
						<>
							{valueTips.min}
							<br />
						</>
					)}
					{valueTips.max !== undefined && (
						<>
							{valueTips.max}
							<br />
						</>
					)}
					{valueTips.default !== undefined && (
						<>
							{valueTips.default}
							<br />
						</>
					)}
				</Text>
			)}
			{areaTipsHasAny && (
				<Text>
					<br />
					{areaTips.green !== undefined && (
						<>
							{areaTips.green}
							<br />
						</>
					)}
					{areaTips.yellow !== undefined && (
						<>
							{areaTips.yellow}
							<br />
						</>
					)}
					{areaTips.red !== undefined && (
						<>
							{areaTips.red}
							<br />
						</>
					)}
				</Text>
			)}
		</>
	)

	return (
		<Popover placement="topLeft" content={content}>
			{children}
		</Popover>
	)
}

function getValueTip(
	limitValue: string | number | undefined,
	text: string,
	exclude?: number
): string | undefined {
	return limitValue === undefined || limitValue === exclude
		? undefined
		: formatString(text, String(limitValue))
}

function getAreaTip(
	area: InputArea | InputArea[] | undefined,
	text: string
): string | undefined {
	return area
		? formatString(text, areasToString(area))
		: undefined
}
