import { useLatestRef } from '@renderer/utilities/use-latest-ref'
import { useEffect } from 'react'
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
	const listenerRef = useLatestRef(listener)

	useEffect(() => exportUtils.onExport(data => listenerRef.current(data)), [listenerRef])
}

/** Подписаться на импорт. */
export function useImportListener(listener: ImportListener) {
	const listenerRef = useLatestRef(listener)

	useEffect(() => importUtils.onImport(data => listenerRef.current(data)), [listenerRef])
}

/** Подписаться на сохранение. */
export function useSaveListener(listener: SaveEventListener) {
	const listenerRef = useLatestRef(listener)

	useEffect(() => saveUtils.onSave(() => listenerRef.current()), [listenerRef])
}

/** Подписаться на сброс в текущем наборе. */
export function useReset(listener: ResetListener) {
	useResetListener(listener)
}

export type { ResetBucket }
