import type { IFile } from '@modules/files/renderer'
import type { EditorFilesKey } from '@renderer/pages/general/store/editor'
import { useEditorStore } from '@renderer/pages/general/store/editor'
import debounce from 'debounce'
import type { IWatcher } from '@modules/files/types'
import { useLatestRef } from '@renderer/utilities/use-latest-ref'
import { useEffect } from 'react'

/** Слушатель изменения файлов. */
export type UpdateListener = (event: string, fileName: string | null) => void | Promise<void>

/**
 * Добавить файлы в общий набор редактора.
 * @param files Файлы.
 * @param key Название набора.
 */
export function useFilesReg(files: IFile[], key: EditorFilesKey) {
	useEffect(() => {
		if (files.length) {
			useEditorStore.getState().addAllFiles(key, files)
		}
	}, [files, key])
}

/**
 * Отследить изменения файлов.
 * @param files Файлы.
 * @param listener Слушатель.
 */
export function useFilesWatch(files: IFile[], listener: UpdateListener) {
	const listenerRef = useLatestRef(listener)

	useEffect(() => {
		const watchers: IWatcher[] = []
		const watchListener = debounce((event: string, fileName: string | null) => {
			if (!useEditorStore.getState().isSaving) {
				void listenerRef.current(event, fileName)
			}
		}, 200)

		for (const file of files) {
			watchers.push(file.watch((event, fileName) => watchListener(event, fileName)))
		}

		return () => {
			for (const watcher of watchers) {
				watcher.removeAllListeners()
				watcher.close()
			}

			watchListener.clear()
		}
	}, [files, listenerRef])
}
