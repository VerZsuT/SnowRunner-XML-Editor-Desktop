import type { AttrDescriptor, Field, Position } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import { fieldValue, formatPosition, writeField } from '@/api/fields'
import { ContextMenu } from '@/components/context-menu'
import { App, Input, InputNumber, Popover, Select, Typography } from 'antd'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { fieldText, optionText, texts } from '../texts'
import './field.scss'

/** Параметры поля документа. */
export interface FieldProps {
	/** Открытый документ. */
	session: DocumentSession

	/** Поле из модели Rust. */
	field: Field<unknown>

	/** Подпись вместо ключа локализации. */
	label?: string

	/** Подписи значений перечисления. */
	labels?: Record<string, string>
}

/** Состояние поля: значение, запись и сброс. */
function useField({ session, field }: FieldProps) {
	const { message } = App.useApp()
	const [value, setValue] = useState<unknown>(() => fieldValue(field))

	function change(next: unknown) {
		if (next === value) {
			return
		}

		setValue(next)

		void writeField(session, field, next).catch((reason: unknown) => {
			message.error(reason instanceof Error ? reason.message : String(reason))
			setValue(value)
		})
	}

	return { value, change, reset: () => change(field.defaultValue) }
}

/** Общие параметры элемента управления. */
interface ControlProps {
	/** Дескриптор поля. */
	descriptor: AttrDescriptor

	/** Подпись. */
	label?: string

	/** Подписи значений перечисления. */
	labels?: Record<string, string>

	/** Текущее значение. */
	value: unknown

	/** Изменить значение. */
	change(next: unknown): void

	/** Сбросить значение. */
	reset(): void
}

/** Параметры строки поля. */
interface FieldRowProps {
	/** Дескриптор поля. */
	descriptor: AttrDescriptor

	/** Подпись. */
	label?: string

	/** Сбросить значение. */
	onReset(): void

	/** Элемент управления. */
	children: ReactNode
}

/** Строка поля: подпись, подсказка и контекстное меню сброса. */
function FieldRow({ descriptor, label, onReset, children }: FieldRowProps) {
	const [target, setTarget] = useState<HTMLDivElement | null>(null)
	const labelText = label ?? fieldText(descriptor.label)
	const descText = fieldText(descriptor.desc)

	return (
		<div className="editor-field">
			<ContextMenu
				target={target}
				items={[{
					key: 'reset-field',
					label: `${texts.reset} "${labelText}"`,
					onClick: onReset
				}]}
			/>
			<div ref={setTarget} className="editor-field-label">
				{descText
					? (
						<Popover placement="topLeft" content={<Typography.Text>{descText}</Typography.Text>}>
							<Typography.Text>{labelText}</Typography.Text>
						</Popover>
					)
					: <Typography.Text>{labelText}</Typography.Text>}
			</div>
			<div className="editor-field-content">{children}</div>
		</div>
	)
}

/** Числовое поле. */
function NumberControl({ descriptor, label, value, change, reset }: ControlProps) {
	const limit = descriptor.limit
	const fixed = descriptor.attrType === 'integer' || limit?.fixed === true
	const step = descriptor.step ?? (fixed ? 1 : 0.1)
	const [draft, setDraft] = useState<number | null>(() => toNumber(value))
	const [previous, setPrevious] = useState(value)

	if (previous !== value) {
		setPrevious(value)
		setDraft(toNumber(value))
	}

	function commit() {
		if (draft === null) {
			if (value !== null) {
				change(null)
			}

			return
		}

		change(fixed ? Math.trunc(draft) : draft)
	}

	return (
		<FieldRow descriptor={descriptor} label={label} onReset={reset}>
			<InputNumber
				className="editor-field-input"
				size="large"
				value={draft}
				step={step}
				min={limit?.min ?? undefined}
				max={limit?.max ?? undefined}
				onChange={next => setDraft(typeof next === 'number' ? next : null)}
				onBlur={commit}
				onPressEnter={commit}
			/>
		</FieldRow>
	)
}

/** Текстовое поле. */
function TextControl({ descriptor, label, value, change, reset }: ControlProps) {
	const [draft, setDraft] = useState(() => toText(value))
	const [previous, setPrevious] = useState(value)

	if (previous !== value) {
		setPrevious(value)
		setDraft(toText(value))
	}

	function commit() {
		change(draft === '' ? null : draft)
	}

	return (
		<FieldRow descriptor={descriptor} label={label} onReset={reset}>
			<Input
				className="editor-field-input"
				size="large"
				value={draft}
				onChange={event => setDraft(event.target.value)}
				onBlur={commit}
				onPressEnter={commit}
			/>
		</FieldRow>
	)
}

/** Поле-переключатель. */
function BooleanControl({ descriptor, label, labels, value, change, reset }: ControlProps) {
	return (
		<FieldRow descriptor={descriptor} label={label} onReset={reset}>
			<Select
				className="editor-field-input"
				size="large"
				value={value === null || value === undefined ? undefined : String(value)}
				options={[
					{ value: 'true', label: labels?.['true'] ?? texts.yes },
					{ value: 'false', label: labels?.['false'] ?? texts.no }
				]}
				onChange={next => change(next === 'true')}
			/>
		</FieldRow>
	)
}

/** Поле выбора из допустимых значений. */
function SelectControl({ descriptor, label, labels, value, change, reset }: ControlProps) {
	const multiple = descriptor.attrType === 'stringArray'
	const options = (descriptor.options ?? []).map(item => ({
		value: item,
		label: labels?.[item] ?? optionText(descriptor.label, item)
	}))
	// Пустой список строк означает "все значения": так же показывал прежний интерфейс.
	const emptyIsAll = multiple && options.length > 0
	const selected = toList(value)
	const shown = emptyIsAll && selected.length === 0
		? options.map(option => option.value)
		: selected

	return (
		<FieldRow descriptor={descriptor} label={label} onReset={reset}>
			<Select
				className="editor-field-input"
				size="large"
				mode={multiple ? 'multiple' : undefined}
				options={options}
				value={multiple ? shown : String(value ?? '')}
				onChange={next => change(emptyIsAll && Array.isArray(next) && next.length === options.length
					? null
					: next)}
			/>
		</FieldRow>
	)
}

/** Поле позиции: три координаты. */
function PositionControl({ descriptor, label, value, change, reset }: ControlProps) {
	const [draft, setDraft] = useState(() => toPosition(value))
	const [previous, setPrevious] = useState(value)

	if (previous !== value) {
		setPrevious(value)
		setDraft(toPosition(value))
	}

	function commit(axis: keyof Position, next: number | null) {
		const position = { ...draft, [axis]: next }

		setDraft(position)
		change(formatPosition(position))
	}

	return (
		<FieldRow descriptor={descriptor} label={label} onReset={reset}>
			<div className="editor-field-position">
				{(['x', 'y', 'z'] as const).map(axis => (
					<InputNumber
						key={axis}
						className="editor-field-input"
						size="large"
						value={draft[axis]}
						onChange={next => commit(axis, typeof next === 'number' ? next : null)}
					/>
				))}
			</div>
		</FieldRow>
	)
}

/** Строка только для чтения. */
export function InfoField({ field, label }: { field: Field<unknown>, label?: string }) {
	const value = fieldValue(field)

	return (
		<div className="editor-field">
			<div className="editor-field-label">
				<Typography.Text>{label ?? fieldText(field.descriptor.label)}</Typography.Text>
			</div>
			<div className="editor-field-content">
				<Typography.Text>{value === null || value === undefined ? '' : String(value)}</Typography.Text>
			</div>
		</div>
	)
}

/** Поле документа: элемент управления выбирается по типу значения. */
export function DocumentField({ session, field, label, labels }: FieldProps) {
	const state = useField({ session, field })
	const control = { descriptor: field.descriptor, label, labels, ...state }

	switch (field.descriptor.attrType) {
		case 'integer':
		case 'float':
			return <NumberControl {...control} />
		case 'boolean':
			return <BooleanControl {...control} />
		case 'position':
			return <PositionControl {...control} />
		case 'stringArray':
			return field.descriptor.options
				? <SelectControl {...control} />
				: <TextControl {...control} />
		default:
			return field.descriptor.options
				? <SelectControl {...control} />
				: <TextControl {...control} />
	}
}

/** Приводит значение к числу. */
function toNumber(value: unknown): number | null {
	return typeof value === 'number' && Number.isFinite(value) ? value : null
}

/** Приводит значение к строке. */
function toText(value: unknown): string {
	if (value === null || value === undefined) {
		return ''
	}

	return Array.isArray(value)
		? value.join(', ')
		: String(value)
}

/** Приводит значение к списку строк. */
function toList(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.map(String)
	}

	return value === null || value === undefined || value === ''
		? []
		: [String(value)]
}

/** Приводит значение к позиции. */
function toPosition(value: unknown): Position {
	const source = value && typeof value === 'object'
		? value as Partial<Position>
		: {}

	return {
		x: source.x ?? null,
		y: source.y ?? null,
		z: source.z ?? null
	}
}
