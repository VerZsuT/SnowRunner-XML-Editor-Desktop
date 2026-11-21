import type { IFile } from '@modules/files/renderer'
import { useEffect, useRef, useState } from 'react'
import { Editor } from '../editor'
import type { EditorHandle } from '../editor'
import type { EveryCallback, ExportArgs, ImportArgs, ResetArgs } from '../lists/utilities/editor'
import { editorUtils } from '../lists/utilities/editor'

/** Тип действия. */
type ActionType = 'export' | 'import' | 'reset'

/** Элемент действия. */
type ActionItem = ExportArgs[number] | ImportArgs[number] | ResetArgs[number]

/** Задание на выполнение действий. */
interface ActionJob {
	/** Тип действия. */
	type: ActionType

	/** Список файлов. */
	args: ActionItem[]

	/** Колбэк между элементами. */
	every?: EveryCallback

	/** Завершить задание. */
	resolve(): void
}

/** Текущий обрабатываемый элемент. */
interface CurrentAction {
	/** Тип действия. */
	type: ActionType

	/** Элемент. */
	item: ActionItem

	/** Индекс. */
	index: number

	/** Последний ли это элемент. */
	isLast: boolean

	/** Ключ редактора. */
	key: string
}

/** Скрытые редакторы для пакетных действий. */
export function EditorActions() {
	const [current, setCurrent] = useState<CurrentAction | null>(null)
	const currentRef = useRef<CurrentAction | null>(null)
	const jobsRef = useRef<ActionJob[]>([])
	const processingRef = useRef(false)
	const handledRef = useRef(false)
	const itemResolveRef = useRef<(() => void) | null>(null)
	const editorRef = useRef<EditorHandle>(null)
	const pendingRef = useRef({ export: 0, import: 0, reset: 0 })

	useEffect(() => {
		const unsubscribers: (() => void)[] = [
			editorUtils.onExport((args, every) => enqueue('export', args, every)) as unknown as () => void,
			editorUtils.onImport((args, every) => enqueue('import', args, every)) as unknown as () => void,
			editorUtils.onReset((args, every) => enqueue('reset', args, every)) as unknown as () => void
		]

		return () => {
			for (const unsubscribe of unsubscribers) {
				unsubscribe()
			}
		}
	}, [])

	function enqueue(type: ActionType, args: ActionItem[], every?: EveryCallback) {
		return new Promise<void>(resolve => {
			pendingRef.current[type] += args.length
			jobsRef.current.push({ type, args, every, resolve })

			void processNext()
		})
	}

	async function processNext() {
		if (processingRef.current) {
			return
		}

		processingRef.current = true

		try {
			while (jobsRef.current.length) {
				const job = jobsRef.current[0]

				for (let index = 0; index < job.args.length; index++) {
					pendingRef.current[job.type]--
					handledRef.current = false

					const isLast = pendingRef.current.export + pendingRef.current.import + pendingRef.current.reset === 0
					const item = job.args[index]

					await job.every?.()

					await new Promise<void>(resolve => {
						itemResolveRef.current = resolve
						applyCurrent({
							type: job.type,
							item,
							index,
							isLast,
							key: `${job.type}-${index}-${getItemPath(item)}`
						})
					})
				}

				job.resolve()
				jobsRef.current.shift()
			}
		} finally {
			processingRef.current = false
		}
	}

	function applyCurrent(value: CurrentAction | null) {
		currentRef.current = value
		setCurrent(value)
	}

	async function onReady() {
		const action = currentRef.current

		if (!action || handledRef.current) {
			return
		}

		handledRef.current = true

		try {
			switch (action.type) {
				case 'export':
					await editorRef.current?.export((action.item as ExportArgs[number]).toExport)

					break
				case 'import':
					await editorRef.current?.import(action.isLast, (action.item as ImportArgs[number]).toImport)

					break
				case 'reset':
					await editorRef.current?.reset(action.isLast)

					break
			}
		} finally {
			applyCurrent(null)

			const resolve = itemResolveRef.current

			itemResolveRef.current = null

			await new Promise(resolveTimeout => setTimeout(resolveTimeout, 0))
			resolve?.()
		}
	}

	if (!current) {
		return null
	}

	const file = getItemFile(current.type, current.item)

	if (!file) {
		return null
	}

	return (
		<div style={{ display: 'none' }}>
			<Editor
				key={current.key}
				ref={editorRef}
				file={file}
				onReady={() => void onReady()}
			/>
		</div>
	)
}

function getItemFile(type: ActionType, item: ActionItem): IFile | null {
	switch (type) {
		case 'export':
			return (item as ExportArgs[number]).source
		case 'import':
			return (item as ImportArgs[number]).file
		default:
			return item as IFile
	}
}

function getItemPath(item: ActionItem): string {
	if ('source' in item) {
		return item.source.path
	}

	if ('file' in item) {
		return item.file.path
	}

	return item.path
}
