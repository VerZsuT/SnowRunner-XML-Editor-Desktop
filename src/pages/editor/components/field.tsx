import type { AttrDescriptor, Field, InputArea, Position } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import { fieldValue, formatPosition, writeField } from '@/api/fields'
import { ContextMenu } from '@/components/context-menu'
import { formatString } from '@/utilities/strings'
import { App, Input, InputNumber, Popover, Select, Typography } from 'antd'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { fieldText, optionText, texts } from '../texts'
import { useFieldDefault } from './defaults'
import { useGroupReset } from './group'
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
	const defaultValue = useFieldDefault(session, field)
	const [value, setValue] = useState<unknown>(() => fieldValue(field))
	const [previousField, setPreviousField] = useState(field)

	// Модель может быть перечитана с диска (watcher, сброс): локальный черновик
	// должен следовать за новым значением поля, иначе правка затрёт его старым.
	if (previousField !== field) {
		setPreviousField(field)
		setValue(fieldValue(field))
	}

	function change(next: unknown) {
		if (next === value) {
			return
		}

		const previous = value

		setValue(next)

		void writeField(session, field, next).catch((reason: unknown) => {
			message.error(reason instanceof Error ? reason.message : String(reason))
			setValue(previous)
		})
	}

	return { value, change, defaultValue, reset: () => change(defaultValue) }
}

/** Общие параметры элемента управления. */
interface ControlProps {
	/** Дескриптор поля. */
	descriptor: AttrDescriptor

	/** Подпись. */
	label?: string

	/** Подписи значений перечисления. */
	labels?: Record<string, string>

	/** Значение по умолчанию из модели. */
	defaultValue?: unknown

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
	const registerReset = useGroupReset()
	const labelText = label ?? fieldText(descriptor.label)
	const descText = fieldText(descriptor.desc)
	const resetRef = useRef(onReset)

	useEffect(() => {
		resetRef.current = onReset
	}, [onReset])
	useEffect(() => registerReset?.(() => resetRef.current()), [registerReset])

	return (
		<div ref={setTarget} className="editor-field">
			<ContextMenu
				target={target}
				items={[{
					key: 'reset-field',
					label: `${texts.reset} "${labelText}"`,
					onClick: onReset
				}]}
			/>
			<div className="editor-field-label">
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

/** Подсказка поля ввода: ограничения и цветовые зоны, как в 1.4.0. */
function FieldTip({ descriptor, labels, defaultValue, children }: {
	descriptor: AttrDescriptor
	labels?: Record<string, string>
	defaultValue?: unknown
	children: ReactNode
}) {
	const lines = tipLines(descriptor, defaultValue, labels)

	if (!lines.length) {
		return <>{children}</>
	}

	return (
		<Popover
			placement="topLeft"
			content={(
				<div className="editor-field-tip">
					{lines.map((line, index) => <div key={`${index}-${line}`}>{line}</div>)}
				</div>
			)}
		>
			<span className="editor-field-tip-target">{children}</span>
		</Popover>
	)
}

/** Строки подсказки по дескриптору. */
function tipLines(
	descriptor: AttrDescriptor,
	defaultValue?: unknown,
	labels?: Record<string, string>
): string[] {
	const lines: string[] = []
	const limit = descriptor.limit

	if (limit?.min !== null && limit?.min !== undefined) {
		lines.push(formatString(texts.inputMin, String(limit.min)))
	}

	if (limit?.max !== null && limit?.max !== undefined) {
		lines.push(formatString(texts.inputMax, String(limit.max)))
	}

	const fallback = tipValue(descriptor, defaultValue, labels)

	if (fallback !== undefined) {
		lines.push(formatString(texts.inputDefault, fallback))
	}

	const areas = descriptor.areas

	for (const [area, text] of [
		[areas?.green, texts.inputGreenArea],
		[areas?.yellow, texts.inputYellowArea],
		[areas?.red, texts.inputRedArea]
	] as const) {
		const value = formatAreas(area)

		if (value) {
			lines.push(formatString(text, value))
		}
	}

	return lines
}

/** Значение для подсказки: только скалярные, логические — словами. */
function tipValue(
	descriptor: AttrDescriptor,
	value: unknown,
	labels?: Record<string, string>
): string | undefined {
	if (value === null || value === undefined || typeof value === 'object') {
		return undefined
	}

	if (descriptor.attrType === 'boolean') {
		return labels?.[String(value)] ?? (value === true || value === 'true' ? texts.yes : texts.no)
	}

	return String(value)
}

/** Статус поля по цветовым зонам: как status в 1.4.0. */
function areaStatus(areas: AttrDescriptor['areas'], value: unknown): 'error' | 'warning' | undefined {
	if (!areas) {
		return undefined
	}

	const number = typeof value === 'number' && Number.isFinite(value) ? value : Number(value)
	const current = Number.isFinite(number) ? number : 0
	const inside = (list: InputArea[] | null) => list?.some(area => (
		(current >= (area.start ?? -Infinity)) && (current <= (area.end ?? Infinity))
	))

	if (inside(areas.red)) {
		return 'error'
	}

	return inside(areas.yellow) ? 'warning' : undefined
}

/** Цветовые зоны строкой. */
function formatAreas(areas?: InputArea[] | null): string | undefined {
	if (!areas?.length) {
		return undefined
	}

	const parts = areas
		.map(area => {
			if (area.start === null && area.end === null) {
				return ''
			}

			if (area.start === null) {
				return `≤ ${area.end}`
			}

			if (area.end === null) {
				return `≥ ${area.start}`
			}

			return `${area.start}–${area.end}`
		})
		.filter(Boolean)

	return parts.length ? parts.join(', ') : undefined
}

/** Числовое поле. */
function NumberControl({ descriptor, label, labels, defaultValue, value, change, reset }: ControlProps) {
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
		if (draft === null || !Number.isFinite(draft)) {
			setDraft(toNumber(value))

			return
		}

		const next = fixed ? Math.round(draft) : draft

		if (limit?.min !== null && limit?.min !== undefined && next < limit.min) {
			setDraft(toNumber(value))

			return
		}

		if (limit?.max !== null && limit?.max !== undefined && next > limit.max) {
			setDraft(toNumber(value))

			return
		}

		setDraft(next)

		if (next !== value) {
			change(next)
		}
	}

	const status = areaStatus(descriptor.areas, draft)

	return (
		<FieldRow descriptor={descriptor} label={label} onReset={reset}>
			<FieldTip descriptor={descriptor} labels={labels} defaultValue={defaultValue}>
				<InputNumber
					className="editor-field-input"
					size="large"
					status={status}
					value={draft}
					step={step}
					min={limit?.min ?? undefined}
					max={limit?.max ?? undefined}
					onChange={next => setDraft(typeof next === 'number' ? next : null)}
					onBlur={commit}
					onPressEnter={commit}
				/>
			</FieldTip>
		</FieldRow>
	)
}

/** Текстовое поле. */
function TextControl({ descriptor, label, labels, defaultValue, value, change, reset }: ControlProps) {
	const [draft, setDraft] = useState(() => toText(value))
	const [previous, setPrevious] = useState(value)

	if (previous !== value) {
		setPrevious(value)
		setDraft(toText(value))
	}

	function commit() {
		change(draft === '' ? null : draft)
	}

	const status = areaStatus(descriptor.areas, draft)

	return (
		<FieldRow descriptor={descriptor} label={label} onReset={reset}>
			<FieldTip descriptor={descriptor} labels={labels} defaultValue={defaultValue}>
				<Input
					className="editor-field-input"
					size="large"
					status={status}
					value={draft}
					onChange={event => setDraft(event.target.value)}
					onBlur={commit}
					onPressEnter={commit}
				/>
			</FieldTip>
		</FieldRow>
	)
}

/** Поле-переключатель. */
function BooleanControl({ descriptor, label, labels, defaultValue, value, change, reset }: ControlProps) {
	return (
		<FieldRow descriptor={descriptor} label={label} onReset={reset}>
			<FieldTip descriptor={descriptor} labels={labels} defaultValue={defaultValue}>
				<Select
					className="editor-field-input editor-field-select"
					size="large"
					popupMatchSelectWidth={false}
					classNames={{ popup: { root: 'editor-select-dropdown' } }}
					value={value === null || value === undefined ? undefined : String(value)}
					options={[
						{ value: 'true', label: labels?.['true'] ?? texts.yes },
						{ value: 'false', label: labels?.['false'] ?? texts.no }
					]}
					onChange={next => change(next === 'true')}
				/>
			</FieldTip>
		</FieldRow>
	)
}

/** Поле выбора из допустимых значений. */
function SelectControl({ descriptor, label, labels, defaultValue, value, change, reset }: ControlProps) {
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
			<FieldTip descriptor={descriptor} labels={labels} defaultValue={defaultValue}>
				<Select
					className="editor-field-input editor-field-select"
					size="large"
					popupMatchSelectWidth={false}
					classNames={{ popup: { root: 'editor-select-dropdown' } }}
					mode={multiple ? 'multiple' : undefined}
					options={options}
					value={multiple ? shown : String(value ?? '')}
					onChange={next => change(emptyIsAll && Array.isArray(next) && next.length === options.length
						? null
						: next)}
				/>
			</FieldTip>
		</FieldRow>
	)
}

/** Поле позиции: три координаты. */
function PositionControl({ descriptor, label, labels, defaultValue, value, change, reset }: ControlProps) {
	const [draft, setDraft] = useState(() => toPosition(value))
	const [previous, setPrevious] = useState(value)

	if (previous !== value) {
		setPrevious(value)
		setDraft(toPosition(value))
	}

	function commit(axis: keyof Position, next: number | null) {
		if (next === null || !Number.isFinite(next)) {
			return
		}

		const position = { ...draft, [axis]: next }

		setDraft(position)
		change(formatPosition(position))
	}

	return (
		<FieldRow descriptor={descriptor} label={label} onReset={reset}>
			<FieldTip descriptor={descriptor} labels={labels} defaultValue={defaultValue}>
				<div className="editor-field-position">
					{(['x', 'y', 'z'] as const).map(axis => (
						<div key={axis} className="editor-field-coordinate">
							<span className="editor-field-axis">{axis.toUpperCase()}:</span>
							<InputNumber
								className="editor-field-input"
								value={draft[axis]}
								onChange={next => commit(axis, typeof next === 'number' ? next : null)}
							/>
						</div>
					))}
				</div>
			</FieldTip>
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
	const control = {
		descriptor: field.descriptor,
		label,
		labels,
		...state
	}

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
