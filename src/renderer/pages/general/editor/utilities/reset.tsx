import type { IFile } from '@modules/files/types'
import type { IAttrDescriptor } from '@modules/xml/game/attributes'
import type { FileInfo } from '@modules/xml/renderer'
import { createContext, useContext, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { importUtils } from './import'

/** Слушатель сброса. */
export type ResetListener = () => void | Promise<unknown>

/** Набор слушателей сброса. */
export type ResetBucket = Set<ResetListener>

/** Контекст набора слушателей сброса. */
export const ResetContext = createContext<ResetBucket | null>(null)

class ResetUtils {
	/** Стандартный идентификатор набора. */
	readonly globalID = 0

	/**
	 * Получить значение параметра по умолчанию.
	 * @param file Файл.
	 * @param info Информация о файле.
	 * @param descriptor Описание параметра.
	 * @returns Значение по умолчанию.
	 */
	async getDefaultValue(file: IFile, info: FileInfo, descriptor: IAttrDescriptor): Promise<string | number | undefined> {
		const { DEFAULT_PARAMETER_VALUES } = await import('@modules/data/defaults/renderer')
		const name = importUtils.getName(file, info.dlc, info.mod)

		return DEFAULT_PARAMETER_VALUES[name]
			?.[descriptor.selector]
			?.[descriptor.name]
	}
}

export const resetUtils = new ResetUtils()

/** Провайдер набора слушателей сброса. */
export function ResetProvider({ bucket, children }: { bucket: ResetBucket, children: ReactNode }) {
	return <ResetContext.Provider value={bucket}>{children}</ResetContext.Provider>
}

/** Получить текущий набор слушателей сброса. */
export function useResetBucket() {
	return useContext(ResetContext)
}

/**
 * Зарегистрировать слушателя сброса в текущем наборе.
 * @param listener Слушатель.
 */
export function useResetListener(listener: ResetListener) {
	const bucket = useResetBucket()
	const listenerRef = useRef(listener)

	listenerRef.current = listener

	useEffect(() => {
		if (!bucket) {
			return
		}

		const handler = () => listenerRef.current()

		bucket.add(handler)

		return () => {
			bucket.delete(handler)
		}
	}, [bucket])
}

/**
 * Вызвать сброс набора.
 * @param bucket Набор слушателей.
 */
export async function emitReset(bucket: ResetBucket | null) {
	if (!bucket) {
		return
	}

	await Promise.all([...bucket].map(listener => listener()))
}
