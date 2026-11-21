import type { IFile } from '@modules/files/renderer'
import { Page } from '@modules/windows/enums'
import { readTruckXML, type TruckXML } from '@modules/xml/renderer'
import { Spin } from '@renderer/components/spin'
import { useKey } from '@renderer/utilities/use-key'
import { di } from '@utilities/di/container'
import { DIRS_TOKEN, DLC_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import { useLatestRef } from '@renderer/utilities/use-latest-ref'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useEditorStore } from '../store/editor'
import { usePageStore } from '../store/page'
import { EditorHeader } from './components/header/editor-header'
import type { EditorHeaderHandle } from './components/header/editor-header'
import { Table } from './components/tables/table'
import { useFilesWatch } from './utilities/files'
import { FileProvider } from './utilities/import'
import { ResetProvider } from './utilities/reset'
import type { ResetBucket } from './utilities/reset'
import './editor.scss'

/** Параметры редактора. */
export interface EditorProps {
	/** Файл для редактирования. */
	file?: IFile

	/** Событие готовности таблицы. */
	onReady?(): void
}

/** Методы редактора. */
export interface EditorHandle {
	/** Сохранить. */
	save(updateFiles?: boolean): Promise<void>

	/** Экспортировать. */
	export(toExport?: IFile): Promise<void>

	/** Сбросить. */
	reset(updateFiles?: boolean): Promise<void>

	/** Импортировать. */
	import(updateFiles?: boolean, toImport?: IFile): Promise<void>
}

/** Редактор XML. */
export const Editor = forwardRef<EditorHandle, EditorProps>(function Editor({ file: providedFile, onReady }, ref) {
	const previousFile = useEditorStore(state => state.file)
	const file = providedFile ?? previousFile
	const setInfo = useEditorStore(state => state.setInfo)
	const setMainFile = useEditorStore(state => state.setMainFile)
	const route = usePageStore(state => state.route)

	const [xml, setXml] = useState<TruckXML | null>(null)
	const [hasError, setHasError] = useState(false)
	const headerRef = useRef<EditorHeaderHandle>(null)
	const [resetBucket] = useState<ResetBucket>(() => new Set())
	const onReadyRef = useLatestRef(onReady)

	const dlcs = di.resolve(DLC_TOKEN)
	const mods = di.resolve(MODS_TOKEN)
	const dirs = di.resolve(DIRS_TOKEN)

	const watchedFiles = file ? [file] : []

	useImperativeHandle(ref, () => ({
		async save(updateFiles = true) {
			await headerRef.current?.save(updateFiles)
		},
		async export(toExport?: IFile) {
			await headerRef.current?.export(toExport)
		},
		async reset(updateFiles = true) {
			await headerRef.current?.reset()
			await headerRef.current?.save(updateFiles)
		},
		async import(updateFiles = true, toImport?: IFile) {
			await headerRef.current?.import(toImport)
			await headerRef.current?.save(updateFiles)
		}
	}), [])

	useEffect(() => {
		if (!file) {
			return
		}

		setInfo({
			dlc: dlcs.getDLC(file),
			mod: mods.getModID(file),
			isBackup: file.path.includes(dirs.backupInitialData.name)
		})
		setMainFile(file)
	}, [file, dlcs, mods, dirs, setInfo, setMainFile])

	useEffect(() => {
		if (!file) {
			return
		}

		let cancelled = false

		async function init() {
			const result = await readTruckXML(file!)

			if (cancelled) {
				return
			}

			if (result) {
				setXml(result)
				setHasError(false)
			} else {
				setHasError(true)
				setXml(null)
				onReadyRef.current?.()
			}
		}

		void init()

		return () => {
			cancelled = true
		}
	}, [file, onReadyRef])

	useFilesWatch(watchedFiles, update)
	useKey('Escape', () => route(Page.lists))

	async function update() {
		setXml(null)
		await new Promise(resolve => setTimeout(resolve, 0))

		if (!file) {
			return
		}

		const result = await readTruckXML(file)

		if (result) {
			setXml(result)
			setHasError(false)
		} else {
			setHasError(true)
			setXml(null)
			onReadyRef.current?.()
		}
	}

	if (!file) {
		return null
	}

	return (
		<ResetProvider bucket={resetBucket}>
			<FileProvider file={file}>
				<div className="editor-container">
					<EditorHeader
						ref={headerRef}
						xml={xml}
						file={file}
						hasError={hasError}
					/>

					{xml
						? (
							<Table
								xml={xml}
								file={file}
								onReady={() => onReadyRef.current?.()}
							/>
						)
						: !hasError
							? <Spin center />
							: null}
				</div>
			</FileProvider>
		</ResetProvider>
	)
})
