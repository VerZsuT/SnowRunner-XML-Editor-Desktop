import { useEffect, useRef } from 'react'
import type { ExportListener } from './export'
import { exportUtils } from './export'
import type { ImportListener } from './import'
import { importUtils } from './import'
import type { ResetListener, ResetBucket } from './reset'
import { useResetListener } from './reset'
import type { SaveEventListener } from './save'
import { saveUtils } from './save'

/** Подписаться на экспорт. */
export function useExportListener(listener: ExportListener) {
	const listenerRef = useRef(listener)

	listenerRef.current = listener

	useEffect(() => exportUtils.onExport(data => listenerRef.current(data)), [])
}

/** Подписаться на импорт. */
export function useImportListener(listener: ImportListener) {
	const listenerRef = useRef(listener)

	listenerRef.current = listener

	useEffect(() => importUtils.onImport(data => listenerRef.current(data)), [])
}

/** Подписаться на сохранение. */
export function useSaveListener(listener: SaveEventListener) {
	const listenerRef = useRef(listener)

	listenerRef.current = listener

	useEffect(() => saveUtils.onSave(() => listenerRef.current()), [])
}

/** Подписаться на сброс в текущем наборе. */
export function useReset(listener: ResetListener) {
	useResetListener(listener)
}

export type { ResetBucket }
