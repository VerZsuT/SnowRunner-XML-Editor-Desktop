import { Input, Typography } from 'antd'
import type { ChangeEvent } from 'react'
import { useEffect, useState } from 'react'
import './content-field.scss'

const { Text } = Typography

/** Параметры поля содержимого аддона. */
export interface ContentFieldProps {
	/** Заголовок поля для ввода. */
	text: string

	/** Значение поля для ввода. */
	value: number

	/** Событие изменения значения. */
	onChange?(value: number): void

	/** Событие `blur` поля ввода. */
	onBlur?(): void
}

/** Поле содержимого аддона. */
export function ContentField({ text, value, onChange, onBlur }: ContentFieldProps) {
	const [val, setVal] = useState(() => String(value))

	useEffect(() => setVal(String(value)), [value])

	function changeValue(event: ChangeEvent<HTMLInputElement>) {
		const inputVal = event.target.value

		setVal(inputVal)

		if (!inputVal) {
			return
		}

		const num = Number.parseInt(inputVal)

		if (Number.isNaN(num)) {
			return
		}

		setVal(String(num))
		onChange?.(num)
	}

	return (
		<div className="grid content-field">
			<Text className="text">{text}</Text>
			<Input
				className="input"
				type="number"
				min="0"
				value={val}
				onChange={changeValue}
				onBlur={onBlur}
			/>
		</div>
	)
}
